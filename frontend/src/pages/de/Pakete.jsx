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
import PageTransition from "../../components/PageTransition.jsx";
import SectionLabel from "../../components/SectionLabel.jsx";
import MeshField from "../../components/MeshField.jsx";
import Ticker from "../../components/Ticker.jsx";
import SEO, { breadcrumbJsonLd } from "../../components/SEO.jsx";
import { useCursorHover } from "../../hooks/useCursor.jsx";
import { PACKAGES, PROCESS_PHASES } from "../../data/packages.js";

/**
 * /pakete — German-language Engagement page (the sales surface).
 *
 * Three Erneuerungs-Pakete with fixed scope, fixed price, three slots
 * per quarter. Each package has its own anchored section so cold emails
 * can deep-link (e.g. /pakete#manufaktur-buehne).
 *
 * The English mirror lives at /packages. Both share PACKAGES from
 * src/data/packages.js — change copy once, both update.
 */

const NF_DAYS = (n) => `${n} Tage`;

export default function Pakete() {
  const hover = useCursorHover("hover", "");
  const viewHover = useCursorHover("view", "Anfragen");

  return (
    <PageTransition>
      <SEO
        title="Pakete · Drei Plätze pro Quartal"
        description="Drei Erneuerungs-Pakete für den deutschen Mittelstand: Manufaktur-Bühne, Hotel-Sammlung, Kanzlei-Erneuerung. Festpreis, festes Lieferdatum, drei Plätze pro Quartal."
        path="/pakete"
        keywords={[
          "Designstudio Pakete",
          "Manufaktur Website",
          "Boutique-Hotel Website",
          "Anwaltskanzlei Website",
          "Festpreis Webdesign",
          "Bit Studio Pakete",
          "Mittelstand Webdesign",
        ]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/de" },
            { name: "Pakete", path: "/pakete" },
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
              Kapitel 07 · Engagements
            </span>
            <span className="text-bone-100/30">/</span>
            <span>Drei Plätze pro Quartal</span>
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
            Drei Erneuerungen.<br />
            <span className="italic-accent text-signal font-light">Drei Plätze pro Quartal.</span>
          </motion.h1>

          <p className="mt-10 max-w-2xl text-base md:text-lg text-bone-100/85 leading-relaxed">
            Die meisten Studios verkaufen Zeit. Wir verkaufen drei klar
            umrissene Werkstücke pro Quartal — fester Umfang, fester Preis,
            festes Lieferdatum. Wer hineinpasst, weiß es vor dem ersten
            Gespräch. Wer nicht hineinpasst, spart sich die Mühe.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl">
            {PACKAGES.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                {...hover}
                className="group block border border-white/10 hover:border-signal/60 transition-colors p-4 md:p-5 rounded-sm bg-white/[0.02]"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: p.accent }}>
                  {p.aesthetic}
                </p>
                <p className="font-display text-base md:text-lg text-bone-100 leading-[1.15] mb-3">
                  {p.name_de}
                </p>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
                  <span className="text-bone-100/65">{p.price}</span>
                  <span className="text-bone-100/45">{NF_WEEKS(p.timeline_weeks)}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link to="/de/kontakt" {...viewHover} className="btn btn-primary">
              Slot anfragen
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
            <Link to="/de/handwerk" {...hover} className="btn btn-ghost">
              Der Weg dahinter
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW WE CHOOSE ─────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel chapter="§ Auswahl" title="Wie wir wählen" />
          </div>
          <div className="col-span-12 md:col-span-9 max-w-3xl space-y-6 text-bone-100/80 leading-relaxed">
            <p className="text-base md:text-lg">
              Die Plätze werden nicht nach Reihenfolge vergeben. Wir wählen die
              Projekte, in denen wir die größte Sorgfalt zur Wirkung bringen
              können — Häuser, die ihre Geschichte ernst nehmen, und für die
              eine ehrliche Erneuerung den größten Unterschied macht.
            </p>
            <p className="text-base md:text-lg">
              Wir reservieren mindestens einen Platz pro Quartal für ein Haus,
              das den Festpreis nicht voll bezahlen kann, aber kulturell oder
              handwerklich heraussticht. Wenn Sie meinen, das könnten Sie
              sein, schreiben Sie es einfach in die erste E-Mail.
            </p>
            <p className="text-base md:text-lg italic-accent text-bone-100">
              Eine Anzahlung von 50 % öffnet den Slot. Die restlichen 50 % sind
              bei Abnahme fällig.
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
            <SectionLabel chapter="§ Ablauf" title="Vier Phasen" />
            <h2 className="mt-6 font-display text-bone-100 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>
              Vom Briefing bis zum Launch —<br />
              <span className="italic-accent text-bone-300 font-light">vier Phasen, transparent getaktet.</span>
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
                  Phase {phase.n} · {phase.days_de}
                </p>
                <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.1] mb-3">
                  {phase.name_de}
                </p>
                <p className="text-sm md:text-[15px] text-bone-100/75 leading-[1.6]">
                  {phase.body_de}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ-LIKE OBJECTIONS ───────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)]">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 md:pt-3">
            <SectionLabel chapter="§ Häufig gefragt" title="Vor dem ersten Gespräch" />
          </div>
          <div className="col-span-12 md:col-span-9 space-y-10 max-w-3xl">
            <Objection
              q="Warum Festpreis und nicht Stunden?"
              a="Weil wir wissen, wie lange ein gut definiertes Werk dauert. Stundenpreise sind eine Versicherung gegen schlechte Planung. Wir planen gut."
            />
            <Objection
              q="Was passiert, wenn der Umfang während des Projekts wächst?"
              a="Erweiterungen werden als kleine Ergänzungsaufträge mit eigenem Festpreis vereinbart. Niemals heimlich. Niemals als „kleines Extra“ in einer Rechnung."
            />
            <Objection
              q="Bauen Sie auch in WordPress, Webflow oder Wix?"
              a="Nein. Wir bauen auf React, Vite und Tailwind. Das ist die Plattform, auf der unsere Werke altern wie sie sollen — schnell, lesbar, langlebig. Wenn Sie eine bestehende WordPress-Site behalten möchten, sind wir nicht das richtige Studio."
            />
            <Objection
              q="Wer hostet die fertige Seite?"
              a="Render (USA, DSGVO-konform). Sechs Monate sind im Preis enthalten. Danach circa € 50 pro Monat — oder Sie übernehmen die Render-Rechnung selbst und wir übergeben den Zugang."
            />
            <Objection
              q="Können wir das Projekt auch in Etappen bezahlen?"
              a="Standard ist 50 / 50 — Anzahlung zum Start, Restzahlung bei Abnahme. Auf Wunsch teilen wir die Restzahlung in zwei Tranchen (25 / 25) bei Halbzeit und Abnahme. Schreiben Sie es einfach in die erste E-Mail."
            />
            <Objection
              q="Wir sind in Österreich / der Schweiz — gilt das Paket?"
              a="Ja. Die Pakete sind identisch für DACH. Bei Reverse-Charge-fähigen Geschäftskunden gilt § 13b UStG (keine deutsche Mehrwertsteuer auf der Rechnung)."
            />
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ───────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 bg-[color:var(--color-ink)] overflow-hidden seam-contact">
        <MeshField tint="oxblood" intensity="high" />
        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <SectionLabel chapter="§ Reservierung" title="Slot anfragen" />
          <h2 className="mt-10 font-display text-bone-100 leading-[0.85]" style={{ fontSize: "clamp(2.75rem, 11vw, 13rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>
            Drei Plätze.<br />
            <span className="italic-accent text-signal font-light">Ein Quartal.</span>
          </h2>

          <p className="mt-10 max-w-2xl text-bone-100/75 text-lg leading-relaxed">
            Schreiben Sie uns einen Satz zu Ihrem Haus und das Paket, an dem
            Sie Interesse haben. Wir antworten an demselben Werktag mit zwei
            oder drei präzisen Fragen — und schlagen einen 20-minütigen Anruf
            vor, wenn das gegenseitige Interesse passt.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link to="/de/kontakt" className="btn btn-primary">
              Slot anfragen
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
          "Drei Plätze pro Quartal",
          "Festpreis · Festes Lieferdatum",
          "DACH · Mitteleuropäische Zeit",
          "Bit Studio · MMXXX",
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
      ? "Quartal ausgebucht"
      : `${pkg.slots_remaining} von ${pkg.slots_per_quarter} Plätzen frei`;
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
              {String(index + 1).padStart(2, "0")} · {pkg.eyebrow_de}
            </p>
            <h2
              className="font-display text-bone-100 leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.25rem, 7vw, 6.5rem)", fontWeight: 700 }}
            >
              {pkg.name_de}
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-bone-100/85 leading-relaxed italic-accent">
              {pkg.promise_de}
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
                    Honorar
                  </dt>
                  <dd className="font-display text-xl md:text-2xl text-bone-100 tabular-nums">
                    {pkg.price}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 flex items-center gap-1.5">
                    <ClockIcon size={11} weight="bold" />
                    Dauer
                  </dt>
                  <dd className="text-bone-100/90 font-mono">
                    {NF_DAYS(pkg.timeline_days)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 flex items-center gap-1.5">
                    <CalendarBlankIcon size={11} weight="bold" />
                    Verfügbarkeit
                  </dt>
                  <dd className={`font-mono text-xs ${slotsTone}`}>
                    {slotsLabel}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                    Ästhetik
                  </dt>
                  <dd className="text-bone-100/90 font-mono text-xs">
                    {pkg.aesthetic}
                  </dd>
                </div>
              </dl>
              <Link
                to={`/de/kontakt?paket=${pkg.slug}`}
                {...hover}
                className="mt-5 w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 border border-signal/40 hover:border-signal hover:bg-signal/5 transition-all font-mono text-[11px] tracking-[0.18em] uppercase"
                style={{ color: pkg.accent }}
              >
                Diesen Slot anfragen
                <ArrowUpRightIcon size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* Body: Für wen + Inbegriffen + Außerhalb */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Für wen */}
          <div className="col-span-12 md:col-span-12 mb-8 md:mb-12">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-4">
              Für wen
            </p>
            <p className="text-base md:text-lg text-bone-100/85 leading-relaxed max-w-4xl">
              {pkg.for_de}
            </p>
          </div>

          {/* Was inbegriffen */}
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-5">
              Im Paket inbegriffen
            </p>
            <ul className="space-y-3">
              {pkg.includes_de.map((item, i) => (
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

          {/* Was außerhalb */}
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-5">
              Außerhalb des Pakets
            </p>
            <ul className="space-y-3">
              {pkg.out_de.map((item, i) => (
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
      <p className="font-display text-xl md:text-2xl text-bone-100 leading-[1.2] mb-4">
        {q}
      </p>
      <p className="text-base md:text-lg text-bone-100/75 leading-relaxed">{a}</p>
    </div>
  );
}
