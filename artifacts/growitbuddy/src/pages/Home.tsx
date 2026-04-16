import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 px-4 md:px-8">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-white to-white opacity-80"></div>
        <div className="container mx-auto z-10 max-w-5xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="inline-block mb-6 px-4 py-1.5 bg-accent/20 text-foreground font-semibold text-sm rounded-full tracking-wide">
              Global Authority Agency
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-8 text-balance">
              We Help Founders & Creators Build <span className="relative inline-block"><span className="relative z-10">Authority</span><span className="absolute bottom-2 left-0 w-full h-4 bg-accent -z-10 skew-x-[-12deg]"></span></span> That Compounds.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
              Through strategic content systems and precision distribution, we engineer inbound demand for world-class experts.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-foreground text-background hover:bg-foreground/90 group">
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/work">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-2">
                  Explore Our Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Authority Problem Statement */}
      <section className="py-24 bg-foreground text-white px-4 md:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Most content is optimized for views.<br/>
              <span className="text-accent">We optimize for authority.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Views don't close deals. Trust does. We build the systems that turn your expertise into an undeniable asset, positioning you as the category leader before the sales call even happens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="py-32 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The GrowitBuddy Framework</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A systematic approach to engineering category dominance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Positioning", desc: "Define your unique narrative and category entry point." },
              { num: "02", title: "Content System", desc: "Scalable production of high-signal, expert-led content." },
              { num: "03", title: "Distribution", desc: "Strategic syndication across high-leverage channels." },
              { num: "04", title: "Compounding", desc: "Building a perpetual machine for inbound opportunity." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="text-6xl font-black text-gray-100 mb-6 group-hover:text-accent/20 transition-colors">{step.num}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-32 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Proof of Work</h2>
              <p className="text-xl text-gray-600 max-w-xl">Authority isn't claimed, it's demonstrated. Here's how we've done it for category leaders.</p>
            </div>
            <Link href="/work">
              <Button variant="outline" className="h-12 px-6">View All Case Studies</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer block"
              >
                <div className="bg-gray-100 rounded-2xl aspect-[4/3] mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-colors z-10" />
                  {/* Placeholder for case study images */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <PlayCircle className="w-16 h-16 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">Tech Founder to Industry Voice</h3>
                <p className="text-gray-600 mb-4">How we generated 14M organic impressions and 42 enterprise leads in 90 days.</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full">B2B SaaS</span>
                  <span className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full">LinkedIn</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-8 bg-foreground text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Build Your Authority System.
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Stop renting attention. Start owning your category. Let's engineer your path to inevitable authority.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-16 px-10 text-xl bg-accent text-foreground hover:bg-accent/90 hover:scale-105 transition-all">
                Book Strategy Call
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
