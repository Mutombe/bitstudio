from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import (
    LoginSerializer,
    PasswordResetSerializer,
    UserCreateSerializer,
    UserManageSerializer,
    UserSerializer,
)


class IsAdmin(permissions.BasePermission):
    """User administration is for admins and superusers only."""

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and (user.is_superuser or user.role == User.Role.ADMIN)
        )


@method_decorator(ensure_csrf_cookie, name="get")
class CSRFView(APIView):
    """
    The SPA calls this once before logging in. It plants the csrftoken
    cookie, which the client echoes back as the X-CSRFToken header on every
    unsafe request.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, _request):
        return Response({"detail": "CSRF cookie set"})


# DRF's SessionAuthentication only enforces CSRF when it authenticates an
# existing session. A login request is anonymous, so that check never fires
# and the endpoint would be wide open to login CSRF — an attacker forcing a
# victim's browser to sign in as the attacker. Demand the token explicitly.
@method_decorator(csrf_protect, name="post")
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_scope = "login"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )
        # One message for both "no such user" and "wrong password" — never
        # confirm which usernames exist.
        if user is None:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        login(request, user)
        from leads.services import audit  # local import avoids an import cycle
        audit(user, "logged in", f"User: {user.username}")
        return Response(UserSerializer(user).data)


# Cross-domain login. The SPA on bitstudio.co.zw can't use the cookie flow
# above — the csrftoken and session cookies are cross-site and never reach a
# *.onrender.com API — so it authenticates here and gets a token to send in
# the Authorization header. No Django session is created, so there is no
# session cookie to hijack and thus no login-CSRF vector; authentication_classes
# is empty so DRF never runs its CSRF check on this anonymous POST.
class TokenLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    throttle_scope = "login"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )
        if user is None:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        from rest_framework.authtoken.models import Token

        token, _ = Token.objects.get_or_create(user=user)
        from leads.services import audit  # local import avoids an import cycle

        audit(user, "logged in", f"User: {user.username}")
        data = UserSerializer(user).data
        data["token"] = token.key
        return Response(data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Drop the token so it can't be reused, and clear any session too.
        from rest_framework.authtoken.models import Token

        Token.objects.filter(user=request.user).delete()
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class SalesTeamView(APIView):
    """Assignable users, for the owner dropdown. Managers and admins only."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.can_assign_leads:
            return Response([], status=status.HTTP_200_OK)
        users = User.objects.filter(is_active=True).order_by("username")
        return Response(UserSerializer(users, many=True).data)


class UserViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    User administration, admins only. Users are deactivated (is_active=False),
    never deleted — so the leads, notes, and activity they created keep their
    author. There's no destroy route for the same reason.
    """

    queryset = User.objects.order_by("username")
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        return UserCreateSerializer if self.action == "create" else UserManageSerializer

    def _guard_not_self_lockout(self, target):
        # An admin must not deactivate or demote themselves and get locked out.
        if target == self.request.user:
            raise ValidationError("You cannot change your own access here.")

    def perform_create(self, serializer):
        from leads.services import audit

        user = serializer.save()
        audit(self.request.user, "created", f"User: {user.username}", f"role={user.role}")

    def perform_update(self, serializer):
        from leads.services import audit

        target = self.get_object()
        changing_access = (
            "is_active" in serializer.validated_data
            or "role" in serializer.validated_data
        )
        if changing_access:
            self._guard_not_self_lockout(target)
        user = serializer.save()
        audit(self.request.user, "updated", f"User: {user.username}")

    @action(detail=True, methods=["post"], url_path="reset-password")
    def reset_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user.set_password(serializer.validated_data["password"])
        user.save(update_fields=["password"])
        return Response({"detail": "Password reset."})
