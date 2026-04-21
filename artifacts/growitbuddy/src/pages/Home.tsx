import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { FadeUp } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";

/* ══════════════════════════════════════════════════════════════
   vivafoxdigital.com STRUCTURE — GrowitBuddy content
   1. Hero           — dark, orange glow, bold headline, pill CTAs
   2. Logos marquee  — scrolling partner/client logos
   3. Process        — 3 service cards
   4. Features grid  — 6 features
   5. Testimonials   — 3 client reviews
   6. Pricing        — 3 tiers
   7. Stats          — count-up numbers
   8. Footer CTA     — "Authority content for every founder"
══════════════════════════════════════════════════════════════ */

const PROCESS_CARDS = [
  {
    icon: "✂",
    tag: "Editing",
    title: "Need editing?",
    desc: "A world-class editing team at your disposal. Turn your raw footage into scroll-stopping content that demands attention.",
    link: "Explore",
  },
  {
    icon: "🚀",
    tag: "Done-for-you",
    title: "Need A-Z support?",
    desc: "A complete done-for-you authority system — helping you create 15+ high-quality pieces in just 2 hours of your time.",
    link: "Explore",
  },
  {
    icon: "🎙",
    tag: "Podcast",
    title: "Have a podcast?",
    desc: "Outsource your podcast's signature editing and multi-platform distribution. We handle the rest — you just record.",
    link: "Explore",
  },
];

const FEATURES = [
  { title: "Performance Insights", desc: "Track how your content performs with data-backed analytics across every platform." },
  { title: "Brand Direction", desc: "Define your tone and vision — our team brings it to life with precision." },
  { title: "Precision Editing", desc: "We fine-tune your best footage into captivating clips designed to grab attention." },
  { title: "Quick Viral Formats", desc: "Multiple viral-ready formats from a single shoot — reels, shorts, and promos." },
  { title: "Authority Workflow", desc: "Step-by-step guidance for building a content system that compounds over time." },
  { title: "Competitor Analysis", desc: "Visual strategy insights from top-performing creators in your exact niche." },
];

const TESTIMONIALS = [
  {
    quote: "We saw real engagement growth and inbound leads after partnering with GrowitBuddy. They're experts at authority-driven content.",
    name: "Jordan Lally",
    role: "Founder & CEO",
    company: "SaaSGrowth Co.",
    initials: "JL",
    bg: "#1A1A1A",
  },
  {
    quote: "GrowitBuddy helped us create content that actually drives investor interest and partnership deals. Creative, fast, and reliable.",
    name: "Sarah Chen",
    role: "CEO",
    company: "VentureEdge",
    initials: "SC",
    bg: "#1A1A1A",
  },
  {
    quote: "Their system is incredible — we went from 0 to 50K LinkedIn followers in 90 days and closed 3 enterprise deals from content alone.",
    name: "Marcus Johnson",
    role: "Founder",
    company: "TechScale Labs",
    initials: "MJ",
    bg: "#1A1A1A",
  },
];

const PRICING = [
  {
    price: "$2,500",
    period: "/month",
    name: "8 Posts / Month",
    desc: "Perfect for founders starting their authority journey with consistent, high-quality content.",
    features: ["Ideation & Strategy", "Scripting & Direction", "Premium Editing", "LinkedIn Management", "Monthly Analytics Report"],
    cta: "Get Started",
    highlight: false,
  },
  {
    price: "$5,000",
    period: "/month",
    name: "20 Posts + 2 Videos",
    desc: "Our most popular plan — full content engine for growth-stage founders and operators.",
    features: ["Everything in Starter", "Short-Form Video Production", "YouTube Integration", "Cross-Platform Distribution", "24/7 Creative Support"],
    cta: "Book a Call",
    highlight: true,
  },
  {
    price: "$8,000",
    period: "/month",
    name: "30 Posts + 4 Videos",
    desc: "For founders ready to dominate their category and build undeniable authority at scale.",
    features: ["Everything in Authority", "4-Hour Studio Sessions", "Podcast Production", "PR & Media Outreach", "YouTube SEO & Optimization"],
    cta: "Book a Call",
    highlight: false,
  },
];

