import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Web apps artifact. A stylised URL bar with a blinking cursor.
 * Idle: cursor blinks at ~1.1s cadence.
 * Hover: the blink accelerates slightly.
 */
export default function WebAppsArtifact() {
  const reduced = useReducedMotionPreference();
  return (
    <div className="flex items-center gap-2 h-[52px] w-full border border-bone-100/10 group-hover:border-signal/30 rounded-sm px-3 bg-maroon-950/40 transition-colors duration-400">
      {/* Traffic-light dots */}
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-maroon-400/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-signal/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-bone-100/20" />
      </div>
      <div className="flex-1 flex items-center gap-1 font-mono text-[11px] text-bone-100/70 overflow-hidden">
        <span className="text-signal/70">//</span>
        <span>app.bit.studio</span>
        <span className="text-bone-100/30">/</span>
        <span className="text-bone-100/50">*</span>
        <motion.span
          className="inline-block w-[5px] h-[11px] bg-signal ml-0.5"
          aria-hidden
          initial={{ opacity: 1 }}
          animate={reduced ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 0.5, 1],
          }}
        />
      </div>
    </div>
  );
}
