import { Link } from "wouter";

/* vivafoxdigital.com footer — dark, minimal: logo + links + copyright */
export function Footer() {
  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                G
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                GrowitBuddy
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                maxWidth: "28ch",
                lineHeight: "1.6",
              }}
            >
              Content & Authority Studio for founders and creators.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 16,
              }}
            >
              Useful Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/work", label: "Portfolio" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "#", label: "Privacy" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.45)",
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

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            &copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
