import { motion } from "framer-motion";
import { Link } from "wouter";

/* ─────────────────────────────────────────────────────────────
   Apple.com design language:
   · Full-bleed alternating sections: black → #F5F5F7 → white → black
   · Very large bold (700) headline, -apple-system font
   · "Learn more ›" / "Get started ›" links in Apple blue #0071E3
   · No buttons — only clean text links
   · 980px max-width container, lots of vertical padding
   · Cards: white on grey, 20px border radius
───────────────────────────────────────────────────────────── */

/* Apple blue CTA link */
function AppleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <span
        className="inline-flex items-center gap-1 text-[17px] cursor-pointer hover:underline transition-all"
        style={{ color: "#0071E3" }}
      >
        {children} <span className="text-[0.9em]">›</span>
      </span>
    </Link>
  );
}

const CASES = [
  { name: "Tech Founder", result: "14M impressions in 6 months", bg: "#1D1D1F" },
  { name: "Agency Owner", result: "$2.4M new pipeline", bg: "#2C2C2E" },
  { name: "Creator", result: "250K followers, $40K/mo", bg: "#3A3A3C" },
  { name: "Executive", result: "15 podcast bookings / quarter", bg: "#48484A" },
];

const SERVICES = [
  { n: "01", t: "Authority Strategy", d: "Category positioning, narrative design, and a 90-day influence roadmap." },
  { n: "02", t: "Content Production", d: "Ghostwriting, visual assets, and newsletter systems at scale." },
  { n: "03", t: "Distribution Strategy", d: "Algorithm-native multi-channel syndication to the right audiences." },
  { n: "04", t: "Personal Brand Growth", d: "Profile optimisation, network expansion, PR and monetisation." },
];

