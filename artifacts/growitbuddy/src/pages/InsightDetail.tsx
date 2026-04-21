import React from "react";
import { motion } from "framer-motion";
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

export default function InsightDetail() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const otherPosts = blogPosts.filter((p) => p.slug !== params.slug);

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

      {/* Content */}
      <section style={{ padding: "64px 24px 80px" }}>
        <div className="max-w-[760px] mx-auto">
          {renderMarkdown(post.content)}
        </div>
      </section>

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
