import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import { Link } from "wouter";
import { FadeUp } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";
import SEOMeta from "@/components/SEOMeta";

const STATS = [
  { value: "700M+", label: "Views Generated" },
  { value: "200+", label: "Founders Served" },
  { value: "10K+", label: "Content Pieces" },
  { value: "4x", label: "Avg Growth Rate" },
];

const PROBLEMS = [
  {
    title: "Posting without traction",
    desc: "You're creating content consistently but getting little engagement, no inbound leads, and zero authority signal in your market.",
  },
  {
    title: "Lost in the noise",
    desc: "Less qualified competitors are louder than you. Decision-makers in your space have never heard your name despite your expertise.",
  },
  {
    title: "No system, just improvising",
    desc: "Every week is a scramble to figure out what to post. There's no repeatable process and no compounding effect - just random acts of content.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Authority Strategy",
    desc: "Category positioning, narrative design, and a 90-day roadmap built for your specific market.",
  },
  {
    num: "02",
    title: "Content Systems",
    desc: "Ghostwriting, visual assets, newsletters, and platform-native formats - systematized and scalable.",
  },
  {
    num: "03",
    title: "Video Editing",
    desc: "Short-form clips, long-form editing, thumbnail design, and retention-first structure.",
  },
  {
    num: "04",
    title: "Distribution Systems",
    desc: "Algorithm-aware, platform-native strategies that reach decision-makers at scale.",
  },
];

const FRAMEWORK_STEPS = [
  { step: "01", title: "Positioning", desc: "Define your unique angle, audience, and category claim. Stand for something specific." },
  { step: "02", title: "Content Engine", desc: "Build the repeatable system that produces high-signal content efficiently every week." },
  { step: "03", title: "Distribution Loop", desc: "Get your content in front of the right people through owned, borrowed, and algorithmic channels." },
  { step: "04", title: "Authority Compounding", desc: "Your growing reputation attracts better opportunities, clients, and collaborations automatically." },
];

