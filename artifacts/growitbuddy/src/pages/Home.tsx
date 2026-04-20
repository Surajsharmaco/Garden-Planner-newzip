import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

/* ─────────────────────────────────────────────────────────
   bou.co aesthetic:
   · Dark full-screen hero, flat transparent nav
   · Medium-weight headlines (not ultra-black)
   · Clean white body sections
   · Soft gradient sphere behind section headings
   · Editorial, boutique-agency feel
───────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const CASES = [
  {
    title: "Tech Founder to\nIndustry Voice",
    meta: "B2B SaaS — LinkedIn",
    metric: "14M impressions",
    bg: "linear-gradient(135deg, #0F0F0F 0%, #1C1C1C 100%)",
  },
  {
    title: "Creator Authority\nSystem",
    meta: "Coaching — YouTube",
    metric: "85K subscribers",
    bg: "linear-gradient(135deg, #111118 0%, #1A1A28 100%)",
  },
  {
    title: "Inbound Demand\nEngine",
    meta: "Consulting — Multi-channel",
    metric: "3× revenue",
    bg: "linear-gradient(135deg, #0E0E0E 0%, #1C1814 100%)",
  },
  {
    title: "Personal Brand\nGrowth",
    meta: "Startup — X / Twitter",
    metric: "#5 in niche",
    bg: "linear-gradient(135deg, #101010 0%, #181818 100%)",
  },
];

const SERVICES = [
  { num: "01", title: "Authority Strategy", desc: "Narrative design, category positioning, 90-day influence roadmaps." },
  { num: "02", title: "Content Production", desc: "Scalable ghostwriting and content systems for consistent authority." },
  { num: "03", title: "Distribution Strategy", desc: "Platform-native, algorithm-aware multi-channel syndication." },
  { num: "04", title: "Personal Brand Growth", desc: "Profile, network, and monetisation strategy for founders." },
];

/* Soft gradient blob — used as section bg accent */
function GradientBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none rounded-full blur-[120px] ${className}`} />
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* ════════════════════════════════════
          HERO — full-screen dark cinematic
      ════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #0A0A0A 0%, #111111 60%, #0D0D0D 100%)"
        }}
      >
        {/* Cinematic vignette layers */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.025) 0%, transparent 65%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,255,255,0.015) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 40% 35% at 80% 70%, rgba(255,255,255,0.012) 0%, transparent 55%)"
        }} />

        {/* Subtle noise texture via SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px"
        }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col items-center max-w-4xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.75rem] lg:text-[5.75rem] font-normal leading-[1.1] tracking-[-0.02em] text-white mb-8"
          >
            GrowitBuddy is a content studio building authority for founders, operators &amp; creators.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/45 text-base sm:text-lg leading-[1.8] max-w-[44ch] mb-14">
            We engineer content systems that compound trust, reach, and inbound demand — making you the undeniable category leader.
          </motion.p>

          {/* Info pills — bou.co style */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-xs font-semibold tracking-[0.12em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
              Global
            </span>
            <span className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-xs font-semibold tracking-[0.12em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              200+ Clients
            </span>
            <span className="text-white/20">|</span>
            <Link href="/contact">
              <button
                data-testid="button-book-call-hero"
                className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-xs font-semibold tracking-[0.06em] hover:text-white hover:border-white/30 transition-all duration-200 flex items-center gap-2 group"
              >
                hello@growitbuddy.com
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))" }} />

        {/* Scroll nudge */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
          />
        </div>
      </section>

      {/* ════════════════════════════════════
          STATEMENT
      ════════════════════════════════════ */}
      <section className="relative py-32 md:py-52 px-8 md:px-16 overflow-hidden bg-white">
        {/* Gradient sphere blob */}
        <GradientBlob className="w-[600px] h-[600px] -top-48 left-1/2 -translate-x-1/2 bg-black/[0.03]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-10"
          >
            The problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[#0A0A0A]"
          >
            Most content is optimised
            <br />for views. We optimise for&nbsp;
            <em className="not-italic text-black/35">authority</em>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="text-black/45 text-lg leading-[1.85] mt-10 max-w-[50ch]"
          >
            Views don't close deals — trust does. We build systems that compound over time, making you the undeniable choice before any conversation begins.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════
          CASE STUDIES — dark cards
      ════════════════════════════════════ */}
      <section className="pb-24 md:pb-32 px-8 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-3">Results</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#0A0A0A]">Proof of work</h2>
            </div>
            <Link href="/work">
              <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-black/40 hover:text-black transition-colors group">
                All case studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASES.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.012 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] flex flex-col justify-end p-8 md:p-10"
                style={{ background: cs.bg }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

                <div className="relative z-10">
                  <span className="text-white/35 text-xs font-medium tracking-wide block mb-4">{cs.meta}</span>
                  <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.2] whitespace-pre-line mb-5">
                    {cs.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-sm border border-white/12 rounded-full px-3.5 py-1.5">{cs.metric}</span>
                    <ArrowRight className="w-5 h-5 text-white/25 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICES — clean list
      ════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-8 md:px-12 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-16">
            <p className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-4">Services</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#0A0A0A] leading-[1.2]">
              Four levers for authority
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/8 rounded-2xl overflow-hidden">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="bg-white p-8 md:p-10 group hover:bg-[#F7F7F7] transition-colors duration-200 cursor-pointer"
              >
                <span className="text-black/20 text-xs font-bold tracking-widest block mb-6">{s.num}</span>
                <h3 className="text-[#0A0A0A] text-xl md:text-2xl font-semibold tracking-[-0.015em] mb-3">{s.title}</h3>
                <p className="text-black/45 text-sm leading-[1.75]">{s.desc}</p>
                <div className="mt-6 flex items-center gap-1.5 text-black/25 group-hover:text-black text-xs font-medium transition-colors duration-200">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/services">
              <button className="flex items-center gap-2.5 text-sm font-medium text-black/45 hover:text-black transition-colors group">
                All services
                <span className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS + FOUNDER
      ════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-8 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <p className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-8">About</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#0A0A0A] leading-[1.2] mb-6">
              We've lived the problem we're solving.
            </h2>
            <p className="text-black/45 text-base leading-[1.85] mb-10">
              GrowitBuddy was built after years watching founders with brilliant insights get drowned out by louder, less qualified voices. We engineer authority systems — not hacks.
            </p>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white font-bold text-lg shrink-0">S</div>
              <div>
                <p className="text-[#0A0A0A] font-semibold text-sm">Suraj Sharma</p>
                <p className="text-black/35 text-xs mt-0.5">Founder, GrowitBuddy</p>
              </div>
            </div>
            <Link href="/about">
              <button className="flex items-center gap-2.5 text-sm font-medium text-black/45 hover:text-black transition-colors group">
                Our story
                <span className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "200+", label: "Founders & creators served" },
              { value: "10K+", label: "Content pieces produced" },
              { value: "4.2×", label: "Average authority growth" },
              { value: "6+", label: "Years building systems" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className={`rounded-2xl p-8 flex flex-col justify-between min-h-[160px] ${
                  i === 1 || i === 2
                    ? "bg-[#0A0A0A]"
                    : "bg-[#F4F4F4]"
                }`}
              >
                <span className={`text-4xl font-semibold tracking-[-0.03em] ${i === 1 || i === 2 ? "text-white" : "text-[#0A0A0A]"}`}>
                  {stat.value}
                </span>
                <span className={`text-xs leading-relaxed ${i === 1 || i === 2 ? "text-white/35" : "text-black/40"}`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA — full dark
      ════════════════════════════════════ */}
      <section
        className="relative py-36 md:py-56 px-8 text-center overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, #111111)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 65%)" }} />

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-8"
          >
            Ready to build your authority system?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 text-lg leading-[1.8] mb-14 max-w-[44ch] mx-auto">
            One strategy call. We'll map out exactly how to turn your expertise into authority that generates inbound demand.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact">
              <button
                data-testid="button-book-call-cta"
                className="inline-flex items-center gap-3 text-base font-semibold text-[#0A0A0A] bg-white px-8 py-4 rounded-full
                           hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-[1.02] group"
              >
                Book a free strategy call
                <span className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
