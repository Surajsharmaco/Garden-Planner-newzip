import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEOMeta from "@/components/SEOMeta";

const ARTICLE_CSS = `
.article-body { font-family: Inter, sans-serif; }
.article-body p { font-size: 17px; color: rgba(11,11,11,0.68); line-height: 1.9; margin-bottom: 20px; }
.article-body h1 { font-weight: 900; font-size: clamp(28px, 4vw, 42px); letter-spacing: -0.04em; color: #0B0B0B; margin-top: 56px; margin-bottom: 20px; line-height: 1.1; }
.article-body h2 { font-weight: 800; font-size: clamp(22px, 3vw, 28px); letter-spacing: -0.03em; color: #0B0B0B; margin-top: 56px; margin-bottom: 20px; line-height: 1.25; padding-bottom: 12px; border-bottom: 2px solid rgba(11,11,11,0.06); }
.article-body h3 { font-weight: 700; font-size: clamp(17px, 2vw, 21px); letter-spacing: -0.02em; color: #0B0B0B; margin-top: 36px; margin-bottom: 12px; line-height: 1.35; }
.article-body h4 { font-weight: 700; font-size: 17px; color: #0B0B0B; margin-top: 28px; margin-bottom: 10px; }
.article-body blockquote { margin: 32px 0; padding: 20px 24px; border-left: 3px solid #0B0B0B; background: rgba(11,11,11,0.03); border-radius: 0 12px 12px 0; }
.article-body blockquote p, .article-body blockquote { font-size: 18px; font-weight: 600; color: #0B0B0B; line-height: 1.7; font-style: italic; margin: 0; }
.article-body ul { margin: 24px 0; padding-left: 22px; list-style: disc; }
.article-body ol { margin: 24px 0; padding-left: 22px; list-style: decimal; }
.article-body li { font-size: 17px; color: rgba(11,11,11,0.7); line-height: 1.8; margin-bottom: 12px; padding-left: 4px; }
.article-body strong { font-weight: 700; color: #0B0B0B; }
.article-body em { font-style: italic; }
.article-body a { color: #0B0B0B; text-decoration: underline; }
.article-body hr { border: none; border-top: 1.5px solid rgba(11,11,11,0.1); margin: 40px 0; }
`;

function isHtml(text: string): boolean {
  return /<(h[1-6]|p|blockquote|ul|ol|li|strong|em|br)\b/i.test(text);
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={i++}>{text.slice(last, match.index)}</span>);
    if (match[2]) parts.push(<strong key={i++} style={{ fontWeight: 700, color: "#0B0B0B" }}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={i++}>{match[3]}</em>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(<span key={i++}>{text.slice(last)}</span>);
  return parts;
}

function renderMarkdown(text: string): React.ReactElement[] {
  const lines = text.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginTop: 56, marginBottom: 20, lineHeight: 1.25, paddingBottom: 12, borderBottom: "2px solid rgba(11,11,11,0.06)" }}>
          {trimmed.slice(3)}
        </h2>
      );
      i++; continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ fontWeight: 700, fontSize: "clamp(17px, 2vw, 20px)", letterSpacing: "-0.02em", color: "#0B0B0B", marginTop: 36, marginBottom: 12, lineHeight: 1.35 }}>
          {trimmed.slice(4)}
        </h3>
      );
      i++; continue;
    }

    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} style={{ margin: "32px 0", paddingLeft: 24, borderLeft: "3px solid #0B0B0B", background: "rgba(11,11,11,0.03)", borderRadius: "0 12px 12px 0", padding: "20px 24px", display: "block" }}>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#0B0B0B", lineHeight: "1.7", fontStyle: "italic", margin: 0 }}>
            {parseInline(trimmed.slice(2))}
          </p>
        </blockquote>
      );
      i++; continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} style={{ margin: "24px 0", paddingLeft: 0, listStyle: "none" }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ display: "flex", gap: 16, marginBottom: 14, fontSize: 17, color: "rgba(11,11,11,0.7)", lineHeight: "1.75" }}>
              <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#0B0B0B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, marginTop: 1 }}>{idx + 1}</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} style={{ margin: "24px 0", paddingLeft: 0, listStyle: "none" }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ display: "flex", gap: 14, marginBottom: 12, fontSize: 17, color: "rgba(11,11,11,0.7)", lineHeight: "1.75" }}>
              <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#0B0B0B", marginTop: 11 }} />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    elements.push(
      <p key={key++} style={{ fontSize: 17, color: "rgba(11,11,11,0.68)", lineHeight: "1.9", marginBottom: 20 }}>
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "rgba(11,11,11,0.08)", zIndex: 1000, pointerEvents: "none" }}>
      <motion.div style={{ height: "100%", background: "#0B0B0B", width: `${progress}%`, transition: "width 0.1s linear" }} />
    </div>
  );
}