const PROOF = [
  { metric: "14M", unit: "impressions", name: "Tech Founder to Industry Voice", category: "B2B SaaS · LinkedIn" },
  { metric: "$2.4M", unit: "pipeline attributed", name: "Agency Owner Authority Engine", category: "Services · Multi-channel" },
  { metric: "250K", unit: "subscribers", name: "Creator Monetization System", category: "Creator Economy · YouTube" },
  { metric: "400%", unit: "branded search growth", name: "E-commerce Founder Growth", category: "E-commerce · X / Twitter" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Understand", desc: "We audit your existing presence, audience, and competitive landscape to find your authority gap." },
  { num: "02", title: "Strategize", desc: "We map out your positioning, content themes, and a 90-day authority roadmap." },
  { num: "03", title: "Execute", desc: "Our team produces, edits, and distributes content on your behalf - while you focus on your business." },
  { num: "04", title: "Scale", desc: "We iterate based on data, double down on what compounds, and expand your distribution footprint." },
];

const TESTIMONIALS = [
  {
    quote: "We went from 0 to 50K LinkedIn followers in 90 days and closed 3 enterprise deals from content alone.",
    name: "Marcus Johnson",
    role: "Founder, TechScale Labs",
    initials: "MJ",
  },
  {
    quote: "GrowitBuddy helped us create content that drives investor interest and partnership deals. Creative, fast, and reliable.",
    name: "Sarah Chen",
    role: "CEO, VentureEdge",
    initials: "SC",
  },
  {
    quote: "Real engagement growth and inbound leads after partnering with GrowitBuddy. They're experts at authority-driven content.",
    name: "Jordan Lally",
    role: "Founder & CEO, SaaSGrowth Co.",
    initials: "JL",
  },
];

export default function Home() {
  const BG = "#F7F7F5";
  const TEXT = "#0B0B0B";

  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaError, setCtaError] = useState("");

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaEmail.trim()) return;
    setCtaSubmitting(true);
    setCtaError("");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/forms/contact`.replace(/\/\//g, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ctaEmail, name: "Homepage Lead", company: "—", message: "Homepage CTA email capture" }),
      });
      if (res.ok) {
        setCtaSubmitted(true);
      } else {
        setCtaError("Something went wrong. Please try again.");
      }
    } catch {
      setCtaError("Something went wrong. Please try again.");
    } finally {
      setCtaSubmitting(false);
    }
  };

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="GrowitBuddy - Build Authority That Compounds"
        description="GrowitBuddy is a content & authority studio for founders and creators. We build the systems that turn expertise into market leadership."
      />

      {/* ══ 1. HERO ══ */}
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
          paddingTop: 80,
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            width: "70vw",
            height: "70vw",
            maxWidth: 900,
            maxHeight: 900,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(11,11,11,0.04) 0%, rgba(11,11,11,0.02) 40%, transparent 68%)",
            animation: "pulse-glow 5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid rgba(11,11,11,0.1)",
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 32,
            }}
          >
            <Star className="w-3 h-3" style={{ color: "rgba(11,11,11,0.3)", fill: "rgba(11,11,11,0.3)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0B0B0B", letterSpacing: "0.04em" }}>
              700M+ views generated for our clients
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: "1.02",
              letterSpacing: "-0.04em",
              margin: "0 0 28px",
              color: TEXT,
            }}
          >
            Build Authority
            <br />
            That{" "}
            <span
              style={{
                display: "inline-block",
                fontStyle: "italic",
              }}
            >
              Compounds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              color: "rgba(11,11,11,0.55)",
              maxWidth: "52ch",
              margin: "0 auto 44px",
              lineHeight: "1.7",
              fontWeight: 400,
            }}
          >
            You're not a content creator - you're a business leader. We build the authority systems that turn your expertise into market dominance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact">
              <span className="gb-btn" style={{ fontSize: 15, padding: "14px 28px" }} data-testid="button-book-demo">
                Book a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/work">
              <span className="gb-btn-outline" style={{ fontSize: 15, padding: "13px 28px" }}>
                See Our Work
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. SOCIAL PROOF STRIP ══ */}
      <section style={{ borderTop: "1px solid rgba(11,11,11,0.08)", borderBottom: "1px solid rgba(11,11,11,0.08)", padding: "40px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, textAlign: "center" }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: TEXT, lineHeight: 1 }}>
                  <CountUp value={stat.value} />
                </div>
                <div style={{ fontSize: 13, color: "rgba(11,11,11,0.45)", marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. PROBLEM ══ */}
      <section style={{ padding: "100px 24px", background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>
              The Problem
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "18ch", marginBottom: 60 }}>
              Why most founders stay invisible.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                whileHover={{ borderColor: "rgba(11,11,11,0.25)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(11,11,11,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "rgba(11,11,11,0.4)" }}>✕</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em", color: TEXT, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SOLUTION / SHIFT ══ */}
      <section style={{ padding: "80px 24px 100px", background: "#0B0B0B" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              The Solution
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", maxWidth: "22ch", marginBottom: 60 }}>
              Stop creating content. Start building an authority system.
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 2, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            {[
              {
                label: "Content creation (old way)",
                dark: true,
                items: ["Random posting schedule", "No positioning or angle", "Vanity metrics focus", "Burn out after 3 months", "Zero compounding effect"],
                color: "rgba(255,255,255,0.3)",
              },
              {
                label: "Authority systems (the GrowitBuddy way)",
                dark: false,
                items: ["Positioned, strategic output", "Clear category ownership", "Inbound leads & deal flow", "Sustainable for years", "Compounds with every piece"],
                color: TEXT,
              },
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  background: i === 0 ? "rgba(255,255,255,0.03)" : "#fff",
                  padding: "36px 32px",
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: col.color, marginBottom: 24, opacity: 0.6 }}>
                  {col.label}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {i === 0 ? (
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 800 }}>✕</span>
                        </span>
                      ) : (
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(11,11,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check className="w-3 h-3" style={{ color: TEXT }} />
                        </span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 500, color: i === 0 ? "rgba(255,255,255,0.55)" : TEXT }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. SERVICES ══ */}
      <section style={{ padding: "100px 24px", background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Services</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "18ch", marginBottom: 60 }}>
              Everything you need to dominate your category.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 16,
                  padding: "28px",
                  transition: "border-color 0.2s",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(11,11,11,0.3)", marginBottom: 14 }}>{s.num}</p>
                <h3 style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: TEXT, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.5)", lineHeight: "1.7" }}>{s.desc}</p>
                <Link href="/services">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 20, fontSize: 13, fontWeight: 700, color: TEXT, cursor: "pointer" }} className="hover:opacity-60 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. FRAMEWORK ══ */}
      <section style={{ padding: "100px 24px", background: "#0B0B0B" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Framework</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", maxWidth: "22ch", marginBottom: 64 }}>
              The GrowitBuddy System.
            </h2>
          </FadeUp>
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
              {FRAMEWORK_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  style={{
                    background: i === 3 ? "#fff" : "rgba(255,255,255,0.04)",
                    padding: "32px 28px",
                    borderRadius: i === 0 ? "14px 0 0 14px" : i === 3 ? "0 14px 14px 0" : "0",
                    position: "relative",
                  }}
                >
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: i === 3 ? "rgba(11,11,11,0.08)" : "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: i === 3 ? "#0B0B0B" : "rgba(255,255,255,0.7)" }}>{step.step}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: i === 3 ? "#0B0B0B" : "#fff", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: i === 3 ? "rgba(11,11,11,0.55)" : "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/framework">
              <span className="gb-btn" style={{ fontSize: 14 }}>
                Explore the Full Framework
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 7. PROOF OF WORK ══ */}
      <section style={{ padding: "100px 24px", background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Proof of Work</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "16ch", marginBottom: 60 }}>
              Results that speak for themselves.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {PROOF.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  background: i % 2 === 0 ? "#0B0B0B" : "#fff",
                  border: i % 2 === 0 ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 16,
                  padding: "32px 28px",
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.3)", marginBottom: 20 }}>{p.category}</p>
                <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", color: i % 2 === 0 ? "#fff" : TEXT, lineHeight: 1, marginBottom: 4 }}>
                  <CountUp value={p.metric} />
                </div>
                <p style={{ fontSize: 13, color: i % 2 === 0 ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.4)", marginBottom: 16 }}>{p.unit}</p>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: i % 2 === 0 ? "#fff" : TEXT, lineHeight: 1.4 }}>{p.name}</h3>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/work">
              <span className="gb-btn-outline" style={{ fontSize: 14 }}>See All Case Studies <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 8. PROCESS ══ */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Process</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "20ch", marginBottom: 60 }}>
              How we build your authority system.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{step.num}</span>
                  </div>
                  <div style={{ height: 1, flex: 1, background: i < PROCESS_STEPS.length - 1 ? "rgba(11,11,11,0.1)" : "transparent" }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: TEXT, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. CREATOR & FREELANCER ECOSYSTEM ══ */}
      <section style={{ padding: "100px 24px", background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Ecosystem</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "22ch", marginBottom: 60 }}>
              Built for creators and freelancers too.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {[
              {
                tag: "For Creators",
                title: "Turn your platform into a business.",
                desc: "We help content creators build monetizable authority systems - turning views into a real business with predictable income.",
                cta: "Join as a Creator",
                href: "/creators",
                dark: false,
              },
              {
                tag: "For Freelancers",
                title: "Join the GrowitBuddy network.",
                desc: "Are you a writer, editor, or strategist? Apply to join our vetted network and work with the world's most ambitious founders.",
                cta: "Apply to Join",
                href: "/freelancers",
                dark: true,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: card.dark ? "#0B0B0B" : "#fff",
                  border: card.dark ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 20,
                  padding: "40px 36px",
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: card.dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 20 }}>{card.tag}</p>
                <h3 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.03em", lineHeight: "1.15", color: card.dark ? "#fff" : TEXT, marginBottom: 16 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: card.dark ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 32 }}>{card.desc}</p>
                <Link href={card.href}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 22px",
                      borderRadius: 100,
                      background: card.dark ? "#fff" : "#0B0B0B",
                      color: card.dark ? "#0B0B0B" : "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "opacity 0.18s",
                    }}
                    className="hover:opacity-80"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. AUTHORITY SCORE TOOL ══ */}
      <section style={{ padding: "100px 24px", background: "#0B0B0B" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 60, alignItems: "center" }}>
            <FadeUp>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Authority Audit</p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", marginBottom: 20 }}>
                What's your Authority Score?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 32 }}>
                Answer 8 questions and get a personalized breakdown of your authority leverage - free, in under 3 minutes.
              </p>
              <Link href="/authority-audit">
                <span className="gb-btn" style={{ fontSize: 14 }}>
                  Get My Authority Score
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "32px",
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Content Consistency</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>72</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ width: "72%", height: "100%", background: "rgba(255,255,255,0.75)", borderRadius: 100 }} />
                </div>
              </div>
              {[
                { label: "Positioning Clarity", val: 58 },
                { label: "Distribution Reach", val: 41 },
                { label: "Proof & Credibility", val: 85 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>{item.val}</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${item.val}%`, height: "100%", background: "rgba(255,255,255,0.2)", borderRadius: 100 }} />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Overall Authority Score</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em" }}>64/100</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 11. FOUNDER ══ */}
      <section style={{ padding: "100px 24px", background: BG }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 60, alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                aspectRatio: "1",
                borderRadius: 24,
                background: "linear-gradient(135deg, #1a1a1a 0%, #0B0B0B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 80,
                fontWeight: 800,
                color: "rgba(255,255,255,0.15)",
                letterSpacing: "-0.04em",
              }}
            >
              SS
            </motion.div>

            <FadeUp>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Founder</p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 48px)", letterSpacing: "-0.035em", lineHeight: "1.1", color: TEXT, marginBottom: 20 }}>
                Suraj Sharma
              </h2>
              <p style={{ fontSize: 15, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 28 }}>
                "I built GrowitBuddy after watching brilliant founders lose to louder, less qualified voices. Authority isn't given - it's architected. We built the agency to be the silent engine behind the world's most influential founders."
              </p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["Founder & CEO", "Content Strategist", "Authority Architect"].map((tag) => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 100, background: "rgba(11,11,11,0.06)", color: "rgba(11,11,11,0.6)" }}>{tag}</span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 12. TESTIMONIALS ══ */}
      <section style={{ padding: "80px 24px 100px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 48px)", letterSpacing: "-0.035em", textAlign: "center", color: TEXT, marginBottom: 48 }}>
              What our clients say.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  background: BG,
                  border: "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 16,
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4" style={{ color: "rgba(11,11,11,0.2)", fill: "rgba(11,11,11,0.2)" }} />)}
                </div>
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.7)", lineHeight: "1.75", marginBottom: 24 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "rgba(11,11,11,0.4)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13. FINAL CTA ══ */}
      <section style={{ padding: "100px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.7)" }}>G</div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(32px, 6vw, 68px)", letterSpacing: "-0.04em", lineHeight: "1.05", color: "#fff", marginBottom: 24 }}>
              Ready to build authority that compounds?
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 40, maxWidth: "46ch", margin: "0 auto 40px" }}>
              Book a free strategy call. We'll audit your current presence, identify your authority gap, and map out your 90-day system.
            </p>

            {ctaSubmitted ? (
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "20px 28px", marginBottom: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>You're on the list. We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleCtaSubmit} style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }} data-testid="home-cta-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  style={{
                    height: 52,
                    padding: "0 20px",
                    borderRadius: 100,
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    width: "min(100%, 300px)",
                  }}
                />
                <button
                  type="submit"
                  disabled={ctaSubmitting}
                  className="gb-btn"
                  style={{ fontSize: 15, padding: "14px 28px", height: 52 }}
                  data-testid="home-cta-submit"
                >
                  {ctaSubmitting ? "Submitting…" : "Book a Call"}
                  {!ctaSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
            {ctaError && (
              <p style={{ fontSize: 14, color: "rgba(255,100,100,0.85)", marginBottom: 16, marginTop: -16 }}>{ctaError}</p>
            )}

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/authority-audit">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "border-color 0.18s" }} className="hover:border-white/50">
                  Take the Authority Audit
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
