import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";
import { Link } from "wouter";

/* ─── animation ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── data ──────────────────────────────────────────────── */
const SERVICES = [
  { icon: <Zap className="w-4 h-4" />, title: "Authority Strategy", desc: "Positioning, narrative and long-term influence planning." },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Content Production", desc: "Scalable creation systems for consistent authority building." },
  { icon: <TrendingUp className="w-4 h-4" />, title: "Distribution Strategy", desc: "Multi-channel precision reach to audiences that matter." },
  { icon: <Users className="w-4 h-4" />, title: "Personal Brand Growth", desc: "Transform your presence into a trust-building machine." },
];

const CASE_STUDIES = [
  { tag: "B2B SaaS · LinkedIn", title: "Tech Founder to Industry Voice", metric: "14M impressions", desc: "14M organic impressions and 42 enterprise leads in 90 days." },
  { tag: "Coaching · YouTube", title: "Creator Authority System", metric: "85K subscribers", desc: "0 to 85K subscribers on a long-form content-only strategy." },
  { tag: "Consulting · Multi-channel", title: "Inbound Demand Engine", metric: "3× revenue", desc: "Replaced cold outreach entirely with inbound content alone." },
  { tag: "Startup · X / Twitter", title: "Personal Brand Growth", metric: "Top 5 in niche", desc: "Anonymous founder to top-5 voice in niche within 6 months." },
];

const STATS = [
  { value: "200+", label: "Founders & creators served" },
  { value: "10K+", label: "Content pieces produced" },
  { value: "4.2×", label: "Average authority growth" },
  { value: "6+", label: "Years building systems" },
];

