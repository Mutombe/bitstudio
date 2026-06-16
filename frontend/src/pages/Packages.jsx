import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarBlankIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import MeshField from "../components/MeshField.jsx";
import Ticker from "../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { PACKAGES, PACKAGE_TIERS, PROCESS_PHASES } from "../data/packages.js";

/**
 * /packages. The international English face of three productised
 * engagements. Same fixed-scope / fixed-price / three-slots model as
 * /pakete; same offer architecture for any buyer on any continent.
 */

const DAYS = (n) => `${n} days`;

export default function Packages() {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Enquire");

  return (
    <PageTransition>
      <SEO
        title="Packages · Three slots per quarter"
        description="Three productised engagements offered globally. The Workshop, the House, the Chambers. Fixed scope, fixed price, three slots per quarter. Whoever fits, fits."
        path="/packages"
        keywords={[
          "design studio packages",
          "boutique website rebuild",
          "law firm website",
          "hotel website design",
          "atelier website",
          "fixed-price web design",
          "Bit Studio",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Packages", path: "/packages" },
          ]),
        ]}
      />

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden radial-bleed">
        <MeshField tint="maroon" intensity="med" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-10">
            <span className="flex items-center gap-2">
              <CircleNotchIcon size={12} className="animate-spin text-signal" />
              Chapter 07 · Engagements
            </span>
            <span className="text-bone-100/30">/</span>
            <span>Three slots per quarter</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-bone-100 leading-[0.84] tracking-[-0.04em] max-w-5xl"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 9vw, 9rem)",
            }}
          >
            Nine engagements.<br />
            <span className="italic-accent text-signal font-light">Three slots a quarter.</span>
          </motion.h1>

          <p className="mt-10 max-w-2xl text-base md:text-lg text-bone-100/85 leading-relaxed">
            Most studios sell time. We sell sharply defined pieces, in
            four tiers, on any continent. Fixed scope, fixed price,
            fixed delivery date. Whoever fits knows before the first
            call. Whoever does not fit is spared the choreography.
          </p>

          {/* Tier-grouped quickjump. Each tier holds the packages that
              share its delivery cadence. The buyer reads the column
              that matches the size of their next move. */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl">
            {PACKAGE_TIERS.map((tier) => {
              const tierPkgs = PACKAGES.filter((p) => p.tier === tier.id);
              return (
                <div key={tier.id} className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-white/10">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
                      {tier.label_en}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/40">
                      {tier.days}
                    </p>
                  </div>
                  {tierPkgs.map((p) => (
                    <a
                      key={p.slug}
                      href={`#${p.slug}`}
                      {...hover}
                      className="group block border border-white/10 hover:border-signal/60 transition-colors p-3.5 md:p-4 rounded-sm bg-white/[0.02]"
                    >
                      <p
                        className="font-mono text-[9px] tracking-[0.22em] uppercase mb-1.5"
                        style={{ color: p.accent }}
                      >
                        {p.aesthetic}
                      </p>
                      <p className="font-display text-[15px] md:text-base text-bone-100 leading-[1.15] mb-2.5">
                        {p.name_en}
                      </p>
                      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
                        <span className="text-bone-100/70">{p.price_en}</span>
                        <span className="text-bone-100/45">{DAYS(p.timeline_days)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link to="/contact" {...viewHover} className="btn btn-primary">
              Reserve a slot
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/craft" {...hover} className="btn btn-ghost">
              The way behind it
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW WE CHOOSE ─────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel chapter="§ Selection" title="How we choose" />
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl space-y-6 text-bone-100/80 leading-relaxed">
            <p className="text-base md:text-lg">
              Slots are not assigned in order of arrival. We choose the
              projects in which our care will have the largest effect.
              Houses that take their own story seriously, on any
              continent, and for which an honest renewal makes the
              biggest difference.
            </p>
            <p className="text-base md:text-lg italic-accent text-bone-100">
              A 50% deposit opens the slot. The remaining 50% is due on
              acceptance.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THREE PACKAGES ─────────────────────────────────────────── */}
      {PACKAGES.map((p, i) => (
        <PackageSection key={p.slug} pkg={p} index={i} hover={hover} />
      ))}

      {/* ─── PROCESS ───────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-maroon-950 text-bone-100 border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-14 md:mb-20 max-w-3xl">
            <SectionLabel chapter="§ Process" title="Four phases" />
            <h2 className="mt-6 font-display text-bone-100 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>
              From brief to launch.<br />
              <span className="italic-accent text-bone-300 font-light">four phases, transparently kept.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PROCESS_PHASES.map((phase, i) => (
              <motion.div
                key={phase.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(i * 0.05, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-6 border-l-2 border-signal/40"
              >
                <span className="absolute -left-[6px] top-0 w-2.5 h-2.5 rounded-full bg-signal" />
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal mb-2">
                  Phase {phase.n} · {phase.days_en}
                </p>
                <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.1] mb-3">
                  {phase.name_en}
                </p>
                <p className="text-sm md:text-[15px] text-bone-100/75 leading-[1.6]">
                  {phase.body_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 md:pt-3">
            <SectionLabel chapter="§ Frequent" title="Before the first call" />
          </div>
          <div className="col-span-12 md:col-span-9 space-y-10 max-w-3xl">
            <Objection
              q="Why fixed price and not hours?"
              a="Because we know how long a well-defined piece of work takes. Hourly rates are insurance against poor planning. We plan well."
            />
            <Objection
              q="What happens if scope grows during the project?"
              a="Additions are agreed as small change orders with their own fixed price. Never quietly. Never as a 'small extra' on an invoice."
            />
            <Objection
              q="Do you build on WordPress, Webflow, or Wix?"
              a="No. We build custom, on a foundation chosen so the work stays fast, legible, and durable for years. You own it outright, and it ages the way it should. If you intend to keep an existing template site, we are not the right studio."
            />
            <Objection
              q="Who hosts the finished site?"
              a="Render. Six months are included in the price. After that, approximately €50 / month, or you take over the Render account and we hand off the keys. EU, US, or Asia-Pacific regions on request."
            />
            <Objection
              q="Can we pay in stages?"
              a="Standard is 50 / 50. Deposit at start, balance on acceptance. On request, we split the balance into two tranches (25 / 25) at mid-point and at acceptance. Just say so in the first email."
            />
            <Objection
              q="Currency and invoicing across borders?"
              a="EUR is the default. USD, GBP, AUD, or CHF on request. Reverse-charge for business customers in compatible VAT regimes. Wire transfer or SEPA. Bank rails are uninteresting; the work is the work."
            />
            <Objection
              q="What about the time zone?"
              a="We keep a working window wide enough to overlap with anywhere from Tokyo to Toronto. Async by default; synchronous on demand. The date in the contract is the date the work appears, regardless of where you read this from."
            />
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ───────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ Reservation" title="Reserve a slot" />
          <h2 className="mt-10 font-display text-bone-100 leading-[0.85]" style={{ fontSize: "clamp(2.75rem, 11vw, 13rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>
            Three slots.<br />
            <span className="italic-accent text-signal font-light">One quarter.</span>
          </h2>

          <p className="mt-10 max-w-2xl text-bone-100/75 text-lg leading-relaxed">
            Write us one sentence about your house and the package you're
            interested in. We reply the same working day with two or three
            precise questions, and propose a 20-minute call if the mutual
            interest is real.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn btn-primary">
              Reserve a slot
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <a
              href="https://wa.me/263785948128"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <Ticker
        items={[
          "Three slots per quarter",
          "Fixed price · Fixed delivery",
          "Harare → the open internet",
          "MMXXX · Three slots a quarter",
        ]}
      />
    </PageTransition>
  );
}

// ─── PACKAGE SECTION ───────────────────────────────────────────────────
function PackageSection({ pkg, index, hover }) {
  const isReversed = index % 2 === 1;
  const slotsLabel =
    pkg.slots_remaining === 0
      ? "Booked for the quarter"
      : `${pkg.slots_remaining} of ${pkg.slots_per_quarter} slots open`;
  const slotsTone = pkg.slots_remaining === 0 ? "text-maroon-400" : "text-signal";

  return (
    <section
      id={pkg.slug}
      className="relative py-24 md:py-32 bg-[color:var(--color-ink)] border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        {/* Header strip */}
        <div className={`grid grid-cols-12 gap-6 md:gap-10 items-end mb-12 md:mb-16 ${isReversed ? "md:[direction:rtl]" : ""}`}>
          <div className="col-span-12 md:col-span-8 md:[direction:ltr]">
            <p
              className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase mb-4"
              style={{ color: pkg.accent }}
            >
              {String(index + 1).padStart(2, "0")} · {pkg.eyebrow_en}
            </p>
            <h2
              className="font-display text-bone-100 leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.25rem, 7vw, 6.5rem)", fontWeight: 700 }}
            >
              {pkg.name_en}
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-bone-100/85 leading-relaxed italic-accent">
              {pkg.promise_en}
            </p>
          </div>

          {/* Facts at a glance */}
          <div className="col-span-12 md:col-span-4 md:[direction:ltr]">
            <div
              className="relative p-5 md:p-6 rounded-sm border border-white/10 bg-white/[0.02]"
              style={{ borderLeftWidth: 3, borderLeftColor: pkg.accent }}
            >
              <dl className="space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                    Fee
                  </dt>
                  <dd className="font-display text-xl md:text-2xl text-bone-100 tabular-nums">
                    {pkg.price_en}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 flex items-center gap-1.5">
                    <ClockIcon size={11} weight="bold" />
                    Timeline
                  </dt>
                  <dd className="text-bone-100/90 font-mono">{DAYS(pkg.timeline_days)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 flex items-center gap-1.5">
                    <CalendarBlankIcon size={11} weight="bold" />
                    Availability
                  </dt>
                  <dd className={`font-mono text-xs ${slotsTone}`}>{slotsLabel}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                    Aesthetic
                  </dt>
                  <dd className="text-bone-100/90 font-mono text-xs">{pkg.aesthetic}</dd>
                </div>
              </dl>
              <Link
                to={`/contact?package=${pkg.slug}`}
                {...hover}
                className="mt-5 w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 border border-signal/40 hover:border-signal hover:bg-signal/5 transition-all font-mono text-[11px] tracking-[0.18em] uppercase"
                style={{ color: pkg.accent }}
              >
                Enquire about this slot
                <ArrowUpRightIcon size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* Body: Who it's for + What's in + Out of scope */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-12 mb-8 md:mb-12">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-4">
              Who it's for
            </p>
            <p className="text-base md:text-lg text-bone-100/85 leading-relaxed max-w-4xl">
              {pkg.for_en}
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-5">
              Included in the package
            </p>
            <ul className="space-y-3">
              {pkg.includes_en.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-bone-100/85 leading-relaxed">
                  <CheckCircleIcon
                    size={18}
                    weight="duotone"
                    className="shrink-0 mt-0.5"
                    style={{ color: pkg.accent }}
                  />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-5">
              Out of scope
            </p>
            <ul className="space-y-3">
              {pkg.out_en.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-bone-100/65 leading-relaxed">
                  <XCircleIcon
                    size={18}
                    weight="duotone"
                    className="shrink-0 mt-0.5 text-bone-100/40"
                  />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Objection({ q, a }) {
  return (
    <div className="border-t border-white/10 pt-8">
      <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.2] mb-4">{q}</p>
      <p className="text-base md:text-lg text-bone-100/75 leading-relaxed">{a}</p>
    </div>
  );
}
