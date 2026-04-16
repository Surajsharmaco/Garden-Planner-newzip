import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Authority Strategy",
    description: "Define your narrative, position your expertise, and build a long-term influence plan.",
    features: ["Narrative Design", "Category Creation", "Audience Avatar Mapping", "90-Day Roadmap"]
  },
  {
    title: "Content Production",
    description: "Scalable content creation systems for consistent authority building.",
    features: ["Ghostwriting", "Visual Asset Creation", "Newsletter Systems", "Platform-Native Formatting"]
  },
  {
    title: "Video Editing Systems",
    description: "End-to-end video workflows for creators and founders.",
    features: ["Short-form Clips", "Long-form Editing", "Thumbnail Design", "Retention Optimization"]
  },
  {
    title: "Distribution Strategy",
    description: "Multi-channel distribution to reach the right audience consistently.",
    features: ["Algorithm Hacking", "Cross-platform Syndication", "Engagement Pods", "Community Building"]
  },
  {
    title: "Personal Brand Growth",
    description: "Transform your online presence into a trust-building authority machine.",
    features: ["Profile Optimization", "Network Expansion", "Monetization Strategy", "PR & Media Placements"]
  }
];

export default function Services() {
  return (
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Services.</h1>
          <p className="text-xl text-gray-600">
            We don't just create content. We build end-to-end authority systems designed to make you the undeniable category leader.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-lg transition-shadow group flex flex-col md:flex-row gap-8"
            >
              <div className="md:w-1/2">
                <div className="text-accent text-lg font-bold mb-4">0{idx + 1}</div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </div>
              <div className="md:w-1/2 bg-gray-50 rounded-2xl p-8">
                <h4 className="font-semibold mb-6">What's included:</h4>
                <ul className="flex flex-col gap-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-foreground text-white rounded-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to scale your influence?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how our systems can build your authority and drive inbound demand.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90 h-14 px-8 text-lg">
              Book a Strategy Call
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
