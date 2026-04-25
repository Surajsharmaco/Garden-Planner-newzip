import { useEffect, useState, useRef } from "react";
import { useAdmin } from "@/context/AdminContext";
import { blogPosts as DEFAULT_POSTS, defaultSeo, type BlogPost, type PostSeo } from "@/data/blogPosts";
import { ImageCropUploader } from "@/components/admin/ImageCropUploader";
import { Card } from "@/components/admin/AdminField";
import {
  Plus, ArrowLeft, Bold, Italic, List, ListOrdered, Quote,
  Link2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Minus, FileText, Trash2, Edit2, Calendar, Globe, Lock,
  ChevronDown, ChevronUp, Search, Target, Tag, BarChart2,
  CheckCircle, AlertCircle, XCircle, Lightbulb, Share2,
  Code, HelpCircle, Eye,
} from "lucide-react";

// ─────────────────────────────────────
// SEO ANALYSIS ENGINE
// ─────────────────────────────────────

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(html: string) {
  const text = stripHtml(html);
  return text ? text.split(" ").filter(Boolean).length : 0;
}

function getKeywordDensity(content: string, keyword: string): number {
  if (!keyword || !content) return 0;
  const text = stripHtml(content).toLowerCase();
  const kw = keyword.toLowerCase();
  const words = text.split(" ").filter(Boolean);
  const matches = words.filter((w) => w.includes(kw)).length;
  return words.length ? Math.round((matches / words.length) * 1000) / 10 : 0;
}

function detectSearchIntent(keyword: string): PostSeo["searchIntent"] {
  if (!keyword) return "";
  const kw = keyword.toLowerCase();
  if (/\b(buy|price|cost|hire|get|order|service|agency|plan)\b/.test(kw)) return "transactional";
  if (/\b(best|vs|versus|review|compare|top|ranking)\b/.test(kw)) return "commercial";
  if (/\b(how|what|why|when|guide|tutorial|tips|learn|understand)\b/.test(kw)) return "informational";
  return "navigational";
}

const INTENT_LABELS: Record<string, { label: string; color: string }> = {
  informational: { label: "Informational", color: "text-blue-600 bg-blue-50" },
  transactional: { label: "Transactional", color: "text-emerald-700 bg-emerald-50" },
  commercial: { label: "Commercial", color: "text-amber-700 bg-amber-50" },
  navigational: { label: "Navigational", color: "text-purple-700 bg-purple-50" },
};

interface SeoIssue {
  key: string;
  label: string;
  status: "good" | "warn" | "error";
  tip?: string;
}

function computeSeoScore(post: BlogPost, content: string, seo: PostSeo): { score: number; issues: SeoIssue[] } {
  const text = stripHtml(content).toLowerCase();
  const title = post.title.toLowerCase();
  const kw = seo.focusKeyword.toLowerCase().trim();
  const metaDesc = seo.metaDescription.trim();
  const issues: SeoIssue[] = [];
  let score = 0;

  if (!kw) {
    return {
      score: 0,
      issues: [{ key: "kw", label: "Set a focus keyword to start SEO analysis", status: "error" }],
    };
  }

  const kwInTitle = title.includes(kw);
  score += kwInTitle ? 20 : 0;
  issues.push({ key: "title", label: "Focus keyword in post title", status: kwInTitle ? "good" : "error", tip: "Add your keyword to the title" });

  const first150 = text.split(" ").slice(0, 150).join(" ");
  const kwInFirst = first150.includes(kw);
  score += kwInFirst ? 15 : 0;
  issues.push({ key: "intro", label: "Focus keyword in introduction", status: kwInFirst ? "good" : "warn", tip: "Mention the keyword in your first paragraph" });

  const kwInMeta = metaDesc.toLowerCase().includes(kw);
  score += kwInMeta ? 10 : 0;
  issues.push({ key: "meta-kw", label: "Focus keyword in meta description", status: kwInMeta ? "good" : "warn", tip: "Include the keyword in your meta description" });

  const metaLen = metaDesc.length;
  const metaOk = metaLen >= 120 && metaLen <= 160;
  const metaWarn = metaLen > 0 && (metaLen < 120 || metaLen > 160);
  score += metaOk ? 10 : metaWarn ? 5 : 0;
  const metaStatus = metaOk ? "good" : metaLen === 0 ? "error" : "warn";
  issues.push({
    key: "meta-len",
    label: `Meta description length: ${metaLen} chars ${metaOk ? "(perfect)" : metaLen < 120 ? "(too short)" : "(too long)"}`,
    status: metaStatus,
    tip: "Aim for 120-160 characters",
  });

  const wc = wordCount(content);
  const wcScore = wc >= 1000 ? 15 : wc >= 600 ? 10 : wc >= 300 ? 5 : 0;
  score += wcScore;
  const wcStatus = wc >= 600 ? "good" : wc >= 300 ? "warn" : "error";
  issues.push({ key: "wc", label: `Word count: ${wc} words ${wc >= 600 ? "(good)" : wc >= 300 ? "(a bit short)" : "(too short)"}`, status: wcStatus, tip: "Aim for 600+ words" });

  const hasH2 = /<h2/i.test(content) || /^## /m.test(content);
  score += hasH2 ? 10 : 0;
  issues.push({ key: "headings", label: "Uses H2 / H3 headings for structure", status: hasH2 ? "good" : "warn", tip: "Break content into sections with headings" });

  const density = getKeywordDensity(content, kw);
  const densityOk = density >= 0.5 && density <= 3;
  const densityWarn = density > 3;
  score += densityOk ? 10 : 0;
  const densityStatus = densityOk ? "good" : densityWarn ? "warn" : density === 0 ? "error" : "warn";
  issues.push({
    key: "density",
    label: `Keyword density: ${density}% ${densityOk ? "(good)" : densityWarn ? "(over-optimized)" : "(too low)"}`,
    status: densityStatus,
    tip: "Aim for 0.5-3% keyword density",
  });

  const hasSeoTitle = seo.seoTitle.trim().length > 0;
  score += hasSeoTitle ? 5 : 0;
  issues.push({ key: "seo-title", label: "SEO title is set", status: hasSeoTitle ? "good" : "warn", tip: "Set a custom SEO title (can differ from post title)" });

  const hasOgImage = seo.ogImage.trim().length > 0;
  score += hasOgImage ? 5 : 0;
  issues.push({ key: "og", label: "Open Graph image set", status: hasOgImage ? "good" : "warn", tip: "Add an OG image for social sharing previews" });

  return { score, issues };
}

