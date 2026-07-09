import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CircleIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead } from "./AdminLayout.jsx";
import { SOURCE_LABEL, STAGES, formatDateTime } from "./constants.js";

const ACTIVITY_TONE = {
  created: "text-bone-100/50",
  note: "text-bone-100",
  status_change: "text-signal",
  assignment: "text-[#9F6BFF]",
};

function Facts({ lead }) {
  const rows = [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Prefers", lead.channel],
    ["Source", SOURCE_LABEL[lead.source] || lead.source],
    ["Offer", lead.offer_slug],
    ["Tier", lead.tier],
    ["Campaign", lead.utm_campaign],
    ["Referrer", lead.referrer],
  ].filter(([, value]) => value);

  return (
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
  );
}

export default function LeadDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [lead, setLead] = useState(null);
  const [team, setTeam] = useState([]);
  const [note, setNote] = useState("");
  const [task, setTask] = useState({ title: "", due_date: "" });
  const [error, setError] = useState("");

  const load = useCallback(() => {
    crm.getLead(id).then(setLead).catch(() => setError("Could not load this lead."));
  }, [id]);

  useEffect(load, [load]);

  useEffect(() => {
    if (user?.can_assign_leads) crm.team().then(setTeam).catch(() => setTeam([]));
  }, [user]);

  const patch = async (changes) => {
    try {
      await crm.updateLead(id, changes);
      load(); // refetch so the activity timeline reflects the change
    } catch (err) {
      setError(err.data?.owner?.[0] || "That change was rejected.");
    }
  };

  const submitNote = async (event) => {
    event.preventDefault();
    if (!note.trim()) return;
    await crm.addNote(id, note.trim());
    setNote("");
    load();
  };

  const submitTask = async (event) => {
    event.preventDefault();
    if (!task.title.trim()) return;
    await crm.addTask(id, {
      title: task.title.trim(),
      due_date: task.due_date || null,
    });
    setTask({ title: "", due_date: "" });
    load();
  };

  const toggleTask = async (item) => {
    await crm.updateTask(item.id, { is_done: !item.is_done });
    load();
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

  return (
    <div>
      <AdminHead title={lead.name} />

      <Link
        to="/admin/pipeline"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 hover:text-signal mb-6"
      >
        <ArrowLeftIcon size={12} weight="bold" /> Pipeline
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{lead.name}</h1>
          <p className="text-sm text-bone-100/50 mt-1">
            Arrived {formatDateTime(lead.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <WhatsappLogoIcon size={14} /> WhatsApp
            </a>
          )}
          <a href={`mailto:${lead.email}`} className="btn btn-ghost">
            <EnvelopeSimpleIcon size={14} /> Email
          </a>
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-maroon-400">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left. Pipeline controls + what they said + facts */}
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">
                  Stage
                </span>
                <select
                  data-testid="stage-select"
                  value={lead.status}
                  onChange={(e) => patch({ status: e.target.value })}
                  className="mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm px-3 py-2 text-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">
                  Owner
                </span>
                {user?.can_assign_leads ? (
                  <select
                    data-testid="owner-select"
                    value={lead.owner?.id || ""}
                    onChange={(e) =>
                      patch({ owner: e.target.value ? Number(e.target.value) : null })
                    }
                    className="mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm px-3 py-2 text-sm"
                  >
                    <option value="">Unassigned</option>
                    {team.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Sales staff may claim a lead, but not hand it to anyone else.
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
          </section>

          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-3">
              What they said
            </h2>
            <p className="text-bone-100/90 whitespace-pre-wrap leading-relaxed">
              {lead.message}
            </p>
          </section>

          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
              Details
            </h2>
            <Facts lead={lead} />
          </section>

          {/* Activity timeline */}
          <section className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
              Activity
            </h2>

            <form onSubmit={submitNote} className="mb-6">
              <textarea
                data-testid="note-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Add a note. What happened on the call?"
                className="w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm resize-y"
              />
              <button type="submit" disabled={!note.trim()} className="btn btn-ghost mt-2">
                Add note
              </button>
            </form>

            <ol data-testid="activity-list" className="space-y-4">
              {lead.activities.map((item) => (
                <li key={item.id} data-testid="activity-item" className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                  <div className="min-w-0">
                    <p className={`text-sm ${ACTIVITY_TONE[item.kind] || "text-bone-100"}`}>
                      {item.body}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-100/35 mt-1">
                      {item.actor ? item.actor.name : "System"} ·{" "}
                      {formatDateTime(item.created_at)}
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
            <h2 className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
              Follow-ups
            </h2>

            <form onSubmit={submitTask} className="space-y-2 mb-5">
              <input
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
              <button type="submit" disabled={!task.title.trim()} className="btn btn-ghost w-full justify-center">
                Add follow-up
              </button>
            </form>

            <ul className="space-y-3">
              {lead.tasks.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5">
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
                  <div className="min-w-0">
                    <p
                      className={`text-sm ${
                        item.is_done ? "line-through text-bone-100/35" : "text-bone-100/90"
                      }`}
                    >
                      {item.title}
                    </p>
                    {item.due_date && (
                      <p className="text-[10px] text-bone-100/40">Due {item.due_date}</p>
                    )}
                  </div>
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
