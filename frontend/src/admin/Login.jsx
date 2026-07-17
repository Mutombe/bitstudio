import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead, AdminLoading } from "./AdminLayout.jsx";

export default function Login() {
  const { user, loading, login } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) return <AdminLoading />;
  if (user) return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.username, form.password);
    } catch (err) {
      // The API returns one message for bad password and unknown user alike.
      setError(err.status === 401 ? "Invalid credentials." : "Could not sign in.");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] text-bone-100 flex items-center justify-center px-5">
      <AdminHead title="Sign in" />

      <form
        onSubmit={submit}
        className="w-full max-w-sm border border-line rounded-lg p-8 bg-maroon-950"
      >
        <img src="/logo.png" alt="" className="h-8 w-8 mb-6" />
        <h1 className="text-2xl mb-2">Bit Studio CRM</h1>
        <p className="text-sm text-bone-100/60 mb-8">
          Sales floor. Staff only.
        </p>

        <label className="block mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/60">
            Username
          </span>
          <input
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            autoComplete="username"
            autoFocus
            required
            className="mt-2 w-full bg-transparent border-b border-line-strong focus:border-signal outline-none py-2 text-bone-100"
          />
        </label>

        <label className="block mb-8">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/60">
            Password
          </span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="current-password"
            required
            className="mt-2 w-full bg-transparent border-b border-line-strong focus:border-signal outline-none py-2 text-bone-100"
          />
        </label>

        {error && (
          <p role="alert" className="mb-5 text-sm text-maroon-400">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn btn-primary w-full justify-center">
          {busy ? "Signing in…" : "Sign in"}
          {!busy && <ArrowRightIcon size={14} weight="bold" />}
        </button>
      </form>
    </div>
  );
}
