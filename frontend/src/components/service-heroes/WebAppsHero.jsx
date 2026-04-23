import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * WebAppsHero — wireframe browser morphing between 3 dashboard layouts
 *   (stat cards → chart → table) on a 4s loop.
 */
const LAYOUTS = ["stats", "chart", "table"];

export default function WebAppsHero() {
  const reduced = useReducedMotionPreference();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % LAYOUTS.length), 4000);
    return () => clearInterval(t);
  }, [reduced]);

  const layout = LAYOUTS[idx];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 30% 30%, rgba(140,30,44,0.4), transparent 55%), radial-gradient(circle at 75% 75%, rgba(58,10,21,0.55), transparent 55%), #0A0708"
      }} />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-16">
        <div className="w-full max-w-4xl rounded-sm border border-white/10 overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-maroon-500" />
            <span className="w-2 h-2 rounded-full bg-signal-muted" />
            <span className="w-2 h-2 rounded-full bg-signal" />
            <div className="flex-1 mx-4">
              <div className="h-4 rounded bg-white/5 flex items-center px-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-bone-100/40 truncate">
                  /dashboard/{layout}
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-signal/70">
              {layout}
            </span>
          </div>

          {/* Layout body */}
          <div className="p-3 sm:p-5 md:p-8 min-h-[200px] sm:min-h-[280px] md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={layout}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {layout === "stats" && <StatsLayout />}
                {layout === "chart" && <ChartLayout />}
                {layout === "table" && <TableLayout />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress pips */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {LAYOUTS.map((L, i) => (
          <span
            key={L}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === idx ? "w-10 bg-signal" : "w-2 bg-bone-100/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StatsLayout() {
  const stats = [
    { k: "Total users", v: "12,847", d: "+18%" },
    { k: "Revenue", v: "$94.2K", d: "+6%" },
    { k: "Active now", v: "326", d: "+2%" },
  ];
  return (
    <div className="space-y-4">
      <div className="h-4 w-48 rounded bg-bone-100/10" />
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-sm border border-white/10 bg-white/5 p-4"
          >
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/40 mb-2">
              {s.k}
            </p>
            <p className="font-display text-2xl text-bone-100 tracking-tight">{s.v}</p>
            <p className="font-mono text-[10px] tracking-[0.18em] text-signal mt-1">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChartLayout() {
  const bars = [48, 62, 35, 80, 55, 72, 90, 68, 78, 95, 82, 88];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 rounded bg-bone-100/10" />
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded bg-signal/40" />
          <div className="h-5 w-12 rounded bg-white/5" />
        </div>
      </div>
      <div className="flex items-end gap-2 h-48 pt-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === 9 ? "var(--color-signal)" : "rgba(245,239,230,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TableLayout() {
  const rows = [
    ["8247", "Umati", "Active", "$12,400"],
    ["8246", "Brompton", "Pending", "$8,900"],
    ["8245", "Lupane", "Active", "$22,100"],
    ["8244", "Denford", "Active", "$4,700"],
    ["8243", "Zusly", "Review", "$31,800"],
  ];
  return (
    <div className="space-y-3">
      <div className="h-4 w-44 rounded bg-bone-100/10" />
      <div className="rounded-sm border border-white/10 overflow-hidden">
        <div className="grid grid-cols-4 px-4 py-2.5 border-b border-white/10 bg-white/5 font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/50">
          <span>ID</span>
          <span>Account</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="grid grid-cols-4 px-4 py-2 border-b border-white/5 text-xs text-bone-100/80 font-mono"
          >
            <span>{r[0]}</span>
            <span className="truncate">{r[1]}</span>
            <span className={r[2] === "Active" ? "text-signal" : r[2] === "Pending" ? "text-bone-300" : "text-maroon-300"}>
              {r[2]}
            </span>
            <span className="text-right text-bone-100">{r[3]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
