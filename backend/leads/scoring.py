"""
Rule-based lead scoring, 0-100.

Deliberately simple and transparent: a founder can read these rules and agree
with them. Computed from fields only (no queries), so it can run inside
Lead.save() for a brand-new, unsaved lead. `score_breakdown` explains a score
to the UI.
"""

# Deal-value bands (USD) → points.
_VALUE_BANDS = [(20000, 30), (8000, 20), (1, 10)]

# How much the acquisition channel says about intent.
_SOURCE_POINTS = {
    "offer_page": 20,     # landed on a priced offer
    "package_page": 18,
    "referral": 15,
    "phone": 12,
    "walk_in": 12,
    "contact_form": 10,
    "manual": 8,
    "other": 5,
}

# Pipeline progress is itself a signal.
_STATUS_POINTS = {
    "new": 0,
    "contacted": 5,
    "qualified": 15,
    "proposal": 25,
    "won": 40,
    "lost": 0,
}


def score_breakdown(lead):
    parts = {}
    if lead.email:
        parts["Has email"] = 15
    if lead.phone:
        parts["Has phone"] = 15
    if lead.company or lead.company_ref_id:
        parts["Has company"] = 10

    value = float(lead.value or 0)
    for threshold, points in _VALUE_BANDS:
        if value >= threshold:
            parts["Deal value"] = points
            break

    src = _SOURCE_POINTS.get(lead.source, 0)
    if src:
        parts[f"Source: {lead.get_source_display()}"] = src

    status = _STATUS_POINTS.get(lead.status, 0)
    if status:
        parts[f"Stage: {lead.get_status_display()}"] = status

    return parts


def compute_score(lead):
    return min(100, sum(score_breakdown(lead).values()))
