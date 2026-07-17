import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { admin } from "../lib/api.js";
import { AdminHead } from "./AdminLayout.jsx";
import { ROLE_LABEL, formatDate } from "./constants.js";
import Modal from "./Modal.jsx";
import Pagination from "./Pagination.jsx";

const inputCls =
  "mt-2 w-full bg-transparent border border-line-strong focus:border-signal outline-none rounded-lg px-3 py-2 text-sm";
const selectCls =
  "mt-2 w-full bg-maroon-950 border border-line-strong rounded-lg pl-3 pr-9 py-2 text-sm";

function NewUserForm({ onCreated, onCancel }) {
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
      toast.success("User created.");
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
    <form onSubmit={submit}>
      {error && <p role="alert" className="mb-4 text-sm text-maroon-400">{error}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Username *</span>
          <input data-testid="new-username" value={form.username} onChange={set("username")} className={inputCls} required />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">First name</span>
          <input value={form.first_name} onChange={set("first_name")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Last name</span>
          <input value={form.last_name} onChange={set("last_name")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Email</span>
          <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Role</span>
          <select value={form.role} onChange={set("role")} className={selectCls}>
            <option value="sales">Sales</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60">Password *</span>
          <input data-testid="new-password" type="password" value={form.password} onChange={set("password")} className={inputCls} required autoComplete="new-password" />
        </label>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <button type="submit" data-testid="create-user" disabled={busy} className="btn btn-primary">
          <PlusIcon size={14} weight="bold" /> {busy ? "Creating…" : "Create user"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>
      </div>
    </form>
  );
}

export default function Users() {
  const [page, setPage] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    admin
      .listUsers({ page: pageNum })
      .then(setPage)
      .catch(() => setError("Could not load users."));
  }, [pageNum]);
  useEffect(load, [load]);

  const users = page?.results || [];

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
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl mb-1">Users</h1>
          <p className="text-sm text-bone-100/60">
            The team. Deactivate instead of deleting, so their leads keep an author.
          </p>
        </div>
        <button data-testid="add-user-btn" onClick={() => setAddOpen(true)} className="btn btn-primary">
          <PlusIcon size={14} weight="bold" /> Add user
        </button>
      </div>

      {error && <p role="alert" className="text-maroon-400 mb-4">{error}</p>}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add user" size="3xl">
        <NewUserForm onCreated={() => { setAddOpen(false); load(); }} onCancel={() => setAddOpen(false)} />
      </Modal>

      <div className="border border-line rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]" data-testid="users-table">
          <thead>
            <tr className="border-b border-line text-left">
              {["User", "Role", "Status", "Joined", ""].map((h) => (
                <th key={h} className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-100/60 px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line">
                <td className="px-4 py-3">
                  <p className="text-bone-100">{u.name}</p>
                  <p className="text-xs text-bone-100/60">
                    @{u.username}{u.email ? ` · ${u.email}` : ""}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u, e.target.value)}
                    className="bg-maroon-950 border border-line-strong rounded-lg pl-2 pr-7 py-1 text-xs"
                  >
                    {Object.entries(ROLE_LABEL).map(([id, label]) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={u.is_active ? "text-[#059669]" : "text-maroon-400"}>
                    {u.is_active ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-4 py-3 text-bone-100/60 text-xs whitespace-nowrap">
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

      <Pagination page={page} pageNum={pageNum} onChange={setPageNum} label="users" />
    </div>
  );
}
