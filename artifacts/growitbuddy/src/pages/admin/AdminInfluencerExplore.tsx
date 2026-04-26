import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";

interface InfluencerExploreData {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroCTA: string;
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButton: string;
  seoTitle: string;
  seoDesc: string;
}

const DEFAULTS: InfluencerExploreData = {
  heroEyebrow: "Influencer Network",
  heroHeadline: "Work With Proven Influencers.",
  heroSubtext: "Discover creators who build real engagement and drive meaningful results -- not just impressions.",
  heroCTA: "Join as Influencer",
  ctaEyebrow: "Are you a creator?",
  ctaHeadline: "Ready to Get Discovered?",
  ctaSubtext: "Apply to join the Influencer Network. Get reviewed, get listed, and unlock real brand opportunities.",
  ctaButton: "Apply Now",
  seoTitle: "Explore Influencers - GrowitBuddy",
  seoDesc: "Discover proven influencers and content creators who build real engagement and drive meaningful results for ambitious brands.",
};

export default function AdminInfluencerExplore() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<InfluencerExploreData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("influencer-explore").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<InfluencerExploreData>) });
    });
  }, [getContent]);

  function set<K extends keyof InfluencerExploreData>(key: K, val: InfluencerExploreData[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  async function handleSave() {
    setSaving(true);
    await saveContent("influencer-explore", data);
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <PageHeader title="Influencer Explore Page" desc="Edit the hero and CTA sections on the Influencer Explore page." />

      <Card>
        <SectionTitle>Hero Section</SectionTitle>
        <Input label="Eyebrow Label" value={data.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} />
        <Input label="Headline" value={data.heroHeadline} onChange={(v) => set("heroHeadline", v)} />
        <Textarea label="Subtext" value={data.heroSubtext} onChange={(v) => set("heroSubtext", v)} />
        <Input label="CTA Button Text" value={data.heroCTA} onChange={(v) => set("heroCTA", v)} />
      </Card>

      <Card>
        <SectionTitle>Bottom CTA Section</SectionTitle>
        <Input label="Eyebrow Label" value={data.ctaEyebrow} onChange={(v) => set("ctaEyebrow", v)} />
        <Input label="Headline" value={data.ctaHeadline} onChange={(v) => set("ctaHeadline", v)} />
        <Textarea label="Subtext" value={data.ctaSubtext} onChange={(v) => set("ctaSubtext", v)} />
        <Input label="Button Text" value={data.ctaButton} onChange={(v) => set("ctaButton", v)} />
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
