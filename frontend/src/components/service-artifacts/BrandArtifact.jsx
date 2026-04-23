/**
 * Brand artifact — 4 color chips in a row, each with its hex label.
 * The palette is Bit Studio's own: maroon · oxblood · bone · signal.
 * Idle: no motion (this one stays still — a chip is a chip).
 * Hover: ring around each chip pulses subtly via group-hover CSS.
 */
const CHIPS = [
  { hex: "#8C1E2C", name: "maroon" },
  { hex: "#3A0A15", name: "oxblood" },
  { hex: "#F5EFE6", name: "bone" },
  { hex: "#D4FF3A", name: "signal" },
];

export default function BrandArtifact() {
  return (
    <div className="flex gap-2 w-full">
      {CHIPS.map((c) => (
        <div key={c.hex} className="flex flex-col gap-1 flex-1 min-w-0">
          <div
            className="w-full aspect-square rounded-[1px] border border-white/5 transition-transform duration-400 group-hover:-translate-y-0.5"
            style={{ background: c.hex }}
            aria-label={c.name}
          />
          <span className="font-mono text-[8px] tracking-[0.05em] text-bone-100/40 truncate">
            {c.hex}
          </span>
        </div>
      ))}
    </div>
  );
}
