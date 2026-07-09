from django.urls import path

from .views import CSRFView, LoginView, LogoutView, MeView, SalesTeamView

urlpatterns = [
    path("auth/csrf/", CSRFView.as_view(), name="auth-csrf"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutView.as_view(), name="auth-logout"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("team/", SalesTeamView.as_view(), name="sales-team"),
]
