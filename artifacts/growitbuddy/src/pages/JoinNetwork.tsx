import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Megaphone } from "lucide-react";
import SEOMeta from "@/components/SEOMeta";

const cards = [
  {
    icon: <Users style={{ width: 28, height: 28 }} />,
    label: "Option 01",
    title: "Join as an Influencer",
    desc: "Collaborate with brands, grow your presence, and unlock new opportunities.",
    cta: "Apply as Influencer",
    href: "/creators",
  },
  {
    icon: <Megaphone style={{ width: 28, height: 28 }} />,
    label: "Option 02",
    title: "Join Distribution Network",
    desc: "Be part of our meme and theme page network and help distribute content at scale.",
    cta: "Apply for Distribution Network",
    href: "/contact",
  },
];

export default function JoinNetwork() {
  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .join-card {
          background: #fff;
          border: 1.5px solid rgba(11,11,11,0.08);
          border-radius: 24px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          min-width: 0;
          transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
          cursor: default;
        }
        .join-card:hover {
          box-shadow: 0 20px 60px rgba(11,11,11,0.09);
          transform: translateY(-4px);
          border-color: rgba(11,11,11,0.14);
        }
        .join-cards-row {
          display: flex;
          gap: 24px;
          align-items: stretch;
        }
        .join-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0B0B0B;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          border-radius: 100px;
          padding: 13px 24px;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
          transition: opacity 0.15s ease;
          width: fit-content;
        }
        .join-cta-btn:hover { opacity: 0.82; }
        @media (max-width: 700px) {
          .join-cards-row { flex-direction: column; }
          .join-card { padding: 36px 28px; }
        }
      `}</style>

      <SEOMeta
        title="Join Our Network - GrowitBuddy"
        description="Join the GrowitBuddy network as an influencer or a distribution page. Two paths, one ecosystem."
      />

      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 16 }}>
            Join Our Network
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{ fontWeight: 800, fontSize: "clamp(36px, 7vw, 76px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 20 }}
          >
            Choose Your Path.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(11,11,11,0.45)", lineHeight: 1.75, maxWidth: "50ch" }}
          >
            Two ways to become part of a growing ecosystem. Pick the one that fits you.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="join-cards-row">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                className="join-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                {/* Icon */}
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B0B0B", marginBottom: 32 }}>
                  {card.icon}
                </div>

                {/* Label */}
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)", marginBottom: 12 }}>
                  {card.label}
                </p>

                {/* Title */}
                <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.03em", color: "#0B0B0B", lineHeight: 1.15, marginBottom: 16 }}>
                  {card.title}
                </h2>

                {/* Divider */}
                <div style={{ width: 40, height: 2, background: "rgba(11,11,11,0.1)", borderRadius: 2, marginBottom: 20 }} />

                {/* Desc */}
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.45)", lineHeight: 1.75, marginBottom: 40, flex: 1 }}>
                  {card.desc}
                </p>

                {/* CTA */}
                <Link href={card.href}>
                  <span className="join-cta-btn">
                    {card.cta}
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ borderTop: "1px solid rgba(11,11,11,0.08)", paddingTop: 72, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)" }}>
              Ready?
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 52px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.1, maxWidth: "22ch" }}>
              Ready to Join the Network?
            </h2>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(11,11,11,0.4)", maxWidth: "44ch", lineHeight: 1.75 }}>
              Choose your path and become part of a growing ecosystem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
