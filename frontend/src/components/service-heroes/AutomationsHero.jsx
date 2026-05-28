import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * AutomationsHero. 3 concentric cron circles with tiny marker dots orbiting
 * each at different speeds, occasionally triggering a pulse that travels outward.
 */
const RINGS = [
  { r: 18, speed: 8, markers: 4, color: "#D4FF3A" },
  { r: 30, speed: 14, markers: 6, color: "#A8C72E" },
  { r: 42, speed: 22, markers: 8, color: "#B54656" },
];

export default function AutomationsHero() {
  const reduced = useReducedMotionPreference();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(140,30,44,0.35), transparent 55%), #0A0708"
      }} />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Center dot */}
        <circle cx="50" cy="50" r="1.5" fill="#D4FF3A" />
        <circle cx="50" cy="50" r="4" fill="none" stroke="#D4FF3A" strokeWidth="0.1" opacity="0.4" />

        {/* Pulse waves traveling outward on loop */}
        {!reduced &&
          Array.from({ length: 3 }).map((_, i) => (
            <motion.circle
              key={`pulse-${i}`}
              cx="50"
              cy="50"
              fill="none"
              stroke="#D4FF3A"
              strokeWidth="0.18"
              initial={{ r: 2, opacity: 0.8 }}
              animate={{ r: 50, opacity: 0 }}
              transition={{
                duration: 4,
                delay: i * 1.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

        {RINGS.map((ring, ri) => (
          <g key={ri}>
            {/* Static ring */}
            <circle
              cx="50"
              cy="50"
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth="0.12"
              opacity="0.35"
              strokeDasharray="0.5 0.5"
            />
            {/* Tick marks at cardinal hours */}
            {Array.from({ length: 12 }).map((_, ti) => {
              const angle = (ti / 12) * Math.PI * 2;
              const x1 = 50 + (ring.r - 1.2) * Math.cos(angle);
              const y1 = 50 + (ring.r - 1.2) * Math.sin(angle);
              const x2 = 50 + ring.r * Math.cos(angle);
              const y2 = 50 + ring.r * Math.sin(angle);
              return (
                <line
                  key={ti}
                  x1={x1} y1={y1}
                  x2={x2} y2={y2}
                  stroke={ring.color}
                  strokeWidth="0.15"
                  opacity="0.4"
                />
              );
            })}
            {/* Orbiting marker group */}
            <motion.g
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              {Array.from({ length: ring.markers }).map((_, mi) => {
                const angle = (mi / ring.markers) * Math.PI * 2;
                const x = 50 + ring.r * Math.cos(angle);
                const y = 50 + ring.r * Math.sin(angle);
                return (
                  <g key={mi}>
                    <circle cx={x} cy={y} r="0.6" fill={ring.color} />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="1.2"
                      fill="none"
                      stroke={ring.color}
                      strokeWidth="0.1"
                      animate={reduced ? {} : { opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1.8, delay: mi * 0.12, repeat: Infinity }}
                    />
                  </g>
                );
              })}
            </motion.g>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2 left-3 right-3 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-2">
            Quiet machines · 3am
          </p>
          <h2 className="italic-accent text-3xl md:text-4xl text-bone-100 max-w-md leading-tight">
            Monday mornings, quieter.
          </h2>
        </div>
        <div className="hidden md:block font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 text-right">
          <div>0 * * * * · hourly</div>
          <div>0 0 * * 1 · weekly</div>
          <div>*/5 * * * * · 5min</div>
        </div>
      </div>
    </div>
  );
}
