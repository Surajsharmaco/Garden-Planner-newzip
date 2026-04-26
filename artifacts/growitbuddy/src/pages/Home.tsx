import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import { Link } from "wouter";
import { FadeUp } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";
import SEOMeta from "@/components/SEOMeta";
import { usePublicContent } from "@/hooks/usePublicContent";

interface HomeData {
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineItalic: string;
  heroSubtext: string;
  heroCTAPrimary: string;
  heroCTASecondary: string;
  stats: Array<{ value: string; label: string }>;
  problemLabel: string;
  problemHeadline: string;
  problems: Array<{ title: string; desc: string }>;
  solutionLabel: string;
  solutionHeadline: string;
  solutionBeforeLabel: string;
  solutionAfterLabel: string;
  solutionBefore: string[];
  solutionAfter: string[];
  servicesLabel: string;
  servicesHeadline: string;
  services: Array<{ num: string; title: string; desc: string }>;
  frameworkLabel: string;
  frameworkHeadline: string;
  frameworkSteps: Array<{ step: string; title: string; desc: string }>;
  frameworkCTA: string;
  proofLabel: string;
  proofHeadline: string;
  proof: Array<{ metric: string; unit: string; name: string; category: string }>;
  processLabel: string;
  processHeadline: string;
  processSteps: Array<{ num: string; title: string; desc: string }>;
  ecosystemLabel: string;
  ecosystemHeadline: string;
  ecosystemCreatorTag: string;
  ecosystemCreatorTitle: string;
  ecosystemCreatorDesc: string;
  ecosystemCreatorCTA: string;
  ecosystemFreelancerTag: string;
  ecosystemFreelancerTitle: string;
  ecosystemFreelancerDesc: string;
  ecosystemFreelancerCTA: string;
  auditLabel: string;
  auditHeadline: string;
  auditSubtext: string;
  auditCTA: string;
  founderLabel: string;
  founderPhoto: string;
  founderInitials: string;
  founderName: string;
  founderQuote: string;
  founderTags: string[];
  testimonialsHeadline: string;
  testimonials: Array<{ quote: string; name: string; role: string; initials: string }>;
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButton: string;
  ctaSuccess: string;
  ctaSecondaryLink: string;
}

