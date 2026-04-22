import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

type Answers = Record<string, string>;

interface Diagnosis {
  stage: string;
  stageDesc: string;
  contentGap: string;
  topPriority: string;
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
    id: "role",
    question: "What best describes you?",
    type: "choice",
    options: [
      "Founder / Startup CEO",
      "Coach or Consultant",
      "Content Creator",
      "Freelancer or Agency Owner",
    ],
  },
  {
    id: "platform",
    question: "Where do you mainly publish content?",
    type: "choice",
    options: ["LinkedIn", "Instagram", "YouTube", "X / Twitter", "TikTok", "Newsletter", "Podcast"],
  },
  {
    id: "tenure",
    question: "How long have you been creating content?",
    type: "choice",
    options: ["Less than 3 months", "3-12 months", "1-2 years", "2+ years"],
  },
  {
    id: "frequency",
    question: "How often do you post?",
    type: "choice",
    options: ["Daily", "3-5x per week", "1-2x per week", "A few times a month", "Rarely or never"],
  },
  {
    id: "problem",
    question: "What frustrates you most about your content right now?",
    type: "choice",
    options: [
      "Not getting enough views or reach",
      "Content isn't converting to clients or revenue",
      "I don't know what to post",
      "I can't stay consistent",
      "My content feels scattered or unclear",
    ],
  },
  {
    id: "contentType",
    question: "What type of content do you mostly create?",
    type: "choice",
    options: [
      "Educational / how-to content",
      "Personal stories and opinions",
      "Case studies and results",
      "Industry news and commentary",
      "Mixed - no clear theme",
    ],
  },
  {
    id: "goal",
    question: "What does winning look like for you in 6 months?",
    type: "choice",
    options: [
      "Be a recognized name in my niche",
      "Get consistent inbound leads from content",
      "Grow to 10K+ engaged followers",
      "Create a new income stream from content",
    ],
  },
];

function getStage(frequency: string, tenure: string, problem: string): { stage: string; stageDesc: string } {
  const isRare = frequency === "Rarely or never" || frequency === "A few times a month";
  const isNew = tenure === "Less than 3 months" || tenure === "3-12 months";
  const isScattered = problem === "My content feels scattered or unclear" || problem === "I don't know what to post";
  const isNotConverting = problem === "Content isn't converting to clients or revenue";

  if (isRare && isNew) return {
    stage: "Early Stage",
    stageDesc: "You're at the start of your authority journey - the decisions you make now set the foundation for everything else."
  };
  if (isRare) return {
    stage: "Stalled",
    stageDesc: "You have experience but momentum has stopped. The gap between your expertise and your output is costing you opportunities."
  };
  if (isScattered) return {
    stage: "Unfocused",
    stageDesc: "You're active but without a clear positioning, effort isn't compounding into authority."
  };
  if (isNotConverting && !isNew) return {
    stage: "Plateau",
    stageDesc: "You're showing up consistently but not getting the return you should. This is a strategy problem, not an effort problem."
  };
  if (isNew) return {
    stage: "Building",
    stageDesc: "You're actively building - the foundation work you do now will determine how fast authority compounds later."
  };
  return {
    stage: "Building",
    stageDesc: "You're in the right direction. The next moves will determine whether your content starts compounding or stalls."
  };
}

function getContentGap(contentType: string, problem: string): string {
  if (contentType === "Mixed - no clear theme") return "Positioning Gap";
  if (contentType === "Industry news and commentary") return "Differentiation Gap";
  if (contentType === "Educational / how-to content" && problem === "Content isn't converting to clients or revenue") return "Conversion Gap";
  if (problem === "Not getting enough views or reach") return "Distribution Gap";
  if (problem === "I don't know what to post" || problem === "My content feels scattered or unclear") return "Strategy Gap";
  if (problem === "Content isn't converting to clients or revenue") return "Trust Gap";
  if (problem === "I can't stay consistent") return "System Gap";
  return "Authority Gap";
}

function getGapDescription(gap: string): string {
  const map: Record<string, string> = {
    "Positioning Gap": "No single clear message is building up over time - your audience can't form a distinct picture of who you are",
    "Differentiation Gap": "Commentary without a strong POV doesn't build authority - you need a distinctive perspective, not just coverage",
    "Conversion Gap": "You're giving value but not building the specific trust that turns readers into buyers",
    "Distribution Gap": "Your content exists but isn't reaching beyond the people who already know you",
    "Strategy Gap": "Without a clear content direction, each post starts from zero instead of building on the last",
    "Trust Gap": "People aren't seeing enough proof that you solve a specific, real problem for a specific person",
    "System Gap": "Without a content system, consistency will always feel like a battle against your own schedule",
    "Authority Gap": "Your content isn't yet building the sustained recognition your expertise deserves",
  };
  return map[gap] || "";
}

