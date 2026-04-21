import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

function ArrowBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href}>
      <span className="inline-flex items-center gap-2.5 text-[14px] font-medium cursor-pointer hover:opacity-70 transition-opacity group" style={{ color: dark ? "#fff" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}>
        {children}
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform" style={{ border: `1.5px solid ${dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)"}` }}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </span>
    </Link>
  );
}

const services = [
  {
    num: "01", title: "Authority Strategy", headline: "Know exactly what you stand for.",
    description: "Narrative design, category positioning, and a bespoke 90-day authority roadmap built for your specific market and audience.",
    features: ["Narrative Design", "Category Creation", "Audience Avatar Mapping", "90-Day Roadmap", "Competitor Analysis"],
    dark: false,
  },
  {
    num: "02", title: "Content Production", headline: "High-signal content. At scale.",
    description: "We extract your knowledge and systematize the production of high-quality content — ghostwriting, visual assets, newsletters, and platform-native formats.",
    features: ["Ghostwriting", "Visual Asset Creation", "Newsletter Systems", "Platform-Native Formatting", "Content Calendar"],
    dark: true,
  },
  {
    num: "03", title: "Video Editing", headline: "Video built for retention.",
    description: "Short-form clips, long-form editing, thumbnail design, and algorithm-native structure built for compounding reach.",
    features: ["Short-Form Clips", "Long-Form Editing", "Thumbnail Design", "Retention Optimization", "Caption Systems"],
    dark: false,
  },
  {
    num: "04", title: "Distribution Strategy", headline: "Reach decision-makers at scale.",
    description: "Platform-native, algorithm-aware strategies that ensure your narrative reaches the decision-makers that matter across every major channel.",
    features: ["Algorithm Strategy", "Cross-Platform Syndication", "Engagement Architecture", "Community Building", "Paid Amplification"],
    dark: true,
  },
  {
    num: "05", title: "Personal Brand Growth", headline: "Own your category.",
    description: "Profile optimisation, network expansion, monetisation strategy and PR placements — a full-stack approach to authority ownership.",
    features: ["Profile Optimization", "Network Expansion", "Monetization Strategy", "PR & Media Placements", "Speaking Outreach"],
    dark: false,
  },
];

export default function Services() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="pt-[60px] px-6 md:px-12 lg:px-20 pt-28 pb-24" style={{ background: "#F6F6F6" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Services</p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="omc-heading leading-[1.05]"
              style={{ fontSize: "clamp(44px, 6.5vw, 80px)", color: "#000" }}
            >
              End-to-end <em>authority</em> systems.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[17px] leading-[1.75] self-end"
            style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            We don't just create content. We build the infrastructure for category leadership — every module designed to compound.
          </motion.p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <section
          key={i}
          className="py-20 px-6 md:px-12 lg:px-20"
          style={{ background: s.dark ? "#0A0A0A" : "#fff", borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-14 md:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: s.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>{s.num} — {s.title}</p>
              <h2
                className="omc-heading leading-[1.07] mb-6"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", color: s.dark ? "#fff" : "#000" }}
              >
                {s.headline}
              </h2>
              <p className="text-[16px] leading-[1.8] mb-8" style={{ color: s.dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
                {s.description}
              </p>
              <ArrowBtn href="/contact" dark={s.dark}>Get started</ArrowBtn>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.6 }}>
              <ul className="flex flex-col" style={{ borderTop: `1px solid ${s.dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
                {s.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="py-4 text-[16px] font-medium flex items-center justify-between"
                    style={{
                      borderBottom: `1px solid ${s.dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      color: s.dark ? "rgba(255,255,255,0.7)" : "#000",
                      fontFamily: "'Instrument Sans', sans-serif",
                    }}
                  >
                    {f}
                    <span className="text-[11px] font-bold tracking-widest" style={{ color: s.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)" }}>0{fi + 1}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
