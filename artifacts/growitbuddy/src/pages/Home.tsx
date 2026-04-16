import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Zap, BarChart3, Star, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";
import { TiltCard } from "@/components/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const FRAMEWORK_STEPS = [
  {
    num: "01",
    title: "Positioning",
    desc: "Define your unique narrative and category entry point. Own a corner of the market before anyone else can.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    num: "02",
    title: "Content System",
    desc: "Scalable, expert-led content that speaks to the right people and builds compounding trust over time.",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    num: "03",
    title: "Distribution",
    desc: "Precision syndication across high-leverage channels. The right content, reaching the right audience.",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    num: "04",
    title: "Compounding",
    desc: "Turn visibility into inbound demand. A flywheel that accelerates the longer it runs.",
    icon: <Users className="w-5 h-5" />
  }
];

const CASE_STUDIES = [
  {
    tag1: "B2B SaaS", tag2: "LinkedIn",
    title: "Tech Founder to Industry Voice",
    desc: "14M organic impressions and 42 enterprise leads in 90 days.",
    metric: "14M impressions"
  },
  {
    tag1: "Coaching", tag2: "YouTube",
    title: "Creator Authority System",
    desc: "Grew from 0 to 85K subscribers with a pure long-form strategy.",
    metric: "85K subscribers"
  },
  {
    tag1: "Consulting", tag2: "Multi-channel",
    title: "Inbound Demand Engine",
    desc: "Replaced cold outreach entirely — 3× revenue from content alone.",
    metric: "3× revenue"
  },
  {
    tag1: "Startup", tag2: "X / Twitter",
    title: "Personal Brand Growth",
    desc: "Founder went from anonymous to top-5 voice in their niche in 6 months.",
    metric: "Top 5 in niche"
  }
];

