import { motion } from "framer-motion";
import { Link } from "wouter";

function AppleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <span className="inline-flex items-center gap-1 text-[17px] cursor-pointer hover:underline" style={{ color: "#0071E3" }}>
        {children} <span>›</span>
      </span>
    </Link>
  );
}

export default function About() {
  return (
    <div className="w-full">
      {/* Hero — light grey */}
      <section className="pt-28 pb-20 px-5 text-center" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[640px] mx-auto mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>About</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-bold mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: "1.06", letterSpacing: "-0.025em", color: "#1D1D1F" }}
          >
            Engineering authority since day one.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[19px] leading-[1.55]"
            style={{ color: "#6E6E73" }}
          >
            GrowitBuddy was built on a simple premise: in a world of infinite noise, the highest-leverage asset a founder can own is earned authority.
          </motion.p>
        </div>
      </section>

      {/* Mission — white */}
      <section className="py-24 px-5" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div
            className="rounded-[20px] aspect-square flex items-center justify-center"
            style={{ background: "#F5F5F7" }}
          >
            <span className="text-[14px]" style={{ color: "#6E6E73" }}>Team photo</span>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-5" style={{ color: "#6E6E73" }}>Mission</p>
            <h2
              className="font-bold mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.08", letterSpacing: "-0.022em", color: "#1D1D1F" }}
            >
              Deep expertise deserves disproportionate attention.
            </h2>
            <p className="text-[17px] leading-[1.65] mb-4" style={{ color: "#6E6E73" }}>
              We are a collective of strategists, writers, editors, and growth engineers who believe true expertise deserves to be heard.
            </p>
            <p className="text-[17px] leading-[1.65] mb-6" style={{ color: "#6E6E73" }}>
              We don't do hacks or engagement bait. We build robust content and distribution systems that translate deep knowledge into market leadership.
            </p>
            <AppleLink href="/services">Explore our services</AppleLink>
          </div>
        </div>
      </section>

      {/* Founder — dark */}
      <section className="py-24 px-5" style={{ background: "#000" }}>
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
            <div>
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 border border-white/10"
                style={{ background: "#1D1D1F" }}
              >
                S
              </div>
              <h3 className="font-bold text-white text-[24px] mb-1" style={{ letterSpacing: "-0.015em" }}>Suraj Sharma</h3>
              <p className="text-[15px] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Founder & CEO</p>
              <div className="flex gap-5">
                <a href="#" className="text-[15px] hover:underline" style={{ color: "#0071E3" }}>LinkedIn</a>
                <a href="#" className="text-[15px] hover:underline" style={{ color: "#0071E3" }}>Twitter</a>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>The origin</p>
              <h4
                className="font-bold text-white mb-5"
                style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}
              >
                "I built GrowitBuddy after watching brilliant founders lose to louder, less qualified voices."
              </h4>
              <p className="text-[17px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Authority isn't given — it's architected. We built the agency to be the silent engine behind the world's most influential founders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto text-center mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>Values</p>
          <h2 className="font-bold" style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.022em", color: "#1D1D1F" }}>
            How we operate.
          </h2>
        </div>
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Signal over noise", body: "Every piece of content we produce is built to establish credibility, not chase vanity metrics." },
            { title: "Systems thinking", body: "We build infrastructure, not campaigns. Every element compounds over time." },
            { title: "Radical transparency", body: "We tell you what's working and what isn't, even when it's uncomfortable." },
          ].map((v, i) => (
            <div
              key={i}
              className="p-8 rounded-[20px]"
              style={{ background: "#fff" }}
            >
              <h3 className="font-semibold text-[19px] mb-3" style={{ letterSpacing: "-0.015em", color: "#1D1D1F" }}>{v.title}</h3>
              <p className="text-[15px] leading-[1.65]" style={{ color: "#6E6E73" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
