import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEOMeta from "@/components/SEOMeta";

function renderMarkdown(text: string) {
  const lines = text.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} style={{ height: 8 }} />);
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginTop: 48, marginBottom: 16, lineHeight: 1.2 }}>
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ fontWeight: 700, fontSize: "clamp(18px, 2.5vw, 22px)", letterSpacing: "-0.02em", color: "#0B0B0B", marginTop: 32, marginBottom: 12, lineHeight: 1.3 }}>
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(
        <p key={key++} style={{ fontWeight: 700, fontSize: 16, color: "#0B0B0B", marginBottom: 12, lineHeight: 1.7 }}>
          {trimmed.slice(2, -2)}
        </p>
      );
    } else {
      elements.push(
        <p key={key++} style={{ fontSize: 17, color: "rgba(11,11,11,0.65)", lineHeight: "1.85", marginBottom: 16 }}>
          {trimmed}
        </p>
      );
    }
  }

  return elements;
}

function splitContent(content: string): { preview: string; locked: string } {
  const lines = content.trim().split("\n");
  let h2Count = 0;
  let splitIndex = Math.floor(lines.length * 0.5);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("## ")) {
      h2Count++;
      if (h2Count === 2) { splitIndex = i; break; }
    }
  }
  return {
    preview: lines.slice(0, splitIndex).join("\n"),
    locked: lines.slice(splitIndex).join("\n"),
  };
}

export default function InsightDetail() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const otherPosts = blogPosts.filter((p) => p.slug !== params.slug);

  const [email, setEmail]       = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [busy, setBusy]         = useState(false);

  const handleUnlock = async () => {
    if (!email.includes("@")) return;
    setBusy(true);
    try {
      await fetch(`${import.meta.env.BASE_URL}api/forms/newsletter`.replace(/\/\//g, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `Insight: ${post?.title}` }),
      });
    } catch { /* silently continue */ }
    setUnlocked(true);
    setBusy(false);
  };

  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 12 }}>Post not found</h1>
          <Link href="/insights">
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0B0B0B", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const { preview, locked } = splitContent(post.content);

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title={`${post.title} - GrowitBuddy`}
        description={post.excerpt}
      />

      {/* Header */}
      <section style={{ paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[760px] mx-auto">
          <Link href="/insights">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.4)", cursor: "pointer", marginBottom: 32 }}>
              <ArrowLeft className="w-4 h-4" /> All Insights
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100, background: "#0B0B0B", color: "#fff" }}>
              {post.tag}
            </span>
            <span style={{ fontSize: 12, color: "rgba(11,11,11,0.35)" }}>{post.readTime}</span>
            <span style={{ fontSize: 12, color: "rgba(11,11,11,0.35)" }}>·</span>
            <span style={{ fontSize: 12, color: "rgba(11,11,11,0.35)" }}>{post.date}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.04em", lineHeight: "1.08", color: "#0B0B0B", marginBottom: 24 }}
          >
            {post.title}
          </motion.h1>
          <p style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>{post.excerpt}</p>
        </div>
      </section>

      {/* Content — preview (always visible) */}
      <section style={{ padding: "64px 24px 0" }}>
        <div className="max-w-[760px] mx-auto">
          {renderMarkdown(preview)}
        </div>
      </section>

      {/* Newsletter gate or full content */}
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div key="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative" }}>
            {/* Blurred locked preview */}
            <div style={{ padding: "0 24px 0", pointerEvents: "none", userSelect: "none", filter: "blur(6px)", opacity: 0.4, maxHeight: 260, overflow: "hidden" }}>
              <div className="max-w-[760px] mx-auto" style={{ paddingTop: 24 }}>
                {renderMarkdown(locked)}
              </div>
            </div>

            {/* Fade + gate card */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(to bottom, rgba(247,247,245,0) 0%, rgba(247,247,245,0.97) 30%)",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              paddingBottom: 0,
            }}>
            </div>

            {/* Gate card below */}
            <div style={{ padding: "0 24px 80px", marginTop: -8 }}>
              <div className="max-w-[760px] mx-auto">
                <div style={{ background: "#fff", border: "2px solid #0B0B0B", borderRadius: 24, padding: "40px 36px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="#fff" strokeWidth="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "clamp(20px, 3vw, 26px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 10, lineHeight: 1.2 }}>
                    Continue reading — free
                  </h3>
                  <p style={{ fontSize: 15, color: "rgba(11,11,11,0.5)", lineHeight: "1.7", marginBottom: 28, maxWidth: "40ch", margin: "0 auto 28px" }}>
                    Join the GrowitBuddy newsletter and unlock the full article instantly. Weekly frameworks on building authority.
                  </p>
                  <div style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto", flexDirection: "column" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleUnlock(); }}
                      placeholder="Your email address"
                      style={{
                        width: "100%", boxSizing: "border-box", padding: "14px 18px", borderRadius: 12,
                        border: "1.5px solid rgba(11,11,11,0.15)", background: "#F7F7F5",
                        fontSize: 15, fontFamily: "'Inter', sans-serif", color: "#0B0B0B", outline: "none",
                      }}
                    />
                    <button
                      onClick={handleUnlock}
                      disabled={busy || !email.includes("@")}
                      style={{
                        width: "100%", padding: "14px 0", borderRadius: 12,
                        background: email.includes("@") ? "#0B0B0B" : "rgba(11,11,11,0.15)",
                        color: "#fff", fontSize: 15, fontWeight: 700,
                        cursor: email.includes("@") ? "pointer" : "default",
                        border: "none", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                    >
                      {busy ? "Unlocking..." : "Unlock Full Article"}
                      {!busy && <ArrowRight style={{ width: 16, height: 16 }} />}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(11,11,11,0.3)", marginTop: 14 }}>No spam. Unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="unlocked" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <section style={{ padding: "0 24px 80px" }}>
              <div className="max-w-[760px] mx-auto" style={{ paddingTop: 24 }}>
                {renderMarkdown(locked)}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section style={{ padding: "60px 24px 80px", background: "#0B0B0B" }}>
          <div className="max-w-[1100px] mx-auto">
            <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.04em", color: "#fff", marginBottom: 32 }}>More Insights</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px", cursor: "pointer", transition: "border-color 0.2s" }} className="hover:border-[rgba(255,255,255,0.25)]">
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", display: "inline-block", marginBottom: 16 }}>{p.tag}</span>
                    <h3 style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>{p.excerpt}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 16, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
