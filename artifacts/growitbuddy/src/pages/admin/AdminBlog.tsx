import { useEffect, useState, useRef } from "react";
import { useAdmin } from "@/context/AdminContext";
import { blogPosts as DEFAULT_POSTS, type BlogPost } from "@/data/blogPosts";
import { Card } from "@/components/admin/AdminField";
import {
  Plus, ArrowLeft, Bold, Italic, List, ListOrdered, Quote,
  Link2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Minus, FileText, Trash2, Edit2, Calendar, Globe, Lock,
  ChevronDown, ChevronUp,
} from "lucide-react";

const TAGS = ["Founders", "Brand", "Creators", "Freelancers", "Strategy", "Tools"];

function wordCount(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
}

function ToolBtn({
  icon, title, onClick,
}: {
  icon: React.ReactNode; title: string; onClick: () => void;
}) {
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

function SidePanel({
  title, children, defaultOpen = true,
}: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#0B0B0B]/10 rounded-xl overflow-hidden mb-3 bg-white">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#0B0B0B]/4 hover:bg-[#0B0B0B]/7 transition-colors"
      >
        <span className="text-[11px] font-bold text-[#0B0B0B]/70 uppercase tracking-widest">{title}</span>
        {open
          ? <ChevronUp size={12} className="text-[#0B0B0B]/35" />
          : <ChevronDown size={12} className="text-[#0B0B0B]/35" />}
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

function PostEditor({
  post, isNew, onBack, onSave,
}: {
  post: BlogPost; isNew: boolean; onBack: () => void; onSave: (p: BlogPost) => Promise<void>;
}) {
  const [data, setData] = useState<BlogPost>(post);
  const [mode, setMode] = useState<"visual" | "text">("visual");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = post.content ?? "";
  }, []);

  function set<K extends keyof BlogPost>(key: K, val: BlogPost[K]) {
    setSaved(false);
    setData((p) => ({ ...p, [key]: val }));
  }

  function captureVisual(): BlogPost {
    const content = mode === "visual" && editorRef.current
      ? editorRef.current.innerHTML
      : data.content;
    return { ...data, content };
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
    if (next === "text" && editorRef.current) {
      set("content", editorRef.current.innerHTML);
    }
    setMode(next);
    if (next === "visual") {
      setTimeout(() => {
        if (editorRef.current) editorRef.current.innerHTML = data.content;
      }, 0);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(captureVisual());
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const wc = wordCount(data.content);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-[#0B0B0B]/45 hover:text-[#0B0B0B] transition-colors"
        >
          <ArrowLeft size={14} />
          All Posts
        </button>
        <h1 className="text-[19px] font-black tracking-tight text-[#0B0B0B] flex-1">
          {isNew ? "Add New Post" : "Edit Post"}
        </h1>
        {saved && <span className="text-[12px] text-emerald-600 font-medium">Saved</span>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-[13px] font-medium text-[#0B0B0B]/55 border border-[#0B0B0B]/15 px-3.5 py-2 rounded-xl hover:border-[#0B0B0B]/30 hover:text-[#0B0B0B] transition-colors disabled:opacity-40"
        >
          Save Draft
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0B0B0B] text-white text-[13px] font-semibold px-5 py-2 rounded-xl hover:bg-[#0B0B0B]/85 disabled:opacity-40 transition-colors"
        >
          {saving ? "Saving..." : "Publish"}
        </button>
      </div>

      <div className="flex gap-5 items-start">
        {/* ── Left: title + editor ── */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl mb-4 overflow-hidden shadow-sm">
            <input
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Add title"
              className="w-full px-6 py-5 text-[28px] font-black tracking-tight text-[#0B0B0B] placeholder-[#0B0B0B]/18 outline-none bg-transparent"
            />
          </div>

          {/* Editor card */}
          <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl overflow-hidden shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-[#0B0B0B]/8 bg-[#fafafa]">
              <select
                onMouseDown={(e) => e.preventDefault()}
                onChange={(e) => { exec("formatBlock", e.target.value); e.target.value = "p"; }}
                defaultValue="p"
                className="text-[12px] text-[#0B0B0B]/55 border border-[#0B0B0B]/12 rounded px-2 py-1 mr-1 bg-white outline-none cursor-pointer"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="pre">Code</option>
              </select>

              <div className="w-px h-5 bg-[#0B0B0B]/10 mx-0.5" />
              <ToolBtn icon={<Bold size={14} />} title="Bold (Ctrl+B)" onClick={() => exec("bold")} />
              <ToolBtn icon={<Italic size={14} />} title="Italic (Ctrl+I)" onClick={() => exec("italic")} />
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

              {/* Visual / Text toggle */}
              <div className="flex rounded-lg overflow-hidden border border-[#0B0B0B]/12 shrink-0">
                {(["visual", "text"] as const).map((m) => (
                  <button
                    key={m}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => switchMode(m)}
                    className={`text-[11px] font-semibold px-3 py-1.5 capitalize transition-colors ${
                      mode === m ? "bg-[#0B0B0B] text-white" : "text-[#0B0B0B]/45 hover:text-[#0B0B0B]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Content area */}
            {mode === "visual" ? (
              <div
                ref={editorRef}
                contentEditable
                onInput={() => {
                  if (editorRef.current) set("content", editorRef.current.innerHTML);
                }}
                className="min-h-[460px] px-7 py-6 text-[14px] text-[#0B0B0B] leading-[1.75] outline-none prose prose-sm max-w-none"
                suppressContentEditableWarning
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            ) : (
              <textarea
                value={data.content}
                onChange={(e) => set("content", e.target.value)}
                className="w-full min-h-[460px] px-7 py-6 text-[13px] text-[#0B0B0B]/65 font-mono leading-relaxed outline-none resize-none bg-[#fafafa]"
                placeholder="Write your post content (HTML or Markdown)..."
                spellCheck={false}
              />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#0B0B0B]/6 bg-[#fafafa]">
              <span className="text-[11px] text-[#0B0B0B]/30">Word count: {wc}</span>
              <span className="text-[11px] text-[#0B0B0B]/22">Select text, then use toolbar buttons to format</span>
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-60 shrink-0">
          {/* Publish panel */}
          <div className="border border-[#0B0B0B]/10 rounded-xl overflow-hidden mb-3 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0B0B]/4">
              <span className="text-[11px] font-bold text-[#0B0B0B]/70 uppercase tracking-widest">Publish</span>
              <div className="flex gap-1.5">
                <button
                  onClick={handleSave}
                  className="text-[11px] font-semibold bg-white border border-[#0B0B0B]/15 text-[#0B0B0B]/55 px-2.5 py-1 rounded hover:bg-[#f5f5f5] transition-colors"
                >
                  Save Draft
                </button>
                <button className="text-[11px] font-semibold bg-white border border-[#0B0B0B]/15 text-[#0B0B0B]/55 px-2.5 py-1 rounded hover:bg-[#f5f5f5] transition-colors">
                  Preview
                </button>
              </div>
            </div>
            <div className="px-4 py-3 space-y-0">
              <FieldRow label="Status:">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </FieldRow>
              <FieldRow label="Visibility:">
                <div className="flex items-center gap-1.5">
                  {visibility === "public"
                    ? <Globe size={12} className="text-[#0B0B0B]/40" />
                    : <Lock size={12} className="text-[#0B0B0B]/40" />}
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as "public" | "private")}
                    className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </FieldRow>
              <FieldRow label="Date:">
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="text-[12px] text-[#0B0B0B] border border-[#0B0B0B]/12 rounded px-2 py-1 bg-white outline-none w-36 text-right"
                />
              </FieldRow>
            </div>
            <div className="px-4 pb-4 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#0B0B0B] text-white text-[13px] font-semibold py-2.5 rounded-lg hover:bg-[#0B0B0B]/85 disabled:opacity-40 transition-colors"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Post Attributes */}
          <SidePanel title="Post Attributes">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Slug (URL)</label>
                <input
                  value={data.slug}
                  onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
                  placeholder="post-url-slug"
                  className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#0B0B0B]/45 mb-1 uppercase tracking-widest">Read Time</label>
                <input
                  value={data.readTime}
                  onChange={(e) => set("readTime", e.target.value)}
                  placeholder="6 min read"
                  className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
                />
              </div>
            </div>
          </SidePanel>

          {/* Categories / Tag */}
          <SidePanel title="Categories">
            <div className="space-y-1.5">
              {TAGS.map((t) => (
                <label key={t} className="flex items-center gap-2.5 cursor-pointer py-0.5 group">
                  <input
                    type="radio"
                    name="post-tag"
                    value={t}
                    checked={data.tag === t}
                    onChange={() => set("tag", t)}
                    className="accent-[#0B0B0B] w-3.5 h-3.5"
                  />
                  <span className="text-[13px] text-[#0B0B0B]/65 group-hover:text-[#0B0B0B] transition-colors">{t}</span>
                </label>
              ))}
            </div>
          </SidePanel>

          {/* Excerpt */}
          <SidePanel title="Excerpt">
            <textarea
              value={data.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short description for the blog listing page..."
              rows={4}
              className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-2 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white resize-y leading-relaxed"
            />
          </SidePanel>

          {/* Featured Image */}
          <SidePanel title="Featured Image" defaultOpen={false}>
            <input
              placeholder="Paste image URL..."
              className="w-full border border-[#0B0B0B]/12 rounded-lg px-2.5 py-1.5 text-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/30 bg-white"
            />
            <p className="text-[10px] text-[#0B0B0B]/35 mt-1.5">Used as the cover image on the post card</p>
          </SidePanel>
        </div>
      </div>
    </div>
  );
}

function PostList({
  posts, onEdit, onDelete, onAdd,
}: {
  posts: BlogPost[]; onEdit: (p: BlogPost) => void; onDelete: (slug: string, idx: number) => void; onAdd: () => void;
}) {
  const [filter, setFilter] = useState("All");
  const allTags = ["All", ...Array.from(new Set(posts.map((p) => p.tag)))];
  const shown = filter === "All" ? posts : posts.filter((p) => p.tag === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-black tracking-tight text-[#0B0B0B]">Blog / Insights</h1>
          <p className="text-[13px] text-[#0B0B0B]/40 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border-b border-[#0B0B0B]/8 mb-4">
        {allTags.map((t) => {
          const count = t === "All" ? posts.length : posts.filter((p) => p.tag === t).length;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
                filter === t
                  ? "text-[#0B0B0B] border-[#0B0B0B]"
                  : "text-[#0B0B0B]/40 border-transparent hover:text-[#0B0B0B]/65"
              }`}
            >
              {t}
              <span className="ml-1 text-[11px] opacity-50">({count})</span>
            </button>
          );
        })}
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0B0B0B]/6 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest">Title</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-28">Category</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-36">Date</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-[#0B0B0B]/40 uppercase tracking-widest w-24">Read Time</th>
              <th className="w-20" />
            </tr>
          </thead>
          <tbody>
            {shown.map((post, i) => {
              const realIdx = posts.indexOf(post);
              return (
                <tr key={post.slug + i} className="border-b border-[#0B0B0B]/5 hover:bg-[#0B0B0B]/2 group transition-colors last:border-0">
                  <td className="px-5 py-3.5">
                    <button onClick={() => onEdit(post)} className="text-left w-full">
                      <p className="text-[13px] font-semibold text-[#0B0B0B] hover:underline">{post.title || "(no title)"}</p>
                      {post.excerpt && (
                        <p className="text-[11px] text-[#0B0B0B]/38 truncate max-w-[340px] mt-0.5">{post.excerpt}</p>
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-[10px] font-bold bg-[#0B0B0B]/6 text-[#0B0B0B]/55 px-2 py-0.5 rounded-full">{post.tag}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#0B0B0B]/45">
                      <Calendar size={11} />
                      {post.date}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-[12px] text-[#0B0B0B]/45">{post.readTime}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button
                        onClick={() => onEdit(post)}
                        className="p-1.5 rounded hover:bg-[#0B0B0B]/8 text-[#0B0B0B]/35 hover:text-[#0B0B0B] transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => onDelete(post.slug, realIdx)}
                        className="p-1.5 rounded hover:bg-red-50 text-[#0B0B0B]/35 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[13px] text-[#0B0B0B]/30">
                  No posts in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

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
    const updated = posts.filter((_, i) => i !== idx);
    persist(updated);
  }

  if (editing) {
    return (
      <PostEditor
        post={editing.post}
        isNew={editing.isNew}
        onBack={() => setEditing(null)}
        onSave={handleSave}
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
