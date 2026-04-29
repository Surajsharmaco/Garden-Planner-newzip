import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { ImageCropUploader } from "@/components/admin/ImageCropUploader";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";

interface WorkStat { label: string; value: string; }

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

interface NetworkMember {
  id: string;
  name: string;
  platform: string;
  followers: string;
  imageUrl: string;
}

interface ClientLogo {
  id: string;
  name: string;
  imageUrl: string;
}

const DEFAULT_WORK: WorkItem[] = [
  { id: "1", title: "Tech Founder to Industry Voice", subtitle: "LinkedIn Authority Campaign", category: "B2B SaaS · LinkedIn", metric: "14M", metricLabel: "impressions", description: "A full content marketing system took this founder from zero online presence to the most-cited authority in their SaaS niche - in 6 months.", tags: ["LinkedIn", "B2B SaaS"], stats: [], imageUrl: "" },
  { id: "2", title: "Agency Owner Authority Engine", subtitle: "Multi-channel content strategy", category: "Services · Multi-channel", metric: "$2.4M", metricLabel: "inbound pipeline", description: "A systematic content strategy and distribution system drove inbound pipeline that exceeded prior annual revenue.", tags: ["Content Strategy"], stats: [], imageUrl: "" },
  { id: "3", title: "Creator Monetization System", subtitle: "YouTube authority build", category: "Creator Economy · YouTube", metric: "250K", metricLabel: "subscribers", description: "A content strategy built around a proprietary framework compounded into 250K subscribers and $40K/mo in revenue.", tags: ["YouTube", "Creator"], stats: [], imageUrl: "" },
  { id: "4", title: "Executive Personal Brand", subtitle: "Podcast & PR strategy", category: "Leadership · Podcast & PR", metric: "15+", metricLabel: "speaking invites / qtr", description: "Personal branding strategy turned a quiet operator into a recognized industry thought leader with consistent media placement.", tags: ["Personal Brand", "PR"], stats: [], imageUrl: "" },
  { id: "5", title: "E-commerce Founder Growth", subtitle: "X / Twitter brand build", category: "E-commerce · X / Twitter", metric: "400%", metricLabel: "branded search growth", description: "A personal brand-first content marketing approach made this founder synonymous with their product category.", tags: ["X / Twitter", "E-commerce"], stats: [], imageUrl: "" },
  { id: "6", title: "VC Authority Engine", subtitle: "LinkedIn positioning", category: "Finance · LinkedIn", metric: "3x", metricLabel: "deal flow growth", description: "Content strategy and personal branding positioned this venture firm as the category expert - attracting better deals at higher velocity.", tags: ["Finance", "LinkedIn"], stats: [], imageUrl: "" },
];

const DEFAULT_NETWORK: NetworkMember[] = [
  { id: "1", name: "Tech Insiders", platform: "LinkedIn Page", followers: "280K", imageUrl: "" },
  { id: "2", name: "Startup Daily", platform: "Instagram", followers: "415K", imageUrl: "" },
  { id: "3", name: "Growth Lab", platform: "YouTube", followers: "190K", imageUrl: "" },
  { id: "4", name: "Founder Files", platform: "X / Twitter", followers: "320K", imageUrl: "" },
  { id: "5", name: "SaaS Weekly", platform: "Newsletter", followers: "85K", imageUrl: "" },
  { id: "6", name: "Brand Authority", platform: "Facebook Page", followers: "510K", imageUrl: "" },
];

const DEFAULT_CLIENTS: ClientLogo[] = [
  { id: "1", name: "TechVenture", imageUrl: "" },
  { id: "2", name: "GrowthCo", imageUrl: "" },
  { id: "3", name: "ScaleUp", imageUrl: "" },
  { id: "4", name: "FounderBrand", imageUrl: "" },
  { id: "5", name: "Authority Labs", imageUrl: "" },
  { id: "6", name: "ContentPro", imageUrl: "" },
];

