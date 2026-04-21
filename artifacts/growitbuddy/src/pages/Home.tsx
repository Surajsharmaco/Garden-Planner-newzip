import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { FadeUp } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";

/* ══════════════════════════════════════════════════════════════════
   omc.com EXACT STRUCTURE — GrowitBuddy content
   
   1. Hero          — white, full-screen, centered, circle mark + large H1 + capability links
   2. Dark panel    — full-bleed, "Content & Authority Studio" label + big heading + arrow link
   3. System        — dark image + "GrowitBuddy System" label + heading + 6 feature cards
   4. Results       — white, "A record of sustained growth", stats + link
   5. News          — "What's new" 3-card grid
   ══════════════════════════════════════════════════════════════════ */

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

const SYSTEM_CARDS = [
  { icon: "◎", title: "Authority Architecture", desc: "One unified positioning system." },
  { icon: "✦", title: "Content at Scale", desc: "Production at an unmatched pace." },
  { icon: "◈", title: "Predictive Distribution", desc: "Anticipates what resonates next." },
  { icon: "⬡", title: "Unified Brand Backbone", desc: "A single source of narrative truth." },
  { icon: "◐", title: "Outcome-Driven Activation", desc: "Strategy connected to revenue." },
  { icon: "◑", title: "Audience Intelligence", desc: "Global reach. Category precision." },
];

const NEWS = [
  { tag: "Framework", date: "April 18, 2026", title: "The 4-step Authority Flywheel every founder needs to build this year." },
  { tag: "Creator Economy", date: "April 10, 2026", title: "How to turn a newsletter into a $500K/yr business without ads." },
  { tag: "Distribution", date: "April 3, 2026", title: "LinkedIn's algorithm in 2026: what actually drives reach for founders." },
];

function CircleArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href}>
      <span
        className="inline-flex items-center gap-2 text-[14px] font-medium cursor-pointer hover:opacity-60 transition-opacity group"
        style={{ color: dark ? "#fff" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {children}
        <span
          className="inline-flex items-center justify-center rounded-full group-hover:scale-110 transition-transform"
          style={{
            width: 28, height: 28,
            border: `1.5px solid ${dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.22)"}`,
          }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full" style={{ background: "#fff" }}>

      {/* ════════════════════════════════════════════════════════
          1. HERO — omc.com: full-screen white, centered, large serif
          Structure: [circle mark] → [H1 italic] → [sub] → [body] → [capability links]
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          paddingTop: 70, /* navbar height */
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            width: "100%",
            margin: "0 auto",
            padding: "60px 24px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Brand mark — the large circle with "G", like omc's circular Omnicom logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            style={{
              width: 100, height: 100,
              borderRadius: "50%",
              border: "1.5px solid rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 48,
                fontWeight: 500,
                color: "#000",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              G
            </span>
          </motion.div>

          {/* H1 — omc: "The world's leading marketing and sales company" */}
          <div style={{ overflow: "hidden", width: "100%" }}>
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(52px, 7.5vw, 96px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.04",
                color: "#000",
                margin: 0,
              }}
            >
              The world's leading{" "}
              <em>content</em>{" "}and{" "}
              <em>authority</em>{" "}studio.
            </motion.h1>
          </div>

          {/* Sub — omc: "Built for intelligent growth in the next era." */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "rgba(0,0,0,0.5)",
              marginTop: 28,
              letterSpacing: "-0.01em",
            }}
          >
            Built for intelligent growth in the next era.
          </motion.p>

          {/* Body — omc: 2-line centered description */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65 }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 16,
              color: "rgba(0,0,0,0.4)",
              marginTop: 14,
              maxWidth: "54ch",
              lineHeight: "1.8",
            }}
          >
            We help ambitious founders and creators solve their most critical growth
            challenges by giving them access to proven authority systems,
            breakthrough content, and the most effective distribution in the business.
          </motion.p>
        </div>

        {/* Capability links — omc: inline links below body, separated by thin lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: 60,
            width: "100%",
            maxWidth: 1200,
            padding: "0 24px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <Link key={cap} href="/services">
              <span
                className="inline-flex items-center hover:text-black transition-colors"
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.4)",
                  padding: "16px 20px",
                  borderRight: i < CAPABILITIES.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {cap}
              </span>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. FULL-BLEED DARK PANEL — omc: large dark image with "Connected Capabilities" label + heading + arrow link
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          width: "100%",
          height: "55vw",
          maxHeight: 700,
          minHeight: 380,
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Subtle grid overlay — mimics omc.com's textured dark image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 64px)",
          }}
        />
        {/* Radial gradient center glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,114,245,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left content — omc pattern */}
        <div
          className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-16 pb-14 md:pb-20"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <FadeUp>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Content &amp; Authority Studio
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.05",
                color: "#fff",
                maxWidth: "14ch",
                margin: 0,
              }}
            >
              A competitive edge across <em>every</em> dimension.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="pb-1">
            <CircleArrowLink href="/services" dark>
              Connected Capabilities
            </CircleArrowLink>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. GROWITBUDDY SYSTEM — omc: "Omni" section with dark image + feature cards
          Structure: dark full-bleed top half, white cards below, overlapping
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: "#fff" }}>
        {/* Dark top portion */}
        <div
          style={{
            background: "#111",
            padding: "80px 24px 100px",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                maxWidth: 700,
              }}
            >
              <FadeUp>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 4,
                  }}
                >
                  GrowitBuddy System
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(32px, 4.5vw, 58px)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.07",
                    color: "#fff",
                  }}
                >
                  GrowitBuddy's content <em>intelligence</em>{" "}
                  and authority platform
                </h2>
              </FadeUp>
              <FadeUp delay={0.05} style={{ display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 16,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: "1.8",
                    maxWidth: "50ch",
                  }}
                >
                  Our proprietary system unites positioning, content, distribution, and AI to help founders grow with clarity, speed, and measurable authority impact.
                </p>
                <CircleArrowLink href="/framework" dark>Learn More</CircleArrowLink>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Feature cards — overlap into white */}
        <div style={{ background: "#fff", padding: "0 24px 80px" }}>
          <div className="max-w-[1200px] mx-auto" style={{ marginTop: -40 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 1,
                background: "rgba(0,0,0,0.08)",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              {SYSTEM_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  data-cursor-hover
                  style={{
                    background: "#fff",
                    padding: "36px 32px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  whileHover={{ backgroundColor: "#F8F8F8" }}
                >
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: 5,
                      background: "#F2F2F2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      marginBottom: 20,
                      color: "#333",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#000",
                      marginBottom: 8,
                      lineHeight: "1.3",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: 14,
                      color: "rgba(0,0,0,0.45)",
                      lineHeight: "1.65",
                    }}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. RESULTS — omc: "A record of sustained growth" / Investors section
          Clean, single-column metrics + link button on right
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          padding: "80px 24px",
          background: "#F7F7F7",
        }}
      >
        <div
          className="max-w-[1200px] mx-auto"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}
        >
          <FadeUp style={{ flex: "1 1 340px" }}>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.3)",
                marginBottom: 16,
              }}
            >
              Results
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.06",
                color: "#000",
                marginBottom: 24,
              }}
            >
              A record of <em>sustained growth</em>.
            </h2>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 16,
                color: "rgba(0,0,0,0.45)",
                lineHeight: "1.75",
                maxWidth: "44ch",
                marginBottom: 32,
              }}
            >
              GrowitBuddy sets the standard for content and authority leadership by consistently building stronger personal brands and delivering superior outcomes.
            </p>
            <CircleArrowLink href="/work">See all case studies</CircleArrowLink>
          </FadeUp>

          {/* Stats grid */}
          <div
            style={{
              flex: "1 1 320px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(0,0,0,0.07)",
              borderRadius: 5,
              overflow: "hidden",
              alignSelf: "flex-start",
            }}
          >
            {[
              { v: "200+", l: "Clients Served" },
              { v: "10K+", l: "Content Pieces" },
              { v: "$50M+", l: "Pipeline Generated" },
              { v: "4.2×", l: "Authority Growth" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ background: "#fff", padding: "32px 24px" }}
              >
                <CountUp
                  value={s.v}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "#000",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 12,
                    color: "rgba(0,0,0,0.4)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. NEWS — omc: "What's new across Omnicom" 3-card grid
      ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              paddingBottom: 24,
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#000",
              }}
            >
              What's new across GrowitBuddy
            </h2>
            <CircleArrowLink href="/insights">View All</CircleArrowLink>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
            {NEWS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="group cursor-pointer"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(0,0,0,0.35)",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  {a.date}
                </p>
                <h3
                  className="group-hover:opacity-60 transition-opacity"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#000",
                    lineHeight: "1.5",
                  }}
                >
                  {a.title}
                </h3>
                <div style={{ marginTop: 16 }}>
                  <CircleArrowLink href="/insights">Read more</CircleArrowLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. STAY CONNECTED — omc: footer section with contact + socials
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 24px",
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "#000",
                marginBottom: 48,
              }}
            >
              Stay connected.
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 48 }}>
            <FadeUp>
              <h4
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.35)",
                  marginBottom: 20,
                }}
              >
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.4)", marginBottom: 4 }}>
                    Strategy Inquiries
                  </p>
                  <a
                    href="mailto:hello@growitbuddy.com"
                    style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: "#000", textDecoration: "none" }}
                    className="hover:opacity-50 transition-opacity"
                  >
                    hello@growitbuddy.com
                  </a>
                </div>
                <div>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.4)", marginBottom: 4 }}>
                    Partnerships
                  </p>
                  <a
                    href="mailto:partners@growitbuddy.com"
                    style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: "#000", textDecoration: "none" }}
                    className="hover:opacity-50 transition-opacity"
                  >
                    partners@growitbuddy.com
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h4
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.35)",
                  marginBottom: 20,
                }}
              >
                Follow Us
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["LinkedIn", "Twitter / X", "Instagram", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: 15,
                      color: "#000",
                      textDecoration: "none",
                    }}
                    className="hover:opacity-50 transition-opacity"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </div>
  );
}
