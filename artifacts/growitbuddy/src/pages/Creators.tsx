import { motion } from "framer-motion";

export default function Creators() {
  return (
    <div className="w-full">
      <section className="pt-28 pb-20 px-5 text-center" style={{ background: "#1D1D1F" }}>
        <div className="max-w-[640px] mx-auto mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>Creators</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-bold mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: "1.07", letterSpacing: "-0.025em", color: "#fff" }}
          >
            Built for creators.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[19px] leading-[1.55]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Systems designed specifically for content creators turning their platform into a compounding business asset.
          </motion.p>
        </div>
      </section>
      <section className="py-16 px-5 pb-24" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto">
          <div
            className="rounded-[20px] flex items-center justify-center"
            style={{ background: "#F5F5F7", height: "400px" }}
          >
            <span className="text-[14px]" style={{ color: "#6E6E73" }}>Content coming soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
