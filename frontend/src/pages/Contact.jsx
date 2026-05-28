import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpRightIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO, { breadcrumbJsonLd } from "../components/SEO.jsx";

export default function Contact() {
  const hover = useCursorHover("hover", "");
  const [form, setForm] = useState({ name: "", project: "", email: "" });
  const [channel, setChannel] = useState("whatsapp");
  const [sending, setSending] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.project || !form.email) {
      toast.error("Three fields. All three. No exceptions.");
      return;
    }
    setSending(true);
    const msg = `Name: ${form.name}\nProject: ${form.project}\nEmail: ${form.email}\n\nSent from bitstudio.co.zw`;
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
            "Transmission · " + form.name
          )}&body=${encodeURIComponent(msg)}`,
          "_blank"
        );
      }
      toast.success("Transmission dispatched. We read every one.");
      setSending(false);
    }, 400);
  };

  return (
    <PageTransition>
      <SEO
        title="Contact · Open a transmission"
        description="WhatsApp, email, or the form. Harare hours, but we read from anywhere. Deposit 50% to begin, the rest on completion. FBC Bank account details on this page."
        path="/contact"
        keywords={["contact Bit Studio", "Harare design studio", "WhatsApp", "hire a studio"]}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Index", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <section className="relative min-h-screen pt-24 md:pt-40 pb-0 overflow-hidden bg-maroon-600 text-bone-100">
        {/* Ambient bleed */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-maroon-800/60 blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-signal/10 blur-[160px]" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-bone-100/60 mb-8 md:mb-12 flex-wrap">
            <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
            <span>Chapter 04 · Transmission</span>
            <span className="text-bone-100/30">/</span>
            <span>Channel open</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display-massive leading-[0.8]"
            style={{ fontSize: "clamp(3.5rem, 18vw, 18rem)" }}
          >
            TALK.
          </motion.h1>

          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pb-24 md:pb-40">
            {/* Left. Direct channels */}
            <div className="md:col-span-5 space-y-8 md:space-y-10">
              <SectionLabel chapter="§ Direct" title="Channels" />

              <a
                href="https://wa.me/263785948128"
                target="_blank"
                rel="noreferrer"
                {...hover}
                className="group block p-6 md:p-8 border border-bone-100/20 hover:border-signal hover:bg-maroon-700/40 rounded-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <WhatsappLogoIcon size={28} weight="regular" className="group-hover:text-signal transition-colors" />
                  <ArrowUpRightIcon size={18} className="opacity-40 group-hover:opacity-100 group-hover:text-signal -translate-x-1 group-hover:translate-x-0 group-hover:-translate-y-0 transition-all" />
                </div>
                <p className="mt-6 label-mono text-bone-100/70">WhatsApp</p>
                <p
                  className="mt-2 font-display font-bold tracking-[-0.02em] leading-[1.02] text-bone-100 group-hover:text-signal transition-colors"
                  style={{ fontSize: "clamp(1.35rem, 3.4vw, 2.25rem)" }}
                >
                  +263 78 594 8128
                </p>
                <p className="mt-3 text-bone-100/70">Fastest. Least ceremony. We answer between 08:00 and 22:00 CAT.</p>
              </a>

              <a
                href="mailto:admin@bitstudio.co.zw"
                {...hover}
                className="group block p-6 md:p-8 border border-bone-100/20 hover:border-signal hover:bg-maroon-700/40 rounded-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <EnvelopeSimpleIcon size={28} weight="regular" className="group-hover:text-signal transition-colors" />
                  <ArrowUpRightIcon size={18} className="opacity-40 group-hover:opacity-100 group-hover:text-signal transition-all" />
                </div>
                <p className="mt-6 label-mono text-bone-100/70">Email</p>
                <p
                  className="mt-2 font-display font-bold tracking-[-0.02em] leading-[1.02] break-all text-bone-100 group-hover:text-signal transition-colors"
                  style={{ fontSize: "clamp(1.35rem, 3.4vw, 2.25rem)" }}
                >
                  admin@bitstudio.co.zw
                </p>
                <p className="mt-3 text-bone-100/70">For briefs, files, long thoughts. We reply within one working day.</p>
              </a>

              <div className="pt-6 border-t border-bone-100/15 space-y-3 font-mono text-[11px] tracking-[0.18em] uppercase text-bone-100/60">
                <p>Studio · Harare · Zimbabwe</p>
                <p>Lat −17.8292 · Lon 31.0522</p>
                <p>UTC+02 · No calendars · No forms with dropdowns</p>
              </div>
            </div>

            {/* Right. Form */}
            <form
              onSubmit={submit}
              className="md:col-span-7 bg-[color:var(--color-ink)] text-bone-100 rounded-sm p-5 sm:p-6 md:p-10 space-y-6 md:space-y-8 border border-white/10"
            >
              <SectionLabel chapter="§ Form" title="Three fields, no ceremony" />

              <Field
                label="Name"
                value={form.name}
                onChange={update("name")}
                placeholder="Who is transmitting?"
              />
              <Field
                label="Project"
                value={form.project}
                onChange={update("project")}
                placeholder="A line. A paragraph. A shout."
                multiline
              />
              <Field
                label="Email"
                value={form.email}
                onChange={update("email")}
                placeholder="where@we.reply"
                type="email"
              />

              <div className="flex items-center gap-2">
                <span className="label-mono text-bone-100/50 mr-2">Reply via</span>
                {[
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "email", label: "Email" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    {...hover}
                    onClick={() => setChannel(c.id)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-all ${
                      channel === c.id
                        ? "bg-signal text-ink border-signal"
                        : "border-white/15 text-bone-100/70 hover:border-bone-100/40"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
                <p className="label-mono text-bone-100/40 max-w-xs">
                  We read every transmission. Usually within one day.
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  {...hover}
                  className="btn btn-primary disabled:opacity-60 self-start sm:self-auto"
                >
                  {sending ? "Dispatching…" : "Dispatch"}
                  <PaperPlaneTiltIcon size={14} weight="bold" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Oversized glyph */}
        <div className="absolute bottom-[-6%] right-[-2%] md:right-[-4%] pointer-events-none select-none opacity-[0.08]">
          <span className="display-massive text-bone-100 leading-none">BS</span>
        </div>
      </section>

      {/* ─── BANKING ─── How we work + how to pay. */}
      <BankingSection />
    </PageTransition>
  );
}

// ─── Banking Section ──────────────────────────────────────────────────
// Sits below the Contact section. Discreet but unambiguous. Once a client
// is ready to engage, this is the contract: 50% deposit, 50% on delivery.
function BankingSection() {
  const [copied, setCopied] = useState("");
  const copy = (label, value) => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(""), 1600);
    } catch (_) {}
  };
  const ROWS = [
    { label: "Account name", value: "BIT STUDIO" },
    { label: "Bank", value: "FBC BANK" },
    { label: "Account number", value: "6870425900199" },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[color:var(--color-ink)] text-bone-100 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50 mb-6">
          <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
          <span>§ Engagement</span>
          <span className="text-bone-100/30">/</span>
          <span>How we work</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left. The contract in two beats */}
          <div className="md:col-span-5">
            <h2 className="display-xl leading-[0.92]">
              50 to begin.
              <br />
              <span className="italic-accent text-maroon-400 font-light">
                50 when it ships.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-bone-100/70 leading-relaxed">
              Half on day one. It's how we put the team on the work. The
              balance settles when the project lands in your hands, live and
              signed off.
            </p>
            <p className="mt-6 max-w-md text-bone-100/50 text-sm">
              Bank transfer or ZIPIT to the account on the right. WhatsApp
              proof of payment to{" "}
              <a
                href="https://wa.me/263785948128"
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline"
              >
                +263 78 594 8128
              </a>{" "}
              and we open the project file the same day.
            </p>
          </div>

          {/* Right. The account card */}
          <div className="md:col-span-7">
            <div className="border border-white/15 rounded-sm p-6 md:p-10 bg-maroon-600/10">
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
                  Bank Details · Bit Studio
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
                  Verify before transfer
                </div>
              </div>

              <dl className="space-y-5">
                {ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-5 border-b border-white/8 last:border-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone-100/55 min-w-[150px]">
                      {row.label}
                    </dt>
                    <dd className="flex items-center gap-3 sm:gap-4">
                      <span className="font-display text-lg md:text-xl text-bone-100 break-all tabular-nums">
                        {row.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => copy(row.label, row.value)}
                        className="font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1.5 border border-white/15 hover:border-signal hover:text-signal text-bone-100/65 rounded-sm transition-colors shrink-0"
                      >
                        {copied === row.label ? "Copied" : "Copy"}
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-7 text-xs text-bone-100/45 leading-relaxed">
                If the account name doesn't read{" "}
                <span className="text-bone-100/85">BIT STUDIO</span> at your
                bank's confirmation step, do not transfer. Ping us on
                WhatsApp and we'll re-issue the details directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", multiline = false }) {
  return (
    <label className="block">
      <span className="label-mono text-bone-100/50">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="w-full mt-3 bg-transparent border-b border-white/15 focus:border-signal outline-none py-2 text-lg md:text-xl placeholder:text-bone-100/25 resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full mt-3 bg-transparent border-b border-white/15 focus:border-signal outline-none py-2 text-lg md:text-xl placeholder:text-bone-100/25 transition-colors"
        />
      )}
    </label>
  );
}
