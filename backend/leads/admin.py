from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    """
    Until the CRM UI lands (phase 2), this is where the sales team works.
    Assign an owner, move the status, read the attribution.
    """

    list_display = ("name", "email", "source", "offer_slug", "status", "owner", "created_at")
    list_filter = ("status", "source", "channel", "owner", "created_at")
    list_editable = ("status", "owner")
    search_fields = ("name", "email", "company", "message", "offer_slug")
    date_hierarchy = "created_at"
    list_per_page = 50

    # Everything the buyer or the server wrote is a fact, not a form field.
    readonly_fields = (
        "id",
        "name",
        "email",
        "phone",
        "company",
        "message",
        "channel",
        "source",
        "offer_slug",
        "tier",
        "page_url",
        "referrer",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "ip_address",
        "user_agent",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        ("Pipeline", {"fields": ("status", "owner")}),
        ("Buyer", {"fields": ("name", "email", "phone", "company", "channel")}),
        ("Enquiry", {"fields": ("message",)}),
        (
            "Attribution",
            {
                "fields": (
                    "source",
                    "offer_slug",
                    "tier",
                    "page_url",
                    "referrer",
                    "utm_source",
                    "utm_medium",
                    "utm_campaign",
                )
            },
        ),
        ("Forensics", {"classes": ("collapse",), "fields": ("id", "ip_address", "user_agent", "created_at", "updated_at")}),
    )

    def has_add_permission(self, request):
        # Leads arrive from the website, not from the admin.
        return False
