import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * Automations artifact — a clock face with 3 cron dots at :00 :20 :40.
 * Idle: second-hand sweeps slowly (full rotation in 8s).
 * Hover: active dot (whatever the hand is passing) brightens.
 */
export default function AutomationsArtifact() {
  const reduced = useReducedMotionPreference();
  // Dot positions on a 40px-radius circle, centered at (26, 26)
  // 12 o'clock (:00) = 90° offset from 0° east
  const dots = [
    { label: "00", angle: -90 },
    { label: "20", angle: 30 },
    { label: "40", angle: 150 },
  ];

  const cx = 26;
  const cy = 26;
  const r = 19;

  return (
    <div className="flex items-center gap-4 h-[52px] w-full">
      <svg viewBox="0 0 52 52" className="h-[52px] w-[52px] shrink-0" aria-hidden>
        {/* outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-none stroke-bone-100/20 group-hover:stroke-signal/40 transition-colors duration-400"
          strokeWidth="1"
        />
        {/* ticks */}
        {dots.map((d) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <circle
              key={d.label}
              cx={x}
              cy={y}
              r="2"
              className="fill-signal"
            />
          );
        })}
        {/* center */}
        <circle cx={cx} cy={cy} r="1.4" className="fill-bone-100" />
        {/* hand */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - (r - 3)}
          className="stroke-bone-100/70 group-hover:stroke-signal transition-colors duration-400"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="flex flex-col gap-0.5 font-mono text-[9px] tracking-[0.1em] text-bone-100/50">
        <span>
          <span className="text-signal">0 */20</span> * * * *
        </span>
        <span className="text-bone-100/30">every 20 min</span>
      </div>
    </div>
  );
}
