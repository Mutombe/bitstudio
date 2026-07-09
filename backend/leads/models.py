import uuid

from django.db import models


class Lead(models.Model):
    """
    An inbound enquiry from the marketing site.

    Every lead carries its own attribution: which offer page it came from,
    which pricing tier the buyer clicked, and the campaign that delivered
    them. That is the whole point — the previous contact form handed the
    visitor to WhatsApp and kept no record at all.

    `status` and `owner` exist now so the pipeline (phase 2) is a UI over
    this table rather than a migration of it.
    """

    class Source(models.TextChoices):
        CONTACT_FORM = "contact_form", "Contact form"
        OFFER_PAGE = "offer_page", "Offer page"
        PACKAGE_PAGE = "package_page", "Package page"
        OTHER = "other", "Other"

    class Channel(models.TextChoices):
        WHATSAPP = "whatsapp", "WhatsApp"
        EMAIL = "email", "Email"

    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        QUALIFIED = "qualified", "Qualified"
        PROPOSAL = "proposal", "Proposal sent"
        WON = "won", "Won"
        LOST = "lost", "Lost"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Who
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    company = models.CharField(max_length=200, blank=True)

    # What they want
    message = models.TextField(help_text="What the buyer said they need.")
    channel = models.CharField(
        max_length=20, choices=Channel.choices, default=Channel.WHATSAPP
    )

    # Where they came from
    source = models.CharField(
        max_length=20, choices=Source.choices, default=Source.CONTACT_FORM
    )
    offer_slug = models.CharField(max_length=100, blank=True)
    tier = models.CharField(max_length=100, blank=True)
    page_url = models.URLField(blank=True, max_length=500)
    referrer = models.URLField(blank=True, max_length=500)
    utm_source = models.CharField(max_length=100, blank=True)
    utm_medium = models.CharField(max_length=100, blank=True)
    utm_campaign = models.CharField(max_length=100, blank=True)

    # Pipeline (surfaced in phase 2)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    owner = models.ForeignKey(
        "auth.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="leads",
        help_text="Salesperson responsible for this lead.",
    )

    # Abuse forensics. Retained to defend the public endpoint against spam.
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=400, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["status", "-created_at"])]

    def __str__(self):
        label = self.offer_slug or self.get_source_display()
        return f"{self.name} · {label}"
