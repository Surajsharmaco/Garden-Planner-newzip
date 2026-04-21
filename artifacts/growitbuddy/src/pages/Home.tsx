import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useRef } from "react";
import { WordReveal, FadeUp, LineReveal } from "@/components/effects/TextReveal";
import CountUp from "@/components/effects/CountUp";
import Marquee, { ScrollMarquee } from "@/components/effects/Marquee";

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

/* ── Parallax image/shape helper ────────────────── */
function ParallaxLayer({ children, speed = 0.2 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -60}px`, `${speed * 60}px`]);
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* ══════════════════════════════════════════
          HERO — white, large word-reveal headline
      ══════════════════════════════════════════ */}
      <section className="pt-[60px] min-h-screen flex flex-col justify-between">
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-20 pb-12">
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              {/* Word-by-word reveal — omc.com signature */}
              <div className="omc-heading leading-[1.04]" style={{ fontSize: "clamp(52px, 7vw, 96px)", letterSpacing: "-0.02em", color: "#000" }}>
                <WordReveal
                  as="h1"
                  className="omc-heading"
                  style={{ fontSize: "clamp(52px, 7vw, 96px)", letterSpacing: "-0.02em", color: "#000", display: "flex", flexWrap: "wrap", gap: "0 0.28em", lineHeight: "1.04" }}
                >
                  The world's leading content and authority studio for founders & creators.
                </WordReveal>
              </div>

              <FadeUp delay={0.2} className="mt-7 text-[17px] leading-[1.7] max-w-[52ch]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
                We help ambitious founders and creators solve their most critical growth challenge: turning deep expertise into unignorable authority.
              </FadeUp>

              <FadeUp delay={0.32} className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="omc-btn" data-testid="button-book-call-hero">
                    Book a strategy call
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </button>
                </Link>
                <ArrowBtn href="/work">Explore our work</ArrowBtn>
              </FadeUp>
            </div>

            {/* Stats col — CountUp */}
            <FadeUp delay={0.4} className="flex flex-col gap-6 lg:items-end lg:pb-3">
              {([["200+", "Clients served"], ["10K+", "Content pieces"], ["4.2×", "Authority growth"]] as [string, string][]).map(([v, l]) => (
                <div key={l} className="lg:text-right">
                  <CountUp
                    value={v}
                    className="text-[32px] font-semibold leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em", display: "block" }}
                  />
                  <p className="text-[12px] mt-1" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>{l}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>

        {/* Marquee capabilities row — infinite scroll on hover-pause */}
        <Marquee items={CAPABILITIES} speed={35} />
      </section>

      {/* ══════════════════════════════════════════
          SCROLL MARQUEE — large editorial type
      ══════════════════════════════════════════ */}
      <ScrollMarquee
        items={["Authority", "Strategy", "Content", "Growth", "Distribution", "Personal Brand"]}
      />

      {/* ══════════════════════════════════════════
          STATEMENT — dark section
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#000" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>The Problem</p>
            <LineReveal
              lines={["Most content is built for views.", "We build for authority."]}
              className="omc-heading text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "1.06", letterSpacing: "-0.02em" }}
            />
          </div>
          <FadeUp delay={0.1}>
            <p className="text-[17px] leading-[1.8] mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              Views don't close deals — trust does. We build systems that compound over time, making you the undeniable choice before any conversation begins.
            </p>
            <ArrowBtn href="/framework" dark>See our framework</ArrowBtn>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDIES — card grid with CountUp metrics
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <FadeUp>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Results</p>
              <h2 className="omc-heading" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.02em", color: "#000" }}>Proof of work.</h2>
            </FadeUp>
            <ArrowBtn href="/work">All case studies</ArrowBtn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="group p-10 cursor-pointer hover:shadow-md transition-shadow duration-300 aspect-[4/3] flex flex-col justify-between"
                style={{
                  background: c.dark ? "#0A0A0A" : "#F6F6F6",
                  borderRadius: "5px",
                  border: c.dark ? "none" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.category}</p>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ border: `1.5px solid ${c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`, color: c.dark ? "#fff" : "#000" }}>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="mb-3 flex items-baseline gap-2">
                    <CountUp
                      value={c.metric}
                      className="omc-heading leading-none"
                      style={{ fontSize: "clamp(40px, 5vw, 64px)", color: c.dark ? "#fff" : "#000", display: "inline-block" }}
                    />
                    <span className="text-[14px]" style={{ color: c.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.unit}</span>
                  </div>
                  <h3 className="text-[17px] font-medium leading-[1.4]" style={{ color: c.dark ? "rgba(255,255,255,0.75)" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{c.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark marquee between sections */}
      <Marquee
        items={["200+ Clients", "10,000+ Content Pieces", "$50M+ Pipeline Generated", "4.2× Average Authority Growth", "Trusted by Founders Globally"]}
        dark
        speed={40}
        reverse
      />

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <FadeUp>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Services</p>
              <h2 className="omc-heading" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.02em", color: "#000" }}>Connected capabilities.</h2>
            </FadeUp>
            <ArrowBtn href="/services">All services</ArrowBtn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/8" style={{ borderRadius: "5px", overflow: "hidden" }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="bg-white p-8 group cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200"
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
          FOUNDER — with parallax image
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white overflow-hidden" style={{ position: "relative" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="aspect-square rounded-[5px] overflow-hidden" style={{ background: "#F0F0F0", position: "relative" }}>
            <ParallaxLayer speed={0.15}>
              <div className="w-full h-full flex items-center justify-center" style={{ height: "110%", marginTop: "-5%" }}>
                <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>Founder photo</span>
              </div>
            </ParallaxLayer>
          </div>
          <div>
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
              <ArrowBtn href="/about">About us</ArrowBtn>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — dark
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 text-center overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[700px] mx-auto">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>Get started</p>
          </FadeUp>
          <LineReveal
            lines={["Ready to build your", "authority system?"]}
            className="omc-heading text-white"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.02em", lineHeight: "1.05" }}
            delay={0.05}
          />
          <FadeUp delay={0.2}>
            <p className="text-[17px] leading-[1.75] mb-10 mx-auto max-w-[44ch] mt-7" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Instrument Sans', sans-serif" }}>
              One strategy call. We'll map exactly how to turn your expertise into authority that generates inbound demand.
            </p>
            <Link href="/contact">
              <button className="omc-btn text-[15px] px-8 py-4" data-testid="button-book-call-cta" data-cursor-hover>
                Book a free strategy call
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
