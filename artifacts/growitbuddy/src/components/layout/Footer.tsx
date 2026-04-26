import { Link } from "wouter";
import { usePublicContent } from "@/hooks/usePublicContent";

interface FooterLink { label: string; path: string; }
interface FooterColumn { title: string; links: FooterLink[]; }

interface FooterData {
  tagline: string;
  email: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  columns: FooterColumn[];
  legalText: string;
}

const DEFAULTS: FooterData = {
  tagline: "Content & Authority Studio for founders, creators and growing brands.",
  email: "hello@growitbuddy.com",
  linkedin: "",
  twitter: "",
  instagram: "",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Authority Strategy", path: "/services" },
        { label: "Content Systems", path: "/services" },
        { label: "Video Editing", path: "/services" },
        { label: "Distribution", path: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", path: "/about" },
        { label: "Work", path: "/work" },
        { label: "Framework", path: "/framework" },
        { label: "Blog", path: "/insights" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Join Us",
      links: [
        { label: "Influencer Network", path: "/creators" },
        { label: "Talent Network", path: "/freelancers" },
        { label: "Authority Audit", path: "/authority-audit" },
      ],
    },
  ],
  legalText: `${new Date().getFullYear()} GrowitBuddy. All rights reserved.`,
};

const socialLinks = [
  { key: "linkedin" as const, label: "LinkedIn" },
  { key: "twitter" as const, label: "Twitter" },
  { key: "instagram" as const, label: "Instagram" },
];

export function Footer() {
  const data = usePublicContent<FooterData>("footer", DEFAULTS);

  const activeSocials = socialLinks.filter((s) => data[s.key]);

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
                <span
                  style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  G
                </span>
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
              {data.tagline}
            </p>
            <a
              href={`mailto:${data.email}`}
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
              {data.email}
            </a>
            {activeSocials.length > 0 && (
              <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
                {activeSocials.map((s) => (
                  <a
                    key={s.key}
                    href={data[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {data.columns.map((col, ci) => (
            <div key={ci}>
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
                {col.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l, li) => (
                  <Link key={li} href={l.path}>
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
          ))}
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
            &copy; {data.legalText}
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
