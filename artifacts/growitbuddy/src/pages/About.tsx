import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";
import { usePublicContent } from "@/hooks/usePublicContent";

interface TeamMember { name: string; role: string; photo: string; }
interface Value { title: string; description: string; }

interface AboutData {
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderPhoto: string;
  founderLinkedin: string;
  founderTwitter: string;
  founderInstagram: string;
  missionHeadline: string;
  missionBody: string;
  team: TeamMember[];
  values: Value[];
}

const DEFAULTS: AboutData = {
  founderName: "Suraj Sharma",
  founderRole: "Founder & CEO",
  founderBio: "We build content and distribution systems that help founders and creators become the most recognized voices in their space.",
  founderPhoto: "",
  founderLinkedin: "",
  founderTwitter: "",
  founderInstagram: "",
  missionHeadline: "Expertise deserves to be heard.",
  missionBody: "Most founders and creators we work with are genuinely exceptional at what they do. The problem is never the expertise - it's the communication system around it. We fix that by building content and distribution systems that consistently put the right message in front of the right people.",
  team: [],
  values: [
    { title: "Signal over noise", description: "We build for impact, not visibility. Every piece of content is designed to build credibility and attract the right opportunities." },
    { title: "Systems, not one-offs", description: "We don't run campaigns. We build infrastructure - repeatable systems that compound and create leverage over time." },
    { title: "Radical clarity", description: "Our clients always know what's working, what isn't, and what's next. Honest, clear communication is the foundation of any great partnership." },
  ],
};

export default function About() {
  const data = usePublicContent<AboutData>("about", DEFAULTS);

  const founderSocials = [
    { label: "LinkedIn", href: data.founderLinkedin },
    { label: "Twitter", href: data.founderTwitter },
    { label: "Instagram", href: data.founderInstagram },
  ].filter((s) => s.href);

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="About GrowitBuddy | Content Marketing Agency for Founders & Creators"
        description="GrowitBuddy is a content marketing agency. We help founders and creators build authority through personal branding strategy and content systems."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>About</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            We build authority systems for founders and creators who are serious about growth.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "55ch" }}
          >
            A team of strategists, writers, and editors who believe deep expertise deserves a much wider audience.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              aspectRatio: "1",
              borderRadius: 24,
              background: "linear-gradient(135deg, #1a1a1a 0%, #0B0B0B 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#0B0B0B",
              letterSpacing: "-0.04em",
            }}
          >
            Authority.<br />Architected.
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Mission</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: "1.1", color: "#0B0B0B", marginBottom: 20 }}>
              {data.missionHeadline}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.8", marginBottom: 32 }}>
              {data.missionBody}
            </p>
            <Link href="/services">
              <span className="gb-btn" style={{ fontSize: 14 }}>
                See our services
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "80px 24px", background: "#0B0B0B", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 items-start">

            {/* Left — founder card */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5">
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.14)", flexShrink: 0, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {data.founderPhoto ? (
                  <img
                    src={data.founderPhoto}
                    alt={data.founderName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                    {data.founderName.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "#fff", marginBottom: 3 }}>{data.founderName}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>{data.founderRole}</p>
                {founderSocials.length > 0 && (
                  <div style={{ display: "flex", gap: 14 }}>
                    {founderSocials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                        className="hover:text-white transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right — quote + body */}
            <div style={{ maxWidth: 650 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 28 }}>The Origin</p>

              <p style={{ fontWeight: 800, fontSize: "clamp(20px, 2.8vw, 36px)", letterSpacing: "-0.035em", lineHeight: "1.2", color: "#fff", marginBottom: 20 }}>
                I built GrowitBuddy after seeing a pattern - the best people weren't the most visible.
              </p>

              <p style={{ fontWeight: 700, fontSize: "clamp(16px, 1.8vw, 22px)", letterSpacing: "-0.02em", lineHeight: "1.5", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
                Louder voices were winning.<br />Not better ones.
              </p>

              <p style={{ fontWeight: 800, fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.03em", lineHeight: "1.3", color: "#fff", marginBottom: 40 }}>
                <span style={{ color: "#fff" }}>Authority</span> isn't given.<br />
                It's built - with the right <span style={{ color: "#fff", borderBottom: "2px solid rgba(255,255,255,0.25)", paddingBottom: 1 }}>system</span>.
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32 }}>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: "1.85" }}>
                  {data.founderBio}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      {data.values.length > 0 && (
        <section style={{ padding: "80px 24px", background: "#fff" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Values</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0B0B0B", marginBottom: 48 }}>How we operate.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 1, background: "rgba(11,11,11,0.08)", borderRadius: 16, overflow: "hidden" }}>
              {data.values.map((v, i) => (
                <div key={i} style={{ background: "#fff", padding: "36px 32px" }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "rgba(11,11,11,0.2)", marginBottom: 20 }}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {data.team.length > 0 && (
        <section style={{ padding: "80px 24px", background: "#F7F7F5" }}>
          <div className="max-w-[1100px] mx-auto">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Team</p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0B0B0B", marginBottom: 48 }}>The people behind the work.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
              {data.team.map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", margin: "0 auto 14px", background: "#E8E8E5", border: "2px solid rgba(11,11,11,0.08)" }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#0B0B0B" }}>
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: "#0B0B0B", marginBottom: 4 }}>{m.name}</h4>
                  <p style={{ fontSize: 13, color: "rgba(11,11,11,0.45)" }}>{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#F7F7F5", textAlign: "center", borderTop: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 16 }}>
            Ready to work with us?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 32 }}>
            Book a free strategy call. We'll map out your positioning, your content gaps, and exactly how to build from here.
          </p>
          <Link href="/contact">
            <span className="gb-btn" style={{ margin: "0 auto", fontSize: 14 }}>
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
