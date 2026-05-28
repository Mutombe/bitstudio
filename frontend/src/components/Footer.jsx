import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRightIcon,
  BankIcon,
  CopyIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

const STEPS = [
  {
    n: "01",
    label: "Brief",
    body:
      "We listen for the thing under the thing. Sometimes that takes a call. Sometimes a long walk.",
  },
  {
    n: "02",
    label: "Build",
    body:
      "We work the way a jeweller works. Slowly, with light, measuring three times before the cut.",
  },
  {
    n: "03",
    label: "Ship",
    body:
      "Live URL, real photos, real copy, the kind of polish that survives at least one 3 AM. On time.",
  },
];

const BANK = {
  name: "BIT STUDIO",
  bank: "FBC BANK",
  account: "6870425900199",
  terms: "50% to begin · 50% on completion",
};

function CopyChip({ value, label }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Clipboard unavailable");
    }
  };
  return (
    <button
      onClick={onClick}
      className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] tracking-[0.2em] uppercase border border-white/15 hover:border-signal hover:text-signal text-bone-100/60 transition-colors"
      aria-label={`Copy ${label}`}
    >
      {copied ? <CheckIcon size={10} weight="bold" /> : <CopyIcon size={10} weight="bold" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Footer() {
  const hover = useCursorHover("hover", "");
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  // Hide the engagement strip on contact + terms + legal pages (already
  // covered there). Also hide on /de/kontakt which has its own bank block.
  const showEngagement =
    pathname !== "/contact" &&
    pathname !== "/de/kontakt" &&
    pathname !== "/terms" &&
    pathname !== "/impressum" &&
    pathname !== "/datenschutz" &&
    pathname !== "/legal" &&
    pathname !== "/privacy";

  return (
    <footer className="relative bg-[color:var(--color-ink)] border-t border-white/5 overflow-hidden">
      {/* Oversized monogram backdrop */}
      <div className="absolute -bottom-10 md:-bottom-32 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.07]">
        <span className="display-massive text-maroon-500 leading-none">BS</span>
      </div>

      {/* ─── ENGAGEMENT STRIP (How we work + bank) ───────────────────── */}
      {showEngagement && (
        <div className="relative border-b border-white/5 bg-[color:var(--color-ink)]/95">
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="grid grid-cols-12 gap-8 md:gap-10">
              {/* Left: 3-step process */}
              <div className="col-span-12 lg:col-span-7">
                <p className="label-mono text-bone-100/40 mb-3">§ How we work</p>
                <h3 className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.1] mb-8 max-w-2xl">
                  Three steps. <span className="italic-accent text-signal">No surprises.</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
                  {STEPS.map((step) => (
                    <div key={step.n}>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
                          {step.n}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                          {step.label}
                        </span>
                      </div>
                      <p className="text-sm text-bone-100/75 leading-[1.55]">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Bank details card */}
              <div className="col-span-12 lg:col-span-5">
                <div className="relative h-full border border-white/10 rounded-sm p-6 md:p-7 bg-maroon-950/30">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal/80" />
                  <div className="flex items-center gap-3 mb-4">
                    <BankIcon size={18} weight="bold" className="text-signal" />
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/55">
                      Banking · Deposit terms
                    </p>
                  </div>
                  <p className="text-bone-100 text-base md:text-lg leading-snug mb-5">
                    {BANK.terms}.
                    <span className="block mt-1 text-bone-100/60 text-sm">
                      The rest is paid after project completion.
                    </span>
                  </p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex items-baseline justify-between gap-3 py-2 border-t border-white/10">
                      <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45">
                        Account name
                      </dt>
                      <dd className="text-bone-100/90 font-mono tracking-tight">
                        {BANK.name}
                        <CopyChip value={BANK.name} label="Account name" />
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
                        Account no.
                      </dt>
                      <dd className="text-bone-100/90 font-mono tracking-tight tabular-nums">
                        {BANK.account}
                        <CopyChip value={BANK.account} label="Account number" />
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[11px] text-bone-100/40 leading-snug">
                    Always verify on a confirmed channel (call us on the
                    WhatsApp number above) before transferring. We will never
                    request payment via DM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN FOOTER ─────────────────────────────────────────────── */}
      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-y-12 md:gap-10">
          {/* Oversized headline */}
          <div className="col-span-12 md:col-span-8">
            <p className="label-mono text-bone-100/40 mb-6">§ Signal</p>
            <h2 className="display-xl text-bone-100 max-w-4xl">
              Build something that <span className="italic-accent text-signal">outlives</span> the platform.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                {...hover}
                className="btn btn-primary"
              >
                Start a transmission
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
              <a
                href="mailto:admin@bitstudio.co.zw"
                {...hover}
                className="btn btn-ghost"
              >
                admin@bitstudio.co.zw
              </a>
            </div>
          </div>

          {/* Utility columns */}
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono text-bone-100/40 mb-4">Index</p>
            <ul className="space-y-2 text-bone-100/80">
              <li><Link to="/" {...hover} className="hover-line">Home</Link></li>
              <li><Link to="/work" {...hover} className="hover-line">Work</Link></li>
              <li><Link to="/live" {...hover} className="hover-line">Live</Link></li>
              <li><Link to="/writing" {...hover} className="hover-line">Writing</Link></li>
              <li><Link to="/craft" {...hover} className="hover-line">Craft</Link></li>
              <li><Link to="/studio" {...hover} className="hover-line">Studio</Link></li>
              <li><Link to="/field-manual" {...hover} className="hover-line">Field Manual</Link></li>
              <li><Link to="/lab" {...hover} className="hover-line">Lab</Link></li>
              <li><Link to="/contact" {...hover} className="hover-line">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono text-bone-100/40 mb-4">Channels</p>
            <ul className="space-y-2 text-bone-100/80">
              <li><a href="https://wa.me/263785948128" target="_blank" rel="noreferrer" {...hover} className="hover-line">WhatsApp</a></li>
              <li><a href="mailto:admin@bitstudio.co.zw" {...hover} className="hover-line">Email</a></li>
              <li><a href="https://github.com/Mutombe" target="_blank" rel="noreferrer" {...hover} className="hover-line">Github</a></li>
              <li><span className="text-bone-100/40">Harare · ZW</span></li>
            </ul>
          </div>

          {/* Legal column. Both locales linked side by side */}
          <div className="col-span-12 md:col-span-2 md:col-start-11">
            <p className="label-mono text-bone-100/40 mb-4">Legal</p>
            <ul className="space-y-2 text-bone-100/80">
              <li><Link to="/legal" {...hover} className="hover-line">Legal notice</Link></li>
              <li><Link to="/privacy" {...hover} className="hover-line">Privacy</Link></li>
              <li><Link to="/terms" {...hover} className="hover-line">Terms</Link></li>
              <li className="pt-2 border-t border-white/5"><Link to="/impressum" {...hover} className="hover-line text-bone-100/60">Impressum (DE)</Link></li>
              <li><Link to="/datenschutz" {...hover} className="hover-line text-bone-100/60">Datenschutz (DE)</Link></li>
              <li className="pt-2 border-t border-white/5"><a href="/sitemap.xml" {...hover} className="hover-line" target="_blank" rel="noreferrer">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <div className="hairline bg-white/10 mt-16 md:mt-24 mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/40">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="" className="h-4 w-4 opacity-60" />
            <span>© {year} Bit Studio (Pvt) Ltd</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Lat −17.8292 · Lon 31.0522</span>
            <span className="hidden md:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-signal pulse-dot" />
              Broadcasting
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
