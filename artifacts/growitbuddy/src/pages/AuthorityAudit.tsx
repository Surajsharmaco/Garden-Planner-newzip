import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

type Answer = Record<number, string>;

const QUESTIONS = [
  {
    id: 0,
    question: "What is your name?",
    type: "text",
    placeholder: "Your full name",
    key: "name",
  },
  {
    id: 1,
    question: "What is your primary niche or industry?",
    type: "text",
    placeholder: "e.g. B2B SaaS, Health & Wellness, Real Estate",
    key: "niche",
  },
  {
    id: 2,
    question: "What is your primary platform?",
    type: "choice",
    options: ["LinkedIn", "YouTube", "X / Twitter", "Instagram", "TikTok", "Podcast", "Newsletter"],
    key: "platform",
  },
  {
    id: 3,
    question: "How often do you post content?",
    type: "choice",
    options: ["Daily", "3–5x per week", "1–2x per week", "A few times a month", "Rarely"],
    key: "frequency",
  },
  {
    id: 4,
    question: "What is your primary content goal?",
    type: "choice",
    options: ["Build brand awareness", "Generate inbound leads", "Establish thought leadership", "Grow an audience", "Drive direct sales"],
    key: "goal",
  },
  {
    id: 5,
    question: "How clear is your content positioning?",
    type: "choice",
    options: ["Very clear — I have a specific angle", "Somewhat clear — still refining", "Unclear — I post broadly", "I have no positioning strategy"],
    key: "positioning",
  },
  {
    id: 6,
    question: "Do you have a system for content creation?",
    type: "choice",
    options: ["Yes — a fully documented system", "Partially — some consistency", "No — I improvise each week", "No — I barely post"],
    key: "system",
  },
  {
    id: 7,
    question: "Are you generating inbound opportunities from your content?",
    type: "choice",
    options: ["Yes — regularly", "Occasionally", "Rarely", "Never"],
    key: "inbound",
  },
];

function computeScore(answers: Answer): { total: number; breakdown: { label: string; score: number; max: number }[] } {
  const posMap: Record<string, number> = {
    "Very clear — I have a specific angle": 25,
    "Somewhat clear — still refining": 15,
    "Unclear — I post broadly": 8,
    "I have no positioning strategy": 0,
  };
  const freqMap: Record<string, number> = {
    Daily: 25, "3–5x per week": 20, "1–2x per week": 14, "A few times a month": 7, Rarely: 0,
  };
  const sysMap: Record<string, number> = {
    "Yes — a fully documented system": 25,
    "Partially — some consistency": 15,
    "No — I improvise each week": 7,
    "No — I barely post": 0,
  };
  const inbMap: Record<string, number> = {
    "Yes — regularly": 25, Occasionally: 15, Rarely: 7, Never: 0,
  };

  const positioning = posMap[answers[5]] ?? 8;
  const consistency = freqMap[answers[3]] ?? 7;
  const system = sysMap[answers[6]] ?? 7;
  const inbound = inbMap[answers[7]] ?? 0;
  const total = Math.round((positioning + consistency + system + inbound) / 1);

  return {
    total,
    breakdown: [
      { label: "Positioning Clarity", score: positioning, max: 25 },
      { label: "Content Consistency", score: consistency, max: 25 },
      { label: "System Strength", score: system, max: 25 },
      { label: "Inbound Generation", score: inbound, max: 25 },
    ],
  };
}

function getScoreLabel(score: number) {
  if (score >= 80) return { label: "Authority Leader", color: "#0B0B0B" };
  if (score >= 60) return { label: "Authority Builder", color: "#0B0B0B" };
  if (score >= 40) return { label: "Authority Seeker", color: "rgba(11,11,11,0.55)" };
  return { label: "Authority Starter", color: "rgba(11,11,11,0.4)" };
}

