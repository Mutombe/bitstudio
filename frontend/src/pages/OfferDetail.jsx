import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  TrendUpIcon,
  CircleNotchIcon,
  BuildingsIcon,
  TruckIcon,
  CarIcon,
  HardHatIcon,
  TableIcon,
  GraphIcon,
  UsersThreeIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import MeshField from "../components/MeshField.jsx";
import WaveBreak from "../components/WaveBreak.jsx";
import SEO, { breadcrumbJsonLd, offerJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { findOffer, adjacentOffers, OFFERS } from "../data/offers.js";

const ICON_MAP = {
  Buildings: BuildingsIcon,
  Truck: TruckIcon,
  Car: CarIcon,
  HardHat: HardHatIcon,
  Table: TableIcon,
  Graph: GraphIcon,
  UsersThree: UsersThreeIcon,
  Robot: RobotIcon,
};

export default function OfferDetail() {
  const { slug } = useParams();
  const offer = findOffer(slug);
  const hover = useCursorHover("hover", "");
  const ctaHover = useCursorHover("view", "Enquire");

  if (!offer) return <Navigate to="/offers" replace />;

  const { prev, next } = adjacentOffers(slug);
  const Icon = ICON_MAP[offer.icon] || GraphIcon;
  const multiTier = offer.tiers.length > 1;

  return (
    <PageTransition>
      <SEO
        title={offer.seoTitle || offer.name}
        description={offer.seoDescription || offer.promise}
        path={`/offers/${offer.slug}`}
        keywords={offer.keywords}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Offers", path: "/offers" },
            { name: offer.name, path: `/offers/${offer.slug}` },
          ]),
          offerJsonLd({
            name: offer.name,
            description: offer.seoDescription || offer.promise,
            slug: offer.slug,
            tiers: offer.tiers,
          }),
        ]}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden radial-bleed">
        <MeshField tint="maroon" intensity="med" />
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 flex-wrap mb-10">
            <Link to="/" {...hover} className="hover-line">Index</Link>
            <span className="text-bone-100/30">/</span>
            <Link to="/offers" {...hover} className="hover-line">Offers</Link>
            <span className="text-bone-100/30">/</span>
            <span className="text-signal truncate max-w-[60vw]">{offer.name}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-signal/40 flex items-center justify-center">
              <Icon size={20} weight="regular" className="text-signal" />
            </div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
              <span className="text-signal">{offer.number}</span> · {offer.industry}
            </p>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-bone-100 leading-[0.88] tracking-[-0.04em] max-w-4xl"
            style={{ fontWeight: 700, fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          >
            {offer.headline}
          </motion.h1>

          <p className="mt-8 max-w-2xl text-base md:text-xl text-bone-100/85 leading-relaxed italic-accent text-bone-300">
            {offer.promise}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={`/contact?offer=${offer.slug}`} {...ctaHover} className="btn btn-primary">
              Get a quote
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
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ──────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel chapter="§ Problem" title="What's hurting" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="text-lg md:text-2xl text-bone-100 leading-snug max-w-2xl mb-8">
              {offer.problem.lead}
            </p>
            <ul className="space-y-4 max-w-2xl">
              {offer.problem.pains.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-3 text-bone-100/75 leading-relaxed"
                >
                  <WarningCircleIcon size={20} weight="duotone" className="shrink-0 mt-0.5 text-maroon-400" />
                  <span className="text-base md:text-lg">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── OUTCOME ──────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-maroon-950/40 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel chapter="§ Outcome" title="What you gain" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ul className="grid sm:grid-cols-2 gap-4">
              {offer.outcome.map((o, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-sm border border-white/10 bg-white/[0.02]"
                >
                  <CheckCircleIcon size={20} weight="duotone" className="shrink-0 mt-0.5" style={{ color: offer.accent }} />
                  <span className="text-base text-bone-100/90 leading-snug">{o}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── MECHANISM ────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel chapter="§ Mechanism" title="What solves it" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="text-lg md:text-2xl text-bone-100 leading-snug max-w-2xl mb-8">
              {offer.mechanism.lead}
            </p>
            <ul className="space-y-4 max-w-2xl">
              {offer.mechanism.points.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-bone-100/80 leading-relaxed">
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: offer.accent }} />
                  <span className="text-base md:text-lg">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── INVESTMENT (TIERS) ───────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-maroon-950 text-bone-100 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <SectionLabel chapter="§ Investment" title="What it costs" />
            <h2 className="mt-6 font-display text-bone-100 leading-[1.0]" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>
              {multiTier ? (
                <>Three ways in.<br /><span className="italic-accent text-bone-300 font-light">Start where it hurts.</span></>
              ) : (
                <>One scope.<br /><span className="italic-accent text-bone-300 font-light">One price.</span></>
              )}
            </h2>
          </div>

          <div className={`grid gap-5 md:gap-6 ${multiTier ? "md:grid-cols-3" : "md:grid-cols-1 max-w-2xl"}`}>
            {offer.tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col p-6 md:p-7 rounded-sm border border-white/10 bg-white/[0.02]"
                style={{ borderTopWidth: 3, borderTopColor: offer.accent }}
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: offer.accent }}>
                  {t.badge}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-bone-100 leading-[1.1] mb-4">
                  {t.name}
                </h3>
                <p className="font-display text-3xl md:text-4xl text-bone-100 tabular-nums mb-1">
                  {t.price}
                </p>
                {t.suitableFor && (
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50 mb-5">
                    {t.suitableFor}
                  </p>
                )}

                {t.carryover && (
                  <p className="text-sm italic-accent text-bone-300 mb-3 mt-2">{t.carryover}</p>
                )}
                <ul className="space-y-2.5 mb-6">
                  {t.includes.map((it, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-bone-100/85 leading-snug">
                      <CheckCircleIcon size={16} weight="duotone" className="shrink-0 mt-0.5" style={{ color: offer.accent }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-3">Business value</p>
                  <ul className="space-y-2">
                    {t.value.map((v, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-bone-100/75 leading-snug">
                        <span className="text-signal">✓</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?offer=${offer.slug}&tier=${encodeURIComponent(t.name)}`}
                    {...hover}
                    className="mt-5 w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 border border-signal/40 hover:border-signal hover:bg-signal/5 transition-all font-mono text-[11px] tracking-[0.18em] uppercase"
                    style={{ color: offer.accent }}
                  >
                    Enquire
                    <ArrowUpRightIcon size={13} weight="bold" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROI ──────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28 flex items-center gap-3">
              <TrendUpIcon size={22} weight="duotone" className="text-signal" />
              <SectionLabel chapter="§ ROI" title="When it pays back" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="text-lg md:text-2xl text-bone-100 leading-snug max-w-2xl mb-8">
              {offer.roi.lead}
            </p>
            <ul className="space-y-4 max-w-2xl">
              {offer.roi.points.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-bone-100/80 leading-relaxed">
                  <CheckCircleIcon size={20} weight="duotone" className="shrink-0 mt-0.5 text-signal" />
                  <span className="text-base md:text-lg">{r}</span>
                </li>
              ))}
            </ul>

            {offer.salesAngle && (
              <p className="mt-12 font-display text-2xl md:text-3xl text-bone-100 leading-[1.2] max-w-3xl border-l-2 border-signal/50 pl-6">
                "{offer.salesAngle}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-t border-white/5 bg-[color:var(--color-ink)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            {OFFERS.map((o) => (
              <Link
                key={o.slug}
                to={`/offers/${o.slug}`}
                {...hover}
                className={`w-6 h-1 shrink-0 rounded-full transition-colors ${o.slug === offer.slug ? "bg-signal" : "bg-bone-100/15 hover:bg-bone-100/40"}`}
                aria-label={o.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {prev && (
              <Link to={`/offers/${prev.slug}`} {...hover} className="group block p-5 md:p-7 rounded-sm border border-white/10 hover:border-signal/50 bg-maroon-950/20 transition-colors">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 flex items-center gap-2 mb-3">
                  <ArrowLeftIcon size={12} weight="bold" /> Previous
                </p>
                <h3 className="font-display text-xl md:text-2xl text-bone-100 group-hover:text-signal transition-colors leading-tight">{prev.name}</h3>
              </Link>
            )}
            {next && (
              <Link to={`/offers/${next.slug}`} {...hover} className="group block p-5 md:p-7 rounded-sm border border-white/10 hover:border-signal/50 bg-maroon-950/20 transition-colors md:text-right">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 flex items-center md:justify-end gap-2 mb-3">
                  Next <ArrowRightIcon size={12} weight="bold" />
                </p>
                <h3 className="font-display text-xl md:text-2xl text-bone-100 group-hover:text-signal transition-colors leading-tight">{next.name}</h3>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <div className="seam-dissolve">
        <WaveBreak />
      </div>
      <section className="relative py-20 md:py-40 seam-contact overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 text-center">
          <SectionLabel chapter="§ Next" title="Stop doing it by hand" />
          <h2
            className="mt-8 font-display font-bold text-bone-100 leading-[0.86] tracking-[-0.04em] mx-auto"
            style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
          >
            Automate<br />
            <span className="italic-accent text-signal font-light">{offer.industry.toLowerCase()}.</span>
          </h2>
          <p className="mt-8 text-lg text-bone-100/70 max-w-xl mx-auto">
            Tell us where the time goes. We'll reply the same working day with a
            clear path and a price.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={`/contact?offer=${offer.slug}`} {...ctaHover} className="btn btn-primary">
              Get a quote
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/offers" {...hover} className="btn btn-ghost">
              All offers
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/40">
            <CircleNotchIcon size={12} className="animate-spin text-signal" />
            Harare · Bulawayo · Mutare · Gweru · Masvingo
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
