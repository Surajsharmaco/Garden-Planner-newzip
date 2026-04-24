import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search, X } from "lucide-react";
import { influencers, NICHE_CATEGORIES } from "@/data/influencers";
import SEOMeta from "@/components/SEOMeta";
import { useState, useMemo } from "react";

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

export default function InfluencerExplore() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = influencers;
    if (activeCategory !== "All") {
      list = list.filter((inf) => inf.niche === activeCategory);
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
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .influencer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .filter-bar {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-pill {
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 600;
          border-radius: 100px;
          padding: 7px 16px;
          cursor: pointer;
          border: 1.5px solid rgba(11,11,11,0.12);
          background: transparent;
          color: rgba(11,11,11,0.5);
          transition: all 0.15s ease;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
        }
        .filter-pill:hover {
          border-color: rgba(11,11,11,0.3);
          color: #0B0B0B;
        }
        .filter-pill.active {
          background: #0B0B0B;
          border-color: #0B0B0B;
          color: #fff;
        }
        .search-wrap {
          position: relative;
          width: 260px;
          flex-shrink: 0;
        }
        .search-input {
          width: 100%;
          padding: 8px 14px 8px 36px;
          border-radius: 100px;
          border: 1.5px solid rgba(11,11,11,0.12);
          background: #fff;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          color: #0B0B0B;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .search-input:focus { border-color: #0B0B0B; }
        .search-input::placeholder { color: rgba(11,11,11,0.3); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(11,11,11,0.3); pointer-events: none; }
        .search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: rgba(11,11,11,0.3); display: flex; align-items: center; }
        .search-clear:hover { color: #0B0B0B; }
        @media (max-width: 900px) {
          .influencer-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .search-wrap { width: 100%; }
        }
        @media (max-width: 600px) {
          .influencer-grid { grid-template-columns: 1fr; gap: 14px; }
          .influencer-hero { padding-top: 100px !important; padding-bottom: 48px !important; }
          .influencer-grid-section { padding: 40px 16px !important; }
          .influencer-cta-section { padding: 0 16px 64px !important; }
          .influencer-cta-box { padding: 36px 20px !important; border-radius: 16px !important; }
          .card-description { display: none; }
          .filter-controls { flex-direction: column !important; gap: 12px !important; }
          .search-wrap { width: 100%; }
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

          {/* Controls row */}
          <div className="filter-controls" style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
            {/* Search */}
            <div className="search-wrap">
              <Search className="search-icon" style={{ width: 14, height: 14 }} />
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
            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(11,11,11,0.35)" }}>
                {filtered.length} creator{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Category pills */}
          <div className="filter-bar" style={{ marginBottom: 36 }}>
            <button
              className={`filter-pill${activeCategory === "All" ? " active" : ""}`}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {NICHE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-pill${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

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
                Try a different category or search term.
              </p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                style={{ fontSize: 13, fontWeight: 600, color: "#0B0B0B", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
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
