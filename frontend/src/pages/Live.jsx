import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, ArrowRightIcon, GlobeHemisphereWestIcon } from "@phosphor-icons/react";
import { LIVE_SITES } from "../data/live-sites.js";
import { PROJECTS } from "../data/projects.js";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import Ticker from "../components/Ticker.jsx";
import FilterChips, { computeCounts } from "../components/FilterChips.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";

// Build chip set from tags actually present in LIVE_SITES
const LIVE_CHIPS = [
  { id: "all", label: "All" },
  ...Array.from(new Set(LIVE_SITES.map((s) => s.tag))).map((tag) => ({
    id: tag,
    label: tag,
  })),
];

function filterLive(sites, filter) {
  if (filter === "all") return sites;
  return sites.filter((s) => s.tag === filter);
}

export default function Live() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filterLive(LIVE_SITES, filter), [filter]);
  const counts = useMemo(
    () =>
      computeCounts(
        LIVE_SITES.map((s) => ({ tag: s.tag })),
        LIVE_CHIPS
      ),
    []
  );
  const visibleChips = useMemo(
    () => LIVE_CHIPS.filter((c) => (counts[c.id] ?? 0) > 0 || c.id === "all"),
    [counts]
  );

  return (
    <PageTransition>
      <SEO
        title="Live"
        description={`${LIVE_SITES.length} of our artifacts broadcasting from their own public addresses, right now. Live URLs, real clients, sorted by aesthetic carriage.`}
        path="/live"
        keywords={["live websites", "production sites", "on-air", "broadcasting"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Live", path: "/live" },
          ]),
        ]}
      />
      {/* ─── HERO ─── */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[8%] left-[-12%] w-[44vw] h-[44vw] rounded-full bg-signal/15 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-maroon-600/30 blur-[160px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Chapter 03 · On-air</span>
            <span className="text-bone-100/30">/</span>
            <span>{LIVE_SITES.length} broadcasts</span>
          </div>
          <h1 className="display-massive text-bone-100 leading-[0.82]">
            Live.
            <span className="italic-accent text-signal font-light">/</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-bone-100/75">
            A small selection of the studio's catalogue, broadcasting right now
            from their own public addresses. Every tile opens out to the
            artifact itself.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/work" className="btn btn-ghost">
              See the full ledger
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
              {LIVE_SITES.length + PROJECTS.length} artifacts in the catalogue
            </span>
          </div>
        </div>
      </section>

      {/* ─── FILTER CHIPS ─── */}
      <section className="sticky top-16 md:top-20 z-30 bg-[color:var(--color-ink)]/90 backdrop-blur-md border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-4">
          <FilterChips
            chips={visibleChips}
            filter={filter}
            onChange={setFilter}
            counts={counts}
          />
        </div>
      </section>

      {/* ─── GRID ─── */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-10 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50">
            <span>
              Filter: <span className="text-signal">{filter}</span>
            </span>
            <motion.span
              key={`${filter}-${filtered.length}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="tabular-nums"
            >
              Showing <span className="text-bone-100">{filtered.length}</span> of {LIVE_SITES.length}
            </motion.span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
            >
              {filtered.map((site, i) => (
                <LiveTile key={site.slug} site={site} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-32 text-center font-mono text-xs tracking-[0.2em] uppercase text-bone-100/40">
                  Nothing here. Try a different filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Ticker
        items={[
          `${LIVE_SITES.length + PROJECTS.length} artifacts in the catalogue`,
          `${LIVE_SITES.length} broadcasting on their own domain`,
          "Custom-domain verified",
          "MMXXX · Broadcasting from their own domains",
        ]}
      />
    </PageTransition>
  );
}

// ─── LIVE TILE. Opens detail page on our site (card click) +
//    explicit outbound CTA (button click → external, new tab) ────────────
function LiveTile({ site, index }) {
  const hover = useCursorHover("view", "Open");
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-sm border border-white/10 hover:border-signal/60 transition-colors"
      style={{ backgroundColor: site.palette[0] }}
    >
      {/* Card-wide link to the detail page on OUR site */}
      <Link
        to={`/live/${site.slug}`}
        {...hover}
        className="absolute inset-0 z-20"
        aria-label={`Open ${site.name} on Bit Studio`}
      />

      {/* Bit Studio signature edge */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal/80 z-10" />

      {/* Palette stripe across the top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex z-10">
        {site.palette.map((c, idx) => (
          <span key={idx} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      <div className="p-6 md:p-8 pt-9 md:pt-10 min-h-[280px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: site.palette[1] }}
            >
              {site.tag} · On-air
            </div>
            {site.featured && (
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-signal">
                ★ Selected
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.05] mb-3">
            {site.name}
          </h3>
          <p className="text-sm md:text-[15px] text-bone-100/80 leading-[1.55]">
            {site.brief}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-bone-100/60">
              <GlobeHemisphereWestIcon size={13} className="shrink-0" />
              <span className="font-mono text-[11px] md:text-xs truncate">
                {site.domain}
              </span>
            </div>
          </div>
          {/* z-30 sits above the card-wide Link so this button intercepts the
              click and routes straight to the external site in a new tab. */}
          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-30 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100 hover:text-signal transition-colors shrink-0"
            aria-label={`Open ${site.domain} in a new tab`}
          >
            Visit ↗
            <ArrowUpRightIcon
              size={14}
              weight="bold"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
