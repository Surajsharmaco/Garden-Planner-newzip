import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";
import { Link } from "wouter";

/* ─────────────────────────────────────────────────────────
   PREMIUM PALETTE — Black · White · Grey · Gradient
   bg:      #FAFAFA (near-white)
   surface: #F4F4F4 (light grey)
   card:    #FFFFFF (pure white with gradient)
   dark:    #0A0A0A (rich near-black)
   body:    #525252 (medium grey — clear & readable)
   muted:   #9E9E9E
   border:  rgba(0,0,0,0.08)
   accent:  gradient text on "Authority"
───────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const SERVICES = [
  { icon: <Zap className="w-4 h-4" />, title: "Authority Strategy", desc: "Positioning, narrative and long-term influence planning that makes competition irrelevant." },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Content Production", desc: "Scalable creation systems for consistent, high-signal authority building at scale." },
  { icon: <TrendingUp className="w-4 h-4" />, title: "Distribution Strategy", desc: "Multi-channel precision reach to audiences that drive real inbound demand." },
  { icon: <Users className="w-4 h-4" />, title: "Personal Brand Growth", desc: "Transform your expertise into a trust-building machine that works while you sleep." },
];

const CASE_STUDIES = [
  { tag: "B2B SaaS · LinkedIn", title: "Tech Founder to Industry Voice", metric: "14M", unit: "impressions", desc: "14M organic impressions and 42 enterprise leads in 90 days." },
  { tag: "Coaching · YouTube", title: "Creator Authority System", metric: "85K", unit: "subscribers", desc: "0 to 85K subscribers on a long-form content-only strategy." },
  { tag: "Consulting · Multi-channel", title: "Inbound Demand Engine", metric: "3×", unit: "revenue", desc: "Replaced cold outreach entirely with inbound content alone." },
  { tag: "Startup · X / Twitter", title: "Personal Brand Growth", metric: "#5", unit: "in niche", desc: "Anonymous founder to top-5 voice in niche within 6 months." },
];

const STATS = [
  { value: "200+", label: "Founders & creators served" },
  { value: "10K+", label: "Content pieces produced" },
  { value: "4.2×", label: "Average authority growth" },
  { value: "6+", label: "Years building systems" },
];

function OrbitalRings() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 25, damping: 22 });
  const sY = useSpring(mouseY, { stiffness: 25, damping: 22 });
  const rX = useTransform(sY, [-1, 1], [5, -5]);
  const rY = useTransform(sX, [-1, 1], [-5, 5]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {[
        { size: "78", duration: 44, delay: 0, reverse: false, dot: "top" },
        { size: "58", duration: 30, delay: 0, reverse: true, dot: "right" },
        { size: "38", duration: 20, delay: 0, reverse: false, dot: "none" },
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ rotate: ring.reverse ? -360 : 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full"
          style={{
            width: `min(${ring.size}vw, ${ring.size}vh)`,
            height: `min(${ring.size}vw, ${ring.size}vh)`,
            border: i === 2 ? "1px dashed rgba(0,0,0,0.07)" : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {ring.dot === "top" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/15 shadow-sm" />
          )}
          {ring.dot === "right" && (
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/10" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full" style={{ background: "#FAFAFA" }}>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6">

        {/* Layered gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 42%, rgba(0,0,0,0.055) 0%, rgba(0,0,0,0.02) 50%, transparent 72%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(0,0,0,0.035) 0%, transparent 55%)"
        }} />

        <OrbitalRings />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 flex flex-col items-center max-w-5xl">

          {/* Eyebrow badge */}
          <motion.div variants={fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/70 text-[10px] font-bold tracking-[0.22em] text-black/40 uppercase backdrop-blur-sm">
              <span className="w-1 h-1 rounded-full bg-black/30" />
              Global Authority Agency
            </span>
          </motion.div>

          {/* H1 — "Authority" uses shimmer gradient text */}
          <motion.h1
            variants={fadeUp}
            className="text-[2.75rem] leading-[1.03] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.75rem] xl:text-[6.75rem] font-black tracking-[-0.04em] mb-7"
          >
            <span className="text-[#0A0A0A]">Build </span>
            <span className="text-shimmer">Authority</span>
            <span className="text-[#0A0A0A]"> That<br />Compounds.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#525252] text-base sm:text-lg leading-[1.82] max-w-[42ch] mb-12">
            We engineer content systems that turn your expertise into category
            dominance — compounding trust, reach, and inbound demand over time.
          </motion.p>

          {/* CTA pair */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-hero"
                className="group relative flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full font-bold text-sm sm:text-base overflow-hidden
                           bg-[#0A0A0A] text-white
                           transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
              >
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)" }} />
                <span className="relative">Book a strategy call</span>
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/work">
              <button
                data-testid="button-our-work-hero"
                className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full border border-black/10 bg-white
                           text-black/45 font-semibold text-sm sm:text-base
                           transition-all duration-300 hover:text-black hover:border-black/18 hover:shadow-md"
              >
                Explore our work
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div variants={fadeUp} className="mt-20 flex flex-col items-center gap-2.5">
            <span className="text-[10px] text-black/20 tracking-[0.28em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-black/20 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(to bottom, #F0F0F0, #F7F7F7)", borderTop: "1px solid rgba(0,0,0,0.07)" }} className="py-14 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex flex-col gap-1"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-[-0.03em]">{s.value}</span>
              <span className="text-xs text-[#9E9E9E] leading-relaxed tracking-wide">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MANIFESTO
      ══════════════════════════════════════════════ */}
      <section className="py-28 md:py-44 px-6 md:px-16 relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        {/* Gradient disc behind */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div style={{
            width: "clamp(300px,60vw,700px)",
            height: "clamp(300px,60vw,700px)",
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(0,0,0,0.04) 0%, transparent 65%)"
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#ADADAD] text-[10px] font-bold tracking-[0.28em] uppercase mb-8">
            The real problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[-0.04em] leading-[1.1] mb-8 text-[#0A0A0A]"
          >
            Most content is optimised for views.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #0A0A0A 0%, #6B6B6B 50%, #0A0A0A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              We optimise for <em>authority</em>.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#525252] text-base md:text-lg leading-[1.85] max-w-[52ch] mx-auto"
          >
            Views don't close deals — trust does. We build content systems that compound over time, making you the undeniable choice before any conversation begins.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16" style={{ background: "linear-gradient(to bottom, #F2F2F2, #FAFAFA)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[#ADADAD] text-[10px] font-bold tracking-[0.28em] uppercase mb-4">Results</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.04em] text-[#0A0A0A]">Proof of Work</h2>
            </div>
            <Link href="/work">
              <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-white text-black/40 text-sm font-medium transition-all duration-300 hover:text-black hover:border-black/18 hover:shadow-sm">
                All case studies <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 100%)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{
                  boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
                }} />

                {/* Mini bar chart */}
                <div className="flex gap-1 items-end h-10 mb-8">
                  {[35, 55, 45, 75, 60, 85, 68, 92].map((h, j) => (
                    <div key={j} className="flex-1 rounded-t transition-colors duration-500"
                      style={{
                        height: `${h}%`,
                        background: j === 7
                          ? "linear-gradient(to top, #0A0A0A, #5A5A5A)"
                          : "rgba(0,0,0,0.08)"
                      }} />
                  ))}
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-[#ADADAD] text-xs font-medium tracking-wide">{cs.tag}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#0A0A0A] text-lg font-black tracking-tight">{cs.metric}</span>
                    <span className="text-[#9E9E9E] text-xs font-medium">{cs.unit}</span>
                  </div>
                </div>
                <h3 className="text-[#0A0A0A] text-lg font-bold mb-2 tracking-[-0.02em]">{cs.title}</h3>
                <p className="text-[#525252] text-sm leading-[1.75]">{cs.desc}</p>
                <div className="flex items-center gap-1.5 mt-6 text-[#ADADAD] group-hover:text-[#0A0A0A] text-xs font-semibold tracking-wide transition-colors duration-300">
                  Read case study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16" style={{ background: "#FAFAFA", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 items-start">
            <div>
              <p className="text-[#ADADAD] text-[10px] font-bold tracking-[0.28em] uppercase mb-6">What we do</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.85rem] font-black tracking-[-0.04em] text-[#0A0A0A] leading-[1.1] mb-6">
                Four levers for category dominance
              </h2>
              <p className="text-[#525252] text-base leading-[1.85] mb-10 max-w-[40ch]">
                Each service is a module in a larger system. Combine them or let us architect the whole engine.
              </p>
              <Link href="/services">
                <button className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-black/12 text-[#0A0A0A] text-sm font-semibold
                                   bg-white transition-all duration-300 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] group">
                  See all services <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {SERVICES.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-black/[0.07] group
                             transition-all duration-300 hover:shadow-md"
                  style={{ background: "linear-gradient(145deg, #FFFFFF 0%, #F7F7F7 100%)" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#9E9E9E]
                                  group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-300"
                    style={{ background: "rgba(0,0,0,0.05)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[#0A0A0A] text-sm font-bold mb-1 tracking-[-0.01em]">{s.title}</p>
                    <p className="text-[#525252] text-sm leading-[1.7]">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOUNDER
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16" style={{ background: "linear-gradient(to bottom, #F2F2F2, #F7F7F7)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#ADADAD] text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Built by creators</p>
              <h2 className="text-3xl sm:text-[2.25rem] font-black tracking-[-0.03em] text-[#0A0A0A] leading-[1.15] mb-5">
                We've lived the problem<br />we're solving.
              </h2>
              <p className="text-[#525252] text-base leading-[1.85] mb-9">
                GrowitBuddy was built after years helping founders and creators grow their influence. We run the same systems for our clients that we run ourselves.
              </p>
              <div className="flex items-center gap-4 mb-7">
                <div className="w-11 h-11 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white font-black text-lg shrink-0">
                  S
                </div>
                <div>
                  <p className="text-[#0A0A0A] font-bold text-sm">Suraj Sharma</p>
                  <p className="text-[#9E9E9E] text-xs mt-0.5">Founder, GrowitBuddy</p>
                </div>
              </div>
              <div className="flex gap-2">
                {["LinkedIn", "Twitter / X", "Instagram"].map((sn) => (
                  <a key={sn} href="#"
                    className="text-[11px] font-semibold text-[#9E9E9E] border border-black/8 rounded-full px-3.5 py-1.5 bg-white
                               transition-all duration-200 hover:text-black hover:border-black/18">
                    {sn}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="p-7 rounded-2xl flex flex-col gap-2"
                  style={{
                    background: i % 2 === 0 ? "linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 100%)" : "linear-gradient(145deg, #0A0A0A 0%, #1C1C1C 100%)",
                    border: "1px solid rgba(0,0,0,0.08)"
                  }}
                >
                  <span className={`text-3xl font-black tracking-[-0.03em] ${i % 2 === 0 ? "text-[#0A0A0A]" : "text-white"}`}>{stat.value}</span>
                  <span className={`text-xs leading-relaxed ${i % 2 === 0 ? "text-[#9E9E9E]" : "text-white/40"}`}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — premium black gradient
      ══════════════════════════════════════════════ */}
      <section className="relative py-36 md:py-52 px-6 text-center overflow-hidden" style={{
        background: "linear-gradient(160deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)"
      }}>
        {/* Radial glow centre */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(255,255,255,0.04) 0%, transparent 65%)"
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-white/20 text-[10px] font-bold tracking-[0.28em] uppercase mb-8">
            Ready to start?
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[1.05] mb-7"
          >
            <span style={{
              background: "linear-gradient(to bottom, #FFFFFF 0%, #AAAAAA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Build Your Authority System.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 text-base md:text-lg leading-[1.85] mb-14 max-w-[44ch] mx-auto">
            One strategy call. We'll map out exactly how to turn your expertise into authority that generates clients on autopilot.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-cta"
                className="group relative flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full font-bold text-base overflow-hidden
                           text-[#0A0A0A] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 100%)" }}
              >
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #F5F5F5 0%, #DFDFDF 100%)" }} />
                <span className="relative">Book a free strategy call</span>
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/work">
              <button className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full border border-white/12 bg-white/5
                                 text-white/45 font-semibold text-base
                                 transition-all duration-300 hover:text-white hover:border-white/22 hover:bg-white/10">
                See our work
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/8">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
