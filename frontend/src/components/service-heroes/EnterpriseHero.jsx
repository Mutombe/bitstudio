import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotion.js";

/**
 * EnterpriseHero — network graph of 12 nodes connecting/disconnecting with
 *   chartreuse edges. Like an org chart made of light.
 */
const NODE_COUNT = 12;

export default function EnterpriseHero() {
  const reduced = useReducedMotionPreference();

  // Compute stable node positions once — arranged in a loose 2-ring pattern
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Inner ring of 4, outer ring of 8
      const inner = i < 4;
      const count = inner ? 4 : 8;
      const k = inner ? i : i - 4;
      const angle = (k / count) * Math.PI * 2 + (inner ? 0.2 : 0);
      const r = inner ? 15 : 32;
      arr.push({
        x: 50 + r * Math.cos(angle),
        y: 50 + r * Math.sin(angle),
        size: inner ? 1.4 : 1,
        i,
      });
    }
    return arr;
  }, []);

  // Seed a set of edges (i,j) to potentially draw
  const allEdges = useMemo(() => {
    const e = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        // Only keep medium-distance edges
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 45) e.push({ a: i, b: j, d });
      }
    }
    return e;
  }, [nodes]);

  // Currently "lit" edge indices (rotate them)
  const [litSet, setLitSet] = useState(new Set([0, 4, 8, 12]));

  useEffect(() => {
    if (reduced) return;
    let step = 0;
    const t = setInterval(() => {
      step += 1;
      const n = new Set();
      // Rolling set of ~8 lit edges
      for (let k = 0; k < 10; k++) {
        n.add((step * 3 + k * 7) % allEdges.length);
      }
      setLitSet(n);
    }, 1200);
    return () => clearInterval(t);
  }, [reduced, allEdges.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(107,21,33,0.35), transparent 60%), #0A0708"
      }} />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4FF3A" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4FF3A" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Edges */}
        {allEdges.map((e, i) => {
          const lit = litSet.has(i);
          const a = nodes[e.a];
          const b = nodes[e.b];
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={lit ? "#D4FF3A" : "#D4FF3A"}
              strokeWidth={lit ? 0.2 : 0.08}
              initial={false}
              animate={{ opacity: lit ? 0.85 : 0.12 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              filter={lit ? "url(#glow)" : undefined}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.size * 1.4}
              fill="url(#node-glow)"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 5) * 0.2,
              }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.size * 0.6}
              fill="#D4FF3A"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.size * 0.3}
              fill="#F5EFE6"
            />
          </g>
        ))}
      </svg>

      {/* Overlay label */}
      <div className="absolute bottom-2 left-3 right-3 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal/80 mb-2">
            Internal tools
          </p>
          <h2 className="italic-accent text-3xl md:text-4xl text-bone-100 max-w-md leading-tight">
            A company is a graph of decisions.
          </h2>
        </div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/40 hidden md:block">
          12 nodes · live
        </p>
      </div>
    </div>
  );
}
