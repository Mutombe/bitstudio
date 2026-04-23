import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

export default function ProjectTile({ project, index = 0, size = "md" }) {
  const hover = useCursorHover("view", "View");
  const p = project;

  // Asymmetric sizing: featured tiles get more weight
  const isLarge = size === "lg";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden ${isLarge ? "md:col-span-7" : "md:col-span-5"}`}
    >
      <Link to={`/work/${p.slug}`} {...hover} className="block">
        {/* Preview panel — brand-color mesh */}
        <div
          className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, ${hex(p.palette[0], 0.9)}, transparent 60%),
              radial-gradient(circle at 80% 80%, ${hex(p.palette[1] || p.palette[0], 0.7)}, transparent 55%),
              ${p.palette[2] || "#0a0708"}
            `,
          }}
        >
          {/* Wireframe browser chrome at the top */}
          <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-2 border-b opacity-40"
            style={{
              borderColor: hex(p.palette[2] || "#F5EFE6", 0.15),
              background: hex("#000000", 0.15),
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: hex(p.palette[2] || "#F5EFE6", 0.4) }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: hex(p.palette[2] || "#F5EFE6", 0.4) }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: hex(p.palette[2] || "#F5EFE6", 0.4) }} />
            <span className="flex-1 text-[8px] md:text-[9px] font-mono truncate ml-2" style={{ color: hex(p.palette[2] || "#F5EFE6", 0.6) }}>
              {p.url.replace(/^https?:\/\//, "").slice(0, 48)}
            </span>
          </div>

          {/* Gigantic name, monochromed into the mesh */}
          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ color: hex("#F5EFE6", 0.75) }}
              >
                {p.year} · {p.tag}
              </p>
              <h3
                className="display-lg max-w-[14ch]"
                style={{ color: p.palette[2] || "#F5EFE6" }}
              >
                {p.name}
              </h3>
            </div>
          </div>

          {/* Grain layer */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Hover reveal overlay */}
          <div className="absolute inset-0 bg-[color:var(--color-ink)]/0 group-hover:bg-[color:var(--color-ink)]/50 transition-colors duration-500" />
          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone-100 text-ink opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 font-mono text-[10px] tracking-[0.2em] uppercase">
            Open artifact
            <ArrowUpRightIcon size={12} weight="bold" />
          </div>

          {/* Kind pill */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] uppercase rounded-full"
            style={{
              background: p.kind === "recently-live" ? "#D4FF3A" : hex("#F5EFE6", 0.9),
              color: "#0A0708",
            }}
          >
            {p.kind === "recently-live" ? "Recently Live" : "Experimentation"}
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 text-bone-100/80">
          <div className="flex items-center gap-3">
            <div className="swatch-strip w-14">
              {p.palette.map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50">
              {p.palette[0]} · {p.palette[1] || "—"}
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase hover-line">
            Read →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function hex(h, a = 1) {
  if (!h) return `rgba(255,255,255,${a})`;
  const m = h.replace("#", "");
  const full =
    m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
