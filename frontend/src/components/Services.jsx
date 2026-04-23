import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GlobeIcon,
  StackIcon,
  GraphIcon,
  CpuIcon,
  RobotIcon,
  DownloadSimpleIcon,
  SparkleIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import SectionLabel from "./SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * Services — the full "Capabilities" rewrite.
 * Desktop: 4×2 glassmorphic grid with per-service mesh glow.
 * Mobile: horizontal snap-scroll carousel with dot pagination + mono progress.
 */

export const SERVICES = [
  {
    id: "websites",
    title: "Websites with consequence",
    copy:
      "Marketing pages, storefronts, portfolios. Built to look unreasonable in screenshots and load in under a second on a broken connection.",
    icon: GlobeIcon,
    tint: "#B54656",    // maroon-400
    accent: "#D4FF3A",
  },
  {
    id: "web-apps",
    title: "Web applications",
    copy:
      "Full-stack products with React, Django, Postgres. User flows that respect attention. Dashboards that read like charts before they read like tables.",
    icon: StackIcon,
    tint: "#8C1E2C",
    accent: "#D4FF3A",
  },
  {
    id: "enterprise",
    title: "Enterprise software",
    copy:
      "Internal tools for teams that outgrew the spreadsheet. Custom CRMs, inventory systems, compliance workflows. Designed for the person using it at 4pm on a Friday.",
    icon: GraphIcon,
    tint: "#6B1521",
    accent: "#A8C72E",
  },
  {
    id: "ai-agents",
    title: "AI agents",
    copy:
      "Bespoke assistants, orchestration pipelines, tool-use workflows. Claude, GPT, open models — we choose the one that suits the problem, then make it behave.",
    icon: RobotIcon,
    tint: "#3A0A15",
    accent: "#D4FF3A",
  },
  {
    id: "scraping",
    title: "Scraping & ingestion",
    copy:
      "Bringing the world's data to your database. Anti-bot, pagination, JavaScript rendering, deduplication. Delivered clean.",
    icon: DownloadSimpleIcon,
    tint: "#4F0D18",
    accent: "#D4FF3A",
  },
  {
    id: "automations",
    title: "Automations",
    copy:
      "The tasks you shouldn't have to do anymore. Cron jobs, webhook buses, agent loops, Slack integrations. Quiet machines doing the right thing at 3am.",
    icon: CpuIcon,
    tint: "#8C1E2C",
    accent: "#A8C72E",
  },
  {
    id: "brand-design",
    title: "Brand + design systems",
    copy:
      "Identity, type systems, component libraries. We build the language before we build the page.",
    icon: SparkleIcon,
    tint: "#B54656",
    accent: "#D4FF3A",
  },
  {
    id: "deploy",
    title: "Deploy + operate",
    copy:
      "Render, Vercel, Railway, bare metal. We don't just hand you a zip. We hand you a working thing.",
    icon: LightningIcon,
    tint: "#6B1521",
    accent: "#D4FF3A",
  },
];

export default function Services() {
  return (
    <section className="relative py-24 md:py-40 bg-[color:var(--color-ink)] overflow-hidden">
      {/* Ambient under-glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[40vw] h-[40vw] rounded-full bg-maroon-700/25 blur-[150px]" />
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
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        {/* Mobile carousel */}
        <ServicesCarousel />
      </div>
    </section>
  );
}

function ServiceCard({ s, index }) {
  const hover = useCursorHover("hover", "");
  const Icon = s.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      {...hover}
      className="group relative"
    >
      {/* Glass card */}
      <div
        className="relative h-full min-h-[280px] p-6 lg:p-7 rounded-sm border border-maroon-200/15 bg-maroon-950/30
                   backdrop-blur-xl backdrop-saturate-150
                   transition-[transform,border-color,background] duration-500
                   group-hover:-translate-y-1 group-hover:border-signal/60 group-hover:bg-maroon-900/40
                   overflow-hidden"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(245,239,230,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        {/* Per-service mesh glow behind icon */}
        <div
          className="absolute -top-8 -left-8 w-40 h-40 rounded-full blur-[70px] opacity-60 transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: s.tint }}
          aria-hidden
        />
        {/* Chartreuse wire edge on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              `linear-gradient(135deg, transparent 0%, transparent 40%, ${s.accent}22 50%, transparent 60%, transparent 100%)`,
          }}
          aria-hidden
        />

        {/* Index */}
        <p className="relative label-mono text-maroon-300 mb-8">
          0{index + 1} / 08
        </p>

        {/* Icon */}
        <div className="relative mb-6 transition-transform duration-500 group-hover:rotate-[12deg]">
          <Icon size={26} weight="regular" className="text-bone-100" />
        </div>

        {/* Title */}
        <h3 className="relative display-lg text-bone-100 text-[1.45rem] lg:text-[1.65rem] leading-[1] mb-4 tracking-[-0.025em] group-hover:text-signal transition-colors duration-500">
          {s.title}
        </h3>

        {/* Copy */}
        <p className="relative text-sm lg:text-[0.95rem] text-bone-100/75 leading-relaxed">
          {s.copy}
        </p>

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

function ServicesCarousel() {
  const scrollerRef = useRef(null);
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
        <span className="text-signal">
          0{active + 1} <span className="text-bone-100/30">/</span> 08
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
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="relative shrink-0 snap-center w-[86%] min-h-[420px] p-6 rounded-sm border border-maroon-200/20 bg-maroon-950/40 backdrop-blur-xl overflow-hidden"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(245,239,230,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)",
              }}
            >
              {/* Per-service mesh glow */}
              <div
                className="absolute -top-10 -left-10 w-52 h-52 rounded-full blur-[80px] opacity-70"
                style={{ background: s.tint }}
                aria-hidden
              />

              <p className="relative label-mono text-maroon-300 mb-6">
                0{i + 1} / 08
              </p>

              <div className="relative mb-6">
                <Icon size={32} weight="regular" className="text-bone-100" />
              </div>

              <h3 className="relative italic-accent text-4xl leading-[0.95] text-bone-100 mb-5 tracking-[-0.01em]">
                {s.title}
              </h3>

              <p className="relative text-[0.98rem] text-bone-100/80 leading-relaxed">
                {s.copy}
              </p>

              <span
                className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full"
                style={{ background: s.accent, boxShadow: `0 0 18px ${s.accent}88` }}
                aria-hidden
              />
            </div>
          );
        })}
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
