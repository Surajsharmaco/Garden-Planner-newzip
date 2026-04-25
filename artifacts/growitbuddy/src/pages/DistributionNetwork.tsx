import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search, X, SlidersHorizontal, ChevronDown, Check, Globe, Zap } from "lucide-react";
import { distributionPages, DISTRIBUTION_NICHES, DISTRIBUTION_COUNTRIES, type DistributionPage } from "@/data/distributionPages";
import SEOMeta from "@/components/SEOMeta";
import { useState, useMemo, useRef, useEffect } from "react";

/* ── Card ────────────────────────────────────────────────── */
function PageCard({ page, i }: { page: DistributionPage; i: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: i * 0.03, duration: 0.35 }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(11,11,11,0.05)",
          border: "1px solid rgba(11,11,11,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.018)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(11,11,11,0.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(11,11,11,0.05)";
        }}
      >
        {/* Image band */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", background: page.accentColor, flexShrink: 0 }}>
          {!imgError ? (
            <img
              src={page.photo}
              alt={page.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.85 }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em" }}>
              {page.initials}
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,11,11,0.55) 0%, transparent 60%)" }} />

          {/* Niche badge */}
          <div style={{ position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "rgba(11,11,11,0.6)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "4px 12px" }}>
            {page.niche}
          </div>

          {/* High engagement badge */}
          {page.highEngagement && (
            <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#0B0B0B", background: "#F7F7F5", borderRadius: 100, padding: "4px 10px" }}>
              <Zap style={{ width: 9, height: 9, fill: "#0B0B0B" }} />
              High Engagement
            </div>
          )}

          {/* Followers — bottom left */}
          <div style={{ position: "absolute", bottom: 14, left: 14 }}>
            <p style={{ fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{page.followers}</p>
            <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>Followers</p>
          </div>

          {/* Country — bottom right */}
          <div style={{ position: "absolute", bottom: 14, right: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>{page.country}</p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 800, fontSize: 16, color: "#0B0B0B", letterSpacing: "-0.03em", lineHeight: 1.2 }}>{page.name}</p>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(11,11,11,0.35)", marginTop: 3 }}>{page.handle}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#0B0B0B", whiteSpace: "nowrap", flexShrink: 0 }}>
            View Page <ArrowRight style={{ width: 12, height: 12 }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Shared Dropdown ─────────────────────────────────────── */
function FilterDropdown({
  icon,
  placeholder,
  selected,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  selected: string[];
  options: string[];
  onChange: (vals: string[]) => void;
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

  function toggle(val: string) {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  }

  const label =
    selected.length === 0
      ? placeholder
      : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px",
          background: open ? "#0B0B0B" : "#fff",
          border: `1.5px solid ${open ? "#0B0B0B" : "rgba(11,11,11,0.14)"}`,
          borderRadius: open ? "12px 12px 0 0" : 12,
          borderBottom: open ? "1.5px solid rgba(255,255,255,0.1)" : undefined,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: selected.length > 0 ? 600 : 400,
          color: open ? "#fff" : selected.length > 0 ? "#0B0B0B" : "rgba(11,11,11,0.45)",
          minWidth: 200,
          transition: "background 0.15s, color 0.15s, border-color 0.15s",
        }}
      >
        <span style={{ color: open ? "rgba(255,255,255,0.5)" : "rgba(11,11,11,0.35)", flexShrink: 0, display: "flex" }}>{icon}</span>
        <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
        <ChevronDown style={{ width: 14, height: 14, flexShrink: 0, color: open ? "rgba(255,255,255,0.4)" : "rgba(11,11,11,0.3)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
              background: "#0B0B0B",
              borderRadius: "0 0 12px 12px",
              border: "1.5px solid #0B0B0B", borderTop: "none",
              maxHeight: 260, overflowY: "auto",
            }}
          >
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 16px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textAlign: "left" }}
              >
                <X style={{ width: 12, height: 12 }} />
                Clear all
              </button>
            )}
            {options.map((opt) => {
              const checked = selected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "13px 16px",
                    background: checked ? "rgba(255,255,255,0.04)" : "none",
                    border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14,
                    fontWeight: checked ? 600 : 400,
                    color: checked ? "#fff" : "rgba(255,255,255,0.7)",
                    textAlign: "left", transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${checked ? "#fff" : "rgba(255,255,255,0.25)"}`, background: checked ? "#fff" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                    {checked && <Check style={{ width: 11, height: 11, color: "#0B0B0B", strokeWidth: 3 }} />}
                  </div>
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100, background: "#0B0B0B", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", letterSpacing: "-0.01em" }}
    >
      {label}
      <X style={{ width: 11, height: 11, opacity: 0.5 }} />
    </button>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function DistributionNetwork() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = distributionPages.filter((p) => p.profileEnabled !== false);
    if (selectedGenres.length > 0) list = list.filter((p) => selectedGenres.includes(p.niche));
    if (selectedCountries.length > 0) list = list.filter((p) => selectedCountries.includes(p.country));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q) || p.niche.toLowerCase().includes(q));
    }
    return list;
  }, [selectedGenres, selectedCountries, searchQuery]);

  const hasActiveFilters = selectedGenres.length > 0 || selectedCountries.length > 0;
  function clearAll() { setSelectedGenres([]); setSelectedCountries([]); setSearchQuery(""); }

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .dist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .dist-filter-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .dist-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .dist-search-input {
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
        .dist-search-input:focus { border-color: #0B0B0B; }
        .dist-search-input::placeholder { color: rgba(11,11,11,0.3); }
        .dist-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(11,11,11,0.3); pointer-events: none; }
        .dist-search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: rgba(11,11,11,0.3); display: flex; align-items: center; background: none; border: none; padding: 0; }
        .dist-search-clear:hover { color: #0B0B0B; }
        .dist-step-num { width: 36px; height: 36px; border-radius: 50%; background: #0B0B0B; color: #fff; font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (max-width: 900px) {
          .dist-grid { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 600px) {
          .dist-grid { grid-template-columns: 1fr; gap: 14px; }
          .dist-filter-row { flex-wrap: wrap; }
          .dist-search-wrap { flex: 1 1 100%; max-width: 100% !important; }
        }
      `}</style>

      <SEOMeta
        title="Distribution Network - GrowitBuddy"
        description="Access a curated network of high-reach meme and theme pages. Distribute your content at scale and reach the right audience faster."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 72, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Distribution Network</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(36px, 7vw, 80px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 20 }}
          >
            Plug Into High-Performing Distribution.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch", marginBottom: 32 }}
          >
            Access a curated network of meme and theme pages with millions of followers. Distribute your content at scale and reach the right audience faster.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <Link href="/contact">
              <span className="gb-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Run a Campaign
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: "56px 24px" }}>
        <div className="max-w-[1100px] mx-auto">

          {/* Filter row */}
          <div className="dist-filter-row" style={{ marginBottom: 20 }}>
            <div className="filter-dropdown-wrap">
              <FilterDropdown
                icon={<SlidersHorizontal style={{ width: 15, height: 15 }} />}
                placeholder="Select Genre"
                selected={selectedGenres}
                options={[...DISTRIBUTION_NICHES]}
                onChange={setSelectedGenres}
              />
            </div>
            <div className="filter-dropdown-wrap">
              <FilterDropdown
                icon={<Globe style={{ width: 15, height: 15 }} />}
                placeholder="Select Country"
                selected={selectedCountries}
                options={[...DISTRIBUTION_COUNTRIES]}
                onChange={setSelectedCountries}
              />
            </div>
            <div className="dist-search-wrap">
              <Search className="dist-search-icon" style={{ width: 15, height: 15 }} />
              <input
                className="dist-search-input"
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="dist-search-clear" onClick={() => setSearchQuery("")}>
                  <X style={{ width: 13, height: 13 }} />
                </button>
              )}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(11,11,11,0.35)", marginLeft: "auto", whiteSpace: "nowrap", flexShrink: 0 }}>
              {filtered.length} page{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Active tags */}
          {hasActiveFilters && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, alignItems: "center" }}>
              {selectedGenres.map((g) => <ActiveTag key={g} label={g} onRemove={() => setSelectedGenres(selectedGenres.filter((x) => x !== g))} />)}
              {selectedCountries.map((c) => <ActiveTag key={c} label={c} onRemove={() => setSelectedCountries(selectedCountries.filter((x) => x !== c))} />)}
              <button onClick={clearAll} style={{ fontSize: 12, fontWeight: 600, color: "rgba(11,11,11,0.4)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginLeft: 4, textDecoration: "underline", textUnderlineOffset: 3 }}>
                Clear all
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div layout className="dist-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((page, i) => <PageCard key={page.slug} page={page} i={i} />)}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "80px 24px" }}>
              <p style={{ fontWeight: 800, fontSize: 20, color: "#0B0B0B", letterSpacing: "-0.03em", marginBottom: 10 }}>No pages found</p>
              <p style={{ fontSize: 14, color: "rgba(11,11,11,0.4)", marginBottom: 24 }}>Try a different genre, country, or search term.</p>
              <button onClick={clearAll} style={{ fontSize: 13, fontWeight: 600, color: "#0B0B0B", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, fontFamily: "'Inter', sans-serif" }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* What You Get */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(11,11,11,0.07)" }}>
        <div className="max-w-[1100px] mx-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 14 }}>The Advantage</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.08, marginBottom: 20 }}>
              What You Get
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.45)", lineHeight: 1.75, maxWidth: "40ch" }}>
              Every page in our network is vetted for real engagement. You get access to distribution that actually converts.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "High-reach distribution", desc: "Tap into pages with millions of engaged followers across every major niche." },
              { label: "Access to engaged audiences", desc: "Not just followers — communities that interact, share, and act." },
              { label: "Faster visibility for your content", desc: "Skip the slow ramp. Get in front of the right people from day one." },
              { label: "Scalable content amplification", desc: "Run campaigns across multiple pages simultaneously for compound reach." },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0B0B0B", marginTop: 8, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#0B0B0B", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "80px 24px", background: "#fff", borderTop: "1px solid rgba(11,11,11,0.07)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 14 }}>Process</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.08, marginBottom: 56 }}>
            How It Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { num: "01", title: "Choose your niche", desc: "Filter by genre to find pages that match your target audience perfectly." },
              { num: "02", title: "Select relevant pages", desc: "Browse vetted meme and theme pages by reach, country, and engagement." },
              { num: "03", title: "Run your campaign", desc: "We coordinate content distribution across your selected pages simultaneously." },
              { num: "04", title: "Track reach and performance", desc: "Get full reporting on reach, impressions, and campaign performance." },
            ].map(({ num, title, desc }) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: parseInt(num) * 0.08 }}
              >
                <div className="dist-step-num" style={{ marginBottom: 16 }}>{num}</div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#0B0B0B", marginBottom: 8, letterSpacing: "-0.02em" }}>{title}</p>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto" style={{ paddingTop: 64 }}>
          <div style={{ background: "#0B0B0B", borderRadius: 24, padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Ready to scale?</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, maxWidth: "22ch" }}>
              Ready to Distribute at Scale?
            </h2>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.5)", maxWidth: "44ch", lineHeight: 1.7 }}>
              Leverage our network to get your content in front of the right audience. Fast, targeted, and measurable.
            </p>
            <Link href="/contact">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0B0B0B", fontWeight: 700, fontSize: 14, borderRadius: 100, padding: "12px 24px", cursor: "pointer" }}>
                Start a Campaign
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
