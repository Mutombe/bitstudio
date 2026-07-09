from datetime import timedelta

from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Activity, Lead, Task
from .serializers import (
    ActivitySerializer,
    LeadCreateSerializer,
    LeadDetailSerializer,
    LeadListSerializer,
    LeadUpdateSerializer,
    NoteCreateSerializer,
    TaskSerializer,
)


def client_ip(request):
    """
    Render terminates TLS at a proxy, so REMOTE_ADDR is the proxy. Take the
    first hop of X-Forwarded-For, which is the client as the edge saw it.
    """
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def scoped_leads(user):
    """
    Sales staff work their own leads plus the unclaimed pool. Managers and
    admins see the whole board. Anonymous callers see nothing, ever.
    """
    if not user.is_authenticated:
        return Lead.objects.none()

    queryset = Lead.objects.select_related("owner")
    if user.can_see_all_leads:
        return queryset
    return queryset.filter(Q(owner=user) | Q(owner__isnull=True))


class LeadViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    `create` is the public intake — the only anonymous write on the service.
    Everything else requires a session. There is deliberately no `destroy`:
    leads are won or lost, never deleted.
    """

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_throttles(self):
        # Only the public intake is rate-limited. ScopedRateThrottle is a
        # no-op when throttle_scope is None.
        self.throttle_scope = "lead_create" if self.action == "create" else None
        return super().get_throttles()

    def get_serializer_class(self):
        return {
            "create": LeadCreateSerializer,
            "list": LeadListSerializer,
            "retrieve": LeadDetailSerializer,
            "update": LeadUpdateSerializer,
            "partial_update": LeadUpdateSerializer,
        }.get(self.action, LeadListSerializer)

    def get_queryset(self):
        # DRF calls this for schema generation with an anonymous user too.
        queryset = scoped_leads(self.request.user)

        params = self.request.query_params
        if lead_status := params.get("status"):
            queryset = queryset.filter(status=lead_status)
        if owner := params.get("owner"):
            if owner == "me" and self.request.user.is_authenticated:
                queryset = queryset.filter(owner=self.request.user)
            elif owner == "unassigned":
                queryset = queryset.filter(owner__isnull=True)
            elif owner.isdigit():
                queryset = queryset.filter(owner_id=int(owner))
        if search := params.get("q"):
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(email__icontains=search)
                | Q(company__icontains=search)
                | Q(message__icontains=search)
                | Q(offer_slug__icontains=search)
            )
        if self.action == "retrieve":
            queryset = queryset.prefetch_related("activities__actor", "tasks__assignee")
        return queryset

    def perform_create(self, serializer):
        lead = serializer.save(
            ip_address=client_ip(self.request),
            user_agent=self.request.META.get("HTTP_USER_AGENT", "")[:400],
        )
        Activity.objects.create(
            lead=lead,
            kind=Activity.Kind.CREATED,
            body=f"Lead arrived from {lead.get_source_display().lower()}.",
        )

    def perform_update(self, serializer):
        before = self.get_object()
        old_status, old_owner = before.status, before.owner

        lead = serializer.save()
        actor = self.request.user

        if lead.status != old_status:
            Activity.objects.create(
                lead=lead,
                kind=Activity.Kind.STATUS_CHANGE,
                actor=actor,
                body=f"{Lead.Status(old_status).label} → {Lead.Status(lead.status).label}",
            )
        if lead.owner != old_owner:
            Activity.objects.create(
                lead=lead,
                kind=Activity.Kind.ASSIGNMENT,
                actor=actor,
                body=f"Assigned to {lead.owner or 'nobody'}",
            )

    @action(detail=True, methods=["post"])
    def notes(self, request, pk=None):
        lead = self.get_object()
        serializer = NoteCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        activity = Activity.objects.create(
            lead=lead,
            kind=Activity.Kind.NOTE,
            body=serializer.validated_data["body"],
            actor=request.user,
        )
        return Response(
            ActivitySerializer(activity).data, status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=["get", "post"])
    def tasks(self, request, pk=None):
        lead = self.get_object()

        if request.method == "GET":
            return Response(TaskSerializer(lead.tasks.all(), many=True).data)

        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(lead=lead)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskViewSet(
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Tick a follow-up off, or drop it. Scoped to leads you can see."""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(
            lead__in=scoped_leads(self.request.user)
        ).select_related("assignee")


class StatsView(APIView):
    """Numbers for the dashboard, scoped to what the caller may see."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        queryset = scoped_leads(request.user)
        week_ago = timezone.now() - timedelta(days=7)

        by_status = {
            row["status"]: row["count"]
            for row in queryset.values("status").annotate(count=Count("id"))
        }

        return Response(
            {
                "total": queryset.count(),
                "by_status": {
                    choice.value: by_status.get(choice.value, 0)
                    for choice in Lead.Status
                },
                "mine": queryset.filter(owner=request.user).count(),
                "unassigned": queryset.filter(owner__isnull=True).count(),
                "new_this_week": queryset.filter(created_at__gte=week_ago).count(),
                "open_tasks": Task.objects.filter(
                    lead__in=queryset, is_done=False
                ).count(),
            }
        )
