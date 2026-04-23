import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * BrandHero — Bit Studio monogram deconstructing / reconstructing.
 * Pieces fly apart and reassemble in 3-4 color variations on loop.
 */
const VARIANTS = [
  { bg: "#0A0708", fg: "#F5EFE6", accent: "#D4FF3A", label: "Bone · Signal" },
  { bg: "#6B1521", fg: "#F5EFE6", accent: "#F5EFE6", label: "Maroon · Bone" },
  { bg: "#F5EFE6", fg: "#6B1521", accent: "#6B1521", label: "Paper · Maroon" },
  { bg: "#0A0708", fg: "#D4FF3A", accent: "#B54656", label: "Ink · Signal" },
];

export default function BrandHero() {
  const reduced = useReducedMotionPreference();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % VARIANTS.length), 3600);
    return () => clearInterval(t);
  }, [reduced]);

  const v = VARIANTS[idx];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ background: v.bg }}
        />
      </AnimatePresence>

      {/* Subtle mesh */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(245,239,230,0.05), transparent 55%)"
      }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Monogram color={v.fg} accent={v.accent} reduced={reduced} cycle={idx} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-2 left-3 right-3 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: v.accent }}>
            System · 04 variants
          </p>
          <h2 className="italic-accent text-3xl md:text-4xl leading-tight max-w-md" style={{ color: v.fg }}>
            A brand is a posture.
          </h2>
        </div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase hidden md:block" style={{ color: v.fg, opacity: 0.5 }}>
          {v.label}
        </p>
      </div>
    </div>
  );
}

function Monogram({ color, accent, reduced, cycle }) {
  // B/S monogram — a 3x3 grid of geometric blocks that fly apart and reassemble
  const blocks = [
    { x: 0, y: 0, w: 60, h: 80 },    // B stem
    { x: 60, y: 0, w: 60, h: 35 },   // B top bowl
    { x: 60, y: 45, w: 60, h: 35 },  // B bottom bowl
    { x: 150, y: 0, w: 90, h: 20 },  // S top
    { x: 150, y: 30, w: 90, h: 20 }, // S middle
    { x: 150, y: 60, w: 90, h: 20 }, // S bottom
  ];

  return (
    <svg viewBox="0 0 240 80" width="360" height="120" className="md:w-[520px] md:h-[170px]">
      {blocks.map((b, i) => (
        <motion.rect
          key={`${cycle}-${i}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill={i === 3 || i === 5 ? accent : color}
          initial={reduced ? { opacity: 1 } : {
            opacity: 0,
            x: b.x + (Math.cos(i) * 40),
            y: b.y + (Math.sin(i * 1.7) * 20),
            scale: 1.3,
          }}
          animate={{ opacity: 1, x: b.x, y: b.y, scale: 1 }}
          exit={reduced ? {} : {
            opacity: 0,
            scale: 0.5,
            x: b.x + (Math.cos(i + 2) * 60),
            y: b.y + (Math.sin(i) * 30),
          }}
          transition={{
            duration: 0.9,
            delay: i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ originX: 0.5, originY: 0.5 }}
        />
      ))}

      {/* Accent dot */}
      <motion.circle
        key={`${cycle}-dot`}
        cx="242"
        cy="78"
        r="3"
        fill={accent}
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </svg>
  );
}
