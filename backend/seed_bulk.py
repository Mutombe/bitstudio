"""
Load the dev database with volume, to prove the list/board surfaces page
properly instead of silently showing page one.

    python seed_bulk.py [count]

SQLite only — refuses to touch a real database.
"""

import os
import random
import sys

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.conf import settings  # noqa: E402
from django.contrib.auth import get_user_model  # noqa: E402

from leads.models import Company, Lead  # noqa: E402

if "sqlite" not in settings.DATABASES["default"]["ENGINE"]:
    raise SystemExit("Refusing to bulk-seed a non-SQLite database.")

COUNT = int(sys.argv[1]) if len(sys.argv) > 1 else 120
User = get_user_model()
owner = User.objects.filter(username="manager").first()
STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost"]
SOURCES = ["offer_page", "contact_form", "referral", "manual", "phone"]

companies = [
    Company.objects.get_or_create(name=f"Bulk Co {i:03d}", defaults={"industry": "Test"})[0]
    for i in range(60)
]

created = 0
for i in range(COUNT):
    email = f"bulk{i:04d}@example.co.zw"
    if Lead.objects.filter(email=email).exists():
        continue
    Lead.objects.create(
        name=f"Bulk Lead {i:04d}",
        email=email,
        phone="+2637700000%02d" % (i % 100),
        company=f"Bulk Co {i % 60:03d}",
        company_ref=companies[i % 60],
        message="Volume test record.",
        status=random.choice(STATUSES),
        source=random.choice(SOURCES),
        value=random.choice([0, 3500, 5000, 8000, 12000, 20000]),
        owner=owner if i % 3 == 0 else None,
    )
    created += 1

print(f"created {created} leads · totals -> leads={Lead.objects.count()} companies={Company.objects.count()}")
