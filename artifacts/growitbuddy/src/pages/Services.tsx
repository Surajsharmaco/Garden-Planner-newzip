import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

const services = [
  {
    num: "01",
    title: "Personal Branding Strategy",
    headline: "Define exactly how you are positioned before you create a single piece of content.",
    description: "We design your personal branding strategy, narrative, and content direction so every piece you put out reinforces exactly what you want to be known for.",
    features: ["Positioning & Narrative Design", "Target Audience Research", "90-Day Content Roadmap", "Competitive Landscape Analysis", "Content Themes & Pillars"],
    dark: false,
  },
  {
    num: "02",
    title: "Content Strategy Services",
    headline: "A content strategy that produces great content consistently.",
    description: "We build a repeatable content engine around your expertise — ghostwriting, visual assets, newsletters, and platform-native formats that produce results week after week.",
    features: ["Ghostwriting", "Visual Asset Creation", "Newsletter Systems", "Platform-Native Formatting", "Content Calendar"],
    dark: true,
  },
  {
    num: "03",
    title: "Video Marketing",
    headline: "Video marketing that captures attention and keeps it.",
    description: "High-retention editing for short and long-form video — structured to perform on the algorithm and built to make your expertise look as sharp as it actually is.",
    features: ["Short-Form Clips", "Long-Form Editing", "Thumbnail Design", "Retention Optimization", "Caption Systems"],
    dark: false,
  },
  {
    num: "04",
    title: "Content Distribution Strategy",
    headline: "A content distribution strategy that reaches the right people every time.",
    description: "Make sure your content doesn't just get posted — it gets seen by the people who actually matter. Structured distribution across the platforms and channels where your audience lives.",
    features: ["Platform Growth Strategy", "Cross-Platform Reach", "Engagement Optimization", "Community Building", "Paid Amplification"],
    dark: true,
  },
  {
    num: "05",
    title: "Personal Brand Growth",
    headline: "Become the most recognized name in your category.",
    description: "Profile optimization, media placement, network expansion, and speaking opportunities — a full-stack personal branding approach to owning your space in the market.",
    features: ["Profile Optimization", "Network Expansion", "Monetization Strategy", "PR & Media Placements", "Speaking Outreach"],
    dark: false,
  },
];

export default function Services() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .svc-hero-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 64px;
          align-items: end;
        }
        .svc-section-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .svc-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .svc-section-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 520px) {
          .svc-hero-grid { gap: 24px; }
        }
      `}</style>

      <SEOMeta
        title="Content Marketing Agency Services | Personal Branding & Content Strategy | GrowitBuddy"
        description="Grow your business with a content marketing agency offering personal branding strategy, content strategy services, video marketing, and content distribution systems."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 88, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto svc-hero-grid">
          {/* Left: label + headline */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 20 }}>Services</p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              style={{
                fontWeight: 800,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                letterSpacing: "-0.04em",
                lineHeight: "1.03",
                color: "#0B0B0B",
                maxWidth: "18ch",
              }}
            >
              The content systems behind authority and inbound demand.
            </motion.h1>
          </div>

          {/* Right: description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "flex-end" }}
          >
            <p style={{ fontSize: 17, lineHeight: "1.8", color: "rgba(11,11,11,0.5)", maxWidth: "38ch" }}>
              We don't just create content. We build the content marketing infrastructure that turns your expertise into recognition, trust, and consistent inbound opportunities.
            </p>
            <Link href="/contact">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  borderRadius: 100,
                  background: "#0B0B0B",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  width: "fit-content",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Book a strategy call
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <section
          key={i}
          style={{
            padding: "88px 24px",
            background: s.dark ? "#0B0B0B" : (i % 2 === 0 ? "#fff" : "#F7F7F5"),
            borderTop: "1px solid rgba(11,11,11,0.07)",
          }}
        >
          <div className="max-w-[1100px] mx-auto svc-section-grid">
            {/* Left: headline block */}
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              {/* Number + label row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  color: s.dark ? "rgba(255,255,255,0.25)" : "rgba(11,11,11,0.25)",
                  letterSpacing: "0.08em",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {s.num}
                </span>
                <span style={{ width: 1, height: 12, background: s.dark ? "rgba(255,255,255,0.15)" : "rgba(11,11,11,0.15)", flexShrink: 0 }} />
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: s.dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)",
                }}>
                  {s.title}
                </span>
              </div>

              {/* Headline */}
              <h2 style={{
                fontWeight: 800,
                fontSize: "clamp(26px, 3.2vw, 44px)",
                letterSpacing: "-0.04em",
                lineHeight: "1.12",
                color: s.dark ? "#fff" : "#0B0B0B",
                marginBottom: 20,
                maxWidth: "22ch",
              }}>
                {s.headline}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: 15,
                lineHeight: "1.85",
                color: s.dark ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)",
                marginBottom: 32,
                maxWidth: "38ch",
              }}>
                {s.description}
              </p>

              <Link href="/contact">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 20px",
                    borderRadius: 100,
                    background: s.dark ? "#fff" : "#0B0B0B",
                    color: s.dark ? "#0B0B0B" : "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  Get started
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>

            {/* Right: features list */}
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.55 }}>
              <ul style={{
                borderTop: `1px solid ${s.dark ? "rgba(255,255,255,0.08)" : "rgba(11,11,11,0.08)"}`,
                display: "flex",
                flexDirection: "column",
              }}>
                {s.features.map((f, fi) => (
                  <li
                    key={fi}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "18px 0",
                      borderBottom: `1px solid ${s.dark ? "rgba(255,255,255,0.06)" : "rgba(11,11,11,0.07)"}`,
                    }}
                  >
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: s.dark ? "rgba(255,255,255,0.1)" : "rgba(11,11,11,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Check className="w-3 h-3" style={{ color: s.dark ? "#fff" : "#0B0B0B" }} />
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: s.dark ? "rgba(255,255,255,0.72)" : "#0B0B0B" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: "96px 24px", background: "#0B0B0B" }}>
        <div className="max-w-[680px] mx-auto" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
            Ready to start?
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.08, marginBottom: 20 }}>
            Ready to build your authority system?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: "1.8", marginBottom: 36, maxWidth: "46ch", margin: "0 auto 36px" }}>
            Book a free strategy call and we'll map out exactly where to start — your positioning, your content gaps, and the fastest path to consistent inbound demand.
          </p>
          <Link href="/contact">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 100,
                background: "#fff",
                color: "#0B0B0B",
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
