import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

export default function About() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="About GrowitBuddy - Content & Authority Studio"
        description="GrowitBuddy is a content and authority studio founded by Suraj Sharma. We believe deep expertise deserves disproportionate attention."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>About</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Engineering authority since day one.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "55ch" }}
          >
            We are a collective of strategists, writers, editors, and growth engineers who believe true expertise deserves to be heard.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              aspectRatio: "1",
              borderRadius: 24,
              background: "linear-gradient(135deg, #1a1a1a 0%, #0B0B0B 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#0B0B0B",
              letterSpacing: "-0.04em",
            }}
          >
            Authority.<br />Architected.
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Mission</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: "1.1", color: "#0B0B0B", marginBottom: 20 }}>
              Deep expertise deserves disproportionate attention.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 16 }}>
              We don't do hacks. We build robust content and distribution systems that translate deep knowledge into market leadership and inbound revenue.
            </p>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 32 }}>
              Every founder we work with has something worth amplifying. Our job is to build the infrastructure that ensures the market hears it - loudly, consistently, and credibly.
            </p>
            <Link href="/services">
              <span className="gb-btn" style={{ fontSize: 14 }}>
                See our services
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 20 }}>
                S
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em", color: "#fff", marginBottom: 4 }}>Suraj Sharma</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Founder & CEO</p>
              <div style={{ display: "flex", gap: 12 }}>
                {["LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>The origin</p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", letterSpacing: "-0.04em", lineHeight: "1.1", color: "#fff", marginBottom: 20 }}>
                "I built GrowitBuddy after watching brilliant founders lose to louder, less qualified voices."
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
                Authority isn't given - it's architected. We built the agency to be the silent engine behind the world's most influential founders. The result is a studio that has helped generate over 700M+ views and scale hundreds of founder brands to market leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Values</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0B0B0B", marginBottom: 48 }}>How we operate.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 1, background: "rgba(11,11,11,0.08)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { title: "Signal over noise", body: "Every piece we produce is built to establish credibility, not chase vanity metrics. If it doesn't compound, we don't build it.", num: "01" },
              { title: "Systems thinking", body: "We build infrastructure, not campaigns. Every element is designed to compound and create leverage over time.", num: "02" },
              { title: "Radical transparency", body: "We tell you what's working and what isn't, even when it's uncomfortable. Our best clients are the ones who want the truth.", num: "03" },
            ].map((v, i) => (
              <div key={i} style={{ background: "#fff", padding: "36px 32px" }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "rgba(11,11,11,0.2)", marginBottom: 20 }}>{v.num}</p>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", textAlign: "center", borderTop: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 16 }}>
            Ready to work together?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 32 }}>
            Book a free strategy call and let's scope your authority system.
          </p>
          <Link href="/contact">
            <span className="gb-btn" style={{ margin: "0 auto", fontSize: 14 }}>
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
