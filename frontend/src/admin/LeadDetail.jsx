import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CalendarPlusIcon,
  CheckCircleIcon,
  CircleIcon,
  PencilSimpleIcon,
  TrashIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { crm } from "../lib/api.js";
import { getLeadCached, invalidateLead, prefetchCompany } from "../lib/prefetch.js";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead } from "./AdminLayout.jsx";
import { ACTIVITY_KINDS, SOURCE_LABEL, STAGES, formatDateTime, scoreColor } from "./constants.js";
import { DetailSkeleton } from "./Skeleton.jsx";
import Modal from "./Modal.jsx";
import LeadForm from "./LeadForm.jsx";
import PrefetchLink from "./PrefetchLink.jsx";
import AsyncSelect from "./AsyncSelect.jsx";

const ACTIVITY_TONE = {
  created: "text-bone-100/60",
  note: "text-bone-100",
  call: "text-[#64748B]",
  email: "text-[#64748B]",
  meeting: "text-[#64748B]",
  whatsapp: "text-[#059669]",
  status_change: "text-signal",
  assignment: "text-[#64748B]",
  edited: "text-bone-100/60",
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
    <section className="border border-line rounded-lg p-5 bg-maroon-950">
      <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">
        Attribution
      </h2>
      <dl className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 text-sm">
            <dt className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 w-24 shrink-0 pt-1">
              {label}
            </dt>
            <dd className="text-bone-100/85 break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function LeadDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [team, setTeam] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [customDefs, setCustomDefs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState({ subject: "", body: "" });
  const [editing, setEditing] = useState(false);
  const [log, setLog] = useState({ kind: "note", body: "" });
  const [task, setTask] = useState({ title: "", due_date: "", assignee_id: "" });
  const [valueDraft, setValueDraft] = useState("");
  const [error, setError] = useState("");

  const apply = useCallback((data) => {
    setLead(data);
    setValueDraft(String(Math.round(Number(data.value) || 0)));
  }, []);

  // The account list is searched server-side, so linking works whether there
  // are six companies or six thousand.
  const searchCompanies = useCallback(
    (q) => crm.listCompanies({ q, page_size: 20 }).then((p) => p.results || p),
    [],
  );

  // Reloads after a mutation must fetch fresh — never the prefetch cache,
  // which would re-show the pre-edit copy.
  const load = useCallback(() => {
    invalidateLead(id); // this record just changed; drop any stale prefetch
    crm.getLead(id).then(apply).catch(() => setError("Could not load this lead."));
  }, [id, apply]);

  // Initial open prefers a hover-prefetched copy so the page appears instantly.
  useEffect(() => {
    getLeadCached(id).then(apply).catch(() => setError("Could not load this lead."));
  }, [id, apply]);

  useEffect(() => {
    if (user?.can_assign_leads) crm.team().then(setTeam).catch(() => setTeam([]));
  }, [user]);

  useEffect(() => {
    crm.listTags().then(setAllTags).catch(() => setAllTags([]));
    crm.listCustomFields().then(setCustomDefs).catch(() => setCustomDefs([]));
    crm.listEmailTemplates().then(setTemplates).catch(() => setTemplates([]));
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await crm.sendEmail(id, emailDraft.subject, emailDraft.body);
      setEmailOpen(false);
      setEmailDraft({ subject: "", body: "" });
      load();
      toast.success("Email sent and logged to the timeline.");
    } catch (err) {
      toast.error(err.data?.detail || "Could not send the email.");
    }
  };

  const applyTemplate = (tplId) => {
    const tpl = templates.find((t) => String(t.id) === String(tplId));
    if (tpl) setEmailDraft({ subject: tpl.subject, body: tpl.body });
  };

  const setCustom = async (key, value) => {
    await patch({ custom: { ...(lead.custom || {}), [key]: value } });
  };

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

  // Optimistic: apply `optimistic` to the lead immediately so the UI feels
  // instant, then reconcile with the server. Roll back and toast on failure.
  const patch = async (changes, optimistic) => {
    const prev = lead;
    if (optimistic) setLead((l) => ({ ...l, ...optimistic }));
    try {
      await crm.updateLead(id, changes);
      load();
      return true;
    } catch (err) {
      if (optimistic) setLead(prev);
      toast.error(
        err.data?.owner?.[0] || err.data?.email?.[0] || "That change was rejected."
      );
      return false;
    }
  };

  const saveValue = () => {
    const next = Math.max(0, Math.round(Number(valueDraft) || 0));
    if (next !== Math.round(Number(lead.value) || 0)) patch({ value: next }, { value: next });
  };

  const submitLog = async (event) => {
    event.preventDefault();
    const body = log.body.trim();
    if (!body) return;
    // Optimistically drop the note into the timeline, then reconcile.
    const temp = {
      id: `temp-${Date.now()}`,
      kind: log.kind,
      body,
      actor: { name: user?.name },
      created_at: new Date().toISOString(),
    };
    setLead((l) => ({ ...l, activities: [temp, ...l.activities] }));
    setLog({ kind: log.kind, body: "" });
    try {
      await crm.logActivity(id, temp.kind, body);
      load();
    } catch {
      setLead((l) => ({ ...l, activities: l.activities.filter((a) => a.id !== temp.id) }));
      toast.error("Could not log that.");
    }
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
    toast.success("Follow-up added.");
  };

  const toggleTask = async (item) => {
    // Optimistic tick.
    setLead((l) => ({
      ...l,
      tasks: l.tasks.map((t) => (t.id === item.id ? { ...t, is_done: !t.is_done } : t)),
    }));
    try {
      await crm.updateTask(item.id, { is_done: !item.is_done });
      load();
    } catch {
      setLead((l) => ({
        ...l,
        tasks: l.tasks.map((t) => (t.id === item.id ? { ...t, is_done: item.is_done } : t)),
      }));
      toast.error("Could not update the task.");
    }
  };

  const deleteTask = async (item) => {
    setLead((l) => ({ ...l, tasks: l.tasks.filter((t) => t.id !== item.id) }));
    try {
      await crm.deleteTask(item.id);
    } catch {
      toast.error("Could not delete the follow-up.");
      load();
    }
  };

  const deleteLead = async () => {
    if (!window.confirm(`Delete ${lead.name}? This cannot be undone.`)) return;
    try {
      await crm.deleteLead(id);
      toast.success("Lead deleted.");
      navigate("/admin/leads");
    } catch {
      toast.error("Only managers can delete leads.");
    }
  };

  if (error && !lead) return <p className="text-maroon-400">{error}</p>;
  if (!lead) return <DetailSkeleton />;

  const whatsapp = lead.phone
    ? `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <div>
      <AdminHead title={lead.name} />

      <Link
        to="/admin/leads"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/60 hover:text-signal mb-6"
      >
        <ArrowLeftIcon size={12} weight="bold" /> Leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span
            data-testid="lead-score"
            className="shrink-0 mt-1 inline-flex flex-col items-center justify-center w-14 h-14 rounded-lg border font-mono"
            style={{ color: scoreColor(lead.score), borderColor: `${scoreColor(lead.score)}55` }}
            title={Object.entries(lead.score_breakdown || {}).map(([k, v]) => `${k}: +${v}`).join("\n")}
          >
            <span className="text-xl font-bold tabular-nums leading-none">{lead.score}</span>
            <span className="text-[7px] tracking-[0.15em] uppercase mt-0.5">score</span>
          </span>
          <div>
            <h1 className="text-xl md:text-2xl">{lead.name}</h1>
            <p className="text-sm text-bone-100/60 mt-1">
              {lead.company ? `${lead.company} · ` : ""}Added {formatDateTime(lead.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <WhatsappLogoIcon size={14} /> WhatsApp
            </a>
          )}
          {lead.email && (
            <button data-testid="email-btn" onClick={() => setEmailOpen(true)} className="btn btn-ghost">
              <EnvelopeSimpleIcon size={14} /> Email
            </button>
          )}
          <button data-testid="edit-lead-btn" onClick={() => setEditing(true)} className="btn btn-ghost">
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
      {/* Email composer */}
      {emailOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-[10vh] px-4" onClick={() => setEmailOpen(false)}>
          <form
            onSubmit={sendEmail}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-maroon-950 border border-line-strong rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Email {lead.name}</h2>
              <button type="button" onClick={() => setEmailOpen(false)} className="text-bone-100/60 hover:text-bone-100"><XIcon size={16} /></button>
            </div>
            {templates.length > 0 && (
              <select onChange={(e) => applyTemplate(e.target.value)} className="w-full mb-3 bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm">
                <option value="">Start from a template…</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
            <input
              data-testid="email-subject"
              value={emailDraft.subject}
              onChange={(e) => setEmailDraft((d) => ({ ...d, subject: e.target.value }))}
              placeholder="Subject"
              className="w-full mb-3 bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm"
              required
            />
            <textarea
              data-testid="email-body"
              value={emailDraft.body}
              onChange={(e) => setEmailDraft((d) => ({ ...d, body: e.target.value }))}
              rows={6}
              placeholder="Message — {{name}}, {{company}} are filled in."
              className="w-full mb-4 bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm resize-y"
              required
            />
            <button type="submit" data-testid="email-send" className="btn btn-primary">Send email</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline controls */}
          <section className="border border-line rounded-lg p-5 bg-maroon-950">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Stage</span>
                <select
                  data-testid="stage-select"
                  value={lead.status}
                  onChange={(e) => patch({ status: e.target.value }, { status: e.target.value })}
                  className="mt-2 w-full bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Owner</span>
                {user?.can_assign_leads ? (
                  <select
                    data-testid="owner-select"
                    value={lead.owner?.id || ""}
                    onChange={(e) => patch({ owner: e.target.value ? Number(e.target.value) : null })}
                    className="mt-2 w-full bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm"
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
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Deal value (USD)</span>
                <div className="mt-2 flex items-center border border-line-strong rounded-lg focus-within:border-signal">
                  <span className="pl-3 text-bone-100/60">$</span>
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
                    className="mt-2 w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm"
                  />
                </label>
              )}
            </div>

            {/* Tags */}
            <div className="mt-4">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Tags</span>
              <div className="mt-2 flex flex-wrap items-center gap-2" data-testid="lead-tags">
                {lead.tags.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 rounded-lg border"
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
                  className="bg-maroon-950 border border-line-strong rounded-lg pl-2 pr-7 py-1 text-xs"
                >
                  <option value="">+ Add tag</option>
                  {allTags
                    .filter((t) => !lead.tags.some((lt) => lt.id === t.id))
                    .map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <button onClick={createAndAddTag} className="font-mono text-[9px] tracking-[0.15em] uppercase text-bone-100/60 hover:text-signal">
                  New tag
                </button>
              </div>
            </div>

            {/* Company link */}
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {/* Not a <label>: it forwards clicks to the control inside it,
                  which for a button means click → label → button → forever. */}
              <div className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 flex items-center gap-2">
                  Company (account)
                  {lead.company_ref && (
                    <PrefetchLink
                      to={`/admin/companies/${lead.company_ref.id}`}
                      prefetch={() => prefetchCompany(lead.company_ref.id)}
                      className="text-signal hover:underline normal-case tracking-normal font-sans text-[10px]"
                    >
                      view →
                    </PrefetchLink>
                  )}
                </span>
                <AsyncSelect
                  testId="company-select"
                  value={lead.company_ref || null}
                  search={searchCompanies}
                  placeholder="Type a company name…"
                  onChange={(option) =>
                    patch(
                      { company_ref: option ? option.id : null },
                      { company_ref: option },
                    )
                  }
                />
              </div>
            </div>

            {/* Custom fields */}
            {customDefs.length > 0 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {customDefs.map((f) => (
                  <label key={f.id} className="block">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">{f.label}</span>
                    {f.field_type === "select" ? (
                      <select
                        defaultValue={lead.custom?.[f.key] || ""}
                        onChange={(e) => setCustom(f.key, e.target.value)}
                        className="mt-2 w-full bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm"
                      >
                        <option value="">—</option>
                        {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f.field_type === "number" ? "number" : f.field_type === "date" ? "date" : "text"}
                        defaultValue={lead.custom?.[f.key] || ""}
                        onBlur={(e) => { if (e.target.value !== (lead.custom?.[f.key] || "")) setCustom(f.key, e.target.value); }}
                        className="mt-2 w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm"
                      />
                    )}
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Contact + message (edited via the modal). */}
          <section className="border border-line rounded-lg p-5 bg-maroon-950">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">Contact</h2>
            <dl className="space-y-2.5 mb-4">
              {[
                ["Email", lead.email],
                ["Phone", lead.phone],
                ["Company", lead.company],
                ["Prefers", lead.channel],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <dt className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 w-24 shrink-0 pt-1">{label}</dt>
                  <dd className="text-bone-100/85 break-all">{value}</dd>
                </div>
              ))}
            </dl>
            {lead.message && (
              <>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 mb-2">What they need</p>
                <p className="text-bone-100/90 whitespace-pre-wrap leading-relaxed text-sm">{lead.message}</p>
              </>
            )}
          </section>

          <Modal open={editing} onClose={() => setEditing(false)} title="Edit lead" size="2xl">
            <LeadForm
              lead={lead}
              // Reload the full record — the write response is a thin shape
              // (no activities/tasks/nested owner), so don't set it directly.
              onSaved={() => {
                setEditing(false);
                load();
              }}
              onCancel={() => setEditing(false)}
            />
          </Modal>

          <Attribution lead={lead} />

          {/* Activity timeline */}
          <section className="border border-line rounded-lg p-5 bg-maroon-950">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">Activity</h2>

            <form onSubmit={submitLog} className="mb-6">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {ACTIVITY_KINDS.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    data-testid={`log-kind-${k.id}`}
                    onClick={() => setLog((l) => ({ ...l, kind: k.id }))}
                    className={`font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-lg border transition-colors ${
                      log.kind === k.id
                        ? "border-signal text-signal"
                        : "border-line-strong text-bone-100/60 hover:text-bone-100"
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
                className="w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm resize-y"
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
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/60 mr-2">
                        {KIND_LABEL[item.kind]}
                      </span>
                    )}
                    <span className={`text-sm ${ACTIVITY_TONE[item.kind] || "text-bone-100"}`}>
                      {item.body}
                    </span>
                    <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/60 mt-1">
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
          <section className="border border-line rounded-lg p-5 bg-maroon-950">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/60 mb-4">Follow-ups</h2>

            <form onSubmit={submitTask} className="space-y-2 mb-5">
              <input
                data-testid="task-title"
                value={task.title}
                onChange={(e) => setTask((t) => ({ ...t, title: e.target.value }))}
                placeholder="Send the proposal"
                className="w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={task.due_date}
                onChange={(e) => setTask((t) => ({ ...t, due_date: e.target.value }))}
                className="w-full bg-maroon-950 border border-line-strong rounded-lg px-3 py-2 text-sm"
              />
              {user?.can_assign_leads && team.length > 0 && (
                <select
                  value={task.assignee_id}
                  onChange={(e) => setTask((t) => ({ ...t, assignee_id: e.target.value }))}
                  className="w-full bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm"
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
                      <CircleIcon size={18} className="text-bone-100/60" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${item.is_done ? "line-through text-bone-100/60" : "text-bone-100/90"}`}>
                      {item.title}
                    </p>
                    {item.due_date && <p className="text-[10px] text-bone-100/60">Due {item.due_date}</p>}
                    {item.assignee && (
                      <p className="text-[10px] text-bone-100/60">{item.assignee.name}</p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      crm
                        .downloadTaskIcs(item.id, item.title || "task")
                        .catch(() => toast.error("Could not download the calendar file."))
                    }
                    aria-label="Add to calendar"
                    title="Add to calendar (.ics)"
                    className="mt-0.5 shrink-0 text-bone-100/25 hover:text-signal"
                  >
                    <CalendarPlusIcon size={14} />
                  </button>
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
                <li className="text-xs text-bone-100/60">Nothing scheduled.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
