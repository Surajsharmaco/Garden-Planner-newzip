import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";
import { usePublicContent } from "@/hooks/usePublicContent";

interface MicroStat { value: string; label: string; }
interface PerfStat { value: string; label: string; sublabel: string; }
interface ProofItem { id: string; type: "image" | "video"; url: string; caption: string; }
interface ClientLogo { id: string; url: string; name: string; }
interface CaseSnap { id: string; niche: string; result: string; }
interface WorkItem {
  id: string; title: string; subtitle: string; category: string;
  metric: string; metricLabel: string; description: string;
  tags: string[]; stats: { label: string; value: string }[]; imageUrl: string;
}

interface WorkData {
  heroHeadline: string;
  heroSubtext: string;
  heroMicroStats: MicroStat[];
  showPerformanceStats: boolean;
  performanceStats: PerfStat[];
  showProofModal: boolean;
  proofItems: ProofItem[];
  showClientLogos: boolean;
  clientLogosHeading: string;
  clientLogos: ClientLogo[];
  showCases: boolean;
  cases: CaseSnap[];
  showFlow: boolean;
  flowText: string;
  showCta: boolean;
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  headline: string;
  subtext: string;
  items: WorkItem[];
}

const DEFAULTS: WorkData = {
  heroHeadline: "700M+ Views Generated",
  heroSubtext: "Across content and distribution systems",
  heroMicroStats: [
    { value: "22M+", label: "Monthly Views" },
    { value: "Multi-Page", label: "Distribution" },
    { value: "Organic", label: "Growth Systems" },
  ],
  showPerformanceStats: true,
  performanceStats: [
    { value: "22.6M", label: "Views in 30 days", sublabel: "Tracked across active distribution" },
    { value: "98%", label: "Reach from Reels", sublabel: "Algorithmic amplification" },
    { value: "Non-Followers", label: "Majority Audience", sublabel: "Cold reach, not just your base" },
  ],
  showProofModal: true,
  proofItems: [],
  showClientLogos: true,
  clientLogosHeading: "Worked with creators, brands and high-growth accounts",
  clientLogos: [],
  showCases: true,
  cases: [
    { id: "1", niche: "Doctor", result: "1M+ followers across pages" },
    { id: "2", niche: "Creator", result: "14M impressions in 45 days" },
    { id: "3", niche: "Brand", result: "400% branded search growth" },
  ],
  showFlow: true,
  flowText: "We don't just create content. We amplify it through distribution.",
  showCta: true,
  ctaHeadline: "See how this could work for your brand",
  ctaSubtext: "Book a free strategy call and let's scope your authority system.",
  ctaButtonText: "Book Strategy Call",
  ctaButtonUrl: "/contact",
  headline: "Proof of authority at scale.",
  subtext: "Our clients expect outcomes. We measure our success by theirs.",
  items: [],
};

