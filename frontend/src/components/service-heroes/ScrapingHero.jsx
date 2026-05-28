import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * ScrapingHero. DOM tree building itself, then collapsing into a single
 * clean row of data.
 */

const BUILD_STEPS = [
  { tag: "<html>", indent: 0 },
  { tag: "<head>", indent: 1 },
  { tag: "<body>", indent: 1 },
  { tag: "<main>", indent: 2 },
  { tag: "<div class='card'>", indent: 3 },
  { tag: "<h2>Zusly Shopfitters</h2>", indent: 4 },
  { tag: "<span class='phone'>+263 77 123 4567</span>", indent: 4 },
  { tag: "<span class='email'>hello@zusly.co.zw</span>", indent: 4 },
  { tag: "<a class='site' href='https://…'>zusly.co.zw</a>", indent: 4 },
];

export default function ScrapingHero() {
  const reduced = useReducedMotionPreference();
  const [phase, setPhase] = useState("building"); // building → extracted

  useEffect(() => {
    if (reduced) {
      setPhase("extracted");
      return;
    }
    const t1 = setTimeout(() => setPhase("extracted"), 4000);
    const loop = setInterval(() => {
      setPhase("building");
      setTimeout(() => setPhase("extracted"), 4000);
    }, 8000);
    return () => { clearTimeout(t1); clearInterval(loop); };
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 30% 40%, rgba(79,13,24,0.5), transparent 55%), radial-gradient(circle at 80% 70%, rgba(58,10,21,0.45), transparent 55%), #0A0708"
      }} />

      <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16">
        <div className="w-full max-w-3xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border border-white/10 border-b-0 bg-black/40 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50">
            <span className="w-2 h-2 rounded-full bg-maroon-500" />
            <span className="w-2 h-2 rounded-full bg-signal-muted" />
            <span className="w-2 h-2 rounded-full bg-signal" />
            <span className="ml-3">ingest.py · building tree</span>
            <span className="ml-auto text-signal">● scraping</span>
          </div>

          {/* DOM tree / extracted row */}
          <div className="relative border border-white/10 bg-black/50 backdrop-blur-sm p-5 md:p-7 min-h-[280px]">
            {phase === "building" && (
              <div className="space-y-1.5 font-mono text-[11px] md:text-[13px] text-bone-100/80">
                {BUILD_STEPS.map((s, i) => (
                  <motion.div
                    key={`${phase}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.4 }}
                    className="flex"
                  >
                    <span style={{ paddingLeft: `${s.indent * 18}px` }} className="text-bone-100/30">
                      │ {"─".repeat(s.indent)}
                    </span>
                    <span className={s.indent >= 4 ? "text-signal ml-1" : "text-bone-100/70 ml-1"}>
                      {s.tag}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: BUILD_STEPS.length * 0.3 + 0.2 }}
                  className="pt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/40"
                >
                  → extracting 4 fields…
                </motion.div>
              </div>
            )}

            {phase === "extracted" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full flex flex-col justify-center"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 mb-4">
                  Row 8,247 · delivered clean
                </p>
                <div className="rounded-sm border border-signal/30 bg-signal/5 overflow-hidden">
                  <div className="grid grid-cols-4 px-4 py-2.5 bg-signal/10 border-b border-signal/20 font-mono text-[9px] tracking-[0.22em] uppercase text-signal">
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Email</span>
                    <span>Site</span>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-3 font-mono text-[11px] md:text-[13px] text-bone-100">
                    <span className="truncate">Zusly Shopfitters</span>
                    <span className="truncate">+263 77 123 4567</span>
                    <span className="truncate">hello@zusly.co.zw</span>
                    <span className="truncate text-signal">zusly.co.zw</span>
                  </div>
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40">
                  → Postgres · 94ms · deduped
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-3 right-3 md:bottom-6 md:left-8 md:right-8 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-2">
            Web → table
          </p>
          <h2 className="italic-accent text-2xl md:text-3xl text-bone-100 max-w-md leading-tight">
            The internet is a database.
          </h2>
        </div>
      </div>
    </div>
  );
}
