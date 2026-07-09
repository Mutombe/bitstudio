# Bit Studio. Backend

Django + DRF service behind the marketing site. Phase 1 is lead capture:
every enquiry from `/contact` and the offer pages is persisted with its
source attribution, instead of being handed to WhatsApp and forgotten.

Phase 2 turns the same `Lead` table into the CRM pipeline the sales team
works in (`status` and `owner` already exist on the model).

## Run it locally

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # Windows
# source .venv/bin/activate   # macOS / Linux

pip install -r requirements.txt
cp .env.example .env          # then set SECRET_KEY and DEBUG=True

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- API: `POST http://localhost:8000/api/leads/`
- Admin (where sales reads leads today): `http://localhost:8000/admin/`
- Health: `http://localhost:8000/healthz`

Point the frontend at it with `VITE_API_URL=http://localhost:8000` in
`frontend/.env.local`.

## Tests

```bash
python manage.py test leads
```

## Neon Postgres

Use the **pooled** connection string — the host contains `-pooler`.

```
DATABASE_URL=postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require
```

Neon fronts Postgres with pgbouncer in *transaction* pooling mode. Django's
persistent connections do not survive that, so `settings.py` pins
`conn_max_age=0` and lets the pooler pool. Raising it is the classic way to
get random `server closed the connection unexpectedly` errors in production.

Without `DATABASE_URL`, the project falls back to local SQLite so it runs
before Neon is provisioned.

## Deploying (Render)

- **Build**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- **Start**: `gunicorn config.wsgi:application`
- **Env**: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS=<your-host>`,
  `DATABASE_URL=<neon pooled url>`,
  `CORS_ALLOWED_ORIGINS=https://bitstudio.co.zw,https://www.bitstudio.co.zw`

`DEBUG=False` turns on HSTS, the SSL redirect, and secure cookies.

## Security notes

- `POST /api/leads/` is the only anonymous write. It is create-only, so an
  enquiry can be submitted but never enumerated. Reading leads requires an
  authenticated session.
- The endpoint is throttled (`10/hour` per IP) and carries a `website`
  honeypot field that must be empty.
- `status` and `owner` are server-controlled; the browser cannot set them.
- `ip_address` and `user_agent` are stored to defend the public endpoint
  against abuse. **Update the site's privacy policy to disclose this.**
