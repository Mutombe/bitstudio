import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Enterprise artifact. A tiny 3-node organisational graph.
 * Idle: root node pulses softly, edges glow along the child branches.
 * Hover: edges brighten briefly to chartreuse.
 */
export default function EnterpriseArtifact() {
  const reduced = useReducedMotionPreference();
  return (
    <svg
      viewBox="0 0 180 52"
      className="w-full h-[52px]"
      aria-hidden
      fill="none"
    >
      {/* edges */}
      <motion.path
        d="M 90 14 L 40 40"
        stroke="currentColor"
        className="text-bone-100/30 group-hover:text-signal/70 transition-colors duration-400"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.path
        d="M 90 14 L 90 40"
        stroke="currentColor"
        className="text-bone-100/30 group-hover:text-signal/70 transition-colors duration-400"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <motion.path
        d="M 90 14 L 140 40"
        stroke="currentColor"
        className="text-bone-100/30 group-hover:text-signal/70 transition-colors duration-400"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* root */}
      <motion.circle
        cx="90"
        cy="14"
        r="4"
        className="fill-signal"
        animate={
          reduced
            ? undefined
            : { scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }
        }
        style={{ transformOrigin: "90px 14px" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* children */}
      <circle cx="40" cy="40" r="3" className="fill-bone-100/60 group-hover:fill-signal transition-colors duration-400" />
      <circle cx="90" cy="40" r="3" className="fill-bone-100/60 group-hover:fill-signal transition-colors duration-400" />
      <circle cx="140" cy="40" r="3" className="fill-bone-100/60 group-hover:fill-signal transition-colors duration-400" />

      {/* labels */}
      <text x="40" y="50" textAnchor="middle" className="fill-bone-100/35 font-mono" style={{ fontSize: "7px", letterSpacing: "0.08em" }}>
        ADMIN
      </text>
      <text x="90" y="50" textAnchor="middle" className="fill-bone-100/35 font-mono" style={{ fontSize: "7px", letterSpacing: "0.08em" }}>
        USER
      </text>
      <text x="140" y="50" textAnchor="middle" className="fill-bone-100/35 font-mono" style={{ fontSize: "7px", letterSpacing: "0.08em" }}>
        GUEST
      </text>
    </svg>
  );
}
