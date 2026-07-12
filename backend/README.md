# Bit Studio. Backend

Django + DRF service behind the marketing site. It does two jobs:

1. **Captures leads.** Every enquiry from `/contact` and the offer pages is
   persisted with its source attribution, instead of being handed to
   WhatsApp and forgotten.
2. **Runs the CRM.** The sales team signs in at `/admin` on the site and
   works the pipeline: stages, assignment, notes, follow-ups.

## Run it locally

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # Windows
# source .venv/bin/activate   # macOS / Linux

pip install -r requirements.txt
cp .env.example .env          # set SECRET_KEY, DEBUG=True, leave DATABASE_URL blank

python manage.py migrate
python seed_dev.py            # dev users + sample leads (SQLite only)
python manage.py runserver
```

Then run the frontend with `VITE_API_URL=http://localhost:8000` in
`frontend/.env.local` and open `http://localhost:5173/admin`.

Seeded logins: `manager / devpassword`, `sales / devpassword`.
`seed_dev.py` refuses to run against anything but SQLite.

## Creating real users

Use the `createuser` command — it sets the CRM `role`, which `createsuperuser`
can't. Passwords are prompted for and never echoed, so they stay out of your
shell history and any logs.

```bash
# Prompts for a password (typed, hidden):
python manage.py createuser rutendo --role manager --name "Rutendo Chikafu" --email rutendo@bitstudio.co.zw
python manage.py createuser tapiwa  --role sales   --name "Tapiwa Ncube"

# The owner / you — full access to everything, including Django admin:
python manage.py createuser owner --superuser --name "Your Name"

# When you'll deliver the password over a secure channel instead of typing it:
python manage.py createuser tendai --role sales --name "Tendai M" --generate-password
```

Roles: `sales` sees their own + unassigned leads; `manager` and `admin` see
all; `admin` and `--superuser` also get the Django admin at `/admin`.

**To create users on the live (Neon) database**, point `DATABASE_URL` at the
pooled connection string in the same shell you run the command in:

```bash
# rotate the Neon password first if it was ever shared, then:
DATABASE_URL="postgresql://…-pooler…/neondb?sslmode=require" \
  python manage.py createuser rutendo --role manager --name "Rutendo Chikafu"
```

Run it in a real terminal (not a captured/non-interactive one) so the hidden
password prompt works.

- CRM UI: `/admin` on the frontend
- Django admin: `http://localhost:8000/admin/`
- Health: `http://localhost:8000/healthz`

## Tests

```bash
python manage.py test leads accounts   # 29 unit tests
```

Tests always run against in-memory SQLite, never `DATABASE_URL` — the runner
creates and drops databases and must not be able to reach Neon.

For the browser end-to-end suite (boots this API + Vite, drives real Chrome):

```bash
cd ../frontend && npm run e2e
```

It covers the things unit tests cannot: the login gate redirecting, a card
actually dragging between pipeline columns and *persisting*, a sales rep not
seeing a manager's lead, and the marketing contact form reaching this API
across origins with its offer attribution intact. Screenshots land in
`frontend/e2e-artifacts/`.

## Roles

Set on the user (`accounts.User.role`):

| Role | Sees | Can assign |
|---|---|---|
| `admin` | all leads | anyone |
| `manager` | all leads | anyone |
| `sales` | own + unassigned | only to themselves (claim) |

Enforced server-side in `leads.views.scoped_leads` and
`LeadUpdateSerializer.validate_owner`, not in the UI.

## API

| Method | Path | Auth |
|---|---|---|
| `POST` | `/api/leads/` | **anonymous** (public intake) |
| `GET` | `/api/leads/` | session; role-scoped |
| `GET/PATCH` | `/api/leads/<id>/` | session; role-scoped |
| `POST` | `/api/leads/<id>/notes/` | session |
| `GET/POST` | `/api/leads/<id>/tasks/` | session |
| `PATCH/DELETE` | `/api/tasks/<id>/` | session |
| `GET` | `/api/stats/` | session |
| `GET` | `/api/team/` | session; managers/admins |
| `GET` | `/api/auth/csrf/` | anonymous |
| `POST` | `/api/auth/login/` `/logout/` | — |
| `GET` | `/api/auth/me/` | session |

## Neon Postgres

Use the **pooled** connection string. The host contains `-pooler`.

```
DATABASE_URL=postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require
```

Neon fronts Postgres with pgbouncer in *transaction* pooling mode. Django's
persistent connections do not survive that, so `settings.py` pins
`conn_max_age=0` and lets the pooler pool. Raising it is the classic way to
get random `server closed the connection unexpectedly` errors in production.

Without `DATABASE_URL`, the project falls back to local SQLite.

## Deploying (Render)

- **Build**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- **Start**: `gunicorn config.wsgi:application`
- **Env**: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS=<host>`,
  `DATABASE_URL=<neon pooled url>`,
  `CORS_ALLOWED_ORIGINS=https://bitstudio.co.zw,https://www.bitstudio.co.zw`,
  `SESSION_COOKIE_DOMAIN=.bitstudio.co.zw`

`DEBUG=False` turns on HSTS, the SSL redirect, secure cookies, and disables
the browsable API.

**Host the API on a subdomain of the site** (`api.bitstudio.co.zw`). The CRM
authenticates with a session cookie; on a subdomain it stays *same-site* and
`SameSite=Lax` works. On a raw `*.onrender.com` host the browser treats the
cookie as cross-site and silently drops it, so nobody can log in.

## Security notes

- `POST /api/leads/` is the only anonymous write. It is create-only, so an
  enquiry can be submitted but never enumerated. Throttled 10/hour per IP,
  with a `website` honeypot that must be empty.
- `status`, `owner`, `ip_address`, `user_agent` are server-set. The browser
  cannot set them, and buyer-supplied facts are immutable in the CRM.
- Leads have no `destroy` route. They are won or lost, never deleted.
- `/auth/login/` is explicitly `csrf_protect`'d. DRF's `SessionAuthentication`
  skips the CSRF check on anonymous requests, which would otherwise leave the
  endpoint open to login CSRF. Pinned by `LoginCsrfTests`.
- `CSRF_TRUSTED_ORIGINS` must contain every origin the SPA is served from.
  Django validates the browser's `Origin` header, which never matches the
  API's own host once the SPA lives on another origin — so a missing entry
  makes *every* login return 403 regardless of the token. `curl` sends no
  `Origin`, so only a real browser catches this. Pinned by two tests.
- The public intake stays CSRF-exempt on purpose: the marketing site posts
  cross-origin with no session.
- `/admin` is `noindex, nofollow, noarchive`, disallowed in `robots.txt`, and
  excluded from the sitemap and prerender. The sitemap generator fails the
  build if an `/admin` route ever appears in it.
- `ip_address` and `user_agent` are stored to defend the public endpoint
  against abuse. **Update the site's privacy policy to disclose this.**
