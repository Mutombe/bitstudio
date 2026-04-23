import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  CircleNotchIcon,
  CompassIcon,
} from "@phosphor-icons/react";
import { PROJECTS } from "../data/projects.js";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { useClock, formatHMS } from "../hooks/useClock.js";
import Ticker from "../components/Ticker.jsx";
import Marquee from "../components/Marquee.jsx";
import ProjectTile from "../components/ProjectTile.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import Services from "../components/Services.jsx";
import MeshField from "../components/MeshField.jsx";
import WaveBreak from "../components/WaveBreak.jsx";
import FusionField from "../components/FusionField.jsx";

const TICKER_ITEMS = [
  "Endpoint OK",
  "React 19 · Vite 7 · Tailwind v4",
  "Harare → Signal",
  "Transmission received",
  "30 artifacts on-air",
  "Grain delivered",
  "Deploy green",
  "Heart rate nominal",
  "Cursor: maroon · 10px · difference",
  "Uptime 99.94%",
  "Latency 41ms",
];

const FEATURED = PROJECTS.filter((p) => p.featured);

export default function Home({ onSummon }) {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Open");
  const now = useClock();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageTransition>
      {/* ─── 00 · HERO — viewport-fit on desktop ─── */}
      <section
        ref={heroRef}
        className="
          relative overflow-hidden radial-bleed hero-seam
          min-h-[100svh] pt-24 pb-8
          lg:pt-20 lg:pb-0
          lg:min-h-[calc(100svh-80px)] lg:h-[calc(100svh-80px)] lg:max-h-[860px]
          lg:flex lg:flex-col lg:justify-between
        "
      >
        {/* Computed ambient mesh (no images) */}
        <MeshField tint="maroon" intensity="med" />

        <div className="relative max-w-[1600px] mx-auto w-full px-5 md:px-10 flex flex-col gap-8 md:gap-10 lg:pt-10 lg:flex-1 lg:justify-center">
          {/* Diagnostic corner */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <CircleNotchIcon size={12} className="animate-spin text-signal" />
                Bit Studio · MMXXX
              </span>
              <span className="hidden md:inline">Chapter 00 / Index</span>
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
                Transmission 0001 — opened from Harare to the signal
              </p>
              <h1 className="display-hero text-bone-100 -ml-1 md:-ml-3">
                <span className="motion-blur-type" data-text="BIT">BIT</span>
                <span className="signal-text">·</span>
              </h1>
              <h1 className="display-hero text-bone-100 -mt-[0.15em] md:-mt-[0.2em] pl-[0.3em]">
                <span className="italic-accent text-maroon-400 font-light">studio</span>
              </h1>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
              <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <p className="text-base md:text-lg lg:text-[1.05rem] text-bone-100/85 leading-relaxed max-w-[48ch]">
                  We are the ultimate philosophers of beauty and code. We do not
                  decorate software —
                  <span className="italic-accent text-signal"> we remember what beauty was</span> before
                  it was contested. Interfaces, brand systems, engineering. From
                  Harare, broadcasting to any platform that will hold us.
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
                      Six recently-live · 30+ artifacts
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

        {/* Ticker — sits at the bottom edge on desktop */}
        <div className="relative mt-10 lg:mt-0">
          <Ticker items={TICKER_ITEMS} />
        </div>
      </section>

      {/* Seam: hero → services (wave is punctuation, edges dissolved) */}
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
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <SectionLabel chapter="§ 04" title="Selected Work" />
              <h2 className="mt-5 display-xl text-bone-100">
                Six clients. <br />
                <span className="italic-accent text-bone-300">Same standard.</span>
              </h2>
            </div>
            <Link to="/work" {...hover} className="btn btn-ghost">
              All 30+ artifacts <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {FEATURED.map((p, i) => (
              <ProjectTile
                key={p.slug}
                project={p}
                index={i}
                size={i % 3 === 0 ? "lg" : "md"}
              />
            ))}
          </div>
        </div>
      </section>

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
            <CounterStat value={142} from={23} suffix="" label="Artifacts deployed" />
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
              — a small note taped to the studio wall, left by someone who did
              not sign it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 06 · CLIENT MARQUEE ─── */}
      <section className="relative py-10 bg-maroon-600 text-bone-100 overflow-hidden">
        <Marquee speed="fast" className="py-3">
          {PROJECTS.slice(0, 12).map((p) => (
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
              href="https://wa.me/263787335226"
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
    <div ref={ref}>
      <p
        className="text-bone-100 leading-none tracking-[-0.04em]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(3rem, 7vw, 9rem)",
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
