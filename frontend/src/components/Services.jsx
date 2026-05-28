import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GlobeIcon,
  StackIcon,
  GraphIcon,
  CpuIcon,
  RobotIcon,
  DownloadSimpleIcon,
  SparkleIcon,
  LightningIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import SectionLabel from "./SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import QuantumHover from "./QuantumHover.jsx";
import { SERVICES as SERVICE_DATA } from "../data/services.js";
import { useReducedMotionPreference } from "../hooks/useReducedMotion.js";
import { HashChip } from "./HashChip.jsx";
import { PhosphorIcon } from "./PhosphorIcon.jsx";
import ServiceArtifact from "./service-artifacts/index.jsx";

/**
 * Services. Self-revealing showcase.
 * Each card reveals progressively as it enters the viewport:
 *   000ms  number (tabular-nums mono)
 *   120ms  icon scale+fade 0.6 → 1
 *   250ms  chartreuse hairline sweeps top edge L→R (600ms)
 *   380ms  title motion-blur ghost sharpens (blur(14px) → 0, 500ms)
 *   440ms  tagline fades in (italic accent, single line)
 *   540ms  hashtag chips stagger in (y:6, 40ms apart)
 *   720ms  Phosphor icon cluster fades in
 *   820ms  SVG design artifact fades in
 *   900ms  border glow settles
 *
 * The hairline persists after the sweep. It becomes the card's identity.
 * The existing QuantumHover + glassmorphism remain on-hover.
 * Card body is now a design-artifact stack (tags + icons + glyph). Not prose.
 */

const ICON_MAP = {
  Globe: GlobeIcon,
  Stack: StackIcon,
  Graph: GraphIcon,
  Cpu: CpuIcon,
  Robot: RobotIcon,
  DownloadSimple: DownloadSimpleIcon,
  Sparkle: SparkleIcon,
  Lightning: LightningIcon,
};

// Re-export for anywhere else that imported SERVICES from this file historically
export const SERVICES = SERVICE_DATA;

export default function Services() {
  return (
    <section id="services" className="relative pt-32 pb-24 md:py-40 bg-[color:var(--color-ink)] overflow-hidden">
      {/* Ambient under-glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top orb recessed (top-24 not top-0) + dimmed so the hero/services seam stays clean. */}
        <div className="absolute top-24 left-[10%] w-[40vw] h-[40vw] rounded-full bg-maroon-700/12 blur-[150px]" />
        <div className="absolute bottom-0 right-[5%] w-[35vw] h-[35vw] rounded-full bg-signal/5 blur-[140px]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-16">
          <div className="max-w-3xl">
            <SectionLabel chapter="§ 03" title="Services" />
            <h2 className="mt-6 display-xl text-bone-100">
              The beauty of <span className="italic-accent text-signal font-light">logic</span>.
              <br />
              <span className="italic-accent text-bone-300">Eight problems we love to solve.</span>
            </h2>
          </div>
          <p className="label-mono text-bone-100/40 max-w-sm">
            Not packages. Not tiers. A list of the things we are
            <span className="text-bone-100/70"> stupid enough to care about </span>
            at four in the afternoon.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]"
            >
              <QuantumHover strength={3}>
                <ServiceCard s={s} index={i} />
              </QuantumHover>
            </Link>
          ))}
        </div>

        {/* Mobile carousel */}
        <ServicesCarousel />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Desktop card. Self-revealing                                 */
/* ─────────────────────────────────────────────────────────────── */

