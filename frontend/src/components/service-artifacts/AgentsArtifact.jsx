import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Agents artifact. A linear chain: PROMPT → TOOL → RESPONSE.
 * Idle: a signal dot migrates along the dashed spine once every ~3.4s.
 * Hover: the cycle accelerates; nodes border brightens to signal.
 */
export default function AgentsArtifact() {
  const reduced = useReducedMotionPreference();
  const nodes = ["PROMPT", "TOOL", "RESPONSE"];

  return (
    <div className="relative flex items-center justify-between h-[52px] w-full">
      {/* dashed spine */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-px border-t border-dashed border-bone-100/20 group-hover:border-signal/40 transition-colors duration-400" aria-hidden />

      {/* travelling packet */}
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-signal"
          style={{ boxShadow: "0 0 8px #D4FF3A" }}
          initial={{ left: "10%", opacity: 0 }}
          animate={{
            left: ["10%", "50%", "90%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      )}

      {nodes.map((n) => (
        <div
          key={n}
          className="relative z-10 font-mono text-[8px] tracking-[0.1em] text-bone-100/70 bg-ink px-1.5 py-1 border border-bone-100/15 group-hover:border-signal/50 group-hover:text-bone-100 rounded-sm transition-colors duration-400"
        >
          {n}
        </div>
      ))}
    </div>
  );
}
