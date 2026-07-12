from io import StringIO

from django.contrib.auth import authenticate, get_user_model
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase

User = get_user_model()


class CreateUserCommandTests(TestCase):
    def test_creates_sales_user_with_generated_password(self):
        out = StringIO()
        call_command(
            "createuser",
            "tapiwa",
            role="sales",
            name="Tapiwa Ncube",
            email="tapiwa@bitstudio.co.zw",
            generate_password=True,
            stdout=out,
        )
        user = User.objects.get(username="tapiwa")
        self.assertEqual(user.role, "sales")
        self.assertEqual(user.first_name, "Tapiwa")
        self.assertEqual(user.last_name, "Ncube")
        self.assertFalse(user.is_staff)  # sales don't get Django admin

        # The printed password must actually authenticate.
        printed = out.getvalue().strip().splitlines()[-1].strip()
        self.assertIsNotNone(authenticate(username="tapiwa", password=printed))

    def test_admin_role_gets_staff_access(self):
        call_command("createuser", "boss", role="admin", generate_password=True, stdout=StringIO())
        self.assertTrue(User.objects.get(username="boss").is_staff)

    def test_superuser_flag(self):
        call_command("createuser", "owner", superuser=True, generate_password=True, stdout=StringIO())
        owner = User.objects.get(username="owner")
        self.assertTrue(owner.is_superuser)
        self.assertTrue(owner.is_staff)

    def test_duplicate_username_is_refused(self):
        call_command("createuser", "dup", generate_password=True, stdout=StringIO())
        with self.assertRaises(CommandError):
            call_command("createuser", "dup", generate_password=True, stdout=StringIO())

    def test_update_changes_role_without_recreating(self):
        call_command("createuser", "chg", role="sales", generate_password=True, stdout=StringIO())
        call_command("createuser", "chg", role="manager", update=True, generate_password=True, stdout=StringIO())
        self.assertEqual(User.objects.get(username="chg").role, "manager")
        self.assertEqual(User.objects.filter(username="chg").count(), 1)