function ServiceCard({ s, index }) {
  const hover = useCursorHover("hover", "");
  const Icon = ICON_MAP[s.icon] || GlobeIcon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotionPreference();

  // If reduced motion. Show everything instantly
  const show = reduced || inView;

  return (
    <motion.article
      ref={ref}
      {...hover}
      className="group relative"
    >
      <div
        className="relative h-full min-h-[460px] p-6 lg:p-7 rounded-sm border border-maroon-200/15 bg-maroon-950/30
                   backdrop-blur-xl backdrop-saturate-150
                   transition-[transform,border-color,background,box-shadow] duration-500
                   group-hover:-translate-y-1 group-hover:border-signal/60 group-hover:bg-maroon-900/40
                   overflow-hidden"
        style={{
          boxShadow: show
            ? "inset 0 1px 0 rgba(245,239,230,0.05), inset 0 -1px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(212,255,58,0.05)"
            : "inset 0 1px 0 rgba(245,239,230,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)",
          transitionDelay: show ? "900ms" : "0ms",
        }}
      >
        {/* Per-service mesh glow behind icon */}
        <div
          className="absolute -top-8 -left-8 w-40 h-40 rounded-full blur-[70px] opacity-60 transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: s.tint }}
          aria-hidden
        />

        {/* Chartreuse hairline. Sweeps in at 250ms (600ms), persists after */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none" aria-hidden>
          <motion.div
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={show ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${s.accent} 20%, ${s.accent} 80%, transparent)`,
              boxShadow: `0 0 10px ${s.accent}88`,
            }}
          />
        </div>

        {/* Hover diagonal wire */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 0%, transparent 40%, ${s.accent}22 50%, transparent 60%, transparent 100%)`,
          }}
          aria-hidden
        />

        {/* 1. Index number (0ms) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: 0, ease: "easeOut" }}
          className="relative label-mono text-maroon-300 mb-8 tabular-nums"
        >
          <span className="text-bone-100/80">{s.number}</span>
          <span className="text-bone-100/30"> / 08</span>
        </motion.p>

        {/* 2. Icon (120ms), scale + fade 0.6 → 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 transition-transform duration-500 group-hover:rotate-[12deg]"
        >
          <Icon size={26} weight="regular" className="text-bone-100" />
        </motion.div>

        {/* 4. Title (380ms), motion-blur ghost sharpens */}
        <motion.h3
          initial={{ opacity: 0, filter: "blur(14px)", y: 6 }}
          animate={
            show
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(14px)", y: 6 }
          }
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="relative display-lg text-bone-100 text-[1.45rem] lg:text-[1.65rem] leading-[1] mb-2 tracking-[-0.025em] group-hover:text-signal transition-colors duration-500"
        >
          {s.title}
        </motion.h3>

        {/* 4b. Tagline (single line, italic accent) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.44 }}
          className="relative text-[0.85rem] lg:text-[0.9rem] text-bone-100/55 italic-accent leading-snug mb-4"
        >
          {s.tagline}
        </motion.p>

        {/* 5. Zone 1: hashtag chips */}
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {(s.hashtags || []).map((tag, hi) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.54 + hi * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HashChip>{tag}</HashChip>
            </motion.span>
          ))}
        </div>

        {/* 6. Zone 2: Phosphor icon cluster */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.72 }}
          className="relative mt-4 flex items-center gap-2.5 text-bone-100 group-hover:opacity-100 transition-opacity duration-500"
        >
          {(s.iconCluster || []).map((iconName) => (
            <PhosphorIcon key={iconName} name={iconName} size={16} weight="regular" />
          ))}
        </motion.div>

        {/* 7. Zone 3: bespoke SVG design artifact */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-5"
        >
          <ServiceArtifact id={s.artifact} />
        </motion.div>

        {/* "More →" CTA. Visual only; the entire card is the Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.9 }}
          className="relative mt-6 pt-4 border-t border-white/5"
        >
          <span
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/70 group-hover:text-signal transition-colors"
          >
            <span>More</span>
            <ArrowRightIcon
              size={12}
              weight="bold"
              className="transition-transform duration-400 group-hover:translate-x-1"
            />
          </span>
        </motion.div>

        {/* Corner mark */}
        <span
          className="absolute bottom-4 right-4 w-2 h-2 rounded-full transition-all duration-500"
          style={{ background: s.accent, boxShadow: `0 0 14px ${s.accent}66` }}
          aria-hidden
        />
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Mobile carousel. Reveal triggers when centred                */
/* ─────────────────────────────────────────────────────────────── */

function ServicesCarousel() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const hover = useCursorHover("hover", "");

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideW = el.scrollWidth / SERVICES.length;
      const idx = Math.round(el.scrollLeft / slideW);
      setActive(Math.min(Math.max(idx, 0), SERVICES.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver. A card is "centered" when ≥70% of it is within the
  // scroller's visible rect. That card receives forceActive=true so the
  // QuantumHover effects (particles, rings, glow, chromatic aberration) render
  // without needing a mouse, fading as the next card slides in.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    // Only on touch devices. Desktop already uses mouse hover.
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    if (!isCoarse) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersectionRatio that's ≥0.7
        let best = null;
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.7) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          const idx = cardRefs.current.findIndex((r) => r === best.target);
          if (idx >= 0) setActive(idx);
        }
      },
      {
        root,
        threshold: [0.5, 0.7, 0.9],
        rootMargin: "0px -10% 0px -10%",
      }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideW = el.scrollWidth / SERVICES.length;
    el.scrollTo({ left: slideW * i, behavior: "smooth" });
  };

  return (
    <div className="md:hidden">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-4 px-1 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        <span className="text-signal tabular-nums">
          {SERVICES[active]?.number} <span className="text-bone-100/30">/</span> 08
        </span>
        <span className="italic-accent text-bone-300 normal-case tracking-normal text-base text-bone-100">
          {SERVICES[active]?.title.split(" ").slice(0, 3).join(" ")}…
        </span>
      </div>

      {/* Carousel track */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-4 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {SERVICES.map((s, i) => (
          <MobileServiceCard
            key={s.slug}
            s={s}
            index={i}
            isActive={i === active}
            registerRef={(el) => (cardRefs.current[i] = el)}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            {...hover}
            onClick={() => go(i)}
            aria-label={`Go to service ${i + 1}`}
            className={`transition-all duration-500 rounded-full ${
              i === active
                ? "w-8 h-1.5 bg-signal"
                : "w-1.5 h-1.5 bg-bone-100/20 hover:bg-bone-100/40"
            }`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="mt-5 text-center font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/30">
        Swipe →
      </p>
    </div>
  );
}

function MobileServiceCard({ s, index, isActive = false, registerRef }) {
  const Icon = ICON_MAP[s.icon] || GlobeIcon;
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7 }); // triggers when centred
  const [hasRevealed, setHasRevealed] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (inView) setHasRevealed(true);
  }, [inView]);

  // Expose our DOM node up to the carousel for its IntersectionObserver
  const setRefs = (el) => {
    ref.current = el;
    if (typeof registerRef === "function") registerRef(el);
  };

  const show = reduced || hasRevealed;

  return (
   <div ref={setRefs} className="shrink-0 snap-center w-[86%]">
    <Link
      to={`/services/${s.slug}`}
      className="block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]"
    >
    <QuantumHover strength={2.5} forceActive={isActive}>
    <div
      className="group relative w-full min-h-[440px] p-6 rounded-sm border border-maroon-200/20 bg-maroon-950/40 backdrop-blur-xl overflow-hidden"
      style={{
        boxShadow: "inset 0 1px 0 rgba(245,239,230,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}
    >
      {/* Per-service mesh glow */}
      <div
        className="absolute -top-10 -left-10 w-52 h-52 rounded-full blur-[80px] opacity-70"
        style={{ background: s.tint }}
        aria-hidden
      />

      {/* Chartreuse hairline */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={show ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${s.accent} 20%, ${s.accent} 80%, transparent)`,
            boxShadow: `0 0 10px ${s.accent}88`,
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4 }}
        className="relative label-mono text-maroon-300 mb-6 tabular-nums"
      >
        <span className="text-bone-100/80">{s.number}</span>
        <span className="text-bone-100/30"> / 08</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.12 }}
        className="relative mb-6"
      >
        <Icon size={32} weight="regular" className="text-bone-100" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, filter: "blur(14px)", y: 6 }}
        animate={show ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(14px)", y: 6 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.38 }}
        className="relative italic-accent text-4xl leading-[0.95] text-bone-100 mb-3 tracking-[-0.01em]"
      >
        {s.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.44 }}
        className="relative text-[0.92rem] text-bone-100/55 italic-accent leading-snug mb-5"
      >
        {s.tagline}
      </motion.p>

      {/* Zone 1. Hashtag chips */}
      <div className="relative flex flex-wrap gap-1.5 mb-4">
        {(s.hashtags || []).map((tag, hi) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.54 + hi * 0.04 }}
          >
            <HashChip>{tag}</HashChip>
          </motion.span>
        ))}
      </div>

      {/* Zone 2. Phosphor icon cluster */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.72 }}
        className="relative flex items-center gap-2.5 text-bone-100 mb-5"
      >
        {(s.iconCluster || []).map((iconName) => (
          <PhosphorIcon key={iconName} name={iconName} size={18} weight="regular" />
        ))}
      </motion.div>

      {/* Zone 3. Bespoke SVG design artifact */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.82 }}
        className="relative"
      >
        <ServiceArtifact id={s.artifact} />
      </motion.div>

      {/* More → CTA (visual only; whole card is the Link) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.9 }}
        className="relative mt-6 pt-4 border-t border-white/5"
      >
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-signal">
          <span>Read the full piece</span>
          <ArrowRightIcon size={12} weight="bold" />
        </span>
      </motion.div>

      <span
        className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full"
        style={{ background: s.accent, boxShadow: `0 0 18px ${s.accent}88` }}
        aria-hidden
      />
    </div>
    </QuantumHover>
    </Link>
   </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
