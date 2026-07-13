from django.contrib.auth import authenticate, get_user_model
from django.core.cache import cache
from django.test import TestCase
from django.urls import reverse

User = get_user_model()


class UserAdminTests(TestCase):
    def setUp(self):
        cache.clear()
        self.admin = User.objects.create_user("admin", password="x", role=User.Role.ADMIN)
        self.manager = User.objects.create_user("mgr", password="x", role=User.Role.MANAGER)
        self.list_url = reverse("user-list")

    def detail_url(self, user):
        return reverse("user-detail", args=[user.id])

    def test_admin_can_list_users(self):
        self.client.force_login(self.admin)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)

    def test_manager_cannot_access_user_admin(self):
        self.client.force_login(self.manager)
        self.assertEqual(self.client.get(self.list_url).status_code, 403)

    def test_admin_creates_a_user_who_can_log_in(self):
        self.client.force_login(self.admin)
        response = self.client.post(
            self.list_url,
            {
                "username": "newrep",
                "password": "s0me-str0ng-pass",
                "role": "sales",
                "first_name": "New",
                "last_name": "Rep",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        rep = User.objects.get(username="newrep")
        self.assertEqual(rep.role, "sales")
        self.assertFalse(rep.is_staff)  # sales don't get Django admin
        self.assertIsNotNone(authenticate(username="newrep", password="s0me-str0ng-pass"))

    def test_weak_password_is_rejected(self):
        self.client.force_login(self.admin)
        response = self.client.post(
            self.list_url,
            {"username": "weak", "password": "123", "role": "sales"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

    def test_admin_can_deactivate_a_user(self):
        self.client.force_login(self.admin)
        response = self.client.patch(
            self.detail_url(self.manager),
            {"is_active": False},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.manager.refresh_from_db()
        self.assertFalse(self.manager.is_active)

    def test_admin_cannot_deactivate_self(self):
        self.client.force_login(self.admin)
        response = self.client.patch(
            self.detail_url(self.admin),
            {"is_active": False},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.admin.refresh_from_db()
        self.assertTrue(self.admin.is_active)

    def test_admin_can_reset_a_password(self):
        self.client.force_login(self.admin)
        response = self.client.post(
            reverse("user-reset-password", args=[self.manager.id]),
            {"password": "brand-new-str0ng-pw"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(authenticate(username="mgr", password="brand-new-str0ng-pw"))

    def test_cannot_grant_superuser_over_the_api(self):
        # is_superuser is read-only in the serializer; a payload can't set it.
        self.client.force_login(self.admin)
        self.client.patch(
            self.detail_url(self.manager),
            {"is_superuser": True},
            content_type="application/json",
        )
        self.manager.refresh_from_db()
        self.assertFalse(self.manager.is_superuser)
