import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";
const TOKEN_KEY = "gb_admin_token";

interface AdminContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  getContent: (section: string) => Promise<Record<string, unknown> | null>;
  saveContent: (section: string, data: Record<string, unknown>) => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  const isAuthenticated = token !== null;

  const authHeaders = useCallback(
    () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }),
    [token],
  );

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/admin/verify`, { headers: authHeaders() })
      .then((r) => { if (!r.ok) { setToken(null); localStorage.removeItem(TOKEN_KEY); } })
      .catch(() => {});
  }, []);

  const login = useCallback(async (password: string) => {
    const r = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Login failed");
    }
    const { token: t } = await r.json();
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      await fetch(`${API_BASE}/admin/logout`, { method: "POST", headers: authHeaders() }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, [token, authHeaders]);

  const getContent = useCallback(
    async (section: string): Promise<Record<string, unknown> | null> => {
      const r = await fetch(`${API_BASE}/admin/content/${section}`, { headers: authHeaders() });
      if (!r.ok) return null;
      const row = await r.json();
      return row.data ?? null;
    },
    [authHeaders],
  );

  const saveContent = useCallback(
    async (section: string, data: Record<string, unknown>) => {
      const r = await fetch(`${API_BASE}/admin/content/${section}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ data }),
      });
      if (!r.ok) throw new Error("Save failed");
    },
    [authHeaders],
  );

  return (
    <AdminContext.Provider value={{ token, isAuthenticated, login, logout, getContent, saveContent }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