function readabilityAnalysis(content: string) {
  const text = stripHtml(content);
  if (!text) return { label: "No content", score: 0, avgWords: 0 };
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(" ").filter(Boolean);
  const avgWords = sentences.length ? Math.round(words.length / sentences.length) : 0;
  let score = 100;
  if (avgWords > 25) score -= 30;
  else if (avgWords > 20) score -= 15;
  else if (avgWords > 15) score -= 5;
  const label = score >= 80 ? "Easy to read" : score >= 60 ? "Fairly readable" : "Difficult to read";
  return { label, score, avgWords };
}

function getInternalLinkSuggestions(currentSlug: string, content: string, allPosts: BlogPost[]): BlogPost[] {
  const text = stripHtml(content).toLowerCase();
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const titleWords = p.title.toLowerCase().split(" ").filter((w) => w.length > 4);
      const matches = titleWords.filter((w) => text.includes(w)).length;
      return { post: p, matches };
    })
    .filter((x) => x.matches >= 2)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 4)
    .map((x) => x.post);
}

// ─────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const fill = (score / 100) * circ;
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div className="flex items-center gap-3">
      <svg width={72} height={72} className="shrink-0">
        <circle cx={36} cy={36} r={radius} fill="none" stroke="#0B0B0B10" strokeWidth={6} />
        <circle
          cx={36} cy={36} r={radius} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
        <text x={36} y={36} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill="#0B0B0B">{score}</text>
      </svg>
      <div>
        <p className="text-[13px] font-bold text-[#0B0B0B]">{score >= 75 ? "Good" : score >= 50 ? "Needs Work" : "Poor"}</p>
        <p className="text-[11px] text-[#0B0B0B]/45">SEO Score</p>
      </div>
    </div>
  );
}

function IssueIcon({ status }: { status: "good" | "warn" | "error" }) {
  if (status === "good") return <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />;
  if (status === "warn") return <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />;
  return <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />;
}

