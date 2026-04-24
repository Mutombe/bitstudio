import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PaperPlaneTiltIcon,
  SmileyWinkIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  FrameCornersIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { PROJECTS } from "../data/projects.js";
import { SERVICES } from "../data/services.js";

const STATIC_ITEMS = [
  { kind: "page", label: "Home",     to: "/",          hint: "Index" },
  { kind: "page", label: "Work",     to: "/work",      hint: "Ledger of 30+ artifacts" },
  { kind: "page", label: "Services", to: "/#services", hint: "Eight things we love to solve" },
  { kind: "page", label: "Studio",   to: "/studio",    hint: "Philosophy, unapologetically" },
  { kind: "page", label: "Contact",  to: "/contact",   hint: "Open a transmission" },
  { kind: "action", label: "WhatsApp us", href: "https://wa.me/263785948128", hint: "Preferred channel" },
  { kind: "action", label: "Email us",    href: "mailto:admin@bitstudio.co.zw", hint: "admin@bitstudio.co.zw" },
];

export default function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const items = useMemo(() => {
    const serviceItems = SERVICES.map((s) => ({
      kind: "service",
      label: s.title,
      to: `/services/${s.slug}`,
      hint: `${s.number} · ${s.tagline}`,
    }));
    const projectItems = PROJECTS.map((p) => ({
      kind: "project",
      label: p.name,
      to: `/work/${p.slug}`,
      hint: `${p.tag} · ${p.kind}`,
      palette: p.palette,
    }));
    const all = [...STATIC_ITEMS, ...serviceItems, ...projectItems];
    if (!q.trim()) return all;
    const t = q.toLowerCase();
    return all.filter(
      (i) =>
        i.label.toLowerCase().includes(t) ||
        (i.hint || "").toLowerCase().includes(t)
    );
  }, [q]);

  useEffect(() => setCursor(0), [q]);

  const exec = (item) => {
    if (!item) return;
    if (item.to) {
      navigate(item.to);
      onClose();
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(items[cursor]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
          onClick={onClose}
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(107,21,33,0.72), transparent 55%), radial-gradient(circle at 80% 90%, rgba(212,255,58,0.1), transparent 60%), rgba(0,0,0,0.72)",
          }}
        >
          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(212,255,58,0.02) 3px, rgba(212,255,58,0.02) 4px)",
            }}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-maroon-950 border border-maroon-700 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header strip */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
                <span>Summoning · v1.0.0</span>
              </div>
              <span>ESC to dismiss</span>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <MagnifyingGlassIcon size={18} className="text-bone-100/40" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search projects, pages, or actions…"
                className="flex-1 bg-transparent text-bone-100 placeholder:text-bone-100/30 outline-none font-display text-xl tracking-tight"
              />
              <kbd className="font-mono text-[10px] tracking-[0.15em] px-2 py-1 border border-white/10 rounded text-bone-100/50">
                ↵
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {items.length === 0 && (
                <div className="px-5 py-10 flex items-center gap-3 text-bone-100/50 font-mono text-xs tracking-[0.12em] uppercase">
                  <SmileyWinkIcon size={16} />
                  Nothing found. We liked the question anyway.
                </div>
              )}

              {items.map((it, i) => {
                const active = i === cursor;
                const Icon =
                  it.kind === "page"
                    ? FrameCornersIcon
                    : it.kind === "service"
                    ? SparkleIcon
                    : it.kind === "project"
                    ? ArrowRightIcon
                    : it.label.includes("WhatsApp")
                    ? WhatsappLogoIcon
                    : it.label.includes("Email")
                    ? EnvelopeSimpleIcon
                    : PaperPlaneTiltIcon;
                return (
                  <button
                    key={`${it.kind}-${it.label}`}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => exec(it)}
                    className={`w-full text-left flex items-center gap-4 px-5 py-3 transition-colors ${
                      active ? "bg-maroon-700/60" : "bg-transparent"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-signal" : "text-bone-100/50"} />
                    <div className="flex-1 min-w-0">
                      <div className={`truncate ${active ? "text-bone-100" : "text-bone-100/85"}`}>
                        {it.label}
                      </div>
                      {it.hint && (
                        <div className="truncate text-[10px] font-mono tracking-[0.18em] uppercase text-bone-100/40 mt-0.5">
                          {it.hint}
                        </div>
                      )}
                    </div>
                    {it.palette && (
                      <div className="swatch-strip w-14 shrink-0">
                        {it.palette.map((c) => (
                          <span key={c} style={{ background: c }} />
                        ))}
                      </div>
                    )}
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-100/30 shrink-0">
                      {it.kind}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/40">
              <span>↑ ↓ to navigate</span>
              <span>Harare · 17°49'S</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
