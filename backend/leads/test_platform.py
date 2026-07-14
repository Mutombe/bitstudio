from django.contrib.auth import get_user_model
from django.core import mail
from django.core.cache import cache
from django.test import TestCase
from django.urls import reverse

from .models import (
    AuditLog,
    Company,
    CustomFieldDef,
    EmailTemplate,
    IntakeKey,
    Lead,
    Notification,
    SavedView,
)
from .scoring import compute_score

User = get_user_model()


class ScoringTests(TestCase):
    def test_score_rewards_completeness_and_value(self):
        bare = Lead(name="A", source="manual", status="new")
        rich = Lead(
            name="B", email="b@x.co", phone="123", company="Acme",
            value=25000, source="offer_page", status="qualified",
        )
        self.assertLess(compute_score(bare), compute_score(rich))
        self.assertLessEqual(compute_score(rich), 100)

    def test_score_written_on_save(self):
        lead = Lead.objects.create(name="A", email="a@x.co", value=10000, source="offer_page")
        self.assertGreater(lead.score, 0)


class NotificationTests(TestCase):
    def setUp(self):
        cache.clear()
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        self.sales = User.objects.create_user("sales", password="x", email="s@x.co", role=User.Role.SALES)

    def test_new_unassigned_lead_notifies_managers(self):
        self.client.force_login(self.manager)
        self.client.post(
            reverse("lead-list"), {"name": "Fresh"}, content_type="application/json"
        )
        self.assertTrue(Notification.objects.filter(recipient=self.manager).exists())

    def test_assigning_a_lead_notifies_and_emails_the_owner(self):
        lead = Lead.objects.create(name="A", email="a@x.co", message="x")
        self.client.force_login(self.manager)
        self.client.patch(
            reverse("lead-detail", args=[lead.id]),
            {"owner": self.sales.id},
            content_type="application/json",
        )
        self.assertTrue(Notification.objects.filter(recipient=self.sales).exists())
        # Console/locmem backend: the assignment email was queued.
        self.assertTrue(any("assigned" in m.body.lower() for m in mail.outbox))

    def test_users_only_see_their_own_notifications(self):
        Notification.objects.create(recipient=self.manager, text="mine")
        Notification.objects.create(recipient=self.sales, text="theirs")
        self.client.force_login(self.manager)
        results = self.client.get(reverse("notification-list")).json()["results"]
        self.assertEqual([n["text"] for n in results], ["mine"])

    def test_unread_count_and_mark_all_read(self):
        Notification.objects.create(recipient=self.manager, text="a")
        Notification.objects.create(recipient=self.manager, text="b")
        self.client.force_login(self.manager)
        self.assertEqual(self.client.get(reverse("notification-unread-count")).json()["count"], 2)
        self.client.post(reverse("notification-mark-all-read"))
        self.assertEqual(self.client.get(reverse("notification-unread-count")).json()["count"], 0)


