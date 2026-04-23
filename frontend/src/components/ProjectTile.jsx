import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";
import QuantumHover from "./QuantumHover.jsx";
import { findService } from "../data/services.js";

/**
 * ProjectTile — Bit Studio artifact first, client second.
 *
 * Zone layout:
 *   top-left:  industry chip (solid maroon-600 / bone-100 type)
 *   top-right: kind badge (Recently Live / Experimentation)
 *   bottom:    project name + one-liner + mono URL + "View case →"
 *
 * Base: strong maroon/oxblood brand wash. A thin left border (3px) reveals
 * the client's brand color as a quiet nod. On hover, a chartreuse hairline
 * frames the whole tile.
 */

export default function ProjectTile({ project, index = 0, size = "md" }) {
  const hover = useCursorHover("view", "View");
  const p = project;

  const isLarge = size === "lg";
  const service = p.service ? findService(p.service) : null;

  // Client brand color (thin left-border accent) — first palette entry
  const clientAccent = p.palette?.[0] || "#6B1521";
  const urlShort = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 48);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${isLarge ? "md:col-span-7" : "md:col-span-5"}`}
    >
     <QuantumHover strength={2.5} className="block">
      <Link
        to={`/work/${p.slug}`}
        {...hover}
        className="block relative overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.015]"
      >
        {/* Preview panel */}
        <div
          className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden"
          style={{
            // Strong Bit Studio brand wash — maroon → oxblood
            background: `
              radial-gradient(circle at 20% 20%, ${hex("#8C1E2C", 0.9)}, transparent 55%),
              radial-gradient(circle at 80% 80%, ${hex("#3A0A15", 0.85)}, transparent 55%),
              linear-gradient(135deg, #33060F 0%, #0E0104 100%)
            `,
          }}
        >
          {/* Client brand mesh — SUBTLE, overlaid (opacity ~0.28) */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, ${hex(p.palette?.[0] || "#6B1521", 0.55)}, transparent 55%),
                radial-gradient(circle at 72% 72%, ${hex(p.palette?.[1] || "#3A0A15", 0.45)}, transparent 60%)
              `,
            }}
          />

          {/* Bit Studio brand wash — maroon/oxblood stays dominant */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(51,6,15,0.75) 0%, rgba(28,3,8,0.45) 50%, rgba(58,10,21,0.8) 100%)",
            }}
          />

          {/* Client brand-color left border — 3px, a quiet nod */}
          <span
            className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none"
            style={{ background: clientAccent, boxShadow: `0 0 14px ${hex(clientAccent, 0.5)}` }}
            aria-hidden
          />

          {/* Chartreuse hairline frame — reveals on hover */}
          <span
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
            style={{ boxShadow: "inset 0 0 0 1px rgba(212,255,58,0.7), 0 0 22px rgba(212,255,58,0.12)" }}
            aria-hidden
          />

          {/* Grain layer */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* ── TOP ZONE ── flex row: industry chip left, kind badge right */}
          <header className="absolute top-0 left-0 right-0 p-5 md:p-6 flex items-start justify-between gap-3 z-10">
            {/* Industry chip — solid maroon, bone type */}
            <span className="inline-flex items-center px-3 py-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase rounded-full bg-maroon-600 text-bone-100 shadow-[0_2px_10px_rgba(107,21,33,0.5)]">
              {p.tag}
            </span>

            {/* Kind badge — chartreuse on maroon-900/70 */}
            <span
              className="inline-flex items-center px-2.5 py-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase rounded-full border whitespace-nowrap"
              style={{
                background: "rgba(28,3,8,0.72)",
                color: "#D4FF3A",
                borderColor: "rgba(212,255,58,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              {p.kind === "recently-live" ? "Recently Live" : "Experimentation"}
            </span>
          </header>

          {/* Hover reveal — darkening wash */}
          <div className="absolute inset-0 bg-[color:var(--color-ink)]/0 group-hover:bg-[color:var(--color-ink)]/35 transition-colors duration-500 pointer-events-none" />

          {/* ── BOTTOM ZONE ── name + description + url + arrow */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* Service (tiny mono) */}
                {service && (
                  <p
                    className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3 flex items-center gap-1.5"
                    style={{ color: hex("#F5EFE6", 0.65) }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: service.accent }} />
                    <span>{service.number} · {service.title}</span>
                  </p>
                )}
                {/* Year */}
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2 text-bone-100/55">
                  {p.year}
                </p>
                {/* Project name — display serif, bone, tight */}
                <h3 className="display-lg max-w-[14ch] text-bone-100 leading-[0.95]">
                  {p.name}
                </h3>
                {/* One-line brief */}
                {p.brief && (
                  <p className="mt-2 text-sm text-bone-100/70 max-w-[46ch] line-clamp-1">
                    {p.brief}
                  </p>
                )}
                {/* Mono URL — chartreuse, subtle */}
                <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-signal/80 group-hover:text-signal group-hover:underline transition-colors truncate max-w-full">
                  → {urlShort}
                </p>
              </div>

              {/* Hover arrow — reveals on hover */}
              <span
                className="shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 w-10 h-10 rounded-full bg-signal text-ink flex items-center justify-center"
                aria-hidden
              >
                <ArrowRightIcon size={16} weight="bold" />
              </span>
            </div>
          </div>

          {/* Corner mark — chartreuse dot bottom-right (tiny nod) */}
          <span
            className="absolute top-[54px] md:top-[58px] right-5 md:right-6 w-1.5 h-1.5 rounded-full bg-signal opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden
          />
        </div>

        {/* Footer row — palette swatches + "Read" */}
        <div className="flex items-center justify-between pt-4 text-bone-100/80">
          <div className="flex items-center gap-3">
            <div className="swatch-strip w-14">
              {p.palette.map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50">
              {p.palette[0]} · {p.palette[1] || "—"}
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase hover-line">
            View case <ArrowUpRightIcon size={10} weight="bold" className="inline ml-1" />
          </p>
        </div>
      </Link>
     </QuantumHover>
    </motion.div>
  );
}

function hex(h, a = 1) {
  if (!h) return `rgba(255,255,255,${a})`;
  const m = h.replace("#", "");
  const full =
    m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
