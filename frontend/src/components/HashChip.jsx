import { Link } from "react-router-dom";

/**
 * HashChip. Small mono-type hashtag pill with a thin chartreuse border.
 *
 * When `to` is provided, becomes a <Link>. Otherwise a span.
 * Hover/focus: chartreuse fill, light orange glow.
 */
export function HashChip({ children, to, title }) {
  const base =
    "inline-flex items-center font-mono text-[10px] tracking-[0.08em] px-2 py-1 border border-signal/30 rounded-full text-signal/80 transition-all duration-300";
  const interactive =
    "hover:border-signal hover:text-signal hover:bg-signal/10 hover:shadow-[0_0_12px_rgba(212,255,58,0.35)] focus-visible:outline-signal";

  if (to) {
    return (
      <Link to={to} title={title || `Filter: ${children}`} className={`${base} ${interactive}`}>
        {children}
      </Link>
    );
  }

  // Non-interactive still gets hover line, same visual
  return (
    <span className={`${base} ${interactive}`}>
      {children}
    </span>
  );
}

export default HashChip;
