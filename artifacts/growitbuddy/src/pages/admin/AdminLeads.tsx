import { useEffect, useState, useCallback } from "react";
import { PageHeader, Card } from "@/components/admin/AdminField";
import { Trash2, Download, RefreshCw, Search, Mail, User, Clock } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface Lead {
  id: number;
  type: string;
  name: string | null;
  email: string;
  data: Record<string, unknown>;
  createdAt: string;
}

const TYPE_META: Record<string, { label: string; color: string; bg: string }> = {
  contact:    { label: "Contact",    color: "#2563eb", bg: "#eff6ff" },
  creator:    { label: "Creator",    color: "#7c3aed", bg: "#f5f3ff" },
  freelancer: { label: "Freelancer", color: "#059669", bg: "#ecfdf5" },
  "full-time":{ label: "Full-Time",  color: "#d97706", bg: "#fffbeb" },
  newsletter: { label: "Newsletter", color: "#db2777", bg: "#fdf2f8" },
};

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function TypeBadge({ type }: { type: string }) {
  const m = TYPE_META[type] ?? { label: type, color: "#6b7280", bg: "#f3f4f6" };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, background: m.bg, color: m.color }}>
      {m.label}
    </span>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const token = localStorage.getItem("gb_admin_token");
  const headers = { Authorization: `Bearer ${token}` };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/admin/leads?type=${typeFilter}`, { headers });
      const data = await r.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this lead permanently?")) return;
    await fetch(`${API_BASE}/admin/leads/${id}`, { method: "DELETE", headers });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function exportCSV() {
    const filtered = leads.filter((l) => {
      const q = search.toLowerCase();
      return !q || (l.name ?? "").toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
    });
    const rows = [
      ["ID", "Type", "Name", "Email", "Date", "Details"],
      ...filtered.map((l) => [
        l.id,
        l.type,
        l.name ?? "",
        l.email,
        fmt(l.createdAt),
        JSON.stringify(l.data),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "growitbuddy-leads.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const visible = leads.filter((l) => {
    const q = search.toLowerCase();
    return !q || (l.name ?? "").toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
  });

  const byType = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + 1; return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Leads & CRM"
        description={`${leads.length} total submission${leads.length !== 1 ? "s" : ""} across all forms`}
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[{ key: "all", label: "Total" }, ...Object.keys(TYPE_META).map((k) => ({ key: k, label: TYPE_META[k].label }))].map(({ key, label }) => {
          const count = key === "all" ? leads.length : (byType[key] ?? 0);
          const m = key === "all" ? null : TYPE_META[key];
          return (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`text-left p-3 rounded-xl border transition-all ${typeFilter === key ? "border-[#0B0B0B] bg-[#0B0B0B] text-white" : "border-[#0B0B0B]/10 bg-white hover:border-[#0B0B0B]/25"}`}
            >
              <p className={`text-[22px] font-black tracking-tight ${typeFilter === key ? "text-white" : "text-[#0B0B0B]"}`}>{count}</p>
              <p className={`text-[11px] font-semibold mt-0.5 ${typeFilter === key ? "text-white/60" : "text-[#0B0B0B]/40"}`}>{label}</p>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B0B0B]/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#0B0B0B]/12 rounded-xl text-[13px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/30 bg-white"
          />
        </div>
        <button onClick={load} className="p-2.5 border border-[#0B0B0B]/12 rounded-xl hover:bg-[#0B0B0B]/5 text-[#0B0B0B]/50 transition-colors">
          <RefreshCw size={15} />
        </button>
        <button onClick={exportCSV} className="flex items-center gap-2 border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-[#0B0B0B]/60 hover:bg-[#0B0B0B]/5 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-[13px] text-[#0B0B0B]/35">Loading leads...</div>
        ) : visible.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] font-semibold text-[#0B0B0B]/30">No leads yet</p>
            <p className="text-[12px] text-[#0B0B0B]/25 mt-1">Form submissions will appear here automatically</p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="grid grid-cols-[120px_1fr_1fr_140px_44px] gap-0 px-5 py-3 border-b border-[#0B0B0B]/6 bg-[#FAFAFA]">
              {["Type", "Name", "Email", "Date", ""].map((h) => (
                <span key={h} className="text-[10px] font-bold text-[#0B0B0B]/35 uppercase tracking-widest">{h}</span>
              ))}
            </div>

            {visible.map((lead) => (
              <div key={lead.id}>
                <button
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  className="w-full grid grid-cols-[120px_1fr_1fr_140px_44px] gap-0 px-5 py-3.5 border-b border-[#0B0B0B]/5 hover:bg-[#0B0B0B]/3 transition-colors text-left"
                >
                  <div><TypeBadge type={lead.type} /></div>
                  <div className="flex items-center gap-2 min-w-0 pr-3">
                    <User size={12} className="text-[#0B0B0B]/25 shrink-0" />
                    <span className="text-[13px] text-[#0B0B0B] truncate">{lead.name || <span className="text-[#0B0B0B]/30 italic">No name</span>}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 pr-3">
                    <Mail size={12} className="text-[#0B0B0B]/25 shrink-0" />
                    <span className="text-[13px] text-[#0B0B0B]/70 truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-[#0B0B0B]/25 shrink-0" />
                    <span className="text-[11px] text-[#0B0B0B]/40">{fmt(lead.createdAt)}</span>
                  </div>
                  <div />
                </button>

                {expanded === lead.id && (
                  <div className="px-5 py-4 bg-[#FAFAFA] border-b border-[#0B0B0B]/6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 flex-1">
                        {Object.entries(lead.data).filter(([, v]) => v).map(([k, v]) => (
                          <div key={k}>
                            <p className="text-[10px] font-bold text-[#0B0B0B]/35 uppercase tracking-wider mb-0.5">{k}</p>
                            <p className="text-[12px] text-[#0B0B0B] break-words">{String(v)}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {visible.length > 0 && (
        <p className="text-[11px] text-[#0B0B0B]/30 text-center mt-3">
          Showing {visible.length} of {leads.length} leads. Click a row to expand details.
        </p>
      )}
    </div>
  );
}
