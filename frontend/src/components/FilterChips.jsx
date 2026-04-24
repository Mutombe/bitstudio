import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useCursorHover } from "../hooks/useCursor.jsx";

/**
 * FilterChips — editorial, memorable chip cluster.
 *   - Inactive: transparent bg, maroon-400/30 border, bone-100/70 text
 *   - Active:   solid maroon-600 bg, bone-100 text, chartreuse bottom-border 2px
 *   - Each chip shows a count bubble
 *   - "All" chip gets a small orbit icon
 *   - Hover: subtle 2px lift, chartreuse sweep on active chip
 *   - Mobile: horizontal overflow-x-auto, active chip scrolls into center view
 */
export default function FilterChips({ chips, filter, onChange, counts }) {
  const hover = useCursorHover("hover", "");
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  // Scroll active chip into center on mobile when filter changes
  useEffect(() => {
    const container = containerRef.current;
    const active = activeRef.current;
    if (!container || !active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const delta =
      aRect.left + aRect.width / 2 - (cRect.left + cRect.width / 2);
    container.scrollBy({ left: delta, behavior: "smooth" });
  }, [filter]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 py-1"
    >
      <div className="flex flex-nowrap md:flex-wrap gap-2.5 md:gap-3 w-max md:w-auto">
        {chips.map((c) => {
          const active = c.id === filter;
          const isAll = c.id === "all";
          const count = counts?.[c.id] ?? 0;
          return (
            <motion.button
              key={c.id}
              ref={active ? activeRef : null}
              {...hover}
              onClick={() => onChange(c.id)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 font-display text-[11px] uppercase tracking-[0.2em] font-semibold ${
                active
                  ? "bg-maroon-600 text-bone-100 border border-maroon-600"
                  : "bg-transparent text-bone-100/70 border border-maroon-400/30 hover:text-bone-100 hover:border-maroon-400/60"
              }`}
            >
              {isAll && (
                <CircleNotchIcon
                  size={12}
                  weight={active ? "bold" : "regular"}
                  className={active ? "text-signal animate-spin-slow" : "text-signal/70"}
                />
              )}
              <span>{c.label}</span>
              {count > 0 && (
                <span
                  className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[9px] tabular-nums ${
                    active
                      ? "bg-bone-100/25 text-bone-100"
                      : "bg-maroon-400/10 text-bone-100/60"
                  }`}
                >
                  {count}
                </span>
              )}

            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Compute counts for each filter chip.
 * - "all" -> total
 * - "recently-live" / "experimentation" -> kind match
 * - other -> tag match
 */
export function computeCounts(projects, chips) {
  const counts = {};
  chips.forEach((c) => {
    if (c.id === "all") counts[c.id] = projects.length;
    else if (c.id === "recently-live")
      counts[c.id] = projects.filter((p) => p.kind === "recently-live").length;
    else if (c.id === "experimentation")
      counts[c.id] = projects.filter((p) => p.kind === "experimentation").length;
    else counts[c.id] = projects.filter((p) => p.tag === c.id).length;
  });
  return counts;
}
