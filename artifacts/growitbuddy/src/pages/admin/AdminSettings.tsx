import { useEffect, useState, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  PageHeader,
  Card,
  SectionTitle,
  Input,
  Textarea,
  SaveBar,
} from "@/components/admin/AdminField";

interface Settings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  calLink: string;
  cursorEnabled: boolean;
  introEnabled: boolean;
  fontScale: number;
  metaDescription: string;
}

const DEFAULTS: Settings = {
  companyName: "GrowitBuddy",
  tagline: "The Premium Content & Authority Studio",
  email: "hello@growitbuddy.com",
  phone: "",
  calLink: "growitbuddy/strategy",
  cursorEnabled: true,
  introEnabled: true,
  fontScale: 100,
  metaDescription: "GrowitBuddy — The premium content & authority studio for founders, creators and freelancers.",
};

export default function AdminSettings() {
  const { getContent, saveContent } = useAdmin();
  const [data, setData] = useState<Settings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("settings").then((d) => {
      if (d) setData({ ...DEFAULTS, ...(d as Partial<Settings>) });
    });
  }, [getContent]);

  const set = useCallback(<K extends keyof Settings>(key: K, val: Settings[K]) => {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("settings", data as unknown as Record<string, unknown>);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="Site Settings" description="Global configuration for the entire website." />

      <div className="space-y-5">
        <Card>
          <SectionTitle>Company Info</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Company Name" value={data.companyName} onChange={(e) => set("companyName", e.target.value)} />
            <Input label="Email Address" value={data.email} onChange={(e) => set("email", e.target.value)} />
            <Input label="Tagline" value={data.tagline} onChange={(e) => set("tagline", e.target.value)} className="sm:col-span-2" />
            <Textarea
              label="Meta Description"
              value={data.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
              className="sm:col-span-2"
              rows={2}
            />
          </div>
        </Card>

        <Card>
          <SectionTitle>Booking & Contact</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Cal.com Link"
              value={data.calLink}
              onChange={(e) => set("calLink", e.target.value)}
              hint="e.g. growitbuddy/strategy — used on the Contact page"
            />
            <Input
              label="Phone / WhatsApp"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 555 000 0000"
            />
          </div>
        </Card>

        <Card>
          <SectionTitle>Visual & Interaction Effects</SectionTitle>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#0B0B0B]/6">
              <div>
                <p className="text-[13px] font-semibold text-[#0B0B0B]">Custom Cursor</p>
                <p className="text-[12px] text-[#0B0B0B]/40">Show the branded dot cursor on desktop</p>
              </div>
              <button
                onClick={() => set("cursorEnabled", !data.cursorEnabled)}
                className={`relative w-10 h-6 rounded-full transition-colors ${data.cursorEnabled ? "bg-[#0B0B0B]" : "bg-[#0B0B0B]/20"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${data.cursorEnabled ? "translate-x-4" : ""}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#0B0B0B]/6">
              <div>
                <p className="text-[13px] font-semibold text-[#0B0B0B]">Page Intro Animation</p>
                <p className="text-[12px] text-[#0B0B0B]/40">Show the full-screen intro on first load</p>
              </div>
              <button
                onClick={() => set("introEnabled", !data.introEnabled)}
                className={`relative w-10 h-6 rounded-full transition-colors ${data.introEnabled ? "bg-[#0B0B0B]" : "bg-[#0B0B0B]/20"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${data.introEnabled ? "translate-x-4" : ""}`}
                />
              </button>
            </div>

            <div className="py-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[13px] font-semibold text-[#0B0B0B]">Global Font Scale</p>
                  <p className="text-[12px] text-[#0B0B0B]/40">Scales all text sizes proportionally</p>
                </div>
                <span className="text-[13px] font-bold text-[#0B0B0B] bg-[#0B0B0B]/6 px-2.5 py-1 rounded-lg">
                  {data.fontScale}%
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={130}
                step={5}
                value={data.fontScale}
                onChange={(e) => set("fontScale", parseInt(e.target.value))}
                className="w-full accent-[#0B0B0B]"
              />
              <div className="flex justify-between text-[11px] text-[#0B0B0B]/30 mt-1">
                <span>80%</span><span>100% (default)</span><span>130%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