const STATS = [
  { v: "200+", l: "Founders & creators served" },
  { v: "10K+", l: "Content pieces published" },
  { v: "4.2×", l: "Average authority growth" },
  { v: "92%", l: "Client retention rate" },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ═══════════════════════════════════════════
          HERO — pure black, Apple product-launch feel
      ═══════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-screen px-5 overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #000, #111)" }}
      >
        {/* Subtle radial light */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(255,255,255,0.04) 0%, transparent 65%)"
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Eyebrow — Apple uses the product category here */}
          <p className="text-[17px] font-semibold mb-4" style={{ color: "#F5F5F7" }}>
            GrowitBuddy
          </p>

          {/* The very large Apple-style product headline */}
          <h1
            className="font-bold text-white mb-4 max-w-[14ch] mx-auto"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
            }}
          >
            Authority. Engineered.
          </h1>

          <p className="text-[19px] mb-8 max-w-[42ch] mx-auto leading-[1.5]" style={{ color: "rgba(255,255,255,0.6)" }}>
            A premium content and distribution studio for founders, operators, and creators who refuse to be ignored.
          </p>

          {/* Apple-style dual CTA links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <AppleLink href="/contact">Book a free strategy call</AppleLink>
            <Link href="/work">
              <span className="text-[17px] cursor-pointer hover:underline transition-all" style={{ color: "rgba(255,255,255,0.7)" }}>
                See our work ›
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          STATEMENT — #F5F5F7 Apple grey
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-5 text-center" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#6E6E73" }}
          >
            The Problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: "1.08",
              letterSpacing: "-0.022em",
              color: "#1D1D1F",
            }}
          >
            Most content is<br className="hidden md:block" /> optimised for views.<br /> We optimise for authority.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-[19px] leading-[1.55] max-w-[50ch] mx-auto mb-8"
            style={{ color: "#6E6E73" }}
          >
            Views don't close deals — trust does. We build systems that compound over time, making you the undeniable choice before any conversation begins.
          </motion.p>
          <AppleLink href="/framework">Learn more about our framework</AppleLink>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — pure white
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-5" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>Services</p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(28px, 4.5vw, 56px)",
                lineHeight: "1.1",
                letterSpacing: "-0.022em",
                color: "#1D1D1F",
              }}
            >
              Four levers for authority.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group p-8 rounded-[20px] cursor-pointer hover:shadow-md transition-all duration-200"
                style={{ background: "#F5F5F7" }}
              >
                <p className="text-[12px] font-bold tracking-widest mb-5" style={{ color: "#6E6E73" }}>{s.n}</p>
                <h3
                  className="font-semibold mb-3"
                  style={{ fontSize: "24px", letterSpacing: "-0.015em", color: "#1D1D1F" }}
                >
                  {s.t}
                </h3>
                <p className="text-[17px] leading-[1.55] mb-5" style={{ color: "#6E6E73" }}>{s.d}</p>
                <AppleLink href="/services">Learn more</AppleLink>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <AppleLink href="/services">Explore all services</AppleLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CASE STUDIES — dark section (Apple product-card feel)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-5" style={{ background: "#000" }}>
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
              Results
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{
                fontSize: "clamp(28px, 4.5vw, 56px)",
                lineHeight: "1.08",
                letterSpacing: "-0.022em",
              }}
            >
              Proof of work.
            </h2>
            <p className="text-[19px] mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Real results for real founders and creators.
            </p>
            <Link href="/work">
              <span className="text-[17px] cursor-pointer hover:underline" style={{ color: "#0071E3" }}>
                See all case studies ›
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="p-8 rounded-[20px] aspect-square flex flex-col justify-between cursor-pointer group hover:brightness-110 transition-all duration-200"
                style={{ background: c.bg }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Case Study</p>
                <div>
                  <h3 className="font-bold text-white text-[28px] leading-[1.1] mb-2" style={{ letterSpacing: "-0.018em" }}>{c.name}</h3>
                  <p className="text-[17px] mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>{c.result}</p>
                  <span className="text-[17px] cursor-pointer hover:underline group-hover:underline" style={{ color: "#0071E3" }}>Learn more ›</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS — #F5F5F7 
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>By the numbers</p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(28px, 4.5vw, 56px)",
                lineHeight: "1.1",
                letterSpacing: "-0.022em",
                color: "#1D1D1F",
              }}
            >
              Built on results.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="p-8 rounded-[20px] text-center"
                style={{ background: "#fff" }}
              >
                <p
                  className="font-bold mb-2"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.025em", color: "#1D1D1F" }}
                >
                  {s.v}
                </p>
                <p className="text-[14px] leading-[1.5]" style={{ color: "#6E6E73" }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOUNDER — white section
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-5" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[20px] aspect-square flex items-center justify-center"
            style={{ background: "#F5F5F7" }}
          >
            <span className="text-[14px]" style={{ color: "#6E6E73" }}>Founder photo</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-5" style={{ color: "#6E6E73" }}>About</p>
            <h2
              className="font-bold mb-5"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: "1.08",
                letterSpacing: "-0.022em",
                color: "#1D1D1F",
              }}
            >
              We've lived the problem we're solving.
            </h2>
            <p className="text-[17px] leading-[1.65] mb-6" style={{ color: "#6E6E73" }}>
              GrowitBuddy was built after watching brilliant founders get drowned out by louder, less qualified voices. We engineer authority systems — not hacks.
            </p>
            <div className="flex items-center gap-4 mb-6 p-5 rounded-[14px]" style={{ background: "#F5F5F7" }}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ background: "#1D1D1F" }}
              >
                S
              </div>
              <div>
                <p className="font-semibold text-[15px]" style={{ color: "#1D1D1F" }}>Suraj Sharma</p>
                <p className="text-[13px] mt-0.5" style={{ color: "#6E6E73" }}>Founder, GrowitBuddy</p>
              </div>
            </div>
            <AppleLink href="/about">Learn more about us</AppleLink>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — full black, Apple product launch feel
      ═══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-36 px-5 text-center"
        style={{ background: "linear-gradient(to bottom, #000, #0A0A0A)" }}
      >
        <div className="max-w-[640px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-widest mb-5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Get started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-white mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: "1.07",
              letterSpacing: "-0.025em",
            }}
          >
            Ready to build your authority system?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[19px] mb-10 leading-[1.5]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            One strategy call. We'll map exactly how to turn your expertise into authority that generates inbound demand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <AppleLink href="/contact">Book a free strategy call</AppleLink>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
