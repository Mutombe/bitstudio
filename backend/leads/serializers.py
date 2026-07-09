from rest_framework import serializers

from .models import Lead


class LeadCreateSerializer(serializers.ModelSerializer):
    """
    Public intake. Deliberately narrow: the browser may only set the fields
    a human actually fills in, plus attribution. Anything trust-sensitive
    (ip_address, user_agent, status, owner) is set server-side.
    """

    # Honeypot. Real humans never see this field, so a filled value is a bot.
    website = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    class Meta:
        model = Lead
        fields = [
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
            "website",
        ]
        read_only_fields = ["id"]

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Rejected.")
        return value

    def create(self, validated_data):
        validated_data.pop("website", None)
        return super().create(validated_data)
