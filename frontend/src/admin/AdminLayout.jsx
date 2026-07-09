import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChartBarIcon,
  KanbanIcon,
  ListDashesIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useAuth } from "./AuthContext.jsx";

/**
 * Every admin surface is noindex. The marketing site is deliberately, and
 * aggressively, crawlable — the sales pipeline must not be. /admin is also
 * excluded from the sitemap and the prerender route list.
 */
export function AdminHead({ title }) {
  return (
    <Helmet>
      <title>{title} · Bit Studio CRM</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
    </Helmet>
  );
}

export function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-ink)]">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        Authenticating…
      </p>
    </div>
  );
}

/** Gate. Bounces signed-out visitors to the login page, preserving intent. */
export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AdminLoading />;
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
}

const NAV = [
  { to: "/admin", label: "Dashboard", icon: ChartBarIcon, end: true },
  { to: "/admin/pipeline", label: "Pipeline", icon: KanbanIcon },
  { to: "/admin/leads", label: "Leads", icon: ListDashesIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] text-bone-100">
      <header className="border-b border-white/10 sticky top-0 z-40 bg-[color:var(--color-ink)]/90 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 min-w-0">
            <Link to="/admin" className="flex items-center gap-2.5 shrink-0">
              <img src="/logo.png" alt="" className="h-6 w-6" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone-100/80">
                Bit / CRM
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                        isActive
                          ? "text-signal bg-signal/10"
                          : "text-bone-100/60 hover:text-bone-100"
                      }`
                    }
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-bone-100 leading-tight">{user?.name}</p>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">
                {user?.role}
              </p>
            </div>
            <button
              onClick={logout}
              aria-label="Sign out"
              className="p-2 text-bone-100/60 hover:text-maroon-400 transition-colors"
            >
              <SignOutIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
