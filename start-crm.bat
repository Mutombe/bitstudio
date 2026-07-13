@echo off
REM Bit Studio CRM. Local dev launcher (double-click this file).
REM
REM Opens the Django API and the Vite frontend in two windows and then opens
REM the CRM in your browser. Keep both windows open while you use it; close
REM them to stop the servers. Runs in cmd, so no PowerShell execution-policy
REM issues.

cd /d "%~dp0"

echo Starting Bit Studio CRM...

REM Backend: Django on :8000 (SQLite). Uses the venv python directly.
start "Bit Studio - Backend" cmd /k "cd backend && .venv\Scripts\python.exe manage.py runserver 8000"

REM Frontend: Vite on :5173. Reads VITE_API_URL from frontend\.env.local.
start "Bit Studio - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo   CRM:      http://localhost:5173/admin   (use localhost, NOT 127.0.0.1)
echo   Logins:   owner / manager / sales   (password: devpassword)
echo.
echo   Two windows just opened. Give them ~10 seconds, then the browser opens.

REM Wait for Vite, then open the browser at the localhost URL.
timeout /t 10 /nobreak >nul
start "" http://localhost:5173/admin
