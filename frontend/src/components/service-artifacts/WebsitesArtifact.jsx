import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Websites artifact. Four ascending performance-score bars.
 * Idle: bars breathe (slight scaleY pulse, staggered).
 * Hover (parent .group): bars intensify to signal chartreuse briefly.
 */
export default function WebsitesArtifact() {
  const reduced = useReducedMotionPreference();
  const bars = [
    { h: 18, label: "FCP" },
    { h: 28, label: "LCP" },
    { h: 38, label: "CLS" },
    { h: 48, label: "TBT" },
  ];

  return (
    <div className="flex items-end gap-2 h-[52px] w-full">
      {bars.map((b, i) => (
        <div key={b.label} className="flex flex-col items-center gap-1.5 flex-1">
          <motion.div
            className="w-full bg-bone-100/15 group-hover:bg-signal/70 rounded-[1px] transition-colors duration-400"
            style={{ height: b.h }}
            initial={reduced ? undefined : { scaleY: 0.6, originY: 1 }}
            animate={
              reduced
                ? undefined
                : { scaleY: [0.6, 1, 0.92, 1], originY: 1 }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
          <span className="font-mono text-[8px] tracking-[0.08em] text-bone-100/30 uppercase">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
