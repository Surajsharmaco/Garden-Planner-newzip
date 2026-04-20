import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cases = [
  { title: "Tech Founder to Industry Voice", metric: "14M", unit: "impressions", category: "B2B SaaS", bg: "linear-gradient(135deg, #0F0F0F, #1C1C1C)" },
  { title: "Agency Owner Authority", metric: "$2.4M", unit: "pipeline", category: "Services", bg: "linear-gradient(135deg, #111118, #1A1A28)" },
  { title: "Creator Monetization", metric: "250K", unit: "followers", category: "Creator Economy", bg: "linear-gradient(135deg, #0E0E0E, #1C1814)" },
  { title: "Executive Personal Brand", metric: "15+", unit: "podcast bookings", category: "Leadership", bg: "linear-gradient(135deg, #101010, #181818)" },
  { title: "E-com Founder Growth", metric: "400%", unit: "brand search", category: "E-commerce", bg: "linear-gradient(135deg, #0F0F12, #1A1A22)" },
  { title: "Venture Capital Authority", metric: "3×", unit: "deal flow", category: "Finance", bg: "linear-gradient(135deg, #0D0D10, #181620)" },
];

export default function Work() {
  return (
    <div className="w-full bg-white">
      {/* Page hero */}
      <section className="relative pt-40 pb-20 px-8 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-black/[0.03] blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-6">Work</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.025em] leading-[1.08] text-[#0A0A0A] mb-8"
          >
            Work work work<br />work work work.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-black/45 text-lg leading-[1.85] max-w-[46ch] mx-auto">
            We measure success by outcomes. Here's proof that authority engineering translates to real business results.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ scale: 1.015 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-8 cursor-pointer"
              style={{ background: item.bg }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <span className="text-white/30 text-xs font-medium tracking-wide block mb-3">{item.category}</span>
                <h3 className="text-white text-xl font-semibold tracking-[-0.015em] leading-[1.25] mb-4">{item.title}</h3>
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-white text-3xl font-semibold tracking-tight">{item.metric}</span>
                  <span className="text-white/35 text-sm">{item.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-white/25 group-hover:text-white/60 text-xs font-medium transition-colors duration-300">
                  View case study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
