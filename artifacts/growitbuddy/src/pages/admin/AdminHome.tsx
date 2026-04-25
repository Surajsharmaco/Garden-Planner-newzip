import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2 } from "lucide-react";

interface Stat { label: string; value: string; }
interface Testimonial { quote: string; name: string; role: string; }
interface FrameworkStep { step: string; title: string; description: string; }

interface HomeData {
  heroHeadline: string;
  heroSubtext: string;
  heroCTA: string;
  heroStats: Stat[];
  problemHeadline: string;
  problemBody: string;
  frameworkSteps: FrameworkStep[];
  testimonialsHeadline: string;
  testimonials: Testimonial[];
  ctaBannerHeadline: string;
  ctaBannerSubtext: string;
  ctaBannerButton: string;
}

const DEFAULTS: HomeData = {
  heroHeadline: "Build Authority.\nNot Just Presence.",
  heroSubtext: "GrowitBuddy is the premium content studio for founders, creators, and brands who want to own their category.",
  heroCTA: "Book a Strategy Call",
  heroStats: [
    { label: "Founders Served", value: "200+" },
    { label: "Creator Partnerships", value: "1,400+" },
    { label: "Avg Authority Growth", value: "8x" },
  ],
  problemHeadline: "Most content is noise. Yours doesn't have to be.",
  problemBody: "Founders waste months on content that gets likes but never converts. We build the system, the voice, and the distribution that turns your expertise into inbound business.",
  frameworkSteps: [
    { step: "01", title: "Position", description: "Define the unique authority you want to own in your category." },
    { step: "02", title: "Produce", description: "Build a consistent content engine that compounds over time." },
    { step: "03", title: "Partner", description: "Amplify through vetted creator partnerships and owned channels." },
  ],
  testimonialsHeadline: "What our clients say",
  testimonials: [
    { quote: "GrowitBuddy turned my occasional LinkedIn posts into a full inbound pipeline. Our close rate jumped 40% in 90 days.", name: "Sarah K.", role: "Founder, Series A SaaS" },
    { quote: "They matched us with exactly the right creators. The campaign drove $180K in attributable revenue in the first month.", name: "Marcus T.", role: "CMO, D2C Brand" },
  ],
  ctaBannerHeadline: "Ready to own your category?",
  ctaBannerSubtext: "Book a free 30-minute strategy call. We'll show you exactly where your authority gaps are and how to close them.",
  ctaBannerButton: "Book Your Free Strategy Call",
};

export default function AdminHome() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<HomeData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("home").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<HomeData>) });
    });
  }, [getContent]);

  function set<K extends keyof HomeData>(key: K, val: HomeData[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("home", data as unknown as Record<string, unknown>);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="Home Page" description="Edit every section of the landing page." />

      <div className="space-y-5">
        <Card>
          <SectionTitle>Hero Section</SectionTitle>
          <div className="space-y-3">
            <Textarea label="Headline" value={data.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} rows={2} hint="Use line breaks for effect" />
            <Textarea label="Subtext" value={data.heroSubtext} onChange={(e) => set("heroSubtext", e.target.value)} rows={2} />
            <Input label="CTA Button Text" value={data.heroCTA} onChange={(e) => set("heroCTA", e.target.value)} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Hero Stats</SectionTitle>
          <div className="space-y-2">
            {data.heroStats.map((stat, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={stat.value} onChange={(e) => { const s = [...data.heroStats]; s[i] = { ...stat, value: e.target.value }; set("heroStats", s); }} placeholder="200+" />
                <Input value={stat.label} onChange={(e) => { const s = [...data.heroStats]; s[i] = { ...stat, label: e.target.value }; set("heroStats", s); }} placeholder="Founders Served" />
                <button onClick={() => set("heroStats", data.heroStats.filter((_, si) => si !== i))} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={() => set("heroStats", [...data.heroStats, { value: "", label: "" }])} className="text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] flex items-center gap-1 mt-1"><Plus size={12} /> Add stat</button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Problem / Intro Section</SectionTitle>
          <div className="space-y-3">
            <Input label="Headline" value={data.problemHeadline} onChange={(e) => set("problemHeadline", e.target.value)} />
            <Textarea label="Body text" value={data.problemBody} onChange={(e) => set("problemBody", e.target.value)} rows={3} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Framework Steps</SectionTitle>
          <div className="space-y-3">
            {data.frameworkSteps.map((step, i) => (
              <div key={i} className="grid grid-cols-[60px_1fr_1fr_auto] gap-2 items-start">
                <Input value={step.step} onChange={(e) => { const s = [...data.frameworkSteps]; s[i] = { ...step, step: e.target.value }; set("frameworkSteps", s); }} placeholder="01" />
                <Input value={step.title} onChange={(e) => { const s = [...data.frameworkSteps]; s[i] = { ...step, title: e.target.value }; set("frameworkSteps", s); }} placeholder="Title" />
                <Textarea value={step.description} onChange={(e) => { const s = [...data.frameworkSteps]; s[i] = { ...step, description: e.target.value }; set("frameworkSteps", s); }} rows={2} placeholder="Description" />
                <button onClick={() => set("frameworkSteps", data.frameworkSteps.filter((_, si) => si !== i))} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 mt-1 shrink-0"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={() => set("frameworkSteps", [...data.frameworkSteps, { step: String(data.frameworkSteps.length + 1).padStart(2, "0"), title: "", description: "" }])} className="text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] flex items-center gap-1"><Plus size={12} /> Add step</button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Testimonials</SectionTitle>
          <Input label="Section Headline" value={data.testimonialsHeadline} onChange={(e) => set("testimonialsHeadline", e.target.value)} className="mb-4" />
          <div className="space-y-3">
            {data.testimonials.map((t, i) => (
              <div key={i} className="border border-[#0B0B0B]/8 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold text-[#0B0B0B]/40 uppercase tracking-wider">Testimonial {i + 1}</span>
                  <button onClick={() => set("testimonials", data.testimonials.filter((_, ti) => ti !== i))} className="text-[#0B0B0B]/25 hover:text-red-500"><Trash2 size={13} /></button>
                </div>
                <Textarea value={t.quote} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...t, quote: e.target.value }; set("testimonials", ts); }} rows={2} placeholder="Quote" />
                <div className="flex gap-2">
                  <Input value={t.name} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...t, name: e.target.value }; set("testimonials", ts); }} placeholder="Name" />
                  <Input value={t.role} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...t, role: e.target.value }; set("testimonials", ts); }} placeholder="Role / Company" />
                </div>
              </div>
            ))}
            <button onClick={() => set("testimonials", [...data.testimonials, { quote: "", name: "", role: "" }])} className="text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] flex items-center gap-1"><Plus size={12} /> Add testimonial</button>
          </div>
        </Card>

        <Card>
          <SectionTitle>CTA Banner</SectionTitle>
          <div className="space-y-3">
            <Input label="Headline" value={data.ctaBannerHeadline} onChange={(e) => set("ctaBannerHeadline", e.target.value)} />
            <Textarea label="Subtext" value={data.ctaBannerSubtext} onChange={(e) => set("ctaBannerSubtext", e.target.value)} rows={2} />
            <Input label="Button Text" value={data.ctaBannerButton} onChange={(e) => set("ctaBannerButton", e.target.value)} />
          </div>
        </Card>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
