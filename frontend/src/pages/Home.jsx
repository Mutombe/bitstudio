import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  CircleNotchIcon,
  CompassIcon,
  GlobeHemisphereWestIcon,
} from "@phosphor-icons/react";
import { PROJECTS, filterProjects } from "../data/projects.js";
import { LIVE_SITES, LIVE_FEATURED } from "../data/live-sites.js";
import { sortByAesthetic } from "../data/aesthetic-score.js";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { useClock, formatHMS } from "../hooks/useClock.js";
import Ticker from "../components/Ticker.jsx";
import Marquee from "../components/Marquee.jsx";
import ProjectTile from "../components/ProjectTile.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import Services from "../components/Services.jsx";
import SEO, { organizationJsonLd, websiteJsonLd } from "../components/SEO.jsx";
import MeshField from "../components/MeshField.jsx";
import WireframeOverlay from "../components/WireframeOverlay.jsx";
import WaveBreak from "../components/WaveBreak.jsx";
import FusionField from "../components/FusionField.jsx";
import FilterChips, { computeCounts } from "../components/FilterChips.jsx";

// Total artifacts = demos + live-domain sites
const TOTAL_ARTIFACTS = PROJECTS.length + LIVE_SITES.length;

const TICKER_ITEMS = [
  "Endpoint OK",
  "React 19 · Vite 7 · Tailwind v4",
  "Harare → Signal",
  "Transmission received",
  `${TOTAL_ARTIFACTS} artifacts on-air`,
  "Grain delivered",
  "Deploy green",
  "Lighthouse 100 · floor",
  "Cursor: maroon · 10px · difference",
  "Uptime 99.94%",
  "Latency 41ms",
];

// Homepage Selected Work uses the same aesthetic ranking that anchors /work
//. Alliance Health, AutoWorld, then the rest, top-down. Slice 9 to fit the
// bento rhythm (lg + sm·sm·sm + sm·sm·sm + lg + md·md = 9 tiles).
const HOME_TOP = sortByAesthetic(PROJECTS).slice(0, 9);

// Homepage marquee: pull from the same top-of-the-stack ranking.
const HOMEPAGE_MARQUEE = sortByAesthetic(PROJECTS).slice(0, 12);

// Compact chip set for the homepage. "All" + tags present in HOME_TOP
const HOME_CHIPS = [
  { id: "all", label: "All" },
  ...Array.from(new Set(HOME_TOP.map((p) => p.tag))).map((tag) => ({
    id: tag,
    label: tag,
  })),
];