const DEFAULTS: HomeData = {
  heroBadge: "700M+ views generated for our clients",
  heroHeadline: "Build Authority That",
  heroHeadlineItalic: "Compounds",
  heroSubtext:
    "We help founders, creators, and businesses turn expertise into authority and that authority into consistent inbound demand through content strategy and distribution.",
  heroCTAPrimary: "Book a Strategy Call",
  heroCTASecondary: "See Our Work",
  stats: [
    { value: "700M+", label: "Views Generated" },
    { value: "200+", label: "Founders Served" },
    { value: "10K+", label: "Content Pieces" },
    { value: "4x", label: "Avg Growth Rate" },
  ],
  problemLabel: "The Problem",
  problemHeadline: "Most content gets attention. Very little builds authority.",
  problems: [
    {
      title: "You're creating content. But it's not part of a real content strategy.",
      desc: "Most content gets a few likes, then disappears. Without a clear content strategy and positioning, your output doesn't build the kind of trust that turns followers into paying clients.",
    },
    {
      title: "You're getting attention - but not reaching the right audience.",
      desc: "Reach without relevance leads nowhere. Without precise audience targeting, your content misses the decision-makers and buyers who actually matter to your business.",
    },
    {
      title: "You have no system - just constant effort.",
      desc: "Showing up consistently is exhausting when every post is a new decision. Without a structured content system, growth stays unpredictable no matter how much effort you put in.",
    },
  ],
  solutionLabel: "The Solution",
  solutionHeadline: "From random content - to a system that builds authority.",
  solutionBeforeLabel: "Content without a system",
  solutionAfterLabel: "With GrowitBuddy",
  solutionBefore: [
    "Content with no strategic direction",
    "Reach without the right audience",
    "Metrics without real business outcomes",
    "Inconsistency and creative burnout",
    "No compounding effect over time",
  ],
  solutionAfter: [
    "Clear positioning before any content",
    "Consistent reach to the right people",
    "Content that builds trust and drives demand",
    "A system that runs without daily effort",
    "Authority that compounds with every piece",
  ],
  servicesLabel: "Services",
  servicesHeadline:
    "Everything you need to build authority and generate inbound demand.",
  services: [
    {
      num: "01",
      title: "Personal Branding Strategy",
      desc: "Define exactly how you are positioned and what you're known for - the foundation of your entire content marketing approach.",
    },
    {
      num: "02",
      title: "Content Strategy Services",
      desc: "Build a repeatable content system that produces high-quality output consistently, without depending on your time every single week.",
    },
    {
      num: "03",
      title: "Video Marketing",
      desc: "High-retention video marketing for short and long-form - built to capture attention, perform on the algorithm, and keep people watching.",
    },
    {
      num: "04",
      title: "Content Distribution Strategy",
      desc: "Structured content distribution so your message reaches the right audience - not just the people who already follow you.",
    },
  ],
  frameworkLabel: "Framework",
  frameworkHeadline: "The GrowitBuddy System.",
  frameworkSteps: [
    {
      step: "01",
      title: "Positioning",
      desc: "Clarify your expertise and define the exact audience you want to attract. Your personal branding strategy starts here - everything else is built on this foundation.",
    },
    {
      step: "02",
      title: "Content Engine",
      desc: "Build a repeatable content system that produces high-quality output every week - without starting from scratch each time.",
    },
    {
      step: "03",
      title: "Distribution Loop",
      desc: "Execute a consistent content distribution strategy - getting your content in front of the right people on the channels they actually use.",
    },
    {
      step: "04",
      title: "Authority Compounding",
      desc: "Over time, a structured content system generates recognition, trust, and inbound leads. The right opportunities start coming to you.",
    },
  ],
  frameworkCTA: "Explore the Full Framework",
  proofLabel: "Content Marketing Results",
  proofHeadline: "Real results. Real inbound growth.",
  proof: [
    { metric: "14M", unit: "impressions", name: "Tech Founder to Industry Voice", category: "B2B SaaS · LinkedIn" },
    { metric: "$2.4M", unit: "pipeline attributed", name: "Agency Owner Authority Engine", category: "Services · Multi-channel" },
    { metric: "250K", unit: "subscribers", name: "Creator Monetization System", category: "Creator Economy · YouTube" },
    { metric: "400%", unit: "branded search growth", name: "E-commerce Founder Growth", category: "E-commerce · X / Twitter" },
  ],
  processLabel: "Process",
  processHeadline: "How we build your authority system.",
  processSteps: [
    {
      num: "01",
      title: "Understand",
      desc: "We study your market, your audience, and your current positioning to identify exactly where your content marketing opportunity is.",
    },
    {
      num: "02",
      title: "Strategize",
      desc: "We design your content planning roadmap - what to say, where to say it, and how to say it in a way that builds trust and drives real inbound demand.",
    },
    {
      num: "03",
      title: "Execute",
      desc: "Our team handles content creation and distribution every week - so you can focus entirely on running your business.",
    },
    {
      num: "04",
      title: "Scale",
      desc: "We track performance, refine your growth strategy, and expand your content reach as your authority compounds over time.",
    },
  ],
  ecosystemLabel: "Ecosystem",
  ecosystemHeadline: "Built for creators and freelancers too.",
  ecosystemCreatorTag: "For Creators",
  ecosystemCreatorTitle: "Turn your platform into consistent income.",
  ecosystemCreatorDesc:
    "We help creators build a positioned, monetized content system - so your audience turns into a real business, not just a following.",
  ecosystemCreatorCTA: "Join as a Creator",
  ecosystemFreelancerTag: "For Freelancers",
  ecosystemFreelancerTitle: "Join the GrowitBuddy network.",
  ecosystemFreelancerDesc:
    "Are you a writer, editor, or strategist? Apply to work with ambitious founders and help them build the authority they deserve.",
  ecosystemFreelancerCTA: "Apply to Join",
  auditLabel: "Content Growth Diagnosis",
  auditHeadline: "Find out exactly what's limiting your content growth.",
  auditSubtext:
    "Answer 6 questions and get a personalized breakdown of exactly what's holding your content marketing back - free, in under 2 minutes.",
  auditCTA: "Get My Growth Diagnosis",
  founderLabel: "Founder",
  founderPhoto: "",
  founderInitials: "SS",
  founderName: "Suraj Sharma",
  founderQuote:
    "\"I built GrowitBuddy after watching brilliant founders lose market position to louder, less qualified voices. Authority isn't given - it's built. We built the systems to do it consistently.\"",
  founderTags: ["Founder & CEO", "Content Strategist", "Authority Architect"],
  testimonialsHeadline: "What our clients say.",
  testimonials: [
    {
      quote:
        "We went from 0 to 50K LinkedIn followers in 90 days and closed 3 enterprise deals from content alone.",
      name: "Marcus Johnson",
      role: "Founder, TechScale Labs",
      initials: "MJ",
    },
    {
      quote:
        "GrowitBuddy helped us create content that drives investor interest and partnership deals. Creative, fast, and reliable.",
      name: "Sarah Chen",
      role: "CEO, VentureEdge",
      initials: "SC",
    },
    {
      quote:
        "Real engagement growth and inbound leads after partnering with GrowitBuddy. They're experts at authority-driven content.",
      name: "Jordan Lally",
      role: "Founder & CEO, SaaSGrowth Co.",
      initials: "JL",
    },
  ],
  ctaHeadline: "Ready to build authority that compounds?",
  ctaSubtext:
    "Book a free strategy call. We'll audit your current presence, identify your authority gap, and map out your 90-day system.",
  ctaButton: "Book a Call",
  ctaSuccess: "You're on the list. We'll be in touch within 24 hours.",
  ctaSecondaryLink: "Take the Authority Audit",
};

