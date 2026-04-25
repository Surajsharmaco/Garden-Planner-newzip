import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card } from "@/components/admin/AdminField";
import {
  Settings,
  Users,
  FileText,
  Briefcase,
  Home,
  Layers,
  Info,
  AlignLeft,
  Menu as MenuIcon,
} from "lucide-react";

interface SectionStatus {
  section: string;
  updatedAt: string;
}

const sectionMeta: Record<string, { label: string; icon: React.ReactNode; path: string; desc: string }> = {
  settings: { label: "Site Settings", icon: <Settings size={18} />, path: "/admin/settings", desc: "Cursor, font scale, company info" },
  home: { label: "Home Page", icon: <Home size={18} />, path: "/admin/home", desc: "Hero, stats, testimonials" },
  services: { label: "Services", icon: <Layers size={18} />, path: "/admin/services", desc: "Service offerings & features" },
  work: { label: "Work", icon: <Briefcase size={18} />, path: "/admin/work", desc: "Portfolio & case studies" },
  influencers: { label: "Influencers", icon: <Users size={18} />, path: "/admin/influencers", desc: "Creator roster with CRUD" },
  blog: { label: "Blog / Insights", icon: <FileText size={18} />, path: "/admin/blog", desc: "Articles & insight posts" },
  about: { label: "About", icon: <Info size={18} />, path: "/admin/about", desc: "Founder, team, values" },
  navbar: { label: "Navbar", icon: <MenuIcon size={18} />, path: "/admin/navbar", desc: "Navigation links" },
  footer: { label: "Footer", icon: <AlignLeft size={18} />, path: "/admin/footer", desc: "Footer links & contact" },
};

export default function AdminDashboard() {
  const { getContent } = useAdmin();
  const [sections, setSections] = useState<SectionStatus[]>([]);

  useEffect(() => {
    const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";
    const token = localStorage.getItem("gb_admin_token");
    fetch(`${API_BASE}/admin/sections`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setSections)
      .catch(() => {});
  }, [getContent]);

  const savedSlugs = new Set(sections.map((s) => s.section));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage every section of the GrowitBuddy website from one place."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(sectionMeta).map(([key, meta]) => {
          const saved = savedSlugs.has(key);
          const row = sections.find((s) => s.section === key);
          return (
            <Link key={key} href={meta.path}>
              <a className="block group">
                <Card className="hover:border-[#0B0B0B]/20 transition-all cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0B0B0B]/6 flex items-center justify-center text-[#0B0B0B]/60 group-hover:bg-[#0B0B0B] group-hover:text-white transition-all">
                      {meta.icon}
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        saved
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {saved ? "Saved" : "Default"}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#0B0B0B] mb-1">{meta.label}</h3>
                  <p className="text-[12px] text-[#0B0B0B]/45">{meta.desc}</p>
                  {saved && row && (
                    <p className="text-[11px] text-[#0B0B0B]/30 mt-2">
                      Updated {new Date(row.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
