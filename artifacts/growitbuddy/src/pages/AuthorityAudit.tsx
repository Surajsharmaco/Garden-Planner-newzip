import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

type Answers = Record<string, string>;

interface Diagnosis {
  blockers: string[];
  fixes: string[];
  outcomes: string[];
}

const QUESTIONS = [
  {
    id: "name",
    question: "What's your name?",
    type: "text",
    placeholder: "Your first name",
  },
  {
    id: "platform",
    question: "What platform do you mainly post on?",
    type: "choice",
    options: ["LinkedIn", "Instagram", "YouTube", "X / Twitter", "TikTok", "Newsletter", "Podcast"],
  },
  {
    id: "frequency",
    question: "How often do you post content?",
    type: "choice",
    options: ["Daily", "3-5x per week", "1-2x per week", "A few times a month", "Rarely or never"],
  },
  {
    id: "problem",
    question: "What's your biggest problem right now?",
    type: "choice",
    options: [
      "Not getting views",
      "Not getting clients",
      "Inconsistent posting",
      "Don't know what to post",
      "Low engagement",
    ],
  },
  {
    id: "contentType",
    question: "What type of content do you create?",
    type: "choice",
    options: [
      "Educational tips and how-tos",
      "Personal stories and experiences",
      "Product or service promotion",
      "Industry news and commentary",
      "Mixed - I post different things",
    ],
  },
  {
    id: "goal",
    question: "What is your main goal right now?",
    type: "choice",
    options: [
      "Grow my audience",
      "Get more clients",
      "Build my personal brand",
      "Monetize my content",
    ],
  },
];

function generateDiagnosis(answers: Answers): Diagnosis {
  const { problem, frequency, goal } = answers;

  const blockers: string[] = [];
  const fixes: string[] = [];
  const outcomes: string[] = [];

  if (problem === "Not getting views") {
    blockers.push("Your content isn't reaching beyond the people who already know you");
    blockers.push("You're posting without a platform-native distribution strategy");
  } else if (problem === "Not getting clients") {
    blockers.push("Your content attracts followers but doesn't convert them into buyers");
    blockers.push("There's no clear signal in your content that shows you solve a real problem");
  } else if (problem === "Inconsistent posting") {
    blockers.push("Without a consistent schedule, your audience loses trust in you over time");
    blockers.push("You don't have a content system - you're creating from scratch every single time");
  } else if (problem === "Don't know what to post") {
    blockers.push("You don't have a defined content direction - no clear themes or pillars");
    blockers.push("Without a content strategy, every post feels like starting from a blank page");
  } else if (problem === "Low engagement") {
    blockers.push("Your content isn't opening with a hook that stops people from scrolling past");
    blockers.push("Your posts may not be speaking to your audience's actual pain points");
  }

  if (frequency === "Rarely or never" || frequency === "A few times a month") {
    blockers.push("You're posting too rarely to build any real momentum or trust with your audience");
  } else if (!blockers[1]) {
    blockers.push("Your content may lack a repeatable system that compounds over time");
  }

  if (problem === "Not getting views") {
    fixes.push("Build a platform-specific distribution plan that extends your reach beyond your existing followers");
    fixes.push("Study which hooks, formats, and posting times the algorithm actively rewards on your platform");
  } else if (problem === "Not getting clients") {
    fixes.push("Create content that speaks directly to your ideal client's specific problems - not just your expertise");
    fixes.push("Add clear calls to action that guide readers from content to a real conversation");
  } else if (problem === "Inconsistent posting") {
    fixes.push("Build a simple content system - define your themes, create templates, and lock in a repeatable workflow");
    fixes.push("Batch-create content in advance so you always have posts ready, even on your busiest weeks");
  } else if (problem === "Don't know what to post") {
    fixes.push("Define 3 core content themes that align with your expertise and what your audience genuinely needs");
    fixes.push("Use a content calendar so you're planning ahead instead of reacting every week");
  } else if (problem === "Low engagement") {
    fixes.push("Rewrite your hooks - the first line of every post must make people stop and want to read more");
    fixes.push("Focus on one specific, immediately useful idea per post instead of covering too much");
  }

  if (frequency === "Rarely or never" || frequency === "A few times a month") {
    fixes.push("Commit to a minimum posting frequency - even 2x per week compounds significantly over 90 days");
  } else if (fixes.length < 3) {
    fixes.push("Focus on consistency over perfection - showing up regularly matters more than any single piece of content");
  }

  if (goal === "Grow my audience") {
    outcomes.push("Steady audience growth made up of people who are genuinely interested in what you do");
    outcomes.push("More shares, saves, and follows as your content starts delivering consistent value");
  } else if (goal === "Get more clients") {
    outcomes.push("Inbound messages from people who already trust you before they ever get on a call");
    outcomes.push("A shorter sales cycle because your content does the pre-selling for you");
  } else if (goal === "Build my personal brand") {
    outcomes.push("People start recognizing your name and associating it with your niche");
    outcomes.push("Speaking invites, collaborations, and media opportunities start finding you");
  } else if (goal === "Monetize my content") {
    outcomes.push("Your content starts attracting people ready to invest in your products or services");
    outcomes.push("A clear path from content to revenue that doesn't rely on luck or going viral");
  }

  outcomes.push("A content system that keeps working even when you don't have time to think about it");

  return {
    blockers: blockers.slice(0, 3),
    fixes: fixes.slice(0, 3),
    outcomes: outcomes.slice(0, 3),
  };
}

