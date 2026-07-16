import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { importLeadsCsv } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";

export default function LeadImport() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setResult(await importLeadsCsv(file));
    } catch (err) {
      setError(err.data?.detail || "Import failed. Is it a UTF-8 CSV?");
    }
    setBusy(false);
  };

  return (
    <div className="max-w-2xl">
      <AdminHead title="Import leads" />

      <Link to="/admin/leads" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/50 hover:text-signal mb-6">
        <ArrowLeftIcon size={12} weight="bold" /> Leads
      </Link>

      <h1 className="font-display text-3xl md:text-4xl mb-1">Import leads</h1>
      <p className="text-sm text-bone-100/55 mb-8">
        Upload a CSV with columns <span className="text-bone-100/80">name, email, phone, company, message, value</span>.
        Only <span className="text-bone-100/80">name</span> is required. Rows whose email already exists are skipped,
        so re-importing the same file is safe.
      </p>

      {result ? (
        <div data-testid="import-result" className="border border-signal/40 rounded-sm p-6 bg-maroon-950/20">
          <h2 className="font-display text-2xl mb-4">Import complete</h2>
          <ul className="space-y-2 text-sm">
            <li><span className="text-[#4B9E6B] font-display text-xl tabular-nums mr-2">{result.created}</span> created</li>
            <li><span className="text-bone-100/60 font-display text-xl tabular-nums mr-2">{result.skipped}</span> skipped (duplicate email)</li>
            {result.errors.length > 0 && (
              <li>
                <span className="text-maroon-400 font-display text-xl tabular-nums mr-2">{result.errors.length}</span> errors
                <ul className="mt-2 ml-6 list-disc text-xs text-bone-100/50 space-y-1">
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </li>
            )}
          </ul>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate("/admin/leads")} className="btn btn-primary">See leads</button>
            <button onClick={() => { setResult(null); setFile(null); }} className="btn btn-ghost">Import another</button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="border border-white/10 rounded-sm p-6 bg-maroon-950/20">
          {error && <p role="alert" className="mb-4 text-sm text-maroon-400">{error}</p>}
          <input
            type="file"
            accept=".csv,text/csv"
            data-testid="import-file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-bone-100/70 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border file:border-white/15 file:bg-transparent file:text-bone-100 file:font-mono file:text-[10px] file:tracking-[0.15em] file:uppercase file:cursor-pointer"
          />
          <button type="submit" data-testid="import-submit" disabled={!file || busy} className="btn btn-primary mt-6">
            <UploadSimpleIcon size={14} /> {busy ? "Importing…" : "Import"}
          </button>
        </form>
      )}
    </div>
  );
}
