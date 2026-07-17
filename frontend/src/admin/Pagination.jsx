import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export const PAGE_SIZE = 50; // matches DRF's PAGE_SIZE

/**
 * Server-side pager for a DRF paginated response.
 *
 * `page` is the raw {count, next, previous, results} payload — using its real
 * `count` (not results.length) is the point: a list must never quietly show
 * page one and imply that's everything.
 */
export default function Pagination({ page, pageNum, onChange, pageSize = PAGE_SIZE, label = "records" }) {
  if (!page) return null;
  const total = page.count ?? 0;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (total === 0) return null;

  const from = (pageNum - 1) * pageSize + 1;
  const to = Math.min(pageNum * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-bone-100/60">
      <span data-testid="page-summary">
        {from}–{to} of <span className="text-bone-100/80 tabular-nums">{total}</span> {label}
      </span>
      {pages > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(1, pageNum - 1))}
            disabled={!page.previous}
            aria-label="Previous page"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-line-strong rounded-md hover:border-signal disabled:opacity-30 disabled:hover:border-line-strong"
          >
            <CaretLeftIcon size={12} /> Prev
          </button>
          <span className="tabular-nums">
            {pageNum} / {pages}
          </span>
          <button
            data-testid="next-page"
            onClick={() => onChange(pageNum + 1)}
            disabled={!page.next}
            aria-label="Next page"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-line-strong rounded-md hover:border-signal disabled:opacity-30 disabled:hover:border-line-strong"
          >
            Next <CaretRightIcon size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
