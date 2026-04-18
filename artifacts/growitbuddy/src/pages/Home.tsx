import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";
import { Link } from "wouter";

/* ─── animation helpers ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── data ──────────────────────────────────────────────── */
const SERVICES = [
  { icon: <Zap className="w-5 h-5" />, title: "Authority Strategy", desc: "Positioning, narrative & long-term influence planning." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Content Production", desc: "Scalable creation systems for consistent authority building." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Distribution Strategy", desc: "Multi-channel precision reach to audiences that matter." },
  { icon: <Users className="w-5 h-5" />, title: "Personal Brand Growth", desc: "Transform your presence into a trust-building machine." },
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

/* ─── Orbital rings component ───────────────────────────── */
function OrbitalRings() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const sY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const rX = useTransform(sY, [-1, 1], [8, -8]);
  const rY = useTransform(sX, [-1, 1], [-8, 8]);

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
      {/* Ring 1 - outermost */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-white/8"
        style={{ width: "min(76vw, 76vh)", height: "min(76vw, 76vh)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60" />
      </motion.div>

      {/* Ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-accent/12"
        style={{ width: "min(58vw, 58vh)", height: "min(58vw, 58vh)" }}
      >
        <div className="absolute bottom-0 right-4 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
        <div className="absolute top-0 left-8 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/50" />
      </motion.div>

      {/* Ring 3 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-white/5"
        style={{ width: "min(42vw, 42vh)", height: "min(42vw, 42vh)" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/40" />
      </motion.div>

      {/* Ring 4 - innermost dashed */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: "min(26vw, 26vh)",
          height: "min(26vw, 26vh)",
          border: "1px dashed rgba(245,230,99,0.15)"
        }}
      />

      {/* Dot accents scattered */}
      <div className="absolute w-1 h-1 rounded-full bg-accent/50" style={{ top: "28%", left: "18%" }} />
      <div className="absolute w-1 h-1 rounded-full bg-white/20" style={{ bottom: "22%", right: "22%" }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/30" style={{ top: "62%", left: "14%" }} />
      <div className="absolute w-1 h-1 rounded-full bg-white/15" style={{ top: "20%", right: "16%" }} />
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#0D0D0D]">

      {/* ══════════════════════════════════════════════
          HERO — full screen, cinematic, centered
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6">

        {/* Yellow radial glow — the main cinematic effect */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(90vw, 700px)",
            height: "min(90vw, 700px)",
            background: "radial-gradient(ellipse at center, rgba(245,230,99,0.13) 0%, rgba(245,230,99,0.04) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Second softer glow layer */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(120vw, 1100px)",
            height: "min(120vw, 1100px)",
            background: "radial-gradient(ellipse at center, rgba(245,230,99,0.04) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Orbital rings */}
        <OrbitalRings />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-accent/80 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-8"
          >
            Global Authority Agency
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-[2.8rem] leading-[1.06] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tight mb-8 max-w-5xl"
          >
            <span className="text-white">Build Authority</span>
            <br />
            <span className="text-white">That</span>{" "}
            <span className="text-accent">Compounds.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-12"
          >
            You're not just a content creator — you're a category leader in the making.
            We engineer the systems that make authority inevitable.
          </motion.p>

          {/* Pill CTA — vivafox overlapping style */}
          <motion.div variants={fadeUp} className="relative inline-flex items-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-hero"
                className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-accent text-black font-bold text-sm sm:text-base hover:bg-accent/85 transition-all duration-200 shadow-2xl shadow-accent/20"
              >
                Book a strategy call
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/15">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/work">
              <button
                data-testid="button-our-work-hero"
                className="-ml-3 flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-white/15 bg-white/6 backdrop-blur-sm text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/25 transition-all duration-200"
              >
                Explore our work
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════ */}
      <section className="border-t border-b border-white/6 py-10 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col gap-1 text-center md:text-left"
            >
              <span className="text-3xl sm:text-4xl font-black text-white">{s.value}</span>
              <span className="text-sm text-white/40 leading-snug">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AUTHORITY STATEMENT
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,230,99,0.04) 0%, transparent 70%)"
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          >
            The real problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-white"
          >
            Most content chases views.
            <br />
            <span className="text-accent">We chase authority.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Views don't close deals — trust does. We build content systems that compound
            over time, making you the undeniable choice before any conversation begins.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-accent/70 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Results</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Proof of Work</h2>
            </div>
            <Link href="/work">
              <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-white/70 text-sm font-semibold hover:text-white hover:border-white/25 hover:bg-white/5 transition-all">
                All case studies <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative border border-white/8 rounded-2xl p-8 bg-white/3 hover:bg-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 60% 60% at 30% 30%, rgba(245,230,99,0.05) 0%, transparent 70%)" }} />

                {/* bar chart visual */}
                <div className="flex gap-1 items-end h-14 mb-6">
                  {[40, 65, 52, 80, 68, 90, 75, 95].map((h, j) => (
                    <div
                      key={j}
                      className="flex-1 bg-white/8 group-hover:bg-accent/30 rounded-t transition-colors duration-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/35 text-xs font-medium">{cs.tag}</span>
                  <span className="text-accent text-xs font-bold bg-accent/10 px-3 py-1 rounded-full">{cs.metric}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-accent transition-colors">{cs.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{cs.desc}</p>
                <div className="flex items-center gap-1.5 mt-5 text-white/30 group-hover:text-accent text-sm font-semibold transition-colors">
                  Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-accent/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">What we do</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Four ways we build your authority
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-8">
                Each service is a module in a larger system. Combine them or let us architect the whole engine.
              </p>
              <Link href="/services">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black text-sm font-bold hover:bg-accent/85 transition-all shadow-lg shadow-accent/15 group">
                  See all services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-white/3 hover:border-accent/25 hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent/20 transition-colors">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{s.title}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOUNDER SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Built by creators</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
                We've lived the problem we're solving
              </h2>
              <p className="text-white/40 leading-relaxed mb-8">
                GrowitBuddy was built after years helping founders and creators grow their
                influence. We run the same systems for our clients that we use ourselves.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-black font-black text-xl">
                  S
                </div>
                <div>
                  <p className="text-white font-bold">Suraj Sharma</p>
                  <p className="text-white/35 text-sm">Founder, GrowitBuddy</p>
                </div>
              </div>
              <div className="flex gap-2">
                {["LinkedIn", "Twitter / X", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-xs font-semibold text-white/35 hover:text-accent border border-white/10 hover:border-accent/30 rounded-full px-3 py-1.5 transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col gap-2"
                >
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-sm text-white/40 leading-snug">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — vivafox-style centered
      ══════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 px-6 text-center overflow-hidden border-t border-white/6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,230,99,0.08) 0%, transparent 65%)"
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-accent/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Ready to start?
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.06] mb-6">
            Build Your
            <br />
            <span className="text-accent">Authority System.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            If you're a founder or creator ready to turn expertise into influence and inbound demand — let's talk.
          </motion.p>
          <motion.div variants={fadeUp} className="inline-flex items-center">
            <Link href="/contact">
              <button
                data-testid="button-book-call-cta"
                className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-accent text-black font-bold text-base hover:bg-accent/85 transition-all shadow-2xl shadow-accent/25"
              >
                Book a strategy call
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/15">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
