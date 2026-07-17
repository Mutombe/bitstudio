import { useState } from "react";
import { UploadSimpleIcon } from "@phosphor-icons/react";
import { importLeadsCsv } from "../lib/api.js";

// CSV import, rendered inside a modal. `onDone` fires after a successful
// import so the list can refresh.
export default function ImportLeads({ onDone }) {
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

  if (result) {
    return (
      <div data-testid="import-result">
        <ul className="space-y-2 text-sm mb-5">
          <li><span className="text-[#059669] font-semibold text-lg tabular-nums mr-2">{result.created}</span> created</li>
          <li><span className="text-bone-100/60 font-semibold text-lg tabular-nums mr-2">{result.skipped}</span> skipped (duplicate email)</li>
          {result.errors.length > 0 && (
            <li>
              <span className="text-maroon-400 font-semibold text-lg tabular-nums mr-2">{result.errors.length}</span> errors
              <ul className="mt-1 ml-5 list-disc text-xs text-bone-100/60 space-y-0.5">
                {result.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </li>
          )}
        </ul>
        <div className="flex gap-3">
          <button onClick={onDone} className="btn btn-primary">Done</button>
          <button onClick={() => { setResult(null); setFile(null); }} className="btn btn-ghost">Import another</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <p className="text-sm text-bone-100/60 mb-4">
        CSV columns: <span className="text-bone-100/80">name, email, phone, company, message, value</span>.
        Only <span className="text-bone-100/80">name</span> is required. Duplicate emails are skipped.
      </p>
      {error && <p role="alert" className="mb-3 text-sm text-maroon-400">{error}</p>}
      <input
        type="file"
        accept=".csv,text/csv"
        data-testid="import-file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-bone-100/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-line-strong file:bg-transparent file:text-bone-100 file:text-xs file:cursor-pointer"
      />
      <button type="submit" data-testid="import-submit" disabled={!file || busy} className="btn btn-primary mt-5">
        <UploadSimpleIcon size={14} /> {busy ? "Importing…" : "Import"}
      </button>
    </form>
  );
}
