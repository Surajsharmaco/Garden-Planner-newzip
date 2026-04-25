import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { blogPosts as DEFAULT_POSTS, type BlogPost } from "@/data/blogPosts";
import { PageHeader, Card, Input, Textarea, SaveBar } from "@/components/admin/AdminField";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const BLANK: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  tag: "Founders",
  readTime: "5 min read",
  content: "",
};

const TAGS = ["Founders", "Brand", "Creators", "Freelancers", "Strategy", "Tools"];

function PostRow({
  post,
  index,
  onChange,
  onDelete,
}: {
  post: BlogPost;
  index: number;
  onChange: (i: number, val: BlogPost) => void;
  onDelete: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<BlogPost>) => onChange(index, { ...post, ...patch });

  return (
    <Card className="p-0 overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-[#0B0B0B]/3 transition-colors"
      >
        <span className="text-[10px] font-bold text-white bg-[#0B0B0B] px-2.5 py-1 rounded-full shrink-0">{post.tag}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#0B0B0B] truncate">{post.title || "Untitled Post"}</p>
          <p className="text-[11px] text-[#0B0B0B]/40">{post.date} &bull; {post.readTime}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(index); }}
            className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-[#0B0B0B]/30 transition-colors"
          >
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={14} className="text-[#0B0B0B]/40" /> : <ChevronDown size={14} className="text-[#0B0B0B]/40" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-[#0B0B0B]/8 px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Title"
              value={post.title}
              onChange={(e) => set({ title: e.target.value })}
              className="col-span-2"
            />
            <Input
              label="Slug (URL)"
              value={post.slug}
              onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              placeholder="my-article-title"
            />
            <div>
              <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">Tag</label>
              <select
                value={post.tag}
                onChange={(e) => set({ tag: e.target.value })}
                className="w-full border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[14px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B]/40 bg-white"
              >
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Input
              label="Date"
              value={post.date}
              onChange={(e) => set({ date: e.target.value })}
              placeholder="April 10, 2026"
            />
            <Input
              label="Read Time"
              value={post.readTime}
              onChange={(e) => set({ readTime: e.target.value })}
              placeholder="6 min read"
            />
          </div>

          <Textarea
            label="Excerpt"
            value={post.excerpt}
            onChange={(e) => set({ excerpt: e.target.value })}
            rows={2}
            hint="Shown on the blog listing page"
          />

          <Textarea
            label="Content (Markdown)"
            value={post.content}
            onChange={(e) => set({ content: e.target.value })}
            rows={14}
            hint="Supports Markdown: ## headings, **bold**, - lists"
          />
        </div>
      )}
    </Card>
  );
}

export default function AdminBlog() {
  const { getContent, saveContent } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("blog").then((d) => {
      if (d?.posts) setPosts(d.posts as BlogPost[]);
    });
  }, [getContent]);

  function handleChange(i: number, val: BlogPost) {
    setSaved(false);
    setPosts((p) => p.map((x, idx) => (idx === i ? val : x)));
  }

  function handleDelete(i: number) {
    if (!confirm("Delete this blog post?")) return;
    setSaved(false);
    setPosts((p) => p.filter((_, idx) => idx !== i));
  }

  function addNew() {
    setSaved(false);
    setPosts((p) => [...p, { ...BLANK }]);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("blog", { posts });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Blog / Insights"
        description={`${posts.length} post${posts.length !== 1 ? "s" : ""} published`}
      />

      <div className="flex justify-end mb-5">
        <button
          onClick={addNew}
          className="flex items-center gap-2 bg-[#0B0B0B] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors"
        >
          <Plus size={15} /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <PostRow key={post.slug + i} post={post} index={i} onChange={handleChange} onDelete={handleDelete} />
        ))}
        {posts.length === 0 && (
          <Card>
            <p className="text-[13px] text-[#0B0B0B]/40 text-center py-6">No posts yet. Add your first post above.</p>
          </Card>
        )}
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
