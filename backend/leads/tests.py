from django.test import TestCase
from django.urls import reverse

from .models import Lead


class LeadCaptureTests(TestCase):
    """The public intake endpoint is the only anonymous write. Pin it down."""

    def setUp(self):
        self.url = reverse("lead-create")
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
        response = self.client.post(self.url, self.payload, content_type="application/json")

        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.get()
        self.assertEqual(lead.name, "Tendai Moyo")
        self.assertEqual(lead.offer_slug, "real-estate-automation")
        self.assertEqual(lead.tier, "Rent Collection Accelerator")
        self.assertEqual(lead.status, Lead.Status.NEW)

    def test_records_client_ip_from_forwarded_header(self):
        self.client.post(
            self.url,
            self.payload,
            content_type="application/json",
            HTTP_X_FORWARDED_FOR="41.221.0.5, 10.0.0.1",
        )
        self.assertEqual(Lead.objects.get().ip_address, "41.221.0.5")

    def test_honeypot_rejects_bot(self):
        response = self.client.post(
            self.url,
            {**self.payload, "website": "http://spam.example"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_requires_name_email_message(self):
        response = self.client.post(self.url, {"name": "Only"}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_leads_cannot_be_enumerated_anonymously(self):
        Lead.objects.create(name="A", email="a@b.co", message="x")
        response = self.client.get(self.url)
        # Create-only route: no public list.
        self.assertEqual(response.status_code, 405)

    def test_client_cannot_set_status_or_owner(self):
        self.client.post(
            self.url,
            {**self.payload, "status": "won", "owner": 1},
            content_type="application/json",
        )
        lead = Lead.objects.get()
        self.assertEqual(lead.status, Lead.Status.NEW)
        self.assertIsNone(lead.owner)
