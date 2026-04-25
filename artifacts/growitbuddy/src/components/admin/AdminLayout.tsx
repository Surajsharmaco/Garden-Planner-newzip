import { Link, useLocation } from "wouter";
import { useAdmin } from "@/context/AdminContext";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Briefcase,
  Home,
  Layers,
  Menu as MenuIcon,
  AlignLeft,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={16} /> },
  { label: "Site Settings", path: "/admin/settings", icon: <Settings size={16} /> },
  { label: "Home Page", path: "/admin/home", icon: <Home size={16} /> },
  { label: "Services", path: "/admin/services", icon: <Layers size={16} /> },
  { label: "Work", path: "/admin/work", icon: <Briefcase size={16} /> },
  { label: "Influencers", path: "/admin/influencers", icon: <Users size={16} /> },
  { label: "Blog / Insights", path: "/admin/blog", icon: <FileText size={16} /> },
  { label: "About", path: "/admin/about", icon: <Info size={16} /> },
  { label: "Navbar", path: "/admin/navbar", icon: <MenuIcon size={16} /> },
  { label: "Footer", path: "/admin/footer", icon: <AlignLeft size={16} /> },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdmin();
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F7F7F5]" style={{ fontFamily: "Inter, sans-serif" }}>
      <aside
        className={`flex flex-col bg-[#0B0B0B] text-white transition-all duration-200 ${collapsed ? "w-14" : "w-56"} shrink-0`}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
          {!collapsed && (
            <span className="text-[13px] font-black tracking-tighter">GrowitBuddy</span>
          )}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors ml-auto"
          >
            <ChevronRight size={14} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {!collapsed && (
          <div className="px-3 py-2">
            <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase">Admin Panel</span>
          </div>
        )}

        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/admin" && location.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex items-center gap-2.5 px-3 py-2 mx-1 rounded text-[13px] transition-colors ${
                    isActive
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-2">
          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2 w-full rounded text-[13px] text-white/40 hover:text-white hover:bg-white/8 transition-colors"
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
