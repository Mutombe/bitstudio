import re
from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.test import TestCase

from .pricing import OFFER_PRICING, resolve_lead_value

OFFERS_JS = (
    Path(settings.BASE_DIR).parent / "frontend" / "src" / "data" / "offers.js"
)


def base_price(text):
    """'$16,000+' -> 16000."""
    digits = re.sub(r"[^0-9]", "", text)
    return int(digits) if digits else 0


class PricingResolverTests(TestCase):
    def test_exact_tier_match(self):
        self.assertEqual(
            resolve_lead_value("real-estate-automation", "Property ERP"),
            Decimal("16000"),
        )

    def test_missing_tier_falls_back_to_cheapest(self):
        # Buyer landed on the offer but picked no tier: value the pipeline at
        # the starting price, not zero.
        self.assertEqual(
            resolve_lead_value("real-estate-automation", ""), Decimal("5000")
        )

    def test_unknown_offer_is_zero(self):
        self.assertEqual(resolve_lead_value("some-eur-package", "x"), Decimal("0"))


class PricingDriftTests(TestCase):
    """
    pricing.py is hand-mirrored from offers.js. This parses the JS and fails
    if a tier there is missing or repriced here — so the two cannot silently
    drift apart.
    """

    def test_every_offers_js_tier_price_is_mirrored(self):
        flat = {
            tier: value
            for tiers in OFFER_PRICING.values()
            for tier, value in tiers.items()
        }
        source = OFFERS_JS.read_text(encoding="utf-8")

        # Pull the tiers array of each offer and read badge/name/price from it.
        tier_blocks = re.findall(
            r'badge:\s*"[^"]+",\s*name:\s*"([^"]+)",\s*price:\s*"([^"]+)"',
            source,
        )
        self.assertGreater(len(tier_blocks), 0, "parsed no tiers from offers.js")

        for name, price in tier_blocks:
            with self.subTest(tier=name):
                self.assertIn(name, flat, f"tier '{name}' missing from pricing.py")
                self.assertEqual(
                    flat[name],
                    base_price(price),
                    f"tier '{name}' priced {price} in offers.js but "
                    f"{flat[name]} in pricing.py",
                )
