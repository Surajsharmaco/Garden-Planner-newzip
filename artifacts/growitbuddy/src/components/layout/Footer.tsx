import { Link } from "wouter";

export function Footer() {
  return (
    <footer
      style={{
        background: "#0B0B0B",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 24px 32px",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 48,
            marginBottom: 56,
          }}
        >
          <div style={{ gridColumn: "span 2" }}>
            <Link href="/">
              <span className="inline-flex items-center gap-2 cursor-pointer mb-4" style={{ display: "flex" }}>
                <img
                  src={`${import.meta.env.BASE_URL}logo-light.png`}
                  alt="GrowitBuddy"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: "contain",
                    flexShrink: 0,
                    mixBlendMode: "screen",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  GrowitBuddy
                </span>
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "28ch",
                lineHeight: "1.7",
                marginTop: 4,
              }}
            >
              Content & Authority Studio for founders, creators and growing brands.
            </p>
            <a
              href="mailto:hello@growitbuddy.com"
              style={{
                display: "inline-block",
                marginTop: 16,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
                textDecoration: "none",
              }}
              className="hover:text-white transition-colors"
            >
              hello@growitbuddy.com
            </a>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 18,
              }}
            >
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/services", label: "Authority Strategy" },
                { href: "/services", label: "Content Systems" },
                { href: "/services", label: "Video Editing" },
                { href: "/services", label: "Distribution" },
              ].map((l) => (
                <Link key={l.label} href={l.href}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      display: "block",
                      transition: "color 0.15s",
                    }}
                    className="hover:text-white"
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 18,
              }}
            >
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/about", label: "About" },
                { href: "/work", label: "Work" },
                { href: "/framework", label: "Framework" },
                { href: "/insights", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      display: "block",
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 18,
              }}
            >
              Join Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/creators", label: "For Creators" },
                { href: "/freelancers", label: "For Freelancers" },
                { href: "/authority-audit", label: "Authority Audit" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      display: "block",
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            &copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.2)",
                  textDecoration: "none",
                }}
                className="hover:text-white/50 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