function WorkRow({ item, index, onChange, onDelete }: { item: WorkItem; index: number; onChange: (i: number, val: WorkItem) => void; onDelete: (i: number) => void; }) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<WorkItem>) => onChange(index, { ...item, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <button onClick={() => setOpen((p) => !p)} className="flex-1 flex items-center gap-3 px-5 py-3.5 text-left min-w-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#0B0B0B]/50 bg-[#0B0B0B]/6 px-2 py-0.5 rounded-full shrink-0">{item.category}</span>
              <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{item.title || "Untitled Case Study"}</p>
            </div>
            <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{item.subtitle}</p>
          </div>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40 shrink-0" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40 shrink-0" />}
        </button>
        <button onClick={() => onDelete(index)} className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0">
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
          <Textarea label="Description" value={item.description} onChange={(e) => set({ description: e.target.value })} rows={3} />
          <Input label="Tags (comma-separated)" value={item.tags.join(", ")} onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} placeholder="LinkedIn, B2B SaaS, Content Strategy" />
          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Stats (up to 3)</label>
            <div className="space-y-2">
              {(item.stats.length > 0 ? item.stats : [{ label: "", value: "" }]).map((stat, si) => (
                <div key={si} className="flex gap-2 items-center">
                  <Input value={stat.label} onChange={(e) => { const u = [...item.stats]; u[si] = { ...stat, label: e.target.value }; set({ stats: u }); }} placeholder="Stat label" />
                  <Input value={stat.value} onChange={(e) => { const u = [...item.stats]; u[si] = { ...stat, value: e.target.value }; set({ stats: u }); }} placeholder="+420%" />
                  <button onClick={() => set({ stats: item.stats.filter((_, sIdx) => sIdx !== si) })} className="p-1.5 text-[#0B0B0B]/25 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
                </div>
              ))}
              {item.stats.length < 3 && (
                <button onClick={() => set({ stats: [...item.stats, { label: "", value: "" }] })} className="text-[12px] text-[#0B0B0B]/40 hover:text-[#0B0B0B] flex items-center gap-1">
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

function NetworkRow({ member, index, onChange, onDelete, onMoveUp, onMoveDown, total }: { member: NetworkMember; index: number; onChange: (i: number, val: NetworkMember) => void; onDelete: (i: number) => void; onMoveUp: (i: number) => void; onMoveDown: (i: number) => void; total: number; }) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<NetworkMember>) => onChange(index, { ...member, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <div className="flex flex-col gap-0.5 pl-3 py-3">
          <button onClick={() => onMoveUp(index)} disabled={index === 0} className="text-[#0B0B0B]/20 hover:text-[#0B0B0B]/60 disabled:opacity-30 transition-colors"><ChevronUp size={12} /></button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1} className="text-[#0B0B0B]/20 hover:text-[#0B0B0B]/60 disabled:opacity-30 transition-colors"><ChevronDown size={12} /></button>
        </div>
        <button onClick={() => setOpen((p) => !p)} className="flex-1 flex items-center gap-3 px-3 py-3.5 text-left min-w-0">
          <GripVertical size={14} className="text-[#0B0B0B]/20 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{member.name || "Unnamed"}</p>
            <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{member.platform} · {member.followers}</p>
          </div>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40 shrink-0" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40 shrink-0" />}
        </button>
        <button onClick={() => onDelete(index)} className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0"><Trash2 size={14} /></button>
      </div>

      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={member.name} onChange={(e) => set({ name: e.target.value })} placeholder="Tech Insiders" />
            <Input label="Platform" value={member.platform} onChange={(e) => set({ platform: e.target.value })} placeholder="LinkedIn Page" />
            <Input label="Follower Count" value={member.followers} onChange={(e) => set({ followers: e.target.value })} placeholder="280K" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Profile Image (optional)</label>
            <ImageCropUploader value={member.imageUrl} onChange={(url) => set({ imageUrl: url })} />
          </div>
        </div>
      )}
    </Card>
  );
}

