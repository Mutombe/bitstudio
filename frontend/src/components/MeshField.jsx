import { motion } from "framer-motion";

/**
 * MeshField — a full-bleed animated mesh gradient of drifting orbs.
 * No images. Pure computed color. Drifts slowly to hint at life.
 *
 * Props:
 *  - intensity: "low" | "med" | "high" (default: "med")
 *  - tint: one of "maroon" | "oxblood" | "signal" | "mixed" (default: "mixed")
 *  - className: extra classes for the wrapper
 *
 * NOTE on hero seam: the two lower orbs sit in the upper half (y 30–40%) and
 * the whole wrapper is masked to fade to transparent in the bottom ~25%.
 * This prevents orbs from painting a warm maroon "band" at the hero's lower
 * edge on wide desktop viewports (where vw-sized orbs otherwise become huge).
 * Orb widths are clamp()-capped so they never exceed ~520px regardless of
 * viewport width.
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

  // Four orbs, drifting at different phases.
  // All sizes clamp()-capped so a 2560px ultrawide doesn't turn these into
  // 1000px+ warm masses. Lower orbs moved UP to 30–40% so they never paint
  // the hero's bottom seam.
  const orbs = [
    { c: colors[0], x: "-10%", y: "10%",  w: "clamp(280px, 55vw, 620px)", h: "clamp(280px, 55vw, 620px)", dx: 20,  dy: -15, dur: 24 },
    { c: colors[1], x: "60%",  y: "-10%", w: "clamp(260px, 50vw, 560px)", h: "clamp(260px, 50vw, 560px)", dx: -25, dy: 20,  dur: 30 },
    { c: colors[2 % colors.length], x: "20%", y: "40%",  w: "clamp(240px, 45vw, 520px)", h: "clamp(240px, 45vw, 520px)", dx: 30,  dy: -20, dur: 28 },
    { c: colors[3 % colors.length] || colors[0], x: "70%", y: "30%", w: "clamp(220px, 40vw, 480px)", h: "clamp(220px, 40vw, 480px)", dx: -18, dy: 25, dur: 26 },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(180deg, #000 0%, #000 75%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 75%, transparent 98%)",
      }}
    >
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
