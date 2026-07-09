from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import Activity, Lead, Task


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


class ActivitySerializer(serializers.ModelSerializer):
    actor = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ["id", "kind", "body", "actor", "created_at"]
        read_only_fields = ["id", "kind", "actor", "created_at"]


class NoteCreateSerializer(serializers.Serializer):
    body = serializers.CharField(allow_blank=False)


class TaskSerializer(serializers.ModelSerializer):
    assignee = UserSerializer(read_only=True)
    assignee_id = serializers.PrimaryKeyRelatedField(
        source="assignee",
        queryset=Task._meta.get_field("assignee").related_model.objects.all(),
        required=False,
        allow_null=True,
        write_only=True,
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "lead",
            "title",
            "due_date",
            "assignee",
            "assignee_id",
            "is_done",
            "created_at",
        ]
        read_only_fields = ["id", "lead", "created_at"]


class LeadListSerializer(serializers.ModelSerializer):
    """The Kanban card. Small on purpose — a board loads hundreds of these."""

    owner = UserSerializer(read_only=True)

    class Meta:
        model = Lead
        fields = [
            "id",
            "name",
            "email",
            "company",
            "source",
            "offer_slug",
            "tier",
            "status",
            "owner",
            "created_at",
        ]
        read_only_fields = fields


class LeadDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

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
            "status",
            "owner",
            "created_at",
            "updated_at",
            "activities",
            "tasks",
        ]
        read_only_fields = fields


class LeadUpdateSerializer(serializers.ModelSerializer):
    """
    The only fields the CRM may change. Buyer-supplied facts stay immutable —
    nobody edits what the lead actually said.
    """

    class Meta:
        model = Lead
        fields = ["status", "owner"]

    def validate_owner(self, value):
        user = self.context["request"].user
        if not user.can_assign_leads and value not in (None, user):
            raise serializers.ValidationError(
                "You may only assign leads to yourself."
            )
        return value
