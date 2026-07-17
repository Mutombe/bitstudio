import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WarningIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { crm } from "../lib/api.js";
import { OFFERS } from "../data/offers.js";
import { useAuth } from "./AuthContext.jsx";
import { MANUAL_SOURCES, SOURCE_LABEL, STAGES } from "./constants.js";

const inputCls =
  "mt-1.5 w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-md px-3 py-2 text-sm";
const selectCls =
  "mt-1.5 w-full bg-maroon-950 border border-line-strong rounded-md pl-3 pr-9 py-2 text-sm";
const Label = ({ children }) => (
  <span className="font-medium text-[11px] uppercase tracking-wide text-bone-100/60">{children}</span>
);

// Create OR edit a lead, inside a modal. `lead` present = edit.
export default function LeadForm({ lead, onSaved, onCancel }) {
  const { user } = useAuth();
  const editing = Boolean(lead);
  const [team, setTeam] = useState([]);
  const [dupes, setDupes] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState(() => ({
    name: lead?.name || "",
    company: lead?.company || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    message: lead?.message || "",
    source: lead?.source || "manual",
    offer_slug: lead?.offer_slug || "",
    status: lead?.status || "new",
    value: lead?.value != null ? String(Math.round(Number(lead.value))) : "",
    owner: lead?.owner?.id ? String(lead.owner.id) : "",
  }));

  useEffect(() => {
    if (user?.can_assign_leads) crm.team().then(setTeam).catch(() => setTeam([]));
  }, [user]);

  // Duplicate check only matters when adding a new lead.
  useEffect(() => {
    if (editing) return undefined;
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!email && !phone) {
      setDupes([]);
      return undefined;
    }
    const t = setTimeout(() => {
      crm.checkDuplicate({ email, phone }).then(setDupes).catch(() => setDupes([]));
    }, 400);
    return () => clearTimeout(t);
  }, [form.email, form.phone, editing]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("A name is required.");
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      message: form.message,
      source: form.source,
      offer_slug: form.offer_slug || "",
      status: form.status,
      value: form.value === "" ? undefined : Number(form.value),
      owner: form.owner === "" ? undefined : Number(form.owner),
    };
    try {
      const saved = editing
        ? await crm.updateLead(lead.id, payload)
        : await crm.createLead(payload);
      toast.success(editing ? "Lead updated." : "Lead created.");
      onSaved(saved);
    } catch (err) {
      setError(err.data ? JSON.stringify(err.data) : "Could not save the lead.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p role="alert" className="text-sm text-maroon-400 break-words">{error}</p>}

      {dupes.length > 0 && (
        <div data-testid="dup-warning" className="p-3 border border-[#B45309]/40 rounded-md bg-[#B45309]/5">
          <p className="flex items-center gap-2 text-sm text-[#B45309] mb-1">
            <WarningIcon size={15} weight="fill" /> Possible duplicate — {dupes.length} already on file
          </p>
          <ul className="text-sm space-y-0.5">
            {dupes.map((d) => (
              <li key={d.id}>
                <Link to={`/admin/leads/${d.id}`} className="text-bone-100 hover:text-signal underline">{d.name}</Link>
                <span className="text-bone-100/60"> · {d.email}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block"><Label>Name *</Label>
          <input data-testid="lf-name" value={form.name} onChange={set("name")} className={inputCls} />
        </label>
        <label className="block"><Label>Company</Label>
          <input data-testid="lf-company" value={form.company} onChange={set("company")} className={inputCls} />
        </label>
        <label className="block"><Label>Email</Label>
          <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
        </label>
        <label className="block"><Label>Phone</Label>
          <input value={form.phone} onChange={set("phone")} className={inputCls} />
        </label>
      </div>

      <label className="block"><Label>What they need</Label>
        <textarea value={form.message} onChange={set("message")} rows={2} className={`${inputCls} resize-y`} />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        {!editing && (
          <label className="block"><Label>Source</Label>
            <select value={form.source} onChange={set("source")} className={selectCls}>
              {MANUAL_SOURCES.map((s) => <option key={s} value={s}>{SOURCE_LABEL[s]}</option>)}
            </select>
          </label>
        )}
        <label className="block"><Label>Stage</Label>
          <select value={form.status} onChange={set("status")} className={selectCls}>
            {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
        <label className="block"><Label>Offer (sets value)</Label>
          <select value={form.offer_slug} onChange={set("offer_slug")} className={selectCls}>
            <option value="">None</option>
            {OFFERS.map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
          </select>
        </label>
        <label className="block"><Label>Deal value (USD)</Label>
          <input type="number" min="0" step="500" value={form.value} onChange={set("value")} placeholder="Auto from offer" className={inputCls} />
        </label>
        {user?.can_assign_leads && (
          <label className="block"><Label>Owner</Label>
            <select value={form.owner} onChange={set("owner")} className={selectCls}>
              <option value="">{editing ? "Unassigned" : "Me"}</option>
              {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </label>
        )}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" data-testid="lf-submit" disabled={busy} className="btn btn-primary">
          {busy ? "Saving…" : editing ? "Save changes" : "Create lead"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
