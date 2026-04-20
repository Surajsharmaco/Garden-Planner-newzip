import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    num: "01",
    title: "Authority Strategy",
    description: "Before a single piece of content, we define exactly what you stand for. We map your expertise against market gaps to find the category you can own.",
    features: ["Narrative Design", "Category Creation", "Audience Avatar Mapping", "90-Day Roadmap"]
  },
  {
    num: "02",
    title: "Content Production",
    description: "We extract your knowledge and systematize the production of high-signal content — ghostwriting, visual assets, newsletters, and platform-native formats.",
    features: ["Ghostwriting", "Visual Asset Creation", "Newsletter Systems", "Platform-Native Formatting"]
  },
  {
    num: "03",
    title: "Video Editing Systems",
    description: "End-to-end video workflows built for retention. Short-form clips, long-form editing, thumbnail design, and algorithm-native structure.",
    features: ["Short-form Clips", "Long-form Editing", "Thumbnail Design", "Retention Optimization"]
  },
  {
    num: "04",
    title: "Distribution Strategy",
    description: "Great content dies without distribution. We deploy platform-native strategies to ensure your narrative reaches the decision-makers that matter.",
    features: ["Algorithm Hacking", "Cross-platform Syndication", "Engagement Pods", "Community Building"]
  },
  {
    num: "05",
    title: "Personal Brand Growth",
    description: "Profile optimisation, network expansion, monetisation strategy and PR — a full-stack approach to owning your category.",
    features: ["Profile Optimization", "Network Expansion", "Monetization Strategy", "PR & Media Placements"]
  }
];

export default function Services() {
  return (
    <div className="w-full bg-white">
      {/* Page hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-black/[0.03] blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-6">Services</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] leading-[1.08] text-[#0A0A0A] mb-8"
          >
            End-to-end<br />authority systems.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-black/45 text-lg leading-[1.85] max-w-[46ch] mx-auto"
          >
            We don't just create content. We build the infrastructure for category leadership — every module designed to compound.
          </motion.p>
        </div>
      </section>

      {/* Service rows */}
      <section className="pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col divide-y divide-black/[0.06]">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="group py-12 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-8 md:gap-12 items-start cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-200 px-6 -mx-6 rounded-xl"
              >
                <span className="text-black/20 text-sm font-bold tracking-widest">{s.num}</span>
                <div>
                  <h3 className="text-[#0A0A0A] text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">{s.title}</h3>
                  <p className="text-black/45 text-base leading-[1.8]">{s.description}</p>
                </div>
                <div>
                  <ul className="flex flex-col gap-2.5">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-black/45">
                        <span className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-12 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-white leading-[1.12] mb-8">
            Ready to scale your influence?
          </h2>
          <p className="text-white/35 text-lg mb-12 max-w-[44ch] mx-auto leading-[1.8]">
            Let's discuss how our systems can build your authority and drive inbound demand.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-3 text-[#0A0A0A] bg-white text-base font-semibold px-8 py-4 rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 group">
              Book a Strategy Call
              <span className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
