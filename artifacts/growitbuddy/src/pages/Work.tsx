import { motion } from "framer-motion";
import { Link } from "wouter";

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
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Work.</h1>
          <p className="text-xl text-gray-600">
            We build authority that translates to measurable business outcomes. Here's how we've engineered dominance for category leaders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer block"
            >
              <div className="bg-gray-100 rounded-3xl aspect-[4/3] mb-6 overflow-hidden relative flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors z-10" />
                <div className="text-center z-20">
                  <div className="text-6xl md:text-8xl font-black text-foreground mb-2 tracking-tighter">
                    {item.metric}
                  </div>
                  <div className="text-lg font-medium text-gray-600 uppercase tracking-widest">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
              <div className="inline-block px-4 py-1.5 bg-gray-100 text-sm font-medium rounded-full">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