function ClientRow({ client, index, onChange, onDelete, onMoveUp, onMoveDown, total }: { client: ClientLogo; index: number; onChange: (i: number, val: ClientLogo) => void; onDelete: (i: number) => void; onMoveUp: (i: number) => void; onMoveDown: (i: number) => void; total: number; }) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<ClientLogo>) => onChange(index, { ...client, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 pr-3 hover:bg-[#0B0B0B]/3 transition-colors">
        <div className="flex flex-col gap-0.5 pl-3 py-3">
          <button onClick={() => onMoveUp(index)} disabled={index === 0} className="text-[#0B0B0B]/20 hover:text-[#0B0B0B]/60 disabled:opacity-30 transition-colors"><ChevronUp size={12} /></button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1} className="text-[#0B0B0B]/20 hover:text-[#0B0B0B]/60 disabled:opacity-30 transition-colors"><ChevronDown size={12} /></button>
        </div>
        <button onClick={() => setOpen((p) => !p)} className="flex-1 flex items-center gap-3 px-3 py-3.5 text-left min-w-0">
          {client.imageUrl && <img src={client.imageUrl} alt={client.name} className="w-8 h-8 object-contain rounded shrink-0" />}
          <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{client.name || "Unnamed Client"}</p>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40 shrink-0" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40 shrink-0" />}
        </button>
        <button onClick={() => onDelete(index)} className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0"><Trash2 size={14} /></button>
      </div>

      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5 space-y-4">
          <Input label="Brand Name" value={client.name} onChange={(e) => set({ name: e.target.value })} placeholder="BrandName" />
          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-2 uppercase tracking-wider">Logo Image</label>
            <ImageCropUploader value={client.imageUrl} onChange={(url) => set({ imageUrl: url })} />
            <p className="text-[11px] text-[#0B0B0B]/35 mt-2">Upload a logo. It displays grayscale by default, full color on hover.</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminWork() {
  const { getContent, saveContent } = useAdmin();

  const [headline, setHeadline] = useState("Proof of authority at scale.");
  const [subtext, setSubtext] = useState("Our clients expect outcomes. We measure our success by theirs. Here's the proof.");
  const [hookHeadline, setHookHeadline] = useState("Most content fails because it never gets distributed.");
  const [hookSubtext, setHookSubtext] = useState("We don't just create content — we build systems that amplify it.");
  const [items, setItems] = useState<WorkItem[]>(DEFAULT_WORK);
  const [network, setNetwork] = useState<NetworkMember[]>(DEFAULT_NETWORK);
  const [proofScreenshots, setProofScreenshots] = useState<string[]>([]);
  const [proofVideoUrl, setProofVideoUrl] = useState("");
  const [clients, setClients] = useState<ClientLogo[]>(DEFAULT_CLIENTS);
  const [ctaHeading, setCtaHeading] = useState("Want to see exactly how this works?");
  const [ctaSubtext, setCtaSubtext] = useState("If you want a deeper look at our work, case histories, and the systems behind these results — book a strategy call.");
  const [ctaButtonLink, setCtaButtonLink] = useState("/contact");
  const [ctaButtonText, setCtaButtonText] = useState("Book a Strategy Call");
  const [brandLine, setBrandLine] = useState("Content creates. Distribution multiplies.");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("work").then((d) => {
      if (!d) return;
      if (d.headline) setHeadline(d.headline as string);
      if (d.subtext) setSubtext(d.subtext as string);
      if (d.hookHeadline) setHookHeadline(d.hookHeadline as string);
      if (d.hookSubtext) setHookSubtext(d.hookSubtext as string);
      if (d.items) setItems(d.items as WorkItem[]);
      if (d.network) setNetwork(d.network as NetworkMember[]);
      if (d.proof) {
        const proof = d.proof as { screenshots: string[]; videoUrl: string };
        if (proof.screenshots) setProofScreenshots(proof.screenshots);
        if (proof.videoUrl) setProofVideoUrl(proof.videoUrl);
      }
      if (d.clients) setClients(d.clients as ClientLogo[]);
      if (d.ctaHeading) setCtaHeading(d.ctaHeading as string);
      if (d.ctaSubtext) setCtaSubtext(d.ctaSubtext as string);
      if (d.ctaButtonLink) setCtaButtonLink(d.ctaButtonLink as string);
      if (d.ctaButtonText) setCtaButtonText(d.ctaButtonText as string);
      if (d.brandLine) setBrandLine(d.brandLine as string);
    });
  }, [getContent]);

  function markDirty() { setSaved(false); }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("work", {
        headline, subtext, hookHeadline, hookSubtext,
        items, network,
        proof: { screenshots: proofScreenshots, videoUrl: proofVideoUrl },
        clients, ctaHeading, ctaSubtext, ctaButtonLink, ctaButtonText, brandLine,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function moveNetworkUp(i: number) { if (i === 0) return; const a = [...network]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; setNetwork(a); markDirty(); }
  function moveNetworkDown(i: number) { if (i === network.length - 1) return; const a = [...network]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; setNetwork(a); markDirty(); }
  function moveClientUp(i: number) { if (i === 0) return; const a = [...clients]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; setClients(a); markDirty(); }
  function moveClientDown(i: number) { if (i === clients.length - 1) return; const a = [...clients]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; setClients(a); markDirty(); }

  return (
    <div>
      <PageHeader title="Work / Portfolio" description="Manage case studies, proof, clients, and CTA." />

      {/* Section Header */}
      <Card className="mb-5">
        <SectionTitle>Section Header</SectionTitle>
        <div className="space-y-3">
          <Input label="Headline" value={headline} onChange={(e) => { setHeadline(e.target.value); markDirty(); }} />
          <Textarea label="Subtext" value={subtext} onChange={(e) => { setSubtext(e.target.value); markDirty(); }} rows={2} />
        </div>
      </Card>

      {/* Hook */}
      <Card className="mb-5">
        <SectionTitle>Hook Text</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Shown above the case study cards on a dark background.</p>
        <div className="space-y-3">
          <Input label="Hook Headline" value={hookHeadline} onChange={(e) => { setHookHeadline(e.target.value); markDirty(); }} placeholder="Most content fails because..." />
          <Textarea label="Hook Subtext" value={hookSubtext} onChange={(e) => { setHookSubtext(e.target.value); markDirty(); }} rows={2} />
        </div>
      </Card>

      {/* Case Studies */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-[#0B0B0B]/70 uppercase tracking-wider">Case Studies</h3>
        <button
          onClick={() => { markDirty(); setItems((p) => [...p, { id: Date.now().toString(), title: "", subtitle: "", category: "", metric: "", metricLabel: "", description: "", tags: [], stats: [], imageUrl: "" }]); }}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Add Case Study
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {items.map((item, i) => (
          <WorkRow
            key={item.id + i}
            item={item}
            index={i}
            onChange={(idx, val) => { markDirty(); setItems((p) => p.map((x, xi) => xi === idx ? val : x)); }}
            onDelete={(idx) => { if (!confirm("Remove this case study?")) return; markDirty(); setItems((p) => p.filter((_, xi) => xi !== idx)); }}
          />
        ))}
      </div>

      {/* Distribution Network */}
      <Card className="mb-5">
        <SectionTitle>Distribution Network</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Creator and page previews shown with follower counts in a horizontal scroll row.</p>
        <div className="space-y-3 mb-4">
          {network.map((member, i) => (
            <NetworkRow
              key={member.id + i}
              member={member}
              index={i}
              total={network.length}
              onChange={(idx, val) => { markDirty(); setNetwork((p) => p.map((x, xi) => xi === idx ? val : x)); }}
              onDelete={(idx) => { if (!confirm("Remove this network member?")) return; markDirty(); setNetwork((p) => p.filter((_, xi) => xi !== idx)); }}
              onMoveUp={moveNetworkUp}
              onMoveDown={moveNetworkDown}
            />
          ))}
        </div>
        <button
          onClick={() => { markDirty(); setNetwork((p) => [...p, { id: Date.now().toString(), name: "", platform: "", followers: "", imageUrl: "" }]); }}
          className="flex items-center gap-2 text-[13px] text-[#0B0B0B]/50 hover:text-[#0B0B0B] border border-dashed border-[#0B0B0B]/20 hover:border-[#0B0B0B]/40 px-4 py-2.5 rounded-xl w-full justify-center transition-colors"
        >
          <Plus size={14} /> Add Network Member
        </button>
      </Card>

      {/* Proof / View Real Data */}
      <Card className="mb-5">
        <SectionTitle>Proof — "View Real Data" Modal</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Upload screenshots and optionally a video URL. These appear inside the modal when visitors click "View Real Data".</p>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-3 uppercase tracking-wider">Screenshots</label>
            <div className="space-y-3">
              {proofScreenshots.map((url, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-1">
                    <ImageCropUploader value={url} onChange={(newUrl) => { markDirty(); setProofScreenshots((p) => p.map((u, ui) => ui === i ? newUrl : u)); }} />
                  </div>
                  <button onClick={() => { markDirty(); setProofScreenshots((p) => p.filter((_, ui) => ui !== i)); }} className="mt-2 p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => { markDirty(); setProofScreenshots((p) => [...p, ""]); }}
                className="flex items-center gap-2 text-[13px] text-[#0B0B0B]/50 hover:text-[#0B0B0B] border border-dashed border-[#0B0B0B]/20 hover:border-[#0B0B0B]/40 px-4 py-2.5 rounded-xl w-full justify-center transition-colors"
              >
                <Plus size={14} /> Add Screenshot
              </button>
            </div>
          </div>

          <Input
            label="Dashboard Video URL (optional)"
            value={proofVideoUrl}
            onChange={(e) => { setProofVideoUrl(e.target.value); markDirty(); }}
            placeholder="https://..."
          />
          <p className="text-[11px] text-[#0B0B0B]/35">Link to a hosted video file (.mp4). It plays inside the proof modal.</p>
        </div>
      </Card>

      {/* Our Clients */}
      <Card className="mb-5">
        <SectionTitle>Our Clients</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-4">Brand logos shown in a grid. Grayscale by default, full color on hover. Reorder using arrows.</p>
        <div className="space-y-3 mb-4">
          {clients.map((client, i) => (
            <ClientRow
              key={client.id + i}
              client={client}
              index={i}
              total={clients.length}
              onChange={(idx, val) => { markDirty(); setClients((p) => p.map((x, xi) => xi === idx ? val : x)); }}
              onDelete={(idx) => { if (!confirm("Remove this client?")) return; markDirty(); setClients((p) => p.filter((_, xi) => xi !== idx)); }}
              onMoveUp={moveClientUp}
              onMoveDown={moveClientDown}
            />
          ))}
        </div>
        <button
          onClick={() => { markDirty(); setClients((p) => [...p, { id: Date.now().toString(), name: "", imageUrl: "" }]); }}
          className="flex items-center gap-2 text-[13px] text-[#0B0B0B]/50 hover:text-[#0B0B0B] border border-dashed border-[#0B0B0B]/20 hover:border-[#0B0B0B]/40 px-4 py-2.5 rounded-xl w-full justify-center transition-colors"
        >
          <Plus size={14} /> Add Client
        </button>
      </Card>

      {/* CTA Block */}
      <Card className="mb-5">
        <SectionTitle>CTA Block</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-4">The premium conversion section at the bottom of the page.</p>
        <div className="space-y-3">
          <Input label="Heading" value={ctaHeading} onChange={(e) => { setCtaHeading(e.target.value); markDirty(); }} />
          <Textarea label="Subtext" value={ctaSubtext} onChange={(e) => { setCtaSubtext(e.target.value); markDirty(); }} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Button Text" value={ctaButtonText} onChange={(e) => { setCtaButtonText(e.target.value); markDirty(); }} placeholder="Book a Strategy Call" />
            <Input label="Button Link" value={ctaButtonLink} onChange={(e) => { setCtaButtonLink(e.target.value); markDirty(); }} placeholder="/contact" />
          </div>
        </div>
      </Card>

      {/* Brand Tagline */}
      <Card className="mb-5">
        <SectionTitle>Brand Tagline</SectionTitle>
        <p className="text-[12px] text-[#0B0B0B]/40 mb-3">The closing line shown at the very bottom of the Work page.</p>
        <Input label="Tagline" value={brandLine} onChange={(e) => { setBrandLine(e.target.value); markDirty(); }} placeholder="Content creates. Distribution multiplies." />
      </Card>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
