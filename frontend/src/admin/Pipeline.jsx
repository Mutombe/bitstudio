import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { SOURCE_LABEL, STAGES, formatDate } from "./constants.js";

/**
 * Kanban board over Lead.status.
 *
 * Drag-and-drop uses the native HTML5 API rather than a library — the board
 * is one dimensional (a card moves between columns) and pulling in a DnD
 * dependency for that would be a poor trade on a bundle this size.
 *
 * Moves are optimistic: the card lands in the new column immediately and
 * rolls back if the PATCH fails. A salesperson dragging a card should never
 * wait on a round trip.
 */
export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(null);

  const load = useCallback(() => {
    // page_size is capped server-side at 500, so this cannot haul the table.
    crm
      .listLeads({ page_size: 500 })
      .then((page) => setLeads(page.results))
      .catch(() => setError("Could not load the pipeline."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const move = async (leadId, status) => {
    const previous = leads;
    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    );
    try {
      await crm.updateLead(leadId, { status });
    } catch {
      setLeads(previous); // roll back; the server is the source of truth
      setError("That move did not stick. Refresh and try again.");
    }
  };

  const onDrop = (event, status) => {
    event.preventDefault();
    setDragOver(null);
    const leadId = event.dataTransfer.getData("text/plain");
    const lead = leads.find((l) => l.id === leadId);
    if (lead && lead.status !== status) move(leadId, status);
  };

  if (loading) {
    return (
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        Loading…
      </p>
    );
  }

  return (
    <div>
      <AdminHead title="Pipeline" />

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Pipeline</h1>
          <p className="text-sm text-bone-100/55 mt-1">
            Drag a card to move the deal. {leads.length} leads on the board.
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
          const column = leads.filter((lead) => lead.status === stage.id);
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
              className={`rounded-sm border p-3 min-h-[60vh] transition-colors ${
                dragOver === stage.id
                  ? "border-signal bg-signal/5"
                  : "border-white/10 bg-maroon-950/20"
              }`}
            >
              <header className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: stage.accent }}
                >
                  {stage.label}
                </span>
                <span className="font-mono text-[10px] text-bone-100/40 tabular-nums">
                  {column.length}
                </span>
              </header>

              <div className="space-y-3">
                {column.map((lead) => (
                  <article
                    key={lead.id}
                    data-testid="lead-card"
                    data-lead-id={lead.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", lead.id)}
                    className="group rounded-sm border border-white/10 bg-[color:var(--color-ink)] p-3 cursor-grab active:cursor-grabbing hover:border-signal/50 transition-colors"
                  >
                    <Link to={`/admin/leads/${lead.id}`} className="block">
                      <p className="text-sm text-bone-100 leading-tight mb-1 group-hover:text-signal transition-colors">
                        {lead.name}
                      </p>
                      {lead.company && (
                        <p className="text-xs text-bone-100/50 mb-2">{lead.company}</p>
                      )}
                      {lead.offer_slug && (
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/60 mb-2 truncate">
                          {lead.offer_slug}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-white/5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-bone-100/40">
                          {SOURCE_LABEL[lead.source] || lead.source}
                        </span>
                        <span className="text-[10px] text-bone-100/40">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-bone-100/50">
                        {lead.owner ? lead.owner.name : "Unassigned"}
                      </p>
                    </Link>
                  </article>
                ))}

                {column.length === 0 && (
                  <p className="text-[11px] text-bone-100/25 py-6 text-center">
                    Nothing here.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
