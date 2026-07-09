import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGES } from "./constants.js";

function Stat({ label, value, hint, accent = "#D4FF3A" }) {
  return (
    <div className="border border-white/10 rounded-sm p-5 bg-maroon-950/20">
      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-3">
        {label}
      </p>
      <p
        className="font-display text-4xl md:text-5xl tabular-nums leading-none"
        style={{ color: accent }}
      >
        {value}
      </p>
      {hint && <p className="mt-2 text-xs text-bone-100/45">{hint}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    crm.stats().then(setStats).catch(() => setError("Could not load stats."));
  }, []);

  if (error) return <p className="text-maroon-400">{error}</p>;
  if (!stats) {
    return (
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/50">
        Loading…
      </p>
    );
  }

  return (
    <div>
      <AdminHead title="Dashboard" />

      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Dashboard</h1>
          <p className="text-sm text-bone-100/55 mt-1">
            What the pipeline looks like right now.
          </p>
        </div>
        <Link to="/admin/pipeline" className="btn btn-ghost">
          Open pipeline
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="New this week" value={stats.new_this_week} accent="#22D3EE" />
        <Stat label="Assigned to me" value={stats.mine} accent="#9F6BFF" />
        <Stat
          label="Unassigned"
          value={stats.unassigned}
          accent={stats.unassigned > 0 ? "#B54656" : "#D4FF3A"}
          hint={stats.unassigned > 0 ? "Nobody is chasing these." : "All claimed."}
        />
      </div>

      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
        By stage
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {STAGES.map((stage) => (
          <Stat
            key={stage.id}
            label={stage.label}
            value={stats.by_status[stage.id] ?? 0}
            accent={stage.accent}
          />
        ))}
      </div>

      <div className="border border-white/10 rounded-sm p-5 bg-maroon-950/20 max-w-md">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-2">
          Open follow-ups
        </p>
        <p className="font-display text-3xl tabular-nums">{stats.open_tasks}</p>
      </div>
    </div>
  );
}
