import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * AgentsHero. 3 glowing orbs spawning and passing tokens between them.
 * Orchestration diagram in light.
 */
export default function AgentsHero() {
  const reduced = useReducedMotionPreference();

  // 3 orbs positioned around the frame
  const orbs = [
    { x: 25, y: 45, label: "Planner", color: "#D4FF3A", delay: 0 },
    { x: 70, y: 35, label: "Toolbelt", color: "#B54656", delay: 0.3 },
    { x: 55, y: 75, label: "Memory", color: "#F5EFE6", delay: 0.6 },
  ];

  // Token paths: (from-orb, to-orb) pairs that loop
  const tokenPaths = [
    { from: 0, to: 1, delay: 0 },
    { from: 1, to: 2, delay: 1.2 },
    { from: 2, to: 0, delay: 2.4 },
    { from: 0, to: 2, delay: 3.6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 30% 40%, rgba(58,10,21,0.6), transparent 55%), radial-gradient(circle at 75% 60%, rgba(107,21,33,0.45), transparent 55%), #0A0708"
      }} />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint connective lines */}
        {tokenPaths.map((p, i) => {
          const a = orbs[p.from];
          const b = orbs[p.to];
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="#D4FF3A"
              strokeWidth="0.08"
              strokeDasharray="0.8 0.8"
              opacity="0.25"
            />
          );
        })}

        {/* Orbs */}
        {orbs.map((orb, i) => (
          <g key={i} style={{ color: orb.color }}>
            <motion.circle
              cx={orb.x}
              cy={orb.y}
              r="10"
              fill="url(#orb-core)"
              initial={reduced ? {} : { scale: 0.7, opacity: 0.4 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 3,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <circle
              cx={orb.x}
              cy={orb.y}
              r="2.2"
              fill={orb.color}
            />
            <circle
              cx={orb.x}
              cy={orb.y}
              r="0.9"
              fill="#F5EFE6"
            />
          </g>
        ))}

        {/* Tokens flying between orbs */}
        {!reduced && tokenPaths.map((p, i) => {
          const a = orbs[p.from];
          const b = orbs[p.to];
          return (
            <motion.circle
              key={i}
              r="0.8"
              fill="#D4FF3A"
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={{
                cx: [a.x, b.x],
                cy: [a.y, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 3.6,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 0.6px #D4FF3A)" }}
            />
          );
        })}
      </svg>

      {/* Orb labels */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute font-mono text-[10px] tracking-[0.25em] uppercase text-bone-100/70"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y + 12}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          {orb.label}
        </div>
      ))}

      <div className="absolute bottom-2 left-3 right-3 md:bottom-6 md:left-8 md:right-8">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-2">
          Orchestration
        </p>
        <h2 className="italic-accent text-3xl md:text-4xl text-bone-100 max-w-md leading-tight">
          Not a chatbot. A process.
        </h2>
      </div>
    </div>
  );
}