export default function AuthorityAudit() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [textInput, setTextInput] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  const currentQ = QUESTIONS[step];
  const isTextQ = currentQ?.type === "text";

  const handleAnswer = (value: string) => {
    const qId = currentQ.id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    setTextInput("");

    if (step === QUESTIONS.length - 1) {
      setDiagnosis(generateDiagnosis(newAnswers));
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
    setDiagnosis(null);
  };

  const firstName = answers["name"] || "";

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Content Growth Diagnosis - GrowitBuddy"
        description="Find out exactly what's blocking your content growth. Answer 6 quick questions and get a personalized diagnosis - free, in under 2 minutes."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Content Growth Diagnosis</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Find What's Blocking Your Growth.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            6 quick questions. A real, personalized breakdown of exactly what's holding your content back - and what to fix first.
          </motion.p>
        </div>
      </section>

      {/* Tool */}
      <section style={{ padding: "80px 24px", minHeight: "60vh" }}>
        <div className="max-w-[680px] mx-auto">
          <AnimatePresence mode="wait">

            {/* Intro */}
            {step === -1 && !diagnosis && (
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
                  ?
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 16 }}>
                  Get your content diagnosis
                </h2>
                <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", marginBottom: 36, maxWidth: "46ch", margin: "0 auto 36px" }}>
                  6 questions. Under 2 minutes. You'll get a specific, personalized breakdown of what's holding you back and what to do about it.
                </p>
                <button className="gb-btn" style={{ margin: "0 auto", fontSize: 15, padding: "14px 32px" }} onClick={() => setStep(0)}>
                  Start the Diagnosis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Question */}
            {step >= 0 && !diagnosis && (
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
            {diagnosis && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 10 }}>
                    Your diagnosis is ready
                  </p>
                  <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.1 }}>
                    {firstName ? `${firstName}, here's what's holding you back.` : "Here's what's holding you back."}
                  </h2>
                </div>

                {/* Section 1 — Blockers */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "28px 32px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>
                    What's holding you back
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.blockers.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(11,11,11,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(11,11,11,0.5)" }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B", lineHeight: "1.6", margin: 0 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2 — Fixes */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "28px 32px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>
                    What you need to fix
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.fixes.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B", lineHeight: "1.6", margin: 0 }}>{f}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3 — Outcomes */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "28px 32px", marginBottom: 24 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>
                    What happens when you fix this
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.outcomes.map((o, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(11,11,11,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2v8M2 6h8" stroke="rgba(11,11,11,0.5)" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B", lineHeight: "1.6", margin: 0 }}>{o}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4 — CTA */}
                <div style={{ background: "#0B0B0B", borderRadius: 20, padding: "36px 32px", textAlign: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#fff", marginBottom: 10 }}>
                    Let's fix your content system.
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 28, maxWidth: "40ch", margin: "0 auto 28px" }}>
                    Book a free strategy call. We'll walk through your diagnosis together and map out exactly what needs to happen next.
                  </p>
                  <Link href="/contact">
                    <span className="gb-btn" style={{ margin: "0 auto", fontSize: 14, background: "#fff", color: "#0B0B0B" }}>
                      Get a Custom Growth Plan
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                <button
                  onClick={reset}
                  style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "1.5px solid rgba(11,11,11,0.15)", background: "transparent", fontSize: 14, fontWeight: 600, color: "rgba(11,11,11,0.5)", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >
                  Retake the Diagnosis
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
