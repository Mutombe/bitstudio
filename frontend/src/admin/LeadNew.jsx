import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { OFFERS } from "../data/offers.js";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead } from "./AdminLayout.jsx";
import { MANUAL_SOURCES, SOURCE_LABEL, STAGES } from "./constants.js";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">
      {label}
    </span>
    {children}
  </label>
);

const inputCls =
  "mt-2 w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";
const selectCls =
  "mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm";

export default function LeadNew() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    source: "manual",
    offer_slug: "",
    status: "new",
    value: "",
    owner: "",
  });
  const [dupes, setDupes] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user?.can_assign_leads) crm.team().then(setTeam).catch(() => setTeam([]));
  }, [user]);

  // Warn (never block) when an email or phone already exists on file.
  useEffect(() => {
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!email && !phone) {
      setDupes([]);
      return;
    }
    const timer = setTimeout(() => {
      crm.checkDuplicate({ email, phone }).then(setDupes).catch(() => setDupes([]));
    }, 400);
    return () => clearTimeout(timer);
  }, [form.email, form.phone]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("A name is the one thing we need.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...form,
        value: form.value === "" ? undefined : Number(form.value),
        owner: form.owner === "" ? undefined : Number(form.owner),
        offer_slug: form.offer_slug || "",
      };
      const lead = await crm.createLead(payload);
      navigate(`/admin/leads/${lead.id}`);
    } catch (err) {
      setError(err.data ? JSON.stringify(err.data) : "Could not create the lead.");
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <AdminHead title="New lead" />

      <Link
        to="/admin/leads"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 hover:text-signal mb-6"
      >
        <ArrowLeftIcon size={12} weight="bold" /> Leads
      </Link>

      <h1 className="font-display text-3xl md:text-4xl mb-1">New lead</h1>
      <p className="text-sm text-bone-100/55 mb-8">
        A phone call, a walk-in, a referral. Only the name is required.
      </p>

      {error && (
        <p role="alert" className="mb-4 text-sm text-maroon-400 break-words">
          {error}
        </p>
      )}

      {dupes.length > 0 && (
        <div data-testid="dup-warning" className="mb-5 p-4 border border-[#C9A24B]/40 rounded-sm bg-[#C9A24B]/5">
          <p className="flex items-center gap-2 text-sm text-[#C9A24B] mb-2">
            <WarningIcon size={16} weight="fill" />
            Possible duplicate — {dupes.length} lead{dupes.length > 1 ? "s" : ""} already on file
          </p>
          <ul className="space-y-1">
            {dupes.map((d) => (
              <li key={d.id} className="text-sm">
                <Link to={`/admin/leads/${d.id}`} className="text-bone-100 hover:text-signal underline">
                  {d.name}
                </Link>
                <span className="text-bone-100/45"> · {d.email}{d.owner ? ` · ${d.owner.name}` : ""}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-bone-100/40 mt-2">You can still create this lead.</p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Name *">
            <input data-testid="new-name" value={form.name} onChange={set("name")} autoFocus className={inputCls} />
          </Field>
          <Field label="Company">
            <input value={form.company} onChange={set("company")} className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={set("phone")} className={inputCls} />
          </Field>
        </div>

        <Field label="What they need">
          <textarea value={form.message} onChange={set("message")} rows={3} className={`${inputCls} resize-y`} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Source">
            <select value={form.source} onChange={set("source")} className={selectCls}>
              {MANUAL_SOURCES.map((s) => (
                <option key={s} value={s}>{SOURCE_LABEL[s]}</option>
              ))}
            </select>
          </Field>
          <Field label="Stage">
            <select value={form.status} onChange={set("status")} className={selectCls}>
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Offer (optional — sets value)">
            <select value={form.offer_slug} onChange={set("offer_slug")} className={selectCls}>
              <option value="">None</option>
              {OFFERS.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Deal value (USD)">
            <input type="number" min="0" step="500" value={form.value} onChange={set("value")} placeholder="Auto from offer" className={inputCls} />
          </Field>
          {user?.can_assign_leads && (
            <Field label="Owner">
              <select value={form.owner} onChange={set("owner")} className={selectCls}>
                <option value="">Me</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </Field>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" data-testid="create-lead" disabled={busy} className="btn btn-primary">
            {busy ? "Saving…" : "Create lead"}
          </button>
          <Link to="/admin/leads" className="btn btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
