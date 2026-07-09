from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import Client, TestCase
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
