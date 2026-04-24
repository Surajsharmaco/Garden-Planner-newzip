import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search, X, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { influencers, NICHE_CATEGORIES } from "@/data/influencers";
import SEOMeta from "@/components/SEOMeta";
import { useState, useMemo, useRef, useEffect } from "react";

/* ── Influencer Card ─────────────────────────────────────── */
function InfluencerCard({ inf, i }: { inf: (typeof influencers)[0]; i: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
    >
      <Link href={`/influencers/${inf.slug}`}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(11,11,11,0.05)",
            border: "1px solid rgba(11,11,11,0.06)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            height: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(11,11,11,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(11,11,11,0.05)";
          }}
        >
          {/* Photo */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: inf.accentColor }}>
            {!imgError ? (
              <img
                src={inf.photo}
                alt={inf.name}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 48, letterSpacing: "-0.02em" }}>
                {inf.initials}
              </div>
            )}
            <div style={{ position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "rgba(11,11,11,0.65)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "4px 12px" }}>
              {inf.niche}
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: "20px 20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#0B0B0B", letterSpacing: "-0.03em", minWidth: 0 }}>{inf.name}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.35)", whiteSpace: "nowrap", flexShrink: 0 }}>{inf.followers}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(11,11,11,0.4)", marginBottom: 12 }}>{inf.username}</p>
            <p className="card-description" style={{ fontSize: 13, color: "rgba(11,11,11,0.55)", lineHeight: 1.6, marginBottom: 16 }}>{inf.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", background: "rgba(11,11,11,0.05)", borderRadius: 100, padding: "3px 10px", whiteSpace: "nowrap" }}>
                {inf.engagementRate} eng.
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#0B0B0B", marginLeft: "auto", whiteSpace: "nowrap" }}>
                View profile <ArrowRight style={{ width: 12, height: 12 }} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Genre Dropdown ──────────────────────────────────────── */
function GenreDropdown({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (cats: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(cat: string) {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  }

  const label =
    selected.length === 0
      ? "Select Genre"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} genres selected`;

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 18px",
          background: open ? "#0B0B0B" : "#fff",
          border: `1.5px solid ${open ? "#0B0B0B" : "rgba(11,11,11,0.14)"}`,
          borderRadius: open ? "12px 12px 0 0" : 12,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: open ? "rgba(255,255,255,0.6)" : "rgba(11,11,11,0.45)",
          minWidth: 220,
          transition: "background 0.15s, color 0.15s, border-color 0.15s",
          borderBottom: open ? "1.5px solid rgba(255,255,255,0.1)" : undefined,
        }}
      >
        <SlidersHorizontal style={{ width: 15, height: 15, flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: "left", color: open ? "#fff" : selected.length > 0 ? "#0B0B0B" : "rgba(11,11,11,0.45)", fontWeight: selected.length > 0 ? 600 : 500 }}>
          {label}
        </span>
        <ChevronDown
          style={{
            width: 15,
            height: 15,
            flexShrink: 0,
            color: open ? "rgba(255,255,255,0.5)" : "rgba(11,11,11,0.35)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#0B0B0B",
              border: "1.5px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              zIndex: 50,
              maxHeight: 400,
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <style>{`.genre-panel::-webkit-scrollbar { display: none; }`}</style>

            {/* Clear option */}
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  textAlign: "left",
                  letterSpacing: "0.04em",
                }}
              >
                <X style={{ width: 13, height: 13 }} />
                Clear all
              </button>
            )}

            {/* Category rows */}
            {NICHE_CATEGORIES.map((cat) => {
              const checked = selected.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    width: "100%",
                    padding: "13px 18px",
                    background: checked ? "rgba(255,255,255,0.04)" : "none",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: checked ? 600 : 400,
                    color: checked ? "#fff" : "rgba(255,255,255,0.7)",
                    textAlign: "left",
                    transition: "background 0.1s, color 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!checked) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!checked) (e.currentTarget as HTMLButtonElement).style.background = "none";
                  }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: `1.5px solid ${checked ? "#fff" : "rgba(255,255,255,0.25)"}`,
                      background: checked ? "#fff" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {checked && <Check style={{ width: 11, height: 11, color: "#0B0B0B", strokeWidth: 3 }} />}
                  </div>
                  {cat}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function InfluencerExplore() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = influencers;
    if (selectedCategories.length > 0) {
      list = list.filter((inf) => selectedCategories.includes(inf.niche));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (inf) =>
          inf.name.toLowerCase().includes(q) ||
          inf.username.toLowerCase().includes(q) ||
          inf.niche.toLowerCase().includes(q) ||
          inf.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategories, searchQuery]);

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .influencer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .search-wrap { position: relative; flex: 1; max-width: 320px; }
        .search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border-radius: 12px;
          border: 1.5px solid rgba(11,11,11,0.12);
          background: #fff;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #0B0B0B;
          outline: none;
          transition: border-color 0.15s ease;
          box-sizing: border-box;
        }
        .search-input:focus { border-color: #0B0B0B; }
        .search-input::placeholder { color: rgba(11,11,11,0.3); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(11,11,11,0.3); pointer-events: none; }
        .search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: rgba(11,11,11,0.3); display: flex; align-items: center; background: none; border: none; padding: 0; }
        .search-clear:hover { color: #0B0B0B; }
        @media (max-width: 900px) {
          .influencer-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .filter-row { flex-wrap: wrap; }
          .search-wrap { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .influencer-grid { grid-template-columns: 1fr; gap: 14px; }
          .influencer-hero { padding-top: 100px !important; padding-bottom: 48px !important; }
          .influencer-grid-section { padding: 40px 16px !important; }
          .influencer-cta-section { padding: 0 16px 64px !important; }
          .influencer-cta-box { padding: 36px 20px !important; border-radius: 16px !important; }
          .card-description { display: none; }
          .filter-row { flex-direction: column !important; align-items: stretch !important; }
          .search-wrap { max-width: 100%; }
        }
      `}</style>

      <SEOMeta
        title="Explore Influencers - GrowitBuddy"
        description="Discover proven influencers and content creators who build real engagement and drive meaningful results for ambitious brands."
      />

      {/* Hero */}
      <section className="influencer-hero" style={{ paddingTop: 120, paddingBottom: 72, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Influencer Network</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(36px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 20 }}
          >
            Work With Proven Influencers.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch", marginBottom: 32 }}
          >
            Discover creators who build real engagement and drive meaningful results -- not just impressions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <Link href="/creators">
              <span className="gb-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Join as Influencer
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="influencer-grid-section" style={{ padding: "56px 24px" }}>
        <div className="max-w-[1100px] mx-auto">

          {/* Filter row */}
          <div className="filter-row" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
            {/* Genre dropdown */}
            <GenreDropdown selected={selectedCategories} onChange={setSelectedCategories} />

            {/* Search */}
            <div className="search-wrap">
              <Search className="search-icon" style={{ width: 15, height: 15 }} />
              <input
                className="search-input"
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery("")}>
                  <X style={{ width: 13, height: 13 }} />
                </button>
              )}
            </div>

            {/* Count */}
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(11,11,11,0.35)", marginLeft: "auto", whiteSpace: "nowrap", flexShrink: 0 }}>
              {filtered.length} creator{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Active genre tags */}
          {selectedCategories.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== cat))}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    borderRadius: 100,
                    background: "#0B0B0B",
                    border: "none",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat}
                  <X style={{ width: 11, height: 11, opacity: 0.6 }} />
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div layout className="influencer-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((inf, i) => (
                  <InfluencerCard key={inf.slug} inf={inf} i={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", padding: "80px 24px" }}
            >
              <p style={{ fontWeight: 800, fontSize: 20, color: "#0B0B0B", letterSpacing: "-0.03em", marginBottom: 10 }}>
                No creators found
              </p>
              <p style={{ fontSize: 14, color: "rgba(11,11,11,0.4)", marginBottom: 24 }}>
                Try a different genre or search term.
              </p>
              <button
                onClick={() => { setSelectedCategories([]); setSearchQuery(""); }}
                style={{ fontSize: 13, fontWeight: 600, color: "#0B0B0B", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, fontFamily: "'Inter', sans-serif" }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="influencer-cta-section" style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="influencer-cta-box" style={{ background: "#0B0B0B", borderRadius: 24, padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Are you a creator?</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, maxWidth: "20ch" }}>
              Ready to Get Discovered?
            </h2>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.5)", maxWidth: "44ch", lineHeight: 1.7 }}>
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