function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const GAP = 24;
    const MAX_R = 5.5;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GAP) + 2;
      const rows = Math.ceil(height / GAP) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP + (r % 2 === 0 ? 0 : GAP / 2);
          const y = r * GAP * 0.866;

          const w1 = Math.sin(c * 0.22 + r * 0.14 - t * 1.8) * 0.5 + 0.5;
          const w2 = Math.sin(c * 0.11 - r * 0.19 + t * 1.3 + 2.4) * 0.5 + 0.5;
          const w3 = Math.cos(c * 0.08 + r * 0.28 - t * 0.9 + 1.1) * 0.5 + 0.5;

          const val = w1 * 0.5 + w2 * 0.3 + w3 * 0.2;
          const radius = Math.pow(val, 1.6) * MAX_R;

          if (radius < 0.25) continue;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(11,11,11,${(val * 0.45).toFixed(3)})`;
          ctx.fill();
        }
      }

      t += 0.018;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(12px)",
      }}
    />
  );
}

function GrainOverlay() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.055 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="grain-filter" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              values="0;20;40;60;80;100;0"
              dur="12s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

export default function Home() {
  const BG = "#F7F7F5";
  const TEXT = "#0B0B0B";

  const hm = usePublicContent<HomeData>("home", DEFAULTS);

  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handle = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    hero.addEventListener("mousemove", handle);
    return () => hero.removeEventListener("mousemove", handle);
  }, []);

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
        title="Content Marketing Agency | Personal Branding & Content Strategy | GrowitBuddy"
        description="Grow your business with a content marketing agency that combines content strategy, video marketing, and distribution systems to generate real inbound demand."
      />

      {/* ══ 1. HERO ══ */}
      <section
        ref={heroRef}
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
        <GrainOverlay />
        <PremiumBackground />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle 600px at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, transparent 75%)`,
            transition: "background 0.15s ease-out",
            pointerEvents: "none",
            zIndex: 1,
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
              {hm.heroBadge}
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
            {hm.heroHeadline}{" "}
            <span style={{ fontStyle: "italic" }}>{hm.heroHeadlineItalic}</span>
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
            {hm.heroSubtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact">
              <span className="gb-btn" style={{ fontSize: 15, padding: "14px 28px" }} data-testid="button-book-demo">
                {hm.heroCTAPrimary}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/work">
              <span className="gb-btn-outline" style={{ fontSize: 15, padding: "13px 28px" }}>
                {hm.heroCTASecondary}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. SOCIAL PROOF STRIP ══ */}
      <section style={{ borderTop: "1px solid rgba(11,11,11,0.08)", borderBottom: "1px solid rgba(11,11,11,0.08)", padding: "40px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, textAlign: "center" }}>
            {hm.stats.map((stat, i) => (
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
              {hm.problemLabel}
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "18ch", marginBottom: 60 }}>
              {hm.problemHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, background: "rgba(11,11,11,0.07)", borderRadius: 20, overflow: "hidden" }}>
            {hm.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{ background: BG, padding: "40px 36px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 3L13 13M13 3L3 13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)" }}>
                    Problem {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "clamp(17px, 2vw, 20px)", letterSpacing: "-0.025em", color: TEXT, marginBottom: 14, lineHeight: "1.3" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", margin: 0 }}>{p.desc}</p>
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
              {hm.solutionLabel}
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", maxWidth: "22ch", marginBottom: 60 }}>
              {hm.solutionHeadline}
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 2, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { label: hm.solutionBeforeLabel, items: hm.solutionBefore, before: true },
              { label: hm.solutionAfterLabel, items: hm.solutionAfter, before: false },
            ].map((col, i) => (
              <div
                key={i}
                style={{ background: col.before ? "rgba(255,255,255,0.03)" : "#fff", padding: "36px 32px" }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: col.before ? "rgba(255,255,255,0.3)" : TEXT, marginBottom: 24, opacity: 0.6 }}>
                  {col.label}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {col.before ? (
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 800 }}>✕</span>
                        </span>
                      ) : (
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(11,11,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check className="w-3 h-3" style={{ color: TEXT }} />
                        </span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 500, color: col.before ? "rgba(255,255,255,0.55)" : TEXT }}>{item}</span>
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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{hm.servicesLabel}</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "18ch", marginBottom: 60 }}>
              {hm.servicesHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {hm.services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 16, padding: "28px", transition: "border-color 0.2s", cursor: "pointer" }}
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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>{hm.frameworkLabel}</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", maxWidth: "22ch", marginBottom: 64 }}>
              {hm.frameworkHeadline}
            </h2>
          </FadeUp>
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
              {hm.frameworkSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  style={{
                    background: i === hm.frameworkSteps.length - 1 ? "#fff" : "rgba(255,255,255,0.04)",
                    padding: "32px 28px",
                    borderRadius: i === 0 ? "14px 0 0 14px" : i === hm.frameworkSteps.length - 1 ? "0 14px 14px 0" : "0",
                    position: "relative",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: i === hm.frameworkSteps.length - 1 ? "rgba(11,11,11,0.08)" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: i === hm.frameworkSteps.length - 1 ? "#0B0B0B" : "rgba(255,255,255,0.7)" }}>{step.step}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: i === hm.frameworkSteps.length - 1 ? "#0B0B0B" : "#fff", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: i === hm.frameworkSteps.length - 1 ? "rgba(11,11,11,0.55)" : "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/framework">
              <span className="gb-btn" style={{ fontSize: 14 }}>
                {hm.frameworkCTA}
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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{hm.proofLabel}</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "16ch", marginBottom: 60 }}>
              {hm.proofHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {hm.proof.map((p, i) => (
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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{hm.processLabel}</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "20ch", marginBottom: 60 }}>
              {hm.processHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {hm.processSteps.map((step, i) => (
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
                  <div style={{ height: 1, flex: 1, background: i < hm.processSteps.length - 1 ? "rgba(11,11,11,0.1)" : "transparent" }} />
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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{hm.ecosystemLabel}</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(30px, 5vw, 54px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: TEXT, maxWidth: "22ch", marginBottom: 60 }}>
              {hm.ecosystemHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {[
              { tag: hm.ecosystemCreatorTag, title: hm.ecosystemCreatorTitle, desc: hm.ecosystemCreatorDesc, cta: hm.ecosystemCreatorCTA, href: "/creators", dark: false },
              { tag: hm.ecosystemFreelancerTag, title: hm.ecosystemFreelancerTitle, desc: hm.ecosystemFreelancerDesc, cta: hm.ecosystemFreelancerCTA, href: "/freelancers", dark: true },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: card.dark ? "#0B0B0B" : "#fff", border: card.dark ? "none" : "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 36px" }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: card.dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 20 }}>{card.tag}</p>
                <h3 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.03em", lineHeight: "1.15", color: card.dark ? "#fff" : TEXT, marginBottom: 16 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: card.dark ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 32 }}>{card.desc}</p>
                <Link href={card.href}>
                  <span
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 100, background: card.dark ? "#fff" : "#0B0B0B", color: card.dark ? "#0B0B0B" : "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "opacity 0.18s" }}
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
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>{hm.auditLabel}</p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.035em", lineHeight: "1.08", color: "#fff", marginBottom: 20 }}>
                {hm.auditHeadline}
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 32 }}>
                {hm.auditSubtext}
              </p>
              <Link href="/authority-audit">
                <span className="gb-btn" style={{ fontSize: 14 }}>
                  {hm.auditCTA}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px" }}
            >
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Posting Consistency</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>72</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ width: "72%", height: "100%", background: "rgba(255,255,255,0.75)", borderRadius: 100 }} />
                </div>
              </div>
              {[
                { label: "Content Direction", val: 58 },
                { label: "Audience Reach", val: 41 },
                { label: "Customer Conversion", val: 85 },
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
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Growth Blockers Found</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em" }}>3 / 4</span>
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
              style={{ aspectRatio: "1", borderRadius: 24, overflow: "hidden", background: "linear-gradient(135deg, #1a1a1a 0%, #0B0B0B 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, fontWeight: 800, color: "rgba(255,255,255,0.15)", letterSpacing: "-0.04em" }}
            >
              {hm.founderPhoto ? (
                <img src={hm.founderPhoto} alt={hm.founderName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                hm.founderInitials
              )}
            </motion.div>

            <FadeUp>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{hm.founderLabel}</p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 48px)", letterSpacing: "-0.035em", lineHeight: "1.1", color: TEXT, marginBottom: 20 }}>
                {hm.founderName}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 28 }}>
                {hm.founderQuote}
              </p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {hm.founderTags.map((tag) => (
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
              {hm.testimonialsHeadline}
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {hm.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ background: BG, border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 16, padding: "28px" }}
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
              {hm.ctaHeadline}
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 40, maxWidth: "46ch", margin: "0 auto 40px" }}>
              {hm.ctaSubtext}
            </p>

            {ctaSubmitted ? (
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "20px 28px", marginBottom: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{hm.ctaSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleCtaSubmit} style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }} data-testid="home-cta-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  style={{ height: 52, padding: "0 20px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", width: "min(100%, 300px)" }}
                />
                <button
                  type="submit"
                  disabled={ctaSubmitting}
                  className="gb-btn"
                  style={{ fontSize: 15, padding: "14px 28px", height: 52 }}
                  data-testid="home-cta-submit"
                >
                  {ctaSubmitting ? "Submitting…" : hm.ctaButton}
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
                  {hm.ctaSecondaryLink}
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
