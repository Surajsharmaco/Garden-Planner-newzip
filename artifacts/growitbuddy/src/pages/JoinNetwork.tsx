import { motion } from "framer-motion";
import { useLocation } from "wouter";
import SEOMeta from "@/components/SEOMeta";

const options = [
  {
    number: "01",
    title: "I'm an Influencer",
    desc: "I create content on my personal profile and collaborate with brands.",
    cta: "Continue as Influencer",
    href: "/creators",
  },
  {
    number: "02",
    title: "I run a Page",
    subtitle: "Meme / Theme Page",
    desc: "I manage a content page and distribute content to a large audience.",
    cta: "Continue as Page Owner",
    href: "/contact",
  },
];

export default function JoinNetwork() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .jn-card {
          background: #fff;
          border: 1.5px solid rgba(11,11,11,0.08);
          border-radius: 24px;
          padding: 48px 40px 44px;
          flex: 1;
          min-width: 0;
          cursor: pointer;
          transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
          display: flex;
          flex-direction: column;
          gap: 0;
          user-select: none;
        }
        .jn-card:hover {
          box-shadow: 0 24px 64px rgba(11,11,11,0.10);
          transform: translateY(-5px) scale(1.01);
          border-color: rgba(11,11,11,0.16);
        }
        .jn-card:hover .jn-btn {
          background: #0B0B0B;
          color: #fff;
        }
        .jn-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F7F7F5;
          color: #0B0B0B;
          font-size: 14px;
          font-weight: 700;
          border-radius: 100px;
          padding: 13px 24px;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          width: fit-content;
          transition: background 0.2s ease, color 0.2s ease;
          pointer-events: none;
        }
        .jn-cards-row {
          display: flex;
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 680px) {
          .jn-cards-row { flex-direction: column; }
          .jn-card { padding: 36px 28px 36px; }
        }
      `}</style>

      <SEOMeta
        title="Join Our Network - GrowitBuddy"
        description="Join the GrowitBuddy network. Are you an influencer or a page owner? Choose your path."
      />

      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)", marginBottom: 16 }}>
            Join Our Network
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{ fontWeight: 800, fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: "1.03", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 18 }}
          >
            Join the GrowitBuddy Network.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(11,11,11,0.42)", lineHeight: 1.75, maxWidth: "46ch" }}
          >
            Choose how you want to be part of the network.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: "0 24px 72px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="jn-cards-row">
            {options.map((opt, i) => (
              <motion.div
                key={opt.number}
                className="jn-card"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.1, duration: 0.5 }}
                onClick={() => navigate(opt.href)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(opt.href)}
              >
                {/* Number */}
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.22)", marginBottom: 28 }}>
                  {opt.number}
                </p>

                {/* Title */}
                <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 36px)", letterSpacing: "-0.035em", color: "#0B0B0B", lineHeight: 1.1, marginBottom: opt.subtitle ? 6 : 0 }}>
                  {opt.title}
                </h2>
                {opt.subtitle && (
                  <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.3)", letterSpacing: "0.01em", marginBottom: 0 }}>
                    {opt.subtitle}
                  </p>
                )}

                {/* Divider */}
                <div style={{ width: 40, height: 2, background: "rgba(11,11,11,0.08)", borderRadius: 2, margin: "24px 0" }} />

                {/* Desc */}
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.45)", lineHeight: 1.75, marginBottom: 40, flex: 1 }}>
                  {opt.desc}
                </p>

                {/* CTA */}
                <span className="jn-btn">
                  {opt.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom note */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "rgba(11,11,11,0.32)", lineHeight: 1.7 }}>
            Not sure where you fit? Choose the closest option — we'll guide you from there.
          </p>
        </div>
      </section>
    </div>
  );
}
