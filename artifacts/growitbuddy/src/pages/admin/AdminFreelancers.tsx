import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2 } from "lucide-react";

interface FreelancersData {
  heroLabel: string;
  heroHeadline: string;
  heroSubtext: string;
  perksHeadline: string;
  perks: string[];
  notForEveryoneTitle: string;
  notForEveryone: string[];
  formHeadline: string;
  formSubtext: string;
  formSuccessHeadline: string;
  formSuccessSubtext: string;
}

const DEFAULTS: FreelancersData = {
  heroLabel: "Talent Network",
  heroHeadline: "Join the Talent Network.",
  heroSubtext: "Work on real projects. Get selected based on performance. Build your career with a system, not random gigs.",
  perksHeadline: "What You Get.",
  perks: [
    "Real client projects, not random gigs",
    "Consistent work opportunities based on performance",
    "Performance-based growth within the network",
    "Access to tools and resources as you level up",
    "A structured system to sharpen your skills",
  ],
  notForEveryoneTitle: "Not for everyone",
  notForEveryone: [
    "Video editors ready to work on real client projects",
    "Graphic and motion designers with a strong portfolio",
    "Content creators who execute, not just ideate",
    "If you want random gigs, this is not for you",
  ],
  formHeadline: "Apply for the Talent Network",
  formSubtext: "Selection is performance-based. Apply now and prove your work.",
  formSuccessHeadline: "Application received.",
  formSuccessSubtext: "We review applications based on performance. If you make the cut, we'll be in touch within 7 business days.",
};

export default function AdminFreelancers() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<FreelancersData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("freelancers").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<FreelancersData>) });
    });
  }, [getContent]);

  function set<K extends keyof FreelancersData>(key: K, val: FreelancersData[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  function setListItem(key: "perks" | "notForEveryone", i: number, val: string) {
    setSaved(false);
    const next = [...data[key]];
    next[i] = val;
    setData((p) => ({ ...p, [key]: next }));
  }

  function addListItem(key: "perks" | "notForEveryone") {
    setSaved(false);
    setData((p) => ({ ...p, [key]: [...p[key], ""] }));
  }

  function removeListItem(key: "perks" | "notForEveryone", i: number) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: p[key].filter((_, idx) => idx !== i) }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("freelancers", data as unknown as Record<string, unknown>);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="Freelancers / Talent Network Page" description="Edit hero, perks list, and form text." />

      <div className="space-y-5">
        <Card>
          <SectionTitle>Hero Section</SectionTitle>
          <div className="space-y-3">
            <Input label="Section Label" value={data.heroLabel} onChange={(e) => set("heroLabel", e.target.value)} />
            <Textarea label="Headline" value={data.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} rows={2} />
            <Textarea label="Subtext" value={data.heroSubtext} onChange={(e) => set("heroSubtext", e.target.value)} rows={3} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Perks List</SectionTitle>
          <Input label="Section Heading" value={data.perksHeadline} onChange={(e) => set("perksHeadline", e.target.value)} className="mb-3" />
          <div className="space-y-2">
            {data.perks.map((perk, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="flex-1 text-[13px] border border-[#0B0B0B]/12 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0B0B0B]/20 bg-white"
                  value={perk}
                  onChange={(e) => setListItem("perks", i, e.target.value)}
                  placeholder="Perk description..."
                />
                <button onClick={() => removeListItem("perks", i)} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={() => addListItem("perks")} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors">
              <Plus size={13} /> Add Perk
            </button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Not for Everyone Box</SectionTitle>
          <Input label="Box Title" value={data.notForEveryoneTitle} onChange={(e) => set("notForEveryoneTitle", e.target.value)} className="mb-3" />
          <div className="space-y-2">
            {data.notForEveryone.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="flex-1 text-[13px] border border-[#0B0B0B]/12 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0B0B0B]/20 bg-white"
                  value={item}
                  onChange={(e) => setListItem("notForEveryone", i, e.target.value)}
                  placeholder="Item..."
                />
                <button onClick={() => removeListItem("notForEveryone", i)} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={() => addListItem("notForEveryone")} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors">
              <Plus size={13} /> Add Item
            </button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Application Form</SectionTitle>
          <div className="space-y-3">
            <Input label="Form Heading" value={data.formHeadline} onChange={(e) => set("formHeadline", e.target.value)} />
            <Input label="Form Subtext" value={data.formSubtext} onChange={(e) => set("formSubtext", e.target.value)} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Success State</SectionTitle>
          <div className="space-y-3">
            <Input label="Success Headline" value={data.formSuccessHeadline} onChange={(e) => set("formSuccessHeadline", e.target.value)} />
            <Textarea label="Success Message" value={data.formSuccessSubtext} onChange={(e) => set("formSuccessSubtext", e.target.value)} rows={2} />
          </div>
        </Card>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
