import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * WaveBreak — a section divider drawn as two sinusoidal strokes
 * (maroon + chartreuse). Phase animates slightly with scroll progress.
 * No images. All SVG.
 *
 * Props:
 *  - variant: "thin" | "full" (default: "thin")
 *  - className: extra classes for the wrapper
 */
export default function WaveBreak({ variant = "thin", className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Pull wave phase from scroll
  const phase1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const phase2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const h = variant === "full" ? 180 : 90;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: h }}
      aria-hidden="true"
    >
      {/* Base hairline */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />

      <svg
        viewBox="0 0 1600 180"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="wbMaroon" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"  stopColor="#8C1E2C" stopOpacity="0" />
            <stop offset="15%" stopColor="#8C1E2C" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#B54656" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#8C1E2C" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8C1E2C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wbSignal" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"  stopColor="#D4FF3A" stopOpacity="0" />
            <stop offset="30%" stopColor="#D4FF3A" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#A8C72E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D4FF3A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Maroon stroke */}
        <motion.path
          d="M0 90 Q 200 30, 400 90 T 800 90 T 1200 90 T 1600 90"
          fill="none"
          stroke="url(#wbMaroon)"
          strokeWidth="1.5"
          style={{ translateX: phase1 }}
        />
        {/* Chartreuse whisper */}
        <motion.path
          d="M0 90 Q 200 150, 400 90 T 800 90 T 1200 90 T 1600 90"
          fill="none"
          stroke="url(#wbSignal)"
          strokeWidth="0.75"
          style={{ translateX: phase2 }}
        />

        {/* Center ghost stroke for depth */}
        <path
          d="M0 90 Q 100 70, 200 90 T 400 90 T 600 90 T 800 90 T 1000 90 T 1200 90 T 1400 90 T 1600 90"
          fill="none"
          stroke="rgba(245,239,230,0.06)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
