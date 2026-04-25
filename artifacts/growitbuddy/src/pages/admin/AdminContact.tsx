import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2 } from "lucide-react";

interface InfoItem {
  label: string;
  value: string;
  href: string;
}

interface ContactData {
  heroHeadline: string;
  heroSubtext: string;
  bookingLabel: string;
  bookingHeadline: string;
  formHeadline: string;
  formSubtext: string;
  formSuccessHeadline: string;
  formSuccessSubtext: string;
  contactInfo: InfoItem[];
}

const DEFAULTS: ContactData = {
  heroHeadline: "Let's build your authority system.",
  heroSubtext: "We partner with ambitious founders and creators who are serious about authority. One strategy call is all it takes to get started.",
  bookingLabel: "Book a call",
  bookingHeadline: "Pick a time that works for you.",
  formHeadline: "Send us a message",
  formSubtext: "We respond to every inquiry within 24 hours.",
  formSuccessHeadline: "Message sent!",
  formSuccessSubtext: "We'll be in touch within 24 hours to schedule your free strategy call.",
  contactInfo: [
    { label: "Email", value: "hello@growitbuddy.com", href: "mailto:hello@growitbuddy.com" },
    { label: "Response time", value: "Within 24 hours", href: "" },
    { label: "Based", value: "Global - 4 timezones", href: "" },
    { label: "Next step", value: "Free 30-min strategy call", href: "" },
  ],
};

export default function AdminContact() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<ContactData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("contact").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<ContactData>) });
    });
  }, [getContent]);

  function set<K extends keyof ContactData>(key: K, val: ContactData[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  function setInfoItem(i: number, patch: Partial<InfoItem>) {
    setSaved(false);
    const next = [...data.contactInfo];
    next[i] = { ...next[i], ...patch };
    setData((p) => ({ ...p, contactInfo: next }));
  }

  function addInfoItem() {
    setSaved(false);
    setData((p) => ({ ...p, contactInfo: [...p.contactInfo, { label: "", value: "", href: "" }] }));
  }

  function removeInfoItem(i: number) {
    setSaved(false);
    setData((p) => ({ ...p, contactInfo: p.contactInfo.filter((_, idx) => idx !== i) }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("contact", data as unknown as Record<string, unknown>);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="Contact Page" description="Edit every section of the contact page." />

      <div className="space-y-5">
        <Card>
          <SectionTitle>Hero Section</SectionTitle>
          <div className="space-y-3">
            <Textarea label="Headline" value={data.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} rows={2} />
            <Textarea label="Subtext" value={data.heroSubtext} onChange={(e) => set("heroSubtext", e.target.value)} rows={3} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Booking Section</SectionTitle>
          <div className="space-y-3">
            <Input label="Section Label (small caps above heading)" value={data.bookingLabel} onChange={(e) => set("bookingLabel", e.target.value)} />
            <Input label="Heading" value={data.bookingHeadline} onChange={(e) => set("bookingHeadline", e.target.value)} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Contact Info Items</SectionTitle>
          <p className="text-[11px] text-[#0B0B0B]/40 mb-3">These appear as a list of label/value rows beside the form.</p>
          <div className="space-y-3">
            {data.contactInfo.map((item, i) => (
              <div key={i} className="flex gap-2 items-start border border-[#0B0B0B]/8 rounded-xl p-3">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input label="Label" value={item.label} onChange={(e) => setInfoItem(i, { label: e.target.value })} placeholder="Email" />
                  <Input label="Value" value={item.value} onChange={(e) => setInfoItem(i, { value: e.target.value })} placeholder="hello@growitbuddy.com" />
                  <Input label="Link (optional)" value={item.href} onChange={(e) => setInfoItem(i, { href: e.target.value })} placeholder="mailto:..." className="col-span-2" />
                </div>
                <button onClick={() => removeInfoItem(i)} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 mt-5 shrink-0"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={addInfoItem} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors">
              <Plus size={13} /> Add Row
            </button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Contact Form</SectionTitle>
          <div className="space-y-3">
            <Input label="Form Heading" value={data.formHeadline} onChange={(e) => set("formHeadline", e.target.value)} />
            <Input label="Form Subtext" value={data.formSubtext} onChange={(e) => set("formSubtext", e.target.value)} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Success State (after form submission)</SectionTitle>
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
