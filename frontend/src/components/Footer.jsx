import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

export default function Footer() {
  const hover = useCursorHover("hover", "");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[color:var(--color-ink)] border-t border-white/5 overflow-hidden">
      {/* Oversized monogram backdrop */}
      <div className="absolute -bottom-10 md:-bottom-32 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.07]">
        <span className="display-massive text-maroon-500 leading-none">BS</span>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-y-12 md:gap-10">
          {/* Oversized headline */}
          <div className="col-span-12 md:col-span-8">
            <p className="label-mono text-bone-100/40 mb-6">§ 04 — Signal</p>
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
                href="mailto:hello@bitstudio.co.zw"
                {...hover}
                className="btn btn-ghost"
              >
                hello@bitstudio.co.zw
              </a>
            </div>
          </div>

          {/* Utility columns */}
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono text-bone-100/40 mb-4">Index</p>
            <ul className="space-y-2 text-bone-100/80">
              <li><Link to="/" {...hover} className="hover-line">Home</Link></li>
              <li><Link to="/work" {...hover} className="hover-line">Work</Link></li>
              <li><Link to="/studio" {...hover} className="hover-line">Studio</Link></li>
              <li><Link to="/contact" {...hover} className="hover-line">Contact</Link></li>
              <li><Link to="/terms" {...hover} className="hover-line">Terms</Link></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono text-bone-100/40 mb-4">Signal</p>
            <ul className="space-y-2 text-bone-100/80">
              <li><a href="https://wa.me/263787335226" target="_blank" rel="noreferrer" {...hover} className="hover-line">WhatsApp</a></li>
              <li><a href="mailto:hello@bitstudio.co.zw" {...hover} className="hover-line">Email</a></li>
              <li><a href="https://github.com/Mutombe" target="_blank" rel="noreferrer" {...hover} className="hover-line">Github</a></li>
              <li><span className="text-bone-100/40">Harare · ZW</span></li>
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
