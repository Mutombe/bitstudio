import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, ArrowRightIcon, GlobeHemisphereWestIcon } from "@phosphor-icons/react";
import { PROJECTS, FILTER_CHIPS, filterProjects } from "../data/projects.js";
import { LIVE_SITES } from "../data/live-sites.js";
import ProjectTile from "../components/ProjectTile.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import Ticker from "../components/Ticker.jsx";
import FilterChips, { computeCounts } from "../components/FilterChips.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";

const TOTAL_ARTIFACTS = PROJECTS.length + LIVE_SITES.length;

export default function Work() {
  const [filter, setFilter] = useState("all");
  const hover = useCursorHover("hover", "");
  const filtered = useMemo(() => filterProjects(PROJECTS, filter), [filter]);
  const counts = useMemo(() => computeCounts(PROJECTS, FILTER_CHIPS), []);
  // Only show chips with at least one project under them
  const visibleChips = useMemo(
    () => FILTER_CHIPS.filter((c) => (counts[c.id] ?? 0) > 0 || c.id === "all"),
    [counts]
  );

  return (
    <PageTransition>
      <SEO
        title="Work"
        description={`A ledger of ${TOTAL_ARTIFACTS} artifacts. Real URLs, real clients, sorted by aesthetic carriage — Atelier, Editorial, Cinematic, Brutalist, Heritage, Manifesto, Bento, Pastoral.`}
        path="/work"
        keywords={["portfolio", "case studies", "design ledger", "Bit Studio work"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ]}
      />
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-maroon-600/25 blur-[160px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-10">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Chapter 02 · Ledger</span>
            <span className="text-bone-100/30">/</span>
            <span>{TOTAL_ARTIFACTS} artifacts</span>
          </div>
          <h1 className="display-massive text-bone-100 leading-[0.82]">
            Work.
            <span className="italic-accent text-maroon-400 font-light">/</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-bone-100/75">
            Every tile is a live URL. Every tile survived at least one 3 AM.
            Every tile is somebody's home on the internet now.
          </p>

          {/* CTA to the dedicated Live page */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/live" className="btn btn-ghost">
              On-air broadcasts
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
              A selection broadcasting from their own domains
            </span>
          </div>
        </div>
      </section>

      {/* Filter chips */}
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

      <section className="relative py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-10 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50">
            <span>Filter: <span className="text-signal">{filter}</span></span>
            <motion.span
              key={`${filter}-${filtered.length}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="tabular-nums"
            >
              Showing <span className="text-bone-100">{filtered.length}</span> of {PROJECTS.length}
            </motion.span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-6 md:gap-10"
            >
              {filtered.map((p, i) => {
                // Bento rhythm — matches /home Selected Work so the ledger feels
                // continuous. 9-tile loop, each row sums to 12 cols.
                const bento = ["lg", "sm", "sm", "sm", "sm", "sm", "lg", "md", "md"];
                return (
                  <ProjectTile
                    key={p.slug}
                    project={p}
                    index={i}
                    size={bento[i % bento.length]}
                  />
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-12 py-32 text-center font-mono text-xs tracking-[0.2em] uppercase text-bone-100/40">
                  Nothing here. Try a different filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Ticker
        items={[
          `${TOTAL_ARTIFACTS} artifacts on-air`,
          "Rendered on Render",
          "Sourced on SerpAPI",
          "Styled by humans",
          "Shipped with discipline",
          "Bit Studio · MMXXX",
        ]}
      />
    </PageTransition>
  );
}
