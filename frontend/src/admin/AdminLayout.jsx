import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import {
  ChartBarIcon,
  KanbanIcon,
  ListChecksIcon,
  ListDashesIcon,
  BuildingsIcon,
  ChartLineUpIcon,
  GearIcon,
  ListIcon,
  MagnifyingGlassIcon,
  UsersThreeIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { Toaster } from "sonner";
import { useAuth } from "./AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";

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
      <p className="text-[13px] text-bone-100/60">Authenticating…</p>
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
  { to: "/admin/follow-ups", label: "Tasks", icon: ListChecksIcon },
  { to: "/admin/leads", label: "Leads", icon: ListDashesIcon },
  { to: "/admin/companies", label: "Companies", icon: BuildingsIcon },
  { to: "/admin/reports", label: "Reports", icon: ChartLineUpIcon },
  { to: "/admin/users", label: "Users", icon: UsersThreeIcon, adminOnly: true },
  { to: "/admin/settings", label: "Settings", icon: GearIcon, adminOnly: true },
];

/**
 * The shell: a fixed rail of destinations on the left, a bar for identity and
 * alerts on top, work in the middle. A tool you sit in all day should keep
 * navigation in the same place at all times rather than centring it like a
 * page — the layout is furniture, not a composition.
 */
export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nav = NAV.filter((item) => !item.adminOnly || user?.role === "admin");

  // A route change closes the drawer; otherwise it hangs over the new page.
  useEffect(() => setMobileNav(false), [location.pathname]);

  const rail = (
    <div className="h-full w-[240px] bg-maroon-950 border-r border-line flex flex-col">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-line shrink-0">
        <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
          <img src="/logo.png" alt="" className="h-7 w-7 rounded-md" />
          <span className="text-[15px] font-semibold text-bone-100 truncate">
            Bit Studio
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-signal/10 text-signal"
                    : "text-bone-100/70 hover:bg-hover hover:text-bone-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -left-3 top-1.5 bottom-1.5 w-1 rounded-r-full bg-signal" />
                  )}
                  <Icon size={17} weight={isActive ? "fill" : "regular"} />
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-line shrink-0">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="h-8 w-8 rounded-full bg-signal/10 text-signal grid place-items-center text-xs font-semibold shrink-0">
            {(user?.name || "?").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-bone-100 truncate leading-tight">
              {user?.name}
            </p>
            <p className="text-[11px] text-bone-100/60 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="p-1.5 rounded-md text-bone-100/60 hover:text-maroon-400 hover:bg-hover transition-colors"
          >
            <SignOutIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] text-bone-100 flex">
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">{rail}</div>

      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
              className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              {rail}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 lg:ml-[240px] flex flex-col">
        <header className="h-16 bg-maroon-950 border-b border-line sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
              className="lg:hidden p-2 -ml-2 rounded-lg text-bone-100/60 hover:bg-hover"
            >
              <ListIcon size={20} />
            </button>
            {/* Finding a person is the most frequent thing anyone does here, so
                it gets the permanent slot. Enter hands off to the leads list,
                which reads ?q= — no second search implementation. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q")?.toString().trim();
                if (q) navigate(`/admin/leads?q=${encodeURIComponent(q)}`);
              }}
              className="flex-1 max-w-md"
            >
              <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[color:var(--color-ink)] border border-line focus-within:border-signal focus-within:bg-maroon-950 transition-colors">
                <MagnifyingGlassIcon size={15} className="text-bone-100/60 shrink-0" />
                <input
                  name="q"
                  data-testid="global-search"
                  placeholder="Search leads by name, email, company…"
                  className="w-full bg-transparent outline-none text-[13px] text-bone-100 placeholder:text-bone-100/60"
                />
              </label>
            </form>
          </div>
          <NotificationBell />
        </header>

        <main className="flex-1 min-w-0 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Toasts confirm work landed (or didn't) without a full reload. */}
      <Toaster
        position="bottom-right"
        theme="light"
        toastOptions={{
          style: {
            background: "#fff",
            border: "1px solid #E2E8F0",
            color: "#0F172A",
          },
        }}
      />
    </div>
  );
}
