import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // `loading` guards the first render: without it, RequireAuth would bounce
  // an already-signed-in user to /admin/login before /auth/me resolves.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await auth.primeCsrf();
        const me = await auth.me();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null); // 401/403 simply means "signed out"
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    await auth.primeCsrf();
    const me = await auth.login(username, password);
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