const MARQUEE_ITEMS = [
  "LinkedIn Authority", "YouTube Growth", "Podcast Production",
  "Short-Form Video", "Content Strategy", "Brand Positioning",
  "Ghostwriting", "Newsletter", "PR & Media", "Community Growth",
  "LinkedIn Authority", "YouTube Growth", "Podcast Production",
  "Short-Form Video", "Content Strategy", "Brand Positioning",
  "Ghostwriting", "Newsletter", "PR & Media", "Community Growth",
];

/* Overlapping pill CTA — exact vivafox style */
function HeroCTA() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 40,
        padding: 5,
        gap: 0,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Link href="/contact">
        <span
          className="inline-flex items-center gap-2.5 text-[14px] font-semibold cursor-pointer rounded-full pr-4 pl-2 py-2 hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff" }}
          data-testid="button-book-demo"
        >
          <span
            style={{
              width: 34, height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </span>
          Book a Demo Call
        </span>
      </Link>
      <Link href="/contact">
        <span
          className="inline-flex items-center gap-2.5 text-[14px] font-semibold cursor-pointer rounded-full pr-5 pl-2 py-2 hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff" }}
          data-testid="button-get-in-touch"
        >
          <span
            style={{
              width: 34, height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginLeft: -8,
            }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </span>
          Get In Touch
        </span>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#050505", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════
          1. HERO — vivafox: dark, radial orange glow, big headline, pill CTAs
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 64,
        }}
      >
        {/* Radial orange glow — exact vivafox hero glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            width: "70vw",
            height: "70vw",
            maxWidth: 900,
            maxHeight: 900,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(255,90,10,0.28) 0%, rgba(220,60,0,0.12) 35%, transparent 65%)",
            animation: "pulse-glow 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Concentric rings — vivafox's subtle radar pattern */}
        {[1, 0.6, 0.35, 0.18].map((opacity, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              width: `${(i + 1) * 22}vw`,
              height: `${(i + 1) * 22}vw`,
              maxWidth: (i + 1) * 280,
              maxHeight: (i + 1) * 280,
              borderRadius: "50%",
              border: `1px solid rgba(255,120,40,${opacity * 0.12})`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, padding: "0 24px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(44px, 8vw, 100px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              margin: "0 0 28px",
              color: "#fff",
            }}
          >
            Grow your Authority
            <br />
            with Content
            <br />
            <span className="text-orange-gradient">That Converts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "50ch",
              margin: "0 auto 44px",
              lineHeight: "1.7",
            }}
          >
            You're not a content creator — you're a business leader. But in today's world, attention is leverage. Let us turn you into a brand that commands your industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <HeroCTA />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "linear-gradient(to top, #050505, transparent)",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. LOGOS MARQUEE — vivafox: scrolling horizontal strip
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 0",
          background: "#080808",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 5, height: 5,
                  borderRadius: "50%",
                  background: "#FF5500",
                  display: "inline-block",
                }}
              />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          3. PROCESS — vivafox: 3 service cards
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#050505" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FF5500",
                marginBottom: 16,
              }}
            >
              Process
            </p>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(30px, 5vw, 54px)",
                letterSpacing: "-0.025em",
                lineHeight: "1.1",
                color: "#fff",
                maxWidth: "16ch",
                marginBottom: 60,
              }}
            >
              Simple Systems for Explosive Growth
            </h2>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {PROCESS_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                style={{
                  background: "#0E0E0E",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                whileHover={{ borderColor: "rgba(255,85,0,0.3)" }}
              >
                {/* Card image placeholder — dark gradient mimicking vivafox's images */}
                <div
                  style={{
                    height: 180,
                    background: `linear-gradient(135deg, #1A0A00 0%, #0D0D0D 50%, rgba(255,85,0,0.05) 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {card.icon}
                </div>

                <div style={{ padding: "28px 28px 32px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#FF5500",
                      marginBottom: 12,
                    }}
                  >
                    {card.tag}
                  </span>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "#fff",
                      marginBottom: 12,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: "1.75",
                      marginBottom: 20,
                    }}
                  >
                    {card.desc}
                  </p>
                  <Link href="/services">
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#FF5500",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                      }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <strong>{card.link}</strong>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. FEATURES GRID — vivafox: "Elevate Your Content Game"
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px 100px", background: "#080808" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 50px)",
                letterSpacing: "-0.025em",
                lineHeight: "1.1",
                color: "#fff",
                marginBottom: 60,
                textAlign: "center",
              }}
            >
              Level Up Your{" "}
              <span className="text-orange-gradient">Content Game.</span>
            </h2>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{ background: "#0A0A0A", padding: "32px 28px" }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: "#fff",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: "1.7",
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. TESTIMONIALS — vivafox: "Our clients"
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#050505" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp style={{ textAlign: "center", marginBottom: 60 }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.025em",
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Our clients
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
              Hear firsthand how our system has boosted authority for founders like you.
            </p>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#0E0E0E",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: "1.75",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. PRICING — vivafox: 3 tier cards
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px 100px", background: "#080808" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FF5500",
                marginBottom: 16,
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.025em",
                color: "#fff",
              }}
            >
              Invest in your authority.
            </h2>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {PRICING.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  background: plan.highlight ? "linear-gradient(135deg, #1A0800 0%, #120800 100%)" : "#0E0E0E",
                  border: plan.highlight ? "1px solid rgba(255,85,0,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "relative",
                }}
              >
                {plan.highlight && (
                  <span
                    style={{
                      position: "absolute",
                      top: 20, right: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#FF5500",
                      background: "rgba(255,85,0,0.12)",
                      padding: "4px 10px",
                      borderRadius: 40,
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 42,
                        letterSpacing: "-0.03em",
                        color: plan.highlight ? "#FF7A30" : "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.35)",
                        paddingBottom: 6,
                      }}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {plan.name}
                  </p>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: "1.65",
                  }}
                >
                  {plan.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((feat, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 18, height: 18,
                          borderRadius: "50%",
                          background: "rgba(255,85,0,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check className="w-2.5 h-2.5" style={{ color: "#FF5500" }} />
                      </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <span
                    className="cursor-pointer inline-flex items-center justify-center w-full rounded-full py-3 text-[14px] font-semibold transition-all hover:opacity-85"
                    style={{
                      background: plan.highlight
                        ? "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)"
                        : "rgba(255,255,255,0.07)",
                      color: "#fff",
                      border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                      marginTop: 8,
                    }}
                    data-testid={`button-pricing-${i}`}
                  >
                    {plan.cta}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. STATS — vivafox: count-up numbers
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 24px",
          background: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="max-w-[1200px] mx-auto"
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 60 }}
        >
          {[
            { value: "500+", label: "Hours Saved" },
            { value: "10M+", label: "Organic Views" },
            { value: "4×", label: "Credibility Boost" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <CountUp
                value={s.value}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(44px, 8vw, 88px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: 8,
                  background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              />
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. FOOTER CTA — vivafox: "Viral clips for every brand"
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 24px 80px",
          background: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px, 6vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
              color: "#fff",
              marginBottom: 32,
            }}
          >
            Authority content for{" "}
            <span className="text-orange-gradient">every founder.</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 40,
              maxWidth: "40ch",
              margin: "0 auto 40px",
            }}
          >
            No credit card required · Start within 48 hours
          </p>
          <HeroCTA />
        </motion.div>
      </section>

    </div>
  );
}
