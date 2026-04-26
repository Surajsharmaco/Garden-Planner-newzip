import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";
const TOKEN_KEY = "gb_admin_token";

interface AdminContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  getContent: (section: string) => Promise<Record<string, unknown> | null>;
  saveContent: (section: string, data: Record<string, unknown>) => Promise<void>;
  authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const isAuthenticated = token !== null;

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const authHeaders = useCallback(
    (extra?: Record<string, string>): Record<string, string> => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenRef.current ?? ""}`,
      ...extra,
    }),
    [],
  );

  const authFetch = useCallback(
    async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const headers = new Headers(init?.headers);
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${tokenRef.current ?? ""}`);
      }
      const res = await fetch(input, { ...init, headers });
      if (res.status === 401) {
        clearSession();
      }
      return res;
    },
    [clearSession],
  );

  const runVerify = useCallback(async () => {
    const t = tokenRef.current;
    if (!t) return;
    try {
      const r = await fetch(`${API_BASE}/admin/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!r.ok) clearSession();
    } catch {
    }
  }, [clearSession]);

  useEffect(() => {
    runVerify();
    const id = setInterval(runVerify, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [runVerify]);

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
    tokenRef.current = t;
  }, []);

  const logout = useCallback(async () => {
    const t = tokenRef.current;
    if (t) {
      await fetch(`${API_BASE}/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${t}` },
      }).catch(() => {});
    }
    clearSession();
  }, [clearSession]);

  const getContent = useCallback(
    async (section: string): Promise<Record<string, unknown> | null> => {
      const r = await authFetch(`${API_BASE}/admin/content/${section}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!r.ok) return null;
      const row = await r.json();
      return row.data ?? null;
    },
    [authFetch],
  );

  const saveContent = useCallback(
    async (section: string, data: Record<string, unknown>) => {
      const r = await authFetch(`${API_BASE}/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!r.ok) throw new Error("Save failed");
    },
    [authFetch],
  );

  return (
    <AdminContext.Provider value={{ token, isAuthenticated, login, logout, getContent, saveContent, authFetch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
