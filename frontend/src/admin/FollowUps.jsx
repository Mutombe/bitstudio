import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, CircleIcon } from "@phosphor-icons/react";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { formatDate } from "./constants.js";
import { Skeleton } from "./Skeleton.jsx";

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
  { id: "overdue", label: "Overdue", accent: "#DC2626" },
  { id: "today", label: "Today", accent: "#B45309" },
  { id: "upcoming", label: "Upcoming", accent: "#2563EB" },
  { id: "someday", label: "No date", accent: "#6B7280" },
];

const PER_PAGE = 50;

export default function FollowUps() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const today = todayISO();

  // Grouped by due date, so a pager would fight the grouping — load more and
  // append instead, but always show the true server count.
  const load = useCallback(() => {
    crm
      .listTasks({ assignee: "me", open: "1", page_size: PER_PAGE, page: 1 })
      .then((page) => {
        setTasks(page.results || []);
        setTotal(page.count || 0);
        setPageNum(1);
      })
      .catch(() => setError("Could not load your follow-ups."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const loadMore = async () => {
    const next = pageNum + 1;
    try {
      const page = await crm.listTasks({ assignee: "me", open: "1", page_size: PER_PAGE, page: next });
      setTasks((prev) => [...prev, ...(page.results || [])]);
      setTotal(page.count || 0);
      setPageNum(next);
    } catch {
      setError("Could not load more.");
    }
  };

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
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-3 max-w-3xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const grouped = GROUPS.map((group) => ({
    ...group,
    items: tasks.filter((t) => bucketOf(t, today) === group.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div>
      <AdminHead title="Follow-ups" />

      <h1 className="text-xl md:text-2xl mb-1">My follow-ups</h1>
      <p className="text-sm text-bone-100/60 mb-8" data-testid="followups-count">
        {total} open{tasks.length < total ? ` · showing ${tasks.length}` : ""}
      </p>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      {grouped.length === 0 ? (
        <p className="text-bone-100/60 text-sm">Nothing owed. Enjoy the quiet.</p>
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
                    className="flex items-start gap-3 border border-line rounded-lg p-3 bg-maroon-950"
                  >
                    <button
                      onClick={() => complete(task)}
                      aria-label="Mark done"
                      className="mt-0.5 shrink-0"
                    >
                      <CircleIcon size={18} className="text-bone-100/60 hover:text-signal" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-bone-100/90">{task.title}</p>
                      <p className="text-[11px] text-bone-100/60 mt-1">
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

          {tasks.length < total && (
            <button
              data-testid="followups-load-more"
              onClick={loadMore}
              className="w-full py-2.5 text-xs text-bone-100/60 hover:text-signal border border-dashed border-line-strong hover:border-signal rounded-md"
            >
              Load more ({total - tasks.length} left)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
