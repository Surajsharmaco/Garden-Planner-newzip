import { motion } from "framer-motion";
import { Link } from "wouter";

const cases = [
  { name: "Tech Founder to Industry Voice", category: "B2B SaaS · LinkedIn", metric: "14M", unit: "impressions in 90 days", dark: true, bg: "#1D1D1F" },
  { name: "Agency Owner Authority", category: "Services · Multi-channel", metric: "$2.4M", unit: "new pipeline attributed", dark: true, bg: "#2C2C2E" },
  { name: "Creator Monetization", category: "Creator Economy · YouTube", metric: "250K", unit: "subscribers in 12 months", dark: false, bg: "#F5F5F7" },
  { name: "Executive Personal Brand", category: "Leadership · Podcast", metric: "15+", unit: "speaking invites / quarter", dark: false, bg: "#fff" },
  { name: "E-commerce Founder Growth", category: "E-commerce · X / Twitter", metric: "400%", unit: "branded search increase", dark: true, bg: "#1D1D1F" },
  { name: "VC Authority Engine", category: "Finance · LinkedIn", metric: "3×", unit: "qualified deal flow", dark: false, bg: "#F5F5F7" },
];

export default function Work() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-28 pb-20 px-5 text-center" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[680px] mx-auto mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>Work</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-bold mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: "1.06", letterSpacing: "-0.025em", color: "#1D1D1F" }}
          >
            Work work work<br />work work work.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[19px] leading-[1.55]"
            style={{ color: "#6E6E73" }}
          >
            We measure success by outcomes. Our all-time client satisfaction score is 9.4/10. Here's proof.
          </motion.p>
        </div>
      </section>

      {/* Case grid */}
      <section className="px-5 py-12" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="p-8 rounded-[20px] aspect-square flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform duration-200"
              style={{ background: c.bg, border: !c.dark ? "1px solid rgba(0,0,0,0.08)" : "none" }}
            >
              <p
                className="text-[12px] font-semibold uppercase tracking-widest"
                style={{ color: c.dark ? "rgba(255,255,255,0.35)" : "#6E6E73" }}
              >
                {c.category}
              </p>
              <div>
                <div className="mb-4">
                  <span
                    className="font-bold block"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      letterSpacing: "-0.025em",
                      lineHeight: "1",
                      color: c.dark ? "#fff" : "#1D1D1F",
                    }}
                  >
                    {c.metric}
                  </span>
                  <span className="text-[15px] mt-1 block" style={{ color: c.dark ? "rgba(255,255,255,0.45)" : "#6E6E73" }}>
                    {c.unit}
                  </span>
                </div>
                <h3
                  className="font-semibold text-[17px] leading-[1.3] mb-4"
                  style={{ color: c.dark ? "rgba(255,255,255,0.75)" : "#1D1D1F" }}
                >
                  {c.name}
                </h3>
                <Link href="/contact">
                  <span className="text-[15px] cursor-pointer hover:underline" style={{ color: "#0071E3" }}>Learn more ›</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 text-center" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[560px] mx-auto">
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.022em", color: "#1D1D1F" }}>
            Your results, next.
          </h2>
          <p className="text-[17px] mb-8 leading-[1.6]" style={{ color: "#6E6E73" }}>
            Ready to be in this list? Book a free strategy call and let's scope your authority system.
          </p>
          <Link href="/contact">
            <span className="text-[17px] cursor-pointer hover:underline" style={{ color: "#0071E3" }}>Book a strategy call ›</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
