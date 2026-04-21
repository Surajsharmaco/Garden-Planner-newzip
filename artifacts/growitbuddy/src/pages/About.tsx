import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

function ArrowBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href}>
      <span className="inline-flex items-center gap-2.5 text-[14px] font-medium cursor-pointer hover:opacity-70 transition-opacity group" style={{ color: dark ? "#fff" : "#000", fontFamily: "'Instrument Sans', sans-serif" }}>
        {children}
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform" style={{ border: `1.5px solid ${dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)"}` }}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </span>
    </Link>
  );
}

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>About</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="omc-heading leading-[1.05]"
            style={{ fontSize: "clamp(44px, 6.5vw, 80px)", color: "#000", maxWidth: "16ch" }}
          >
            Engineering <em>authority</em> since day one.
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[5px]"
            style={{ background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Instrument Sans', sans-serif" }}>Team photo</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Mission</p>
            <h2 className="omc-heading leading-[1.06] mb-6" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#000" }}>
              Deep expertise deserves <em>disproportionate</em> attention.
            </h2>
            <p className="text-[17px] leading-[1.8] mb-4" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              We are a collective of strategists, writers, editors, and growth engineers who believe true expertise deserves to be heard.
            </p>
            <p className="text-[17px] leading-[1.8] mb-8" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              We don't do hacks. We build robust content and distribution systems that translate deep knowledge into market leadership and inbound revenue.
            </p>
            <ArrowBtn href="/services">See our services</ArrowBtn>
          </motion.div>
        </div>
      </section>

      {/* Founder — dark */}
      <section className="py-24 px-6 md:px-12 lg:px-20" style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-14 md:gap-20">
          <div>
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6" style={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.1)" }}>S</div>
            <h3 className="font-semibold text-white text-[20px] mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Suraj Sharma</h3>
            <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>Founder & CEO</p>
            <div className="flex gap-5">
              {["LinkedIn", "Twitter"].map((s) => (
                <a key={s} href="#" className="text-[14px] hover:opacity-75 transition-opacity" style={{ color: "#0072F5", fontFamily: "'Instrument Sans', sans-serif" }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Instrument Sans', sans-serif" }}>The origin</p>
            <h2 className="omc-heading leading-[1.06] mb-6 text-white" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              "I built GrowitBuddy after watching brilliant founders lose to <em>louder</em>, less qualified voices."
            </h2>
            <p className="text-[17px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>
              Authority isn't given — it's architected. We built the agency to be the silent engine behind the world's most influential founders.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Values</p>
          <h2 className="omc-heading leading-[1.06] mb-14" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#000" }}>How we operate.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/8" style={{ borderRadius: "5px", overflow: "hidden" }}>
            {[
              { title: "Signal over noise", body: "Every piece we produce is built to establish credibility, not chase vanity metrics." },
              { title: "Systems thinking", body: "We build infrastructure, not campaigns. Every element is designed to compound." },
              { title: "Radical transparency", body: "We tell you what's working and what isn't, even when it's uncomfortable." },
            ].map((v, i) => (
              <div key={i} className="bg-white p-8">
                <p className="text-[11px] font-bold tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.2)", fontFamily: "'Instrument Sans', sans-serif" }}>0{i + 1}</p>
                <h3 className="text-[20px] font-semibold mb-3" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{v.title}</h3>
                <p className="text-[15px] leading-[1.75]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
