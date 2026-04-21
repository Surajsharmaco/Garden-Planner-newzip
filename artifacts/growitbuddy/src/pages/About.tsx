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
            We help real businesses grow with content that actually works.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "55ch" }}
          >
            We are a team of strategists, writers, and editors who help founders and creators grow their business with clear, consistent content.
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
              Good businesses deserve to be seen.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 16 }}>
              We work with founders and creators who are genuinely good at what they do but aren't getting the attention they deserve. We fix that with content that speaks to the right people.
            </p>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 32 }}>
              We plan, create, and manage your content - so you grow consistently without spending all your time on it.
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
                "I started GrowitBuddy because the best founders I knew were being ignored - not because of talent, but because they didn't know how to talk about what they did."
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
                We help them change that. Today we've helped founders and creators generate over 700M+ views and bring in real business through content that actually makes sense for their goals.
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
              { title: "Results over vanity", body: "We don't chase likes or views. We focus on content that actually brings in customers and grows your business.", num: "01" },
              { title: "Simple, clear systems", body: "We build processes that are easy to follow and sustainable long-term - not complicated strategies that fall apart in a month.", num: "02" },
              { title: "Honest communication", body: "We tell you what's working and what isn't, every single month. No fluff, no excuses - just clear information and a plan forward.", num: "03" },
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
            Book a free strategy call. Let's figure out exactly how we can help you grow.
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
