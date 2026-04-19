import { motion } from "framer-motion";
import { Link } from "wouter";
import { TiltCard } from "@/components/TiltCard";

const cases = [
  {
    title: "Tech Founder to Industry Voice",
    metric: "14M",
    metricLabel: "Organic Impressions",
    category: "B2B SaaS"
  },
  {
    title: "Agency Owner Authority",
    metric: "$2.4M",
    metricLabel: "Pipeline Generated",
    category: "Services"
  },
  {
    title: "Creator Monetization",
    metric: "250K",
    metricLabel: "New Followers",
    category: "Creator Economy"
  },
  {
    title: "Executive Personal Brand",
    metric: "15+",
    metricLabel: "Tier-1 Podcast Bookings",
    category: "Leadership"
  },
  {
    title: "E-com Founder Growth",
    metric: "400%",
    metricLabel: "Increase in Brand Search",
    category: "E-commerce"
  },
  {
    title: "Venture Capital Authority",
    metric: "3x",
    metricLabel: "Deal Flow Increase",
    category: "Finance"
  }
];

export default function Work() {
  return (
    <div className="w-full pt-20 md:pt-24 pb-16 md:pb-24 lg:pb-32 px-5 md:px-8 bg-[#F8F5EF]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#0E0D0B]">Our Work.</h1>
          <p className="text-lg md:text-xl text-[#6B6760]">
            We build authority that translates to measurable business outcomes. Here's how we've engineered dominance for category leaders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((item, idx) => (
            <TiltCard key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer block h-full"
              >
                <div className="bg-[#E8E3D6] rounded-3xl aspect-[4/3] mb-6 overflow-hidden relative flex items-center justify-center p-6 md:p-8 border border-[#0E0D0B]/6">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors z-10" />
                  <div className="text-center z-20">
                    <div className="text-5xl sm:text-6xl md:text-8xl font-black text-[#0E0D0B] mb-2 tracking-tighter">
                      {item.metric}
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-medium text-[#706C64] uppercase tracking-widest">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#0E0D0B] group-hover:text-black/70 transition-colors">{item.title}</h3>
                <div className="inline-block px-4 py-1.5 bg-black/[0.05] text-sm font-medium rounded-full text-[#5C5850]">
                  {item.category}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
