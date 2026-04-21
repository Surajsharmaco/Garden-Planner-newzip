import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * omc.com-style page intro:
 * 1. Full-screen white overlay
 * 2. Brand name sweeps in from center
 * 3. Name expands and fades, overlay exits — revealing the page beneath
 *
 * Runs once per session (sessionStorage flag).
 */
export default function PageIntro() {
  const [visible, setVisible] = useState(() => {
    try {
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("skip-intro") === "1") return false;
      return !sessionStorage.getItem("gb_intro_seen");
    } catch {
      return true;
    }
  });
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (!visible) return;

    // Phase timeline
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 1500);
    const t3 = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem("gb_intro_seen", "1"); } catch {}
    }, 2400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
          }}
        >
          {/* Outer ring that grows */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "in"
                ? { scale: 0.8, opacity: 1 }
                : phase === "hold"
                ? { scale: 1, opacity: 1 }
                : { scale: 18, opacity: 0 }
            }
            transition={
              phase === "out"
                ? { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          />

          {/* Brand wordmark */}
          <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={
                phase === "in"
                  ? { y: "110%" }
                  : phase === "hold"
                  ? { y: 0 }
                  : { y: "-110%", opacity: 0 }
              }
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 8vw, 96px)",
                letterSpacing: "-0.025em",
                color: "#000",
                lineHeight: 1,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              GrowitBuddy
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "hold" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            style={{
              position: "absolute",
              bottom: "calc(50% - 72px)",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.3)",
            }}
          >
            Content & Authority Studio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
