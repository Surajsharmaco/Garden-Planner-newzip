import { useEffect, useState, useRef, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2, GripVertical, Image, Video, Eye, EyeOff, Upload, X } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface MicroStat { value: string; label: string; }
interface PerfStat { value: string; label: string; sublabel: string; }
interface ProofItem { id: string; type: "image" | "video"; url: string; caption: string; }
interface ClientLogo { id: string; url: string; name: string; }
interface CaseSnap { id: string; niche: string; result: string; }
interface WorkItem {
  id: string; title: string; subtitle: string; category: string;
  metric: string; metricLabel: string; description: string;
  tags: string[]; stats: { label: string; value: string }[]; imageUrl: string;
}

interface WorkData {
  heroHeadline: string;
  heroSubtext: string;
  heroMicroStats: MicroStat[];
  showPerformanceStats: boolean;
  performanceStats: PerfStat[];
  showProofModal: boolean;
  proofItems: ProofItem[];
  showClientLogos: boolean;
  clientLogosHeading: string;
  clientLogos: ClientLogo[];
  showCases: boolean;
  cases: CaseSnap[];
  showFlow: boolean;
  flowText: string;
  showCta: boolean;
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  headline: string;
  subtext: string;
  items: WorkItem[];
}

const BLANK: WorkData = {
  heroHeadline: "700M+ Views Generated",
  heroSubtext: "Across content and distribution systems",
  heroMicroStats: [
    { value: "22M+", label: "Monthly Views" },
    { value: "Multi-Page", label: "Distribution" },
    { value: "Organic", label: "Growth Systems" },
  ],
  showPerformanceStats: true,
  performanceStats: [
    { value: "22.6M", label: "Views in 30 days", sublabel: "Tracked across active distribution" },
    { value: "98%", label: "Reach from Reels", sublabel: "Algorithmic amplification" },
    { value: "Non-Followers", label: "Majority Audience", sublabel: "Cold reach, not just your base" },
  ],
  showProofModal: true,
  proofItems: [],
  showClientLogos: true,
  clientLogosHeading: "Worked with creators, brands and high-growth accounts",
  clientLogos: [],
  showCases: true,
  cases: [
    { id: "1", niche: "Doctor", result: "1M+ followers across pages" },
    { id: "2", niche: "Creator", result: "14M impressions in 45 days" },
    { id: "3", niche: "Brand", result: "400% branded search growth" },
  ],
  showFlow: true,
  flowText: "We don't just create content. We amplify it through distribution.",
  showCta: true,
  ctaHeadline: "See how this could work for your brand",
  ctaSubtext: "Book a free strategy call and let's scope your authority system.",
  ctaButtonText: "Book Strategy Call",
  ctaButtonUrl: "/contact",
  headline: "Proof of authority at scale.",
  subtext: "Our clients expect outcomes. We measure our success by theirs.",
  items: [],
};

const TABS = [
  { id: "hero", label: "Hero & CTA" },
  { id: "stats", label: "Performance Stats" },
  { id: "proof", label: "Proof Media" },
  { id: "logos", label: "Client Logos" },
  { id: "cases", label: "Case Snapshots" },
  { id: "visibility", label: "Visibility" },
];

