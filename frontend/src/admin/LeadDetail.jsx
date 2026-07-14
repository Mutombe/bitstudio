import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CircleIcon,
  PencilSimpleIcon,
  TrashIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead } from "./AdminLayout.jsx";
import { ACTIVITY_KINDS, SOURCE_LABEL, STAGES, formatDateTime } from "./constants.js";

const ACTIVITY_TONE = {
  created: "text-bone-100/50",
  note: "text-bone-100",
  call: "text-[#22D3EE]",
  email: "text-[#22D3EE]",
  meeting: "text-[#22D3EE]",
  whatsapp: "text-[#25D366]",
  status_change: "text-signal",
  assignment: "text-[#9F6BFF]",
  edited: "text-bone-100/50",
};

const KIND_LABEL = Object.fromEntries(ACTIVITY_KINDS.map((k) => [k.id, k.label]));

// Attribution the website captured. Never editable — it's a record of how a
// web lead arrived, not a form field.
function Attribution({ lead }) {
  const rows = [
    ["Source", SOURCE_LABEL[lead.source] || lead.source],
    ["Offer", lead.offer_slug],
    ["Tier", lead.tier],
    ["Campaign", lead.utm_campaign],
    ["Referrer", lead.referrer],
  ].filter(([, value]) => value);

  if (rows.length === 0) return null;
  return (
    <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
      <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
        Attribution
      </h2>
      <dl className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 text-sm">
            <dt className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/40 w-24 shrink-0 pt-1">
              {label}
            </dt>
            <dd className="text-bone-100/85 break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const inputCls =
  "mt-2 w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";

export default function LeadDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [team, setTeam] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [log, setLog] = useState({ kind: "note", body: "" });
  const [task, setTask] = useState({ title: "", due_date: "", assignee_id: "" });
  const [valueDraft, setValueDraft] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(() => {
    crm
      .getLead(id)
      .then((data) => {
        setLead(data);
        setValueDraft(String(Math.round(Number(data.value) || 0)));
      })
      .catch(() => setError("Could not load this lead."));
  }, [id]);

  useEffect(load, [load]);

  useEffect(() => {
    if (user?.can_assign_leads) crm.team().then(setTeam).catch(() => setTeam([]));
  }, [user]);

  useEffect(() => {
    crm.listTags().then(setAllTags).catch(() => setAllTags([]));
  }, []);

  const setTags = async (tagIds) => {
    await patch({ tag_ids: tagIds });
  };

  const addTag = async (tagId) => {
    if (!tagId) return;
    const ids = lead.tags.map((t) => t.id);
    if (!ids.includes(tagId)) await setTags([...ids, tagId]);
  };

  const removeTag = async (tagId) => {
    await setTags(lead.tags.filter((t) => t.id !== tagId).map((t) => t.id));
  };

  const createAndAddTag = async () => {
    const name = window.prompt("New tag name:");
    if (!name?.trim()) return;
    try {
      const tag = await crm.createTag({ name: name.trim() });
      setAllTags((prev) => [...prev, tag]);
      await addTag(tag.id);
    } catch {
      setError("Could not create the tag (is the name taken?).");
    }
  };

  const patch = async (changes) => {
    try {
      await crm.updateLead(id, changes);
      load();
      return true;
    } catch (err) {
      setError(err.data?.owner?.[0] || err.data?.email?.[0] || "That change was rejected.");
      return false;
    }
  };

  const saveValue = () => {
    const next = Math.max(0, Math.round(Number(valueDraft) || 0));
    if (next !== Math.round(Number(lead.value) || 0)) patch({ value: next });
  };

  const startEdit = () => {
    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
    });
    setEditing(true);
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    if (await patch(editForm)) setEditing(false);
  };

  const submitLog = async (event) => {
    event.preventDefault();
    if (!log.body.trim()) return;
    await crm.logActivity(id, log.kind, log.body.trim());
    setLog({ kind: log.kind, body: "" });
    load();
  };

  const submitTask = async (event) => {
    event.preventDefault();
    if (!task.title.trim()) return;
    const assigneeId = task.assignee_id ? Number(task.assignee_id) : user?.id;
    await crm.addTask(id, {
      title: task.title.trim(),
      due_date: task.due_date || null,
      assignee_id: assigneeId ?? null,
    });
    setTask({ title: "", due_date: "", assignee_id: "" });
    load();
  };

  const toggleTask = async (item) => {
    await crm.updateTask(item.id, { is_done: !item.is_done });
    load();
  };

  const deleteTask = async (item) => {
    await crm.deleteTask(item.id);
    load();
  };

  const deleteLead = async () => {
    if (!window.confirm(`Delete ${lead.name}? This cannot be undone.`)) return;
    try {
      await crm.deleteLead(id);
      navigate("/admin/leads");
    } catch {
      setError("Only managers can delete leads.");
    }
  };

  if (error && !lead) return <p className="text-maroon-400">{error}</p>;
  if (!lead) {
    return (
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        Loading…
      </p>
    );
  }

  const whatsapp = lead.phone
    ? `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`
    : null;
  const setEdit = (k) => (e) => setEditForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <AdminHead title={lead.name} />

      <Link
        to="/admin/leads"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 hover:text-signal mb-6"
      >
        <ArrowLeftIcon size={12} weight="bold" /> Leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{lead.name}</h1>
          <p className="text-sm text-bone-100/50 mt-1">
            {lead.company ? `${lead.company} · ` : ""}Added {formatDateTime(lead.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <WhatsappLogoIcon size={14} /> WhatsApp
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="btn btn-ghost">
              <EnvelopeSimpleIcon size={14} /> Email
            </a>
          )}
          <button data-testid="edit-lead-btn" onClick={startEdit} className="btn btn-ghost">
            <PencilSimpleIcon size={14} /> Edit
          </button>
          {user?.can_see_all_leads && (
            <button
              data-testid="delete-lead-btn"
              onClick={deleteLead}
              className="btn btn-ghost text-maroon-400 hover:border-maroon-400"
            >
              <TrashIcon size={14} /> Delete
            </button>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-maroon-400">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline controls */}
          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Stage</span>
                <select
                  data-testid="stage-select"
                  value={lead.status}
                  onChange={(e) => patch({ status: e.target.value })}
                  className="mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Owner</span>
                {user?.can_assign_leads ? (
                  <select
                    data-testid="owner-select"
                    value={lead.owner?.id || ""}
                    onChange={(e) => patch({ owner: e.target.value ? Number(e.target.value) : null })}
                    className="mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm"
                  >
                    <option value="">Unassigned</option>
                    {team.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-sm text-bone-100/80">
                      {lead.owner ? lead.owner.name : "Unassigned"}
                    </span>
                    {lead.owner?.id !== user?.id && (
                      <button
                        data-testid="claim-button"
                        onClick={() => patch({ owner: user.id })}
                        className="font-mono text-[10px] tracking-[0.18em] uppercase text-signal hover:underline"
                      >
                        Claim
                      </button>
                    )}
                  </div>
                )}
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Deal value (USD)</span>
                <div className="mt-2 flex items-center border border-white/15 rounded-sm focus-within:border-signal">
                  <span className="pl-3 text-bone-100/50">$</span>
                  <input
                    data-testid="value-input"
                    type="number"
                    min="0"
                    step="500"
                    value={valueDraft}
                    onChange={(e) => setValueDraft(e.target.value)}
                    onBlur={saveValue}
                    className="w-full bg-transparent outline-none px-2 py-2 text-sm tabular-nums"
                  />
                </div>
              </label>

              {lead.status === "lost" && (
                <label className="block">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-maroon-400">Why it was lost</span>
                  <input
                    data-testid="lost-reason-input"
                    defaultValue={lead.lost_reason}
                    onBlur={(e) => {
                      if (e.target.value !== lead.lost_reason) patch({ lost_reason: e.target.value });
                    }}
                    placeholder="Price, timing, went with a competitor…"
                    className="mt-2 w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm"
                  />
                </label>
              )}
            </div>

            {/* Tags */}
            <div className="mt-4">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Tags</span>
              <div className="mt-2 flex flex-wrap items-center gap-2" data-testid="lead-tags">
                {lead.tags.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 rounded-sm border"
                    style={{ color: t.color, borderColor: `${t.color}55` }}
                  >
                    {t.name}
                    <button onClick={() => removeTag(t.id)} aria-label={`Remove ${t.name}`} className="hover:text-maroon-400">
                      <XIcon size={10} />
                    </button>
                  </span>
                ))}
                <select
                  data-testid="add-tag-select"
                  value=""
                  onChange={(e) => { addTag(Number(e.target.value)); e.target.value = ""; }}
                  className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-2 pr-7 py-1 text-xs"
                >
                  <option value="">+ Add tag</option>
                  {allTags
                    .filter((t) => !lead.tags.some((lt) => lt.id === t.id))
                    .map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <button onClick={createAndAddTag} className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/50 hover:text-signal">
                  New tag
                </button>
              </div>
            </div>
          </section>

          {/* Contact + message: read-only, or an edit form */}
          {editing ? (
            <form onSubmit={saveEdit} className="border border-signal/40 rounded-sm p-5 bg-maroon-950/20">
              <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-signal mb-4">Edit details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Name</span>
                  <input data-testid="edit-name" value={editForm.name} onChange={setEdit("name")} className={inputCls} required />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Company</span>
                  <input data-testid="edit-company" value={editForm.company} onChange={setEdit("company")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Email</span>
                  <input type="email" value={editForm.email} onChange={setEdit("email")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Phone</span>
                  <input value={editForm.phone} onChange={setEdit("phone")} className={inputCls} />
                </label>
              </div>
              <label className="block mt-4">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">What they need</span>
                <textarea value={editForm.message} onChange={setEdit("message")} rows={3} className={`${inputCls} resize-y`} />
              </label>
              <div className="flex items-center gap-3 mt-4">
                <button type="submit" data-testid="save-edit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          ) : (
            <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
              <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">Contact</h2>
              <dl className="space-y-2.5 mb-4">
                {[
                  ["Email", lead.email],
                  ["Phone", lead.phone],
                  ["Company", lead.company],
                  ["Prefers", lead.channel],
                ].filter(([, v]) => v).map(([label, value]) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <dt className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/40 w-24 shrink-0 pt-1">{label}</dt>
                    <dd className="text-bone-100/85 break-all">{value}</dd>
                  </div>
                ))}
              </dl>
              {lead.message && (
                <>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/40 mb-2">What they need</p>
                  <p className="text-bone-100/90 whitespace-pre-wrap leading-relaxed text-sm">{lead.message}</p>
                </>
              )}
            </section>
          )}

          <Attribution lead={lead} />

          {/* Activity timeline */}
          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">Activity</h2>

            <form onSubmit={submitLog} className="mb-6">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {ACTIVITY_KINDS.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    data-testid={`log-kind-${k.id}`}
                    onClick={() => setLog((l) => ({ ...l, kind: k.id }))}
                    className={`font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm border transition-colors ${
                      log.kind === k.id
                        ? "border-signal text-signal"
                        : "border-white/15 text-bone-100/50 hover:text-bone-100"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
              <textarea
                data-testid="note-input"
                value={log.body}
                onChange={(e) => setLog((l) => ({ ...l, body: e.target.value }))}
                rows={2}
                placeholder={`Log a ${KIND_LABEL[log.kind]?.toLowerCase() || "note"}…`}
                className="w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm resize-y"
              />
              <button type="submit" data-testid="log-submit" disabled={!log.body.trim()} className="btn btn-ghost mt-2">
                Log {KIND_LABEL[log.kind] || "note"}
              </button>
            </form>

            <ol data-testid="activity-list" className="space-y-4">
              {lead.activities.map((item) => (
                <li key={item.id} data-testid="activity-item" className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                  <div className="min-w-0">
                    {["call", "email", "meeting", "whatsapp"].includes(item.kind) && (
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/45 mr-2">
                        {KIND_LABEL[item.kind]}
                      </span>
                    )}
                    <span className={`text-sm ${ACTIVITY_TONE[item.kind] || "text-bone-100"}`}>
                      {item.body}
                    </span>
                    <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/35 mt-1">
                      {item.actor ? item.actor.name : "System"} · {formatDateTime(item.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right. Follow-ups */}
        <div className="space-y-6">
          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">Follow-ups</h2>

            <form onSubmit={submitTask} className="space-y-2 mb-5">
              <input
                data-testid="task-title"
                value={task.title}
                onChange={(e) => setTask((t) => ({ ...t, title: e.target.value }))}
                placeholder="Send the proposal"
                className="w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={task.due_date}
                onChange={(e) => setTask((t) => ({ ...t, due_date: e.target.value }))}
                className="w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm px-3 py-2 text-sm"
              />
              {user?.can_assign_leads && team.length > 0 && (
                <select
                  value={task.assignee_id}
                  onChange={(e) => setTask((t) => ({ ...t, assignee_id: e.target.value }))}
                  className="w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm"
                >
                  <option value="">Assign to me</option>
                  {team.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              )}
              <button type="submit" data-testid="add-task" disabled={!task.title.trim()} className="btn btn-ghost w-full justify-center">
                Add follow-up
              </button>
            </form>

            <ul className="space-y-3">
              {lead.tasks.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5 group">
                  <button
                    onClick={() => toggleTask(item)}
                    aria-label={item.is_done ? "Mark not done" : "Mark done"}
                    className="mt-0.5 shrink-0"
                  >
                    {item.is_done ? (
                      <CheckCircleIcon size={18} weight="fill" className="text-signal" />
                    ) : (
                      <CircleIcon size={18} className="text-bone-100/40" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${item.is_done ? "line-through text-bone-100/35" : "text-bone-100/90"}`}>
                      {item.title}
                    </p>
                    {item.due_date && <p className="text-[10px] text-bone-100/40">Due {item.due_date}</p>}
                    {item.assignee && (
                      <p className="text-[10px] text-bone-100/35">{item.assignee.name}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(item)}
                    aria-label="Delete follow-up"
                    className="mt-0.5 shrink-0 text-bone-100/25 hover:text-maroon-400"
                  >
                    <XIcon size={14} />
                  </button>
                </li>
              ))}
              {lead.tasks.length === 0 && (
                <li className="text-xs text-bone-100/35">Nothing scheduled.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
