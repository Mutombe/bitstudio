from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import Client, TestCase, override_settings
from django.urls import reverse

from .models import Activity, Lead

User = get_user_model()


class BaseCRMTest(TestCase):
    def setUp(self):
        # ScopedRateThrottle counts through the cache, which persists across
        # tests in-process. Without this, later tests trip the 10/hour limit.
        cache.clear()
        self.list_url = reverse("lead-list")

    def detail_url(self, lead):
        return reverse("lead-detail", args=[lead.id])


class LeadCaptureTests(BaseCRMTest):
    """The public intake endpoint is the only anonymous write. Pin it down."""

    def setUp(self):
        super().setUp()
        self.payload = {
            "name": "Tendai Moyo",
            "email": "tendai@example.co.zw",
            "message": "We track 400 tenants in Excel. Help.",
            "channel": "whatsapp",
            "source": "offer_page",
            "offer_slug": "real-estate-automation",
            "tier": "Rent Collection Accelerator",
        }

    def test_captures_lead_with_attribution(self):
        response = self.client.post(
            self.list_url, self.payload, content_type="application/json"
        )

        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.get()
        self.assertEqual(lead.offer_slug, "real-estate-automation")
        self.assertEqual(lead.tier, "Rent Collection Accelerator")
        self.assertEqual(lead.status, Lead.Status.NEW)
        self.assertIsNone(lead.owner)

    def test_creation_is_logged_as_activity(self):
        self.client.post(self.list_url, self.payload, content_type="application/json")
        activity = Lead.objects.get().activities.get()
        self.assertEqual(activity.kind, Activity.Kind.CREATED)

    def test_records_client_ip_from_forwarded_header(self):
        self.client.post(
            self.list_url,
            self.payload,
            content_type="application/json",
            HTTP_X_FORWARDED_FOR="41.221.0.5, 10.0.0.1",
        )
        self.assertEqual(Lead.objects.get().ip_address, "41.221.0.5")

    def test_honeypot_rejects_bot(self):
        response = self.client.post(
            self.list_url,
            {**self.payload, "website": "http://spam.example"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_requires_name_email_message(self):
        response = self.client.post(
            self.list_url, {"name": "Only"}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_client_cannot_set_status_or_owner(self):
        staff = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        self.client.post(
            self.list_url,
            {**self.payload, "status": "won", "owner": staff.id},
            content_type="application/json",
        )
        lead = Lead.objects.get()
        self.assertEqual(lead.status, Lead.Status.NEW)
        self.assertIsNone(lead.owner)

    def test_anonymous_cannot_enumerate_leads(self):
        Lead.objects.create(name="A", email="a@b.co", message="x")
        response = self.client.get(self.list_url)
        self.assertIn(response.status_code, (401, 403))

    def test_anonymous_cannot_read_a_lead(self):
        lead = Lead.objects.create(name="A", email="a@b.co", message="x")
        response = self.client.get(self.detail_url(lead))
        self.assertIn(response.status_code, (401, 403))


class LeadScopingTests(BaseCRMTest):
    """Sales work their own leads plus the unclaimed pool. Managers see all."""

    def setUp(self):
        super().setUp()
        self.sales = User.objects.create_user("sales", password="x", role=User.Role.SALES)
        self.other = User.objects.create_user("other", password="x", role=User.Role.SALES)
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)

        self.mine = Lead.objects.create(name="Mine", email="m@x.co", message="m", owner=self.sales)
        self.theirs = Lead.objects.create(name="Theirs", email="t@x.co", message="t", owner=self.other)
        self.unassigned = Lead.objects.create(name="Free", email="f@x.co", message="f")

    def names_visible_to(self, user):
        self.client.force_login(user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)
        return {row["name"] for row in response.json()["results"]}

    def test_sales_sees_own_and_unassigned_only(self):
        self.assertEqual(self.names_visible_to(self.sales), {"Mine", "Free"})

    def test_manager_sees_everything(self):
        self.assertEqual(
            self.names_visible_to(self.manager), {"Mine", "Theirs", "Free"}
        )

    def test_sales_cannot_read_another_reps_lead(self):
        self.client.force_login(self.sales)
        response = self.client.get(self.detail_url(self.theirs))
        self.assertEqual(response.status_code, 404)

    def test_sales_cannot_assign_lead_to_someone_else(self):
        self.client.force_login(self.sales)
        response = self.client.patch(
            self.detail_url(self.unassigned),
            {"owner": self.other.id},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.unassigned.refresh_from_db()
        self.assertIsNone(self.unassigned.owner)

    def test_sales_can_claim_an_unassigned_lead(self):
        self.client.force_login(self.sales)
        response = self.client.patch(
            self.detail_url(self.unassigned),
            {"owner": self.sales.id},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.unassigned.refresh_from_db()
        self.assertEqual(self.unassigned.owner, self.sales)

    def test_manager_can_assign_to_anyone(self):
        self.client.force_login(self.manager)
        response = self.client.patch(
            self.detail_url(self.unassigned),
            {"owner": self.other.id},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.unassigned.refresh_from_db()
        self.assertEqual(self.unassigned.owner, self.other)

    def test_leads_cannot_be_deleted(self):
        self.client.force_login(self.manager)
        response = self.client.delete(self.detail_url(self.mine))
        self.assertEqual(response.status_code, 405)


class LeadPipelineTests(BaseCRMTest):
    def setUp(self):
        super().setUp()
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        self.lead = Lead.objects.create(name="A", email="a@b.co", message="x")
        self.client.force_login(self.manager)

    def test_status_change_is_logged(self):
        self.client.patch(
            self.detail_url(self.lead),
            {"status": "qualified"},
            content_type="application/json",
        )
        self.lead.refresh_from_db()
        self.assertEqual(self.lead.status, "qualified")

        activity = self.lead.activities.get(kind=Activity.Kind.STATUS_CHANGE)
        self.assertEqual(activity.actor, self.manager)
        self.assertIn("Qualified", activity.body)

    def test_assignment_is_logged(self):
        self.client.patch(
            self.detail_url(self.lead),
            {"owner": self.manager.id},
            content_type="application/json",
        )
        activity = self.lead.activities.get(kind=Activity.Kind.ASSIGNMENT)
        self.assertEqual(activity.actor, self.manager)

    def test_note_can_be_added(self):
        response = self.client.post(
            reverse("lead-notes", args=[self.lead.id]),
            {"body": "Called. Wants a demo Thursday."},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        note = self.lead.activities.get(kind=Activity.Kind.NOTE)
        self.assertEqual(note.body, "Called. Wants a demo Thursday.")
        self.assertEqual(note.actor, self.manager)

    def test_task_can_be_created_and_completed(self):
        create = self.client.post(
            reverse("lead-tasks", args=[self.lead.id]),
            {"title": "Send proposal", "due_date": "2026-07-01"},
            content_type="application/json",
        )
        self.assertEqual(create.status_code, 201)
        task_id = create.json()["id"]

        done = self.client.patch(
            reverse("task-detail", args=[task_id]),
            {"is_done": True},
            content_type="application/json",
        )
        self.assertEqual(done.status_code, 200)
        self.assertTrue(self.lead.tasks.get().is_done)


class RevenueTests(BaseCRMTest):
    """Deal value on capture, and the money the dashboard reports."""

    def setUp(self):
        super().setUp()
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)

    def test_capture_seeds_value_from_offer_and_tier(self):
        self.client.post(
            self.list_url,
            {
                "name": "A",
                "email": "a@b.co",
                "message": "hi",
                "source": "offer_page",
                "offer_slug": "real-estate-automation",
                "tier": "Property ERP",
            },
            content_type="application/json",
        )
        self.assertEqual(Lead.objects.get().value, 16000)

    def test_capture_without_tier_uses_starting_price(self):
        self.client.post(
            self.list_url,
            {
                "name": "A",
                "email": "a@b.co",
                "message": "hi",
                "source": "offer_page",
                "offer_slug": "real-estate-automation",
            },
            content_type="application/json",
        )
        self.assertEqual(Lead.objects.get().value, 5000)

    def test_browser_cannot_set_value_on_capture(self):
        self.client.post(
            self.list_url,
            {
                "name": "A",
                "email": "a@b.co",
                "message": "hi",
                "offer_slug": "real-estate-automation",
                "tier": "Property ERP",
                "value": "999999",
            },
            content_type="application/json",
        )
        # value comes from pricing, never from the untrusted payload.
        self.assertEqual(Lead.objects.get().value, 16000)

    def test_dashboard_reports_pipeline_and_won_value(self):
        Lead.objects.create(name="Open1", email="o1@x.co", message="x", status="new", value=5000)
        Lead.objects.create(name="Open2", email="o2@x.co", message="x", status="proposal", value=8000)
        Lead.objects.create(name="Won", email="w@x.co", message="x", status="won", value=15000)
        Lead.objects.create(name="Lost", email="l@x.co", message="x", status="lost", value=3000)

        self.client.force_login(self.manager)
        stats = self.client.get(reverse("stats")).json()

        self.assertEqual(float(stats["pipeline_value"]), 13000)  # open only
        self.assertEqual(float(stats["won_value"]), 15000)
        self.assertEqual(stats["win_rate"], 0.5)  # 1 won of (1 won + 1 lost)

    def test_win_rate_is_null_before_anything_closes(self):
        Lead.objects.create(name="Open", email="o@x.co", message="x", status="new", value=5000)
        self.client.force_login(self.manager)
        self.assertIsNone(self.client.get(reverse("stats")).json()["win_rate"])

    def test_conversion_by_offer(self):
        Lead.objects.create(name="A", email="a@x.co", message="x", offer_slug="ai-automation", status="won", value=3500)
        Lead.objects.create(name="B", email="b@x.co", message="x", offer_slug="ai-automation", status="new", value=9000)
        self.client.force_login(self.manager)

        by_offer = {o["offer_slug"]: o for o in self.client.get(reverse("stats")).json()["by_offer"]}
        self.assertEqual(by_offer["ai-automation"]["total"], 2)
        self.assertEqual(by_offer["ai-automation"]["won"], 1)
        self.assertEqual(float(by_offer["ai-automation"]["won_value"]), 3500)
        self.assertEqual(float(by_offer["ai-automation"]["pipeline_value"]), 9000)

    def test_staff_can_record_lost_reason(self):
        lead = Lead.objects.create(name="A", email="a@x.co", message="x")
        self.client.force_login(self.manager)
        self.client.patch(
            self.detail_url(lead),
            {"status": "lost", "lost_reason": "Too expensive."},
            content_type="application/json",
        )
        lead.refresh_from_db()
        self.assertEqual(lead.status, "lost")
        self.assertEqual(lead.lost_reason, "Too expensive.")


class TaskListTests(BaseCRMTest):
    """The flat /api/tasks/ list that powers 'my follow-ups'."""

    def setUp(self):
        super().setUp()
        self.sales = User.objects.create_user("sales", password="x", role=User.Role.SALES)
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        self.lead = Lead.objects.create(name="A", email="a@x.co", message="x", owner=self.sales)

    def test_assignee_me_and_open_filters(self):
        from .models import Task

        mine_open = Task.objects.create(lead=self.lead, title="Call", assignee=self.sales)
        Task.objects.create(lead=self.lead, title="Done", assignee=self.sales, is_done=True)
        Task.objects.create(lead=self.lead, title="Theirs", assignee=self.manager)

        self.client.force_login(self.sales)
        results = self.client.get(reverse("task-list"), {"assignee": "me", "open": "1"}).json()["results"]

        self.assertEqual([t["id"] for t in results], [mine_open.id])
        self.assertEqual(results[0]["lead_name"], "A")

    def test_task_can_be_created_with_an_assignee(self):
        self.client.force_login(self.manager)
        response = self.client.post(
            reverse("lead-tasks", args=[self.lead.id]),
            {"title": "Send proposal", "assignee_id": self.sales.id},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.lead.tasks.get().assignee, self.sales)


class AuthTests(BaseCRMTest):
    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            "rutendo", password="correct-horse", role=User.Role.SALES
        )

    def test_login_returns_user_and_role(self):
        response = self.client.post(
            reverse("auth-login"),
            {"username": "rutendo", "password": "correct-horse"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["username"], "rutendo")
        self.assertEqual(body["role"], "sales")
        self.assertFalse(body["can_see_all_leads"])

    def test_bad_password_is_rejected(self):
        response = self.client.post(
            reverse("auth-login"),
            {"username": "rutendo", "password": "wrong"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)

    def test_unknown_user_gives_same_error_as_bad_password(self):
        response = self.client.post(
            reverse("auth-login"),
            {"username": "ghost", "password": "wrong"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()["detail"], "Invalid credentials.")

    def test_me_requires_authentication(self):
        self.assertIn(self.client.get(reverse("auth-me")).status_code, (401, 403))
        self.client.force_login(self.user)
        self.assertEqual(self.client.get(reverse("auth-me")).status_code, 200)

    def test_sales_cannot_list_the_team(self):
        self.client.force_login(self.user)
        response = self.client.get(reverse("sales-team"))
        self.assertEqual(response.json(), [])


class LoginCsrfTests(TestCase):
    """
    DRF's SessionAuthentication skips the CSRF check on anonymous requests,
    which left /auth/login/ open to login CSRF — an attacker forcing a
    victim's browser to sign in as the attacker. LoginView is explicitly
    csrf_protect'd; this pins that shut.
    """

    def setUp(self):
        cache.clear()
        self.client = Client(enforce_csrf_checks=True)
        User.objects.create_user("rutendo", password="correct-horse")
        self.url = reverse("auth-login")
        self.credentials = {"username": "rutendo", "password": "correct-horse"}

    def test_login_without_csrf_token_is_rejected(self):
        response = self.client.post(
            self.url, self.credentials, content_type="application/json"
        )
        self.assertEqual(response.status_code, 403)

    def test_login_with_csrf_token_succeeds(self):
        self.client.get(reverse("auth-csrf"))  # plants the cookie
        token = self.client.cookies["csrftoken"].value

        response = self.client.post(
            self.url,
            self.credentials,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(response.status_code, 200)

    def test_public_lead_capture_stays_csrf_exempt(self):
        # The marketing site posts cross-origin without a session. Requiring
        # a token here would break every enquiry.
        response = self.client.post(
            reverse("lead-list"),
            {"name": "A", "email": "a@b.co", "message": "hi"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

    def _login_from(self, origin):
        self.client.get(reverse("auth-csrf"))
        token = self.client.cookies["csrftoken"].value
        return self.client.post(
            self.url,
            self.credentials,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
            HTTP_ORIGIN=origin,
        )

    @override_settings(CSRF_TRUSTED_ORIGINS=["https://bitstudio.co.zw"])
    def test_login_from_a_trusted_origin_is_accepted(self):
        # Django checks the browser's Origin header against this list. The SPA
        # always sends one, and it never matches the API's own host — so a
        # missing entry here means every login 403s, however good the token.
        # curl sends no Origin, which is why only a browser catches it.
        self.assertEqual(self._login_from("https://bitstudio.co.zw").status_code, 200)

    @override_settings(CSRF_TRUSTED_ORIGINS=["https://bitstudio.co.zw"])
    def test_login_from_an_untrusted_origin_is_rejected(self):
        self.assertEqual(self._login_from("https://evil.example").status_code, 403)