function getTopPriority(problem: string, frequency: string, contentType: string): string {
  if (frequency === "Rarely or never" || frequency === "A few times a month") {
    return "Build a minimum viable content system before optimizing anything else. Commit to 2 posts per week on a fixed schedule - consistency at a lower frequency beats brilliance at no frequency.";
  }
  if (problem === "I don't know what to post" || problem === "My content feels scattered or unclear") {
    return "Before you write another post, define your 3 content pillars. Every piece you create should reinforce the same core message. Without this, effort doesn't compound.";
  }
  if (problem === "Not getting enough views or reach") {
    return "Study the top-performing posts on your platform this week and reverse-engineer the hook, format, and structure. Then apply those patterns to your next 10 posts before changing anything else.";
  }
  if (problem === "Content isn't converting to clients or revenue") {
    return "Add one proof-based post per week - a client result, a case study, a before/after. Your audience needs to see outcomes, not just expertise. Proof converts faster than any other content type.";
  }
  if (problem === "I can't stay consistent") {
    return "Batch-create 2 weeks of content in a single 2-hour session. Then protect that session on your calendar like a client meeting. Consistency is a system problem, not a motivation problem.";
  }
  return "Audit your last 10 posts. Find the one that performed best and identify exactly why. Then build your next 30 days of content around that same formula.";
}

function generateDiagnosis(answers: Answers): Diagnosis {
  const { problem, frequency, goal, contentType, tenure } = answers;
  const { stage, stageDesc } = getStage(frequency, tenure, problem);
  const contentGap = getContentGap(contentType, problem);
  const topPriority = getTopPriority(problem, frequency, contentType);

  const blockers: string[] = [];
  const fixes: string[] = [];
  const outcomes: string[] = [];

  if (problem === "Not getting enough views or reach") {
    blockers.push("Your content isn't reaching beyond people who already know you - you're stuck in an existing network loop");
    blockers.push("You're posting without a platform-native distribution strategy that extends organic reach");
    blockers.push("Your opening hooks aren't stopping people mid-scroll on a busy feed");
  } else if (problem === "Content isn't converting to clients or revenue") {
    blockers.push("Your content builds awareness but not the specific trust that drives buying decisions");
    blockers.push("There's no clear signal showing you solve a specific, real problem for a specific type of person");
    blockers.push("Calls to action are either missing entirely or not connected to a clear, low-friction next step");
  } else if (problem === "I can't stay consistent") {
    blockers.push("Without a content system, every post requires starting from zero - that's a recipe for burnout");
    blockers.push("You're dependent on inspiration rather than a repeatable workflow that runs regardless of how you feel");
    blockers.push("Inconsistency signals unreliability to your audience, quietly eroding the trust you've built");
  } else if (problem === "I don't know what to post") {
    blockers.push("You have no defined content pillars - no consistent themes your audience can come to expect from you");
    blockers.push("Without a strategy, every post is a guess instead of a deliberate authority-building move");
    blockers.push("Your audience can't form a clear, lasting picture of who you are or what you stand for");
  } else if (problem === "My content feels scattered or unclear") {
    blockers.push("Your positioning isn't clear enough for people to immediately understand what you represent");
    blockers.push("Scattered content doesn't compound - each post starts from scratch rather than building on the last");
    blockers.push("Without a focused theme, your audience has no specific reason to follow you over anyone else");
  }

  if (problem === "Not getting enough views or reach") {
    fixes.push("Build a platform-specific distribution plan - identify the 3 formats and times the algorithm rewards most on your platform");
    fixes.push("Spend the first 30 minutes after posting engaging with other creators in your niche to trigger distribution signals");
    if (contentType === "Educational / how-to content") {
      fixes.push("Package your expertise into definitive, highly shareable formats - frameworks, ranked lists, and step-by-step guides travel the furthest");
    } else {
      fixes.push("Look at your top 3 performing posts and reverse-engineer what they had in common - then replicate that pattern for the next 30 days");
    }
  } else if (problem === "Content isn't converting to clients or revenue") {
    fixes.push("Publish one proof-based post per week - client results, case studies, and before/after outcomes build trust faster than expertise alone");
    fixes.push("Speak to one specific problem your ideal client has in every post, not just your general area of knowledge");
    fixes.push("Add a clear, low-friction CTA to every post - even something as simple as 'DM me [keyword] if you're dealing with this'");
  } else if (problem === "I can't stay consistent") {
    fixes.push("Build a repeatable weekly workflow: define your themes once, create templates, then batch 2 weeks of content in a single session");
    fixes.push("Maintain a content bank of at least 10 ready-to-publish posts so a busy week never breaks your streak");
    fixes.push("Set a minimum viable frequency you can hold even during your worst weeks - 2x per week done consistently beats 5x done sporadically");
  } else if (problem === "I don't know what to post") {
    fixes.push("Define 3 core content pillars at the intersection of your expertise and your ideal audience's most pressing problems");
    fixes.push("Interview your 3 best clients about the questions they had before working with you - that conversation is your entire content queue");
    fixes.push("Build a 4-week content calendar and plan every post in advance - stop reacting and start directing your content");
  } else if (problem === "My content feels scattered or unclear") {
    fixes.push("Write one positioning statement: 'I help [specific person] achieve [specific result] through [your method]' - every post reinforces this");
    fixes.push("Pick one signature framework or content series and commit to it publicly for 60 days without deviation");
    fixes.push("Audit your last 20 posts and archive anything that doesn't support your core positioning - ruthless focus compounds faster");
  }

  if (goal === "Be a recognized name in my niche") {
    outcomes.push("People start tagging you in conversations and recommending you to others without being asked");
    outcomes.push("Speaking invites, podcast features, and media opportunities start finding you rather than you chasing them");
    outcomes.push("Your name becomes the first one mentioned when your specific niche comes up in any room");
  } else if (goal === "Get consistent inbound leads from content") {
    outcomes.push("Inbound messages from prospects who already trust your expertise before they ever get on a call");
    outcomes.push("A shorter sales cycle because your content does the pre-selling - they come ready to move forward");
    outcomes.push("A predictable pipeline of qualified leads that doesn't depend on cold outreach or referrals");
  } else if (goal === "Grow to 10K+ engaged followers") {
    outcomes.push("Steady, compounding audience growth made up of people genuinely interested in your specific expertise");
    outcomes.push("Higher engagement rates as your content becomes associated with consistent, focused value");
    outcomes.push("A platform that makes every future launch, partnership, or announcement exponentially more impactful");
  } else if (goal === "Create a new income stream from content") {
    outcomes.push("An audience that trusts you deeply enough to invest in your courses, programs, or premium services");
    outcomes.push("A clear, repeatable path from content to revenue that doesn't depend on going viral or getting lucky");
    outcomes.push("The credibility to charge premium prices because your content already proves the depth of your expertise");
  }

  return { stage, stageDesc, contentGap, topPriority, blockers, fixes, outcomes };
}

const STAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Early Stage":  { bg: "rgba(11,11,11,0.05)", text: "#0B0B0B",         border: "rgba(11,11,11,0.15)" },
  "Building":     { bg: "rgba(11,11,11,0.05)", text: "#0B0B0B",         border: "rgba(11,11,11,0.15)" },
  "Stalled":      { bg: "rgba(200,60,60,0.07)", text: "#991b1b",        border: "rgba(200,60,60,0.2)" },
  "Plateau":      { bg: "rgba(180,120,0,0.07)", text: "#92400e",        border: "rgba(180,120,0,0.2)" },
  "Unfocused":    { bg: "rgba(180,120,0,0.07)", text: "#92400e",        border: "rgba(180,120,0,0.2)" },
};

export default function AuthorityAudit() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [textInput, setTextInput] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  const currentQ = QUESTIONS[step];
  const isTextQ = currentQ?.type === "text";

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
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
  const stageStyle = diagnosis ? (STAGE_COLORS[diagnosis.stage] || STAGE_COLORS["Building"]) : STAGE_COLORS["Building"];

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Authority Audit - GrowitBuddy"
        description="8 targeted questions. A personalized diagnosis of exactly what's limiting your authority - your content gap, authority stage, top priority action, and a clear plan to fix it."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Authority Audit</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Find out exactly what's limiting your authority.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            8 targeted questions. You get your authority stage, your specific content gap, your #1 priority action, and a personalized plan - free, in under 3 minutes.
          </motion.p>
        </div>
      </section>

      {/* Tool */}
      <section style={{ padding: "80px 24px", minHeight: "65vh" }}>
        <div className="max-w-[700px] mx-auto">
          <AnimatePresence mode="wait">

            {/* Intro */}
            {step === -1 && !diagnosis && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 40 }}>
                  {[
                    { label: "Your authority stage", desc: "See exactly where you are in the authority-building journey" },
                    { label: "Your content gap", desc: "The specific gap that's limiting your growth right now" },
                    { label: "Your #1 priority action", desc: "One clear move to make before anything else" },
                    { label: "Your personalized plan", desc: "Specific blockers, fixes, and outcomes based on your answers" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "22px 20px", border: "1.5px solid rgba(11,11,11,0.08)" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0B0B0B", marginBottom: 6 }}>{item.label}</p>
                      <p style={{ fontSize: 13, color: "rgba(11,11,11,0.5)", lineHeight: "1.55", margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#0B0B0B", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>8 questions - under 3 minutes</p>
                  <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3.5vw, 36px)", letterSpacing: "-0.04em", color: "#fff", marginBottom: 12, maxWidth: "28ch" }}>
                    Get your personalized Authority Audit
                  </h2>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: "1.7", marginBottom: 28, maxWidth: "40ch" }}>
                    No generic advice. Every result is specific to your role, platform, frequency, and goals.
                  </p>
                  <button
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "14px 28px", borderRadius: 100,
                      background: "#fff", color: "#0B0B0B",
                      fontSize: 15, fontWeight: 700, cursor: "pointer",
                      border: "none", fontFamily: "'Inter', sans-serif",
                    }}
                    className="hover:opacity-85 transition-opacity"
                    onClick={() => setStep(0)}
                  >
                    Start the Audit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(11,11,11,0.4)", textTransform: "uppercase" }}>
                      {step + 1} / {QUESTIONS.length}
                    </span>
                    <button
                      onClick={handleBack}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "rgba(11,11,11,0.4)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  </div>
                  <div style={{ height: 3, background: "rgba(11,11,11,0.08)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, height: "100%", background: "#0B0B0B", borderRadius: 100, transition: "width 0.35s ease" }} />
                  </div>
                </div>

                <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 40px)", letterSpacing: "-0.035em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.15 }}>
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
                      style={{ marginTop: 14, width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 0" }}
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
                          padding: "17px 22px",
                          borderRadius: 14,
                          border: "1.5px solid rgba(11,11,11,0.1)",
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
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 10 }}>
                    Your Authority Audit
                  </p>
                  <h2 style={{ fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.04em", color: "#0B0B0B", lineHeight: 1.1 }}>
                    {firstName ? `${firstName}, here's your full diagnosis.` : "Here's your full diagnosis."}
                  </h2>
                </div>

                {/* Stage + Gap row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    borderRadius: 16, padding: "20px 22px",
                    background: stageStyle.bg,
                    border: `1.5px solid ${stageStyle.border}`,
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: stageStyle.text, opacity: 0.6, marginBottom: 6 }}>Authority Stage</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: stageStyle.text, letterSpacing: "-0.03em", marginBottom: 6 }}>{diagnosis.stage}</p>
                    <p style={{ fontSize: 13, color: stageStyle.text, opacity: 0.7, lineHeight: "1.55", margin: 0 }}>{diagnosis.stageDesc}</p>
                  </div>
                  <div style={{
                    borderRadius: 16, padding: "20px 22px",
                    background: "#fff",
                    border: "1.5px solid rgba(11,11,11,0.08)",
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 6 }}>Content Gap</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#0B0B0B", letterSpacing: "-0.03em", marginBottom: 6 }}>{diagnosis.contentGap}</p>
                    <p style={{ fontSize: 13, color: "rgba(11,11,11,0.55)", lineHeight: "1.55", margin: 0 }}>{getGapDescription(diagnosis.contentGap)}</p>
                  </div>
                </div>

                {/* Top Priority */}
                <div style={{ background: "#0B0B0B", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Your #1 Priority Action</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", lineHeight: "1.65", margin: 0 }}>{diagnosis.topPriority}</p>
                </div>

                {/* Blockers */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 16, padding: "24px 28px", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>What's holding you back</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.blockers.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(11,11,11,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(11,11,11,0.5)" }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: 15, color: "#0B0B0B", lineHeight: "1.65", margin: 0 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixes */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 16, padding: "24px 28px", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>What to do about it</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.fixes.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p style={{ fontSize: 15, color: "#0B0B0B", lineHeight: "1.65", margin: 0 }}>{f}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>What happens when you fix this</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {diagnosis.outcomes.map((o, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(11,11,11,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2v8M2 6h8" stroke="rgba(11,11,11,0.45)" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <p style={{ fontSize: 15, color: "#0B0B0B", lineHeight: "1.65", margin: 0 }}>{o}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ background: "#0B0B0B", borderRadius: 16, padding: "32px 28px", textAlign: "center", marginBottom: 14 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#fff", marginBottom: 10 }}>
                    Ready to fix this with a real system?
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: "1.75", marginBottom: 24, maxWidth: "42ch", margin: "0 auto 24px" }}>
                    Book a free strategy call. We'll walk through your diagnosis together and map out exactly what needs to happen first.
                  </p>
                  <Link href="/contact">
                    <span
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "13px 26px", borderRadius: 100,
                        background: "#fff", color: "#0B0B0B",
                        fontSize: 14, fontWeight: 700, cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      className="hover:opacity-85 transition-opacity"
                    >
                      Book a Free Strategy Call
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                <button
                  onClick={reset}
                  style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "1.5px solid rgba(11,11,11,0.12)", background: "transparent", fontSize: 14, fontWeight: 600, color: "rgba(11,11,11,0.45)", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
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
