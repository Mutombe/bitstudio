from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health(_request):
    """Cheap liveness probe for Render."""
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("healthz", health),
    path("admin/", admin.site.urls),
    path("api/", include("leads.urls")),
]
