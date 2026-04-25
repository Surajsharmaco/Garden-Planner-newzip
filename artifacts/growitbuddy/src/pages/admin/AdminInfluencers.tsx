import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { influencers as DEFAULT_INFLUENCERS, NICHE_CATEGORIES, COUNTRIES, type Influencer } from "@/data/influencers";
import { PageHeader, Card, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2, ChevronDown, ChevronUp, Search } from "lucide-react";

const BLANK: Influencer = {
  slug: "",
  name: "",
  username: "",
  niche: "Business & Entrepreneurship",
  followers: "",
  engagementRate: "",
  description: "",
  photo: "",
  audienceCountries: [],
  initials: "",
  accentColor: "#0B0B0B",
  about: { creates: "", audience: "" },
  metrics: { avgViews: "", engagementRate: "", audienceLocation: "" },
  pastWork: { brands: [], sampleContent: [] },
  services: [],
};

function InfluencerRow({
  inf,
  index,
  onChange,
  onDelete,
  defaultOpen = false,
}: {
  inf: Influencer;
  index: number;
  onChange: (i: number, val: Influencer) => void;
  onDelete: (i: number) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const set = (patch: Partial<Influencer>) => onChange(index, { ...inf, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 text-left min-w-0"
        >
          {inf.photo ? (
            <img src={inf.photo} alt={inf.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#0B0B0B]/10 flex items-center justify-center text-[11px] font-bold text-[#0B0B0B]/50 shrink-0">
              {inf.initials || "?"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{inf.name || "Unnamed Influencer"}</p>
            <p className="text-[11px] text-[#0B0B0B]/40 truncate">{inf.niche} &bull; {inf.followers}</p>
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
            <Input label="Full Name" value={inf.name} onChange={(e) => set({ name: e.target.value })} />
            <Input label="Username / Handle" value={inf.username} onChange={(e) => set({ username: e.target.value })} />
            <Input
              label="Slug (URL)"
              value={inf.slug}
              onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              placeholder="first-last"
            />
            <div>
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Niche</label>
              <select
                value={inf.niche}
                onChange={(e) => set({ niche: e.target.value })}
                className="w-full border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[14px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/40 bg-white"
              >
                {NICHE_CATEGORIES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <Input label="Followers" value={inf.followers} onChange={(e) => set({ followers: e.target.value })} placeholder="284K" />
            <Input label="Engagement Rate" value={inf.engagementRate} onChange={(e) => set({ engagementRate: e.target.value })} placeholder="4.8%" />
            <Input label="Initials" value={inf.initials} onChange={(e) => set({ initials: e.target.value })} placeholder="AB" />
            <Input label="Accent Color" value={inf.accentColor} onChange={(e) => set({ accentColor: e.target.value })} placeholder="#0B0B0B" />
          </div>

          <Input
            label="Photo URL"
            value={inf.photo}
            onChange={(e) => set({ photo: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />
          <Textarea
            label="Short Description"
            value={inf.description}
            onChange={(e) => set({ description: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-2 gap-3">
            <Textarea
              label="About: What they create"
              value={inf.about.creates}
              onChange={(e) => set({ about: { ...inf.about, creates: e.target.value } })}
              rows={3}
            />
            <Textarea
              label="About: Their audience"
              value={inf.about.audience}
              onChange={(e) => set({ about: { ...inf.about, audience: e.target.value } })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Avg Views"
              value={inf.metrics.avgViews}
              onChange={(e) => set({ metrics: { ...inf.metrics, avgViews: e.target.value } })}
              placeholder="120K per post"
            />
            <Input
              label="Engagement Rate"
              value={inf.metrics.engagementRate}
              onChange={(e) => set({ metrics: { ...inf.metrics, engagementRate: e.target.value } })}
              placeholder="4.8%"
            />
            <Input
              label="Audience Location"
              value={inf.metrics.audienceLocation}
              onChange={(e) => set({ metrics: { ...inf.metrics, audienceLocation: e.target.value } })}
              placeholder="US (42%), UK (18%)"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Audience Countries</label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    const cur = inf.audienceCountries;
                    set({ audienceCountries: cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c] });
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[12px] font-medium border transition-colors ${
                    inf.audienceCountries.includes(c)
                      ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                      : "border-[#0B0B0B]/15 text-[#0B0B0B]/50 hover:border-[#0B0B0B]/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Past Brands (comma-separated)</label>
              <Input
                value={inf.pastWork.brands.join(", ")}
                onChange={(e) =>
                  set({ pastWork: { ...inf.pastWork, brands: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })
                }
                placeholder="Notion, Stripe, HubSpot"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Services (comma-separated)</label>
              <Input
                value={inf.services.join(", ")}
                onChange={(e) =>
                  set({ services: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                }
                placeholder="Sponsored Posts, Brand Collaborations"
              />
            </div>
          </div>

          <Textarea
            label="Sample Content (one per line)"
            value={inf.pastWork.sampleContent.join("\n")}
            onChange={(e) =>
              set({ pastWork: { ...inf.pastWork, sampleContent: e.target.value.split("\n").filter(Boolean) } })
            }
            rows={3}
          />
        </div>
      )}
    </Card>
  );
}

export default function AdminInfluencers() {
  const { getContent, saveContent } = useAdmin();
  const [items, setItems] = useState<Influencer[]>(DEFAULT_INFLUENCERS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState("All");
  const [newIndex, setNewIndex] = useState<number | null>(null);

  useEffect(() => {
    getContent("influencers").then((d) => {
      if (d?.items) setItems(d.items as Influencer[]);
    });
  }, [getContent]);

  function handleChange(i: number, val: Influencer) {
    setSaved(false);
    setItems((p) => p.map((x, idx) => (idx === i ? val : x)));
  }

  function handleDelete(i: number) {
    if (!confirm("Remove this influencer?")) return;
    setSaved(false);
    setItems((p) => p.filter((_, idx) => idx !== i));
  }

  function addNew() {
    setSaved(false);
    setItems((p) => {
      setNewIndex(p.length);
      return [...p, { ...BLANK }];
    });
    setSearch("");
    setNicheFilter("All");
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("influencers", { items });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const filtered = items.filter((inf) => {
    const q = search.toLowerCase();
    const matchSearch = !q || inf.name.toLowerCase().includes(q) || inf.niche.toLowerCase().includes(q);
    const matchNiche = nicheFilter === "All" || inf.niche === nicheFilter;
    return matchSearch && matchNiche;
  });

  return (
    <div>
      <PageHeader
        title="Influencers"
        description={`${items.length} creator${items.length !== 1 ? "s" : ""} in the roster`}
      />

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B0B0B]/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search influencers..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#0B0B0B]/12 rounded-xl text-[13px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/30 bg-white"
          />
        </div>
        <select
          value={nicheFilter}
          onChange={(e) => setNicheFilter(e.target.value)}
          className="border border-[#0B0B0B]/12 rounded-xl px-3 py-2.5 text-[13px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
        >
          <option value="All">All niches</option>
          {NICHE_CATEGORIES.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <button
          onClick={addNew}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Add Influencer
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((inf) => {
          const realIndex = items.indexOf(inf);
          return (
            <InfluencerRow
              key={inf.slug + realIndex}
              inf={inf}
              index={realIndex}
              onChange={handleChange}
              onDelete={handleDelete}
              defaultOpen={realIndex === newIndex}
            />
          );
        })}
        {filtered.length === 0 && (
          <Card>
            <p className="text-[13px] text-[#0B0B0B]/40 text-center py-6">No influencers match your filter.</p>
          </Card>
        )}
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
