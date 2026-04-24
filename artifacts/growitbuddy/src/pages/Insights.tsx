import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEOMeta from "@/components/SEOMeta";

export default function Insights() {
  const [email, setEmail]     = useState("");
  const [done, setDone]       = useState(false);
  const [busy, setBusy]       = useState(false);

  const handleSubscribe = async () => {
    if (!email.includes("@")) return;
    setBusy(true);
    try {
      await fetch(`${import.meta.env.BASE_URL}api/forms/newsletter`.replace(/\/\//g, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Insights Page" }),
      });
    } catch { /* silently continue */ }
    setDone(true);
    setBusy(false);
  };

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Insights - GrowitBuddy"
        description="Frameworks, strategies and strong opinions on building unignorable influence and authority as a founder or creator."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Insights</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Thoughts on building authority.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Frameworks, strategies, and strong opinions on building unignorable influence as a founder or creator.
          </motion.p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link href={`/insights/${post.slug}`}>
                  <div
                    style={{
                      background: i === 0 ? "#0B0B0B" : "#F7F7F5",
                      border: i === 0 ? "none" : "1.5px solid rgba(11,11,11,0.08)",
                      borderRadius: 20,
                      padding: "36px 32px",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          borderRadius: 100,
                          background: i === 0 ? "rgba(255,255,255,0.15)" : "#0B0B0B",
                          color: i === 0 ? "#fff" : "#fff",
                        }}
                      >
                        {post.tag}
                      </span>
                      <span style={{ fontSize: 12, color: i === 0 ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.35)" }}>{post.readTime}</span>
                    </div>
                    <h2
                      style={{
                        fontWeight: 800,
                        fontSize: "clamp(20px, 2.5vw, 26px)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                        color: i === 0 ? "#fff" : "#0B0B0B",
                        marginBottom: 16,
                        flex: 1,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 14,
                        color: i === 0 ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)",
                        lineHeight: "1.75",
                        marginBottom: 24,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px solid ${i === 0 ? "rgba(255,255,255,0.08)" : "rgba(11,11,11,0.08)"}` }}>
                      <span style={{ fontSize: 12, color: i === 0 ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)" }}>{post.date}</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          fontWeight: 700,
                          color: i === 0 ? "rgba(255,255,255,0.8)" : "#0B0B0B",
                        }}
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", textAlign: "center" }}>
        <div className="max-w-[520px] mx-auto">
          <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.04em", color: "#fff", marginBottom: 16 }}>
            Get insights in your inbox.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 32 }}>
            Weekly frameworks and strategies on building authority as a founder. No noise. Just signal.
          </p>
          {done ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 24px", display: "inline-block" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: 0 }}>You're in. First issue coming soon.</p>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420, margin: "0 auto" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSubscribe(); }}
                placeholder="Your email address"
                style={{
                  width: "100%", boxSizing: "border-box", padding: "14px 18px", borderRadius: 12,
                  border: "1.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
                  fontSize: 15, fontFamily: "'Inter', sans-serif", color: "#fff", outline: "none",
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={busy || !email.includes("@")}
                style={{
                  width: "100%", padding: "14px 0", borderRadius: 12,
                  background: email.includes("@") ? "#fff" : "rgba(255,255,255,0.15)",
                  color: email.includes("@") ? "#0B0B0B" : "rgba(255,255,255,0.4)",
                  fontSize: 15, fontWeight: 700, cursor: email.includes("@") ? "pointer" : "default",
                  border: "none", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {busy ? "Subscribing..." : "Subscribe to the Newsletter"}
                {!busy && <ArrowRight style={{ width: 16, height: 16 }} />}
              </button>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>No spam. Unsubscribe anytime.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
