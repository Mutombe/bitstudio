/**
 * SectionLabel — "§ 01 — Preamble" style eyebrow label.
 *
 * When `targetId` is provided (or `onClick`), the chapter number + title are
 * rendered as a button that smooth-scrolls to the target section (or runs the
 * provided action). No target → non-interactive label.
 */
export default function SectionLabel({
  chapter,
  title,
  children,
  align = "left",
  targetId,
  onClick,
}) {
  const interactive = Boolean(targetId || onClick);

  const handleClick = () => {
    if (onClick) return onClick();
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const inner = (
    <p className="label-mono text-bone-100/50">
      <span className="text-maroon-400">{chapter}</span>
      {" "}— {title}
    </p>
  );

  return (
    <div className={`flex items-center gap-4 ${align === "right" ? "justify-end" : ""}`}>
      <div className="w-8 h-px bg-maroon-500" />
      {interactive ? (
        <button
          type="button"
          onClick={handleClick}
          className="group text-left rounded-sm px-1 -mx-1 hover:text-signal transition-colors focus-visible:outline-signal"
          aria-label={`Jump to ${title}`}
        >
          <span className="label-mono text-bone-100/50 group-hover:text-signal transition-colors">
            <span className="text-maroon-400 group-hover:text-signal">{chapter}</span>
            {" "}— {title}
          </span>
        </button>
      ) : (
        inner
      )}
      {children}
    </div>
  );
}
