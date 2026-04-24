import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { influencers } from "@/data/influencers";
import SEOMeta from "@/components/SEOMeta";

export default function InfluencerExplore() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Explore Influencers - GrowitBuddy"
        description="Discover proven influencers and content creators who build real engagement and drive meaningful results for ambitious brands."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Influencer Network</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 24 }}
          >
            Work With Proven Influencers.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch", marginBottom: 36 }}
          >
            Discover creators who build real engagement and drive meaningful results — not just impressions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <Link href="/creators">
              <span className="gb-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Join as Influencer
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {influencers.map((inf, i) => (
              <motion.div
                key={inf.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link href={`/influencers/${inf.slug}`}>
                  <div
                    style={{
                      background: "#fff",
                      border: "1.5px solid rgba(11,11,11,0.08)",
                      borderRadius: 20,
                      padding: "28px",
                      cursor: "pointer",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    className="hover:border-black/20 hover:shadow-lg group"
                  >
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: inf.accentColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 17,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {inf.initials}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 16, color: "#0B0B0B", letterSpacing: "-0.02em", marginBottom: 2 }}>{inf.name}</p>
                        <p style={{ fontSize: 13, color: "rgba(11,11,11,0.4)", fontWeight: 500 }}>{inf.username}</p>
                      </div>
                    </div>

                    {/* Niche tag */}
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(11,11,11,0.45)", background: "rgba(11,11,11,0.06)", borderRadius: 100, padding: "4px 10px" }}>
                        {inf.niche}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: 14, color: "rgba(11,11,11,0.6)", lineHeight: "1.65", marginBottom: 24 }}>
                      {inf.description}
                    </p>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                      <div style={{ background: "#F7F7F5", borderRadius: 12, padding: "12px 14px" }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 4 }}>Followers</p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: "#0B0B0B", letterSpacing: "-0.03em" }}>{inf.followers}</p>
                      </div>
                      <div style={{ background: "#F7F7F5", borderRadius: 12, padding: "12px 14px" }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 4 }}>Engagement</p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: "#0B0B0B", letterSpacing: "-0.03em" }}>{inf.engagementRate}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#0B0B0B" }}
                      className="group-hover:gap-3 transition-all"
                    >
                      View Profile
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ background: "#0B0B0B", borderRadius: 24, padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Are you a creator?</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, maxWidth: "20ch" }}>
              Ready to Get Discovered?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: "44ch", lineHeight: 1.7 }}>
              Apply to join the Influencer Network. Get reviewed, get listed, and unlock real brand opportunities.
            </p>
            <Link href="/creators">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0B0B0B", fontWeight: 700, fontSize: 14, borderRadius: 100, padding: "12px 24px", cursor: "pointer" }}>
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