export default function AuthorityAudit() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answer>({});
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof computeScore> | null>(null);
  const [name, setName] = useState("");

  const currentQ = QUESTIONS[step];
  const isTextQ = currentQ?.type === "text";

  const handleAnswer = (value: string) => {
    if (step === 0) setName(value);
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);
    setTextInput("");

    if (step === QUESTIONS.length - 1) {
      setResult(computeScore(newAnswers));
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else setStep(-1);
  };

  const reset = () => {
    setStep(-1);
    setAnswers({});
    setTextInput("");
    setResult(null);
    setName("");
  };

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Authority Audit — GrowitBuddy"
        description="Get your personalized Authority Score in under 3 minutes. Answer 8 questions and discover your authority leverage gaps and opportunities."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Authority Audit</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            What's your Authority Score?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Answer 8 questions and get a personalized breakdown of your authority leverage — free, in under 3 minutes.
          </motion.p>
        </div>
      </section>

      {/* Quiz */}
      <section style={{ padding: "80px 24px", minHeight: "60vh" }}>
        <div className="max-w-[680px] mx-auto">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === -1 && !result && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    width: 100, height: 100,
                    borderRadius: "50%",
                    background: "#0B0B0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                    fontSize: 40,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  A
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 16 }}>
                  Discover your Authority Score
                </h2>
                <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 36, maxWidth: "46ch", margin: "0 auto 36px" }}>
                  8 quick questions. Instant results. A personalized breakdown of your authority leverage and where to improve.
                </p>
                <button className="gb-btn" style={{ margin: "0 auto", fontSize: 15, padding: "14px 32px" }} onClick={() => setStep(0)}>
                  Start the Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Question */}
            {step >= 0 && !result && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(11,11,11,0.4)", textTransform: "uppercase" }}>
                      Question {step + 1} of {QUESTIONS.length}
                    </span>
                    <button
                      onClick={handleBack}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.4)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  </div>
                  <div style={{ height: 4, background: "rgba(11,11,11,0.08)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, height: "100%", background: "#0B0B0B", borderRadius: 100, transition: "width 0.3s" }} />
                  </div>
                </div>

                <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.2 }}>
                  {currentQ.question}
                </h2>

                {isTextQ ? (
                  <div>
                    <input
                      className="gb-input"
                      style={{ fontSize: 16, padding: "16px 20px", borderRadius: 14 }}
                      placeholder={currentQ.placeholder}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && textInput.trim()) handleAnswer(textInput.trim()); }}
                      autoFocus
                    />
                    <button
                      className="gb-btn"
                      style={{ marginTop: 16, width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 0" }}
                      onClick={() => textInput.trim() && handleAnswer(textInput.trim())}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {currentQ.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        style={{
                          textAlign: "left",
                          padding: "16px 22px",
                          borderRadius: 12,
                          border: "1.5px solid rgba(11,11,11,0.12)",
                          background: "#fff",
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#0B0B0B",
                          cursor: "pointer",
                          transition: "all 0.15s",
                          fontFamily: "'Inter', sans-serif",
                        }}
                        className="hover:border-[rgba(11,11,11,0.3)] hover:bg-[rgba(11,11,11,0.03)]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 16 }}>
                    {name ? `${name}'s` : "Your"} Authority Score
                  </p>
                  <div
                    style={{
                      width: 140, height: 140,
                      borderRadius: "50%",
                      background: "#0B0B0B",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.06em", color: "#fff", lineHeight: 1 }}>{result.total}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>/ 100</span>
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: getScoreLabel(result.total).color }}>
                    {getScoreLabel(result.total).label}
                  </p>
                </div>

                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "32px", marginBottom: 24 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: "#0B0B0B", marginBottom: 24 }}>Score Breakdown</h3>
                  {result.breakdown.map((item) => (
                    <div key={item.label} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#0B0B0B" }}>{item.label}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B0B0B" }}>{item.score}/{item.max}</span>
                      </div>
                      <div style={{ height: 8, background: "rgba(11,11,11,0.08)", borderRadius: 100, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.score / item.max) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          style={{ height: "100%", background: "#0B0B0B", borderRadius: 100 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#0B0B0B", borderRadius: 20, padding: "32px", textAlign: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#fff", marginBottom: 12 }}>
                    Want a personalized action plan?
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 24 }}>
                    Book a free 30-minute strategy call. We'll walk through your score, identify your biggest gaps, and outline your 90-day authority roadmap.
                  </p>
                  <Link href="/contact">
                    <span className="gb-btn" style={{ margin: "0 auto", fontSize: 14 }}>
                      Book a Free Strategy Call
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                <button
                  onClick={reset}
                  style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "1.5px solid rgba(11,11,11,0.15)", background: "transparent", fontSize: 14, fontWeight: 600, color: "rgba(11,11,11,0.5)", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >
                  Retake the Audit
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
