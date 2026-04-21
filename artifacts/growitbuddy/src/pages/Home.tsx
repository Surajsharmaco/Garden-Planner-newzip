import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useRef } from "react";
import { FadeUp, LineReveal } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";
import Marquee from "@/components/effects/Marquee";

/* ─── omc.com structure (GrowitBuddy version) ────────────────────────
  Hero:
    • Full-screen white
    • [Circle brand mark] + [Centered headline with italic emphasis]
    • Tagline, body text — all centered
    • Capability links in wrapping pill-row (inside hero, not separate band)
  Sections: dark statement, case grid, services 4-col, founder, CTA
────────────────────────────────────────────────────────────────── */

const CAPABILITIES = [
  "Authority Strategy",
  "Content Production",
  "Video Editing",
  "Distribution",
  "Personal Branding",
  "Ghostwriting",
  "PR & Media",
  "Community Growth",
];

const CASES = [
  { name: "Tech Founder to Industry Voice", category: "B2B SaaS", metric: "14M", unit: "impressions", dark: true },
  { name: "Agency Owner Authority Engine", category: "Services", metric: "$2.4M", unit: "new pipeline", dark: false },
  { name: "Creator Monetization System", category: "Creator Economy", metric: "250K", unit: "followers", dark: false },
  { name: "Executive Brand & PR", category: "Leadership", metric: "15+", unit: "speaking invites / qtr", dark: true },
];

const SERVICES = [
  { n: "01", t: "Authority Strategy", d: "Category positioning, narrative design, and a bespoke 90-day influence roadmap." },
  { n: "02", t: "Content Production", d: "Scalable ghostwriting and content systems for sustained authority at every stage." },
  { n: "03", t: "Distribution Strategy", d: "Platform-native, algorithm-aware strategies that reach decision-makers at scale." },
  { n: "04", t: "Personal Brand Growth", d: "Profile, network, monetisation and PR — a complete authority ownership system." },
];

function ArrowBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href}>
      <span
        className="inline-flex items-center gap-2.5 text-[14px] font-medium cursor-pointer hover:opacity-70 transition-opacity group"
        style={{ color: dark ? "#fff" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {children}
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
          style={{ border: `1.5px solid ${dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)"}` }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </span>
    </Link>
  );
}

function ParallaxLayer({ children, speed = 0.2 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -60}px`, `${speed * 60}px`]);
  return <motion.div ref={ref} style={{ y, position: "relative" }}>{children}</motion.div>;
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO — omc.com exact layout
          • pt-[60px] to clear fixed navbar
          • min-h-screen centered column
          • Circle brand mark INLINE at start of h1 (like omc logo)
          • All text centered
          • Capability links wrapping row inside hero
      ══════════════════════════════════════════════════════ */}
      <section
        className="pt-[60px] min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "#fff" }}
      >
        <div className="max-w-[900px] w-full mx-auto text-center flex flex-col items-center gap-0">

          {/* Brand mark — the circle "G" that omc uses their circular logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-8"
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "1.5px solid rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "36px",
                  fontWeight: 500,
                  color: "#000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                G
              </span>
            </div>
          </motion.div>

          {/* H1 — centered, large serif, italic emphasis on key words */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="omc-heading"
              style={{
                fontSize: "clamp(44px, 6.5vw, 88px)",
                letterSpacing: "-0.025em",
                color: "#000",
                lineHeight: "1.04",
                textAlign: "center",
              }}
            >
              The world's leading{" "}
              <em>content</em>
              {" "}and{" "}
              <em>authority</em>
              {" "}studio for founders &amp; creators.
            </motion.h1>
          </div>

          {/* Sub-headline — omc: "Built for intelligent growth in the next era." */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(0,0,0,0.55)",
              marginTop: "28px",
              letterSpacing: "-0.01em",
            }}
          >
            Built for intelligent growth in the next era.
          </motion.p>

          {/* Body paragraph — omc: 2-line centered description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.65 }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "16px",
              color: "rgba(0,0,0,0.45)",
              marginTop: "14px",
              maxWidth: "56ch",
              lineHeight: "1.75",
              textAlign: "center",
            }}
          >
            We help ambitious founders and creators solve their most critical growth
            challenges — turning deep expertise into unignorable authority.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex items-center gap-5 mt-9"
          >
            <Link href="/contact">
              <button className="omc-btn" data-testid="button-book-call-hero">
                Book a strategy call
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </Link>
            <ArrowBtn href="/work">See our work</ArrowBtn>
          </motion.div>

          {/* Capability links — omc.com wrapping pill-row INSIDE the hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-14 flex flex-wrap justify-center gap-x-0 gap-y-0"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "24px", width: "100%" }}
          >
            {CAPABILITIES.map((cap, i) => (
              <Link key={cap} href="/services">
                <span
                  className="text-[13px] font-medium px-4 py-2.5 hover:text-[#0072F5] transition-colors"
                  style={{
                    color: "rgba(0,0,0,0.45)",
                    fontFamily: "'Instrument Sans', sans-serif",
                    borderRight: i < CAPABILITIES.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cap}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-BLEED IMAGE / VISUAL — omc has a rectangle image here
          We use a dark full-bleed statement instead
      ══════════════════════════════════════════ */}
      <section
        style={{
          height: "55vw",
          maxHeight: "700px",
          minHeight: "360px",
          background: "#0A0A0A",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px 5vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid pattern like omc */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="max-w-[1200px] mx-auto w-full relative z-10">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>
              Content &amp; Authority Studio
            </p>
            <h2
              className="omc-heading text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.025em", maxWidth: "16ch", lineHeight: "1.05" }}
            >
              A competitive edge across <em>every</em> dimension.
            </h2>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONNECTED CAPABILITIES — white, 2-col
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Connected Capabilities</p>
            <div className="flex items-end justify-between">
              <h2 className="omc-heading" style={{ fontSize: "clamp(32px, 4.5vw, 58px)", letterSpacing: "-0.025em", color: "#000", maxWidth: "16ch", lineHeight: "1.06" }}>
                A competitive edge across every dimension.
              </h2>
              <ArrowBtn href="/services">All capabilities</ArrowBtn>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/8" style={{ borderRadius: "5px", overflow: "hidden" }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="bg-white p-8 group cursor-pointer hover:bg-[#F8F8F8] transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-8">
                  <p className="text-[11px] font-bold tracking-widest" style={{ color: "rgba(0,0,0,0.2)", fontFamily: "'Instrument Sans', sans-serif" }}>{s.n}</p>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: "1.5px solid rgba(0,0,0,0.2)" }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold mb-3 leading-[1.3]" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{s.t}</h3>
                <p className="text-[14px] leading-[1.75]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESULTS / CASE STUDIES
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Results</p>
              <h2 className="omc-heading" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-0.025em", color: "#000", lineHeight: "1.06" }}>
                A record of <em>sustained growth</em>.
              </h2>
            </div>
            <ArrowBtn href="/work">All case studies</ArrowBtn>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="group p-10 aspect-[4/3] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow duration-300"
                style={{
                  background: c.dark ? "#0A0A0A" : "#fff",
                  borderRadius: "5px",
                  border: c.dark ? "none" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.category}</p>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all" style={{ border: `1.5px solid ${c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`, color: c.dark ? "#fff" : "#000" }}>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="mb-3 flex items-baseline gap-2">
                    <CountUp value={c.metric} className="omc-heading leading-none" style={{ fontSize: "clamp(40px, 5vw, 64px)", color: c.dark ? "#fff" : "#000", display: "inline-block" }} />
                    <span className="text-[14px]" style={{ color: c.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.unit}</span>
                  </div>
                  <h3 className="text-[17px] font-medium leading-[1.4]" style={{ color: c.dark ? "rgba(255,255,255,0.75)" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{c.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK MARQUEE SEPARATOR
      ══════════════════════════════════════════ */}
      <Marquee
        items={["200+ Clients", "10,000+ Content Pieces", "$50M+ Pipeline Generated", "4.2× Avg Authority Growth", "Trusted by Founders Globally"]}
        dark
        speed={38}
        reverse
      />

      {/* ══════════════════════════════════════════
          FOUNDER SECTION
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white overflow-hidden" style={{ position: "relative", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="aspect-square rounded-[5px] overflow-hidden" style={{ background: "#F0F0F0", position: "relative" }}>
            <ParallaxLayer speed={0.15}>
              <div style={{ width: "100%", height: "110%", marginTop: "-5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>Founder photo</span>
              </div>
            </ParallaxLayer>
          </div>
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>About</p>
            <h2 className="omc-heading leading-[1.06] mb-6" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#000" }}>
              Built by founders, <em>for founders</em>.
            </h2>
            <p className="text-[17px] leading-[1.8] mb-8" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              GrowitBuddy was built after watching brilliant founders get drowned out by louder, less qualified voices. We engineer authority systems — not hacks, not engagement bait.
            </p>
            <div className="flex items-center gap-4 p-5 mb-8" style={{ background: "#F6F6F6", borderRadius: "5px" }}>
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg shrink-0">S</div>
              <div>
                <p className="font-semibold text-[15px]" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>Suraj Sharma</p>
                <p className="text-[13px] mt-0.5" style={{ color: "rgba(0,0,0,0.45)", fontFamily: "'Instrument Sans', sans-serif" }}>Founder & CEO</p>
              </div>
            </div>
            <ArrowBtn href="/about">About GrowitBuddy</ArrowBtn>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWS / INSIGHTS — omc.com has latest news
          We use latest insights / social proof
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>What's new</p>
              <h2 className="omc-heading" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.02em", color: "#000" }}>Latest from GrowitBuddy.</h2>
            </div>
            <ArrowBtn href="/insights">View all</ArrowBtn>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "Framework", title: "The 4-step Authority Flywheel every founder needs to build", date: "April 18, 2026" },
              { tag: "Creator Economy", title: "How to turn a newsletter into a $500K/yr business", date: "April 10, 2026" },
              { tag: "Distribution", title: "LinkedIn's algorithm in 2026: what actually drives reach", date: "April 3, 2026" },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="group cursor-pointer"
              >
                <div className="aspect-[16/9] rounded-[5px] mb-5" style={{ background: "#F0F0F0", border: "1px solid rgba(0,0,0,0.07)" }} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{a.tag}</p>
                <h3 className="text-[17px] font-medium leading-[1.4] mb-2 group-hover:opacity-60 transition-opacity" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{a.title}</h3>
                <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{a.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER CTA — "Stay connected" omc.com style
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>Get started</p>
            <LineReveal
              lines={["Ready to build your", "authority system?"]}
              className="omc-heading text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.025em", lineHeight: "1.05" }}
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>Contact</p>
            <div className="flex flex-col gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px" }}>
              <div>
                <p className="text-[13px] mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Strategy Inquiries</p>
                <a href="mailto:hello@growitbuddy.com" className="text-[16px] hover:opacity-60 transition-opacity" style={{ color: "#0072F5", fontFamily: "'Instrument Sans', sans-serif" }}>hello@growitbuddy.com</a>
              </div>
              <div>
                <p className="text-[13px] mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Partnerships</p>
                <a href="mailto:partners@growitbuddy.com" className="text-[16px] hover:opacity-60 transition-opacity" style={{ color: "#0072F5", fontFamily: "'Instrument Sans', sans-serif" }}>partners@growitbuddy.com</a>
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <button className="omc-btn text-[15px] px-8 py-4" data-testid="button-book-call-cta" data-cursor-hover>
                    Book a free strategy call
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
