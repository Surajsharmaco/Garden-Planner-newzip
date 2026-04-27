import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import CountUp from "@/components/effects/CountUp";
import SEOMeta from "@/components/SEOMeta";
import { usePublicContent } from "@/hooks/usePublicContent";

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

interface WorkData {
  headline: string;
  subtext: string;
  items: WorkItem[];
}

const DEFAULTS: WorkData = {
  headline: "Proof of authority at scale.",
  subtext: "Our clients expect outcomes. We measure our success by theirs. Here's the proof.",
  items: [
    { id: "1", title: "Tech Founder to Industry Voice", subtitle: "LinkedIn Authority Campaign", category: "B2B SaaS · LinkedIn", metric: "14M", metricLabel: "impressions", description: "A full content marketing system took this founder from zero online presence to the most-cited authority in their SaaS niche - in 6 months.", tags: ["LinkedIn", "B2B SaaS"], stats: [], imageUrl: "" },
    { id: "2", title: "Agency Owner Authority Engine", subtitle: "Multi-channel content strategy", category: "Services · Multi-channel", metric: "$2.4M", metricLabel: "inbound pipeline", description: "A systematic content strategy and distribution system drove inbound pipeline that exceeded prior annual revenue.", tags: ["Content Strategy"], stats: [], imageUrl: "" },
    { id: "3", title: "Creator Monetization System", subtitle: "YouTube authority build", category: "Creator Economy · YouTube", metric: "250K", metricLabel: "subscribers", description: "A content strategy built around a proprietary framework compounded into 250K subscribers and $40K/mo in revenue.", tags: ["YouTube", "Creator"], stats: [], imageUrl: "" },
    { id: "4", title: "Executive Personal Brand", subtitle: "Podcast & PR strategy", category: "Leadership · Podcast & PR", metric: "15+", metricLabel: "speaking invites / qtr", description: "Personal branding strategy turned a quiet operator into a recognized industry thought leader with consistent media placement.", tags: ["Personal Brand", "PR"], stats: [], imageUrl: "" },
    { id: "5", title: "E-commerce Founder Growth", subtitle: "X / Twitter brand build", category: "E-commerce · X / Twitter", metric: "400%", metricLabel: "branded search growth", description: "A personal brand-first content marketing approach made this founder synonymous with their product category.", tags: ["X / Twitter", "E-commerce"], stats: [], imageUrl: "" },
    { id: "6", title: "VC Authority Engine", subtitle: "LinkedIn positioning", category: "Finance · LinkedIn", metric: "3x", metricLabel: "deal flow growth", description: "Content strategy and personal branding positioned this venture firm as the category expert - attracting better deals at higher velocity.", tags: ["Finance", "LinkedIn"], stats: [], imageUrl: "" },
  ],
};

export default function Work() {
  const data = usePublicContent<WorkData>("work", DEFAULTS);

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Content Marketing Results | Case Studies | GrowitBuddy"
        description="Real content marketing results from GrowitBuddy. Case studies showing inbound growth, brand authority, and pipeline generated for founders, creators, and growing brands."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Work</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "14ch", marginBottom: 24 }}
          >
            {data.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            {data.subtext}
          </motion.p>
        </div>
      </section>

      {/* Cases grid */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.items.map((item, i) => {
            const dark = i % 2 === 0 && i % 3 !== 1;
            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: "36px 32px",
                  borderRadius: 20,
                  background: dark ? "#0B0B0B" : "#F7F7F5",
                  border: dark ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {item.imageUrl && (
                  <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 28 }}>{item.category}</p>
                <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: dark ? "#fff" : "#0B0B0B", lineHeight: 1, marginBottom: 4 }}>
                  <CountUp value={item.metric} />
                </div>
                <p style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.4)", marginBottom: 20 }}>{item.metricLabel}</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: dark ? "#fff" : "#0B0B0B", lineHeight: 1.35, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: dark ? "rgba(255,255,255,0.4)" : "rgba(11,11,11,0.5)", lineHeight: "1.7" }}>{item.description}</p>
                {item.stats && item.stats.length > 0 && (
                  <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {item.stats.map((stat, si) => (
                      <div key={si}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: dark ? "#fff" : "#0B0B0B", letterSpacing: "-0.02em" }}>{stat.value}</p>
                        <p style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.4)", marginTop: 2 }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.04em", color: "#fff", marginBottom: 16 }}>
            Your results, next.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 32 }}>
            Book a free strategy call and let's scope your authority system.
          </p>
          <Link href="/contact">
            <span className="gb-btn" style={{ margin: "0 auto", fontSize: 14 }}>
              Book a strategy call
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
