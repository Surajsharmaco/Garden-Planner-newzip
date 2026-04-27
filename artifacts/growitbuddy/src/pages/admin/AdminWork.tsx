import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { ImageCropUploader } from "@/components/admin/ImageCropUploader";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface WorkStat {
  label: string;
  value: string;
}

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  stats: WorkStat[];
  imageUrl: string;
}

const DEFAULT_WORK: WorkItem[] = [
  {
    id: "1",
    title: "Tech Founder to Industry Voice",
    subtitle: "LinkedIn Authority Campaign",
    category: "B2B SaaS · LinkedIn",
    metric: "14M",
    metricLabel: "impressions",
    description: "A full content marketing system took this founder from zero online presence to the most-cited authority in their SaaS niche - in 6 months.",
    tags: ["LinkedIn", "B2B SaaS"],
    stats: [],
    imageUrl: "",
  },
  {
    id: "2",
    title: "Agency Owner Authority Engine",
    subtitle: "Multi-channel content strategy",
    category: "Services · Multi-channel",
    metric: "$2.4M",
    metricLabel: "inbound pipeline",
    description: "A systematic content strategy and distribution system drove inbound pipeline that exceeded prior annual revenue.",
    tags: ["Content Strategy"],
    stats: [],
    imageUrl: "",
  },
  {
    id: "3",
    title: "Creator Monetization System",
    subtitle: "YouTube authority build",
    category: "Creator Economy · YouTube",
    metric: "250K",
    metricLabel: "subscribers",
    description: "A content strategy built around a proprietary framework compounded into 250K subscribers and $40K/mo in revenue.",
    tags: ["YouTube", "Creator"],
    stats: [],
    imageUrl: "",
  },
  {
    id: "4",
    title: "Executive Personal Brand",
    subtitle: "Podcast & PR strategy",
    category: "Leadership · Podcast & PR",
    metric: "15+",
    metricLabel: "speaking invites / qtr",
    description: "Personal branding strategy turned a quiet operator into a recognized industry thought leader with consistent media placement.",
    tags: ["Personal Brand", "PR"],
    stats: [],
    imageUrl: "",
  },
  {
    id: "5",
    title: "E-commerce Founder Growth",
    subtitle: "X / Twitter brand build",
    category: "E-commerce · X / Twitter",
    metric: "400%",
    metricLabel: "branded search growth",
    description: "A personal brand-first content marketing approach made this founder synonymous with their product category.",
    tags: ["X / Twitter", "E-commerce"],
    stats: [],
    imageUrl: "",
  },
  {
    id: "6",
    title: "VC Authority Engine",
    subtitle: "LinkedIn positioning",
    category: "Finance · LinkedIn",
    metric: "3x",
    metricLabel: "deal flow growth",
    description: "Content strategy and personal branding positioned this venture firm as the category expert - attracting better deals at higher velocity.",
    tags: ["Finance", "LinkedIn"],
    stats: [],
    imageUrl: "",
  },
];

function WorkRow({
  item,
  index,
  onChange,
  onDelete,
}: {
  item: WorkItem;
  index: number;
  onChange: (i: number, val: WorkItem) => void;
  onDelete: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<WorkItem>) => onChange(index, { ...item, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 text-left min-w-0"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#0B0B0B]/50 bg-[#0B0B0B]/6 px-2 py-0.5 rounded-full shrink-0">{item.category}</span>
              <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{item.title || "Untitled Case Study"}</p>
            </div>
            <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{item.subtitle}</p>
          </div>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40 shrink-0" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40 shrink-0" />}
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Title" value={item.title} onChange={(e) => set({ title: e.target.value })} />
            <Input label="Subtitle" value={item.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
            <Input label="Category" value={item.category} onChange={(e) => set({ category: e.target.value })} placeholder="Founder Brand" />
            <div className="col-span-2">
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Case Study Image</label>
              <ImageCropUploader value={item.imageUrl} onChange={(url) => set({ imageUrl: url })} />
            </div>
            <Input label="Key Metric" value={item.metric} onChange={(e) => set({ metric: e.target.value })} placeholder="10x" />
            <Input label="Metric Label" value={item.metricLabel} onChange={(e) => set({ metricLabel: e.target.value })} placeholder="inbound leads in 90 days" />
          </div>

          <Textarea
            label="Description"
            value={item.description}
            onChange={(e) => set({ description: e.target.value })}
            rows={3}
          />

          <Input
            label="Tags (comma-separated)"
            value={item.tags.join(", ")}
            onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            placeholder="LinkedIn, B2B SaaS, Content Strategy"
          />

          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Stats (up to 3)</label>
            <div className="space-y-2">
              {(item.stats.length > 0 ? item.stats : [{ label: "", value: "" }]).map((stat, si) => (
                <div key={si} className="flex gap-2 items-center">
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...item.stats];
                      updated[si] = { ...stat, label: e.target.value };
                      set({ stats: updated });
                    }}
                    placeholder="Stat label"
                  />
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...item.stats];
                      updated[si] = { ...stat, value: e.target.value };
                      set({ stats: updated });
                    }}
                    placeholder="+420%"
                  />
                  <button
                    onClick={() => set({ stats: item.stats.filter((_, sIdx) => sIdx !== si) })}
                    className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              {item.stats.length < 3 && (
                <button
                  onClick={() => set({ stats: [...item.stats, { label: "", value: "" }] })}
                  className="text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] flex items-center gap-1"
                >
                  <Plus size={12} /> Add stat
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminWork() {
  const { getContent, saveContent } = useAdmin();
  const [items, setItems] = useState<WorkItem[]>(DEFAULT_WORK);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [headline, setHeadline] = useState("Proof of authority at scale.");
  const [subtext, setSubtext] = useState("Our clients expect outcomes. We measure our success by theirs. Here's the proof.");

  useEffect(() => {
    getContent("work").then((d) => {
      if (!d) return;
      if (d.items) setItems(d.items as WorkItem[]);
      if (d.headline) setHeadline(d.headline as string);
      if (d.subtext) setSubtext(d.subtext as string);
    });
  }, [getContent]);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("work", { headline, subtext, items });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="Work / Portfolio" description="Manage case studies and portfolio pieces." />

      <Card className="mb-5">
        <SectionTitle>Section Header</SectionTitle>
        <div className="space-y-3">
          <Input label="Headline" value={headline} onChange={(e) => { setHeadline(e.target.value); setSaved(false); }} />
          <Textarea label="Subtext" value={subtext} onChange={(e) => { setSubtext(e.target.value); setSaved(false); }} rows={2} />
        </div>
      </Card>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => { setSaved(false); setItems((p) => [...p, { id: Date.now().toString(), title: "", subtitle: "", category: "", metric: "", metricLabel: "", description: "", tags: [], stats: [], imageUrl: "" }]); }}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Add Case Study
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <WorkRow
            key={item.id + i}
            item={item}
            index={i}
            onChange={(idx, val) => { setSaved(false); setItems((p) => p.map((x, xi) => xi === idx ? val : x)); }}
            onDelete={(idx) => { if (!confirm("Remove?")) return; setSaved(false); setItems((p) => p.filter((_, xi) => xi !== idx)); }}
          />
        ))}
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
