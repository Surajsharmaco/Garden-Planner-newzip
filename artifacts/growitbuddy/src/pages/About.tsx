import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Engineering Authority.</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            GrowitBuddy was built on a simple premise: in a world of infinite noise, the highest leverage asset a founder can own is undeniably earned authority.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-100 aspect-square rounded-3xl"
          >
            {/* Image placeholder */}
            <div className="w-full h-full rounded-3xl bg-foreground/5 flex items-center justify-center">
              <span className="text-gray-400">Team Photo Placeholder</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a collective of strategists, writers, editors, and growth engineers who believe that true expertise deserves disproportionate attention.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We don't do "hacks." We don't do engagement bait. We build robust content and distribution systems that translate deep knowledge into market leadership and inbound revenue.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12"
        >
          <div className="md:w-1/3">
            <div className="w-32 h-32 bg-gray-600 rounded-full mb-6 border-4 border-gray-700" />
            <h3 className="text-3xl font-bold mb-2">Suraj Sharma</h3>
            <p className="text-accent font-semibold mb-6">Founder & CEO</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors underline">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors underline">Twitter / X</a>
            </div>
          </div>
          <div className="md:w-2/3">
            <h4 className="text-2xl font-bold mb-4">The Origin</h4>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              "I started GrowitBuddy after watching brilliant founders struggle to get their message heard while less qualified voices dominated their industries simply because they understood content distribution."
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              "Authority isn't given; it's architected. We built the agency to be the silent engine behind the world's most influential founders, allowing them to focus on building their business while we engineer their market dominance."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