function ProofModal({
  items,
  startIndex,
  onClose,
}: {
  items: ProofItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(items.length - 1, i + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-3xl bg-[#111] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-widest">
              Real Data {items.length > 1 ? `${idx + 1} / ${items.length}` : ""}
            </p>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="relative bg-black" style={{ minHeight: 300, maxHeight: "70vh" }}>
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.caption || "Proof"}
                className="w-full h-full object-contain"
                style={{ maxHeight: "65vh" }}
              />
            ) : (
              <div className="flex items-center justify-center" style={{ minHeight: 300 }}>
                {item.url.includes("youtube.com") || item.url.includes("youtu.be") ? (
                  <iframe
                    src={item.url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                    className="w-full"
                    style={{ height: 400 }}
                    allow="autoplay; fullscreen"
                    frameBorder={0}
                  />
                ) : (
                  <video src={item.url} controls className="w-full" style={{ maxHeight: "65vh" }} />
                )}
              </div>
            )}
          </div>

          {item.caption && (
            <div className="px-5 py-3">
              <p className="text-[13px] text-white/60">{item.caption}</p>
            </div>
          )}

          {items.length > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-white/8">
              <button
                onClick={prev}
                disabled={idx === 0}
                className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white disabled:opacity-20 transition-colors"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/25"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={idx === items.length - 1}
                className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white disabled:opacity-20 transition-colors"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useEffect } from "react";

export default function Work() {
  const data = usePublicContent<WorkData>("work", DEFAULTS);
  const [proofOpen, setProofOpen] = useState(false);

  return (
    <div style={{ background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Work and Results | GrowitBuddy"
        description="700M+ views generated. See our performance stats, real proof, and client results."
      />

      {/* Section 1: Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.07)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 20 }}>Work</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{ fontWeight: 900, fontSize: "clamp(52px, 8vw, 108px)", letterSpacing: "-0.04em", lineHeight: "0.96", color: "#0B0B0B", marginBottom: 28 }}
          >
            {data.heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.45)", lineHeight: 1.7, maxWidth: "42ch", marginBottom: 56 }}
          >
            {data.heroSubtext}
          </motion.p>

          {data.heroMicroStats && data.heroMicroStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "32px 48px" }}
            >
              {data.heroMicroStats.map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0B0B0B", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: "rgba(11,11,11,0.4)", marginTop: 4, fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 2: Performance Stats */}
      {data.showPerformanceStats !== false && data.performanceStats && data.performanceStats.length > 0 && (
        <section style={{ padding: "72px 24px", background: "#F7F7F5", borderBottom: "1px solid rgba(11,11,11,0.07)" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 40 }}>Performance</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {data.performanceStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  style={{
                    background: "#fff",
                    border: "1.5px solid rgba(11,11,11,0.07)",
                    borderRadius: 20,
                    padding: "36px 32px",
                  }}
                >
                  <p style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1, marginBottom: 8 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#0B0B0B", marginBottom: 6 }}>{stat.label}</p>
                  {stat.sublabel && (
                    <p style={{ fontSize: 13, color: "rgba(11,11,11,0.4)", lineHeight: 1.6 }}>{stat.sublabel}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: View Real Proof */}
      {data.showProofModal !== false && data.proofItems && data.proofItems.length > 0 && (
        <section style={{ padding: "72px 24px", background: "#0B0B0B", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[700px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>Proof</p>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.08, marginBottom: 16 }}>
              Real numbers, real screenshots.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 36 }}>
              We keep proof private to protect our clients. Click below to view verified performance data.
            </p>
            <button
              onClick={() => setProofOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#fff", color: "#0B0B0B",
                fontWeight: 700, fontSize: 14, padding: "14px 28px",
                borderRadius: 99, border: "none", cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Play size={14} fill="#0B0B0B" />
              View Real Data
            </button>
          </div>
          {proofOpen && (
            <ProofModal
              items={data.proofItems}
              startIndex={0}
              onClose={() => setProofOpen(false)}
            />
          )}
        </section>
      )}

      {/* Section 4: Client Logos */}
      {data.showClientLogos !== false && data.clientLogos && data.clientLogos.length > 0 && (
        <section style={{ padding: "72px 24px", background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.07)" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(11,11,11,0.4)", textAlign: "center", marginBottom: 48, lineHeight: 1.6 }}>
              {data.clientLogosHeading || "Worked with creators, brands and high-growth accounts"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "center" }}>
              {data.clientLogos.map((logo) => (
                <div
                  key={logo.id}
                  title={logo.name}
                  style={{
                    width: 120, height: 52,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "8px 16px",
                    borderRadius: 12,
                    border: "1.5px solid rgba(11,11,11,0.08)",
                    transition: "border-color 0.2s",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.filter = "none";
                    e.currentTarget.style.borderColor = "rgba(11,11,11,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.filter = "grayscale(100%) opacity(50%)";
                    e.currentTarget.style.borderColor = "rgba(11,11,11,0.08)";
                  }}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "grayscale(100%) opacity(50%)", transition: "filter 0.25s" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Case Snapshots */}
      {data.showCases !== false && data.cases && data.cases.length > 0 && (
        <section style={{ padding: "72px 24px", background: "#F7F7F5", borderBottom: "1px solid rgba(11,11,11,0.07)" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 40 }}>Case Snapshots</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {data.cases.map((c, i) => (
                <motion.div
                  key={c.id || i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: i % 2 === 0 ? "#0B0B0B" : "#fff",
                    border: i % 2 === 0 ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                    borderRadius: 20,
                    padding: "32px 28px",
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 16 }}>
                    {c.niche}
                  </p>
                  <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800, letterSpacing: "-0.02em", color: i % 2 === 0 ? "#fff" : "#0B0B0B", lineHeight: 1.3 }}>
                    {c.result}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 6: System Flow */}
      {data.showFlow !== false && (
        <section style={{ padding: "72px 24px", background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.07)" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 40 }}>How It Works</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, alignItems: "center", marginBottom: 40 }}>
              {["Content", "Distribution", "Authority"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    background: i === 1 ? "#0B0B0B" : "#F7F7F5",
                    border: i === 1 ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                  }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: i === 1 ? "#fff" : "#0B0B0B", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{step}</p>
                  </div>
                  {i < 2 && (
                    <div style={{ padding: "0 12px" }}>
                      <ArrowRight size={16} style={{ color: "rgba(11,11,11,0.25)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: 1.75, maxWidth: "52ch" }}>
              {data.flowText || "We don't just create content. We amplify it through distribution."}
            </p>
          </div>
        </section>
      )}

      {/* Section 7: CTA */}
      {data.showCta !== false && (
        <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
          <div className="max-w-[600px] mx-auto">
            <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              {data.ctaHeadline || "See how this could work for your brand"}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 36 }}>
              {data.ctaSubtext || "Book a free strategy call and let's scope your authority system."}
            </p>
            <Link href={data.ctaButtonUrl || "/contact"}>
              <span
                className="gb-btn"
                style={{ margin: "0 auto", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0B0B0B", padding: "14px 28px", borderRadius: 99, fontWeight: 700, textDecoration: "none", cursor: "pointer" }}
              >
                {data.ctaButtonText || "Book Strategy Call"}
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
