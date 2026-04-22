import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1400);
    const t3 = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem("gb_intro_seen", "1"); } catch {}
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#F7F7F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            pointerEvents: "all",
          }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={phase === "in" ? { scale: 0.6, opacity: 0.6 } : phase === "hold" ? { scale: 1, opacity: 0.7 } : { scale: 2.5, opacity: 0 }}
            transition={{ duration: phase === "out" ? 0.7 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              width: 500, height: 500,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(11,11,11,0.06) 0%, rgba(11,11,11,0.03) 40%, transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase === "in" ? { opacity: 0, scale: 0.9 } : phase === "hold" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo-dark.png`}
              alt="GrowitBuddy"
              style={{
                width: 56,
                height: 56,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 6vw, 56px)",
                letterSpacing: "-0.04em",
                color: "#0B0B0B",
                lineHeight: 1,
                margin: 0,
              }}
            >
              GrowitBuddy
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(11,11,11,0.35)",
              }}
            >
              Content & Authority Studio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
