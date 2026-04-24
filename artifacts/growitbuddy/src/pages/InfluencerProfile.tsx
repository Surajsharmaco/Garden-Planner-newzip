import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { influencers } from "@/data/influencers";
import SEOMeta from "@/components/SEOMeta";

export default function InfluencerProfile() {
  const { slug } = useParams<{ slug: string }>();
  const inf = influencers.find((i) => i.slug === slug);

  if (!inf) {
    return (
      <div style={{ background: "#F7F7F5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, fontFamily: "'Inter', sans-serif" }}>
        <p style={{ fontSize: 14, color: "rgba(11,11,11,0.4)" }}>Influencer not found.</p>
        <Link href="/influencers">
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0B0B0B", textDecoration: "underline", cursor: "pointer" }}>Back to Explore</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title={`${inf.name} - GrowitBuddy Influencer Network`}
        description={inf.description}
      />

      {/* Back */}
      <div style={{ paddingTop: 88, paddingLeft: 24, paddingRight: 24 }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/influencers">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.45)", cursor: "pointer" }} className="hover:text-black transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Influencers
            </span>
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <section style={{ paddingTop: 32, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: inf.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  flexShrink: 0,
                }}
              >
                {inf.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 8 }}>{inf.niche}</p>
                <h1 style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.05, marginBottom: 6 }}>{inf.name}</h1>
                <p style={{ fontSize: 16, color: "rgba(11,11,11,0.45)", fontWeight: 500, marginBottom: 16 }}>{inf.username}</p>
                <p style={{ fontSize: 16, color: "rgba(11,11,11,0.6)", lineHeight: "1.7", maxWidth: "60ch" }}>{inf.description}</p>
              </div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              {[
                { label: "Followers", value: inf.followers },
                { label: "Engagement Rate", value: inf.engagementRate },
                { label: "Avg Views", value: inf.metrics.avgViews },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 14, padding: "16px 24px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 6 }}>{stat.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#0B0B0B", letterSpacing: "-0.03em" }}>{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "64px 24px" }}>
        <div className="max-w-[1100px] mx-auto" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "36px" }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 20 }}>About</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.4)", marginBottom: 8 }}>What they create</p>
                <p style={{ fontSize: 15, color: "#0B0B0B", lineHeight: "1.7" }}>{inf.about.creates}</p>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.4)", marginBottom: 8 }}>Audience type</p>
                <p style={{ fontSize: 15, color: "#0B0B0B", lineHeight: "1.7" }}>{inf.about.audience}</p>
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "#0B0B0B", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "36px" }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Performance Metrics</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {[
                { label: "Avg Views", value: inf.metrics.avgViews },
                { label: "Engagement Rate", value: inf.metrics.engagementRate },
                { label: "Audience Location", value: inf.metrics.audienceLocation },
              ].map((m) => (
                <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{m.label}</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{m.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Past Work + Services */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>

            {/* Past Work */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "32px" }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 20 }}>Past Work</p>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.4)", marginBottom: 12 }}>Brands Worked With</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {inf.pastWork.brands.map((brand) => (
                    <span key={brand} style={{ fontSize: 12, fontWeight: 700, color: "#0B0B0B", background: "#F7F7F5", border: "1px solid rgba(11,11,11,0.1)", borderRadius: 100, padding: "4px 12px" }}>
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.4)", marginBottom: 12 }}>Sample Content</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {inf.pastWork.sampleContent.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <Check className="w-3 h-3" style={{ color: "#0B0B0B" }} />
                      </span>
                      <p style={{ fontSize: 13, color: "rgba(11,11,11,0.65)", lineHeight: "1.6" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "32px" }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 20 }}>Services</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {inf.services.map((service) => (
                  <div key={service} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check className="w-3.5 h-3.5" style={{ color: "#fff" }} />
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0B0B0B" }}>{service}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(11,11,11,0.08)", paddingTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.4)", marginBottom: 8 }}>Audience Location</p>
                <p style={{ fontSize: 14, color: "#0B0B0B", lineHeight: "1.6" }}>{inf.metrics.audienceLocation}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "#0B0B0B", borderRadius: 24, padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}
          >
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, maxWidth: "22ch" }}>
              Work With {inf.name.split(" ")[0]}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: "44ch", lineHeight: 1.7 }}>
              Get in touch to explore collaboration opportunities, brand deals, and content partnerships.
            </p>
            <Link href="/contact">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0B0B0B", fontWeight: 700, fontSize: 14, borderRadius: 100, padding: "12px 24px", cursor: "pointer" }}>
                Work With This Influencer
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