const SERVICES = [
  { title: "Authority Strategy", desc: "Positioning, narrative, and long-term influence planning." },
  { title: "Content Production", desc: "Scalable creation systems for consistent authority building." },
  { title: "Video Editing Systems", desc: "End-to-end workflows for creators and founders." },
  { title: "Distribution Strategy", desc: "Multi-channel reach to the audiences that matter." },
  { title: "Personal Brand Growth", desc: "Transform your presence into a trust-building machine." }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

        {/* subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,_#f5e66320,_transparent)] pointer-events-none" />

        {/* soft floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float-slow-reverse pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ── Left: copy ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col items-start"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-accent/15 border border-accent/30 text-foreground font-semibold text-xs rounded-full tracking-widest uppercase"
              >
                Global Authority Agency
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-black tracking-tight mb-6"
              >
                We Help Founders&nbsp;&amp;&nbsp;Creators Build{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">Authority</span>
                  <span className="absolute bottom-1 left-0 w-full h-[10px] bg-accent -z-10 skew-x-[-8deg] rounded-sm" />
                </span>{" "}
                That&nbsp;Compounds.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-gray-500 leading-relaxed mb-10 max-w-lg"
              >
                GrowitBuddy builds strategic content systems that turn your
                expertise into influence, recognition, and inbound demand —
                without chasing vanity metrics.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link href="/contact">
                  <Button
                    size="lg"
                    data-testid="button-book-strategy-call-hero"
                    className="w-full sm:w-auto h-12 px-7 text-base font-semibold bg-foreground text-background hover:bg-foreground/85 group rounded-xl"
                  >
                    Book Strategy Call
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/work">
                  <Button
                    size="lg"
                    variant="outline"
                    data-testid="button-explore-work-hero"
                    className="w-full sm:w-auto h-12 px-7 text-base font-semibold border-2 rounded-xl hover:bg-accent/10 hover:border-accent/50"
                  >
                    Explore Our Work
                  </Button>
                </Link>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mt-10 text-sm text-gray-400"
              >
                <div className="flex -space-x-2">
                  {["#111","#333","#555","#888"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: c }}
                    >
                      {["S","A","R","M"][i]}
                    </div>
                  ))}
                </div>
                <span>Trusted by <strong className="text-foreground">200+ founders</strong> &amp; creators</span>
              </motion.div>
            </motion.div>

            {/* ── Right: 3D scene ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-[480px] aspect-square">
                <HeroScene />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── AUTHORITY PROBLEM ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-foreground text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              The real problem
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-8">
              Most content is optimized for views.
              <br />
              <span className="text-accent">We optimize for authority.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Views don't close deals — trust does. We engineer content systems
              that build compounding credibility, so you're already the obvious
              choice before a call is ever booked.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── FRAMEWORK ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">How we work</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">The GrowitBuddy Framework</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A four-step system for engineering category authority.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FRAMEWORK_STEPS.map((step, i) => (
              <TiltCard key={i} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-white p-7 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-gray-100">{step.num}</span>
                    <span className="p-2 bg-accent/10 rounded-lg text-foreground">{step.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{step.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Results</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Proof of Work</h2>
            </div>
            <Link href="/work">
              <Button variant="outline" className="shrink-0 h-10 px-5 rounded-xl border-2 hover:border-foreground text-sm font-semibold">
                View All Case Studies
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((cs, i) => (
              <TiltCard key={i} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="group h-full border border-gray-100 rounded-2xl p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Metric highlight */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">{cs.tag1}</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">{cs.tag2}</span>
                    </div>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{cs.metric}</span>
                  </div>

                  {/* Visual placeholder */}
                  <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative group-hover:from-accent/5 group-hover:to-accent/10 transition-colors duration-300">
                    <div className="flex gap-1 items-end h-12">
                      {[40, 65, 52, 80, 68, 90, 75].map((h, j) => (
                        <div
                          key={j}
                          className="w-3 bg-gray-300 group-hover:bg-accent/50 rounded-t transition-colors duration-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{cs.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{cs.desc}</p>

                  <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES OVERVIEW ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">What we do</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Five ways we build your authority
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Each service is a module in a larger system. Use one, combine several, or let us architect the whole thing.
              </p>
              <Link href="/services">
                <Button className="h-11 px-6 rounded-xl bg-foreground text-background hover:bg-foreground/85 text-sm font-semibold group">
                  See All Services
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-5 p-5 bg-white rounded-xl border border-gray-100 hover:border-accent/40 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="text-sm font-black text-foreground">0{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{s.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-gray-400 font-semibold tracking-widest uppercase mb-10">
            Trusted by founders and creators
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {["Brand A", "Creator Co", "Studio X", "Agency Z", "Founder Labs", "Scale HQ"].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-10 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 text-xs font-semibold tracking-wide"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER SECTION ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-accent text-sm font-semibold tracking-widest uppercase">Built by creators</p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                We've lived the problem we're solving
              </h2>
              <p className="text-gray-500 leading-relaxed">
                GrowitBuddy was built by Suraj Sharma after spending years helping
                founders and creators grow their influence. We don't sell theory —
                we run the same systems for our clients that we run for ourselves.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center text-white font-black text-xl">
                  S
                </div>
                <div>
                  <p className="font-bold">Suraj Sharma</p>
                  <p className="text-gray-400 text-sm">Founder, GrowitBuddy</p>
                </div>
              </div>
              <div className="flex gap-3">
                {["LinkedIn", "Twitter / X", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-xs font-semibold text-gray-400 hover:text-foreground border border-gray-200 hover:border-foreground rounded-full px-3 py-1.5 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Founders served", value: "200+" },
                { label: "Content pieces produced", value: "10K+" },
                { label: "Avg. authority growth", value: "4.2×" },
                { label: "Years in the game", value: "6+" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-2"
                >
                  <span className="text-3xl font-black">{stat.value}</span>
                  <span className="text-sm text-gray-500 leading-snug">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-foreground text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              Ready to start?
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your Authority System.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              If you're a founder or creator ready to turn expertise into influence
              and inbound demand — let's talk.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact">
                <Button
                  size="lg"
                  data-testid="button-book-strategy-call-cta"
                  className="h-13 px-10 text-base font-semibold bg-accent text-foreground hover:bg-accent/85 hover:scale-105 transition-all duration-200 rounded-xl"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
