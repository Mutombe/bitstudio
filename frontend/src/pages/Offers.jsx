import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleNotchIcon,
  BuildingsIcon,
  TruckIcon,
  CarIcon,
  HardHatIcon,
  TableIcon,
  GraphIcon,
  UsersThreeIcon,
  RobotIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import MeshField from "../components/MeshField.jsx";
import Ticker from "../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd, organizationJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import { OFFERS } from "../data/offers.js";
import { ALL_KEYWORDS, SERVICE_CITIES } from "../data/seo-keywords.js";

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

// Cheapest tier price for the "from" label on each card.
function fromPrice(offer) {
  const t = offer.tiers?.[0];
  return t?.price ? `From ${t.price}` : "Custom quote";
}

export default function Offers() {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Open");

  return (
    <PageTransition>
      <SEO
        title="Offers · Software that automates your business"
        description="Productised software solutions for Zimbabwe businesses. ERP, CRM, AI automation, real estate, logistics, construction, and dealership systems. We replace Excel and automate operations. Fixed-price offers from $3,500."
        path="/offers"
        keywords={ALL_KEYWORDS}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Offers", path: "/offers" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Bit Studio Offers",
            itemListElement: OFFERS.map((o, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: o.name,
              url: `https://bitstudio.co.zw/offers/${o.slug}`,
            })),
          },
        ]}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden radial-bleed">
        <MeshField tint="maroon" intensity="med" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-10">
            <span className="flex items-center gap-2">
              <CircleNotchIcon size={12} className="animate-spin text-signal" />
              Chapter 08 · Offers
            </span>
            <span className="text-bone-100/30">/</span>
            <span>The company that automates businesses</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-bone-100 leading-[0.84] tracking-[-0.04em] max-w-5xl"
            style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 9vw, 9rem)" }}
          >
            We don't sell software.<br />
            <span className="italic-accent text-signal font-light">
              We end the problem.
            </span>
          </motion.h1>

          <p className="mt-10 max-w-2xl text-base md:text-lg text-bone-100/85 leading-relaxed">
            We reduce operational costs, eliminate manual processes, and help
            businesses scale without hiring more staff. Custom software, ERP and
            CRM systems, AI automation, and the systems that replace your
            spreadsheets — each one a fixed-price offer, named for the problem
            it solves.
          </p>

          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/55">
            <MapPinIcon size={13} className="text-signal" />
            <span>
              Serving {SERVICE_CITIES.slice(0, -1).join(", ")} &{" "}
              {SERVICE_CITIES.at(-1)} · all of Zimbabwe
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/contact" {...viewHover} className="btn btn-primary">
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
              WhatsApp us
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE OFFER GRID ───────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="mb-10 md:mb-14 max-w-3xl">
            <SectionLabel chapter="§ Offers" title="Pick the problem that's yours" />
            <h2 className="mt-6 display-xl text-bone-100">
              Eight ways to{" "}
              <span className="italic-accent text-signal font-light">
                automate the business.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {OFFERS.map((o, i) => {
              const Icon = ICON_MAP[o.icon] || GraphIcon;
              return (
                <motion.div
                  key={o.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(i * 0.05, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={`/offers/${o.slug}`}
                    {...hover}
                    className="group relative flex h-full flex-col p-6 md:p-7 rounded-sm border border-white/10 hover:border-signal/60 bg-maroon-950/30 transition-colors overflow-hidden"
                  >
                    <div
                      className="absolute -top-8 -left-8 w-40 h-40 rounded-full blur-[70px] opacity-50 group-hover:opacity-80 transition-opacity"
                      style={{ background: o.tint }}
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-between mb-6">
                      <Icon size={26} weight="regular" className="text-bone-100 transition-transform duration-500 group-hover:rotate-[10deg]" />
                      <span
                        className="font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-1 rounded-full border border-white/10"
                        style={{ color: o.accent }}
                      >
                        {o.industry}
                      </span>
                    </div>
                    <h3 className="relative font-display text-xl md:text-2xl text-bone-100 leading-[1.05] mb-3 group-hover:text-signal transition-colors">
                      {o.name}
                    </h3>
                    <p className="relative text-sm text-bone-100/70 leading-[1.55] mb-6 line-clamp-3">
                      {o.promise}
                    </p>
                    <div className="relative mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-100/80">
                        {fromPrice(o)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/60 group-hover:text-signal transition-colors">
                        See offer
                        <ArrowRightIcon size={12} weight="bold" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── THE PITCH ────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-maroon-950 text-bone-100 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel chapter="§ Why" title="The real question" />
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl space-y-6">
            <p className="font-display text-2xl md:text-4xl text-bone-100 leading-[1.15]">
              "How many people spend their day updating spreadsheets?"
            </p>
            <p className="text-base md:text-lg text-bone-100/80 leading-relaxed">
              That's the only question that matters. Then: what if we could
              automate 70% of that work? How much does that employee cost per
              year? If the system saves you one salary annually,{" "}
              <span className="italic-accent text-signal">it pays for itself.</span>
            </p>
            <p className="text-base md:text-lg text-bone-100/80 leading-relaxed">
              Now we're talking about money. Not code. That's the whole point of
              an offer: a problem named, an outcome promised, and a price that
              makes the maths obvious.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ Next" title="Start the conversation" />
          <h2
            className="mt-10 font-display text-bone-100 leading-[0.85]"
            style={{ fontSize: "clamp(2.75rem, 11vw, 13rem)", fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            Tell us the<br />
            <span className="italic-accent text-signal font-light">bottleneck.</span>
          </h2>
          <p className="mt-10 max-w-2xl text-bone-100/75 text-lg leading-relaxed">
            One sentence about the work that's eating your team's week. We reply
            the same working day with a clear path and a price.
          </p>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn btn-primary">
              Get a quote
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
          "We automate businesses",
          "Replace Excel · Reduce admin cost · Scale without hiring",
          "ERP · CRM · AI automation · Custom software",
          "Harare · Bulawayo · Mutare · Gweru · Masvingo",
        ]}
      />
    </PageTransition>
  );
}
