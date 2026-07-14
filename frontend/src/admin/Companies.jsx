import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";

const inputCls =
  "mt-2 w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", website: "", industry: "", phone: "" });
  const [error, setError] = useState("");

  const load = useCallback(() => {
    crm.listCompanies({ q })
      .then((p) => setCompanies(p.results || p))
      .catch(() => setError("Could not load companies."));
  }, [q]);

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [load]);

  const create = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      await crm.createCompany(form);
      setForm({ name: "", website: "", industry: "", phone: "" });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.data?.name?.[0] || "Could not create the company.");
    }
  };

  return (
    <div>
      <AdminHead title="Companies" />
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-1">Companies</h1>
          <p className="text-sm text-bone-100/55">{companies.length} accounts</p>
        </div>
        <button data-testid="new-company-btn" onClick={() => setShowForm((s) => !s)} className="btn btn-primary">
          <PlusIcon size={14} weight="bold" /> New company
        </button>
      </div>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={create} className="border border-signal/40 rounded-sm p-5 bg-maroon-950/20 mb-6 grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Name *</span>
            <input data-testid="company-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Industry</span>
            <input value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} className={inputCls} />
          </label>
          <label className="block">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Website</span>
            <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className={inputCls} />
          </label>
          <label className="block">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Phone</span>
            <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" data-testid="create-company" className="btn btn-primary">Create</button>
          </div>
        </form>
      )}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search companies…"
        className="w-full max-w-md bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm mb-6"
      />

      <div className="border border-white/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]" data-testid="companies-table">
          <thead>
            <tr className="border-b border-white/10 text-left">
              {["Company", "Industry", "Leads", "Contacts", "Owner"].map((h) => (
                <th key={h} className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <Link to={`/admin/companies/${c.id}`} className="text-bone-100 hover:text-signal">{c.name}</Link>
                  {c.website && <p className="text-xs text-bone-100/40">{c.website}</p>}
                </td>
                <td className="px-4 py-3 text-bone-100/70 text-xs">{c.industry || "—"}</td>
                <td className="px-4 py-3 text-bone-100/70 tabular-nums">{c.lead_count}</td>
                <td className="px-4 py-3 text-bone-100/70 tabular-nums">{c.contact_count}</td>
                <td className="px-4 py-3 text-bone-100/60 text-xs">{c.owner?.name || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && <p className="text-center text-bone-100/40 py-12 text-sm">No companies yet.</p>}
      </div>
    </div>
  );
}
