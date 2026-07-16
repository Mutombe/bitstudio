import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { crm } from "../lib/api.js";
import { OFFERS } from "../data/offers.js";
import { AdminHead } from "./AdminLayout.jsx";
import { STAGES, formatMoney } from "./constants.js";

const OFFER_NAME = Object.fromEntries(OFFERS.map((o) => [o.slug, o.name]));

function Stat({ label, value, hint, accent = "#E6E8EC", testId }) {
  return (
    <div
      data-testid={testId}
      className="border border-white/10 rounded-sm p-5 bg-maroon-950/20"
    >
      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-100/45 mb-3">
        {label}
      </p>
      <p
        className="font-display text-3xl md:text-4xl tabular-nums leading-none"
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

  const winRate =
    stats.win_rate === null ? "—" : `${Math.round(stats.win_rate * 100)}%`;

  return (
    <div>
      <AdminHead title="Dashboard" />

      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Dashboard</h1>
          <p className="text-sm text-bone-100/55 mt-1">
            What the pipeline is worth right now.
          </p>
        </div>
        <Link to="/admin/pipeline" className="btn btn-ghost">
          Open pipeline
        </Link>
      </div>

      {/* Money first. This is the number a founder actually asks for. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat
          label="Pipeline value"
          value={formatMoney(stats.pipeline_value)}
          hint="Open deals, still in play"
          testId="stat-pipeline-value"
        />
        <Stat
          label="Won"
          value={formatMoney(stats.won_value)}
          accent="#4B9E6B"
          hint="Closed revenue"
        />
        <Stat label="Win rate" value={winRate} hint="Won of decided" />
        <Stat
          label="Unassigned"
          value={stats.unassigned}
          accent={stats.unassigned > 0 ? "#C46A6A" : "#E6E8EC"}
          hint={stats.unassigned > 0 ? "Nobody is chasing these." : "All claimed."}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Stat label="Total leads" value={stats.total} testId="stat-total" />
        <Stat label="New this week" value={stats.new_this_week} />
        <Stat label="Assigned to me" value={stats.mine} />
        <Stat label="Open follow-ups" value={stats.open_tasks} />
      </div>

      {/* Which offer page actually earns. The point of the whole SEO push. */}
      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
        Conversion by offer
      </h2>
      {stats.by_offer.length === 0 ? (
        <p className="text-sm text-bone-100/40 mb-10">No offer leads yet.</p>
      ) : (
        <div className="border border-white/10 rounded-sm overflow-x-auto mb-10">
          <table className="w-full text-sm min-w-[640px]" data-testid="by-offer-table">
            <thead>
              <tr className="border-b border-white/10 text-left">
                {["Offer", "Leads", "Won", "Pipeline", "Won value"].map((h) => (
                  <th
                    key={h}
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.by_offer.map((row) => (
                <tr key={row.offer_slug} className="border-b border-white/5">
                  <td className="px-4 py-3 text-bone-100">
                    {OFFER_NAME[row.offer_slug] || row.offer_slug}
                  </td>
                  <td className="px-4 py-3 text-bone-100/70 tabular-nums">{row.total}</td>
                  <td className="px-4 py-3 text-bone-100/70 tabular-nums">{row.won}</td>
                  <td className="px-4 py-3 text-bone-100/70 tabular-nums">
                    {formatMoney(row.pipeline_value)}
                  </td>
                  <td className="px-4 py-3 tabular-nums" style={{ color: "#4B9E6B" }}>
                    {formatMoney(row.won_value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
        By stage
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAGES.map((stage) => (
          <Stat
            key={stage.id}
            label={stage.label}
            value={stats.by_status[stage.id] ?? 0}
            accent={stage.accent}
          />
        ))}
      </div>
    </div>
  );
}
