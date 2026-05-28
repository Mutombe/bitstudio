import { useEffect, useState } from "react";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Scraping artifact. A 3-line JSON fragment with syntax highlighting:
 *   chartreuse keys, bone strings, dimmed punctuation.
 * Idle: "source" value ticks between hostnames every ~2.8s, like streaming ingest.
 * Hover: keys brighten to full signal.
 */
const SOURCES = ['"example.com"', '"gov.zw"', '"tenders.org"'];

export default function ScrapingArtifact() {
  const reduced = useReducedMotionPreference();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % SOURCES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="font-mono text-[10px] leading-[1.55] w-full">
      <div className="text-bone-100/30">{`{`}</div>
      <div className="pl-3">
        <span className="text-signal/90 group-hover:text-signal transition-colors duration-400">"name"</span>
        <span className="text-bone-100/30">: </span>
        <span className="text-bone-100/80">"ZESA"</span>
        <span className="text-bone-100/30">,</span>
      </div>
      <div className="pl-3">
        <span className="text-signal/90 group-hover:text-signal transition-colors duration-400">"source"</span>
        <span className="text-bone-100/30">: </span>
        <span
          key={idx}
          className="text-bone-100/80"
          style={{
            animation: reduced ? "none" : "bitstudio-artifact-fade 2.8s ease-in-out",
          }}
        >
          {SOURCES[idx]}
        </span>
      </div>
      <div className="text-bone-100/30">{`}`}</div>
    </div>
  );
}
