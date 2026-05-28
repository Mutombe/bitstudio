import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CommandIcon, ListIcon, XIcon, PlanetIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

// Two navigation sets. English (default) and German (/de/*).
// We pick which one to render based on the current pathname.
const LINKS_EN = [
  { to: "/", label: "Index", n: "01" },
  { to: "/work", label: "Work", n: "02" },
  { to: "/live", label: "Live", n: "03" },
  { to: "/lab", label: "Lab", n: "04" },
  { to: "/craft", label: "Craft", n: "05" },
  { to: "/packages", label: "Packages", n: "06" },
  { to: "/contact", label: "Contact", n: "07" },
];
const LINKS_DE = [
  { to: "/de", label: "Index", n: "01" },
  { to: "/work", label: "Arbeit", n: "02" },
  { to: "/live", label: "Live", n: "03" },
  { to: "/lab", label: "Labor", n: "04" },
  { to: "/de/handwerk", label: "Handwerk", n: "05" },
  { to: "/pakete", label: "Pakete", n: "06" },
  { to: "/de/kontakt", label: "Kontakt", n: "07" },
];

export default function Nav({ onSummon }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hover = useCursorHover("hover", "");
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  // Locale routing. Anything under /de/* is the German edition.
  const isDE = loc.pathname === "/de" || loc.pathname.startsWith("/de/");
  const LINKS = isDE ? LINKS_DE : LINKS_EN;

  // Where the language toggle points. When on /de, link back to /; when
  // on a recognised English page, jump to the closest German equivalent.
  const toggleHref = (() => {
    if (isDE) {
      if (loc.pathname.startsWith("/de/handwerk")) return "/craft";
      if (loc.pathname.startsWith("/de/kontakt")) return "/contact";
      if (loc.pathname === "/pakete") return "/packages";
      if (loc.pathname === "/impressum") return "/legal";
      if (loc.pathname === "/datenschutz") return "/privacy";
      return "/";
    }
    if (loc.pathname.startsWith("/craft")) return "/de/handwerk";
    if (loc.pathname.startsWith("/contact")) return "/de/kontakt";
    if (loc.pathname === "/packages") return "/pakete";
    if (loc.pathname === "/legal") return "/impressum";
    if (loc.pathname === "/privacy") return "/datenschutz";
    return "/de";
  })();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-[color:var(--color-ink)]/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link
            to="/"
            {...hover}
            className="flex items-center gap-3 group"
            aria-label="Bit Studio. Home"
          >
            <img
              src="/logo.png"
              alt=""
              loading="eager"
              className="h-7 w-7 md:h-8 md:w-8 object-contain"
            />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone-100/80 group-hover:text-bone-100 transition-colors hidden sm:block">
              Bit / Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => {
              if (l.hash) {
                // Hash link. Uses <Link> so SPA navigation + hash scroll works
                const active = loc.hash === "#services" && loc.pathname === "/";
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    {...hover}
                    className={`relative font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                      active ? "text-signal" : "text-bone-100/70 hover:text-bone-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-bone-100/30">{l.n}</span>
                      <span>{l.label}</span>
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="w-1.5 h-1.5 rounded-full bg-signal"
                        />
                      )}
                    </span>
                  </Link>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  {...hover}
                  className={({ isActive }) =>
                    `relative font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                      isActive ? "text-signal" : "text-bone-100/70 hover:text-bone-100"
                    }`
                  }
                  end={l.to === "/"}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-2">
                      <span className="text-bone-100/30">{l.n}</span>
                      <span>{l.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="w-1.5 h-1.5 rounded-full bg-signal"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language toggle. DE ↔ EN. Always visible. */}
            <Link
              to={toggleHref}
              {...hover}
              aria-label={isDE ? "Switch to English" : "Auf Deutsch wechseln"}
              className="hidden sm:flex items-center px-2.5 py-1 rounded-full border border-white/10 hover:border-signal font-mono text-[10px] tracking-[0.2em] uppercase transition-all"
            >
              <span className={isDE ? "text-bone-100/40" : "text-signal"}>EN</span>
              <span className="mx-1.5 text-bone-100/20">·</span>
              <span className={isDE ? "text-signal" : "text-bone-100/40"}>DE</span>
            </Link>
            <button
              {...hover}
              onClick={onSummon}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-signal hover:text-signal transition-all font-mono text-[10px] tracking-[0.2em] uppercase group"
              aria-label="Open command palette (Cmd+K)"
            >
              <PlanetIcon size={13} weight="regular" className="text-signal transition-transform duration-700 group-hover:rotate-180" />
              <span>{isDE ? "Suchen" : "Summon"}</span>
              <span className="text-bone-100/40 ml-1">⌘K</span>
            </button>
            {/* Mobile: alien Orbit search. Opens CommandPalette */}
            <button
              {...hover}
              onClick={onSummon}
              className="md:hidden p-2 text-bone-100 relative"
              aria-label="Summon. Search projects and pages"
            >
              <PlanetIcon size={22} weight="regular" className="text-signal" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-bone-100"
              aria-label="Open menu"
            >
              <ListIcon size={22} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden bg-[color:var(--color-ink)]"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <img src="/logo.png" alt="" className="h-7 w-7" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Bit / Studio</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <XIcon size={24} weight="bold" />
              </button>
            </div>
            <nav className="px-5 pt-8 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  {l.hash ? (
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4"
                    >
                      <span className="font-mono text-[10px] tracking-[0.25em] text-bone-100/40">
                        {l.n}
                      </span>
                      <span className="display-lg text-bone-100">
                        {l.label}
                      </span>
                    </Link>
                  ) : (
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4"
                      end={l.to === "/"}
                    >
                      <span className="font-mono text-[10px] tracking-[0.25em] text-bone-100/40">
                        {l.n}
                      </span>
                      <span className="display-lg text-bone-100">
                        {l.label}
                      </span>
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="absolute bottom-8 left-5 right-5 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
                <span>Transmission open · Harare → Signal</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
