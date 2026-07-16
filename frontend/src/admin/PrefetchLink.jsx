import { useNavigate } from "react-router-dom";

// A hyperlink that warms the destination on hover and navigates on click.
// Use it for cross-entity links (a lead's company, a company's lead) so the
// detail page opens instantly. `prefetch` is optional — a plain fast link
// without it still works.
export default function PrefetchLink({ to, prefetch, stopPropagation, className, children }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onMouseEnter={() => prefetch?.()}
      onFocus={() => prefetch?.()}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        navigate(to);
      }}
      className={className || "text-signal hover:underline"}
    >
      {children}
    </button>
  );
}
