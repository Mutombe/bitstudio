from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import Activity, Lead, Tag, Task


class TagSerializer(serializers.ModelSerializer):
    lead_count = serializers.IntegerField(source="leads.count", read_only=True)

    class Meta:
        model = Tag
        fields = ["id", "name", "color", "lead_count"]


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
    tags = TagSerializer(many=True, read_only=True)

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
            "tags",
            "created_at",
        ]
        read_only_fields = fields


class LeadDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
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
            "tags",
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

    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        source="tags", queryset=Tag.objects.all(), many=True, required=False, write_only=True
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
            "status",
            "value",
            "lost_reason",
            "tags",
            "tag_ids",
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


class BulkActionSerializer(serializers.Serializer):
    """Apply one action to many leads at once."""

    ids = serializers.ListField(child=serializers.UUIDField(), allow_empty=False)
    action = serializers.ChoiceField(
        choices=["assign", "status", "add_tag", "remove_tag", "delete"]
    )
    # Meaning depends on action: a user id, a status value, or a tag id.
    value = serializers.CharField(required=False, allow_null=True, allow_blank=True)
