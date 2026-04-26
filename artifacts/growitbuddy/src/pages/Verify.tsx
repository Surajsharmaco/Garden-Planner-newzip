import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, Search, AlertCircle, ArrowRight } from "lucide-react";
import SEOMeta from "@/components/SEOMeta";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface CertResult {
  certificateId: string;
  name: string;
  role: string;
  issueDate: string;
  status: "verified" | "revoked";
}

function ResultCard({ cert }: { cert: CertResult }) {
  const isVerified = cert.status === "verified";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: isVerified ? "1.5px solid rgba(16,185,129,0.25)" : "1.5px solid rgba(248,113,113,0.25)",
        background: "#fff",
      }}
    >
      <div
        style={{
          background: isVerified ? "rgba(16,185,129,0.07)" : "rgba(248,113,113,0.07)",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderBottom: isVerified ? "1px solid rgba(16,185,129,0.12)" : "1px solid rgba(248,113,113,0.12)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: isVerified ? "rgba(16,185,129,0.12)" : "rgba(248,113,113,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isVerified ? (
            <ShieldCheck size={22} style={{ color: "#10b981" }} />
          ) : (
            <ShieldX size={22} style={{ color: "#f87171" }} />
          )}
        </div>
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: isVerified ? "#10b981" : "#f87171",
              marginBottom: 2,
            }}
          >
            {isVerified ? "Certificate Verified" : "Certificate Revoked"}
          </p>
          <p style={{ fontSize: 13, color: "rgba(11,11,11,0.45)", fontWeight: 500 }}>
            {isVerified
              ? "This certificate is authentic and valid."
              : "This certificate has been revoked by GrowitBuddy."}
          </p>
        </div>
      </div>

      <div style={{ padding: "28px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px 32px",
          }}
        >
          {[
            { label: "Name", value: cert.name },
            { label: "Role / Program", value: cert.role },
            { label: "Issued By", value: "GrowitBuddy" },
            { label: "Issue Date", value: cert.issueDate },
            { label: "Certificate ID", value: cert.certificateId, mono: true },
          ].map(({ label, value, mono }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(11,11,11,0.35)",
                  marginBottom: 4,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#0B0B0B",
                  fontFamily: mono ? "monospace" : undefined,
                  letterSpacing: mono ? "0.02em" : undefined,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Verify() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CertResult | null | "not_found" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  async function handleVerify() {
    const id = input.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/admin/public/certificate/${encodeURIComponent(id)}`);
      if (res.status === 404) {
        setResult("not_found");
      } else if (!res.ok) {
        setResult("error");
      } else {
        const data: CertResult = await res.json();
        setResult(data);
      }
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleVerify();
  }

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <SEOMeta
        title="Verify Certificate | GrowitBuddy"
        description="Verify the authenticity of certificates issued by GrowitBuddy."
      />

      <section
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
          background: "#fff",
          borderBottom: "1px solid rgba(11,11,11,0.08)",
        }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(11,11,11,0.4)",
              marginBottom: 16,
            }}
          >
            Certificate Verification
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 64px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#0B0B0B",
              marginBottom: 16,
            }}
          >
            Verify Credentials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            style={{
              fontSize: 17,
              color: "rgba(11,11,11,0.45)",
              lineHeight: "1.75",
              maxWidth: "42ch",
              margin: "0 auto",
            }}
          >
            Check the authenticity of certificates issued by GrowitBuddy.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: "64px 24px" }}>
        <div className="max-w-[560px] mx-auto">
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "flex",
                gap: 0,
                background: "#fff",
                borderRadius: 14,
                border: "1.5px solid rgba(11,11,11,0.1)",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(11,11,11,0.06)",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder="Enter Certificate ID (e.g. GB-2025-XXXXX)"
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#0B0B0B",
                  letterSpacing: "0.02em",
                }}
              />
              <button
                onClick={handleVerify}
                disabled={loading || !input.trim()}
                style={{
                  padding: "16px 24px",
                  background: "#0B0B0B",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  transition: "opacity 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {loading ? (
                  "Checking..."
                ) : (
                  <>
                    <Search size={15} />
                    Verify
                  </>
                )}
              </button>
            </div>
            <p
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "rgba(11,11,11,0.35)",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Or scan the QR code on your certificate to verify automatically.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {result === "not_found" && (
              <motion.div
                key="not_found"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "20px 24px",
                  borderRadius: 14,
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                }}
              >
                <AlertCircle size={20} style={{ color: "rgba(11,11,11,0.35)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0B0B0B", marginBottom: 2 }}>Certificate not found</p>
                  <p style={{ fontSize: 13, color: "rgba(11,11,11,0.45)" }}>
                    Please check the ID and try again.
                  </p>
                </div>
              </motion.div>
            )}

            {result === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "20px 24px",
                  borderRadius: 14,
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.08)",
                }}
              >
                <AlertCircle size={20} style={{ color: "rgba(248,113,113,0.8)", flexShrink: 0 }} />
                <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(11,11,11,0.6)" }}>
                  Something went wrong. Please try again.
                </p>
              </motion.div>
            )}

            {result && result !== "not_found" && result !== "error" && (
              <ResultCard key="result" cert={result} />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
