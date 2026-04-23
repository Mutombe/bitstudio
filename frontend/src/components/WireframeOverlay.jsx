import { motion } from "framer-motion";

/**
 * WireframeOverlay — cross-sectional architectural linework.
 * Radiating vectors, golden-ratio spirals, orbital paths — in maroon-200/20.
 * Pure SVG, no images.
 */
export default function WireframeOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="wfFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(235,194,199,0.22)" />
          <stop offset="70%" stopColor="rgba(235,194,199,0.08)" />
          <stop offset="100%" stopColor="rgba(235,194,199,0)" />
        </radialGradient>
      </defs>

      {/* Radiating vectors from the right */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const cx = 1200;
        const cy = 450;
        const r1 = 40;
        const r2 = 900;
        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy + Math.sin(angle) * r1;
        const x2 = cx + Math.cos(angle) * r2;
        const y2 = cy + Math.sin(angle) * r2;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#wfFade)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Orbital rings */}
      {[120, 220, 330, 460, 600].map((r, i) => (
        <motion.ellipse
          key={r}
          cx={1200} cy={450}
          rx={r} ry={r * 0.55}
          fill="none"
          stroke="rgba(181,70,86,0.18)"
          strokeWidth="0.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: i % 2 ? 360 : -360 }}
          transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "1200px 450px" }}
        />
      ))}

      {/* Golden ratio spiral — crude approximation as arcs */}
      <path
        d="
          M 200 600
          A 60 60 0 0 1 260 540
          A 97 97 0 0 1 357 637
          A 157 157 0 0 1 200 794
          A 254 254 0 0 1 -54 540
        "
        fill="none"
        stroke="rgba(235,194,199,0.18)"
        strokeWidth="0.5"
      />

      {/* Hairline grid cues */}
      <line x1="0" y1="450" x2="1600" y2="450" stroke="rgba(245,239,230,0.04)" strokeWidth="0.5" />
      <line x1="800" y1="0" x2="800" y2="900" stroke="rgba(245,239,230,0.04)" strokeWidth="0.5" />
    </svg>
  );
}
