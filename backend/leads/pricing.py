"""
Offer pricing, mirrored from frontend/src/data/offers.js.

A lead that arrives from an offer page already knows which offer and tier the
buyer clicked, so it can carry its own dollar value from the moment it lands.
This is the table that turns `offer_slug` + `tier` into money.

Kept as a plain dict rather than parsed from the JS because the backend can't
import a React module — and a small, explicit table is easier to audit than a
regex over JSX. `test_pricing.py` guards it: every tier here must exist, and
the numbers are the starting price of each tier (the "+" tiers use their base,
which is the conservative pipeline figure).

If you add or reprice an offer in offers.js, update this and the test will
tell you if a tier name drifted.
"""

from decimal import Decimal

# offer_slug -> { exact tier name : starting USD value }
OFFER_PRICING = {
    "real-estate-automation": {
        "Rent Collection Accelerator": 5000,
        "Property Operations Platform": 8000,
        "Property ERP": 16000,
    },
    "transport-logistics": {
        "Fleet Visibility System": 6000,
        "Logistics Control Center": 12000,
        "Transport ERP": 25000,
    },
    "car-dealerships": {
        "Vehicle Inventory Platform": 3500,
        "Digital Dealership System": 7500,
        "Automotive ERP": 15000,
    },
    "construction": {
        "Site Management Platform": 5000,
        "Construction Operations Platform": 10000,
        "Construction ERP": 20000,
    },
    "replace-excel": {
        "Excel Replacement System": 4000,
    },
    "erp-development": {
        "Core ERP Module": 8000,
        "Integrated ERP": 18000,
        "Full Enterprise ERP": 35000,
    },
    "crm-development": {
        "Sales Pipeline CRM": 4500,
        "Sales Operations CRM": 9000,
        "Revenue Platform": 18000,
    },
    "ai-automation": {
        "AI Assistant": 3500,
        "AI Automation Suite": 9000,
        "AI Operations Platform": 20000,
    },
}


def resolve_lead_value(offer_slug, tier=""):
    """
    Best dollar estimate for a lead, as a Decimal.

    Exact (offer, tier) match wins. Failing that — the buyer landed on the
    offer but didn't pick a tier — fall back to that offer's starting price,
    the cheapest tier, so the pipeline is valued conservatively rather than
    at zero. Unknown offer (e.g. a EUR package) returns 0; a human sets it.
    """
    tiers = OFFER_PRICING.get(offer_slug)
    if not tiers:
        return Decimal("0")

    if tier and tier in tiers:
        return Decimal(tiers[tier])

    return Decimal(min(tiers.values()))
