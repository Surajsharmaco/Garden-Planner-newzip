import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

const services = [
  {
    num: "01",
    title: "Authority Strategy",
    headline: "Know exactly what you stand for.",
    description: "Narrative design, category positioning, and a bespoke 90-day authority roadmap built for your specific market and audience.",
    features: ["Narrative Design", "Category Creation", "Audience Avatar Mapping", "90-Day Roadmap", "Competitor Analysis"],
    dark: false,
  },
  {
    num: "02",
    title: "Content Production",
    headline: "High-signal content. At scale.",
    description: "We extract your knowledge and systematize the production of high-quality content - ghostwriting, visual assets, newsletters, and platform-native formats.",
    features: ["Ghostwriting", "Visual Asset Creation", "Newsletter Systems", "Platform-Native Formatting", "Content Calendar"],
    dark: true,
  },
  {
    num: "03",
    title: "Video Editing",
    headline: "Video built for retention.",
    description: "Short-form clips, long-form editing, thumbnail design, and algorithm-native structure built for compounding reach.",
    features: ["Short-Form Clips", "Long-Form Editing", "Thumbnail Design", "Retention Optimization", "Caption Systems"],
    dark: false,
  },
  {
    num: "04",
    title: "Distribution Strategy",
    headline: "Reach decision-makers at scale.",
    description: "Platform-native, algorithm-aware strategies that ensure your narrative reaches the decision-makers that matter across every major channel.",
    features: ["Algorithm Strategy", "Cross-Platform Syndication", "Engagement Architecture", "Community Building", "Paid Amplification"],
    dark: true,
  },
  {
    num: "05",
    title: "Personal Brand Growth",
    headline: "Own your category.",
    description: "Profile optimisation, network expansion, monetisation strategy, and PR placements - a full-stack approach to authority ownership.",
    features: ["Profile Optimization", "Network Expansion", "Monetization Strategy", "PR & Media Placements", "Speaking Outreach"],
    dark: false,
  },
];

export default function Services() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Services - GrowitBuddy"
        description="End-to-end authority systems for founders and creators. Authority Strategy, Content Production, Video Editing, Distribution, and Personal Brand Growth."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Services</p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ fontWeight: 800, fontSize: "clamp(44px, 6.5vw, 80px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B" }}
            >
              End-to-end authority systems.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, lineHeight: "1.75", color: "rgba(11,11,11,0.5)", alignSelf: "flex-end" }}
          >
            We don't just create content. We build the infrastructure for category leadership - every module designed to compound.
          </motion.p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <section
          key={i}
          style={{
            padding: "80px 24px",
            background: s.dark ? "#0B0B0B" : (i % 2 === 0 ? "#fff" : "#F7F7F5"),
            borderTop: "1px solid rgba(11,11,11,0.08)",
          }}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-14 md:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.dark ? "rgba(255,255,255,0.1)" : "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: s.dark ? "rgba(255,255,255,0.7)" : "#0B0B0B" }}>{s.num}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: s.dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)" }}>{s.title}</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.04em", lineHeight: "1.1", color: s.dark ? "#fff" : "#0B0B0B", marginBottom: 20 }}>
                {s.headline}
              </h2>
              <p style={{ fontSize: 16, lineHeight: "1.8", color: s.dark ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)", marginBottom: 28 }}>
                {s.description}
              </p>
              <Link href="/contact">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 22px",
                    borderRadius: 100,
                    background: s.dark ? "#fff" : "#0B0B0B",
                    color: s.dark ? "#0B0B0B" : "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "opacity 0.18s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  className="hover:opacity-80"
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.6 }}>
              <ul style={{ borderTop: `1px solid ${s.dark ? "rgba(255,255,255,0.08)" : "rgba(11,11,11,0.08)"}`, display: "flex", flexDirection: "column" }}>
                {s.features.map((f, fi) => (
                  <li key={fi} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: `1px solid ${s.dark ? "rgba(255,255,255,0.08)" : "rgba(11,11,11,0.08)"}` }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: s.dark ? "rgba(255,255,255,0.12)" : "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check className="w-3 h-3" style={{ color: s.dark ? "#fff" : "#0B0B0B" }} />
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: s.dark ? "rgba(255,255,255,0.7)" : "#0B0B0B" }}>{f}</span>
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
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 32 }}>
            Book a free strategy call and let's scope your authority system.
          </p>
          <Link href="/contact">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 100,
                background: "#0B0B0B",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Book a strategy call
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
