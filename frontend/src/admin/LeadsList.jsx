import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaretDownIcon, CaretUpIcon, PlusIcon, UploadSimpleIcon, XIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGES, STAGE_LABEL, formatDate, formatMoney, scoreColor } from "./constants.js";

const PAGE_SIZE = 50; // matches DRF's default page size

// Which columns can be sorted, and the field name the API expects.
const COLUMNS = [
  { label: "Name", sort: "name" },
  { label: "Score", sort: "score" },
  { label: "Offer", sort: null },
  { label: "Value", sort: "value" },
  { label: "Stage", sort: "status" },
  { label: "Owner", sort: null },
  { label: "Arrived", sort: "created_at" },
];

function TagChip({ tag }) {
  return (
    <span
      className="inline-block font-mono text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm border"
      style={{ color: tag.color, borderColor: `${tag.color}55` }}
    >
      {tag.name}
    </span>
  );
}

export default function LeadsList() {
  const { user } = useAuth();
  const canManage = user?.can_assign_leads;

  const [page, setPage] = useState(null);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({ q: "", status: "", owner: "", tag: "" });
  const [sort, setSort] = useState({ sort: "created_at", dir: "desc" });
  const [pageNum, setPageNum] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [views, setViews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    crm.listViews().then(setViews).catch(() => setViews([]));
  }, []);

  const applyView = (v) => {
    const p = v.params || {};
    setFilters({ q: p.q || "", status: p.status || "", owner: p.owner || "", tag: p.tag || "" });
    setSort({ sort: p.sort || "created_at", dir: p.dir || "desc" });
    setPageNum(1);
    setSelected(new Set());
  };

  const saveView = async () => {
    const name = window.prompt("Name this view:");
    if (!name?.trim()) return;
    const v = await crm.createView({ name: name.trim(), params: { ...filters, ...sort }, shared: false });
    setViews((prev) => [...prev, v]);
  };

  const deleteView = async (id, e) => {
    e.stopPropagation();
    await crm.deleteView(id);
    setViews((prev) => prev.filter((v) => v.id !== id));
  };

  const load = useCallback(() => {
    crm
      .listLeads({ ...filters, ...sort, page: pageNum })
      .then(setPage)
      .catch(() => setError("Could not load leads."));
  }, [filters, sort, pageNum]);

  useEffect(() => {
    const timer = setTimeout(load, 250); // debounce the search box
    return () => clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    crm.listTags().then(setTags).catch(() => setTags([]));
  }, []);

  const update = (key) => (event) => {
    setPageNum(1);
    setSelected(new Set());
    setFilters((f) => ({ ...f, [key]: event.target.value }));
  };

  const toggleSort = (field) => {
    if (!field) return;
    setPageNum(1);
    setSort((s) =>
      s.sort === field
        ? { sort: field, dir: s.dir === "asc" ? "desc" : "asc" }
        : { sort: field, dir: "asc" }
    );
  };

  const rows = page?.results || [];
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggleRow = (id) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));

  const runBulk = async (action, value) => {
    const ids = [...selected];
    if (ids.length === 0) return;
    if (action === "delete" && !window.confirm(`Delete ${ids.length} lead(s)?`)) return;
    try {
      await crm.bulk(ids, action, value);
      setSelected(new Set());
      load();
    } catch (err) {
      setError(err.data?.detail || "Bulk action failed.");
    }
  };

  return (
    <div>
      <AdminHead title="Leads" />

      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-1">Leads</h1>
          <p className="text-sm text-bone-100/55">
            {page ? `${page.count} matching` : "Loading…"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/leads/import" className="btn btn-ghost">
            <UploadSimpleIcon size={14} /> Import
          </Link>
          <a href={crm.exportUrl({ ...filters, ...sort })} className="btn btn-ghost">
            Export CSV
          </a>
          <Link to="/admin/leads/new" data-testid="new-lead-btn" className="btn btn-primary">
            <PlusIcon size={14} weight="bold" /> New lead
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          value={filters.q}
          onChange={update("q")}
          placeholder="Search name, email, company, offer…"
          className="flex-1 min-w-[240px] bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm"
        />
        <select value={filters.status} onChange={update("status")} className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm">
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <select value={filters.owner} onChange={update("owner")} className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm">
          <option value="">Anyone</option>
          <option value="me">Assigned to me</option>
          <option value="unassigned">Unassigned</option>
        </select>
        <select value={filters.tag} onChange={update("tag")} className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm">
          <option value="">All tags</option>
          {tags.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.lead_count})</option>)}
        </select>
      </div>

      {/* Saved views */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/35">Views:</span>
        {views.map((v) => (
          <span
            key={v.id}
            onClick={() => applyView(v)}
            className="group inline-flex items-center gap-1.5 cursor-pointer font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm border border-white/15 text-bone-100/70 hover:border-signal hover:text-signal"
          >
            {v.name}
            <button onClick={(e) => deleteView(v.id, e)} className="opacity-0 group-hover:opacity-100 hover:text-maroon-400" aria-label={`Delete ${v.name}`}>
              <XIcon size={10} />
            </button>
          </span>
        ))}
        <button onClick={saveView} data-testid="save-view" className="font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm border border-dashed border-white/20 text-bone-100/50 hover:text-signal hover:border-signal">
          + Save current
        </button>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div data-testid="bulk-bar" className="flex flex-wrap items-center gap-3 mb-4 p-3 border border-signal/40 rounded-sm bg-signal/5">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-signal">
            {selected.size} selected
          </span>
          <select
            data-testid="bulk-stage"
            defaultValue=""
            onChange={(e) => { if (e.target.value) { runBulk("status", e.target.value); e.target.value = ""; } }}
            className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-2 pr-7 py-1.5 text-xs"
          >
            <option value="">Set stage…</option>
            {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          {tags.length > 0 && (
            <select
              defaultValue=""
              onChange={(e) => { if (e.target.value) { runBulk("add_tag", e.target.value); e.target.value = ""; } }}
              className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-2 pr-7 py-1.5 text-xs"
            >
              <option value="">Add tag…</option>
              {tags.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          )}
          {canManage && (
            <button onClick={() => runBulk("assign", user.id)} className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-100/70 hover:text-signal">
              Assign to me
            </button>
          )}
          {canManage && (
            <button onClick={() => runBulk("assign", "")} className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-100/70 hover:text-signal">
              Unassign
            </button>
          )}
          {canManage && (
            <button data-testid="bulk-delete" onClick={() => runBulk("delete")} className="font-mono text-[10px] tracking-[0.15em] uppercase text-maroon-400 hover:underline">
              Delete
            </button>
          )}
          <button onClick={() => setSelected(new Set())} className="ml-auto text-bone-100/40 hover:text-bone-100">
            <XIcon size={14} />
          </button>
        </div>
      )}

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      <div className="border border-white/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-4 py-3 w-8">
                <input type="checkbox" data-testid="select-all" checked={allSelected} onChange={toggleAll} aria-label="Select all" />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.label}
                  onClick={() => toggleSort(col.sort)}
                  className={`font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3 ${col.sort ? "cursor-pointer hover:text-bone-100 select-none" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sort.sort === col.sort && col.sort && (
                      sort.dir === "asc" ? <CaretUpIcon size={10} /> : <CaretDownIcon size={10} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={lead.id} className={`border-b border-white/5 hover:bg-white/[0.02] ${selected.has(lead.id) ? "bg-signal/[0.04]" : ""}`}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(lead.id)} onChange={() => toggleRow(lead.id)} aria-label={`Select ${lead.name}`} />
                </td>
                <td className="px-4 py-3">
                  <Link to={`/admin/leads/${lead.id}`} className="text-bone-100 hover:text-signal">
                    {lead.name}
                  </Link>
                  <p className="text-xs text-bone-100/40">{lead.company || lead.email}</p>
                  {lead.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {lead.tags.map((t) => <TagChip key={t.id} tag={t} />)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 rounded-sm font-mono text-[11px] tabular-nums font-bold"
                    style={{ color: scoreColor(lead.score), border: `1px solid ${scoreColor(lead.score)}44` }}
                    title="Lead score"
                  >
                    {lead.score}
                  </span>
                </td>
                <td className="px-4 py-3 text-bone-100/70 text-xs">{lead.offer_slug || "—"}</td>
                <td className="px-4 py-3 text-bone-100/80 tabular-nums text-xs">
                  {Number(lead.value) > 0 ? formatMoney(lead.value) : "—"}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full border border-white/15">
                    {STAGE_LABEL[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-bone-100/70 text-xs">
                  {lead.owner ? lead.owner.name : <span className="text-maroon-400">Unassigned</span>}
                </td>
                <td className="px-4 py-3 text-bone-100/50 text-xs whitespace-nowrap">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="text-center text-bone-100/40 py-12 text-sm">No leads match those filters.</p>
        )}
      </div>

      {page && page.count > PAGE_SIZE && (
        <div className="flex items-center justify-between mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50">
          <span>Page {pageNum} of {Math.ceil(page.count / PAGE_SIZE)}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => { setPageNum((n) => Math.max(1, n - 1)); setSelected(new Set()); }} disabled={!page.previous} className="px-3 py-1.5 border border-white/15 rounded-sm hover:border-signal disabled:opacity-30 disabled:hover:border-white/15">
              Prev
            </button>
            <button data-testid="next-page" onClick={() => { setPageNum((n) => n + 1); setSelected(new Set()); }} disabled={!page.next} className="px-3 py-1.5 border border-white/15 rounded-sm hover:border-signal disabled:opacity-30 disabled:hover:border-white/15">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
