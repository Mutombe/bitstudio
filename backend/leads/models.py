import uuid

from django.conf import settings
from django.db import models


class Tag(models.Model):
    """A flexible label on leads: 'Hot', 'Enterprise', 'Follow up in Q3'."""

    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default="#D4FF3A")  # hex, for the chip
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


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
        MANUAL = "manual", "Added by staff"
        REFERRAL = "referral", "Referral"
        PHONE = "phone", "Phone call"
        WALK_IN = "walk_in", "Walk-in"
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
    # Estimated deal value in USD. Seeded from the offer + tier the buyer
    # clicked (see pricing.resolve_lead_value), editable by staff afterwards.
    # This is what lets the dashboard talk in money instead of lead counts.
    value = models.DecimalField(
        max_digits=12, decimal_places=2, default=0,
        help_text="Estimated deal value in USD.",
    )
    # Why a deal was lost. Only meaningful once status is 'lost'; kept so the
    # team can learn from the pattern instead of just counting losses.
    lost_reason = models.CharField(max_length=300, blank=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="leads")
    # Optional link to a first-class Company record (the free-text `company`
    # above stays for web leads that arrive with just a string).
    company_ref = models.ForeignKey(
        "Company", null=True, blank=True, on_delete=models.SET_NULL, related_name="leads"
    )
    # 0-100 rule-based lead score (see scoring.compute_score), recomputed on
    # save so the list can rank leads by how promising they look.
    score = models.PositiveSmallIntegerField(default=0, db_index=True)
    # Values for admin-defined custom fields, keyed by CustomFieldDef.key.
    custom = models.JSONField(default=dict, blank=True)
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

    def save(self, *args, **kwargs):
        from .scoring import compute_score

        self.score = compute_score(self)
        super().save(*args, **kwargs)

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
        CALL = "call", "Call logged"
        EMAIL = "email", "Email logged"
        MEETING = "meeting", "Meeting logged"
        WHATSAPP = "whatsapp", "WhatsApp logged"
        STATUS_CHANGE = "status_change", "Status change"
        ASSIGNMENT = "assignment", "Assignment"
        EDITED = "edited", "Edited"

    # Kinds a human may log by hand (the rest are written by the system).
    LOGGABLE_KINDS = {"note", "call", "email", "meeting", "whatsapp"}

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


class Company(models.Model):
    """A first-class account, so a repeat client isn't just a string on N leads."""

    name = models.CharField(max_length=200, unique=True)
    website = models.URLField(blank=True, max_length=300)
    industry = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    notes = models.TextField(blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="companies",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name


class Contact(models.Model):
    """A person at a company."""

    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    title = models.CharField(max_length=120, blank=True)
    company = models.ForeignKey(
        Company, null=True, blank=True, on_delete=models.SET_NULL, related_name="contacts"
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Notification(models.Model):
    """An in-app alert for a user (a lead assigned to them, a new web lead)."""

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications"
    )
    text = models.CharField(max_length=300)
    link = models.CharField(max_length=300, blank=True)  # in-app path, e.g. /admin/leads/<id>
    is_read = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.recipient_id}: {self.text}"


class AuditLog(models.Model):
    """
    A cross-cutting record of who did what, across the whole CRM — distinct
    from per-lead Activity. Admins read this to answer 'who deleted that?'.
    """

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="audit_entries",
    )
    verb = models.CharField(max_length=40)          # created / updated / deleted / logged_in …
    target = models.CharField(max_length=120, blank=True)  # "Lead: Tendai Moyo"
    summary = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.actor_id} {self.verb} {self.target}"


class SavedView(models.Model):
    """A named set of list filters/sort a user can jump back to."""

    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_views"
    )
    params = models.JSONField(default=dict)  # {q, status, owner, tag, sort, dir}
    shared = models.BooleanField(default=False)  # visible to the whole team
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class EmailTemplate(models.Model):
    """A reusable email with {{name}} / {{company}} / {{offer}} placeholders."""

    name = models.CharField(max_length=120)
    subject = models.CharField(max_length=250)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class CustomFieldDef(models.Model):
    """An admin-defined extra field on leads. Values live in Lead.custom."""

    class FieldType(models.TextChoices):
        TEXT = "text", "Text"
        NUMBER = "number", "Number"
        DATE = "date", "Date"
        SELECT = "select", "Select"

    label = models.CharField(max_length=100)
    key = models.SlugField(max_length=60, unique=True)
    field_type = models.CharField(max_length=20, choices=FieldType.choices, default=FieldType.TEXT)
    options = models.JSONField(default=list, blank=True)  # for select
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class IntakeKey(models.Model):
    """
    An API key that lets an external site POST leads to us (web-to-lead beyond
    our own contact form). Each keyed submission is attributed to its source.
    """

    name = models.CharField(max_length=120)
    key = models.CharField(max_length=48, unique=True, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
