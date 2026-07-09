from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import LoginSerializer, UserSerializer


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
        return Response(UserSerializer(user).data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
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
