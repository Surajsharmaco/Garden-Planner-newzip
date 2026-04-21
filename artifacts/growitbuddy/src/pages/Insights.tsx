import { motion } from "framer-motion";

export default function Insights() {
  return (
    <div className="w-full bg-white">
      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Insights</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="omc-heading leading-[1.05]"
            style={{ fontSize: "clamp(44px, 6.5vw, 80px)", color: "#000", maxWidth: "16ch" }}
          >
            Thoughts on building authority.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-7 text-[17px] leading-[1.7] max-w-[50ch]"
            style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Frameworks, strategies and strong opinions on building unignorable influence.
          </motion.p>
        </div>
      </section>
      <section className="py-16 px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div
            className="flex items-center justify-center"
            style={{ background: "#F6F6F6", borderRadius: "5px", height: "400px", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>Content coming soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
