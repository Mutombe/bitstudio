import csv
from datetime import timedelta
from decimal import Decimal

from django.db.models import Count, Q, Sum
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Activity, Lead, Task
from .pricing import resolve_lead_value
from .serializers import (
    ActivityLogSerializer,
    ActivitySerializer,
    LeadCreateSerializer,
    LeadDetailSerializer,
    LeadListSerializer,
    LeadWriteSerializer,
    TaskListSerializer,
    TaskSerializer,
)

# Stages where a deal is still live and its value counts toward the pipeline.
OPEN_STATUSES = [
    Lead.Status.NEW,
    Lead.Status.CONTACTED,
    Lead.Status.QUALIFIED,
    Lead.Status.PROPOSAL,
]


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
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    One create endpoint serves two callers: an anonymous POST is the public
    website intake (narrow, throttled, honeypotted); an authenticated POST is
    a staff member adding a lead by hand, with full control over its fields.

    Deleting a lead is restricted to managers and admins — a rep can't erase
    their own losses.
    """

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_throttles(self):
        # Only the anonymous public intake is rate-limited. A signed-in staff
        # member adding leads should never be throttled.
        anonymous_create = self.action == "create" and not self.request.user.is_authenticated
        self.throttle_scope = "lead_create" if anonymous_create else None
        return super().get_throttles()

    def get_serializer_class(self):
        if self.action == "create":
            # Staff creating a lead get the full write serializer; the public
            # website gets the narrow, honeypotted intake one.
            return (
                LeadWriteSerializer
                if self.request.user.is_authenticated
                else LeadCreateSerializer
            )
        return {
            "list": LeadListSerializer,
            "retrieve": LeadDetailSerializer,
            "update": LeadWriteSerializer,
            "partial_update": LeadWriteSerializer,
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
        if self.request.user.is_authenticated:
            # Staff-entered lead. Default it to the creator and to the "manual"
            # source, and price it from the offer/tier if they picked one and
            # didn't type a value.
            data = serializer.validated_data
            defaults = {}
            if not data.get("owner"):
                defaults["owner"] = self.request.user
            if not data.get("source"):
                defaults["source"] = Lead.Source.MANUAL
            if not data.get("value"):
                defaults["value"] = resolve_lead_value(
                    data.get("offer_slug", ""), data.get("tier", "")
                )
            lead = serializer.save(**defaults)
            Activity.objects.create(
                lead=lead,
                kind=Activity.Kind.CREATED,
                actor=self.request.user,
                body=f"Added by {self.request.user.get_full_name() or self.request.user.username}.",
            )
            return

        # Anonymous public intake. Seed value from the offer + tier the buyer
        # clicked, and record the request for abuse forensics.
        lead = serializer.save(
            ip_address=client_ip(self.request),
            user_agent=self.request.META.get("HTTP_USER_AGENT", "")[:400],
            value=resolve_lead_value(
                serializer.validated_data.get("offer_slug", ""),
                serializer.validated_data.get("tier", ""),
            ),
        )
        Activity.objects.create(
            lead=lead,
            kind=Activity.Kind.CREATED,
            body=f"Lead arrived from {lead.get_source_display().lower()}.",
        )

    def perform_update(self, serializer):
        before = self.get_object()
        old_status, old_owner = before.status, before.owner
        # Snapshot the editable contact fields to detect a plain edit.
        tracked = ["name", "email", "phone", "company", "message", "value", "tier", "offer_slug"]
        old_values = {f: getattr(before, f) for f in tracked}

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
        changed = [f for f in tracked if getattr(lead, f) != old_values[f]]
        if changed:
            Activity.objects.create(
                lead=lead,
                kind=Activity.Kind.EDITED,
                actor=actor,
                body="Edited " + ", ".join(changed) + ".",
            )

    def perform_destroy(self, instance):
        if not self.request.user.can_see_all_leads:
            raise PermissionDenied("Only managers can delete leads.")
        instance.delete()

    @action(detail=True, methods=["post"])
    def notes(self, request, pk=None):
        """Log a touch: a note, or a call / email / meeting / WhatsApp."""
        lead = self.get_object()
        serializer = ActivityLogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        activity = Activity.objects.create(
            lead=lead,
            kind=serializer.validated_data["kind"],
            body=serializer.validated_data["body"],
            actor=request.user,
        )
        return Response(
            ActivitySerializer(activity).data, status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=["get"])
    def export(self, request):
        """CSV of the leads the caller can see, honouring the active filters."""
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="leads.csv"'
        writer = csv.writer(response)
        writer.writerow(
            ["Name", "Email", "Phone", "Company", "Source", "Offer", "Tier",
             "Stage", "Value (USD)", "Owner", "Created"]
        )
        for lead in self.filter_queryset(self.get_queryset()):
            writer.writerow(
                [
                    lead.name,
                    lead.email,
                    lead.phone,
                    lead.company,
                    lead.get_source_display(),
                    lead.offer_slug,
                    lead.tier,
                    lead.get_status_display(),
                    lead.value,
                    lead.owner.get_full_name() if lead.owner else "",
                    lead.created_at.isoformat(),
                ]
            )
        return response

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
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    List, tick off, or drop follow-ups — scoped to leads you can see.

    `?assignee=me` powers the "my follow-ups" view; `?open=1` hides completed
    ones. Ordered soonest-due first so overdue work floats to the top.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        return TaskListSerializer if self.action == "list" else TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.filter(
            lead__in=scoped_leads(self.request.user)
        ).select_related("assignee", "lead")

        params = self.request.query_params
        if params.get("assignee") == "me":
            queryset = queryset.filter(assignee=self.request.user)
        if params.get("open") in ("1", "true"):
            queryset = queryset.filter(is_done=False)
        return queryset


class StatsView(APIView):
    """Numbers for the dashboard, scoped to what the caller may see."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        queryset = scoped_leads(request.user)
        week_ago = timezone.now() - timedelta(days=7)

        rows = queryset.values("status").annotate(
            count=Count("id"), value=Sum("value")
        )
        by_status = {r["status"]: r["count"] for r in rows}
        value_by_status = {r["status"]: (r["value"] or Decimal("0")) for r in rows}

        won = by_status.get(Lead.Status.WON, 0)
        lost = by_status.get(Lead.Status.LOST, 0)
        decided = won + lost

        # Conversion by offer page: which of the offers we built and ranked
        # for actually turns into money. Open value is still in play; won
        # value has closed.
        by_offer = []
        offer_rows = (
            queryset.exclude(offer_slug="")
            .values("offer_slug")
            .annotate(total=Count("id"))
            .order_by("-total")
        )
        for row in offer_rows:
            slug = row["offer_slug"]
            leads_for_offer = queryset.filter(offer_slug=slug)
            by_offer.append(
                {
                    "offer_slug": slug,
                    "total": row["total"],
                    "won": leads_for_offer.filter(status=Lead.Status.WON).count(),
                    "pipeline_value": leads_for_offer.filter(
                        status__in=OPEN_STATUSES
                    ).aggregate(v=Sum("value"))["v"]
                    or 0,
                    "won_value": leads_for_offer.filter(
                        status=Lead.Status.WON
                    ).aggregate(v=Sum("value"))["v"]
                    or 0,
                }
            )

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
                # Money.
                "pipeline_value": sum(
                    (value_by_status.get(s, Decimal("0")) for s in OPEN_STATUSES),
                    Decimal("0"),
                ),
                "won_value": value_by_status.get(Lead.Status.WON, Decimal("0")),
                # None (not 0) when nothing has been decided, so the UI can say
                # "no data yet" rather than "0% win rate".
                "win_rate": round(won / decided, 3) if decided else None,
                "by_offer": by_offer,
            }
        )
