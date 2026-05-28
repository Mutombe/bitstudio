import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, ArrowRightIcon, GlobeHemisphereWestIcon } from "@phosphor-icons/react";
import { PROJECTS, FILTER_CHIPS, filterProjects } from "../data/projects.js";
import { LIVE_SITES } from "../data/live-sites.js";
import { AGRI_SHOW_DEMOS } from "../data/agri-show-demos.js";
import ProjectTile from "../components/ProjectTile.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import Ticker from "../components/Ticker.jsx";
import FilterChips, { computeCounts } from "../components/FilterChips.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";

const TOTAL_ARTIFACTS = PROJECTS.length + LIVE_SITES.length + AGRI_SHOW_DEMOS.length;

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

      {/* ─── AGRI SHOW · HARARE 2026 ───
          A single fortnight, thirty-three bespoke sites for exhibitors of
          the Zimbabwe Agricultural Show. Every entry below is a real live
          URL on Render. Each was built fresh — no template, no skeleton in
          common — and presented as a gift to the named business. */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-[-20%] left-[-10%] w-[42vw] h-[42vw] rounded-full bg-signal/[0.06] blur-[180px]" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-8">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Chapter 02 · Annex</span>
            <span className="text-bone-100/30">/</span>
            <span>Agri Show · Harare 2026</span>
            <span className="text-bone-100/30">/</span>
            <span>{AGRI_SHOW_DEMOS.length} demos</span>
          </div>

          <h2 className="display-massive text-bone-100 leading-[0.86] text-balance">
            A fortnight.
            <span className="italic-accent text-maroon-400 font-light"> </span>
            <span className="block text-bone-100/80">Thirty-three sites.</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <p className="md:col-span-7 text-lg text-bone-100/75 max-w-2xl leading-relaxed">
              For the {new Date().getFullYear()} Zimbabwe Agricultural Show we picked thirty‑three
              exhibitors — heritage manufacturers, founder‑led practices, family
              dealerships, market‑leading distributors — and built each one a
              complete bespoke website on the house. Every site is a fresh
              React project. No template, no shared skeleton. Each carries one
              signature interaction and is presented as a gift to the named
              business.
            </p>
            <div className="md:col-span-5">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-[11px] tracking-[0.18em] uppercase text-bone-100/55">
                <div>
                  <dt className="text-bone-100/40">Period</dt>
                  <dd className="mt-1 text-bone-100">May 2026</dd>
                </div>
                <div>
                  <dt className="text-bone-100/40">Cohort</dt>
                  <dd className="mt-1 text-bone-100">33 exhibitors</dd>
                </div>
                <div>
                  <dt className="text-bone-100/40">Builds</dt>
                  <dd className="mt-1 text-bone-100">Bespoke · Fresh React</dd>
                </div>
                <div>
                  <dt className="text-bone-100/40">Outreach</dt>
                  <dd className="mt-1 text-bone-100">Email · WhatsApp</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {AGRI_SHOW_DEMOS.map((p, i) => {
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
          </div>
        </div>
      </section>

      <Ticker
        items={[
          `${TOTAL_ARTIFACTS} artifacts on-air`,
          `${AGRI_SHOW_DEMOS.length} Agri Show demos`,
          "Rendered on Render",
          "Sourced on SerpAPI",
          "Styled by humans",
          "Shipped with discipline",
          "MMXXX · One standard",
        ]}
      />
    </PageTransition>
  );
}
