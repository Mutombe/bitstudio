from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    can_see_all_leads = serializers.BooleanField(read_only=True)
    can_assign_leads = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "name",
            "role",
            "can_see_all_leads",
            "can_assign_leads",
        ]
        read_only_fields = fields

    def get_name(self, obj):
        return obj.get_full_name() or obj.username


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})


class UserManageSerializer(serializers.ModelSerializer):
    """Admin view of a user: everything read, a safe subset writable."""

    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "name",
            "role",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "date_joined",
        ]
        # Username is identity; superuser status is not handed out over the API.
        read_only_fields = ["id", "username", "name", "is_superuser", "last_login", "date_joined"]

    def get_name(self, obj):
        return obj.get_full_name() or obj.username


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role", "password"]

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(list(exc.messages))
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        # Admins/managers reach the Django admin; sales work the CRM UI.
        user.is_staff = user.role in {User.Role.ADMIN, User.Role.MANAGER}
        user.set_password(password)
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField()

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(list(exc.messages))
        return value
