import { toast } from "sonner";
import Marquee from "./Marquee.jsx";

/**
 * Ticker — a mono-type marquee strip of short tokens.
 *
 * Items can be:
 *   • string       — the token text (click copies to clipboard)
 *   • object       — { label, href?, to?, onClick?, external? }
 *     - href      opens in a new tab (external link)
 *     - to        not used here (tickers stay inside the studio visual language)
 *     - onClick   custom action (e.g. open Summon)
 *     - external  force target=_blank for href
 *
 * Every token is keyboard-focusable and has a chartreuse hover/focus ring.
 */
export default function Ticker({ items, dense = false, onSummon }) {
  const size = dense ? "text-[10px]" : "text-xs md:text-sm";

  const copyToken = (text) => {
    try {
      navigator.clipboard?.writeText(text);
      toast.success(`Copied · ${text}`);
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  return (
    <Marquee className="py-3">
      {items.map((item, i) => {
        const obj = typeof item === "string" ? { label: item } : item;
        const baseClass = `flex items-center gap-3 shrink-0 font-mono ${size} tracking-[0.2em] uppercase text-bone-100/70 px-2 py-1 rounded-sm transition-colors hover:text-signal hover:bg-signal/5 focus-visible:outline-signal cursor-pointer`;

        const inner = (
          <>
            <span className="w-1 h-1 rounded-full bg-signal" />
            <span>{obj.label}</span>
          </>
        );

        if (obj.href) {
          return (
            <a
              key={i}
              href={obj.href}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClass}
              title={`Open ${obj.href}`}
            >
              {inner}
            </a>
          );
        }

        if (obj.onClick) {
          return (
            <button
              key={i}
              type="button"
              onClick={obj.onClick}
              className={baseClass}
              title={obj.title || "Action"}
            >
              {inner}
            </button>
          );
        }

        // Fallback: copy label to clipboard
        return (
          <button
            key={i}
            type="button"
            onClick={() => copyToken(obj.label)}
            className={baseClass}
            title="Copy"
          >
            {inner}
          </button>
        );
      })}
    </Marquee>
  );
}
