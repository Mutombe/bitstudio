import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useAuth } from "./AuthContext.jsx";
import { AdminHead, AdminLoading } from "./AdminLayout.jsx";

export default function Login() {
  const { user, loading, login } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    <div
      className="login-screen min-h-screen flex items-center justify-center px-5 bg-cover bg-center relative"
      style={{ backgroundImage: "url(/login-bg.jpg)" }}
    >
      <AdminHead title="Sign in" />
      {/* Darkening wash so the frosted card and its light text stay legible
          over the bright, burning parts of the photo. */}
      <div className="absolute inset-0 bg-slate-950/55" />

      <form
        onSubmit={submit}
        className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/40 p-8 text-white"
      >
        <img src="/logo.png" alt="" className="h-8 w-8 mb-6" />
        <h1 className="text-2xl font-semibold mb-2">Bit Studio CRM</h1>
        <p className="text-sm text-white/70 mb-8">Sales floor. Staff only.</p>

        <label className="block mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
            Username
          </span>
          <input
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            autoComplete="username"
            autoFocus
            required
            className="mt-2 w-full rounded-lg bg-slate-950/40 border border-white/15 backdrop-blur-md focus:border-white/40 focus:bg-slate-950/55 outline-none px-3.5 py-2.5 text-white placeholder-white/50 transition"
          />
        </label>

        <label className="block mb-8">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
            Password
          </span>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              autoComplete="current-password"
              required
              className="w-full rounded-lg bg-slate-950/40 border border-white/15 backdrop-blur-md focus:border-white/40 focus:bg-slate-950/55 outline-none pl-3.5 pr-12 py-2.5 text-white placeholder-white/50 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 my-1 mr-1 flex items-center gap-1.5 rounded-md px-2.5 text-white/90 hover:text-white hover:bg-white/15 transition-colors"
            >
              {showPassword ? <EyeSlashIcon size={20} weight="bold" /> : <EyeIcon size={20} weight="bold" />}
            </button>
          </div>
        </label>

        {error && (
          <p role="alert" className="mb-5 text-sm text-rose-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full justify-center"
        >
          {busy ? "Signing in…" : "Sign in"}
          {!busy && <ArrowRightIcon size={14} weight="bold" />}
        </button>
      </form>
    </div>
  );
}
