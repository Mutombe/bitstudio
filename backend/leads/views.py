from rest_framework import generics, permissions

from .models import Lead
from .serializers import LeadCreateSerializer


def client_ip(request):
    """
    Render terminates TLS at a proxy, so REMOTE_ADDR is the proxy. Take the
    first hop of X-Forwarded-For, which is the client as the edge saw it.
    """
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class LeadCreateView(generics.CreateAPIView):
    """
    POST /api/leads/ — the only anonymous write on this service.

    Create-only by design: there is no public list or detail route, so an
    enquiry can be submitted but never enumerated. Reading leads requires
    an authenticated session (Django admin today, the CRM UI in phase 2).
    """

    queryset = Lead.objects.all()
    serializer_class = LeadCreateSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "lead_create"

    def perform_create(self, serializer):
        serializer.save(
            ip_address=client_ip(self.request),
            user_agent=self.request.META.get("HTTP_USER_AGENT", "")[:400],
        )
