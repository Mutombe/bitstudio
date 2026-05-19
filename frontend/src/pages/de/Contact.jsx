import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpRightIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  BankIcon,
  CopyIcon,
} from "@phosphor-icons/react";
import PageTransition from "../../components/PageTransition.jsx";
import SectionLabel from "../../components/SectionLabel.jsx";
import { useCursorHover } from "../../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../../components/SEO.jsx";

/**
 * /de/kontakt — German Contact page.
 *
 * Same form mechanic as /contact: dispatches to WhatsApp or mailto.
 * Includes the deposit/banking block in German for B2B clients who
 * want to see payment terms before reaching out. The bank details
 * remain the same (FBC Zimbabwe) — Mittelstand buyers often pay via
 * SEPA/SWIFT to non-EU vendors and are comfortable with this.
 */

const BANK = {
  name: "BIT STUDIO",
  bank: "FBC BANK · Harare",
  account: "6870425900199",
  swift: "FBCPZWHA",
};

function CopyChip({ value, label }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} kopiert`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Zwischenablage nicht verfügbar");
    }
  };
  return (
    <button
      onClick={onClick}
      className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] tracking-[0.2em] uppercase border border-white/15 hover:border-signal hover:text-signal text-bone-100/60 transition-colors"
      aria-label={`${label} kopieren`}
    >
      <CopyIcon size={10} weight="bold" />
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
}

export default function ContactDE() {
  const hover = useCursorHover("hover", "");
  const [form, setForm] = useState({ name: "", project: "", email: "" });
  const [channel, setChannel] = useState("whatsapp");
  const [sending, setSending] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.project || !form.email) {
      toast.error("Drei Felder. Alle drei. Ohne Ausnahme.");
      return;
    }
    setSending(true);
    const msg = `Name: ${form.name}\nProjekt: ${form.project}\nE-Mail: ${form.email}\n\nGesendet von bitstudio.co.zw/de`;
    setTimeout(() => {
      if (channel === "whatsapp") {
        window.open(
          `https://wa.me/263785948128?text=${encodeURIComponent(msg)}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        window.open(
          `mailto:admin@bitstudio.co.zw?subject=${encodeURIComponent(
            "Anfrage · " + form.name
          )}&body=${encodeURIComponent(msg)}`,
          "_blank"
        );
      }
      toast.success("Sendung abgesetzt. Wir lesen jede.");
      setSending(false);
    }, 400);
  };

  return (
    <PageTransition>
      <SEO
        title="Kontakt · Sendung öffnen"
        description="WhatsApp, E-Mail oder das Formular. Anzahlung 50 %, der Rest nach Abschluss. FBC-Bankverbindung für SEPA/SWIFT auf dieser Seite."
        path="/de/kontakt"
        keywords={["Bit Studio Kontakt", "Designstudio kontaktieren", "Anfrage", "WhatsApp"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/de" },
            { name: "Kontakt", path: "/de/kontakt" },
          ]),
        ]}
      />

      <section className="relative min-h-screen pt-24 md:pt-40 pb-0 overflow-hidden bg-maroon-600 text-bone-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-maroon-800/60 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-signal/10 blur-[160px]" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 mb-8 md:mb-12 flex-wrap">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Kapitel 04 · Sendung</span>
            <span className="text-bone-100/30">/</span>
            <span>Kanal offen</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display-massive leading-[0.8]"
            style={{ fontSize: "clamp(3.5rem, 18vw, 18rem)" }}
          >
            HALLO.
          </motion.h1>

          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pb-24 md:pb-40">
            {/* Left — direct channels */}
            <div className="md:col-span-5 space-y-8 md:space-y-10">
              <SectionLabel chapter="§ Direkt" title="Kanäle" />

              <div className="space-y-4">
                <a
                  href="https://wa.me/263785948128"
                  target="_blank"
                  rel="noreferrer"
                  {...hover}
                  className="group flex items-center gap-4 p-5 md:p-6 border border-bone-100/20 hover:border-signal hover:bg-bone-100/5 transition-all"
                >
                  <WhatsappLogoIcon size={28} weight="bold" className="text-signal shrink-0" />
                  <div className="flex-1">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-1">
                      WhatsApp · bevorzugt
                    </p>
                    <p className="font-display text-lg md:text-xl text-bone-100 group-hover:text-signal transition-colors">
                      +263 78 594 8128
                    </p>
                  </div>
                  <ArrowUpRightIcon size={18} weight="bold" className="text-bone-100/40 group-hover:text-signal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </a>

                <a
                  href="mailto:admin@bitstudio.co.zw"
                  {...hover}
                  className="group flex items-center gap-4 p-5 md:p-6 border border-bone-100/20 hover:border-signal hover:bg-bone-100/5 transition-all"
                >
                  <EnvelopeSimpleIcon size={28} weight="bold" className="text-signal shrink-0" />
                  <div className="flex-1">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-1">
                      E-Mail
                    </p>
                    <p className="font-display text-lg md:text-xl text-bone-100 group-hover:text-signal transition-colors break-all">
                      admin@bitstudio.co.zw
                    </p>
                  </div>
                  <ArrowUpRightIcon size={18} weight="bold" className="text-bone-100/40 group-hover:text-signal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </a>
              </div>

              <div className="pt-8 border-t border-bone-100/15">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-3">
                  Erreichbarkeit
                </p>
                <p className="text-bone-100/85 leading-relaxed">
                  Montag bis Freitag, 09:00 — 18:00 MEZ. Wir antworten in der
                  Regel innerhalb von vier Stunden, auf WhatsApp meistens
                  schneller.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={submit} className="md:col-span-7 space-y-6">
              <SectionLabel chapter="§ Formular" title="Drei Felder" />

              <div className="space-y-5 mt-6">
                <label className="block">
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-2">
                    Name
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    className="w-full bg-transparent border-b border-bone-100/30 focus:border-signal py-2 text-lg md:text-xl text-bone-100 placeholder-bone-100/30 outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </label>

                <label className="block">
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-2">
                    Projekt
                  </span>
                  <textarea
                    value={form.project}
                    onChange={update("project")}
                    rows={3}
                    className="w-full bg-transparent border-b border-bone-100/30 focus:border-signal py-2 text-base md:text-lg text-bone-100 placeholder-bone-100/30 outline-none transition-colors resize-none"
                    placeholder="In drei Sätzen — was bauen wir?"
                  />
                </label>

                <label className="block">
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55 mb-2">
                    E-Mail
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    className="w-full bg-transparent border-b border-bone-100/30 focus:border-signal py-2 text-lg md:text-xl text-bone-100 placeholder-bone-100/30 outline-none transition-colors"
                    placeholder="adresse@firma.de"
                  />
                </label>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChannel("whatsapp")}
                    className={`px-3 py-2 font-mono text-[10px] tracking-[0.22em] uppercase border transition-all ${
                      channel === "whatsapp"
                        ? "border-signal text-signal"
                        : "border-bone-100/30 text-bone-100/55 hover:border-bone-100/60"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("email")}
                    className={`px-3 py-2 font-mono text-[10px] tracking-[0.22em] uppercase border transition-all ${
                      channel === "email"
                        ? "border-signal text-signal"
                        : "border-bone-100/30 text-bone-100/55 hover:border-bone-100/60"
                    }`}
                  >
                    E-Mail
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="ml-auto btn btn-primary disabled:opacity-50"
                >
                  <PaperPlaneTiltIcon size={14} weight="bold" />
                  Senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Banking — visible at /de/kontakt only, hidden in the global footer */}
      <section className="relative py-16 md:py-24 bg-[color:var(--color-ink)] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <div className="col-span-12 lg:col-span-5">
              <SectionLabel chapter="§ Konditionen" title="Bankverbindung & Zahlung" />
              <h2 className="mt-6 display-xl text-bone-100 leading-[1.0]">
                50 % zum Start.<br />
                <span className="italic-accent text-bone-300 font-light">50 % bei Abnahme.</span>
              </h2>
              <p className="mt-6 text-bone-100/70 max-w-md leading-relaxed">
                Eine Anzahlung von 50 % öffnet die Arbeit. Der Rest wird nach
                der finalen Abnahme fällig. Für SEPA und SWIFT geeignet.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="relative border border-white/10 rounded-sm p-6 md:p-8 bg-maroon-950/30">
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal/80" />
                <div className="flex items-center gap-3 mb-5">
                  <BankIcon size={18} weight="bold" className="text-signal" />
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                    Bank · für Anzahlung
                  </p>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-baseline justify-between gap-3 py-2 border-t border-white/10">
                    <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                      Kontoinhaber
                    </dt>
                    <dd className="text-bone-100/90 font-mono tracking-tight">
                      {BANK.name}
                      <CopyChip value={BANK.name} label="Kontoinhaber" />
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 py-2 border-t border-white/10">
                    <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                      Bank
                    </dt>
                    <dd className="text-bone-100/90 font-mono tracking-tight">
                      {BANK.bank}
                      <CopyChip value={BANK.bank} label="Bank" />
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 py-2 border-t border-white/10">
                    <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                      Kontonummer
                    </dt>
                    <dd className="text-bone-100/90 font-mono tracking-tight tabular-nums">
                      {BANK.account}
                      <CopyChip value={BANK.account} label="Kontonummer" />
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 py-2 border-t border-white/10">
                    <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                      SWIFT / BIC
                    </dt>
                    <dd className="text-bone-100/90 font-mono tracking-tight tabular-nums">
                      {BANK.swift}
                      <CopyChip value={BANK.swift} label="SWIFT" />
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-[11px] text-bone-100/40 leading-snug">
                  Verifizieren Sie die Bankverbindung immer telefonisch
                  (WhatsApp-Nummer oben), bevor Sie eine Überweisung tätigen.
                  Wir fordern niemals Zahlung per DM oder spontaner E-Mail an.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