/* ─── Orbital rings — white/grey only ───────────────────── */
function OrbitalRings() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 25, damping: 22 });
  const sY = useSpring(mouseY, { stiffness: 25, damping: 22 });
  const rX = useTransform(sY, [-1, 1], [6, -6]);
  const rY = useTransform(sX, [-1, 1], [-6, 6]);

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
      {/* Outermost ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: "min(78vw, 78vh)",
          height: "min(78vw, 78vh)",
          border: "1px solid rgba(255,255,255,0.07)"
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
      </motion.div>

      {/* Mid ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: "min(56vw, 56vh)",
          height: "min(56vw, 56vh)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-white/20" />
      </motion.div>

      {/* Inner ring — dashed */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: "min(36vw, 36vh)",
          height: "min(36vw, 36vh)",
          border: "1px dashed rgba(255,255,255,0.06)"
        }}
      />
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#0B0B0B]">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6">

        {/* Subtle white radial glow — not yellow */}
        <div className="absolute pointer-events-none" style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -56%)",
          width: "clamp(400px, 70vw, 800px)",
          height: "clamp(400px, 70vw, 800px)",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 45%, transparent 70%)",
          borderRadius: "50%",
        }} />

        <OrbitalRings />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col items-center max-w-5xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-white/30 text-xs font-semibold tracking-[0.22em] uppercase mb-10"
          >
            Global Authority Agency
          </motion.p>

          {/* H1 — ONLY "Authority" in yellow */}
          <motion.h1
            variants={fadeUp}
            className="text-[2.75rem] leading-[1.05] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-[-0.03em] mb-7"
          >
            <span className="text-white">Build </span>
            <span className="text-[#F5E663]">Authority</span>
            <span className="text-white"> That Compounds.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/40 text-base sm:text-lg leading-[1.75] max-w-[42ch] mb-12"
          >
            We engineer content systems that turn your expertise into category
            dominance — compounding trust, reach, and inbound demand.
          </motion.p>

          {/* CTA pill pair — yellow primary only */}
          <motion.div variants={fadeUp} className="inline-flex items-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-hero"
                className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#F5E663] text-black font-bold text-sm sm:text-base
                           transition-all duration-300
                           hover:shadow-[0_0_28px_rgba(245,230,99,0.30)] hover:scale-[1.02]"
              >
                Book a strategy call
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/12">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/work">
              <button
                data-testid="button-our-work-hero"
                className="-ml-3 flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full border border-white/12 bg-white/4 backdrop-blur-sm
                           text-white/60 font-semibold text-sm sm:text-base
                           transition-all duration-300
                           hover:text-white hover:border-white/22 hover:bg-white/7"
              >
                Explore our work
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/8">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-20 flex flex-col items-center gap-2.5"
          >
            <span className="text-[10px] text-white/20 tracking-[0.25em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-9 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-14 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex flex-col gap-1"
            >
              <span className="text-3xl sm:text-4xl font-black text-white tracking-[-0.03em]">{s.value}</span>
              <span className="text-xs text-white/35 leading-relaxed tracking-wide">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AUTHORITY STATEMENT
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-40 px-6 md:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/25 text-[10px] font-semibold tracking-[0.25em] uppercase mb-8"
          >
            The real problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[-0.03em] leading-[1.12] mb-8 text-white"
          >
            Most content is optimized for views.
            <br />
            We optimize for <span className="italic text-white">authority</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="text-white/40 text-base md:text-lg leading-[1.8] max-w-[52ch] mx-auto"
          >
            Views don't close deals — trust does. We build content systems that compound
            over time, making you the undeniable choice before any conversation begins.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-white/25 text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">Results</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-white">Proof of Work</h2>
            </div>
            <Link href="/work">
              <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10
                                 text-white/45 text-sm font-medium
                                 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/4">
                All case studies <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                whileHover={{ y: -4 }}
                className="group relative border border-white/[0.07] rounded-2xl p-8 bg-white/[0.025]
                           cursor-pointer overflow-hidden
                           transition-[border-color,background,box-shadow] duration-300
                           hover:border-white/12 hover:bg-white/[0.04]
                           hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Bar chart visual — white on hover */}
                <div className="flex gap-1 items-end h-12 mb-8">
                  {[38, 62, 50, 78, 66, 88, 72, 95].map((h, j) => (
                    <div
                      key={j}
                      className="flex-1 bg-white/[0.07] rounded-t transition-colors duration-500 group-hover:bg-white/20"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-white/30 text-xs font-medium tracking-wide">{cs.tag}</span>
                  <span className="text-white text-[11px] font-bold bg-white/10 px-3 py-1 rounded-full">{cs.metric}</span>
                </div>
                <h3 className="text-white text-lg font-bold mb-2 tracking-[-0.01em]">
                  {cs.title}
                </h3>
                <p className="text-white/38 text-sm leading-[1.7]">{cs.desc}</p>
                <div className="flex items-center gap-1.5 mt-6 text-white/28 group-hover:text-white text-xs font-semibold tracking-wide transition-colors duration-300">
                  Read case study
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <div>
              <p className="text-white/25 text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">What we do</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-[-0.03em] text-white leading-[1.12] mb-6">
                Four ways we build your authority
              </h2>
              <p className="text-white/38 text-base leading-[1.8] mb-10 max-w-[40ch]">
                Each service is a module in a larger system. Combine them or let us architect the whole engine.
              </p>
              <Link href="/services">
                <button className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold
                                   transition-all duration-300
                                   hover:bg-white/6 hover:border-white/30 group">
                  See all services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]
                             transition-all duration-300
                             hover:border-white/12 hover:bg-white/[0.04] group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 text-white/45
                                  group-hover:bg-white/12 group-hover:text-white transition-all duration-300">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1 tracking-[-0.01em]">{s.title}</p>
                    <p className="text-white/38 text-sm leading-[1.65]">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-white/25 text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">Built by creators</p>
              <h2 className="text-3xl sm:text-[2.25rem] font-black tracking-[-0.03em] text-white leading-[1.15] mb-5">
                We've lived the problem<br />we're solving.
              </h2>
              <p className="text-white/38 text-base leading-[1.8] mb-9">
                GrowitBuddy was built after years helping founders and creators grow their
                influence. We run the same systems for our clients that we use ourselves.
              </p>
              <div className="flex items-center gap-4 mb-7">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white font-black text-lg shrink-0">
                  S
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Suraj Sharma</p>
                  <p className="text-white/35 text-xs mt-0.5">Founder, GrowitBuddy</p>
                </div>
              </div>
              <div className="flex gap-2">
                {["LinkedIn", "Twitter / X", "Instagram"].map((sn) => (
                  <a
                    key={sn}
                    href="#"
                    className="text-[11px] font-semibold text-white/30 border border-white/8 rounded-full px-3.5 py-1.5
                               transition-all duration-200 hover:text-white/70 hover:border-white/18"
                  >
                    {sn}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] flex flex-col gap-2"
                >
                  <span className="text-3xl font-black text-white tracking-[-0.03em]">{stat.value}</span>
                  <span className="text-xs text-white/35 leading-relaxed">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 px-6 text-center overflow-hidden border-t border-white/[0.06]">
        {/* Very subtle white glow — not yellow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 65%)" }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-white/25 text-[10px] font-semibold tracking-[0.25em] uppercase mb-8">
            Ready to start?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] mb-7 text-white"
          >
            Build Your <span className="text-[#F5E663]">Authority</span> System.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/38 text-base md:text-lg leading-[1.8] mb-14 max-w-[44ch] mx-auto">
            One strategy call. We'll map out exactly how to turn your expertise into
            authority that generates clients on autopilot.
          </motion.p>
          <motion.div variants={fadeUp} className="inline-flex items-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-cta"
                className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#F5E663] text-black font-bold text-base
                           transition-all duration-300
                           hover:shadow-[0_0_32px_rgba(245,230,99,0.28)] hover:scale-[1.02]"
              >
                Book a free strategy call
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/12">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/work">
              <button
                className="-ml-3 flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full border border-white/12 bg-white/4
                           text-white/55 font-semibold text-base
                           transition-all duration-300
                           hover:text-white hover:border-white/22 hover:bg-white/7"
              >
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
