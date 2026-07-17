import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { crm } from "../lib/api.js";
import { prefetchLead } from "../lib/prefetch.js";
import { AdminHead } from "./AdminLayout.jsx";
import { SOURCE_LABEL, STAGES, formatDate } from "./constants.js";
import { BoardSkeleton } from "./Skeleton.jsx";

/**
 * Kanban board over Lead.status.
 *
 * Each column is fetched and paged independently. That matters: the board used
 * to pull one 500-lead page and slice it client-side, so past 500 leads it
 * silently dropped them — a board that looks complete but isn't is worse than
 * one that says "showing 25 of 900". Column headers show the true server count
 * and load more on demand.
 *
 * Drag-and-drop uses the native HTML5 API — the board is one dimensional (a
 * card moves between columns), so a DnD dependency would be a poor trade.
 * Moves are optimistic and roll back if the PATCH fails.
 */
const PER_COLUMN = 25;

const emptyColumns = () =>
  Object.fromEntries(STAGES.map((s) => [s.id, { items: [], count: 0, page: 1 }]));

export default function Pipeline() {
  const [columns, setColumns] = useState(emptyColumns);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const pages = await Promise.all(
        STAGES.map((s) =>
          crm
            .listLeads({ status: s.id, page_size: PER_COLUMN, page: 1 })
            .catch(() => ({ count: 0, results: [] }))
        )
      );
      setColumns(
        Object.fromEntries(
          STAGES.map((s, i) => [
            s.id,
            { items: pages[i].results || [], count: pages[i].count || 0, page: 1 },
          ])
        )
      );
    } catch {
      setError("Could not load the pipeline.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loadMore = async (stageId) => {
    const col = columns[stageId];
    const next = col.page + 1;
    try {
      const p = await crm.listLeads({ status: stageId, page_size: PER_COLUMN, page: next });
      setColumns((prev) => ({
        ...prev,
        [stageId]: {
          items: [...prev[stageId].items, ...(p.results || [])],
          count: p.count ?? prev[stageId].count,
          page: next,
        },
      }));
    } catch {
      toast.error("Could not load more.");
    }
  };

  const move = async (leadId, toStatus) => {
    let fromStatus = null;
    let lead = null;
    for (const stage of STAGES) {
      const found = columns[stage.id].items.find((l) => l.id === leadId);
      if (found) {
        fromStatus = stage.id;
        lead = found;
        break;
      }
    }
    if (!lead || fromStatus === toStatus) return;

    const snapshot = columns;
    setColumns((prev) => ({
      ...prev,
      [fromStatus]: {
        ...prev[fromStatus],
        items: prev[fromStatus].items.filter((l) => l.id !== leadId),
        count: Math.max(0, prev[fromStatus].count - 1),
      },
      [toStatus]: {
        ...prev[toStatus],
        items: [{ ...lead, status: toStatus }, ...prev[toStatus].items],
        count: prev[toStatus].count + 1,
      },
    }));
    try {
      await crm.updateLead(leadId, { status: toStatus });
    } catch {
      setColumns(snapshot); // the server is the source of truth
      toast.error("That move did not stick.");
    }
  };

  const onDrop = (event, status) => {
    event.preventDefault();
    setDragOver(null);
    const leadId = event.dataTransfer.getData("text/plain");
    if (leadId) move(leadId, status);
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-xl md:text-2xl mb-6">Pipeline</h1>
        <BoardSkeleton columns={STAGES.length} />
      </div>
    );
  }

  const total = STAGES.reduce((sum, s) => sum + columns[s.id].count, 0);

  return (
    <div>
      <AdminHead title="Pipeline" />

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl">Pipeline</h1>
          <p className="text-sm text-bone-100/60 mt-1">
            Drag a card to move the deal. <span className="tabular-nums">{total}</span> leads on the board.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-maroon-400">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAGES.map((stage) => {
          const col = columns[stage.id];
          const more = col.count - col.items.length;
          return (
            <section
              key={stage.id}
              data-testid={`column-${stage.id}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(stage.id);
              }}
              onDragLeave={() => setDragOver((s) => (s === stage.id ? null : s))}
              onDrop={(e) => onDrop(e, stage.id)}
              // Three steps of elevation: the page is slate, the column sits a
              // shade lighter, and the cards are white on top of it. Without
              // that the cards would be white on white and vanish.
              className={`rounded-lg border p-3 min-h-[60vh] transition-colors ${
                dragOver === stage.id
                  ? "border-signal bg-signal/5"
                  : "border-line bg-bone-50"
              }`}
            >
              <header className="flex items-center justify-between mb-4 pb-2 border-b border-line">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: stage.accent }}
                >
                  {stage.label}
                </span>
                {/* True server count, not just what's rendered. */}
                <span className="font-mono text-[10px] text-bone-100/60 tabular-nums">
                  {col.count}
                </span>
              </header>

              <div className="space-y-3">
                {col.items.map((lead) => (
                  <article
                    key={lead.id}
                    data-testid="lead-card"
                    data-lead-id={lead.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", lead.id)}
                    onMouseEnter={() => prefetchLead(lead.id)}
                    className="group relative rounded-lg border border-line bg-maroon-950 p-3 shadow-xs cursor-grab active:cursor-grabbing hover:border-signal/50 hover:shadow-sm transition-all"
                  >
                    <Link to={`/admin/leads/${lead.id}`} className="block">
                      <p className="text-sm text-bone-100 leading-tight mb-1 group-hover:text-signal transition-colors">
                        {lead.name}
                      </p>
                      {lead.company && (
                        <p className="text-xs text-bone-100/60 mb-2">{lead.company}</p>
                      )}
                      {lead.offer_slug && (
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/60 mb-2 truncate">
                          {lead.offer_slug}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-line">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-bone-100/60">
                          {SOURCE_LABEL[lead.source] || lead.source}
                        </span>
                        <span className="text-[10px] text-bone-100/60">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-bone-100/60">
                        {lead.owner ? lead.owner.name : "Unassigned"}
                      </p>
                    </Link>
                  </article>
                ))}

                {col.items.length === 0 && (
                  <p className="text-[11px] text-bone-100/25 py-6 text-center">Nothing here.</p>
                )}

                {more > 0 && (
                  <button
                    data-testid={`load-more-${stage.id}`}
                    onClick={() => loadMore(stage.id)}
                    className="w-full py-2 text-[11px] text-bone-100/60 hover:text-signal border border-dashed border-line-strong hover:border-signal rounded-lg"
                  >
                    Load {Math.min(more, PER_COLUMN)} more ({more} left)
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
