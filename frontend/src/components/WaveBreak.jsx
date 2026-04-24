import { motion, useReducedMotion } from "framer-motion";

/**
 * WaveBreak — a section divider drawn as two sinusoidal strokes
 * (maroon + chartreuse) that *actually wave* — the path `d` attribute
 * loops between two sinusoidal variants so crests rise and troughs dip
 * continuously. Each path also drifts laterally at a different cadence
 * for a living, never-synchronized feel.
 *
 * Respects prefers-reduced-motion — falls back to a calm static pair.
 *
 * Props:
 *  - variant: "thin" | "full" (default: "thin")
 *  - className: extra classes for the wrapper
 */

// Two sinusoidal variants with matching structure so framer-motion can
// interpolate between them smoothly. Crests and troughs alternate between
// the two, producing the wavering motion.
const MAROON_A = "M0 90 Q 200 30, 400 90 T 800 90 T 1200 90 T 1600 90";
const MAROON_B = "M0 90 Q 200 150, 400 90 T 800 90 T 1200 90 T 1600 90";

const SIGNAL_A = "M0 90 Q 200 150, 400 90 T 800 90 T 1200 90 T 1600 90";
const SIGNAL_B = "M0 90 Q 200 30, 400 90 T 800 90 T 1200 90 T 1600 90";

export default function WaveBreak({ variant = "thin", className = "" }) {
  const reduced = useReducedMotion();
  const h = variant === "full" ? 180 : 90;

  return (
    <div
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

        {/* Maroon stroke — wavers (d between A/B) while drifting right */}
        <motion.path
          initial={{ d: MAROON_A, translateX: 0 }}
          animate={
            reduced
              ? { d: MAROON_A, translateX: 0 }
              : { d: [MAROON_A, MAROON_B, MAROON_A], translateX: [0, 120, 0] }
          }
          transition={{
            d: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            translateX: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          }}
          fill="none"
          stroke="url(#wbMaroon)"
          strokeWidth="1.5"
        />

        {/* Chartreuse whisper — counter-phase + counter-drift */}
        <motion.path
          initial={{ d: SIGNAL_A, translateX: 0 }}
          animate={
            reduced
              ? { d: SIGNAL_A, translateX: 0 }
              : { d: [SIGNAL_A, SIGNAL_B, SIGNAL_A], translateX: [0, -90, 0] }
          }
          transition={{
            d: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            translateX: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          }}
          fill="none"
          stroke="url(#wbSignal)"
          strokeWidth="0.75"
        />

        {/* Center ghost stroke for depth — still, provides the resting line */}
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
