import { motion } from "framer-motion";

/**
 * MeshField — a full-bleed animated mesh gradient of drifting orbs.
 * No images. Pure computed color. Drifts slowly to hint at life.
 *
 * Props:
 *  - intensity: "low" | "med" | "high" (default: "med")
 *  - tint: one of "maroon" | "oxblood" | "signal" | "mixed" (default: "mixed")
 *  - className: extra classes for the wrapper
 */
export default function MeshField({
  intensity = "med",
  tint = "mixed",
  className = "",
}) {
  const blur =
    intensity === "low" ? "blur-[140px]" :
    intensity === "high" ? "blur-[220px]" : "blur-[180px]";

  const palettes = {
    maroon: ["bg-maroon-600/40", "bg-maroon-700/35", "bg-maroon-400/20"],
    oxblood: ["bg-[#3A0A15]/60", "bg-maroon-800/50", "bg-maroon-500/25"],
    signal: ["bg-signal/15", "bg-signal-muted/10", "bg-maroon-600/25"],
    mixed: ["bg-maroon-600/40", "bg-[#3A0A15]/50", "bg-signal/10", "bg-bone-100/5"],
  };
  const colors = palettes[tint] || palettes.mixed;

  // Four orbs, drifting at different phases
  const orbs = [
    { c: colors[0], x: "-10%", y: "10%",  w: "55vw", h: "55vw", dx: 20,  dy: -15, dur: 24 },
    { c: colors[1], x: "60%",  y: "-10%", w: "50vw", h: "50vw", dx: -25, dy: 20,  dur: 30 },
    { c: colors[2 % colors.length], x: "20%", y: "70%",  w: "45vw", h: "45vw", dx: 30,  dy: -20, dur: 28 },
    { c: colors[3 % colors.length] || colors[0], x: "70%", y: "60%", w: "40vw", h: "40vw", dx: -18, dy: 25, dur: 26 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: o.y, left: o.x, width: o.w, height: o.h }}
          className={`absolute rounded-full ${o.c} ${blur} mix-blend-screen`}
        />
      ))}
    </div>
  );
}
