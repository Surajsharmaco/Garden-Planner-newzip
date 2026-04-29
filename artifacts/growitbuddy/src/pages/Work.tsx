import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import CountUp from "@/components/effects/CountUp";
import SEOMeta from "@/components/SEOMeta";
import { usePublicContent } from "@/hooks/usePublicContent";

interface WorkStat { label: string; value: string; }

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  stats: WorkStat[];
  imageUrl: string;
}

interface NetworkMember {
  id: string;
  name: string;
  platform: string;
  followers: string;
  imageUrl: string;
}

interface ClientLogo {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProofMedia {
  screenshots: string[];
  videoUrl: string;
}

interface WorkData {
  headline: string;
  subtext: string;
  hookHeadline: string;
  hookSubtext: string;
  items: WorkItem[];
  network: NetworkMember[];
  proof: ProofMedia;
  clients: ClientLogo[];
  ctaHeading: string;
  ctaSubtext: string;
  ctaButtonLink: string;
  ctaButtonText: string;
  brandLine: string;
}

const DEFAULTS: WorkData = {
  headline: "Proof of authority at scale.",
  subtext: "Our clients expect outcomes. We measure our success by theirs. Here's the proof.",
  hookHeadline: "Most content fails because it never gets distributed.",
  hookSubtext: "We don't just create content — we build systems that amplify it.",
  items: [
    { id: "1", title: "Tech Founder to Industry Voice", subtitle: "LinkedIn Authority Campaign", category: "B2B SaaS · LinkedIn", metric: "14M", metricLabel: "impressions", description: "A full content marketing system took this founder from zero online presence to the most-cited authority in their SaaS niche - in 6 months.", tags: ["LinkedIn", "B2B SaaS"], stats: [], imageUrl: "" },
    { id: "2", title: "Agency Owner Authority Engine", subtitle: "Multi-channel content strategy", category: "Services · Multi-channel", metric: "$2.4M", metricLabel: "inbound pipeline", description: "A systematic content strategy and distribution system drove inbound pipeline that exceeded prior annual revenue.", tags: ["Content Strategy"], stats: [], imageUrl: "" },
    { id: "3", title: "Creator Monetization System", subtitle: "YouTube authority build", category: "Creator Economy · YouTube", metric: "250K", metricLabel: "subscribers", description: "A content strategy built around a proprietary framework compounded into 250K subscribers and $40K/mo in revenue.", tags: ["YouTube", "Creator"], stats: [], imageUrl: "" },
    { id: "4", title: "Executive Personal Brand", subtitle: "Podcast & PR strategy", category: "Leadership · Podcast & PR", metric: "15+", metricLabel: "speaking invites / qtr", description: "Personal branding strategy turned a quiet operator into a recognized industry thought leader with consistent media placement.", tags: ["Personal Brand", "PR"], stats: [], imageUrl: "" },
    { id: "5", title: "E-commerce Founder Growth", subtitle: "X / Twitter brand build", category: "E-commerce · X / Twitter", metric: "400%", metricLabel: "branded search growth", description: "A personal brand-first content marketing approach made this founder synonymous with their product category.", tags: ["X / Twitter", "E-commerce"], stats: [], imageUrl: "" },
    { id: "6", title: "VC Authority Engine", subtitle: "LinkedIn positioning", category: "Finance · LinkedIn", metric: "3x", metricLabel: "deal flow growth", description: "Content strategy and personal branding positioned this venture firm as the category expert - attracting better deals at higher velocity.", tags: ["Finance", "LinkedIn"], stats: [], imageUrl: "" },
  ],
  network: [
    { id: "1", name: "Tech Insiders", platform: "LinkedIn Page", followers: "280K", imageUrl: "" },
    { id: "2", name: "Startup Daily", platform: "Instagram", followers: "415K", imageUrl: "" },
    { id: "3", name: "Growth Lab", platform: "YouTube", followers: "190K", imageUrl: "" },
    { id: "4", name: "Founder Files", platform: "X / Twitter", followers: "320K", imageUrl: "" },
    { id: "5", name: "SaaS Weekly", platform: "Newsletter", followers: "85K", imageUrl: "" },
    { id: "6", name: "Brand Authority", platform: "Facebook Page", followers: "510K", imageUrl: "" },
  ],
  proof: { screenshots: [], videoUrl: "" },
  clients: [
    { id: "1", name: "TechVenture", imageUrl: "" },
    { id: "2", name: "GrowthCo", imageUrl: "" },
    { id: "3", name: "ScaleUp", imageUrl: "" },
    { id: "4", name: "FounderBrand", imageUrl: "" },
    { id: "5", name: "Authority Labs", imageUrl: "" },
    { id: "6", name: "ContentPro", imageUrl: "" },
  ],
  ctaHeading: "Want to see exactly how this works?",
  ctaSubtext: "If you want a deeper look at our work, case histories, and the systems behind these results — book a strategy call.",
  ctaButtonLink: "/contact",
  ctaButtonText: "Book a Strategy Call",
  brandLine: "Content creates. Distribution multiplies.",
};

export default function Work() {
  const data = usePublicContent<WorkData>("work", DEFAULTS);
  const [proofOpen, setProofOpen] = useState(false);

  const network = (data.network && data.network.length > 0) ? data.network : DEFAULTS.network;
  const clients = (data.clients && data.clients.length > 0) ? data.clients : DEFAULTS.clients;
  const proof = data.proof ?? DEFAULTS.proof;
  const hookHeadline = data.hookHeadline || DEFAULTS.hookHeadline;
  const hookSubtext = data.hookSubtext || DEFAULTS.hookSubtext;
  const ctaHeading = data.ctaHeading || DEFAULTS.ctaHeading;
  const ctaSubtext = data.ctaSubtext || DEFAULTS.ctaSubtext;
  const ctaButtonLink = data.ctaButtonLink || DEFAULTS.ctaButtonLink;
  const ctaButtonText = data.ctaButtonText || DEFAULTS.ctaButtonText;
  const brandLine = data.brandLine || DEFAULTS.brandLine;

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Content Marketing Results | Case Studies | GrowitBuddy"
        description="Real content marketing results from GrowitBuddy. Case studies showing inbound growth, brand authority, and pipeline generated for founders, creators, and growing brands."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Work</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "14ch", marginBottom: 24 }}
          >
            {data.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            {data.subtext}
          </motion.p>
        </div>
      </section>

      {/* Hook Section */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <div className="max-w-[760px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ fontWeight: 800, fontSize: "clamp(26px, 5vw, 50px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.15, marginBottom: 20 }}
          >
            {hookHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}
          >
            {hookSubtext}
          </motion.p>
        </div>
      </section>

      {/* Cases grid */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.items.map((item, i) => {
            const dark = i % 2 === 0 && i % 3 !== 1;
            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                whileHover={{ y: -5, boxShadow: dark ? "0 20px 48px rgba(0,0,0,0.35)" : "0 20px 48px rgba(11,11,11,0.1)" }}
                style={{
                  padding: "36px 32px",
                  borderRadius: 20,
                  background: dark ? "#0B0B0B" : "#F7F7F5",
                  border: dark ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  cursor: "pointer",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
              >
                {item.imageUrl && (
                  <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
                    <img src={item.imageUrl} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)", marginBottom: 28 }}>{item.category}</p>
                <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: dark ? "#fff" : "#0B0B0B", lineHeight: 1, marginBottom: 4 }}>
                  <CountUp value={item.metric} />
                </div>
                <p style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.4)", marginBottom: 20 }}>{item.metricLabel}</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: dark ? "#fff" : "#0B0B0B", lineHeight: 1.35, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: dark ? "rgba(255,255,255,0.4)" : "rgba(11,11,11,0.5)", lineHeight: "1.7" }}>{item.description}</p>
                {item.stats && item.stats.length > 0 && (
                  <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {item.stats.map((stat, si) => (
                      <div key={si}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: dark ? "#fff" : "#0B0B0B", letterSpacing: "-0.02em" }}>{stat.value}</p>
                        <p style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.4)", marginTop: 2 }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Network Section */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", borderTop: "1px solid rgba(11,11,11,0.06)" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 14 }}>Distribution Network</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.15, maxWidth: "22ch", marginBottom: 12 }}>
              We don't rely on algorithms alone — we leverage distribution.
            </h2>
          </motion.div>

          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {network.map((member, i) => (
              <motion.div
                key={member.id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  flexShrink: 0,
                  width: 200,
                  padding: "28px 24px",
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 20,
                  textAlign: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
              >
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    loading="lazy"
                    style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px" }}
                  />
                ) : (
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "#0B0B0B", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em",
                    margin: "0 auto 16px",
                  }}>
                    {member.name.charAt(0)}
                  </div>
                )}
                <p style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1 }}>{member.followers}</p>
                <p style={{ fontSize: 12, color: "rgba(11,11,11,0.4)", marginTop: 4, marginBottom: 8 }}>followers</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0B0B0B", lineHeight: 1.3 }}>{member.name}</p>
                <p style={{ fontSize: 11, color: "rgba(11,11,11,0.35)", marginTop: 4 }}>{member.platform}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* View Proof Button */}
      <section style={{ padding: "64px 24px", background: "#fff", textAlign: "center", borderTop: "1px solid rgba(11,11,11,0.06)" }}>
        <div className="max-w-[600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: 13, color: "rgba(11,11,11,0.4)", marginBottom: 20, lineHeight: 1.6 }}>
              Numbers don't lie. We let our data speak.
            </p>
            <button
              onClick={() => setProofOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#0B0B0B", color: "#fff",
                fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                padding: "14px 28px", borderRadius: 100,
                border: "none", cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              👉 View Real Data
            </button>
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", borderTop: "1px solid rgba(11,11,11,0.06)" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 52 }}
          >
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 12 }}>Our Clients</h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.45)", lineHeight: 1.7 }}>Brands don't just work with us — they stay.</p>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {clients.map((client, i) => (
              <motion.div
                key={client.id || i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  width: 160, height: 72,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                  borderRadius: 14,
                  filter: "grayscale(1)",
                  opacity: 0.7,
                  transition: "filter 0.3s, opacity 0.3s, transform 0.2s",
                  cursor: "default",
                  overflow: "hidden",
                }}
                whileHover={{ scale: 1.04 }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.filter = "grayscale(0)";
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.filter = "grayscale(1)";
                  (e.currentTarget as HTMLElement).style.opacity = "0.7";
                }}
              >
                {client.imageUrl ? (
                  <img src={client.imageUrl} alt={client.name} loading="lazy" style={{ maxWidth: "80%", maxHeight: "60%", objectFit: "contain" }} />
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: "#0B0B0B" }}>{client.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Block */}
      <section style={{ padding: "80px 24px", background: "#fff", borderTop: "1px solid rgba(11,11,11,0.06)" }}>
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(135deg, #F7F7F5 0%, #fff 60%)",
              border: "1.5px solid rgba(11,11,11,0.1)",
              borderRadius: 28,
              padding: "56px 48px",
              textAlign: "center",
              boxShadow: "0 4px 40px rgba(11,11,11,0.05)",
            }}
          >
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.2, marginBottom: 16 }}>
              {ctaHeading}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: 1.75, marginBottom: 36, maxWidth: "44ch", margin: "0 auto 36px" }}>
              {ctaSubtext}
            </p>
            <Link href={ctaButtonLink}>
              <span
                className="gb-btn"
                style={{ margin: "0 auto", fontSize: 14, display: "inline-flex" }}
              >
                {ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(11,11,11,0.25)", marginTop: 24 }}>
              Only for serious brands looking to scale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Tagline */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontWeight: 800,
            fontSize: "clamp(24px, 5vw, 56px)",
            letterSpacing: "-0.04em",
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          {brandLine}
        </motion.p>
      </section>

      {/* Proof Modal */}
      <AnimatePresence>
        {proofOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setProofOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
              zIndex: 1000, display: "flex", alignItems: "center",
              justifyContent: "center", padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "#fff", borderRadius: 24, padding: "40px 40px",
                maxWidth: 820, width: "100%", maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 4 }}>Real Data & Results</h3>
                  <p style={{ fontSize: 13, color: "rgba(11,11,11,0.4)" }}>Screenshots and dashboard data from client accounts</p>
                </div>
                <button
                  onClick={() => setProofOpen(false)}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(11,11,11,0.06)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <X size={16} color="#0B0B0B" />
                </button>
              </div>

              {proof.screenshots && proof.screenshots.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                  {proof.screenshots.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Proof ${i + 1}`}
                      loading="lazy"
                      style={{ width: "100%", borderRadius: 12, border: "1px solid rgba(11,11,11,0.08)", display: "block" }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: "48px 24px", textAlign: "center",
                  background: "#F7F7F5", borderRadius: 16,
                  border: "1.5px dashed rgba(11,11,11,0.12)",
                }}>
                  <p style={{ fontSize: 14, color: "rgba(11,11,11,0.4)", lineHeight: 1.7 }}>
                    Proof screenshots and dashboard data coming soon.<br />Upload media in the admin panel to display here.
                  </p>
                </div>
              )}

              {proof.videoUrl && (
                <div style={{ marginTop: 24 }}>
                  <video
                    src={proof.videoUrl}
                    controls
                    style={{ width: "100%", borderRadius: 14, background: "#000", display: "block" }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
