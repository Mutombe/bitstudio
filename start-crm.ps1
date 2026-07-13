# Bit Studio CRM. Local dev launcher.
#
# Opens the Django API and the Vite frontend, each in its own PowerShell
# window, so they keep running as long as those windows are open. Close a
# window to stop that server.
#
#   Right-click > Run with PowerShell, or:  .\start-crm.ps1
#
# First time only: set up the backend venv + seed (see backend/README.md).

$root = $PSScriptRoot

Write-Host "Starting Bit Studio CRM..." -ForegroundColor Green

# Backend: Django on :8000 (SQLite, from backend/.env).
# Call the venv's python directly rather than Activate.ps1 — script activation
# is blocked by the default Windows execution policy and silently kills this
# window before Django ever starts.
Start-Process powershell -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location '$root\backend'; .\.venv\Scripts\python.exe manage.py runserver 8000"
)

# Frontend: Vite on :5173. Point it at the local API (also in .env.local,
# set here too so the launcher works on a fresh checkout).
Start-Process powershell -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location '$root\frontend'; `$env:VITE_API_URL='http://localhost:8000'; npm run dev"
)

Write-Host ""
Write-Host "  CRM:          http://localhost:5173/admin" -ForegroundColor Cyan
Write-Host "  Django admin: http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Logins (all password 'devpassword'):"
Write-Host "    owner   - admin / superuser"
Write-Host "    manager - sees all leads"
Write-Host "    sales   - own + unassigned only"
Write-Host ""
Write-Host "  Two new windows opened. Close them to stop the servers."