export default function InsightDetail() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const related = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    const existing = document.getElementById("article-styles");
    if (!existing) {
      const s = document.createElement("style");
      s.id = "article-styles";
      s.textContent = ARTICLE_CSS;
      document.head.appendChild(s);
    }
    return () => { document.getElementById("article-styles")?.remove(); };
  }, [params.slug]);

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
      <ReadingProgress />
      <SEOMeta title={`${post.title} - GrowitBuddy`} description={post.excerpt} />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: 0, background: "#fff" }}>
        <div className="max-w-[760px] mx-auto px-6">
          <Link href="/insights">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.38)", cursor: "pointer", marginBottom: 36, letterSpacing: "0.01em" }}>
              <ArrowLeft className="w-3.5 h-3.5" /> All Insights
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 13px", borderRadius: 100, background: "#0B0B0B", color: "#fff" }}>
              {post.tag}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(11,11,11,0.38)", fontWeight: 500 }}>
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(11,11,11,0.38)", fontWeight: 500 }}>
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontWeight: 900, fontSize: "clamp(30px, 5vw, 52px)", letterSpacing: "-0.04em", lineHeight: "1.1", color: "#0B0B0B", marginBottom: 22 }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 19, color: "rgba(11,11,11,0.5)", lineHeight: "1.7", marginBottom: 40, fontWeight: 400 }}
          >
            {post.excerpt}
          </motion.p>
        </div>

        {/* Featured image — contained, rounded */}
        {post.featuredImage && (
          <div className="max-w-[900px] mx-auto px-6" style={{ paddingBottom: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ borderRadius: 20, overflow: "hidden", background: "#e8e8e6", aspectRatio: "16/7", boxShadow: "0 4px 40px rgba(11,11,11,0.10)" }}
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          </div>
        )}

        <div style={{ height: 1, background: "rgba(11,11,11,0.07)", marginTop: post.featuredImage ? 40 : 0 }} />
      </section>

      {/* Article body */}
      <section style={{ padding: "64px 24px 80px", background: "#fff" }}>
        <div className="article-body max-w-[680px] mx-auto">
          {isHtml(post.content)
            ? <div dangerouslySetInnerHTML={{ __html: post.content }} />
            : renderMarkdown(post.content)
          }

          {/* End-of-article CTA */}
          <div style={{ marginTop: 64, padding: "36px 40px", background: "#0B0B0B", borderRadius: 20, textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Ready to build your authority?</p>
            <h3 style={{ fontWeight: 800, fontSize: "clamp(20px, 3vw, 26px)", letterSpacing: "-0.03em", color: "#fff", marginBottom: 20, lineHeight: 1.25 }}>
              Turn your expertise into consistent inbound demand.
            </h3>
            <Link href="/authority-audit">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0B0B0B", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 100, cursor: "pointer", letterSpacing: "-0.01em" }}>
                Get your free audit <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: "64px 24px 80px", background: "#F7F7F5", borderTop: "1px solid rgba(11,11,11,0.07)" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 12 }}>Continue reading</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 36 }}>More Insights</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 16 }}>
              {related.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <Link href={`/insights/${p.slug}`}>
                    <div
                      style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.07)", borderRadius: 18, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", height: "100%", display: "flex", flexDirection: "column" }}
                      className="hover:-translate-y-1 hover:shadow-md"
                    >
                      {p.featuredImage && (
                        <div style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
                          <img src={p.featuredImage} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                      )}
                      <div style={{ padding: "22px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, background: "#0B0B0B", color: "#fff" }}>{p.tag}</span>
                          <span style={{ fontSize: 11, color: "rgba(11,11,11,0.35)" }}>{p.readTime}</span>
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: "#0B0B0B", marginBottom: 8, lineHeight: 1.35, flex: 1 }}>{p.title}</h3>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: 13, fontWeight: 700, color: "rgba(11,11,11,0.5)" }}>
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
      )}
    </div>
  );
}