function SidePanel({ title, children, defaultOpen = true, icon }: { title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#0B0B0B]/10 rounded-xl overflow-hidden mb-3 bg-white">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#0B0B0B]/4 hover:bg-[#0B0B0B]/7 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#0B0B0B]/40">{icon}</span>}
          <span className="text-[11px] font-bold text-[#0B0B0B]/70 uppercase tracking-widest">{title}</span>
        </div>
        {open ? <ChevronUp size={12} className="text-[#0B0B0B]/35" /> : <ChevronDown size={12} className="text-[#0B0B0B]/35" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#0B0B0B]/6 last:border-0">
      <span className="text-[12px] text-[#0B0B0B]/50">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function CharCount({ val, max, warn = max * 0.75 }: { val: number; max: number; warn?: number }) {
  const color = val > max ? "text-red-500" : val >= warn ? "text-amber-600" : "text-[#0B0B0B]/35";
  return <span className={`text-[10px] font-mono ${color}`}>{val}/{max}</span>;
}

function ToolBtn({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      className="p-1.5 rounded hover:bg-[#0B0B0B]/8 transition-colors text-[#0B0B0B]/55 hover:text-[#0B0B0B]"
    >
      {icon}
    </button>
  );
}

const TAGS = ["Founders", "Brand", "Creators", "Freelancers", "Strategy", "Tools"];

// ─────────────────────────────────────
// POST EDITOR
// ─────────────────────────────────────

function PostEditor({
  post, isNew, onBack, onSave, allPosts,
}: {
  post: BlogPost; isNew: boolean; onBack: () => void; onSave: (p: BlogPost) => Promise<void>; allPosts: BlogPost[];
}) {
  const [data, setData] = useState<BlogPost>(post);
  const [seo, setSeo] = useState<PostSeo>({ ...defaultSeo(), ...post.seo });
  const [mode, setMode] = useState<"visual" | "text">("visual");
  const [activeTab, setActiveTab] = useState<"write" | "seo">("write");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = post.content ?? "";
  }, []);

  function setField<K extends keyof BlogPost>(key: K, val: BlogPost[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  function setSeoField<K extends keyof PostSeo>(key: K, val: PostSeo[K]) {
    setSaved(false);
    setSeo((p) => ({ ...p, [key]: val }));
    if (key === "focusKeyword") {
      const intent = detectSearchIntent(val as string);
      setSeo((p) => ({ ...p, [key]: val as string, searchIntent: intent }));
    }
  }

  function captureContent(): string {
    if (mode === "visual" && editorRef.current) return editorRef.current.innerHTML;
    return data.content;
  }

  function exec(cmd: string, val?: string) {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }

  function insertLink() {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  }

  function switchMode(next: "visual" | "text") {
    if (next === "text" && editorRef.current) setField("content", editorRef.current.innerHTML);
    setMode(next);
    if (next === "visual") setTimeout(() => { if (editorRef.current) editorRef.current.innerHTML = data.content; }, 0);
  }

  async function handleSave() {
    const content = captureContent();
    const finalPost: BlogPost = { ...data, content, seo };
    setSaving(true);
    try {
      await onSave(finalPost);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const liveContent = mode === "visual" && editorRef.current ? editorRef.current.innerHTML : data.content;
  const { score, issues } = computeSeoScore({ ...data }, liveContent, seo);
  const readability = readabilityAnalysis(liveContent);
  const wc = wordCount(liveContent);
  const internalLinks = getInternalLinkSuggestions(data.slug, liveContent, allPosts);
  const seoTitleDisplay = seo.seoTitle || data.title;
  const metaDescDisplay = seo.metaDescription || data.excerpt;

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] text-[#0B0B0B]/45 hover:text-[#0B0B0B] transition-colors">
          <ArrowLeft size={14} /> All Posts
        </button>
        <h1 className="text-[19px] font-black tracking-tight text-[#0B0B0B] flex-1">{isNew ? "Add New Post" : "Edit Post"}</h1>
        {saved && <span className="text-[12px] text-emerald-600 font-medium">Saved</span>}
        <button onClick={handleSave} disabled={saving} className="text-[13px] font-medium text-[#0B0B0B]/55 border border-[#0B0B0B]/15 px-3.5 py-2 rounded-xl hover:border-[#0B0B0B]/30 transition-colors disabled:opacity-40">
          Save Draft
        </button>
        <button onClick={handleSave} disabled={saving} className="bg-[#0B0B0B] text-white text-[13px] font-semibold px-5 py-2 rounded-xl hover:bg-[#0B0B0B]/85 disabled:opacity-40 transition-colors">
          {saving ? "Saving..." : "Publish"}
        </button>
      </div>

      <div className="flex gap-5 items-start">
        {/* ── Left: tabs + content ── */}
        <div className="flex-1 min-w-0">
          {/* Tab switcher */}
          <div className="flex gap-0 mb-4 border-b border-[#0B0B0B]/8">
            {([["write", "Write"], ["seo", "SEO Analysis"]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors ${activeTab === key ? "text-[#0B0B0B] border-[#0B0B0B]" : "text-[#0B0B0B]/40 border-transparent hover:text-[#0B0B0B]/70"}`}>
                {label}
                {key === "seo" && (
                  <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${score >= 75 ? "bg-emerald-100 text-emerald-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                    {score}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "write" && (
            <>
              {/* Title */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl mb-4 overflow-hidden shadow-sm">
                <input
                  value={data.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Add title"
                  className="w-full px-6 py-5 text-[28px] font-black tracking-tight text-[#0B0B0B] placeholder-[#0B0B0B]/18 outline-none bg-transparent"
                />
              </div>

              {/* Editor */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-[#0B0B0B]/8 bg-[#fafafa]">
                  <select onMouseDown={(e) => e.preventDefault()} onChange={(e) => { exec("formatBlock", e.target.value); e.target.value = "p"; }} defaultValue="p"
                    className="text-[12px] text-[#0B0B0B]/55 border border-[#0B0B0B]/12 rounded px-2 py-1 mr-1 bg-white outline-none cursor-pointer">
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="pre">Code</option>
                  </select>
                  <div className="w-px h-5 bg-[#0B0B0B]/10 mx-0.5" />
                  <ToolBtn icon={<Bold size={14} />} title="Bold" onClick={() => exec("bold")} />
                  <ToolBtn icon={<Italic size={14} />} title="Italic" onClick={() => exec("italic")} />
                  <div className="w-px h-5 bg-[#0B0B0B]/10 mx-0.5" />
                  <ToolBtn icon={<ListOrdered size={14} />} title="Ordered List" onClick={() => exec("insertOrderedList")} />
                  <ToolBtn icon={<List size={14} />} title="Unordered List" onClick={() => exec("insertUnorderedList")} />
                  <ToolBtn icon={<Quote size={14} />} title="Blockquote" onClick={() => exec("formatBlock", "blockquote")} />
                  <div className="w-px h-5 bg-[#0B0B0B]/10 mx-0.5" />
                  <ToolBtn icon={<AlignLeft size={14} />} title="Align Left" onClick={() => exec("justifyLeft")} />
                  <ToolBtn icon={<AlignCenter size={14} />} title="Align Center" onClick={() => exec("justifyCenter")} />
                  <ToolBtn icon={<AlignRight size={14} />} title="Align Right" onClick={() => exec("justifyRight")} />
                  <ToolBtn icon={<AlignJustify size={14} />} title="Justify" onClick={() => exec("justifyFull")} />
                  <div className="w-px h-5 bg-[#0B0B0B]/10 mx-0.5" />
                  <ToolBtn icon={<Link2 size={14} />} title="Insert Link" onClick={insertLink} />
                  <ToolBtn icon={<Minus size={14} />} title="Horizontal Rule" onClick={() => exec("insertHorizontalRule")} />
                  <div className="flex-1" />
                  <div className="flex rounded-lg overflow-hidden border border-[#0B0B0B]/12 shrink-0">
                    {(["visual", "text"] as const).map((m) => (
                      <button key={m} onMouseDown={(e) => e.preventDefault()} onClick={() => switchMode(m)}
                        className={`text-[11px] font-semibold px-3 py-1.5 capitalize transition-colors ${mode === m ? "bg-[#0B0B0B] text-white" : "text-[#0B0B0B]/45 hover:text-[#0B0B0B]"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                {mode === "visual" ? (
                  <div ref={editorRef} contentEditable
                    onInput={() => { if (editorRef.current) setField("content", editorRef.current.innerHTML); }}
                    className="min-h-[460px] px-7 py-6 text-[14px] text-[#0B0B0B] leading-[1.75] outline-none prose prose-sm max-w-none"
                    suppressContentEditableWarning style={{ fontFamily: "Inter, sans-serif" }} />
                ) : (
                  <textarea value={data.content} onChange={(e) => setField("content", e.target.value)}
                    className="w-full min-h-[460px] px-7 py-6 text-[13px] text-[#0B0B0B]/65 font-mono leading-relaxed outline-none resize-none bg-[#fafafa]"
                    placeholder="Write your post content..." spellCheck={false} />
                )}
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#0B0B0B]/6 bg-[#fafafa]">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#0B0B0B]/30">Words: {wc}</span>
                    <span className={`text-[11px] font-medium ${readability.score >= 80 ? "text-emerald-600" : readability.score >= 60 ? "text-amber-600" : "text-red-500"}`}>
                      {readability.label} (avg {readability.avgWords} words/sentence)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#0B0B0B]/22">Select text to format</span>
                </div>
              </div>
            </>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              {/* Score overview */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <ScoreRing score={score} />
                  {seo.searchIntent && (
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-[#0B0B0B]/40 uppercase tracking-widest mb-1">Search Intent</p>
                      <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${INTENT_LABELS[seo.searchIntent]?.color ?? "text-[#0B0B0B]/50 bg-[#0B0B0B]/6"}`}>
                        {INTENT_LABELS[seo.searchIntent]?.label ?? "Unknown"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {issues.map((issue) => (
                    <div key={issue.key} className="flex items-start gap-2">
                      <IssueIcon status={issue.status} />
                      <div className="min-w-0">
                        <p className="text-[12px] text-[#0B0B0B]/70">{issue.label}</p>
                        {issue.tip && issue.status !== "good" && (
                          <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5">{issue.tip}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword analysis */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-5 shadow-sm">
                <h3 className="text-[12px] font-bold text-[#0B0B0B]/60 uppercase tracking-widest mb-3 flex items-center gap-2"><Search size={13} /> Keyword Analysis</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Focus keyword", value: seo.focusKeyword || "—" },
                    { label: "Keyword density", value: seo.focusKeyword ? `${getKeywordDensity(liveContent, seo.focusKeyword)}%` : "—" },
                    { label: "Total words", value: wc.toString() },
                    { label: "Readability", value: readability.label },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-1.5 border-b border-[#0B0B0B]/5 last:border-0">
                      <span className="text-[12px] text-[#0B0B0B]/50">{label}</span>
                      <span className="text-[12px] font-semibold text-[#0B0B0B]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal link suggestions */}
              {internalLinks.length > 0 && (
                <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-[12px] font-bold text-[#0B0B0B]/60 uppercase tracking-widest mb-3 flex items-center gap-2"><Link2 size={13} /> Internal Link Opportunities</h3>
                  <p className="text-[11px] text-[#0B0B0B]/40 mb-3">Posts with topical overlap — consider linking to them:</p>
                  <div className="space-y-2">
                    {internalLinks.map((p) => (
                      <div key={p.slug} className="flex items-center justify-between gap-3 py-2 border-b border-[#0B0B0B]/5 last:border-0">
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium text-[#0B0B0B] truncate">{p.title}</p>
                          <p className="text-[10px] text-[#0B0B0B]/40">/{p.slug}</p>
                        </div>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => exec("createLink", `/${p.slug}`)}
                          className="text-[11px] font-semibold text-[#0B0B0B]/50 border border-[#0B0B0B]/12 px-2 py-1 rounded hover:bg-[#0B0B0B]/6 transition-colors shrink-0"
                        >
                          Insert link
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SERP preview */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-5 shadow-sm">
                <h3 className="text-[12px] font-bold text-[#0B0B0B]/60 uppercase tracking-widest mb-3 flex items-center gap-2"><Eye size={13} /> SERP Preview</h3>
                <div className="bg-[#f8f9fa] rounded-xl p-4">
                  <p className="text-[11px] text-[#0B0B0B]/35 mb-1">growitbuddy.com › {data.slug || "post-slug"}</p>
                  <p className="text-[16px] font-semibold text-blue-700 leading-snug mb-1 truncate">{seoTitleDisplay || "Post title will appear here"}</p>
                  <p className={`text-[13px] leading-relaxed ${metaDescDisplay ? "text-[#0B0B0B]/65" : "text-[#0B0B0B]/30 italic"}`}>
                    {metaDescDisplay
                      ? (metaDescDisplay.length > 160 ? metaDescDisplay.slice(0, 157) + "..." : metaDescDisplay)
                      : "Meta description will appear here. Add one in the Meta Tags panel."}
                  </p>
                </div>
              </div>

              {/* Schema preview */}
              {seo.schemaType !== "None" && (
                <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-[12px] font-bold text-[#0B0B0B]/60 uppercase tracking-widest mb-3 flex items-center gap-2"><Code size={13} /> Schema Output ({seo.schemaType})</h3>
                  <pre className="text-[10px] text-[#0B0B0B]/60 bg-[#fafafa] rounded-lg p-3 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(generateSchema(data, seo), null, 2).slice(0, 600) + "..."}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-60 shrink-0">
          {/* Publish panel */}
          <div className="border border-[#0B0B0B]/10 rounded-xl overflow-hidden mb-3 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0B0B]/4">
              <span className="text-[11px] font-bold text-[#0B0B0B]/70 uppercase tracking-widest">Publish</span>
              <div className="flex gap-1.5">
                <button onClick={handleSave} className="text-[11px] font-semibold bg-white border border-[#0B0B0B]/15 text-[#0B0B0B]/55 px-2.5 py-1 rounded hover:bg-[#f5f5f5] transition-colors">
                  Save Draft
                </button>
                <button className="text-[11px] font-semibold bg-white border border-[#0B0B0B]/15 text-[#0B0B0B]/55 px-2.5 py-1 rounded hover:bg-[#f5f5f5] transition-colors">
                  Preview
                </button>
              </div>
            </div>
            <div className="px-4 py-3 space-y-0">
              <FieldRow label="Status:">
                <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </FieldRow>
              <FieldRow label="Visibility:">
                <div className="flex items-center gap-1.5">
                  {visibility === "public" ? <Globe size={12} className="text-[#0B0B0B]/40" /> : <Lock size={12} className="text-[#0B0B0B]/40" />}
                  <select value={visibility} onChange={(e) => setVisibility(e.target.value as "public" | "private")} className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </FieldRow>
              <FieldRow label="Date:">
                <input type="text" value={data.date} onChange={(e) => setField("date", e.target.value)} className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none w-36 text-right" />
              </FieldRow>
            </div>
            <div className="px-4 pb-4 pt-1">
              <button onClick={handleSave} disabled={saving} className="w-full bg-[#0B0B0B] text-white text-[13px] font-semibold py-2.5 rounded-lg hover:bg-[#0B0B0B]/85 disabled:opacity-40 transition-colors">
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Focus Keyword */}
          <SidePanel title="Focus Keyword" icon={<Target size={12} />}>
            <input
              value={seo.focusKeyword}
              onChange={(e) => setSeoField("focusKeyword", e.target.value)}
              placeholder="e.g. founder brand strategy"
              className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white mb-2"
            />
            <input
              value={seo.secondaryKeywords}
              onChange={(e) => setSeoField("secondaryKeywords", e.target.value)}
              placeholder="Secondary keywords (comma separated)"
              className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white mb-2"
            />
            {seo.searchIntent && (
              <div className="flex items-center gap-1.5 mt-1">
                <Lightbulb size={11} className="text-[#0B0B0B]/35" />
                <span className="text-[11px] text-[#0B0B0B]/45">Detected intent: </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${INTENT_LABELS[seo.searchIntent]?.color ?? "text-[#0B0B0B]/50 bg-[#0B0B0B]/6"}`}>
                  {INTENT_LABELS[seo.searchIntent]?.label ?? "Unknown"}
                </span>
              </div>
            )}
          </SidePanel>

          {/* Meta Tags */}
          <SidePanel title="Meta Tags" icon={<FileText size={12} />}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-semibold text-[#0B0B0B]/45 uppercase tracking-widest">SEO Title</label>
                  <CharCount val={seo.seoTitle.length} max={60} />
                </div>
                <input
                  value={seo.seoTitle}
                  onChange={(e) => setSeoField("seoTitle", e.target.value)}
                  placeholder={data.title || "SEO title..."}
                  className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-semibold text-[#0B0B0B]/45 uppercase tracking-widest">Meta Description</label>
                  <CharCount val={seo.metaDescription.length} max={160} warn={120} />
                </div>
                <textarea
                  value={seo.metaDescription}
                  onChange={(e) => setSeoField("metaDescription", e.target.value)}
                  placeholder={data.excerpt || "Meta description..."}
                  rows={3}
                  className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Canonical URL</label>
                <input
                  value={seo.canonicalUrl}
                  onChange={(e) => setSeoField("canonicalUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={seo.noIndex} onChange={(e) => setSeoField("noIndex", e.target.checked)} className="accent-[#0B0B0B] w-3.5 h-3.5" />
                <span className="text-[12px] text-[#0B0B0B]/60">Noindex this post</span>
              </label>
            </div>
          </SidePanel>

          {/* Social / OG */}
          <SidePanel title="Social Preview" defaultOpen={false} icon={<Share2 size={12} />}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-semibold text-[#0B0B0B]/45 uppercase tracking-widest">OG Title</label>
                  <CharCount val={seo.ogTitle.length} max={60} />
                </div>
                <input value={seo.ogTitle} onChange={(e) => setSeoField("ogTitle", e.target.value)} placeholder={seoTitleDisplay} className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-semibold text-[#0B0B0B]/45 uppercase tracking-widest">OG Description</label>
                  <CharCount val={seo.ogDescription.length} max={160} warn={120} />
                </div>
                <textarea value={seo.ogDescription} onChange={(e) => setSeoField("ogDescription", e.target.value)} placeholder={metaDescDisplay} rows={2} className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white resize-none" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">OG Image URL</label>
                <input value={seo.ogImage} onChange={(e) => setSeoField("ogImage", e.target.value)} placeholder="https://..." className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white" />
              </div>
              {(seo.ogImage || seo.ogTitle || seo.ogDescription) && (
                <div className="rounded-xl overflow-hidden border border-[#0B0B0B]/10 mt-2">
                  {seo.ogImage && <img src={seo.ogImage} alt="OG preview" className="w-full h-24 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                  <div className="p-3 bg-[#f7f7f5]">
                    <p className="text-[10px] text-[#0B0B0B]/35 uppercase mb-0.5">GROWITBUDDY.COM</p>
                    <p className="text-[12px] font-bold text-[#0B0B0B] leading-snug truncate">{seo.ogTitle || seoTitleDisplay}</p>
                    <p className="text-[11px] text-[#0B0B0B]/55 mt-0.5 line-clamp-2">{seo.ogDescription || metaDescDisplay}</p>
                  </div>
                </div>
              )}
            </div>
          </SidePanel>

          {/* Schema */}
          <SidePanel title="Schema Markup" defaultOpen={false} icon={<Code size={12} />}>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Schema Type</label>
                <select value={seo.schemaType} onChange={(e) => setSeoField("schemaType", e.target.value as PostSeo["schemaType"])} className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none bg-white">
                  <option value="Article">Article (default)</option>
                  <option value="FAQ">FAQ Page</option>
                  <option value="HowTo">HowTo</option>
                  <option value="None">None</option>
                </select>
              </div>

              {seo.schemaType === "FAQ" && (
                <div>
                  <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-2 uppercase tracking-widest">FAQ Items</label>
                  {seo.faqItems.map((item, i) => (
                    <div key={i} className="bg-[#fafafa] rounded-lg p-2.5 mb-2 border border-[#0B0B0B]/8">
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <input value={item.question} onChange={(e) => { const n = [...seo.faqItems]; n[i] = { ...item, question: e.target.value }; setSeoField("faqItems", n); }} placeholder="Question" className="flex-1 text-[11px] border border-[#0B0B0B]/12 rounded px-2 py-1 outline-none bg-white" />
                        <button onClick={() => setSeoField("faqItems", seo.faqItems.filter((_, j) => j !== i))} className="text-[#0B0B0B]/25 hover:text-red-500 p-1 rounded transition-colors"><Trash2 size={11} /></button>
                      </div>
                      <textarea value={item.answer} onChange={(e) => { const n = [...seo.faqItems]; n[i] = { ...item, answer: e.target.value }; setSeoField("faqItems", n); }} placeholder="Answer" rows={2} className="w-full text-[11px] border border-[#0B0B0B]/12 rounded px-2 py-1 outline-none bg-white resize-none" />
                    </div>
                  ))}
                  <button onClick={() => setSeoField("faqItems", [...seo.faqItems, { question: "", answer: "" }])} className="w-full text-[11px] font-semibold text-[#0B0B0B]/50 border border-dashed border-[#0B0B0B]/15 rounded-lg py-2 hover:border-[#0B0B0B]/30 hover:text-[#0B0B0B] transition-colors flex items-center justify-center gap-1">
                    <Plus size={11} /> Add FAQ Item
                  </button>
                </div>
              )}

              {seo.schemaType === "HowTo" && (
                <div>
                  <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-2 uppercase tracking-widest">Steps</label>
                  {seo.howToSteps.map((step, i) => (
                    <div key={i} className="bg-[#fafafa] rounded-lg p-2.5 mb-2 border border-[#0B0B0B]/8">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold text-[#0B0B0B]/40 w-5 shrink-0">#{i + 1}</span>
                        <input value={step.name} onChange={(e) => { const n = [...seo.howToSteps]; n[i] = { ...step, name: e.target.value }; setSeoField("howToSteps", n); }} placeholder="Step name" className="flex-1 text-[11px] border border-[#0B0B0B]/12 rounded px-2 py-1 outline-none bg-white" />
                        <button onClick={() => setSeoField("howToSteps", seo.howToSteps.filter((_, j) => j !== i))} className="text-[#0B0B0B]/25 hover:text-red-500 p-1 rounded transition-colors"><Trash2 size={11} /></button>
                      </div>
                      <textarea value={step.text} onChange={(e) => { const n = [...seo.howToSteps]; n[i] = { ...step, text: e.target.value }; setSeoField("howToSteps", n); }} placeholder="Step description" rows={2} className="w-full text-[11px] border border-[#0B0B0B]/12 rounded px-2 py-1 outline-none bg-white resize-none" />
                    </div>
                  ))}
                  <button onClick={() => setSeoField("howToSteps", [...seo.howToSteps, { name: "", text: "" }])} className="w-full text-[11px] font-semibold text-[#0B0B0B]/50 border border-dashed border-[#0B0B0B]/15 rounded-lg py-2 hover:border-[#0B0B0B]/30 hover:text-[#0B0B0B] transition-colors flex items-center justify-center gap-1">
                    <Plus size={11} /> Add Step
                  </button>
                </div>
              )}
            </div>
          </SidePanel>

          {/* Post Attributes */}
          <SidePanel title="Post Attributes" defaultOpen={false}>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Slug (URL)</label>
                <input value={data.slug} onChange={(e) => setField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))} placeholder="post-url-slug" className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Read Time</label>
                <input value={data.readTime} onChange={(e) => setField("readTime", e.target.value)} placeholder="6 min read" className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white" />
              </div>
            </div>
          </SidePanel>

          {/* Categories */}
          <SidePanel title="Categories" defaultOpen={false} icon={<Tag size={12} />}>
            <div className="space-y-1.5">
              {TAGS.map((t) => (
                <label key={t} className="flex items-center gap-2.5 cursor-pointer py-0.5 group">
                  <input type="radio" name="post-tag" value={t} checked={data.tag === t} onChange={() => setField("tag", t)} className="accent-[#0B0B0B] w-3.5 h-3.5" />
                  <span className="text-[13px] text-[#0B0B0B]/65 group-hover:text-[#0B0B0B] transition-colors">{t}</span>
                </label>
              ))}
            </div>
          </SidePanel>

          {/* Excerpt */}
          <SidePanel title="Excerpt" defaultOpen={false}>
            <textarea value={data.excerpt} onChange={(e) => setField("excerpt", e.target.value)} placeholder="Short description for the blog listing page..." rows={3} className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-2 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white resize-y leading-relaxed" />
          </SidePanel>

          {/* Featured Image */}
          <SidePanel title="Featured Image" defaultOpen={true}>
            <ImageCropUploader
              value={data.featuredImage ?? ""}
              onChange={(url) => setField("featuredImage", url)}
            />
          </SidePanel>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────
// SCHEMA GENERATOR
// ─────────────────────────────────────

function generateSchema(post: BlogPost, seo: PostSeo) {
  const base = {
    "@context": "https://schema.org",
    author: { "@type": "Organization", name: "GrowitBuddy" },
    datePublished: post.date,
    headline: seo.seoTitle || post.title,
    description: seo.metaDescription || post.excerpt,
  };
  if (seo.schemaType === "FAQ") {
    return {
      "@type": "FAQPage",
      ...base,
      mainEntity: seo.faqItems.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    };
  }
  if (seo.schemaType === "HowTo") {
    return {
      "@type": "HowTo",
      ...base,
      name: seo.seoTitle || post.title,
      step: seo.howToSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
    };
  }
  return { "@type": "Article", ...base, articleSection: post.tag, keywords: [seo.focusKeyword, seo.secondaryKeywords].filter(Boolean).join(", ") };
}

// ─────────────────────────────────────
// POST LIST
// ─────────────────────────────────────

function PostList({ posts, onEdit, onDelete, onAdd }: {
  posts: BlogPost[]; onEdit: (p: BlogPost) => void; onDelete: (slug: string, idx: number) => void; onAdd: () => void;
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const allTags = ["All", ...Array.from(new Set(posts.map((p) => p.tag)))];
  const shown = posts
    .filter((p) => filter === "All" || p.tag === filter)
    .filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-black tracking-tight text-[#0B0B0B]">Blog / Insights</h1>
          <p className="text-[13px] text-[#0B0B0B]/40 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B0B0B]/30" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="pl-8 pr-3 py-2 text-[13px] border border-[#0B0B0B]/12 rounded-xl outline-none focus:border-[#0B0B0B]/30 bg-white w-48" />
          </div>
          <button onClick={onAdd} className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors">
            <Plus size={15} /> Add New
          </button>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-[#0B0B0B]/8 mb-4">
        {allTags.map((t) => {
          const count = t === "All" ? posts.length : posts.filter((p) => p.tag === t).length;
          return (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors ${filter === t ? "text-[#0B0B0B] border-[#0B0B0B]" : "text-[#0B0B0B]/40 border-transparent hover:text-[#0B0B0B]/65"}`}>
              {t} <span className="ml-1 text-[11px] opacity-50">({count})</span>
            </button>
          );
        })}
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0B0B0B]/6 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest">Title</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-24">SEO</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-28">Category</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-32">Date</th>
              <th className="w-20" />
            </tr>
          </thead>
          <tbody>
            {shown.map((post, i) => {
              const realIdx = posts.indexOf(post);
              const seoData: PostSeo = { ...defaultSeo(), ...post.seo };
              const { score } = computeSeoScore(post, post.content ?? "", seoData);
              const hasKeyword = !!seoData.focusKeyword;
              return (
                <tr key={post.slug + i} className="border-b border-[#0B0B0B]/5 hover:bg-[#0B0B0B]/2 group transition-colors last:border-0">
                  <td className="px-5 py-3.5">
                    <button onClick={() => onEdit(post)} className="text-left w-full">
                      <p className="text-[13px] font-semibold text-[#0B0B0B] hover:underline">{post.title || "(no title)"}</p>
                      {post.excerpt && <p className="text-[11px] text-[#0B0B0B]/38 truncate max-w-[320px] mt-0.5">{post.excerpt}</p>}
                    </button>
                  </td>
                  <td className="px-3 py-3.5">
                    {hasKeyword ? (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-400" : "bg-red-400"}`} />
                        <span className="text-[11px] font-semibold text-[#0B0B0B]/60">{score}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#0B0B0B]/25">No keyword</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5"><span className="text-[10px] font-bold bg-[#0B0B0B]/6 text-[#0B0B0B]/55 px-2 py-0.5 rounded-full">{post.tag}</span></td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#0B0B0B]/45"><Calendar size={11} />{post.date}</div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button onClick={() => onEdit(post)} className="p-1.5 rounded hover:bg-[#0B0B0B]/8 text-[#0B0B0B]/35 hover:text-[#0B0B0B] transition-colors" title="Edit"><Edit2 size={13} /></button>
                      <button onClick={() => onDelete(post.slug, realIdx)} className="p-1.5 rounded hover:bg-red-50 text-[#0B0B0B]/35 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {shown.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-[13px] text-[#0B0B0B]/30">No posts found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────
// MAIN
// ─────────────────────────────────────

export default function AdminBlog() {
  const { getContent, saveContent } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS);
  const [editing, setEditing] = useState<{ post: BlogPost; isNew: boolean } | null>(null);

  useEffect(() => {
    getContent("blog").then((d) => {
      if (d?.posts) setPosts(d.posts as BlogPost[]);
    });
  }, [getContent]);

  async function persist(updated: BlogPost[]) {
    await saveContent("blog", { posts: updated });
    setPosts(updated);
  }

  async function handleSave(post: BlogPost) {
    let updated: BlogPost[];
    if (editing?.isNew) {
      updated = [...posts, post];
    } else {
      updated = posts.map((p) => (p.slug === editing?.post.slug ? post : p));
    }
    await persist(updated);
    setEditing(null);
  }

  function handleDelete(slug: string, idx: number) {
    if (!confirm("Delete this post permanently?")) return;
    persist(posts.filter((_, i) => i !== idx));
  }

  if (editing) {
    return (
      <PostEditor
        post={editing.post}
        isNew={editing.isNew}
        onBack={() => setEditing(null)}
        onSave={handleSave}
        allPosts={posts}
      />
    );
  }

  return (
    <PostList
      posts={posts}
      onEdit={(post) => setEditing({ post: { ...post }, isNew: false })}
      onDelete={handleDelete}
      onAdd={() =>
        setEditing({
          isNew: true,
          post: {
            slug: "",
            title: "",
            excerpt: "",
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            tag: "Founders",
            readTime: "5 min read",
            content: "",
          },
        })
      }
    />
  );
}
