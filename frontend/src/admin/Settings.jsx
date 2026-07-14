import { useCallback, useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { admin, crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { formatDateTime } from "./constants.js";

const inputCls =
  "bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";

const TABS = ["Custom fields", "Email templates", "Web-to-lead", "Audit log"];

// ─── Custom fields ───────────────────────────────────────────────────
function CustomFields() {
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({ label: "", key: "", field_type: "text" });
  // Braces so the callback returns undefined — a Promise returned to useEffect
  // is mistaken for a cleanup function ("destroy is not a function").
  const load = useCallback(() => { crm.listCustomFields().then(setFields).catch(() => {}); }, []);
  useEffect(load, [load]);

  const create = async (e) => {
    e.preventDefault();
    const key = form.key.trim() || form.label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
    await admin.createCustomField({ ...form, key });
    setForm({ label: "", key: "", field_type: "text" });
    load();
  };
  const remove = async (id) => { await admin.deleteCustomField(id); load(); };

  return (
    <div>
      <form onSubmit={create} className="flex flex-wrap gap-2 mb-6">
        <input data-testid="cf-label" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Field label (e.g. Budget)" className={inputCls} required />
        <select value={form.field_type} onChange={(e) => setForm((f) => ({ ...f, field_type: e.target.value }))} className={`${inputCls} pr-9`}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="select">Select</option>
        </select>
        <button type="submit" data-testid="cf-add" className="btn btn-primary"><PlusIcon size={14} /> Add field</button>
      </form>
      <ul className="space-y-2 max-w-lg">
        {fields.map((f) => (
          <li key={f.id} className="flex items-center justify-between border border-white/10 rounded-sm px-4 py-2.5">
            <span className="text-sm text-bone-100">{f.label} <span className="text-bone-100/40 font-mono text-xs">· {f.field_type} · {f.key}</span></span>
            <button onClick={() => remove(f.id)} className="text-bone-100/40 hover:text-maroon-400"><TrashIcon size={14} /></button>
          </li>
        ))}
        {fields.length === 0 && <li className="text-sm text-bone-100/40">No custom fields yet. Add one to capture extra data on every lead.</li>}
      </ul>
    </div>
  );
}

// ─── Email templates ─────────────────────────────────────────────────
function EmailTemplates() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", subject: "", body: "" });
  const load = useCallback(() => { crm.listEmailTemplates().then(setItems).catch(() => {}); }, []);
  useEffect(load, [load]);

  const create = async (e) => {
    e.preventDefault();
    await crm.createEmailTemplate(form);
    setForm({ name: "", subject: "", body: "" });
    load();
  };
  const remove = async (id) => { await crm.deleteEmailTemplate(id); load(); };

  return (
    <div>
      <form onSubmit={create} className="space-y-2 mb-6 max-w-xl">
        <input data-testid="tpl-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Template name" className={`${inputCls} w-full`} required />
        <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="Subject — supports {{name}}, {{company}}" className={`${inputCls} w-full`} required />
        <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} rows={4} placeholder="Body — Hi {{first_name}}, …" className={`${inputCls} w-full resize-y`} required />
        <button type="submit" className="btn btn-primary"><PlusIcon size={14} /> Save template</button>
      </form>
      <ul className="space-y-2 max-w-xl">
        {items.map((t) => (
          <li key={t.id} className="flex items-center justify-between border border-white/10 rounded-sm px-4 py-2.5">
            <span className="text-sm text-bone-100">{t.name} <span className="text-bone-100/40 text-xs">· {t.subject}</span></span>
            <button onClick={() => remove(t.id)} className="text-bone-100/40 hover:text-maroon-400"><TrashIcon size={14} /></button>
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-bone-100/40">No templates yet.</li>}
      </ul>
    </div>
  );
}

// ─── Web-to-lead keys ────────────────────────────────────────────────
function WebToLead() {
  const [keys, setKeys] = useState([]);
  const [name, setName] = useState("");
  const load = useCallback(() => { admin.listIntakeKeys().then(setKeys).catch(() => {}); }, []);
  useEffect(load, [load]);

  const create = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await admin.createIntakeKey({ name });
    setName("");
    load();
  };
  const toggle = async (k) => { await admin.updateIntakeKey(k.id, { is_active: !k.is_active }); load(); };

  const origin = import.meta.env.VITE_API_URL || "";

  return (
    <div>
      <p className="text-sm text-bone-100/55 mb-4 max-w-2xl">
        Give an external website a key so it can POST leads straight into the CRM.
        Any form can submit to <code className="text-bone-100/80">{origin}/api/intake/</code> with an
        <code className="text-bone-100/80"> X-Api-Key</code> header.
      </p>
      <form onSubmit={create} className="flex gap-2 mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Source name (e.g. Partner site)" className={inputCls} required />
        <button type="submit" data-testid="key-add" className="btn btn-primary"><PlusIcon size={14} /> Generate key</button>
      </form>
      <ul className="space-y-3 max-w-2xl">
        {keys.map((k) => (
          <li key={k.id} className="border border-white/10 rounded-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-bone-100">{k.name}</span>
              <button onClick={() => toggle(k)} className={`font-mono text-[10px] tracking-[0.15em] uppercase ${k.is_active ? "text-[#25D366]" : "text-maroon-400"}`}>
                {k.is_active ? "Active" : "Disabled"}
              </button>
            </div>
            <code className="block text-xs text-bone-100/60 break-all bg-black/30 rounded-sm px-3 py-2">{k.key}</code>
            <details className="mt-2">
              <summary className="text-[11px] text-bone-100/40 cursor-pointer">Embed snippet</summary>
              <pre className="mt-2 text-[10px] text-bone-100/60 bg-black/30 rounded-sm p-3 overflow-x-auto">{`fetch("${origin}/api/intake/", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Api-Key": "${k.key}" },
  body: JSON.stringify({ name, email, message })
})`}</pre>
            </details>
          </li>
        ))}
        {keys.length === 0 && <li className="text-sm text-bone-100/40">No keys yet.</li>}
      </ul>
    </div>
  );
}

// ─── Audit log ───────────────────────────────────────────────────────
function AuditLog() {
  const [page, setPage] = useState(null);
  useEffect(() => { admin.auditLog().then(setPage).catch(() => {}); }, []);
  const rows = page?.results || [];
  return (
    <div className="border border-white/10 rounded-sm overflow-x-auto max-w-3xl">
      <table className="w-full text-sm min-w-[560px]" data-testid="audit-table">
        <thead>
          <tr className="border-b border-white/10 text-left">
            {["When", "Who", "Did", "What"].map((h) => (
              <th key={h} className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-white/5">
              <td className="px-4 py-2.5 text-bone-100/50 text-xs whitespace-nowrap">{formatDateTime(r.created_at)}</td>
              <td className="px-4 py-2.5 text-bone-100/80 text-xs">{r.actor?.name || "System"}</td>
              <td className="px-4 py-2.5 text-xs"><span className="font-mono tracking-[0.12em] uppercase text-signal">{r.verb}</span></td>
              <td className="px-4 py-2.5 text-bone-100/70 text-xs">{r.target}{r.summary ? ` — ${r.summary}` : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="text-center text-bone-100/40 py-10 text-sm">Nothing logged yet.</p>}
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <div>
      <AdminHead title="Settings" />
      <h1 className="font-display text-3xl md:text-4xl mb-6">Settings</h1>

      <div className="flex flex-wrap gap-1 mb-8 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            data-testid={`tab-${t.split(" ")[0].toLowerCase()}`}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
              tab === t ? "border-signal text-signal" : "border-transparent text-bone-100/50 hover:text-bone-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Custom fields" && <CustomFields />}
      {tab === "Email templates" && <EmailTemplates />}
      {tab === "Web-to-lead" && <WebToLead />}
      {tab === "Audit log" && <AuditLog />}
    </div>
  );
}
