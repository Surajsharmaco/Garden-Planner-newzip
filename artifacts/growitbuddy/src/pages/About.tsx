import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-black/[0.03] blur-[130px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-6">About</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] leading-[1.08] text-[#0A0A0A] mb-8"
          >
            Engineering authority<br />since day one.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-black/45 text-lg leading-[1.85] max-w-[48ch] mx-auto">
            GrowitBuddy was built on a simple premise: in a world of infinite noise, the highest-leverage asset a founder can own is earned authority.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#F4F4F4] aspect-square rounded-3xl flex items-center justify-center">
            <span className="text-black/20 text-sm">Team photo</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#0A0A0A] mb-6">Our mission</h2>
            <p className="text-black/45 text-base leading-[1.85] mb-6">
              We are a collective of strategists, writers, editors, and growth engineers who believe true expertise deserves disproportionate attention.
            </p>
            <p className="text-black/45 text-base leading-[1.85]">
              We don't do hacks. We don't do engagement bait. We build robust content and distribution systems that translate deep knowledge into market leadership and inbound revenue.
            </p>
          </motion.div>
        </div>

        {/* Founder — dark card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/10 mb-6 flex items-center justify-center text-white text-3xl font-bold">S</div>
            <h3 className="text-white text-2xl font-semibold mb-1">Suraj Sharma</h3>
            <p className="text-white/40 text-sm mb-6">Founder & CEO</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/30 hover:text-white text-sm underline transition-colors">LinkedIn</a>
              <a href="#" className="text-white/30 hover:text-white text-sm underline transition-colors">Twitter</a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">The origin</h4>
            <p className="text-white/45 text-base leading-[1.85] mb-5">
              "I started GrowitBuddy after watching brilliant founders struggle to get their message heard while less qualified voices dominated their industries simply because they understood content distribution."
            </p>
            <p className="text-white/45 text-base leading-[1.85]">
              "Authority isn't given; it's architected. We built the agency to be the silent engine behind the world's most influential founders."
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
