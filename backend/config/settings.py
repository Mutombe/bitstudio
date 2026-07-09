"""
Bit Studio backend settings.

Everything sensitive is env-driven. Nothing here is ever shipped to the
browser — the Vite bundle is public, this process is not.
"""

from pathlib import Path
import os
import sys

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# The test runner speaks plain HTTP. Without this, SECURE_SSL_REDIRECT below
# turns every test request into a 301 the moment DEBUG is off.
TESTING = "test" in sys.argv


def env_list(name, default=""):
    """Parse a comma-separated env var into a clean list."""
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


SECRET_KEY = os.getenv("SECRET_KEY", "insecure-dev-key-do-not-use-in-production")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = env_list("ALLOWED_HOSTS", "localhost,127.0.0.1")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "accounts",
    "leads",
]

AUTH_USER_MODEL = "accounts.User"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ─── Database ────────────────────────────────────────────────────────
# Neon serves through pgbouncer in transaction pooling mode. Django's
# persistent connections (CONN_MAX_AGE > 0) break under transaction
# pooling, so we keep it at 0 and let the pooler do the pooling.
DATABASE_URL = os.getenv("DATABASE_URL", "")

if TESTING:
    # Never point the test runner at a real database. It creates and drops
    # databases, and a misread env var should not be able to touch Neon.
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
elif DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=0,
            ssl_require=True,
        )
    }
else:
    # Local fallback so the project runs before Neon is provisioned.
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Harare"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ─── API ─────────────────────────────────────────────────────────────
# The public lead endpoint is the only anonymous write on the service, so
# it is throttled hard. Everything else will require auth (phase 2).
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.ScopedRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "lead_create": "10/hour",
        "login": "10/min",
    },
    # An unbounded list endpoint is a slow query waiting to happen. The
    # Kanban board asks for a bigger page explicitly.
    "DEFAULT_PAGINATION_CLASS": "config.pagination.StandardPagination",
    "PAGE_SIZE": 50,
    # The browsable API renders forms against every endpoint. Useful while
    # developing, not something to expose on a public production service.
    "DEFAULT_RENDERER_CLASSES": (
        [
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.BrowsableAPIRenderer",
        ]
        if DEBUG
        else ["rest_framework.renderers.JSONRenderer"]
    ),
}

if TESTING:
    # Default hasher is deliberately slow. Across a suite that creates many
    # users it dominates the runtime.
    PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

# ─── CORS ────────────────────────────────────────────────────────────
# Strict allowlist. The marketing site is the only caller.
CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS", "http://localhost:5173"
)
CORS_ALLOW_CREDENTIALS = True

# Django validates the browser's Origin header on every unsafe request. The
# SPA lives on a different origin from the API, so that header never matches
# the API's own host and the origin must be trusted explicitly — otherwise
# every login returns 403 no matter how good the CSRF token is.
#
# Filtering this to https:// would silently break local development, and the
# only thing that catches it is a real browser: curl sends no Origin header.
# The origins allowed to call us are exactly the ones we trust.
CSRF_TRUSTED_ORIGINS = list(CORS_ALLOWED_ORIGINS)

# The CRM authenticates with a session cookie. Host the API on a subdomain
# of the site (api.bitstudio.co.zw) so the cookie stays *same-site* and
# SameSite=Lax works. Set SESSION_COOKIE_DOMAIN=.bitstudio.co.zw in prod.
#
# If the API ever lives on a different registrable domain (a raw
# *.onrender.com host), the browser treats the cookie as cross-site and it
# will be dropped unless SameSite=None; Secure. Prefer the subdomain.
SESSION_COOKIE_DOMAIN = os.getenv("SESSION_COOKIE_DOMAIN") or None
CSRF_COOKIE_DOMAIN = SESSION_COOKIE_DOMAIN
SESSION_COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "Lax")
CSRF_COOKIE_SAMESITE = SESSION_COOKIE_SAMESITE
# The SPA reads this to echo back as the X-CSRFToken header.
CSRF_COOKIE_HTTPONLY = False

# ─── Production hardening ────────────────────────────────────────────
if not DEBUG and not TESTING:
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"
