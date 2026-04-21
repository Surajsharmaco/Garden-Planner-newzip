import { Link } from "wouter";

/* omc.com footer — minimal: just copyright + privacy/terms + no huge dark block */
export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        padding: "28px 24px",
        background: "#fff",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 12,
            color: "rgba(0,0,0,0.3)",
          }}
        >
          &copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Privacy Notice", "#"], ["Terms of Use", "#"], ["Cookie Preferences", "#"]].map(([l, h]) => (
            <a
              key={l}
              href={h}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 12,
                color: "rgba(0,0,0,0.3)",
                textDecoration: "none",
              }}
              className="hover:text-black transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
