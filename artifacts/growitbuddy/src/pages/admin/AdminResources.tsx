import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2 } from "lucide-react";

interface ResourceItem {
  title: string;
  desc: string;
  tag: string;
  link: string;
}

interface ResourcesData {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  items: ResourceItem[];
  seoTitle: string;
  seoDesc: string;
}

const DEFAULTS: ResourcesData = {
  heroEyebrow: "Resources",
  heroHeadline: "Open-source frameworks.",
  heroSubtext: "Free templates, guides and playbooks from our internal agency toolkit.",
  items: [],
  seoTitle: "Resources - GrowitBuddy",
  seoDesc: "Free templates, guides and playbooks from our internal agency toolkit.",
};

export default function AdminResources() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<ResourcesData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("resources").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<ResourcesData>) });
    });
  }, [getContent]);

  function set<K extends keyof ResourcesData>(key: K, val: ResourcesData[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  function setItem(i: number, patch: Partial<ResourceItem>) {
    setSaved(false);
    const next = [...data.items];
    next[i] = { ...next[i], ...patch };
    set("items", next);
  }

  function addItem() {
    setSaved(false);
    set("items", [...data.items, { title: "New Resource", desc: "Short description of this resource.", tag: "Template", link: "" }]);
  }

  function removeItem(i: number) {
    setSaved(false);
    set("items", data.items.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    await saveContent("resources", data);
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <PageHeader title="Resources Page" desc="Edit the hero text and manage resource items shown on the Resources page." />

      <Card>
        <SectionTitle>Hero Section</SectionTitle>
        <Input label="Eyebrow Label" value={data.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} />
        <Input label="Headline" value={data.heroHeadline} onChange={(v) => set("heroHeadline", v)} />
        <Textarea label="Subtext" value={data.heroSubtext} onChange={(v) => set("heroSubtext", v)} />
      </Card>

      <Card>
        <SectionTitle>Resource Items</SectionTitle>
        {data.items.length === 0 && (
          <p className="text-[13px] text-[#0B0B0B]/35 mb-4">No resources added yet. Add your first one below.</p>
        )}
        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div key={i} className="border border-[#0B0B0B]/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-bold text-[#0B0B0B]/50">Resource {i + 1}</span>
                <button onClick={() => removeItem(i)} className="text-[#0B0B0B]/30 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <Input label="Title" value={item.title} onChange={(v) => setItem(i, { title: v })} />
              <Textarea label="Description" value={item.desc} onChange={(v) => setItem(i, { desc: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Tag / Category" value={item.tag} onChange={(v) => setItem(i, { tag: v })} />
                <Input label="Link URL (optional)" value={item.link} onChange={(v) => setItem(i, { link: v })} />
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors mt-2"
          >
            <Plus size={15} /> Add Resource
          </button>
        </div>
      </Card>

      <Card>
        <SectionTitle>SEO</SectionTitle>
        <Input label="Page Title" value={data.seoTitle} onChange={(v) => set("seoTitle", v)} />
        <Textarea label="Meta Description" value={data.seoDesc} onChange={(v) => set("seoDesc", v)} />
      </Card>

      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </div>
  );
}
