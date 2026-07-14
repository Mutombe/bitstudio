import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGE_LABEL, formatMoney } from "./constants.js";

const inputCls =
  "w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "", title: "" });
  const [error, setError] = useState("");

  const load = useCallback(() => {
    crm.getCompany(id).then(setCompany).catch(() => setError("Could not load this company."));
    crm.listContacts({ company: id }).then((p) => setContacts(p.results || p)).catch(() => {});
    crm.listLeads({ q: "" }).then((p) =>
      setLeads((p.results || []).filter((l) => l.company_ref === Number(id) || l.company_ref?.id === Number(id)))
    ).catch(() => {});
  }, [id]);

  useEffect(load, [load]);

  const addContact = async (e) => {
    e.preventDefault();
    if (!contact.name.trim()) return;
    await crm.createContact({ ...contact, company: Number(id) });
    setContact({ name: "", email: "", title: "" });
    load();
  };

  if (error && !company) return <p className="text-maroon-400">{error}</p>;
  if (!company) return <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">Loading…</p>;

  return (
    <div>
      <AdminHead title={company.name} />
      <Link to="/admin/companies" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 hover:text-signal mb-6">
        <ArrowLeftIcon size={12} weight="bold" /> Companies
      </Link>

      <h1 className="font-display text-3xl md:text-4xl mb-1">{company.name}</h1>
      <p className="text-sm text-bone-100/55 mb-8">
        {[company.industry, company.website, company.phone].filter(Boolean).join(" · ") || "No details yet"}
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contacts */}
        <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
          <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">Contacts</h2>
          <form onSubmit={addContact} className="grid grid-cols-3 gap-2 mb-4">
            <input data-testid="contact-name" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Name" className={inputCls} />
            <input value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder="Email" className={inputCls} />
            <input value={contact.title} onChange={(e) => setContact((c) => ({ ...c, title: e.target.value }))} placeholder="Title" className={inputCls} />
            <button type="submit" data-testid="add-contact" className="col-span-3 btn btn-ghost justify-center">
              <PlusIcon size={12} /> Add contact
            </button>
          </form>
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.id} className="text-sm border-b border-white/5 pb-2">
                <span className="text-bone-100">{c.name}</span>
                {c.title && <span className="text-bone-100/45"> · {c.title}</span>}
                {c.email && <p className="text-xs text-bone-100/40">{c.email}</p>}
              </li>
            ))}
            {contacts.length === 0 && <li className="text-xs text-bone-100/35">No contacts yet.</li>}
          </ul>
        </section>

        {/* Leads at this company */}
        <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
          <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">Linked leads</h2>
          <ul className="space-y-2">
            {leads.map((l) => (
              <li key={l.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                <Link to={`/admin/leads/${l.id}`} className="text-bone-100 hover:text-signal">{l.name}</Link>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/50">{STAGE_LABEL[l.status]}</span>
                  <span className="tabular-nums text-bone-100/70">{Number(l.value) > 0 ? formatMoney(l.value) : "—"}</span>
                </span>
              </li>
            ))}
            {leads.length === 0 && <li className="text-xs text-bone-100/35">No leads linked yet. Link one from a lead's detail page.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
