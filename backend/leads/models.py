import uuid

from django.conf import settings
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
        settings.AUTH_USER_MODEL,
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


class Activity(models.Model):
    """
    The audit trail on a lead. Notes are written by humans; the rest are
    written by the system when a lead moves stage or changes hands, so the
    history of a deal survives the person who worked it.
    """

    class Kind(models.TextChoices):
        CREATED = "created", "Created"
        NOTE = "note", "Note"
        STATUS_CHANGE = "status_change", "Status change"
        ASSIGNMENT = "assignment", "Assignment"

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="activities")
    kind = models.CharField(max_length=20, choices=Kind.choices, default=Kind.NOTE)
    body = models.TextField(blank=True)
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="activities",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "activities"

    def __str__(self):
        return f"{self.get_kind_display()} on {self.lead_id}"


class Task(models.Model):
    """A follow-up somebody owes this lead by a date."""

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=300)
    due_date = models.DateField(null=True, blank=True)
    assignee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tasks",
    )
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["is_done", "due_date", "-created_at"]

    def __str__(self):
        return self.title
