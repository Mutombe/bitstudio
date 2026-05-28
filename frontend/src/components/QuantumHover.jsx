import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * QuantumHover. Wraps a card/tile and, on hover (or long-press on touch),
 * reveals a particle field + orbital rings + chromatic aberration + a subtle
 * 3D tilt toward the cursor. "Zoom into the fabric of the universe."
 *
 * Designed to be pointer-events:none on all overlays so clicks still reach
 * the wrapped child.
 */

// Pre-computed stable particle positions so we don't re-randomize per render
const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  // deterministic pseudo-random based on index so SSR-safe
  const a = (i * 137.5) % 360;
  const r = 22 + ((i * 13) % 28); // percent from center
  const x = 50 + r * Math.cos((a * Math.PI) / 180);
  const y = 50 + r * Math.sin((a * Math.PI) / 180);
  const s = 1 + ((i * 7) % 3) * 0.5;
  return { x, y, s, delay: (i % 5) * 0.08 };
});

export default function QuantumHover({ children, className = "", strength = 3, forceActive = false }) {
  const ref = useRef(null);
  const [hoverActive, setHoverActive] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const pressTimer = useRef(null);
  // rAF-throttle mousemove so the tilt update never exceeds 1 react-render per frame.
  // This keeps the custom cursor (driven by its own rAF loop) from feeling laggy
  // when sliding over a wrapped card.
  const pendingMove = useRef(null);
  const moveRaf = useRef(0);

  // Effects show when mouse-hovered OR when parent pins forceActive
  // (e.g. mobile carousel says "this card is centered. Light it up").
  const active = hoverActive || forceActive;

  useEffect(() => () => {
    if (moveRaf.current) cancelAnimationFrame(moveRaf.current);
  }, []);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      // Cache the event coords; flush at most once per frame.
      pendingMove.current = { x: e.clientX, y: e.clientY };
      if (moveRaf.current) return; // already queued
      moveRaf.current = requestAnimationFrame(() => {
        moveRaf.current = 0;
        const p = pendingMove.current;
        if (!p || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (p.x - rect.left) / rect.width; // 0..1
        const py = (p.y - rect.top) / rect.height;
        const ry = (px - 0.5) * strength * 2; // rotateY
        const rx = -(py - 0.5) * strength * 2; // rotateX
        setTilt({ rx, ry });
      });
    },
    [strength]
  );

  const enter = () => setHoverActive(true);
  const leave = () => {
    setHoverActive(false);
    setTilt({ rx: 0, ry: 0 });
  };

  // Touch: long-press fires the effect briefly
  const touchStart = () => {
    pressTimer.current = setTimeout(() => setHoverActive(true), 220);
  };
  const touchEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setTimeout(() => setHoverActive(false), 600);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseMove={handleMove}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchCancel={touchEnd}
      className={`quantum-hover relative ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Outer breathing radial glow (maroon). Fades in on hover */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -inset-6 z-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(181,70,86,0.35), rgba(107,21,33,0.15) 45%, transparent 70%)",
              filter: "blur(20px)",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(212,255,58,0.08), transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbital rings. Slow rotate */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="rings"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{ width: "115%", height: "115%" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.ellipse
                  cx="50" cy="50" rx="48" ry="18"
                  fill="none"
                  stroke="#D4FF3A"
                  strokeWidth="0.15"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.ellipse
                  cx="50" cy="50" rx="40" ry="46"
                  fill="none"
                  stroke="#D4FF3A"
                  strokeWidth="0.12"
                  animate={{ opacity: [0.15, 0.5, 0.15] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{ width: "108%", height: "108%" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.ellipse
                  cx="50" cy="50" rx="46" ry="30"
                  fill="none"
                  stroke="#B54656"
                  strokeWidth="0.18"
                  animate={{ opacity: [0.25, 0.55, 0.25] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />
              </svg>
            </motion.div>

            {/* Particle constellation. Rotates slowly as a group */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-signal"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.s}px`,
                    height: `${p.s}px`,
                    boxShadow: "0 0 6px rgba(212,255,58,0.9)",
                  }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
                  transition={{
                    duration: 2 + (i % 3) * 0.6,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chromatic aberration wrap. Fades in on hover */}
      <motion.div
        animate={
          active
            ? { filter: "drop-shadow(2px 0 0 rgba(255,0,50,0.35)) drop-shadow(-2px 0 0 rgba(0,240,255,0.3))" }
            : { filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        {/* 3D tilt */}
        <motion.div
          animate={{
            rotateX: tilt.rx,
            rotateY: tilt.ry,
            scale: active ? 1.015 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
