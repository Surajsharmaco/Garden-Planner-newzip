import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const cases = [
  { name: "Tech Founder to Industry Voice", category: "B2B SaaS · LinkedIn", metric: "14M", unit: "impressions", body: "From zero online presence to the most-cited voice in their SaaS niche within 6 months.", dark: true },
  { name: "Agency Owner Authority Engine", category: "Services · Multi-channel", metric: "$2.4M", unit: "pipeline attributed", body: "Systematic content strategy that drove inbound pipeline exceeding prior annual revenue.", dark: false },
  { name: "Creator Monetization System", category: "Creator Economy · YouTube", metric: "250K", unit: "subscribers", body: "Educational content system built around a proprietary framework, monetized to $40K/mo.", dark: false },
  { name: "Executive Personal Brand", category: "Leadership · Podcast & PR", metric: "15+", unit: "speaking invites / qtr", body: "Turned a quiet operator into an industry thought leader with consistent PR placement.", dark: true },
  { name: "E-commerce Founder Growth", category: "E-commerce · X / Twitter", metric: "400%", unit: "branded search growth", body: "Personal brand-first strategy that made the founder synonymous with their product category.", dark: false },
  { name: "VC Authority Engine", category: "Finance · LinkedIn", metric: "3×", unit: "deal flow growth", body: "Positioned a venture firm as the category expert, attracting better deal flow at higher velocity.", dark: true },
];

export default function Work() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6" }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Work</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="omc-heading leading-[1.05]"
            style={{ fontSize: "clamp(44px, 6.5vw, 88px)", color: "#000", maxWidth: "12ch" }}
          >
            Work work work work work work.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-[17px] leading-[1.7] max-w-[52ch]"
            style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Our clients expect outcomes. We measure our success by theirs. Here's the proof.
          </motion.p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="group p-8 aspect-square flex flex-col justify-between cursor-pointer hover:shadow-md transition-all duration-200"
              style={{
                background: c.dark ? "#0A0A0A" : "#F6F6F6",
                borderRadius: "5px",
                border: c.dark ? "none" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.category}</p>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all" style={{ border: `1.5px solid ${c.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}`, color: c.dark ? "#fff" : "#000" }}>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <div>
                <p className="omc-heading leading-none mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: c.dark ? "#fff" : "#000" }}>{c.metric}</p>
                <p className="text-[13px] mb-4" style={{ color: c.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.unit}</p>
                <h3 className="text-[16px] font-semibold mb-2 leading-[1.4]" style={{ color: c.dark ? "#fff" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{c.name}</h3>
                <p className="text-[13px] leading-[1.65]" style={{ color: c.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#F6F6F6", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 className="omc-heading leading-[1.06] mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#000" }}>
            Your results, <em>next</em>.
          </h2>
          <p className="text-[17px] mb-8 leading-[1.7]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
            Book a free strategy call and let's scope your authority system.
          </p>
          <Link href="/contact">
            <button className="omc-btn text-[15px] px-8 py-4">
              Book a strategy call
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