export default function Home({ onSummon }) {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Open");
  const now = useClock();

  const [workFilter, setWorkFilter] = useState("all");
  const workFiltered = useMemo(
    () => filterProjects(HOME_TOP, workFilter),
    [workFilter]
  );
  const workCounts = useMemo(
    () => computeCounts(HOME_TOP, HOME_CHIPS),
    []
  );

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageTransition>
      <SEO
        title="Bit Studio"
        description="A design and engineering studio from Harare. We build interfaces, brand systems, and software that age into heirlooms. After Musashi, 1645."
        path="/"
        keywords={["Bit Studio", "design studio", "Harare", "Zimbabwe", "brand systems", "interface design", "Musashi"]}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      {/* ─── 00 · HERO. Viewport-fit on desktop, natural on mobile ─── */}
      <section
        ref={heroRef}
        className="
          relative overflow-hidden radial-bleed hero-seam
          min-h-[100svh] pt-28 md:pt-40 pb-10 md:pb-16
          lg:pt-20 lg:pb-0
          lg:min-h-[calc(100svh-80px)]
          lg:flex lg:flex-col lg:justify-between
        "
      >
        {/* Computed ambient mesh (no images) */}
        <MeshField tint="maroon" intensity="med" />
        {/* Same architectural wireframe artifact as Studio hero. Anchored to the
            right side via the component's viewBox cx=1200 (75% across 1600w). */}
        <WireframeOverlay />

        <div className="relative z-20 max-w-[1600px] mx-auto w-full px-5 md:px-10 flex flex-col gap-8 md:gap-10 lg:pt-10 lg:flex-1 lg:justify-center">
          {/* Diagnostic corner */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <CircleNotchIcon size={12} className="animate-spin text-signal" />
                Chapter 00 · Index
              </span>
              <span className="hidden md:inline">MMXXX</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">UTC {formatHMS(now)}</span>
              <span className="hidden md:inline">-17.8292 · 31.0522</span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
                On-air
              </span>
            </div>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col gap-6 md:gap-8 lg:gap-6"
          >
            <div className="flex flex-col">
              <p className="label-mono text-bone-100/60 mb-4 md:mb-6">
                Transmission 0001. Open
              </p>
              <h1 className="display-massive text-bone-100 -ml-1 md:-ml-2 leading-[0.86] text-balance text-[clamp(3.25rem,10vw,10rem)]">
                We do not decorate.
              </h1>
              <h1 className="display-massive text-bone-100 -mt-[0.04em] md:-mt-[0.05em] leading-[0.86] text-[clamp(3.25rem,10vw,10rem)]">
                <span className="italic-accent text-maroon-400 font-light">We remember.</span>
              </h1>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
              <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <p className="text-base md:text-lg lg:text-[1.05rem] text-bone-100/85 leading-relaxed max-w-[48ch]">
                  Interfaces. Systems. Brands. A practice for businesses
                  that need
                  <span className="italic-accent text-signal"> real beauty, durable infrastructure, true scale, and longevity</span>{" "}
                  past the next quarter. After Musashi, 1645.
                </p>
                <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/work" {...hover} className="btn btn-primary">
                    See Work
                    <ArrowRightIcon size={14} weight="bold" />
                  </Link>
                  <button onClick={onSummon} {...hover} className="btn btn-ghost">
                    Summon
                    <span className="font-mono text-[10px] tracking-[0.2em] text-bone-100/50">⌘K</span>
                  </button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-7 md:flex md:justify-end">
                <div className="relative inline-flex items-stretch gap-6 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
                  <div className="border-l border-maroon-500/40 pl-4">
                    <p className="text-bone-100/40 mb-1">Broadcast</p>
                    <p className="text-bone-100/90 text-sm normal-case tracking-normal font-sans">
                      {TOTAL_ARTIFACTS} artifacts on-air
                    </p>
                  </div>
                  <div className="border-l border-maroon-500/40 pl-4">
                    <p className="text-bone-100/40 mb-1">Signature</p>
                    <p className="text-bone-100/90 text-sm normal-case tracking-normal font-sans italic-accent">
                      We float 3m off the ground
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ticker. Sits at the bottom edge on desktop; z-20 keeps it above the hero-seam fade */}
        <div className="relative z-20 mt-10 lg:mt-0">
          <Ticker items={TICKER_ITEMS} />
        </div>
      </section>

      {/* Seam: hero → why us */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── § 01 · ON STANDARDS. Standards we hold ourselves to,
              the lineage we belong to, and the scarcity that decides who
              we work with. The room a buyer is in, not the door they are
              trying to open. ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] seam-bleed-top">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 md:col-span-3 md:pt-3">
              <SectionLabel chapter="§ 01" title="On standards" />
            </div>
            <div className="col-span-12 md:col-span-9 space-y-12 max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="display-xl text-bone-100 leading-[1.02]"
              >
                We work to a standard
                <br />
                <span className="italic-accent text-bone-300 font-light">
                  the world recognises.
                </span>
              </motion.h2>

              <p className="max-w-2xl text-base md:text-lg text-bone-100/70 leading-relaxed">
                Anyone. On any continent. Whose business depends on
                real beauty, durable infrastructure, true scale, or
                longevity past the next quarter is welcome to write to us.
                We choose the work as much as the work chooses us. What
                follows is what we hold ourselves to.
              </p>

              {/* The four deliverables, surfaced as a quiet ribbon.
                  the things a business actually engages us for, named
                  in the room before they ask. */}
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 max-w-2xl text-bone-100/55 font-mono text-[10px] tracking-[0.22em] uppercase border-y border-white/10 py-4">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Real beauty</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Infrastructure</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Scale</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal" />Longevity</li>
              </ul>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    01 · Standards
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Lighthouse 100 is the floor.<br />
                    <span className="text-bone-100/55">Ten days is the ceiling.</span>
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    Numbers other studios publish as ambition, we publish
                    as the floor. Performance, accessibility, SEO,
                    best‑practices. Measured before launch and again on
                    the day after. What does not clear the line does not
                    ship, even when the calendar would prefer that it did.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    02 · Lineage
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Werkbund. Vignelli. Musashi.
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    The people you'll meet here trained in a canon that
                    refuses fashion. No trend, no lorem, no decoration
                    that has not earned itself. Form follows function,
                    with a soul, and the soul is not optional. The long
                    version is on{" "}
                    <Link to="/craft" className="text-signal hover-line">/craft</Link>.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-3">
                    03 · Selectivity
                  </p>
                  <p className="font-display text-xl text-bone-100 leading-[1.1] mb-3">
                    Three slots a quarter.<br />
                    <span className="text-bone-100/55">Any continent.</span>
                  </p>
                  <p className="text-bone-100/75 leading-relaxed text-sm md:text-base">
                    We refuse two kinds of brief: those that already know
                    what they want to look like, and those that argue
                    with their own users. The rest receive a real
                    conversation. And, occasionally, a&nbsp;contract.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seam: why us → services */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── 01 · SERVICES (new, altruistic, ultraistic) ─── */}
      <Services />

      {/* Seam: services → work (wave is punctuation, radial mask dissolves edges) */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── 02 · SELECTED WORK ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] seam-bleed-top seam-bleed-bottom-maroon">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <SectionLabel chapter="§ 04" title="Selected Work" />
              <h2 className="mt-5 display-xl text-bone-100">
                {TOTAL_ARTIFACTS} artifacts. <br />
                <span className="italic-accent text-bone-300">One standard.</span>
              </h2>
            </div>
            <Link to="/work" {...hover} className="btn btn-ghost">
              All {TOTAL_ARTIFACTS} artifacts <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>

          {/* Filter chips + count */}
          <div className="mb-8 md:mb-10">
            <FilterChips
              chips={HOME_CHIPS}
              filter={workFilter}
              onChange={setWorkFilter}
              counts={workCounts}
            />
            <motion.p
              key={`${workFilter}-${workFiltered.length}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 tabular-nums"
            >
              Showing <span className="text-bone-100">{workFiltered.length}</span> of {HOME_TOP.length}
            </motion.p>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={workFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-6 md:gap-10"
            >
              {workFiltered.map((p, i) => {
                // Bento rhythm across a 12-col grid. Each row sums to 12:
                //   row1: lg(8) + sm(4)
                //   row2: sm(4) + sm(4) + sm(4)
                //   row3: sm(4) + lg(8)
                //   row4: md(6) + md(6)
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 02.5 · LIVE PRODUCTION STRIP ─── */}
      <HomeLiveStrip />

      {/* ─── 03 · FUSION BREAK ─── */}
      <section className="relative overflow-visible bg-maroon-950 seam-fusion">
        <FusionField size="lg" className="" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <p
            className="italic-accent text-bone-100 text-center max-w-3xl leading-snug"
            style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.75rem)" }}
          >
            "Two stars, one argument.
            <br />
            <span className="text-signal">The interface is where they agree.</span>"
          </p>
        </div>
      </section>

      {/* ─── 04 · PHILOSOPHY PULL ─── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-philosophy">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04]">
          <span className="display-massive leading-none text-maroon-500">BS</span>
        </div>
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2 md:pt-4">
            <SectionLabel chapter="§ 05" title="Creed" />
          </div>
          <div className="col-span-12 md:col-span-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-bone-100 max-w-[22ch]"
            >
              We do not design.
              <br />
              We <span className="italic-accent text-signal">remember</span> what beauty was
              <br />
              before it was <span className="italic-accent text-maroon-400">contested</span>.
            </motion.h2>

            <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-10 text-bone-100/75 max-w-5xl">
              <p>
                Every file we ship is an argument against the cheap default. Against
                the trend. Against the lorem.
              </p>
              <p>
                We work the way a jeweller works. Slowly. With light. Measuring three
                times.
              </p>
              <p>
                Then we ship. On time. Because taste without discipline is a hobby.
              </p>
            </div>

            {/* Lead the reader into the longer-form inheritance. /craft */}
            <div className="mt-16 md:mt-24 max-w-3xl border-t border-white/10 pt-10 md:pt-14">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
                The full inheritance · 道
              </p>
              <p className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.15] max-w-2xl mb-6">
                We learnt to make from a swordsman who lived four centuries ago.
                <span className="italic-accent text-bone-300"> The five rings are taped to the wall.</span>
              </p>
              <Link to="/craft" {...hover} className="btn btn-ghost">
                Read The Way
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seam: philosophy → numbers (wave punctuation, dissolved edges) */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>

      {/* ─── 05 · NUMBERS ─── */}
      <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] seam-bleed-bottom-maroon proof-section">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ 06" title="Proof (the absurd kind)" />
          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <CounterStat value={TOTAL_ARTIFACTS} from={23} suffix="" label="Artifacts deployed" />
            <CounterStat value={87} from={0} suffix="/88" label="Mothers satisfied" />
            <CounterStat value={2030} from={2024} suffix="" label="Years forward" />
            <CounterStat value={99.94} from={90} suffix="%" label="Uptime nominal" decimals={2} />
          </div>

          <div className="mt-14 md:mt-20 pt-10 border-t border-white/10 grid md:grid-cols-2 gap-8">
            <p
              className="text-bone-100/70 max-w-xl italic-accent leading-snug"
              style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.75rem)" }}
            >
              "The numbers do not know why they were counted. <span className="text-signal">We do.</span>"
            </p>
            <p
              className="text-bone-100/60 max-w-md md:justify-self-end leading-snug"
              style={{ fontSize: "clamp(0.875rem, 1.3vw, 1.125rem)" }}
            >
             . A small note taped to the studio wall, left by someone who did
              not sign it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 06 · CLIENT MARQUEE ─── */}
      <section className="relative py-10 bg-maroon-600 text-bone-100 overflow-hidden">
        <Marquee speed="fast" className="py-3">
          {HOMEPAGE_MARQUEE.map((p) => (
            <span
              key={p.slug}
              className="display-lg text-bone-100/95 whitespace-nowrap flex items-center gap-8"
            >
              {p.name}
              <span className="text-signal text-2xl leading-none">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── 07 · CLOSING CTA ─── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ 07" title="Sign-off" />
          <h2 className="mt-10 display-massive text-bone-100 leading-[0.85]">
            Build
            <br />
            <span className="italic-accent text-signal font-light">something</span>
            <br />
            that <span className="text-maroon-400">outlives</span>
            <br />
            the platform.
          </h2>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/contact" {...viewHover} className="btn btn-primary">
              Open a transmission
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <a
              href="https://wa.me/263785948128"
              target="_blank"
              rel="noreferrer"
              {...hover}
              className="btn btn-ghost"
            >
              WhatsApp
              <CompassIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

// ─── HOMEPAGE LIVE STRIP. 6 featured live sites + "see all" CTA ──────
function HomeLiveStrip() {
  // Pull the 6 featured live sites, fall back to first 6 if fewer marked.
  const featured =
    LIVE_FEATURED.length >= 6 ? LIVE_FEATURED.slice(0, 6) : LIVE_SITES.slice(0, 6);
  const hover = useCursorHover("view", "Open");

  return (
    <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)] border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <SectionLabel chapter="§ 05" title="On the open internet" />
            <h2 className="mt-5 display-xl text-bone-100 leading-[0.92]">
              Broadcasting <br />
              <span className="italic-accent text-signal font-light">from their own domains.</span>
            </h2>
            <p className="mt-6 max-w-xl text-bone-100/70">
              A small selection of the studio's catalogue, broadcasting right
              now from public addresses.
            </p>
          </div>
          <Link to="/live" className="btn btn-ghost">
            View broadcasts <ArrowRightIcon size={14} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {featured.map((site, i) => (
            <motion.div
              key={site.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(i * 0.05, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-sm border border-white/10 hover:border-signal/60 transition-colors"
              style={{ backgroundColor: site.palette[0] }}
            >
              {/* Card-wide link to detail page on our site */}
              <Link
                to={`/live/${site.slug}`}
                {...hover}
                className="absolute inset-0 z-20"
                aria-label={`Open ${site.name} on Bit Studio`}
              />
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal/80 z-10" />
              <div className="absolute top-0 left-0 right-0 h-1 flex z-10">
                {site.palette.map((c, idx) => (
                  <span key={idx} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="p-6 md:p-7 pt-9 md:pt-10 min-h-[240px] flex flex-col justify-between">
                <div>
                  <div
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                    style={{ color: site.palette[1] }}
                  >
                    {site.tag} · On-air
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-bone-100 leading-[1.05] mb-3">
                    {site.name}
                  </h3>
                  <p className="text-sm text-bone-100/75 leading-[1.55] line-clamp-3">
                    {site.brief}
                  </p>
                </div>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div className="flex items-center gap-2 text-bone-100/60 min-w-0">
                    <GlobeHemisphereWestIcon size={13} className="shrink-0" />
                    <span className="font-mono text-[11px] truncate">
                      {site.domain}
                    </span>
                  </div>
                  {/* Outbound link. Z-30 above the card-wide Link */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-30 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/85 hover:text-signal transition-colors shrink-0"
                    aria-label={`Open ${site.domain} in a new tab`}
                  >
                    Visit
                    <ArrowUpRightIcon
                      size={14}
                      weight="bold"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterStat({ value, from = 0, suffix = "", label, decimals = 0 }) {
  const [v, setV] = useState(from);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const duration = 1200;
          const start = performance.now();
          const step = (t) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(from + (value - from) * eased);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, from]);

  return (
    <div ref={ref} className="min-w-0">
      <p
        className="text-bone-100 leading-none tracking-[-0.04em] tabular-nums whitespace-nowrap overflow-hidden"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
        }}
      >
        {v.toFixed(decimals)}
        <span className="text-signal">{suffix}</span>
      </p>
      <p
        className="mt-3 font-mono tracking-[0.2em] uppercase text-bone-100/55"
        style={{ fontSize: "clamp(0.6rem, 0.85vw, 0.78rem)" }}
      >
        {label}
      </p>
    </div>
  );
}
