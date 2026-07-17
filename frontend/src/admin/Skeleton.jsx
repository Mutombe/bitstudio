// Loading placeholders. A tool should show the *shape* of what's coming, not
// a bare "Loading…" — it reads as instant and tells you the layout up front.

export function Skeleton({ className = "", style }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden />;
}

// Stat-card grid for the dashboard.
export function StatGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-line rounded-lg p-5 bg-maroon-950">
          <Skeleton className="h-2.5 w-20 mb-4" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

// Generic table body while rows load.
export function TableSkeleton({ rows = 8, cols = 5 }) {
  return (
    <div className="border border-line rounded-lg overflow-hidden">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3.5 border-b border-line">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className="h-3"
              style={{ width: c === 0 ? "22%" : `${10 + ((r + c) % 3) * 4}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Kanban columns while the board loads.
export function BoardSkeleton({ columns = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: columns }).map((_, c) => (
        <div key={c} className="rounded-lg border border-line p-3 min-h-[40vh] bg-maroon-950">
          <Skeleton className="h-3 w-24 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: (c % 3) + 1 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-line p-3">
                <Skeleton className="h-3 w-2/3 mb-2" />
                <Skeleton className="h-2.5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// A record detail while it loads.
export function DetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-64 mb-3" />
      <Skeleton className="h-3 w-40 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-line rounded-lg p-5 bg-maroon-950">
              <Skeleton className="h-2.5 w-24 mb-4" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
        <div className="border border-line rounded-lg p-5 bg-maroon-950 h-fit">
          <Skeleton className="h-2.5 w-20 mb-4" />
          <Skeleton className="h-9 w-full mb-3" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  );
}
