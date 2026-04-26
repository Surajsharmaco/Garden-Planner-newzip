import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { influencers as DEFAULT_INFLUENCERS, NICHE_CATEGORIES, COUNTRIES, type Influencer } from "@/data/influencers";
import { PageHeader, Card, Input, SaveBar } from "@/components/admin/AdminField";
import { ImagePickerField } from "@/components/admin/ImagePickerField";
import { Plus, Trash2, Search, X, Eye, EyeOff, ChevronDown, ChevronUp, Settings2, Clock } from "lucide-react";

function formatRelativeDate(iso: string | undefined): string {
  if (!iso) return "Never updated";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const BLANK: Influencer = {
  slug: "",
  name: "",
  username: "",
  niche: "Business & Entrepreneurship",
  followers: "",
  engagementRate: "",
  description: "",
  photo: "",
  profileEnabled: true,
  audienceCountries: [],
  initials: "",
  accentColor: "#0B0B0B",
  about: { creates: "", audience: "" },
  metrics: { avgViews: "", engagementRate: "", audienceLocation: "" },
  pastWork: { brands: [], sampleContent: [] },
  services: [],
};

function isComplete(inf: Influencer) {
  return inf.name.trim().length > 0;
}

function InfluencerRow({
  inf,
  index,
  genres,
  onChange,
  onDelete,
  defaultOpen = false,
}: {
  inf: Influencer;
  index: number;
  genres: string[];
  onChange: (i: number, val: Influencer) => void;
  onDelete: (i: number) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const set = (patch: Partial<Influencer>) => onChange(index, { ...inf, ...patch });
  const enabled = inf.profileEnabled !== false;

  return (
    <Card className="p-0 overflow-hidden">
      {/* Row header */}
      <div className="flex items-center gap-2 pr-3">
        <div
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center gap-3 px-5 py-3.5 min-w-0 cursor-pointer hover:bg-[#0B0B0B]/3 transition-colors"
        >
          {/* Avatar */}
          {inf.photo ? (
            <img src={inf.photo} alt={inf.name} className={`w-9 h-9 rounded-full object-cover shrink-0 ${!enabled ? "grayscale opacity-50" : ""}`} />
          ) : (
            <div className={`w-9 h-9 rounded-full bg-[#0B0B0B]/10 flex items-center justify-center text-[11px] font-bold text-[#0B0B0B]/50 shrink-0 ${!enabled ? "opacity-40" : ""}`}>
              {inf.initials || "?"}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-[13px] font-semibold truncate ${!enabled ? "text-[#0B0B0B]/35" : "text-[#0B0B0B]"}`}>
                {inf.name || <span className="text-[#0B0B0B]/30 italic">Unnamed Influencer</span>}
              </p>
              {!enabled && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B0B0B]/8 text-[#0B0B0B]/35 px-2 py-0.5 rounded-full shrink-0">
                  Hidden
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#0B0B0B]/40 truncate">
              {inf.niche}
              {inf.followers ? ` · ${inf.followers}` : ""}
            </p>
            <p className="text-[10px] text-[#0B0B0B]/25 flex items-center gap-1 mt-0.5">
              <Clock size={9} />
              {formatRelativeDate(inf.updatedAt)}
            </p>
          </div>
          <span className="text-[#0B0B0B]/20 shrink-0">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Profile visibility toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); set({ profileEnabled: !enabled }); }}
            title={enabled ? "Click to hide this profile on the public site" : "Click to make this profile visible on the public site"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
              enabled
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-[#0B0B0B]/5 text-[#0B0B0B]/35 border-[#0B0B0B]/10 hover:border-[#0B0B0B]/25 hover:text-[#0B0B0B]/50"
            }`}
          >
            {enabled ? <Eye size={11} /> : <EyeOff size={11} />}
            {enabled ? "Live" : "Hidden"}
          </button>
          <button
            onClick={() => onDelete(index)}
            className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Expanded edit form — image, category, followers only */}
      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5">
          <div className="flex gap-5 items-start">
            {/* Photo */}
            <div className="shrink-0">
              <ImagePickerField
                label="Photo"
                value={inf.photo}
                onChange={(url) => set({ photo: url })}
                shape="circle"
                size={80}
              />
            </div>

            {/* Category + Followers */}
            <div className="flex-1 grid grid-cols-2 gap-3 pt-6">
              <div>
                <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Category / Genre</label>
                <select
                  value={inf.niche}
                  onChange={(e) => set({ niche: e.target.value })}
                  className="w-full border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[13px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/40 bg-white"
                >
                  {genres.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Input
                label="Followers"
                value={inf.followers}
                onChange={(e) => set({ followers: e.target.value })}
                placeholder="284K"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ── Tag-list editor for genres / countries ─────────────── */
function TagListEditor({
  title,
  tags,
  onChange,
}: {
  title: string;
  tags: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const v = draft.trim();
    if (!v || tags.includes(v)) { setDraft(""); return; }
    onChange([...tags, v]);
    setDraft("");
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-[#0B0B0B]/60 uppercase tracking-wider mb-2">{title}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-[#0B0B0B]/6 text-[#0B0B0B]/70 text-[12px] font-medium px-2.5 py-1 rounded-full"
          >
            {tag}
            <button
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="text-[#0B0B0B]/30 hover:text-red-500 transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder={`Add new ${title.toLowerCase().replace(" list", "")}...`}
          className="flex-1 border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2 text-[13px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/30 bg-white"
        />
        <button
          onClick={addTag}
          disabled={!draft.trim()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0B0B] text-white text-[13px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={13} /> Add
        </button>
      </div>
    </div>
  );
}

export default function AdminInfluencers() {
  const { getContent, saveContent } = useAdmin();
  const [items, setItems] = useState<Influencer[]>(DEFAULT_INFLUENCERS);
  const [genres, setGenres] = useState<string[]>([...NICHE_CATEGORIES]);
  const [countries, setCountries] = useState<string[]>([...COUNTRIES]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month" | "3months" | "6months" | "1year">("all");
  const [newIndex, setNewIndex] = useState<number | null>(null);
  const [listsOpen, setListsOpen] = useState(false);

  useEffect(() => {
    getContent("influencers").then((d) => {
      if (!d) return;
      if (d.items) setItems(d.items as Influencer[]);
      if (d.genres) setGenres(d.genres as string[]);
      if (d.countries) setCountries(d.countries as string[]);
    });
  }, [getContent]);

  function handleChange(i: number, val: Influencer) {
    setSaved(false);
    setItems((p) => p.map((x, idx) => (idx === i ? { ...val, updatedAt: new Date().toISOString() } : x)));
  }

  function handleDelete(i: number) {
    if (!confirm("Remove this influencer?")) return;
    setSaved(false);
    setItems((p) => {
      const next = p.filter((_, idx) => idx !== i);
      if (newIndex !== null) {
        if (i === newIndex) setNewIndex(null);
        else if (i < newIndex) setNewIndex(newIndex - 1);
      }
      return next;
    });
  }

  const pendingNew = newIndex !== null && !isComplete(items[newIndex] ?? BLANK);

  function addNew() {
    if (pendingNew) return;
    setSaved(false);
    setItems((p) => {
      const idx = p.length;
      setNewIndex(idx);
      return [...p, { ...BLANK }];
    });
    setSearch("");
    setNicheFilter("All");
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("influencers", { items, genres, countries });
      setSaved(true);
      setNewIndex(null);
    } finally {
      setSaving(false);
    }
  }

  const filtered = items.filter((inf) => {
    const q = search.toLowerCase();
    const matchSearch = !q || inf.name.toLowerCase().includes(q) || inf.niche.toLowerCase().includes(q);
    const matchNiche = nicheFilter === "All" || inf.niche === nicheFilter;

    let matchDate = true;
    if (dateFilter !== "all") {
      if (!inf.updatedAt) {
        matchDate = false;
      } else {
        const updated = new Date(inf.updatedAt).getTime();
        const now = Date.now();
        const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
        if (dateFilter === "today") matchDate = updated >= startOfToday.getTime();
        else if (dateFilter === "week") matchDate = updated >= now - 7 * 86400000;
        else if (dateFilter === "month") matchDate = updated >= now - 30 * 86400000;
        else if (dateFilter === "3months") matchDate = updated >= now - 90 * 86400000;
        else if (dateFilter === "6months") matchDate = updated >= now - 180 * 86400000;
        else if (dateFilter === "1year") matchDate = updated >= now - 365 * 86400000;
      }
    }

    return matchSearch && matchNiche && matchDate;
  });

  const liveCount = items.filter((inf) => inf.profileEnabled !== false).length;
  const hiddenCount = items.length - liveCount;

  return (
    <div>
      <PageHeader
        title="Influencers"
        description={`${items.length} creator${items.length !== 1 ? "s" : ""} · ${liveCount} live · ${hiddenCount} hidden`}
      />

      {/* Genre & Country list manager (collapsible) */}
      <Card className="mb-5 overflow-hidden p-0">
        <button
          onClick={() => setListsOpen((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#0B0B0B]/3 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Settings2 size={15} className="text-[#0B0B0B]/40" />
            <span className="text-[13px] font-semibold text-[#0B0B0B]">Manage Genre &amp; Country Lists</span>
            <span className="text-[11px] text-[#0B0B0B]/35">{genres.length} genres · {countries.length} countries</span>
          </div>
          {listsOpen ? <ChevronUp size={14} className="text-[#0B0B0B]/30" /> : <ChevronDown size={14} className="text-[#0B0B0B]/30" />}
        </button>
        {listsOpen && (
          <div className="border-t border-[#0B0B0B]/8 px-5 py-5 grid grid-cols-2 gap-8">
            <TagListEditor
              title="Genre / Niche List"
              tags={genres}
              onChange={(next) => { setGenres(next); setSaved(false); }}
            />
            <TagListEditor
              title="Country List"
              tags={countries}
              onChange={(next) => { setCountries(next); setSaved(false); }}
            />
          </div>
        )}
      </Card>

      {/* Top toolbar */}
      <div className="flex gap-3 mb-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B0B0B]/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or niche..."
            className="w-full pl-9 pr-9 py-2.5 border border-[#0B0B0B]/12 rounded-xl text-[13px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/30 bg-white"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B0B0B]/30 hover:text-[#0B0B0B]">
              <X size={13} />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={addNew}
            disabled={pendingNew}
            className={`flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all ${
              pendingNew
                ? "bg-[#0B0B0B]/20 text-[#0B0B0B]/40 cursor-not-allowed"
                : "bg-[#0B0B0B] text-white hover:bg-[#0B0B0B]/85 cursor-pointer"
            }`}
          >
            <Plus size={15} /> Add Influencer
          </button>
          {pendingNew && (
            <p className="absolute top-full right-0 mt-1.5 whitespace-nowrap text-[11px] text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg z-10">
              Fill in the name below before adding another
            </p>
          )}
        </div>
      </div>

      {/* Last Updated filter — segmented control */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0B0B0B]/40 uppercase tracking-wider shrink-0">
          <Clock size={11} /> Last Updated
        </span>
        <div className="flex items-center bg-[#0B0B0B]/6 rounded-xl p-1 gap-0.5">
          {([
            { key: "all", label: "All time" },
            { key: "today", label: "Today" },
            { key: "week", label: "This week" },
            { key: "month", label: "This month" },
            { key: "3months", label: "3 months" },
            { key: "6months", label: "6 months" },
            { key: "1year", label: "1 year" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setDateFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                dateFilter === key
                  ? "bg-white text-[#0B0B0B] shadow-sm"
                  : "text-[#0B0B0B]/45 hover:text-[#0B0B0B]/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre filter chips */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {(["All", ...genres] as string[]).map((niche) => {
            const count = niche === "All"
              ? items.length
              : items.filter((inf) => inf.niche === niche).length;
            const active = nicheFilter === niche;
            if (count === 0 && niche !== "All") return null;
            return (
              <button
                key={niche}
                onClick={() => setNicheFilter(niche)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all shrink-0 ${
                  active
                    ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                    : "bg-white text-[#0B0B0B]/55 border-[#0B0B0B]/12 hover:border-[#0B0B0B]/30 hover:text-[#0B0B0B]"
                }`}
              >
                {niche === "All" ? "All Genres" : niche}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-[#0B0B0B]/8 text-[#0B0B0B]/50"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        {(search || nicheFilter !== "All" || dateFilter !== "all") && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[12px] text-[#0B0B0B]/40">
              Showing {filtered.length} of {items.length} influencers
            </span>
            <button
              onClick={() => { setSearch(""); setNicheFilter("All"); setDateFilter("all"); }}
              className="text-[11px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] underline underline-offset-2 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((inf) => {
          const realIndex = items.indexOf(inf);
          return (
            <InfluencerRow
              key={inf.slug + realIndex}
              inf={inf}
              index={realIndex}
              genres={genres}
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