class CompanyContactTests(TestCase):
    def setUp(self):
        cache.clear()
        self.user = User.objects.create_user("u", password="x", role=User.Role.MANAGER)
        self.client.force_login(self.user)

    def test_create_company_defaults_owner_and_audits(self):
        response = self.client.post(
            reverse("company-list"), {"name": "Acme Ltd"}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        company = Company.objects.get()
        self.assertEqual(company.owner, self.user)
        self.assertTrue(AuditLog.objects.filter(verb="created", target="Company: Acme Ltd").exists())

    def test_link_lead_to_company(self):
        company = Company.objects.create(name="Acme")
        lead = Lead.objects.create(name="A", email="a@x.co", message="x")
        self.client.patch(
            reverse("lead-detail", args=[lead.id]),
            {"company_ref": company.id},
            content_type="application/json",
        )
        lead.refresh_from_db()
        self.assertEqual(lead.company_ref, company)


class SavedViewTests(TestCase):
    def setUp(self):
        cache.clear()
        self.a = User.objects.create_user("a", password="x", role=User.Role.SALES)
        self.b = User.objects.create_user("b", password="x", role=User.Role.SALES)

    def test_sees_own_and_shared_not_others_private(self):
        SavedView.objects.create(name="Mine", owner=self.a, params={})
        SavedView.objects.create(name="Shared", owner=self.b, params={}, shared=True)
        SavedView.objects.create(name="Theirs", owner=self.b, params={})
        self.client.force_login(self.a)
        names = {v["name"] for v in self.client.get(reverse("savedview-list")).json()}
        self.assertEqual(names, {"Mine", "Shared"})


class CustomFieldTests(TestCase):
    def setUp(self):
        cache.clear()
        self.admin = User.objects.create_user("admin", password="x", role=User.Role.ADMIN)
        self.sales = User.objects.create_user("sales", password="x", role=User.Role.SALES)

    def test_only_admin_defines_fields_but_all_read(self):
        self.client.force_login(self.sales)
        self.assertEqual(
            self.client.post(reverse("customfield-list"), {"label": "Budget", "key": "budget"}, content_type="application/json").status_code,
            403,
        )
        self.client.force_login(self.admin)
        self.assertEqual(
            self.client.post(reverse("customfield-list"), {"label": "Budget", "key": "budget"}, content_type="application/json").status_code,
            201,
        )
        self.client.force_login(self.sales)
        self.assertEqual(self.client.get(reverse("customfield-list")).status_code, 200)

    def test_custom_values_persist_on_lead(self):
        CustomFieldDef.objects.create(label="Budget", key="budget")
        lead = Lead.objects.create(name="A", email="a@x.co", message="x")
        self.client.force_login(self.admin)
        self.client.patch(
            reverse("lead-detail", args=[lead.id]),
            {"custom": {"budget": "50k"}},
            content_type="application/json",
        )
        lead.refresh_from_db()
        self.assertEqual(lead.custom["budget"], "50k")


class ReportTests(TestCase):
    def setUp(self):
        cache.clear()
        self.mgr = User.objects.create_user("m", password="x", role=User.Role.MANAGER)
        Lead.objects.create(name="A", email="a@x.co", message="x", source="offer_page", value=5000)
        Lead.objects.create(name="B", email="b@x.co", message="x", source="offer_page", value=3000)
        Lead.objects.create(name="C", email="c@x.co", message="x", source="referral", value=1000)
        self.client.force_login(self.mgr)

    def test_group_by_source_count(self):
        rows = self.client.get(reverse("reports"), {"group_by": "source", "measure": "count"}).json()["rows"]
        by = {r["label"]: r["total"] for r in rows}
        self.assertEqual(by["offer_page"], 2)
        self.assertEqual(by["referral"], 1)

    def test_group_by_source_value(self):
        rows = self.client.get(reverse("reports"), {"group_by": "source", "measure": "value"}).json()["rows"]
        by = {r["label"]: r["total"] for r in rows}
        self.assertEqual(by["offer_page"], 8000)


class EmailTemplateTests(TestCase):
    def setUp(self):
        cache.clear()
        self.mgr = User.objects.create_user("m", password="x", role=User.Role.MANAGER)
        self.client.force_login(self.mgr)

    def test_send_email_renders_placeholders_and_logs(self):
        EmailTemplate.objects.create(name="Intro", subject="Hi {{name}}", body="About {{company}}")
        lead = Lead.objects.create(name="Tendai", email="t@x.co", company="Moyo Co", message="x")
        response = self.client.post(
            reverse("lead-send-email", args=[lead.id]),
            {"subject": "Hi {{name}}", "body": "About {{company}}"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(mail.outbox[-1].subject, "Hi Tendai")
        self.assertIn("Moyo Co", mail.outbox[-1].body)
        self.assertTrue(lead.activities.filter(kind="email").exists())

    def test_send_email_requires_an_address(self):
        lead = Lead.objects.create(name="No Email", message="x")
        response = self.client.post(
            reverse("lead-send-email", args=[lead.id]),
            {"subject": "x", "body": "y"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)


class WebToLeadTests(TestCase):
    def setUp(self):
        cache.clear()
        self.key = IntakeKey.objects.create(name="Partner Site", key="secret-key-123")

    def test_valid_key_creates_a_lead(self):
        response = self.client.post(
            reverse("intake"),
            {"name": "Web Lead", "email": "web@x.co", "message": "hi"},
            content_type="application/json",
            HTTP_X_API_KEY="secret-key-123",
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Lead.objects.filter(name="Web Lead").exists())

    def test_invalid_key_is_rejected(self):
        response = self.client.post(
            reverse("intake"),
            {"name": "Web Lead", "email": "web@x.co", "message": "hi"},
            content_type="application/json",
            HTTP_X_API_KEY="wrong",
        )
        self.assertEqual(response.status_code, 403)
        self.assertFalse(Lead.objects.exists())


class AuditLogAccessTests(TestCase):
    def setUp(self):
        cache.clear()
        self.admin = User.objects.create_user("admin", password="x", role=User.Role.ADMIN)
        self.mgr = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        AuditLog.objects.create(actor=self.admin, verb="deleted", target="Lead: X")

    def test_admin_can_read_audit_log(self):
        self.client.force_login(self.admin)
        self.assertEqual(self.client.get(reverse("auditlog-list")).status_code, 200)

    def test_manager_cannot_read_audit_log(self):
        self.client.force_login(self.mgr)
        self.assertEqual(self.client.get(reverse("auditlog-list")).status_code, 403)


class IcsTests(TestCase):
    def setUp(self):
        cache.clear()
        self.mgr = User.objects.create_user("m", password="x", role=User.Role.MANAGER)
        self.client.force_login(self.mgr)

    def test_task_ics_download(self):
        from .models import Task

        lead = Lead.objects.create(name="A", email="a@x.co", message="x", owner=self.mgr)
        task = Task.objects.create(lead=lead, title="Call back", due_date="2026-08-01")
        response = self.client.get(reverse("task-ics", args=[task.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "text/calendar")
        self.assertIn("BEGIN:VCALENDAR", response.content.decode())
