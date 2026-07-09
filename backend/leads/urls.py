from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import LeadViewSet, StatsView, TaskViewSet

router = DefaultRouter()
router.register("leads", LeadViewSet, basename="lead")
router.register("tasks", TaskViewSet, basename="task")

urlpatterns = [
    path("stats/", StatsView.as_view(), name="stats"),
    path("", include(router.urls)),
]
