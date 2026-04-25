import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { PageHeader, Card, SectionTitle, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  badge: string;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "Founder Brand Building",
    subtitle: "Authority at Scale",
    badge: "Most Popular",
    description: "We build the content engine, positioning, and distribution system that turns founders into recognized industry voices.",
    features: ["Positioning & messaging strategy", "Content calendar & production", "LinkedIn & newsletter growth", "Monthly strategy sessions"],
  },
  {
    id: "2",
    title: "Creator Partnerships",
    subtitle: "Reach the Right Rooms",
    badge: "",
    description: "We connect brands with precisely matched creators in our vetted roster to run campaigns that drive awareness and trust.",
    features: ["Creator matching & vetting", "Campaign strategy & briefs", "Full campaign management", "Performance reporting"],
  },
  {
    id: "3",
    title: "Content Studio",
    subtitle: "Done-For-You Production",
    badge: "",
    description: "A dedicated team of writers, strategists, and editors who handle everything from ideation to final publish.",
    features: ["Strategy & research", "Long-form & short-form writing", "Editing & brand voice alignment", "SEO & distribution"],
  },
  {
    id: "4",
    title: "Authority Audit",
    subtitle: "Know Where You Stand",
    badge: "Free",
    description: "A 30-minute deep dive into your current brand presence, competitive positioning, and the fastest path to authority.",
    features: ["Brand presence audit", "Competitive gap analysis", "Top 3 quick wins", "Personalized roadmap"],
  },
];

function ServiceRow({
  service,
  index,
  onChange,
  onDelete,
}: {
  service: Service;
  index: number;
  onChange: (i: number, val: Service) => void;
  onDelete: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<Service>) => onChange(index, { ...service, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3.5">
        <GripVertical size={14} className="text-[#0B0B0B]/20 shrink-0 cursor-grab" />
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center gap-3 text-left"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{service.title || "Unnamed Service"}</p>
              {service.badge && (
                <span className="text-[10px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full shrink-0">{service.badge}</span>
              )}
            </div>
            <p className="text-[11px] text-[#0B0B0B]/40 truncate">{service.subtitle}</p>
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
            <Input label="Title" value={service.title} onChange={(e) => set({ title: e.target.value })} />
            <Input label="Subtitle" value={service.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
            <Input label="Badge (optional)" value={service.badge} onChange={(e) => set({ badge: e.target.value })} placeholder="Most Popular, Free, New" />
          </div>
          <Textarea
            label="Description"
            value={service.description}
            onChange={(e) => set({ description: e.target.value })}
            rows={3}
          />
          <Textarea
            label="Features (one per line)"
            value={service.features.join("\n")}
            onChange={(e) => set({ features: e.target.value.split("\n").filter(Boolean) })}
            rows={5}
            hint="Each line becomes a bullet point feature"
          />
        </div>
      )}
    </Card>
  );
}

export default function AdminServices() {
  const { getContent, saveContent } = useAdmin();
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [headline, setHeadline] = useState("What we build for you");
  const [subtext, setSubtext] = useState("Four ways we help founders, creators, and brands build the authority that converts.");

  useEffect(() => {
    getContent("services").then((d) => {
      if (!d) return;
      if (d.services) setServices(d.services as Service[]);
      if (d.headline) setHeadline(d.headline as string);
      if (d.subtext) setSubtext(d.subtext as string);
    });
  }, [getContent]);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("services", { headline, subtext, services });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function handleChange(i: number, val: Service) {
    setSaved(false);
    setServices((p) => p.map((x, idx) => (idx === i ? val : x)));
  }

  function handleDelete(i: number) {
    if (!confirm("Remove this service?")) return;
    setSaved(false);
    setServices((p) => p.filter((_, idx) => idx !== i));
  }

  function addNew() {
    setSaved(false);
    setServices((p) => [...p, { id: Date.now().toString(), title: "", subtitle: "", badge: "", description: "", features: [] }]);
  }

  return (
    <div>
      <PageHeader title="Services" description="Edit the services offered on the Services page." />

      <Card className="mb-5">
        <SectionTitle>Section Header</SectionTitle>
        <div className="space-y-3">
          <Input label="Headline" value={headline} onChange={(e) => { setHeadline(e.target.value); setSaved(false); }} />
          <Textarea label="Subtext" value={subtext} onChange={(e) => { setSubtext(e.target.value); setSaved(false); }} rows={2} />
        </div>
      </Card>

      <div className="flex justify-end mb-4">
        <button
          onClick={addNew}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((s, i) => (
          <ServiceRow key={s.id + i} service={s} index={i} onChange={handleChange} onDelete={handleDelete} />
        ))}
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
