import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGES, STAGE_LABEL, formatDate, formatMoney } from "./constants.js";

const PAGE_SIZE = 50; // matches DRF's default page size

export default function LeadsList() {
  const [page, setPage] = useState(null);
  const [filters, setFilters] = useState({ q: "", status: "", owner: "" });
  const [pageNum, setPageNum] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    // Debounce the search box; every keystroke should not hit the API.
    const timer = setTimeout(() => {
      crm
        .listLeads({ ...filters, page: pageNum })
        .then(setPage)
        .catch(() => setError("Could not load leads."));
    }, 250);
    return () => clearTimeout(timer);
  }, [filters, pageNum]);

  // Any filter change resets to the first page — otherwise you can be stranded
  // on page 3 of a result set that now has one page.
  const update = (key) => (event) => {
    setPageNum(1);
    setFilters((f) => ({ ...f, [key]: event.target.value }));
  };

  return (
    <div>
      <AdminHead title="Leads" />

      <h1 className="font-display text-3xl md:text-4xl mb-1">Leads</h1>
      <p className="text-sm text-bone-100/55 mb-6">
        {page ? `${page.count} matching` : "Loading…"}
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={filters.q}
          onChange={update("q")}
          placeholder="Search name, email, company, offer…"
          className="flex-1 min-w-[240px] bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm"
        />
        <select
          value={filters.status}
          onChange={update("status")}
          className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm"
        >
          <option value="">All stages</option>
          {STAGES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={filters.owner}
          onChange={update("owner")}
          className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm"
        >
          <option value="">Anyone</option>
          <option value="me">Assigned to me</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </div>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      <div className="border border-white/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-white/10 text-left">
              {["Name", "Offer", "Value", "Stage", "Owner", "Arrived"].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {page?.results.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <Link to={`/admin/leads/${lead.id}`} className="text-bone-100 hover:text-signal">
                    {lead.name}
                  </Link>
                  <p className="text-xs text-bone-100/40">{lead.company || lead.email}</p>
                </td>
                <td className="px-4 py-3 text-bone-100/70 text-xs">
                  {lead.offer_slug || "—"}
                </td>
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

        {page?.results.length === 0 && (
          <p className="text-center text-bone-100/40 py-12 text-sm">
            No leads match those filters.
          </p>
        )}
      </div>

      {/* Pagination. Without this the list silently stopped at 50 rows while
          claiming a higher total. */}
      {page && page.count > PAGE_SIZE && (
        <div className="flex items-center justify-between mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-100/50">
          <span>
            Page {pageNum} of {Math.ceil(page.count / PAGE_SIZE)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageNum((n) => Math.max(1, n - 1))}
              disabled={!page.previous}
              className="px-3 py-1.5 border border-white/15 rounded-sm hover:border-signal disabled:opacity-30 disabled:hover:border-white/15"
            >
              Prev
            </button>
            <button
              data-testid="next-page"
              onClick={() => setPageNum((n) => n + 1)}
              disabled={!page.next}
              className="px-3 py-1.5 border border-white/15 rounded-sm hover:border-signal disabled:opacity-30 disabled:hover:border-white/15"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
