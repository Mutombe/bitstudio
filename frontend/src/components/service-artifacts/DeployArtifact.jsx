import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Deploy artifact. 4 pipeline stations: build → test → ship → live.
 * Idle: a signal packet migrates along the rail once every ~3.6s.
 * Hover: each station label brightens, rail picks up signal tint.
 */
const STATIONS = ["build", "test", "ship", "live"];

export default function DeployArtifact() {
  const reduced = useReducedMotionPreference();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative h-4 flex items-center">
        {/* rail */}
        <div className="absolute top-1/2 left-[6%] right-[6%] h-px bg-bone-100/20 group-hover:bg-signal/40 transition-colors duration-400" aria-hidden />

        {/* travelling packet */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-signal z-10"
            style={{ boxShadow: "0 0 8px #D4FF3A" }}
            initial={{ left: "6%" }}
            animate={{ left: ["6%", "35%", "64%", "94%", "94%"], opacity: [0, 1, 1, 1, 0] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.28, 0.56, 0.84, 1],
            }}
          />
        )}

        {/* stations */}
        <div className="relative z-[5] flex justify-between w-full px-[4%]">
          {STATIONS.map((s, i) => (
            <span
              key={s}
              className={`w-2 h-2 rounded-full border transition-colors duration-400 ${
                i === STATIONS.length - 1
                  ? "bg-signal border-signal"
                  : "bg-ink border-bone-100/40 group-hover:border-signal/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full px-[1%] font-mono text-[8px] tracking-[0.08em] uppercase text-bone-100/40 group-hover:text-bone-100/70 transition-colors duration-400">
        {STATIONS.map((s) => (
          <span key={s} className={s === "live" ? "text-signal group-hover:text-signal" : ""}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
