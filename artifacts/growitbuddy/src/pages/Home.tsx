import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

/* ──────────────────────────────────────────────────────────────
   omc.com (Omnicom) design language:
   · Cormorant Garamond for headings — large, elegant, italic for emphasis
   · Instrument Sans for body — clean, modern
   · White background, black text, #0072F5 blue accent
   · Section labels: small caps above headings
   · Capability pills: horizontal scrolling link row
   · Cards: 5px radius, subtle borders
   · Arrow circle icon on CTAs
────────────────────────────────────────────────────────────── */

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>
      {children}
    </p>
  );
}

function OmcHeading({ children, className = "", size = "xl" }: { children: React.ReactNode; className?: string; size?: "lg" | "xl" | "2xl" }) {
  const fs = size === "2xl" ? "clamp(52px, 7vw, 96px)" : size === "xl" ? "clamp(36px, 5vw, 64px)" : "clamp(28px, 3.5vw, 48px)";
  return (
    <h2
      className={`omc-heading leading-[1.05] ${className}`}
      style={{ fontSize: fs, letterSpacing: "-0.02em", color: "#000" }}
    >
      {children}
    </h2>
  );
}

function ArrowBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href}>
      <span
        className="inline-flex items-center gap-2.5 text-[14px] font-medium cursor-pointer hover:opacity-75 transition-opacity group"
        style={{ fontFamily: "'Instrument Sans', sans-serif", color: dark ? "#fff" : "#000" }}
      >
        {children}
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
          style={{ border: `1.5px solid ${dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}` }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* ══════════════════════════════════════════
          HERO — white, large serif headline
      ══════════════════════════════════════════ */}
      <section className="pt-[60px] min-h-screen flex flex-col justify-between">
        {/* Top content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-20 pb-12">
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="omc-heading leading-[1.04]"
                style={{ fontSize: "clamp(52px, 7vw, 96px)", letterSpacing: "-0.02em", color: "#000" }}
              >
                The world's leading{" "}
                <em>content</em> and{" "}
                <em>authority</em>{" "}
                studio for founders &amp; creators.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="mt-7 text-[17px] leading-[1.7] max-w-[52ch]"
                style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                We help ambitious founders and creators solve their most critical growth challenge: turning deep expertise into unignorable authority.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link href="/contact">
                  <button className="omc-btn" data-testid="button-book-call-hero">
                    Book a strategy call
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </button>
                </Link>
                <ArrowBtn href="/work">Explore our work</ArrowBtn>
              </motion.div>
            </div>
            {/* Stats col */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col gap-6 lg:items-end lg:pb-3"
            >
              {[["200+", "Clients served"], ["10K+", "Content pieces"], ["4.2×", "Authority growth"]].map(([v, l]) => (
                <div key={l} className="lg:text-right">
                  <p className="text-[32px] font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}>{v}</p>
                  <p className="text-[12px] mt-1" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Capabilities row — omc.com signature horizontal list */}
        <div className="border-t border-black/8 overflow-x-auto">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center gap-0">
            {CAPABILITIES.map((cap, i) => (
              <Link key={cap} href="/services">
                <span
                  className="whitespace-nowrap text-[13px] font-medium px-4 py-2 cursor-pointer hover:text-[#0072F5] transition-colors border-r border-black/8 first:pl-0"
                  style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {cap}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATEMENT — full bleed dark section
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
        style={{ background: "#000" }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>The Problem</span>
            </SectionLabel>
            <h2 className="omc-heading leading-[1.06]" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#fff" }}>
              Most content is built for <em>views</em>.{" "}
              We build for <em>authority</em>.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            <p className="text-[17px] leading-[1.8] mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              Views don't close deals — trust does. We build systems that compound over time, making you the undeniable choice before any conversation begins.
            </p>
            <ArrowBtn href="/framework" dark>See our framework</ArrowBtn>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDIES — white with card grid
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel>Results</SectionLabel>
              <OmcHeading size="lg">Proof of work.</OmcHeading>
            </div>
            <ArrowBtn href="/work">All case studies</ArrowBtn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="group p-10 cursor-pointer hover:shadow-md transition-all duration-200 aspect-[4/3] flex flex-col justify-between"
                style={{
                  background: c.dark ? "#0A0A0A" : "#F6F6F6",
                  borderRadius: "5px",
                  border: c.dark ? "none" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-start justify-between">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    {c.category}
                  </p>
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    style={{ border: `1.5px solid ${c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`, color: c.dark ? "#fff" : "#000" }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="mb-3">
                    <span
                      className="omc-heading leading-none"
                      style={{ fontSize: "clamp(40px, 5vw, 64px)", color: c.dark ? "#fff" : "#000" }}
                    >
                      {c.metric}
                    </span>
                    <span className="text-[14px] ml-2" style={{ color: c.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>
                      {c.unit}
                    </span>
                  </div>
                  <h3
                    className="text-[17px] font-medium leading-[1.4]"
                    style={{ color: c.dark ? "rgba(255,255,255,0.75)" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    {c.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel>Services</SectionLabel>
              <OmcHeading size="lg">Connected capabilities.</OmcHeading>
            </div>
            <ArrowBtn href="/services">All services</ArrowBtn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/8" style={{ borderRadius: "5px", overflow: "hidden" }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="bg-white p-8 group cursor-pointer hover:bg-[#F6F6F6] transition-colors duration-200"
              >
                <p className="text-[11px] font-bold tracking-widest mb-6" style={{ color: "rgba(0,0,0,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>{s.n}</p>
                <h3 className="text-[18px] font-semibold mb-3 leading-[1.3]" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{s.t}</h3>
                <p className="text-[14px] leading-[1.75] mb-6" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>{s.d}</p>
                <ArrowBtn href="/services">Learn more</ArrowBtn>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOUNDER
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[5px] flex items-center justify-center"
            style={{ background: "#F0F0F0" }}
          >
            <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>Founder photo</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionLabel>About</SectionLabel>
            <OmcHeading size="lg" className="mb-6">
              Built by founders, <em>for founders</em>.
            </OmcHeading>
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
            <ArrowBtn href="/about">About us</ArrowBtn>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — dark with blue accent
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 text-center" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[700px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>Get started</span>
            </SectionLabel>
            <h2 className="omc-heading leading-[1.05] text-white mb-7" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
              Ready to build your <em>authority system</em>?
            </h2>
            <p className="text-[17px] leading-[1.75] mb-10 mx-auto max-w-[44ch]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Instrument Sans', sans-serif" }}>
              One strategy call. We'll map exactly how to turn your expertise into authority that generates inbound demand.
            </p>
            <Link href="/contact">
              <button className="omc-btn text-[15px] px-8 py-4" data-testid="button-book-call-cta">
                Book a free strategy call
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
