import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2, ChevronDown, ChevronUp, ShieldCheck, ShieldX, Copy, ExternalLink } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface Certificate {
  id: number;
  certificateId: string;
  name: string;
  email: string | null;
  role: string;
  issueDate: string;
  status: "verified" | "revoked";
  createdAt: string;
}

const STATUSES = ["verified", "revoked"] as const;

function generateId(): string {
  const prefix = "GB";
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${rand}`;
}

function CertRow({
  cert,
  onUpdate,
  onDelete,
}: {
  cert: Certificate;
  onUpdate: (cert: Certificate) => void;
  onDelete: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...cert });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const { authFetch } = useAdmin();

  const set = (patch: Partial<typeof form>) => {
    setForm((p) => ({ ...p, ...patch }));
    setSaved(false);
  };

  async function handleSave() {
    setSaving(true);
    try {
      const res = await authFetch(`${API_BASE}/admin/certificates/${cert.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          issueDate: form.issueDate,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Save failed");
        return;
      }
      const updated = await res.json();
      onUpdate(updated);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function copyLink() {
    const url = `${window.location.origin}${import.meta.env.BASE_URL}verify/${cert.certificateId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const verifyUrl = `${import.meta.env.BASE_URL}verify/${cert.certificateId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(window.location.origin + "/" + verifyUrl.replace(/^\//, ""))}`;

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 text-left min-w-0"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {cert.status === "verified" ? (
                <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              ) : (
                <ShieldX size={14} className="text-red-400 shrink-0" />
              )}
              <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{cert.name}</p>
              <span className="text-[10px] font-bold text-[#0B0B0B]/40 bg-[#0B0B0B]/6 px-2 py-0.5 rounded-full shrink-0 font-mono">
                {cert.certificateId}
              </span>
            </div>
            <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{cert.role} &middot; {cert.issueDate}</p>
          </div>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40 shrink-0" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40 shrink-0" />}
        </button>
        <button
          onClick={() => onDelete(cert.id)}
          className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" value={form.name} onChange={(e) => set({ name: e.target.value })} />
            <Input label="Email (optional)" value={form.email || ""} onChange={(e) => set({ email: e.target.value })} />
            <Input label="Role / Program" value={form.role} onChange={(e) => set({ role: e.target.value })} placeholder="Intern, Contributor, etc." />
            <Input label="Issue Date" value={form.issueDate} onChange={(e) => set({ issueDate: e.target.value })} placeholder="e.g. January 2025" />
            <div className="col-span-2">
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Status</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => set({ status: s })}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                      form.status === s
                        ? s === "verified"
                          ? "bg-emerald-500 text-white"
                          : "bg-red-400 text-white"
                        : "bg-[#0B0B0B]/6 text-[#0B0B0B]/50 hover:bg-[#0B0B0B]/10"
                    }`}
                  >
                    {s === "verified" ? <ShieldCheck size={13} /> : <ShieldX size={13} />}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-[#0B0B0B]/8 rounded-xl p-4 flex gap-6 items-start bg-[#F7F7F5]">
            <img src={qrUrl} alt="QR Code" className="w-20 h-20 shrink-0 rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-[#0B0B0B]/40 uppercase tracking-wider mb-1">Certificate ID</p>
              <p className="text-[15px] font-bold text-[#0B0B0B] font-mono mb-2">{cert.certificateId}</p>
              <p className="text-[11px] text-[#0B0B0B]/40 mb-3 truncate">{verifyUrl}</p>
              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                >
                  <Copy size={12} />
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                >
                  <ExternalLink size={12} />
                  Preview
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            {saved && <span className="text-[12px] text-emerald-500 font-semibold self-center">Saved</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminCertificates() {
  const { authFetch } = useAdmin();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({
    certificateId: generateId(),
    name: "",
    email: "",
    role: "",
    issueDate: "",
    status: "verified" as "verified" | "revoked",
  });

  useEffect(() => {
    authFetch(`${API_BASE}/admin/certificates`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCerts(data);
      })
      .finally(() => setLoading(false));
  }, [authFetch]);

  async function handleCreate() {
    if (!newForm.certificateId || !newForm.name || !newForm.role || !newForm.issueDate) {
      alert("Certificate ID, name, role, and issue date are required.");
      return;
    }
    setCreating(true);
    try {
      const res = await authFetch(`${API_BASE}/admin/certificates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Creation failed"); return; }
      setCerts((p) => [data, ...p]);
      setShowNew(false);
      setNewForm({ certificateId: generateId(), name: "", email: "", role: "", issueDate: "", status: "verified" });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this certificate? This cannot be undone.")) return;
    await authFetch(`${API_BASE}/admin/certificates/${id}`, { method: "DELETE" });
    setCerts((p) => p.filter((c) => c.id !== id));
  }

  const verified = certs.filter((c) => c.status === "verified").length;
  const revoked = certs.filter((c) => c.status === "revoked").length;

  return (
    <div>
      <PageHeader
        title="Certificates"
        description="Issue and manage certificates for interns, contributors, and collaborators."
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total", value: certs.length, color: "#0B0B0B" },
          { label: "Verified", value: verified, color: "#10b981" },
          { label: "Revoked", value: revoked, color: "#f87171" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center py-4">
            <p style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", color }}>{value}</p>
            <p className="text-[12px] text-[#0B0B0B]/40 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowNew((p) => !p)}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Issue Certificate
        </button>
      </div>

      {showNew && (
        <Card className="mb-5">
          <SectionTitle>New Certificate</SectionTitle>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="col-span-2 flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label="Certificate ID"
                  value={newForm.certificateId}
                  onChange={(e) => setNewForm((p) => ({ ...p, certificateId: e.target.value.toUpperCase() }))}
                  placeholder="GB-2025-XXXXX"
                />
              </div>
              <button
                onClick={() => setNewForm((p) => ({ ...p, certificateId: generateId() }))}
                className="px-3 py-2 text-[12px] font-semibold text-[#0B0B0B]/50 hover:text-[#0B0B0B] bg-[#0B0B0B]/6 rounded-xl hover:bg-[#0B0B0B]/10 transition-colors shrink-0 mb-0.5"
              >
                Auto-generate
              </button>
            </div>
            <Input label="Full Name" value={newForm.name} onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))} />
            <Input label="Email (optional)" value={newForm.email} onChange={(e) => setNewForm((p) => ({ ...p, email: e.target.value }))} />
            <Input label="Role / Program" value={newForm.role} onChange={(e) => setNewForm((p) => ({ ...p, role: e.target.value }))} placeholder="Content Marketing Intern" />
            <Input label="Issue Date" value={newForm.issueDate} onChange={(e) => setNewForm((p) => ({ ...p, issueDate: e.target.value }))} placeholder="January 2025" />
            <div className="col-span-2">
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Status</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewForm((p) => ({ ...p, status: s }))}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                      newForm.status === s
                        ? s === "verified" ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                        : "bg-[#0B0B0B]/6 text-[#0B0B0B]/50 hover:bg-[#0B0B0B]/10"
                    }`}
                  >
                    {s === "verified" ? <ShieldCheck size={13} /> : <ShieldX size={13} />}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowNew(false)} className="px-4 py-2 text-[13px] text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="bg-[#0B0B0B] text-white text-[13px] font-semibold px-5 py-2 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Issue Certificate"}
            </button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-16 text-[#0B0B0B]/30 text-sm">Loading certificates...</div>
      ) : certs.length === 0 ? (
        <Card className="text-center py-12">
          <ShieldCheck size={28} className="mx-auto text-[#0B0B0B]/15 mb-3" />
          <p className="text-[14px] font-semibold text-[#0B0B0B]/40">No certificates yet</p>
          <p className="text-[12px] text-[#0B0B0B]/25 mt-1">Click "Issue Certificate" to create your first one.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {certs.map((cert) => (
            <CertRow
              key={cert.id}
              cert={cert}
              onUpdate={(updated) => setCerts((p) => p.map((c) => (c.id === updated.id ? updated : c)))}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
