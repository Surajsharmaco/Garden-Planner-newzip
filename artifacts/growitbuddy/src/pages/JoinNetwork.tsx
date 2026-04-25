import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import SEOMeta from "@/components/SEOMeta";

export default function JoinNetwork() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .jn-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .jn-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .jn-card {
          border-radius: 24px;
          padding: 52px 44px 48px;
          display: flex;
          flex-direction: column;
          gap: 0;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          min-height: 400px;
        }
        .jn-card:hover {
          transform: translateY(-6px) scale(1.01);
        }
        .jn-card-dark {
          background: #0B0B0B;
          box-shadow: 0 4px 24px rgba(11,11,11,0.18);
        }
        .jn-card-dark:hover {
          box-shadow: 0 28px 72px rgba(11,11,11,0.28);
        }
        .jn-card-light {
          background: #fff;
          border: 1.5px solid rgba(11,11,11,0.10);
          box-shadow: 0 2px 12px rgba(11,11,11,0.04);
        }
        .jn-card-light:hover {
          box-shadow: 0 28px 72px rgba(11,11,11,0.10);
          border-color: rgba(11,11,11,0.18);
        }
        .jn-card-dark .jn-num   { color: rgba(255,255,255,0.18); }
        .jn-card-dark .jn-title { color: #fff; }
        .jn-card-dark .jn-sub   { color: rgba(255,255,255,0.4); }
        .jn-card-dark .jn-rule  { background: rgba(255,255,255,0.1); }
        .jn-card-dark .jn-desc  { color: rgba(255,255,255,0.5); }
        .jn-card-dark .jn-btn   { background: #fff; color: #0B0B0B; }
        .jn-card-dark .jn-btn:hover { opacity: 0.88; }
        .jn-card-light .jn-num  { color: rgba(11,11,11,0.18); }
        .jn-card-light .jn-title { color: #0B0B0B; }
        .jn-card-light .jn-sub  { color: rgba(11,11,11,0.35); }
        .jn-card-light .jn-rule { background: rgba(11,11,11,0.08); }
        .jn-card-light .jn-desc { color: rgba(11,11,11,0.45); }
        .jn-card-light .jn-btn  { background: #0B0B0B; color: #fff; }
        .jn-card-light .jn-btn:hover { opacity: 0.82; }
        .jn-num   { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 32px; display: block; }
        .jn-title { font-weight: 800; font-size: clamp(28px, 3.5vw, 42px); letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 0; }
        .jn-sub   { font-size: 13px; font-weight: 600; letter-spacing: 0.01em; margin-top: 6px; }
        .jn-rule  { width: 36px; height: 2px; border-radius: 2px; margin: 24px 0; flex-shrink: 0; }
        .jn-desc  { font-size: 15px; line-height: 1.75; flex: 1; margin-bottom: 40px; }
        .jn-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 100px;
          padding: 13px 24px;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          width: fit-content;
          transition: opacity 0.15s ease;
          pointer-events: none;
          letter-spacing: -0.01em;
        }
        .jn-deco {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          pointer-events: none;
        }
        .jn-deco-dark  { background: rgba(255,255,255,0.03); }
        .jn-deco-light { background: rgba(11,11,11,0.03); }
        @media (max-width: 680px) {
          .jn-cards { grid-template-columns: 1fr; }
          .jn-card  { padding: 40px 32px 40px; min-height: auto; }
        }
      `}</style>

      <SEOMeta
        title="Join Our Network - GrowitBuddy"
        description="Join the GrowitBuddy network. Are you an influencer or a page owner? Choose your path."
      />

      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 56, paddingLeft: 24, paddingRight: 24 }}>
        <div className="jn-wrap">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)", marginBottom: 18 }}>
            Join Our Network
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{ fontWeight: 800, fontSize: "clamp(40px, 7vw, 80px)", letterSpacing: "-0.045em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 20 }}
          >
            Choose Your Path.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(11,11,11,0.42)", lineHeight: 1.75, maxWidth: "44ch" }}
          >
            Two ways to become part of a growing ecosystem. Pick the one that fits you.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: "0 24px 56px" }}>
        <div className="jn-wrap">
          <div className="jn-cards">

            {/* Card 1 — Dark */}
            <motion.div
              className="jn-card jn-card-dark"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              onClick={() => navigate("/creators")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/creators")}
            >
              <div className="jn-deco jn-deco-dark" />
              <span className="jn-num">01</span>
              <h2 className="jn-title">I'm an Influencer</h2>
              <div className="jn-rule" />
              <p className="jn-desc">
                I create content on my personal profile, build an audience, and collaborate with brands.
              </p>
              <span className="jn-btn">
                Continue as Influencer
                <ArrowRight style={{ width: 14, height: 14 }} />
              </span>
            </motion.div>

            {/* Card 2 — Light */}
            <motion.div
              className="jn-card jn-card-light"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              onClick={() => navigate("/join/page-owner")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/join/page-owner")}
            >
              <div className="jn-deco jn-deco-light" />
              <span className="jn-num">02</span>
              <h2 className="jn-title">I run a Page</h2>
              <p className="jn-sub">Meme / Theme Page</p>
              <div className="jn-rule" />
              <p className="jn-desc">
                I manage a content page with a large audience and help distribute content at scale.
              </p>
              <span className="jn-btn">
                Continue as Page Owner
                <ArrowRight style={{ width: 14, height: 14 }} />
              </span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer note */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="jn-wrap" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(11,11,11,0.28)", lineHeight: 1.7, borderTop: "1px solid rgba(11,11,11,0.07)", paddingTop: 32 }}>
            Not sure where you fit? Choose the closest option — we'll guide you from there.
          </p>
        </div>
      </section>
    </div>
  );
}
