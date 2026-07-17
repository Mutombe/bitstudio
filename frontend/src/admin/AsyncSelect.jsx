import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";

/**
 * A type-to-search picker backed by the server.
 *
 * A plain <select> has to load every option up front, which means it either
 * caps out (and silently hides the rest) or hauls the whole table. This asks
 * the server for matches as you type, so it works the same with 6 records or
 * 60,000 — and it's faster to use than scrolling a long dropdown.
 *
 *   search(q)  -> Promise<[{id, name}]>
 *   value      -> {id, name} | null
 *   onChange   -> (option | null)
 */
export default function AsyncSelect({
  value,
  onChange,
  search,
  placeholder = "Search…",
  emptyLabel = "Not linked",
  testId,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  const run = useCallback(
    (term) => {
      setLoading(true);
      search(term)
        .then((rows) => setOptions(rows || []))
        .catch(() => setOptions([]))
        .finally(() => setLoading(false));
    },
    [search]
  );

  // Debounce the query; every keystroke should not hit the API.
  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => run(q), 220);
    return () => clearTimeout(t);
  }, [q, open, run]);

  // Close on outside click.
  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
        setQ("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pick = (option) => {
    onChange(option);
    setOpen(false);
    setQ("");
  };

  return (
    <div className="relative mt-2" ref={boxRef} data-testid={testId}>
      {open ? (
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border border-signal outline-none rounded-md px-3 py-2 text-sm"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between gap-2 bg-[color:var(--color-ink)] border border-white/15 hover:border-white/30 rounded-md px-3 py-2 text-sm text-left"
        >
          <span className={value ? "text-bone-100" : "text-bone-100/45"}>
            {value ? value.name : emptyLabel}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            {value && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear"
                onClick={(e) => { e.stopPropagation(); onChange(null); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onChange(null); } }}
                className="text-bone-100/40 hover:text-maroon-400"
              >
                <XIcon size={12} />
              </span>
            )}
            <CaretDownIcon size={12} className="text-bone-100/40" />
          </span>
        </button>
      )}

      {open && (
        <ul className="absolute z-30 mt-1 w-full max-h-56 overflow-y-auto bg-maroon-950 border border-white/15 rounded-md shadow-xl">
          <li>
            <button
              type="button"
              onClick={() => pick(null)}
              className="w-full text-left px-3 py-2 text-sm text-bone-100/50 hover:bg-white/5"
            >
              {emptyLabel}
            </button>
          </li>
          {loading && <li className="px-3 py-2 text-xs text-bone-100/40">Searching…</li>}
          {!loading && options.length === 0 && (
            <li className="px-3 py-2 text-xs text-bone-100/40">No matches.</li>
          )}
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => pick(o)}
                className="w-full text-left px-3 py-2 text-sm text-bone-100/90 hover:bg-white/5"
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
