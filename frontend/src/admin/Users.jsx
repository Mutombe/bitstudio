import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { admin } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { ROLE_LABEL, formatDate } from "./constants.js";

const inputCls =
  "mt-2 w-full bg-transparent border border-white/15 focus:border-signal outline-none rounded-sm px-3 py-2 text-sm";
const selectCls =
  "mt-2 w-full bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-3 pr-9 py-2 text-sm";

function NewUserForm({ onCreated }) {
  const blank = { username: "", first_name: "", last_name: "", email: "", role: "sales", password: "" };
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await admin.createUser(form);
      setForm(blank);
      onCreated();
    } catch (err) {
      const d = err.data || {};
      setError(
        d.username?.[0] || d.password?.[0] || d.detail || "Could not create the user."
      );
      setBusy(false);
      return;
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="border border-white/10 rounded-sm p-5 bg-maroon-950/20 mb-8">
      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-100/45 mb-4">
        Add a user
      </h2>
      {error && <p role="alert" className="mb-4 text-sm text-maroon-400">{error}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Username *</span>
          <input data-testid="new-username" value={form.username} onChange={set("username")} className={inputCls} required />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">First name</span>
          <input value={form.first_name} onChange={set("first_name")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Last name</span>
          <input value={form.last_name} onChange={set("last_name")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Email</span>
          <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Role</span>
          <select value={form.role} onChange={set("role")} className={selectCls}>
            <option value="sales">Sales</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45">Password *</span>
          <input data-testid="new-password" type="password" value={form.password} onChange={set("password")} className={inputCls} required autoComplete="new-password" />
        </label>
      </div>
      <button type="submit" data-testid="create-user" disabled={busy} className="btn btn-primary mt-4">
        <PlusIcon size={14} weight="bold" /> {busy ? "Creating…" : "Create user"}
      </button>
    </form>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    // The users endpoint is paginated (DRF default), so unwrap results.
    admin
      .listUsers()
      .then((page) => setUsers(Array.isArray(page) ? page : page.results))
      .catch(() => setError("Could not load users."));
  }, []);
  useEffect(load, [load]);

  const changeRole = async (u, role) => {
    try {
      await admin.updateUser(u.id, { role });
      load();
    } catch (err) {
      setError(err.data?.detail || "Could not change the role.");
    }
  };

  const toggleActive = async (u) => {
    try {
      await admin.updateUser(u.id, { is_active: !u.is_active });
      load();
    } catch (err) {
      setError(err.data?.detail || err.message);
    }
  };

  const resetPassword = async (u) => {
    const pw = window.prompt(`New password for ${u.username}:`);
    if (!pw) return;
    try {
      await admin.resetPassword(u.id, pw);
      window.alert("Password reset.");
    } catch (err) {
      window.alert(err.data?.password?.[0] || "Could not reset the password.");
    }
  };

  return (
    <div>
      <AdminHead title="Users" />
      <h1 className="font-display text-3xl md:text-4xl mb-1">Users</h1>
      <p className="text-sm text-bone-100/55 mb-8">
        The team. Deactivate instead of deleting, so their leads keep an author.
      </p>

      {error && <p role="alert" className="text-maroon-400 mb-4">{error}</p>}

      <NewUserForm onCreated={load} />

      <div className="border border-white/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]" data-testid="users-table">
          <thead>
            <tr className="border-b border-white/10 text-left">
              {["User", "Role", "Status", "Joined", ""].map((h) => (
                <th key={h} className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/45 px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5">
                <td className="px-4 py-3">
                  <p className="text-bone-100">{u.name}</p>
                  <p className="text-xs text-bone-100/40">
                    @{u.username}{u.email ? ` · ${u.email}` : ""}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u, e.target.value)}
                    className="bg-[color:var(--color-ink)] border border-white/15 rounded-sm pl-2 pr-7 py-1 text-xs"
                  >
                    {Object.entries(ROLE_LABEL).map(([id, label]) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={u.is_active ? "text-[#25D366]" : "text-maroon-400"}>
                    {u.is_active ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-4 py-3 text-bone-100/50 text-xs whitespace-nowrap">
                  {formatDate(u.date_joined)}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => resetPassword(u)} className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-100/60 hover:text-signal mr-4">
                    Reset PW
                  </button>
                  <button onClick={() => toggleActive(u)} className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-100/60 hover:text-maroon-400">
                    {u.is_active ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
