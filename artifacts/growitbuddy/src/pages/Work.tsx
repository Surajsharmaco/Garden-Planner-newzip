import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import CountUp from "@/components/effects/CountUp";
import SEOMeta from "@/components/SEOMeta";

const cases = [
  { name: "Tech Founder to Industry Voice", category: "B2B SaaS · LinkedIn", metric: "14M", unit: "impressions", body: "From zero online presence to the most-cited voice in their SaaS niche within 6 months.", dark: true },
  { name: "Agency Owner Authority Engine", category: "Services · Multi-channel", metric: "$2.4M", unit: "pipeline attributed", body: "Systematic content strategy that drove inbound pipeline exceeding prior annual revenue.", dark: false },
  { name: "Creator Monetization System", category: "Creator Economy · YouTube", metric: "250K", unit: "subscribers", body: "Educational content system built around a proprietary framework, monetized to $40K/mo.", dark: false },
  { name: "Executive Personal Brand", category: "Leadership · Podcast & PR", metric: "15+", unit: "speaking invites / qtr", body: "Turned a quiet operator into an industry thought leader with consistent PR placement.", dark: true },
  { name: "E-commerce Founder Growth", category: "E-commerce · X / Twitter", metric: "400%", unit: "branded search growth", body: "Personal brand-first strategy that made the founder synonymous with their product category.", dark: false },
  { name: "VC Authority Engine", category: "Finance · LinkedIn", metric: "3×", unit: "deal flow growth", body: "Positioned a venture firm as the category expert, attracting better deal flow at higher velocity.", dark: true },
];

export default function Work() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Our Work — GrowitBuddy"
        description="Case studies and proof of work from GrowitBuddy's authority-building campaigns. Real results for founders, creators, and growing brands."
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
            Proof of authority at scale.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Our clients expect outcomes. We measure our success by theirs. Here's the proof.
          </motion.p>
        </div>
      </section>

      {/* Cases grid */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "36px 32px",
                borderRadius: 20,
                background: c.dark ? "#0B0B0B" : "#F7F7F5",
                border: c.dark ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: c.dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 28 }}>{c.category}</p>
              <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: c.dark ? "#fff" : "#0B0B0B", lineHeight: 1, marginBottom: 4 }}>
                <CountUp value={c.metric} />
              </div>
              <p style={{ fontSize: 13, color: c.dark ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.4)", marginBottom: 20 }}>{c.unit}</p>
              <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: c.dark ? "#fff" : "#0B0B0B", lineHeight: 1.35, marginBottom: 10 }}>{c.name}</h3>
              <p style={{ fontSize: 14, color: c.dark ? "rgba(255,255,255,0.4)" : "rgba(11,11,11,0.5)", lineHeight: "1.7" }}>{c.body}</p>
            </motion.div>
          ))}
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
