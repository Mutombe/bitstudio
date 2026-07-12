"""
Create (or update) a CRM user with a role.

Django's built-in createsuperuser can't set our `role`, so this is the tool
for standing up the sales team. Passwords are prompted for interactively and
never echoed, so they don't end up in a shell history or a chat log. Use
--generate-password only when you'll deliver the password to the person over a
secure channel and have them change it.

Examples:
    python manage.py createuser tapiwa --role sales --name "Tapiwa Ncube" --email tapiwa@bitstudio.co.zw
    python manage.py createuser rutendo --role manager --name "Rutendo Chikafu"
    python manage.py createuser admin --superuser --name "Owner"
    python manage.py createuser t* --role sales --generate-password   # prints one strong password

Run it against Neon by pointing DATABASE_URL at the pooled connection string
in the same shell.
"""

import getpass
import secrets
import string

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError

User = get_user_model()

# No look-alike characters (0/O, 1/l/I) so a delivered password is transcribable.
_ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*"


def generate_password(length=16):
    return "".join(secrets.choice(_ALPHABET) for _ in range(length))


def prompt_password():
    first = getpass.getpass("Password: ")
    if not first:
        raise CommandError("Password cannot be empty.")
    if getpass.getpass("Password (again): ") != first:
        raise CommandError("Passwords did not match.")
    return first


class Command(BaseCommand):
    help = "Create or update a CRM user with a role (admin / manager / sales)."

    def add_arguments(self, parser):
        parser.add_argument("username")
        parser.add_argument(
            "--role",
            choices=[r.value for r in User.Role],
            default=User.Role.SALES,
            help="CRM role. Decides how much of the pipeline they see.",
        )
        parser.add_argument("--email", default="")
        parser.add_argument("--name", default="", help='Full name, e.g. "Rutendo Chikafu".')
        parser.add_argument(
            "--superuser",
            action="store_true",
            help="Full Django superuser (also grants Django-admin access).",
        )
        parser.add_argument(
            "--staff",
            action="store_true",
            help="Grant access to the Django admin at /admin on the API.",
        )
        parser.add_argument(
            "--generate-password",
            action="store_true",
            help="Generate a strong password and print it once instead of prompting.",
        )
        parser.add_argument(
            "--update",
            action="store_true",
            help="Update an existing user instead of erroring.",
        )

    def handle(self, *args, **opts):
        username = opts["username"]
        existing = User.objects.filter(username=username).first()
        if existing and not opts["update"]:
            raise CommandError(
                f"User '{username}' already exists. Pass --update to modify them."
            )

        generated = opts["generate_password"]
        password = generate_password() if generated else prompt_password()

        # Hold new users to the same strength rules the login form would.
        try:
            validate_password(password)
        except ValidationError as exc:
            raise CommandError("Password rejected: " + "; ".join(exc.messages))

        user = existing or User(username=username)
        if opts["email"]:
            user.email = opts["email"]
        if opts["name"]:
            first, _, last = opts["name"].partition(" ")
            user.first_name, user.last_name = first, last
        user.role = opts["role"]

        if opts["superuser"]:
            user.is_superuser = True
        # Admins and superusers get Django-admin access; sales/managers work in
        # the CRM UI and don't need it unless asked for.
        if opts["superuser"] or opts["staff"] or opts["role"] == User.Role.ADMIN:
            user.is_staff = True

        user.set_password(password)
        user.save()

        verb = "Updated" if existing else "Created"
        self.stdout.write(
            self.style.SUCCESS(
                f"{verb} {user.username} - role={user.role}, "
                f"staff={user.is_staff}, superuser={user.is_superuser}"
            )
        )
        if generated:
            self.stdout.write("")
            self.stdout.write(self.style.WARNING("  One-time password (share securely, then have them change it):"))
            self.stdout.write(f"      {password}")
            self.stdout.write("")
