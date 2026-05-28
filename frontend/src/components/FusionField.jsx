import { motion } from "framer-motion";

/**
 * FusionField. Two glowing orbs converging + separating, like stars colliding.
 * Pure CSS + framer-motion. No images. Drops into any section as a focal piece.
 *
 * Props:
 *  - size: "md" | "lg" (default "md")
 *  - className: extra classes on the wrapper
 */
export default function FusionField({ size = "md", className = "" }) {
  const dim = size === "lg" ? "h-[520px]" : "h-[360px]";

  return (
    <div
      className={`relative w-full ${dim} overflow-hidden isolate ${className}`}
      aria-hidden="true"
    >
      {/* Underlying ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,21,33,0.22),transparent_65%)]" />

      {/* Orb A. Maroon */}
      <motion.div
        initial={{ x: "-18%" }}
        animate={{ x: ["-18%", "-2%", "-18%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-maroon-500 blur-[80px] opacity-70 mix-blend-screen" />
          <div className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full border border-maroon-300/30" />
        </div>
      </motion.div>

      {/* Orb B. Chartreuse */}
      <motion.div
        initial={{ x: "18%" }}
        animate={{ x: ["18%", "2%", "18%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-signal blur-[90px] opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 w-56 h-56 md:w-72 md:h-72 rounded-full border border-signal/40" />
        </div>
      </motion.div>

      {/* Halo. Pulses at the fusion point */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0.3 }}
        animate={{ scale: [0.6, 1.05, 0.6], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-bone-100 mix-blend-overlay blur-[40px]"
      />

      {/* Orbital line. Golden ratio spiral approximated as two ellipses */}
      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ffRing" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="rgba(212,255,58,0)" />
            <stop offset="90%" stopColor="rgba(212,255,58,0.6)" />
            <stop offset="100%" stopColor="rgba(212,255,58,0)" />
          </radialGradient>
        </defs>
        <motion.ellipse
          cx="400" cy="200" rx="260" ry="80"
          fill="none"
          stroke="url(#ffRing)"
          strokeWidth="0.6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "400px 200px" }}
        />
        <motion.ellipse
          cx="400" cy="200" rx="310" ry="50"
          fill="none"
          stroke="rgba(181,70,86,0.4)"
          strokeWidth="0.4"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "400px 200px" }}
        />
      </svg>

      {/* Turbulent noise veil */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay pointer-events-none" aria-hidden>
        <filter id="ffNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0 0.8 0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ffNoise)" />
      </svg>
    </div>
  );
}
