import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEOMeta from "@/components/SEOMeta";

export default function Insights() {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set(blogPosts.map(p => p.tag)))];
  const filtered = activeTag === "All" ? blogPosts : blogPosts.filter(p => p.tag === activeTag);

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

      {/* Tag filter + Posts grid */}
      <section style={{ padding: "60px 24px 100px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">

          {/* Filter bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "1.5px solid",
                  borderColor: activeTag === tag ? "#0B0B0B" : "rgba(11,11,11,0.12)",
                  background: activeTag === tag ? "#0B0B0B" : "transparent",
                  color: activeTag === tag ? "#fff" : "rgba(11,11,11,0.55)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {filtered.map((post, i) => {
              const featured = i === 0 && activeTag === "All";
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <Link href={`/insights/${post.slug}`}>
                    <div
                      style={{
                        background: featured ? "#0B0B0B" : "#F7F7F5",
                        border: featured ? "none" : "1.5px solid rgba(11,11,11,0.08)",
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
                        <span style={{
                          fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                          padding: "5px 12px", borderRadius: 100,
                          background: featured ? "rgba(255,255,255,0.15)" : "#0B0B0B",
                          color: "#fff",
                        }}>
                          {post.tag}
                        </span>
                        <span style={{ fontSize: 12, color: featured ? "rgba(255,255,255,0.35)" : "rgba(11,11,11,0.35)" }}>{post.readTime}</span>
                      </div>
                      <h2 style={{
                        fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 26px)", letterSpacing: "-0.03em",
                        lineHeight: 1.2, color: featured ? "#fff" : "#0B0B0B", marginBottom: 16, flex: 1,
                      }}>
                        {post.title}
                      </h2>
                      <p style={{
                        fontSize: 14, color: featured ? "rgba(255,255,255,0.45)" : "rgba(11,11,11,0.5)",
                        lineHeight: "1.75", marginBottom: 24,
                      }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px solid ${featured ? "rgba(255,255,255,0.08)" : "rgba(11,11,11,0.08)"}` }}>
                        <span style={{ fontSize: 12, color: featured ? "rgba(255,255,255,0.3)" : "rgba(11,11,11,0.35)" }}>{post.date}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: featured ? "rgba(255,255,255,0.8)" : "#0B0B0B" }}>
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
