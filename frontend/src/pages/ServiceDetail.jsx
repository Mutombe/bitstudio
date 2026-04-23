import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GlobeIcon,
  StackIcon,
  GraphIcon,
  CpuIcon,
  RobotIcon,
  DownloadSimpleIcon,
  SparkleIcon,
  LightningIcon,
  CodeIcon,
  DatabaseIcon,
  CloudIcon,
  PaletteIcon,
  TerminalIcon,
  PackageIcon,
  GitBranchIcon,
  BrainIcon,
  RocketLaunchIcon,
  WrenchIcon,
  GearIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import WaveBreak from "../components/WaveBreak.jsx";
import ServiceHero from "../components/service-heroes/index.jsx";
import { findService, adjacentServices, SERVICES } from "../data/services.js";
import { findProject } from "../data/projects.js";
import { useCursorHover } from "../hooks/useCursor.jsx";

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

// Stack badge → icon hint
const STACK_ICON = {
  React: CodeIcon,
  "Vite": LightningIcon,
  "Tailwind v4": PaletteIcon,
  "Framer Motion": SparkleIcon,
  Render: CloudIcon,
  Django: CodeIcon,
  FastAPI: LightningIcon,
  PostgreSQL: DatabaseIcon,
  Postgres: DatabaseIcon,
  Redis: DatabaseIcon,
  Celery: GearIcon,
  S3: CloudIcon,
  Claude: BrainIcon,
  GPT: BrainIcon,
  LangChain: GitBranchIcon,
  Python: TerminalIcon,
  Node: TerminalIcon,
  Playwright: CodeIcon,
  Scrapy: DownloadSimpleIcon,
  SerpAPI: DownloadSimpleIcon,
  Figma: PaletteIcon,
  "Tokens Studio": PaletteIcon,
  Storybook: PackageIcon,
  Vercel: CloudIcon,
  "GitHub Actions": GitBranchIcon,
  Cloudflare: CloudIcon,
  Grafana: GraphIcon,
  Sentry: WrenchIcon,
  "Render Cron": GearIcon,
  WATI: RocketLaunchIcon,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = findService(slug);
  const hover = useCursorHover("hover", "");
  const ctaHover = useCursorHover("hover", "Commission");

  if (!service) return <Navigate to="/" replace />;

  const { prev, next } = adjacentServices(slug);
  const Icon = ICON_MAP[service.icon] || GlobeIcon;

  const related = useMemo(
    () => (service.relatedProjects || []).map(findProject).filter(Boolean),
    [service]
  );

  return (
    <PageTransition>
      {/* ─── Hero ─── */}
      <section className="relative pt-20 md:pt-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          {/* Breadcrumb — lives OUTSIDE the hero frame so it never collides
              with the SVG animation's internal labels on mobile */}
          <div className="mb-4 md:mb-5">
            <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 flex-wrap">
              <Link to="/" {...hover} className="hover-line">Index</Link>
              <span className="text-bone-100/30">/</span>
              <Link to="/#services" {...hover} className="hover-line">Services</Link>
              <span className="text-bone-100/30">/</span>
              <span className="text-signal truncate max-w-[60vw]">{service.title}</span>
            </div>
          </div>

          {/* Hero frame — the generative animation lives INSIDE this frame with
              explicit top/bottom padding so its content never touches the edges
              (or gets occluded by the bottom seam). */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/9] md:min-h-[480px] overflow-hidden rounded-sm">
            {/* Inner padded stage — gives the SVG artifact breathing room on
                top + bottom. The animation component fills this inner box. */}
            <div className="absolute inset-0 pt-8 pb-10 md:pt-10 md:pb-14 lg:pt-14 lg:pb-16">
              <div className="relative w-full h-full">
                <ServiceHero type={service.heroType} />
              </div>
            </div>

            {/* Hero bottom seam — slimmer on mobile so it doesn't eat the animation */}
            <div
              className="absolute left-0 right-0 bottom-0 h-8 md:h-20 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent, var(--color-ink))" }}
            />
          </div>
        </div>
      </section>

      {/* ─── Title + tagline ─── */}
      <section className="relative pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="flex-1 min-w-0">
              {/* Icon + number label — tighter stack on mobile so it doesn't
                  crash against the headline below. */}
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-full border border-signal/40 flex items-center justify-center">
                  <Icon size={18} weight="regular" className="text-signal md:hidden" />
                  <Icon size={20} weight="regular" className="text-signal hidden md:block" />
                </div>
                <p className="label-mono text-bone-100/50 tabular-nums">
                  <span className="text-signal">{service.number}</span>
                  <span className="text-bone-100/30"> / 08 ·</span> Service
                </p>
              </div>
              <h1
                className="text-bone-100 font-display font-bold leading-[0.9] md:leading-[0.85] max-w-[18ch]"
                style={{
                  fontSize: "clamp(2rem, 8vw, 5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                {service.title}
                <span className="italic-accent text-signal font-light">.</span>
              </h1>
              <p className="mt-5 md:mt-8 italic-accent text-lg sm:text-xl md:text-3xl text-bone-300 max-w-3xl leading-snug">
                {service.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Manifesto body ─── */}
      <section className="py-14 md:py-24 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel chapter="§ Manifesto" title="What we actually do" />
              <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 max-w-xs">
                The part nobody reads. The part that matters.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 space-y-6 md:space-y-8">
            {service.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`text-bone-100/85 text-base md:text-lg leading-[1.7] max-w-prose ${
                  i === 0 ? "first-para" : ""
                }`}
              >
                {i === 0 ? (
                  <>
                    <span className="float-left font-display text-[4rem] md:text-[6rem] leading-[0.82] text-signal mr-3 md:mr-4 mt-1.5 tracking-tight">
                      {para.charAt(0)}
                    </span>
                    {highlight(para.slice(1), service.accent)}
                  </>
                ) : (
                  highlight(para, service.accent)
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stack ─── */}
      <section className="py-14 md:py-20 border-t border-white/5 bg-maroon-950/30">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel chapter="§ Stack" title="How we build it" />
            <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 max-w-xs">
              Tools chosen, not inherited.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {service.stack.map((t, i) => {
                const TIcon = STACK_ICON[t] || CodeIcon;
                return (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="inline-flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-signal/30 hover:border-signal transition-colors bg-black/30 text-bone-100/90 font-mono text-[10px] md:text-[11px] tracking-[0.16em] md:tracking-[0.18em] uppercase whitespace-nowrap"
                  >
                    <TIcon size={12} weight="regular" className="text-signal" />
                    {t}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Representative projects ─── */}
      {related.length > 0 && (
        <section className="py-16 md:py-28 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
              <div>
                <SectionLabel chapter="§ Evidence" title="Things we have actually shipped" />
                <h2 className="mt-5 display-xl text-bone-100 max-w-4xl">
                  Not a case study. <br />
                  <span className="italic-accent text-bone-300">A receipt.</span>
                </h2>
              </div>
              <Link to="/work" {...hover} className="btn btn-ghost">
                All artifacts <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={`/work/${p.slug}`}
                    {...hover}
                    className="block group"
                  >
                    <div
                      className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 transition-transform duration-500 group-hover:-translate-y-1"
                      style={{
                        background: `
                          radial-gradient(circle at 20% 20%, ${hex(p.palette[0], 0.9)}, transparent 60%),
                          radial-gradient(circle at 80% 80%, ${hex(p.palette[1] || p.palette[0], 0.7)}, transparent 55%),
                          ${p.palette[2] || "#0a0708"}
                        `,
                      }}
                    >
                      <div className="absolute top-4 left-4 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] uppercase rounded-full bg-bone-100/90 text-ink">
                        {p.tag}
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowUpRightIcon size={18} weight="bold" className="text-signal" />
                      </div>
                      <div className="absolute inset-0 flex items-end p-5">
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: hex("#F5EFE6", 0.7) }}>
                            {p.year}
                          </p>
                          <h3 className="display-lg text-[1.5rem] leading-[0.95] max-w-[14ch]" style={{ color: p.palette[2] || "#F5EFE6" }}>
                            {p.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between">
                      <div className="swatch-strip w-14">
                        {p.palette.map((c) => (<span key={c} style={{ background: c }} />))}
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase hover-line text-bone-100/60">
                        Read →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Prev/next service navigation ─── */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 tabular-nums">
              <span className="text-signal">{service.number}</span>
              <span className="text-bone-100/30"> / 08</span>
            </p>
            <div className="overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 w-max">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    {...hover}
                    className={`w-6 h-1 shrink-0 rounded-full transition-colors ${
                      s.slug === service.slug ? "bg-signal" : "bg-bone-100/15 hover:bg-bone-100/40"
                    }`}
                    aria-label={s.title}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {prev && (
              <Link
                to={`/services/${prev.slug}`}
                {...hover}
                className="group relative block w-full p-5 md:p-8 rounded-sm border border-white/10 hover:border-signal/50 bg-maroon-950/20 transition-colors"
              >
                <p className="label-mono text-bone-100/40 flex items-center gap-2 mb-3 md:mb-4">
                  <ArrowLeftIcon size={12} weight="bold" />
                  Previous · <span className="text-signal tabular-nums">{prev.number}</span>
                </p>
                <h3 className="font-display font-bold text-[1.5rem] md:text-[2.2rem] leading-[0.95] text-bone-100 group-hover:text-signal transition-colors tracking-tight">
                  {prev.title}
                </h3>
                <p className="mt-3 text-bone-100/60 text-sm max-w-md">
                  {prev.tagline}
                </p>
              </Link>
            )}
            {next && (
              <Link
                to={`/services/${next.slug}`}
                {...hover}
                className="group relative block w-full p-5 md:p-8 rounded-sm border border-white/10 hover:border-signal/50 bg-maroon-950/20 transition-colors md:text-right"
              >
                <p className="label-mono text-bone-100/40 flex items-center md:justify-end gap-2 mb-3 md:mb-4">
                  Next · <span className="text-signal tabular-nums">{next.number}</span>
                  <ArrowRightIcon size={12} weight="bold" />
                </p>
                <h3 className="font-display font-bold text-[1.5rem] md:text-[2.2rem] leading-[0.95] text-bone-100 group-hover:text-signal transition-colors tracking-tight">
                  {next.title}
                </h3>
                <p className="mt-3 text-bone-100/60 text-sm max-w-md md:ml-auto">
                  {next.tagline}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>
      <section className="relative py-20 md:py-40 seam-contact overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 text-center">
          <SectionLabel chapter="§ Next" title="If any of this resonates" />
          <h2 className="mt-8 display-massive text-bone-100 leading-[0.82] max-w-[14ch] mx-auto">
            Commission<br />
            <span className="italic-accent text-signal font-light">something.</span>
          </h2>
          <p className="mt-8 text-lg text-bone-100/70 max-w-xl mx-auto">
            We answer real questions in a real window of time. Hello always beats a form.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" {...ctaHover} className="btn btn-primary">
              Open a transmission
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/#services" {...hover} className="btn btn-ghost">
              All eight services
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

/* ─── helpers ─── */

function highlight(text, accent = "#D4FF3A") {
  // Wrap a few key terms (not links — just chartreuse emphasis) — we pick
  // short, evocative ones. Keep it sparse to preserve reading rhythm.
  const TERMS = [
    "one true thing", "one clear purpose", "working thing", "the job",
    "live", "a receipt", "four in the afternoon", "posture",
    "cathedrals", "idempotency", "runbook", "provenance",
    "spreadsheet", "row count", "ingestion", "memory",
    "judgment", "discipline", "coverage", "deduplicate",
  ];
  let out = [text];
  TERMS.forEach((term) => {
    out = out.flatMap((chunk) => {
      if (typeof chunk !== "string") return [chunk];
      const re = new RegExp(`(${escapeRegex(term)})`, "i");
      const parts = chunk.split(re);
      return parts.map((p, i) =>
        re.test(p) && i > 0 ? (
          <span
            key={`${term}-${i}`}
            style={{ color: accent, fontStyle: "italic" }}
            className="italic-accent font-normal"
          >
            {p}
          </span>
        ) : (
          p
        )
      );
    });
  });
  return out;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hex(h, a = 1) {
  if (!h) return `rgba(255,255,255,${a})`;
  const m = h.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
