from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AuditLogView,
    CompanyViewSet,
    ContactViewSet,
    CustomFieldDefViewSet,
    EmailTemplateViewSet,
    IntakeKeyViewSet,
    IntakeView,
    LeadViewSet,
    NotificationViewSet,
    ReportView,
    SavedViewViewSet,
    StatsView,
    TagViewSet,
    TaskViewSet,
)

router = DefaultRouter()
router.register("leads", LeadViewSet, basename="lead")
router.register("tasks", TaskViewSet, basename="task")
router.register("tags", TagViewSet, basename="tag")
router.register("companies", CompanyViewSet, basename="company")
router.register("contacts", ContactViewSet, basename="contact")
router.register("notifications", NotificationViewSet, basename="notification")
router.register("saved-views", SavedViewViewSet, basename="savedview")
router.register("email-templates", EmailTemplateViewSet, basename="emailtemplate")
router.register("custom-fields", CustomFieldDefViewSet, basename="customfield")
router.register("intake-keys", IntakeKeyViewSet, basename="intakekey")
router.register("audit-log", AuditLogView, basename="auditlog")

urlpatterns = [
    path("stats/", StatsView.as_view(), name="stats"),
    path("reports/", ReportView.as_view(), name="reports"),
    path("intake/", IntakeView.as_view(), name="intake"),
    path("", include(router.urls)),
]
