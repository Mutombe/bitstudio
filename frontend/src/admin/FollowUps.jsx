import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, CircleIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { formatDate } from "./constants.js";

// Local YYYY-MM-DD for "today", so comparisons match the date input's value.
function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function bucketOf(task, today) {
  if (!task.due_date) return "someday";
  if (task.due_date < today) return "overdue";
  if (task.due_date === today) return "today";
  return "upcoming";
}

const GROUPS = [
  { id: "overdue", label: "Overdue", accent: "#B54656" },
  { id: "today", label: "Today", accent: "#D4FF3A" },
  { id: "upcoming", label: "Upcoming", accent: "#22D3EE" },
  { id: "someday", label: "No date", accent: "#9DA6B0" },
];

export default function FollowUps() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const today = todayISO();

  const load = useCallback(() => {
    crm
      .listTasks({ assignee: "me", open: "1", page_size: 200 })
      .then((page) => setTasks(page.results))
      .catch(() => setError("Could not load your follow-ups."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const complete = async (task) => {
    // Optimistic: it vanishes from the open list immediately.
    setTasks((current) => current.filter((t) => t.id !== task.id));
    try {
      await crm.updateTask(task.id, { is_done: true });
    } catch {
      setError("Could not update that task.");
      load();
    }
  };

  if (loading) {
    return (
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        Loading…
      </p>
    );
  }

  const grouped = GROUPS.map((group) => ({
    ...group,
    items: tasks.filter((t) => bucketOf(t, today) === group.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div>
      <AdminHead title="Follow-ups" />

      <h1 className="font-display text-3xl md:text-4xl mb-1">My follow-ups</h1>
      <p className="text-sm text-bone-100/55 mb-8" data-testid="followups-count">
        {tasks.length} open
      </p>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      {grouped.length === 0 ? (
        <p className="text-bone-100/40 text-sm">Nothing owed. Enjoy the quiet.</p>
      ) : (
        <div className="space-y-8 max-w-3xl">
          {grouped.map((group) => (
            <section key={group.id} data-testid={`group-${group.id}`}>
              <h2
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                style={{ color: group.accent }}
              >
                {group.label} · {group.items.length}
              </h2>
              <ul className="space-y-2">
                {group.items.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-start gap-3 border border-white/10 rounded-sm p-3 bg-maroon-950/20"
                  >
                    <button
                      onClick={() => complete(task)}
                      aria-label="Mark done"
                      className="mt-0.5 shrink-0"
                    >
                      <CircleIcon size={18} className="text-bone-100/40 hover:text-signal" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-bone-100/90">{task.title}</p>
                      <p className="text-[11px] text-bone-100/45 mt-1">
                        <Link
                          to={`/admin/leads/${task.lead_id}`}
                          className="hover:text-signal"
                        >
                          {task.lead_name}
                        </Link>
                        {task.due_date && ` · due ${formatDate(task.due_date)}`}
                      </p>
                    </div>
                    <CheckCircleIcon
                      size={16}
                      className="text-bone-100/15 shrink-0 mt-0.5"
                      aria-hidden
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
