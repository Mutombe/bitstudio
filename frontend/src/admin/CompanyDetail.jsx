import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { getCompanyCached, invalidateCompany, prefetchLead } from "../lib/prefetch.js";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGE_LABEL, formatMoney } from "./constants.js";
import { DetailSkeleton } from "./Skeleton.jsx";
import PrefetchLink from "./PrefetchLink.jsx";

const inputCls =
  "w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm";

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "", title: "" });
  const [error, setError] = useState("");

  const loadRelated = useCallback(() => {
    crm.listContacts({ company: id, page_size: 200 })
      .then((p) => setContacts(p.results || p))
      .catch(() => {});
    // Filter in the database. This used to fetch page 1 of *all* leads and
    // filter client-side, so a company's leads vanished past the first page.
    crm.listLeads({ company_ref: id, page_size: 200 })
      .then((p) => setLeads(p.results || []))
      .catch(() => {});
  }, [id]);

  // After a change, refetch the company fresh (not the prefetch cache).
  const load = useCallback(() => {
    invalidateCompany(id);
    crm.getCompany(id).then(setCompany).catch(() => setError("Could not load this company."));
    loadRelated();
  }, [id, loadRelated]);

  // Initial open uses a hover-prefetched copy for an instant render.
  useEffect(() => {
    getCompanyCached(id).then(setCompany).catch(() => setError("Could not load this company."));
    loadRelated();
  }, [id, loadRelated]);

  const addContact = async (e) => {
    e.preventDefault();
    if (!contact.name.trim()) return;
    await crm.createContact({ ...contact, company: Number(id) });
    setContact({ name: "", email: "", title: "" });
    load();
  };

  if (error && !company) return <p className="text-maroon-400">{error}</p>;
  if (!company) return <DetailSkeleton />;

  return (
    <div>
      <AdminHead title={company.name} />
      <Link to="/admin/companies" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/60 hover:text-signal mb-6">
        <ArrowLeftIcon size={12} weight="bold" /> Companies
      </Link>

      <h1 className="text-xl md:text-2xl mb-1">{company.name}</h1>
      <p className="text-sm text-bone-100/60 mb-8">
        {[company.industry, company.website, company.phone].filter(Boolean).join(" · ") || "No details yet"}
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contacts */}
        <section className="border border-line rounded-lg p-5 bg-maroon-950">
          <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">Contacts</h2>
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
              <li key={c.id} className="text-sm border-b border-line pb-2">
                <span className="text-bone-100">{c.name}</span>
                {c.title && <span className="text-bone-100/60"> · {c.title}</span>}
                {c.email && <p className="text-xs text-bone-100/60">{c.email}</p>}
              </li>
            ))}
            {contacts.length === 0 && <li className="text-xs text-bone-100/60">No contacts yet.</li>}
          </ul>
        </section>

        {/* Leads at this company */}
        <section className="border border-line rounded-lg p-5 bg-maroon-950">
          <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">Linked leads</h2>
          <ul className="space-y-2">
            {leads.map((l) => (
              <li key={l.id} className="flex items-center justify-between text-sm border-b border-line pb-2">
                <PrefetchLink to={`/admin/leads/${l.id}`} prefetch={() => prefetchLead(l.id)} className="text-bone-100 hover:text-signal text-left">{l.name}</PrefetchLink>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/60">{STAGE_LABEL[l.status]}</span>
                  <span className="tabular-nums text-bone-100/70">{Number(l.value) > 0 ? formatMoney(l.value) : "—"}</span>
                </span>
              </li>
            ))}
            {leads.length === 0 && <li className="text-xs text-bone-100/60">No leads linked yet. Link one from a lead's detail page.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
