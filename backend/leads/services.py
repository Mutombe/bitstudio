"""
Cross-cutting side effects: notifications, outbound email, audit, calendar.

Notifications are always written in-app (a Notification row). If the
recipient has an email and a mail backend is configured, we also send an
email — best-effort, never blocking the request. In dev the console email
backend just prints it; in prod SMTP env vars make it real.
"""

import re
from datetime import datetime

from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

from .models import AuditLog, Notification


def notify(recipient, text, link="", email=True):
    """In-app notification for one user, plus a best-effort email."""
    if recipient is None:
        return None
    note = Notification.objects.create(recipient=recipient, text=text, link=link)
    if email and recipient.email:
        url = f"{settings.SITE_ORIGIN}{link}" if link else settings.SITE_ORIGIN
        try:
            send_mail(
                subject="Bit Studio CRM",
                message=f"{text}\n\n{url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient.email],
                fail_silently=True,
            )
        except Exception:  # noqa: BLE001 — email must never break the request
            pass
    return note


def notify_new_lead(lead):
    """
    A fresh lead arrived. Tell the owner if it has one, otherwise every
    manager/admin so an unclaimed lead doesn't sit unseen.
    """
    from accounts.models import User

    link = f"/admin/leads/{lead.id}"
    if lead.owner:
        notify(lead.owner, f"New lead assigned to you: {lead.name}", link)
        return
    for manager in User.objects.filter(
        is_active=True, role__in=[User.Role.MANAGER, User.Role.ADMIN]
    ):
        notify(manager, f"New unassigned lead: {lead.name}", link)


def notify_assignment(lead, assignee, actor=None):
    if assignee and assignee != actor:
        notify(assignee, f"You were assigned a lead: {lead.name}", f"/admin/leads/{lead.id}")


def audit(actor, verb, target="", summary=""):
    return AuditLog.objects.create(
        actor=actor if getattr(actor, "is_authenticated", False) else None,
        verb=verb,
        target=target,
        summary=summary,
    )


# ─── Email templates ─────────────────────────────────────────────────

def render_template(text, lead):
    """Fill {{name}} / {{company}} / {{offer}} / {{value}} from a lead."""
    values = {
        "name": lead.name,
        "first_name": lead.name.split(" ")[0] if lead.name else "",
        "company": lead.company or (lead.company_ref.name if lead.company_ref else ""),
        "offer": lead.offer_slug,
        "tier": lead.tier,
        "value": str(lead.value),
    }
    return re.sub(
        r"\{\{\s*(\w+)\s*\}\}",
        lambda m: values.get(m.group(1), m.group(0)),
        text or "",
    )


# ─── Calendar (.ics) ─────────────────────────────────────────────────

def task_to_ics(task):
    """A minimal VCALENDAR for a follow-up, droppable into any calendar."""
    dt = task.due_date or timezone.now().date()
    stamp = datetime(dt.year, dt.month, dt.day).strftime("%Y%m%dT090000")
    uid = f"task-{task.id}@bitstudio.co.zw"
    lead = task.lead
    summary = f"Follow up: {task.title}"
    desc = f"{lead.name}" + (f" ({lead.company})" if lead.company else "")
    return (
        "BEGIN:VCALENDAR\r\n"
        "VERSION:2.0\r\n"
        "PRODID:-//Bit Studio CRM//EN\r\n"
        "BEGIN:VEVENT\r\n"
        f"UID:{uid}\r\n"
        f"DTSTART:{stamp}\r\n"
        f"SUMMARY:{summary}\r\n"
        f"DESCRIPTION:{desc}\r\n"
        "END:VEVENT\r\n"
        "END:VCALENDAR\r\n"
    )
