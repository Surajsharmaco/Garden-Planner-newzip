import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

const STEPS = [
  {
    num: "01",
    title: "Positioning",
    headline: "Know exactly what you stand for.",
    desc: "We audit your space, map your competitors, and identify the specific category angle only you can own. This is the foundation of your personal branding strategy - every piece of content flows from it.",
    details: [
      "Competitor landscape audit",
      "Category design & naming",
      "Unique point of view articulation",
      "Target audience avatar mapping",
      "90-day authority roadmap",
    ],
    color: "#F7F7F5",
  },
  {
    num: "02",
    title: "Content Engine",
    headline: "High-signal content strategy. At scale.",
    desc: "We build a repeatable content system that extracts your expertise and packages it into formats that educate, persuade, and convert - without consuming your time.",
    details: [
      "Pillar content strategy",
      "Content calendar & themes",
      "Ghostwriting & scripting",
      "Multi-format repurposing",
      "Editorial quality control",
    ],
    color: "#0B0B0B",
  },
  {
    num: "03",
    title: "Distribution Loop",
    headline: "Content Distribution Strategy That Actually Works",
    desc: "Make sure your content doesn't just get posted - it gets seen by the people who actually matter. A structured content distribution strategy is what separates noise from authority.",
    details: [
      "LinkedIn publishing system",
      "Email list growth strategy",
      "Cross-platform syndication",
      "Podcast & media placement",
      "Community building",
    ],
    color: "#F7F7F5",
  },
  {
    num: "04",
    title: "Authority Compounding",
    headline: "The flywheel that never stops.",
    desc: "When your personal branding strategy, content system, and distribution work together, authority compounds automatically. Inbound leads increase, deal close rates improve, and pricing power grows.",
    details: [
      "Monthly authority score tracking",
      "Inbound opportunity capture",
      "Premium positioning signals",
      "Speaking & PR outreach",
      "Authority monetization",
    ],
    color: "#0B0B0B",
  },
];

export default function Framework() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="The Content Marketing Framework | 4-Step Authority System | GrowitBuddy"
        description="GrowitBuddy's battle-tested content marketing framework: Personal Branding Strategy, Content System, Distribution Strategy, and Authority Compounding - built to generate inbound leads."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Framework</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 24 }}
          >
            The Authority Framework.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            A battle-tested content marketing framework for engineering category dominance that compounds over time. No hacks. No shortcuts. Just infrastructure built to generate inbound leads.
          </motion.p>
        </div>
      </section>

      {/* Visual connector */}
      <section style={{ padding: "20px 24px 0", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 0 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 160 }}>
                <div
                  style={{
                    flex: 1,
                    padding: "20px 24px",
                    background: step.color,
                    borderRadius: 0,
                    borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.3)",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: step.color === "#0B0B0B" ? "rgba(255,255,255,0.4)" : "rgba(11,11,11,0.4)", marginBottom: 6 }}>{step.num}</p>
                  <p style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: step.color === "#0B0B0B" ? "#fff" : "#0B0B0B" }}>{step.title}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 0, height: 0, borderTop: "30px solid transparent", borderBottom: "30px solid transparent", borderLeft: `16px solid ${step.color}`, flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps detail */}
      {STEPS.map((step, i) => (
        <section
          key={i}
          style={{
            padding: "80px 24px",
            background: i % 2 === 0 ? "#fff" : "#F7F7F5",
            borderTop: "1px solid rgba(11,11,11,0.08)",
          }}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#0B0B0B" }}>{step.num}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)" }}>{step.title}</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.035em", lineHeight: "1.1", color: "#0B0B0B", marginBottom: 20 }}>{step.headline}</h2>
              <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8" }}>{step.desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07, duration: 0.6 }}
            >
              <ul style={{ borderTop: "1px solid rgba(11,11,11,0.08)", display: "flex", flexDirection: "column" }}>
                {step.details.map((d, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check className="w-3 h-3" style={{ color: "#0B0B0B" }} />
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B" }}>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.04em", color: "#fff", marginBottom: 20 }}>
            Ready to start building?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 36 }}>
            Book a free strategy call and we'll map out your authority roadmap.
          </p>
          <Link href="/contact">
            <span className="gb-btn" style={{ fontSize: 15, margin: "0 auto" }}>
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