function Toggle({ value, onChange, label, sublabel }: { value: boolean; onChange: (v: boolean) => void; label: string; sublabel?: string }) {
  return (
    <div className="flex items-center justify-between bg-[#F7F7F5] rounded-xl px-4 py-3">
      <div>
        <p className="text-[13px] font-semibold text-[#0B0B0B]">{label}</p>
        {sublabel && <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{sublabel}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-[#0B0B0B]" : "bg-[#0B0B0B]/15"}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-5" : "left-1"}`} />
      </button>
    </div>
  );
}

function ImageUploadButton({ onUploaded, uploading, setUploading, authFetch }: {
  onUploaded: (url: string) => void;
  uploading: boolean;
  setUploading: (v: boolean) => void;
  authFetch: ReturnType<typeof useAdmin>["authFetch"];
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await authFetch(`${API_BASE}/admin/upload`, { method: "POST", body: fd });
      if (r.ok) {
        const data = await r.json();
        onUploaded(data.url);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2 transition-colors disabled:opacity-40"
      >
        <Upload size={13} />
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </>
  );
}

export default function AdminWork() {
  const { getContent, saveContent, authFetch } = useAdmin();
  const [data, setData] = useState<WorkData>(BLANK);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("hero");
  const [uploading, setUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  useEffect(() => {
    getContent("work").then((d) => {
      if (!d) return;
      setData((prev) => ({ ...prev, ...d }));
    });
  }, [getContent]);

  const set = useCallback(<K extends keyof WorkData>(key: K, val: WorkData[K]) => {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("work", data as unknown as Record<string, unknown>);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <PageHeader title="Work Page" description="Control every section of the Work proof page." />

      <div className="flex gap-1 mb-6 bg-[#F7F7F5] rounded-xl p-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors ${
              tab === t.id ? "bg-white text-[#0B0B0B] shadow-sm" : "text-[#0B0B0B]/45 hover:text-[#0B0B0B]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: Hero & CTA */}
      {tab === "hero" && (
        <div className="space-y-5">
          <Card>
            <SectionTitle>Hero Section</SectionTitle>
            <div className="space-y-3">
              <Input label="Main Headline" value={data.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} placeholder="700M+ Views Generated" />
              <Input label="Subtext" value={data.heroSubtext} onChange={(e) => set("heroSubtext", e.target.value)} placeholder="Across content and distribution systems" />
            </div>
          </Card>

          <Card>
            <SectionTitle>Micro Stats (3 below headline)</SectionTitle>
            <div className="space-y-3">
              {(data.heroMicroStats ?? []).map((stat, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <Input label={i === 0 ? "Value" : undefined} value={stat.value} onChange={(e) => {
                    const updated = [...data.heroMicroStats];
                    updated[i] = { ...stat, value: e.target.value };
                    set("heroMicroStats", updated);
                  }} placeholder="22M+" />
                  <Input label={i === 0 ? "Label" : undefined} value={stat.label} onChange={(e) => {
                    const updated = [...data.heroMicroStats];
                    updated[i] = { ...stat, label: e.target.value };
                    set("heroMicroStats", updated);
                  }} placeholder="Monthly Views" />
                  <button
                    onClick={() => set("heroMicroStats", data.heroMicroStats.filter((_, xi) => xi !== i))}
                    className="p-2 rounded-lg text-[#0B0B0B]/25 hover:text-red-500 hover:bg-red-50 transition-colors mb-0.5"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              {(data.heroMicroStats ?? []).length < 6 && (
                <button
                  onClick={() => set("heroMicroStats", [...(data.heroMicroStats ?? []), { value: "", label: "" }])}
                  className="flex items-center gap-1.5 text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] transition-colors"
                >
                  <Plus size={12} /> Add stat
                </button>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle>Flow Section Text</SectionTitle>
            <Textarea label="Description" value={data.flowText} onChange={(e) => set("flowText", e.target.value)} rows={2} placeholder="We don't just create content..." />
          </Card>

          <Card>
            <SectionTitle>CTA Section</SectionTitle>
            <div className="space-y-3">
              <Input label="Headline" value={data.ctaHeadline} onChange={(e) => set("ctaHeadline", e.target.value)} />
              <Textarea label="Subtext" value={data.ctaSubtext} onChange={(e) => set("ctaSubtext", e.target.value)} rows={2} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Button Text" value={data.ctaButtonText} onChange={(e) => set("ctaButtonText", e.target.value)} />
                <Input label="Button URL" value={data.ctaButtonUrl} onChange={(e) => set("ctaButtonUrl", e.target.value)} placeholder="/contact" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Performance Stats */}
      {tab === "stats" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle>Performance Stat Cards</SectionTitle>
            <p className="text-[12px] text-[#0B0B0B]/40 mb-4">These display as large stat cards on the Work page. Keep numbers bold and clear.</p>
            <div className="space-y-4">
              {(data.performanceStats ?? []).map((stat, i) => (
                <div key={i} className="border border-[#0B0B0B]/8 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0B0B0B]/30 uppercase tracking-widest">Card {i + 1}</span>
                    <button
                      onClick={() => set("performanceStats", data.performanceStats.filter((_, xi) => xi !== i))}
                      className="p-1.5 rounded text-[#0B0B0B]/25 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Big Number / Value" value={stat.value} onChange={(e) => {
                      const updated = [...data.performanceStats];
                      updated[i] = { ...stat, value: e.target.value };
                      set("performanceStats", updated);
                    }} placeholder="22.6M" />
                    <Input label="Label" value={stat.label} onChange={(e) => {
                      const updated = [...data.performanceStats];
                      updated[i] = { ...stat, label: e.target.value };
                      set("performanceStats", updated);
                    }} placeholder="Views in 30 days" />
                  </div>
                  <Input label="Sub-label" value={stat.sublabel} onChange={(e) => {
                    const updated = [...data.performanceStats];
                    updated[i] = { ...stat, sublabel: e.target.value };
                    set("performanceStats", updated);
                  }} placeholder="Explanation text" />
                </div>
              ))}
              <button
                onClick={() => set("performanceStats", [...(data.performanceStats ?? []), { value: "", label: "", sublabel: "" }])}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#0B0B0B]/40 hover:text-[#0B0B0B] border border-[#0B0B0B]/12 rounded-xl px-4 py-2.5 transition-colors w-full justify-center"
              >
                <Plus size={14} /> Add Stat Card
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Proof Media */}
      {tab === "proof" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle>Proof Media for Modal</SectionTitle>
            <p className="text-[12px] text-[#0B0B0B]/40 mb-4">
              Upload screenshots or add YouTube video links. These appear inside the "View Real Data" modal. Visitors must click to see them.
            </p>

            <div className="flex gap-3 mb-5">
              <ImageUploadButton
                authFetch={authFetch}
                uploading={uploading}
                setUploading={setUploading}
                onUploaded={(url) => {
                  setSaved(false);
                  set("proofItems", [...(data.proofItems ?? []), {
                    id: Date.now().toString(),
                    type: "image",
                    url,
                    caption: "",
                  }]);
                }}
              />
              <button
                onClick={() => {
                  const url = prompt("Enter YouTube URL:");
                  if (!url) return;
                  setSaved(false);
                  set("proofItems", [...(data.proofItems ?? []), {
                    id: Date.now().toString(),
                    type: "video",
                    url,
                    caption: "",
                  }]);
                }}
                className="flex items-center gap-2 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2 transition-colors"
              >
                <Video size={13} />
                Add Video URL
              </button>
            </div>

            {(data.proofItems ?? []).length === 0 ? (
              <div className="text-center py-10 text-[#0B0B0B]/25">
                <Image size={28} className="mx-auto mb-2" />
                <p className="text-[13px]">No proof items yet. Upload screenshots or add a video URL.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(data.proofItems ?? []).map((item, i) => (
                  <div key={item.id} className="flex gap-3 items-start border border-[#0B0B0B]/8 rounded-xl p-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F7F7F5] flex-shrink-0 flex items-center justify-center">
                      {item.type === "image" ? (
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Video size={20} className="text-[#0B0B0B]/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === "image" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                          {item.type === "image" ? "IMAGE" : "VIDEO"}
                        </span>
                        <p className="text-[11px] text-[#0B0B0B]/35 truncate">{item.url}</p>
                      </div>
                      <Input
                        value={item.caption}
                        onChange={(e) => {
                          const updated = [...data.proofItems];
                          updated[i] = { ...item, caption: e.target.value };
                          set("proofItems", updated);
                        }}
                        placeholder="Caption (optional)"
                      />
                    </div>
                    <button
                      onClick={() => set("proofItems", data.proofItems.filter((_, xi) => xi !== i))}
                      className="p-1.5 rounded-lg text-[#0B0B0B]/25 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB: Client Logos */}
      {tab === "logos" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle>Client Logos</SectionTitle>
            <div className="space-y-3 mb-5">
              <Input
                label="Section Heading"
                value={data.clientLogosHeading}
                onChange={(e) => set("clientLogosHeading", e.target.value)}
                placeholder="Worked with creators, brands and high-growth accounts"
              />
            </div>

            <div className="flex gap-3 mb-4">
              <LogoUploadButton
                authFetch={authFetch}
                uploading={logoUploading}
                setUploading={setLogoUploading}
                onUploaded={(url) => {
                  setSaved(false);
                  set("clientLogos", [...(data.clientLogos ?? []), {
                    id: Date.now().toString(),
                    url,
                    name: "",
                  }]);
                }}
              />
            </div>

            {(data.clientLogos ?? []).length === 0 ? (
              <div className="text-center py-10 text-[#0B0B0B]/25">
                <Image size={28} className="mx-auto mb-2" />
                <p className="text-[13px]">No logos yet. Upload client or brand logos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(data.clientLogos ?? []).map((logo, i) => (
                  <div key={logo.id} className="border border-[#0B0B0B]/8 rounded-xl p-3 space-y-2">
                    <div className="h-12 flex items-center justify-center bg-[#F7F7F5] rounded-lg overflow-hidden">
                      <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <Input
                      value={logo.name}
                      onChange={(e) => {
                        const updated = [...data.clientLogos];
                        updated[i] = { ...logo, name: e.target.value };
                        set("clientLogos", updated);
                      }}
                      placeholder="Client name"
                    />
                    <button
                      onClick={() => set("clientLogos", data.clientLogos.filter((_, xi) => xi !== i))}
                      className="flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={11} /> Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB: Case Snapshots */}
      {tab === "cases" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Case Snapshots</SectionTitle>
              <button
                onClick={() => {
                  setSaved(false);
                  set("cases", [...(data.cases ?? []), { id: Date.now().toString(), niche: "", result: "" }]);
                }}
                className="flex items-center gap-1.5 text-[12px] font-semibold bg-[#0B0B0B] text-white px-3.5 py-2 rounded-xl hover:bg-[#222] transition-colors"
              >
                <Plus size={13} /> Add Case
              </button>
            </div>
            <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Simple cards with a niche label and a result statement. Keep results short and punchy.</p>

            {(data.cases ?? []).length === 0 ? (
              <div className="text-center py-8 text-[#0B0B0B]/25 text-[13px]">No cases yet.</div>
            ) : (
              <div className="space-y-3">
                {(data.cases ?? []).map((c, i) => (
                  <div key={c.id} className="flex gap-3 items-end border border-[#0B0B0B]/8 rounded-xl p-4">
                    <Input label="Niche" value={c.niche} onChange={(e) => {
                      const updated = [...data.cases];
                      updated[i] = { ...c, niche: e.target.value };
                      set("cases", updated);
                    }} placeholder="Doctor, Creator, Brand..." />
                    <Input label="Result" value={c.result} onChange={(e) => {
                      const updated = [...data.cases];
                      updated[i] = { ...c, result: e.target.value };
                      set("cases", updated);
                    }} placeholder="1M+ followers, 14M impressions..." />
                    <button
                      onClick={() => {
                        if (!confirm("Remove this case?")) return;
                        setSaved(false);
                        set("cases", data.cases.filter((_, xi) => xi !== i));
                      }}
                      className="p-2 rounded-lg text-[#0B0B0B]/25 hover:text-red-500 hover:bg-red-50 transition-colors mb-0.5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB: Visibility */}
      {tab === "visibility" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle>Section Visibility</SectionTitle>
            <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Toggle which sections appear on the public Work page.</p>
            <div className="space-y-2">
              <Toggle value={data.showPerformanceStats ?? true} onChange={(v) => set("showPerformanceStats", v)} label="Performance Stats Section" sublabel="The large stat cards (22.6M views, etc.)" />
              <Toggle value={data.showProofModal ?? true} onChange={(v) => set("showProofModal", v)} label="View Real Data Section" sublabel="Dark section with modal trigger button" />
              <Toggle value={data.showClientLogos ?? true} onChange={(v) => set("showClientLogos", v)} label="Client Logos Section" sublabel="Logo grid with grayscale hover effect" />
              <Toggle value={data.showCases ?? true} onChange={(v) => set("showCases", v)} label="Case Snapshots Section" sublabel="Simple niche + result cards" />
              <Toggle value={data.showFlow ?? true} onChange={(v) => set("showFlow", v)} label="System Flow Section" sublabel="Content -> Distribution -> Authority" />
              <Toggle value={data.showCta ?? true} onChange={(v) => set("showCta", v)} label="CTA Section" sublabel="Dark Book Strategy Call section" />
            </div>
          </Card>
        </div>
      )}

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}

function LogoUploadButton({ onUploaded, uploading, setUploading, authFetch }: {
  onUploaded: (url: string) => void;
  uploading: boolean;
  setUploading: (v: boolean) => void;
  authFetch: ReturnType<typeof useAdmin>["authFetch"];
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await authFetch(`${API_BASE}/admin/upload`, { method: "POST", body: fd });
      if (r.ok) {
        const data = await r.json();
        onUploaded(data.url);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2 transition-colors disabled:opacity-40"
      >
        <Upload size={13} />
        {uploading ? "Uploading..." : "Upload Logo"}
      </button>
    </>
  );
}
