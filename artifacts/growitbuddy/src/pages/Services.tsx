import { motion } from "framer-motion";
import { Link } from "wouter";

function AppleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <span className="inline-flex items-center gap-1 text-[17px] cursor-pointer hover:underline" style={{ color: "#0071E3" }}>
        {children} <span>›</span>
      </span>
    </Link>
  );
}

const services = [
  {
    num: "01",
    title: "Authority Strategy",
    headline: "Know exactly what you stand for.",
    description: "Narrative design, category positioning, competitor analysis, and a 90-day authority roadmap built for your specific market.",
    features: ["Narrative Design", "Category Creation", "Audience Mapping", "90-Day Roadmap"],
    dark: false,
  },
  {
    num: "02",
    title: "Content Production",
    headline: "High-signal content. At scale.",
    description: "We extract your knowledge and systematize production — ghostwriting, visual assets, newsletters, and platform-native formats.",
    features: ["Ghostwriting", "Visual Assets", "Newsletter Systems", "Platform Formats"],
    dark: true,
  },
  {
    num: "03",
    title: "Video Editing Systems",
    headline: "Video that retains and converts.",
    description: "Short-form clips, long-form editing, thumbnail design, and algorithm-native structure built for compounding reach.",
    features: ["Short-Form Clips", "Long-Form Editing", "Thumbnails", "Retention Optimization"],
    dark: false,
  },
  {
    num: "04",
    title: "Distribution Strategy",
    headline: "Reach the right people, every time.",
    description: "Platform-native, algorithm-aware strategies that put your message in front of decision-makers across every major channel.",
    features: ["Algorithm Strategy", "Cross-Platform", "Engagement Growth", "Community Building"],
    dark: true,
  },
  {
    num: "05",
    title: "Personal Brand Growth",
    headline: "Own your category.",
    description: "Profile optimisation, network expansion, monetisation strategy and PR — a full-stack approach to authority.",
    features: ["Profile Optimization", "Network Expansion", "Monetization", "PR & Media"],
    dark: false,
  },
];

export default function Services() {
  return (
    <div className="w-full">
      {/* Hero — dark */}
      <section
        className="pt-28 pb-20 px-5 text-center"
        style={{ background: "linear-gradient(to bottom, #1D1D1F, #000)" }}
      >
        <div className="max-w-[680px] mx-auto mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>Services</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-bold text-white mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: "1.06", letterSpacing: "-0.025em" }}
          >
            End-to-end authority systems.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[19px] leading-[1.55]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            We don't just create content. We build the infrastructure for category leadership — every module designed to compound.
          </motion.p>
        </div>
      </section>

      {/* Service sections — alternating dark/light like Apple */}
      {services.map((s, i) => (
        <section
          key={i}
          className="py-20 md:py-28 px-5"
          style={{ background: s.dark ? "#000" : i % 2 === 0 ? "#fff" : "#F5F5F7" }}
        >
          <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
            {/* Number + title */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[12px] font-bold tracking-widest mb-3"
                style={{ color: s.dark ? "rgba(255,255,255,0.35)" : "#6E6E73" }}
              >
                {s.num} — {s.title}
              </p>
              <h2
                className="font-bold mb-5"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  color: s.dark ? "#fff" : "#1D1D1F",
                }}
              >
                {s.headline}
              </h2>
              <p
                className="text-[17px] leading-[1.65] mb-6"
                style={{ color: s.dark ? "rgba(255,255,255,0.5)" : "#6E6E73" }}
              >
                {s.description}
              </p>
              <AppleLink href="/contact">Get started</AppleLink>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="p-8 rounded-[20px]"
              style={{ background: s.dark ? "#1D1D1F" : "#fff", boxShadow: s.dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <ul className="flex flex-col divide-y" style={{ borderColor: s.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }}>
                {s.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="py-4 text-[17px] font-medium"
                    style={{ color: s.dark ? "rgba(255,255,255,0.75)" : "#1D1D1F" }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-5 text-center" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[640px] mx-auto">
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.022em", color: "#1D1D1F" }}>
            Ready to get started?
          </h2>
          <p className="text-[19px] mb-8 leading-[1.5]" style={{ color: "#6E6E73" }}>
            One strategy call. Let's map your path to category leadership.
          </p>
          <AppleLink href="/contact">Book a free strategy call</AppleLink>
        </div>
      </section>
    </div>
  );
}
