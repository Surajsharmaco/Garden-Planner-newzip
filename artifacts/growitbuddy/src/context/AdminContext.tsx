import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";
const TOKEN_KEY = "gb_admin_token";

export type AdminRole = "super" | "member";

export const ALL_PERMISSIONS = [
  { key: "leads", label: "Leads & CRM" },
  { key: "certificates", label: "Certificates" },
  { key: "home", label: "Home Page" },
  { key: "services", label: "Services" },
  { key: "framework", label: "Framework" },
  { key: "work", label: "Work" },
  { key: "blog", label: "Blog / Insights" },
  { key: "resources", label: "Resources" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
  { key: "influencers", label: "Influencers" },
  { key: "influencer-explore", label: "Influencer Explore" },
  { key: "distribution-network", label: "Distribution Network" },
  { key: "distribution-pages", label: "Distribution Pages" },
  { key: "authority-audit", label: "Authority Audit" },
  { key: "join-network", label: "Join Network" },
  { key: "freelancers", label: "Freelancers Page" },
  { key: "full-time", label: "Full-Time Page" },
  { key: "media", label: "Media Library" },
  { key: "navbar", label: "Navbar" },
  { key: "footer", label: "Footer" },
  { key: "settings", label: "Settings" },
] as const;

export type PermissionKey = (typeof ALL_PERMISSIONS)[number]["key"];

interface AdminContextValue {
  token: string | null;
  isAuthenticated: boolean;
  role: AdminRole | null;
  permissions: string[];
  isSuperAdmin: boolean;
  verifying: boolean;
  hasPermission: (perm: string) => boolean;
  login: (password: string) => Promise<void>;
  teamLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getContent: (section: string) => Promise<Record<string, unknown> | null>;
  saveContent: (section: string, data: Record<string, unknown>) => Promise<void>;
  authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [role, setRole] = useState<AdminRole | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [verifying, setVerifying] = useState(true);
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const isAuthenticated = token !== null;
  const isSuperAdmin = role === "super";

  const hasPermission = useCallback(
    (perm: string): boolean => {
      if (role === "super") return true;
      if (permissions.includes("all")) return true;
      return permissions.includes(perm);
    },
    [role, permissions],
  );

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setRole(null);
    setPermissions([]);
  }, []);

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
    if (!t) {
      setVerifying(false);
      return;
    }
    try {
      const r = await fetch(`${API_BASE}/admin/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!r.ok) {
        clearSession();
      } else {
        const data = await r.json();
        setRole(data.role ?? null);
        setPermissions(data.permissions ?? []);
      }
    } catch {
    } finally {
      setVerifying(false);
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
    const data = await r.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    tokenRef.current = data.token;
    setRole(data.role ?? "super");
    setPermissions(data.permissions ?? ["all"]);
  }, []);

  const teamLogin = useCallback(async (email: string, password: string) => {
    const r = await fetch(`${API_BASE}/admin/team/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Login failed");
    }
    const data = await r.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    tokenRef.current = data.token;
    setRole(data.role ?? "member");
    setPermissions(data.permissions ?? []);
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
    <AdminContext.Provider
      value={{
        token,
        isAuthenticated,
        role,
        permissions,
        isSuperAdmin,
        verifying,
        hasPermission,
        login,
        teamLogin,
        logout,
        getContent,
        saveContent,
        authFetch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
