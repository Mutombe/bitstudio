"""
Local development seed. NEVER run this against a production database.

Creates one manager and one sales rep so the CRM has somebody to log in as,
plus a couple of leads so the board isn't empty. Guarded against running
anywhere but SQLite.

    python manage.py shell < seed_dev.py
"""

import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.conf import settings  # noqa: E402
from django.contrib.auth import get_user_model  # noqa: E402

from leads.models import Activity, Lead  # noqa: E402

engine = settings.DATABASES["default"]["ENGINE"]
if "sqlite" not in engine:
    raise SystemExit(f"Refusing to seed a non-SQLite database ({engine}).")

User = get_user_model()

manager, _ = User.objects.get_or_create(
    username="manager",
    defaults={"first_name": "Rutendo", "last_name": "Chikafu", "role": User.Role.MANAGER},
)
manager.set_password("devpassword")
manager.is_staff = True
manager.save()

sales, _ = User.objects.get_or_create(
    username="sales",
    defaults={"first_name": "Tapiwa", "last_name": "Ncube", "role": User.Role.SALES},
)
sales.set_password("devpassword")
sales.save()

seeds = [
    {
        "name": "Tendai Moyo",
        "email": "tendai@example.co.zw",
        "company": "Moyo Properties",
        "message": "We track 400 tenants in Excel. Rent records keep going missing.",
        "source": Lead.Source.OFFER_PAGE,
        "offer_slug": "real-estate-automation",
        "tier": "Rent Collection Accelerator",
    },
    {
        "name": "Farai Dube",
        "email": "farai@example.co.zw",
        "company": "Dube Haulage",
        "message": "Fuel keeps disappearing and we only find out weeks later.",
        "source": Lead.Source.OFFER_PAGE,
        "offer_slug": "transport-logistics",
        "tier": "Fleet Visibility System",
        "status": Lead.Status.CONTACTED,
        "owner": sales,
    },
    {
        "name": "Chipo Banda",
        "email": "chipo@example.co.zw",
        "message": "Can you replace our spreadsheets?",
        "source": Lead.Source.CONTACT_FORM,
    },
]

for data in seeds:
    lead, created = Lead.objects.get_or_create(email=data["email"], defaults=data)
    if created:
        Activity.objects.create(
            lead=lead,
            kind=Activity.Kind.CREATED,
            body=f"Lead arrived from {lead.get_source_display().lower()}.",
        )

print(f"users: {User.objects.count()}  leads: {Lead.objects.count()}")
print("login: manager / devpassword   (or) sales / devpassword")
