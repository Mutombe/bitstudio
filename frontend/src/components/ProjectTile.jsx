import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";
import QuantumHover from "./QuantumHover.jsx";
import { findService } from "../data/services.js";

/**
 * ProjectTile — CLIENT identity first, Bit Studio signature second.
 *
 * Why: client feedback — tiles should be branded in the CLIENT's colors
 * (like the left panel of /work/:slug), not Bit Studio's maroon wash.
 *
 * Layout (strict positional zones, no overlap, no oversize):
 *   ┌ p-5 md:p-6, flex flex-col h-full ──────────────────┐
 *   │ HEADER  flex items-start justify-between gap-3     │
 *   │   industry chip  |  kind badge                     │
 *   │ BODY    flex-1 (pushes footer to bottom)           │
 *   │   service tag · year · title · one-liner           │
 *   │ FOOTER  flex items-end justify-between gap-3       │
 *   │   url (truncate max-w-[70%])  |  arrow (shrink-0)  │
 *   └────────────────────────────────────────────────────┘
 *   3px chartreuse signature border runs down the left edge.
 */

export default function ProjectTile({ project, index = 0, size = "md" }) {
  const hover = useCursorHover("view", "View");
  const p = project;

  const isLarge = size === "lg";
  const service = p.service ? findService(p.service) : null;

  // Client palette — primary / secondary / paper. Fall back gracefully.
  const primary = p.palette?.[0] || "#1A1215";
  const secondary = p.palette?.[1] || primary;
  const paper = p.palette?.[2] || "#F5EFE6";

  // Contrast picker — if primary is dark, use paper/secondary for text; else ink.
  const primaryL = luminance(primary);
  const onPrimary = primaryL < 0.45
    ? (luminance(paper) > 0.7 ? paper : "#F5EFE6")
    : "#0E0104"; // ink
  const onPrimaryMuted = primaryL < 0.45
    ? hex(onPrimary, 0.7)
    : hex("#0E0104", 0.7);
  const onPrimaryFaint = primaryL < 0.45
    ? hex(onPrimary, 0.45)
    : hex("#0E0104", 0.45);

  // Secondary accent — dot next to service name, small swatch dots
  const accentDot = primaryL < 0.45 ? secondary : secondary;

  const urlShort = (p.url || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .slice(0, 48);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className={`group relative col-span-12 sm:col-span-6 ${isLarge ? "md:col-span-7" : "md:col-span-5"}`}
    >
     <QuantumHover strength={2.5} className="block">
      <Link
        to={`/work/${p.slug}`}
        {...hover}
        className="block relative overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]"
      >
        {/* Tile body — CLIENT palette fusion (multi-orb mesh of all palette colors) + strict zone */}
        <div
          className="relative flex flex-col p-4 md:p-5 aspect-[4/3] md:aspect-[5/4] min-h-[200px] md:min-h-[240px] overflow-hidden"
          style={{
            // Primary as the base, but three overlapping orbs (primary/secondary/paper)
            // are layered on top in atmospheric mesh so the tile reads as a FUSION
            // of the client's brand, not a single flat fill.
            backgroundColor: primary,
          }}
        >
          {/* Multi-color palette fusion — 3 big blurred orbs in client colors
              (primary deepened, secondary, paper). They overlap and blend into
              a painterly mesh. 70% opacity so it actually reads. */}
          <div
            className="absolute inset-0 opacity-[0.72] pointer-events-none mix-blend-screen"
            style={{
              background: `
                radial-gradient(circle at 15% 10%, ${hex(secondary, 0.95)}, transparent 55%),
                radial-gradient(circle at 88% 20%, ${hex(paper, 0.55)}, transparent 50%),
                radial-gradient(circle at 78% 92%, ${hex(primary, 0.9)}, transparent 60%),
                radial-gradient(circle at 22% 88%, ${hex(secondary, 0.6)}, transparent 55%)
              `,
            }}
            aria-hidden
          />
          {/* A secondary fusion veil for depth — darker pass, multiply blend */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
            style={{
              background: `
                radial-gradient(ellipse at 50% 50%, transparent 20%, ${hex(primary, 0.7)} 90%)
              `,
            }}
            aria-hidden
          />

          {/* Grain — barely there, gives the solid color tactility */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
            aria-hidden
          />

          {/* Bit Studio signature — 3px chartreuse left border. Our quiet
              presence, never competing with the client color. */}
          <span
            className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none z-20"
            style={{
              background: "#D4FF3A",
              boxShadow: "0 0 18px rgba(212,255,58,0.55), 0 0 36px rgba(212,255,58,0.22)",
            }}
            aria-hidden
          />

          {/* Chartreuse hairline frame on hover — a subtle bracket, never a wash */}
          <span
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(212,255,58,0.55), 0 0 22px rgba(212,255,58,0.18)",
            }}
            aria-hidden
          />

          {/* ── HEADER ZONE ── industry chip + kind badge, no overlap */}
          <header className="relative flex items-start justify-between gap-3 z-10">
            <span
              className="shrink-0 inline-flex items-center px-3 py-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase rounded-full"
              style={{
                background: hex(onPrimary, primaryL < 0.45 ? 0.15 : 0.12),
                color: onPrimary,
                boxShadow: `inset 0 0 0 1px ${hex(onPrimary, 0.25)}`,
              }}
            >
              {p.tag}
            </span>

            <span
              className="shrink-0 inline-flex items-center px-2.5 py-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase rounded-full whitespace-nowrap"
              style={{
                background: "rgba(14,1,4,0.72)",
                color: "#D4FF3A",
                border: "1px solid rgba(212,255,58,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              {p.kind === "recently-live" ? "Recently Live" : "Experimentation"}
            </span>
          </header>

          {/* ── BODY ZONE ── flex-1 pushes footer down; title + brief stacked */}
          <div className="relative flex-1 flex flex-col justify-end gap-2 pt-6 z-10">
            {service && (
              <p
                className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase flex items-center gap-1.5"
                style={{ color: onPrimaryMuted }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: accentDot }}
                />
                <span className="truncate">
                  {service.number} · {service.title}
                </span>
              </p>
            )}

            <p
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: onPrimaryFaint }}
            >
              {p.year}
            </p>

            {/* Title — clamped width so it never bleeds into right edge */}
            <h3
              className="font-display text-2xl md:text-3xl leading-tight tracking-[-0.01em] max-w-[85%] line-clamp-2"
              style={{ color: onPrimary }}
            >
              {p.name}
            </h3>

            {/* Brief — one-liner, clamped to 2 lines max */}
            {p.brief && (
              <p
                className="text-sm leading-snug line-clamp-2 max-w-[92%]"
                style={{ color: hex(onPrimary, 0.8) }}
              >
                {p.brief}
              </p>
            )}
          </div>

          {/* ── FOOTER ZONE ── url left, arrow right, never overlap */}
          <footer className="relative flex items-end justify-between gap-3 mt-4 z-10">
            <p
              className="font-mono text-[10px] tracking-[0.16em] truncate max-w-[70%]"
              style={{ color: hex(onPrimary, 0.7) }}
            >
              → {urlShort}
            </p>

            <span
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1"
              style={{
                background: "#D4FF3A",
                color: "#0E0104",
                boxShadow: "0 0 18px rgba(212,255,58,0.35)",
              }}
              aria-hidden
            >
              <ArrowRightIcon size={14} weight="bold" />
            </span>
          </footer>
        </div>

        {/* Footer row outside tile — palette swatches + mono hex values */}
        <div className="flex items-center justify-between pt-4 text-bone-100/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="swatch-strip w-14 shrink-0">
              {p.palette.map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50 truncate">
              {p.palette[0]} · {p.palette[1] || "—"}
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase hover-line whitespace-nowrap shrink-0">
            View case →
          </p>
        </div>
      </Link>
     </QuantumHover>
    </motion.div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function luminance(h) {
  if (!h) return 0;
  const m = h.replace("#", "");
  const full =
    m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hex(h, a = 1) {
  if (!h) return `rgba(255,255,255,${a})`;
  const m = h.replace("#", "");
  const full =
    m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
