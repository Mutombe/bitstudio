import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * Impressum — legal disclosure required by German law (§ 5 TMG, § 18 MStV).
 *
 * Mandatory information for any commercial site that targets the German
 * market. The Wettbewerbszentrale and competitors do issue Abmahnungen
 * (cease-and-desist warnings) over missing or incomplete Impressums.
 *
 * Filled with the studio's known details. The two TODO lines (precise
 * street address, business registration number) should be confirmed by
 * the owner before any German-market outreach goes out.
 */

const SECTIONS = [
  {
    title: "Angaben gemäß § 5 TMG",
    rows: [
      ["Anbieter", "Bit Studio (Pvt) Ltd"],
      ["Anschrift", "Harare, Simbabwe\n[Straße & Hausnummer — ergänzen]"],
      ["Telefon", "+263 78 594 8128 (WhatsApp)"],
      ["E-Mail", "admin@bitstudio.co.zw"],
      ["Web", "bitstudio.co.zw"],
    ],
  },
  {
    title: "Vertretungsberechtigt",
    rows: [
      ["Geschäftsführer", "Simba Mtombe"],
      ["Funktion", "Lead Engineer & Founder, Bit Studio"],
    ],
  },
  {
    title: "Registereintrag",
    rows: [
      ["Registergericht", "Companies and Intellectual Property Office, Harare"],
      ["Registernummer", "[Registrierungsnummer — ergänzen]"],
    ],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    rows: [
      ["Verantwortlicher", "Simba Mtombe"],
      ["Anschrift", "Harare, Simbabwe"],
      ["E-Mail", "admin@bitstudio.co.zw"],
    ],
  },
  {
    title: "Umsatzsteuer-Identifikationsnummer",
    rows: [
      [
        "USt-IdNr.",
        "Nicht vorhanden — Anbieter ist außerhalb der Europäischen Union ansässig (Simbabwe).",
      ],
    ],
  },
];

const DISPUTE = `Online-Streitbeilegung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die unter ec.europa.eu/consumers/odr erreichbar ist. Bit Studio ist nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`;

const DISCLAIMER = `Haftung für Inhalte: Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Haftung für Links: Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.

Urheberrecht: Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.`;

export default function Impressum() {
  const hover = useCursorHover("hover", "");

  return (
    <PageTransition>
      <SEO
        title="Impressum"
        description="Rechtliche Angaben gemäß § 5 TMG und § 18 MStV. Anbieter, Vertretung, Kontakt, Verantwortlichkeiten und Haftungsausschluss."
        path="/impressum"
        noindex={false}
        keywords={["Impressum", "Bit Studio", "TMG", "MStV", "rechtliche Hinweise"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Impressum", path: "/impressum" },
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
              <span className="text-signal">Impressum</span>
            </div>
          </div>

          <SectionLabel chapter="§ Recht" title="Rechtliche Angaben" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 display-massive text-bone-100 leading-[0.85]"
          >
            Impressum.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-bone-100/75 text-base md:text-lg">
            Pflichtangaben gemäß § 5 Telemediengesetz (TMG) und § 18 Medien­staatsvertrag
            (MStV). Stand: Mai 2026.
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
              Streitbeilegung
            </h2>
            <p className="text-bone-100/75 leading-relaxed max-w-3xl">{DISPUTE}</p>
          </article>

          <article>
            <h2 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-6">
              Haftungs- und Urheberrechtshinweise
            </h2>
            <p className="text-bone-100/75 leading-relaxed max-w-3xl whitespace-pre-line">{DISCLAIMER}</p>
          </article>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 text-bone-100/55 text-sm">
            <span>Siehe auch:</span>
            <Link to="/datenschutz" {...hover} className="hover-line text-signal">Datenschutzerklärung</Link>
            <span>·</span>
            <Link to="/terms" {...hover} className="hover-line">Terms of engagement</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
