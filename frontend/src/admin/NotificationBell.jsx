import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@phosphor-icons/react";
import { notifications as api } from "../lib/api.js";
import { formatDateTime } from "./constants.js";

export default function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef(null);

  const refreshCount = useCallback(() => {
    api.unreadCount().then((r) => setUnread(r.count)).catch(() => {});
  }, []);

  useEffect(() => {
    refreshCount();
    // Poll every 30s so a new lead surfaces without a page reload.
    const timer = setInterval(refreshCount, 30_000);
    return () => clearInterval(timer);
  }, [refreshCount]);

  // Close on outside click.
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next) {
      const page = await api.list().catch(() => ({ results: [] }));
      setItems(page.results || []);
      await api.markAllRead().catch(() => {});
      setUnread(0);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={toggle} aria-label="Notifications" data-testid="notif-bell" className="relative p-2 text-bone-100/60 hover:text-bone-100">
        <BellIcon size={18} weight={unread > 0 ? "fill" : "regular"} />
        {unread > 0 && (
          <span data-testid="notif-count" className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-maroon-500 text-bone-50 text-[9px] font-mono flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div data-testid="notif-panel" className="absolute right-0 mt-2 w-80 max-h-[60vh] overflow-y-auto bg-maroon-950 border border-line-strong rounded-lg shadow-2xl z-50">
          <div className="px-4 py-3 border-b border-line font-mono text-[10px] tracking-[0.2em] uppercase text-bone-100/60">
            Notifications
          </div>
          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-bone-100/60">Nothing yet.</p>
          ) : (
            <ul>
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { setOpen(false); if (n.link) navigate(n.link); }}
                    className="w-full text-left px-4 py-3 border-b border-line hover:bg-hover"
                  >
                    <p className="text-sm text-bone-100/90">{n.text}</p>
                    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-bone-100/60 mt-1">
                      {formatDateTime(n.created_at)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
