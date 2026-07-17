import { useEffect, useState } from "react";
import { crm } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { formatMoney } from "./constants.js";

const GROUPS = [
  { id: "status", label: "Stage" },
  { id: "source", label: "Source" },
  { id: "owner", label: "Owner" },
  { id: "offer", label: "Offer" },
];
const MEASURES = [
  { id: "count", label: "Lead count" },
  { id: "value", label: "Total value" },
];

export default function Reports() {
  const [groupBy, setGroupBy] = useState("source");
  const [measure, setMeasure] = useState("count");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    crm.report({ group_by: groupBy, measure })
      .then((r) => setRows(r.rows))
      .catch(() => setError("Could not load the report."));
  }, [groupBy, measure]);

  const max = Math.max(1, ...rows.map((r) => r.total));
  const fmt = (v) => (measure === "value" ? formatMoney(v) : v);

  return (
    <div>
      <AdminHead title="Reports" />
      <h1 className="text-xl md:text-2xl mb-1">Reports</h1>
      <p className="text-sm text-bone-100/60 mb-8">Group your leads and measure what matters.</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <label className="flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Group by</span>
          <select data-testid="report-group" value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm">
            {GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Measure</span>
          <select value={measure} onChange={(e) => setMeasure(e.target.value)} className="bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm">
            {MEASURES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </label>
      </div>

      {error && <p className="text-maroon-400 mb-4">{error}</p>}

      <div data-testid="report-rows" className="space-y-3 max-w-2xl">
        {rows.length === 0 && <p className="text-sm text-bone-100/60">No data.</p>}
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-bone-100/85">{row.label}</span>
              <span className="tabular-nums text-bone-100/70">{fmt(row.total)}</span>
            </div>
            <div className="h-2 rounded-lg bg-hover overflow-hidden">
              <div className="h-full rounded-lg bg-signal" style={{ width: `${(row.total / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
