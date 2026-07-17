import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { crm } from "../lib/api.js";
import { prefetchCompany } from "../lib/prefetch.js";
import { AdminHead } from "./AdminLayout.jsx";
import Modal from "./Modal.jsx";
import PrefetchLink from "./PrefetchLink.jsx";
import Pagination from "./Pagination.jsx";

const inputCls =
  "mt-2 w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm";

export default function Companies() {
  const [page, setPage] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", website: "", industry: "", phone: "" });
  const [error, setError] = useState("");

  const load = useCallback(() => {
    crm.listCompanies({ q, page: pageNum })
      .then(setPage)
      .catch(() => setError("Could not load companies."));
  }, [q, pageNum]);

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [load]);

  const companies = page?.results || [];

  const create = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      await crm.createCompany(form);
      setForm({ name: "", website: "", industry: "", phone: "" });
      setShowForm(false);
      load();
      toast.success("Company created.");
    } catch (err) {
      setError(err.data?.name?.[0] || "Could not create the company.");
    }
  };

  return (
    <div>
      <AdminHead title="Companies" />
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl mb-1">Companies</h1>
          {/* The server's real total — not the number of rows on this page. */}
          <p className="text-sm text-bone-100/60">{page ? `${page.count} accounts` : "Loading…"}</p>
        </div>
        <button data-testid="new-company-btn" onClick={() => setShowForm(true)} className="btn btn-primary">
          <PlusIcon size={14} weight="bold" /> New company
        </button>
      </div>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="New company" size="2xl">
        <form onSubmit={create} className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium text-[11px] uppercase tracking-wide text-bone-100/60">Name *</span>
            <input data-testid="company-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="font-medium text-[11px] uppercase tracking-wide text-bone-100/60">Industry</span>
            <input value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} className={inputCls} />
          </label>
          <label className="block">
            <span className="font-medium text-[11px] uppercase tracking-wide text-bone-100/60">Website</span>
            <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className={inputCls} />
          </label>
          <label className="block">
            <span className="font-medium text-[11px] uppercase tracking-wide text-bone-100/60">Phone</span>
            <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
          </label>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" data-testid="create-company" className="btn btn-primary">Create company</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      </Modal>

      <input
        value={q}
        onChange={(e) => { setPageNum(1); setQ(e.target.value); }}
        placeholder="Search companies…"
        className="w-full max-w-md bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm mb-6"
      />

      <div className="border border-line rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]" data-testid="companies-table">
          <thead>
            <tr className="border-b border-line text-left">
              {["Company", "Industry", "Leads", "Contacts", "Owner"].map((h) => (
                <th key={h} className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-b border-line hover:bg-hover">
                <td className="px-4 py-3">
                  <PrefetchLink to={`/admin/companies/${c.id}`} prefetch={() => prefetchCompany(c.id)} className="text-bone-100 hover:text-signal text-left">
                    {c.name}
                  </PrefetchLink>
                  {c.website && <p className="text-xs text-bone-100/60">{c.website}</p>}
                </td>
                <td className="px-4 py-3 text-bone-100/70 text-xs">{c.industry || "—"}</td>
                <td className="px-4 py-3 text-bone-100/70 tabular-nums">{c.lead_count}</td>
                <td className="px-4 py-3 text-bone-100/70 tabular-nums">{c.contact_count}</td>
                <td className="px-4 py-3 text-bone-100/60 text-xs">{c.owner?.name || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && <p className="text-center text-bone-100/60 py-12 text-sm">No companies yet.</p>}
      </div>

      <Pagination page={page} pageNum={pageNum} onChange={setPageNum} label="accounts" />
    </div>
  );
}
