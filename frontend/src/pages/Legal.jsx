import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * /legal. English-language Legal Notice.
 *
 * Mirrors /impressum in content. The German Impressum is a statutory
 * obligation under § 5 TMG and § 18 MStV; this English version exists
 * for transparency to non-German visitors (incl. future US-market
 * outreach). Same legal facts, accessible language.
 */

const SECTIONS = [
  {
    title: "Company information",
    rows: [
      ["Legal entity",          "Bit Studio (Private) Limited"],
      ["Registered office",     "14 Ceres Road\nAvondale, Harare\nZimbabwe"],
      ["Phone",                 "+263 78 594 8128 (WhatsApp)"],
      ["Email",                 "admin@bitstudio.co.zw"],
      ["Web",                   "bitstudio.co.zw"],
    ],
  },
  {
    title: "Directors",
    rows: [
      ["Managing Director", "Simbarashe Mutombe\nPrincipal Officer & Company Secretary"],
      ["Director",          "Newlife Marangwanda"],
    ],
  },
  {
    title: "Registration",
    rows: [
      ["Registrar",            "Companies and Intellectual Property Office of Zimbabwe (CIPZ)"],
      ["Statute",              "Companies and Other Business Entities Act [Chapter 24:31]"],
      ["Registration number",  "42656A0252025"],
      ["Date of incorporation", "9 May 2025"],
      ["Status",               "REGISTERED"],
    ],
  },
  {
    title: "Responsible for content",
    rows: [
      ["Responsible person", "Simbarashe Mutombe"],
      ["Address",            "14 Ceres Road, Avondale, Harare, Zimbabwe"],
      ["Email",              "admin@bitstudio.co.zw"],
    ],
  },
  {
    title: "VAT / Tax",
    rows: [
      [
        "VAT identification",
        "Not applicable. The company is incorporated outside the European Union (Zimbabwe). For B2B services to EU customers, reverse-charge applies (Art. 196 VAT Directive / § 13b UStG).",
      ],
    ],
  },
];

const DISCLAIMER = `Content liability: Content on these pages is prepared with care. We make no warranty as to its accuracy, completeness, or currency. As a service provider we are responsible for our own content under applicable law; we are not required to monitor third-party information passed through or stored on our infrastructure.

Link liability: This site links to external websites operated by third parties. We cannot influence the content of those sites and accept no responsibility for it. Responsibility for linked content rests with the respective operators.

Copyright: Content and works on these pages created by the operator are subject to Zimbabwean and international copyright law (Berne Convention). Reproduction, adaptation, distribution, and any form of exploitation outside the limits of copyright require the written consent of Bit Studio (Private) Limited.`;

const DISPUTE = `Online dispute resolution: The European Commission provides a platform for online dispute resolution at ec.europa.eu/consumers/odr. Bit Studio (Private) Limited is not obliged, nor willing, to participate in dispute resolution proceedings before a consumer arbitration board.`;

export default function Legal() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Legal Notice"
        description="Company information for Bit Studio (Private) Limited. Directors, registration, registered office, copyright and link liability."
        path="/legal"
        keywords={["legal notice", "Bit Studio", "Harare", "Zimbabwe", "company registration"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Legal", path: "/legal" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-16 overflow-hidden radial-bleed">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-maroon-700/25 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-signal/5 blur-[160px]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="pb-5 md:pb-6 mb-8 md:mb-10 border-b border-white/5">
            <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 flex-wrap">
              <Link to="/" {...hover} className="hover-line">Index</Link>
              <span className="text-bone-100/30">/</span>
              <span className="text-signal">Legal</span>
            </div>
          </div>

          <SectionLabel chapter="§ Legal" title="Company information" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 display-massive text-bone-100 leading-[0.85]"
          >
            Legal.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-bone-100/75 text-base md:text-lg">
            Company details, directors, registration, and copyright notice. The
            German-language version of this page lives at{" "}
            <Link to="/impressum" {...hover} className="text-signal hover-line">
              /impressum
            </Link>{" "}
            and carries the same legal weight. Last updated: May 2026.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-14 md:space-y-20">
          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-6 md:mb-8">
                {s.title}
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-y-4 max-w-3xl">
                {s.rows.map(([k, v]) => (
                  <div key={k} className="md:col-span-12 grid md:grid-cols-12 gap-2 md:gap-6 py-2 border-t border-white/10 first:border-t-0">
                    <dt className="md:col-span-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 self-baseline">
                      {k}
                    </dt>
                    <dd className="md:col-span-8 text-bone-100/85 whitespace-pre-line leading-relaxed">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}

          <article>
            <h2 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-6">
              Dispute resolution
            </h2>
            <p className="text-bone-100/75 leading-relaxed max-w-3xl">{DISPUTE}</p>
          </article>

          <article>
            <h2 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-6">
              Disclaimer and copyright
            </h2>
            <p className="text-bone-100/75 leading-relaxed max-w-3xl whitespace-pre-line">{DISCLAIMER}</p>
          </article>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 text-bone-100/55 text-sm">
            <span>See also:</span>
            <Link to="/privacy" {...hover} className="hover-line text-signal">Privacy policy</Link>
            <span>·</span>
            <Link to="/terms" {...hover} className="hover-line">Terms of engagement</Link>
            <span>·</span>
            <Link to="/impressum" {...hover} className="hover-line">Impressum (Deutsch)</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
