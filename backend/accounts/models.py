from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user, declared before the first deploy on purpose. Swapping
    AUTH_USER_MODEL after a production database exists is a migration
    nightmare; doing it now costs nothing.

    Role decides how much of the pipeline you can see. Sales staff work
    their own leads; managers and admins see the whole board.
    """

    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        MANAGER = "manager", "Manager"
        SALES = "sales", "Sales"

    role = models.CharField(
        max_length=20, choices=Role.choices, default=Role.SALES
    )

    @property
    def can_see_all_leads(self):
        return self.is_superuser or self.role in {self.Role.ADMIN, self.Role.MANAGER}

    @property
    def can_assign_leads(self):
        return self.can_see_all_leads

    def __str__(self):
        return self.get_full_name() or self.username
