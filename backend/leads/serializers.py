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


class ActivityLogSerializer(serializers.Serializer):
    """A hand-logged touch: a call, an email, a meeting, a WhatsApp, a note."""

    kind = serializers.ChoiceField(choices=sorted(Activity.LOGGABLE_KINDS), default="note")
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


class TaskListSerializer(serializers.ModelSerializer):
    """
    Task with just enough of its lead to render a "my follow-ups" row and link
    back. Used by the flat /api/tasks/ list, not the per-lead view.
    """

    assignee = UserSerializer(read_only=True)
    lead_id = serializers.UUIDField(source="lead.id", read_only=True)
    lead_name = serializers.CharField(source="lead.name", read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "lead_id",
            "lead_name",
            "title",
            "due_date",
            "assignee",
            "is_done",
            "created_at",
        ]
        read_only_fields = fields


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
            "value",
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
            "value",
            "lost_reason",
            "owner",
            "created_at",
            "updated_at",
            "activities",
            "tasks",
        ]
        read_only_fields = fields


class LeadWriteSerializer(serializers.ModelSerializer):
    """
    Staff create and edit. Unlike the public intake, signed-in staff own the
    record: they can add a lead by hand (a phone call, a walk-in, a referral)
    and correct any field on it later. Attribution the browser captured
    (ip_address, user_agent, page_url, referrer, utm_*) stays read-only —
    that's a record of how a web lead actually arrived, not something to edit.
    """

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
            "status",
            "value",
            "lost_reason",
            "owner",
        ]
        read_only_fields = ["id"]
        extra_kwargs = {
            # A lead phoned in may have only a name and a number.
            "email": {"required": False, "allow_blank": True},
            "message": {"required": False, "allow_blank": True},
            "phone": {"required": False, "allow_blank": True},
            "company": {"required": False, "allow_blank": True},
        }

    def validate_value(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Value cannot be negative.")
        return value

    def validate_owner(self, value):
        user = self.context["request"].user
        if not user.can_assign_leads and value not in (None, user):
            raise serializers.ValidationError(
                "You may only assign leads to yourself."
            )
        return value
