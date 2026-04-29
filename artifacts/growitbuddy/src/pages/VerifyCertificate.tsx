import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldX, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEOMeta from "@/components/SEOMeta";

import { API_BASE } from "../lib/config";

interface CertResult {
  certificateId: string;
  name: string;
  role: string;
  issueDate: string;
  status: "verified" | "revoked";
}

export default function VerifyCertificate() {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const [result, setResult] = useState<CertResult | null | "not_found" | "error">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setResult("not_found"); setLoading(false); return; }
    fetch(`${API_BASE}/admin/public/certificate/${encodeURIComponent(id.toUpperCase())}`)
      .then(async (res) => {
        if (res.status === 404) return setResult("not_found");
        if (!res.ok) return setResult("error");
        setResult(await res.json());
      })
      .catch(() => setResult("error"))
      .finally(() => setLoading(false));
  }, [id]);

  const isVerified = result && result !== "not_found" && result !== "error" && result.status === "verified";
  const isRevoked = result && result !== "not_found" && result !== "error" && result.status === "revoked";
  const cert = result && result !== "not_found" && result !== "error" ? result : null;

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <SEOMeta
        title={cert ? `${cert.name} | Certificate Verification | GrowitBuddy` : "Certificate Verification | GrowitBuddy"}
        description={cert ? `Verify ${cert.name}'s ${cert.role} certificate issued by GrowitBuddy.` : "Verify certificates issued by GrowitBuddy."}
      />

      <section
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div className="max-w-[560px] mx-auto">
          <Link href="/verify">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(11,11,11,0.4)",
                marginBottom: 32,
                cursor: "pointer",
                transition: "color 0.15s",
              }}
              className="hover:text-[#0B0B0B]"
            >
              <ArrowLeft size={14} />
              Verify another certificate
            </span>
          </Link>

          {loading && (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "3px solid rgba(11,11,11,0.08)",
                  borderTopColor: "#0B0B0B",
                  animation: "spin 0.7s linear infinite",
                  margin: "0 auto",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ marginTop: 16, fontSize: 14, color: "rgba(11,11,11,0.4)", fontWeight: 500 }}>
                Verifying certificate...
              </p>
            </div>
          )}

          {!loading && cert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: isVerified ? "1.5px solid rgba(16,185,129,0.25)" : "1.5px solid rgba(248,113,113,0.25)",
                background: "#fff",
                boxShadow: "0 4px 24px rgba(11,11,11,0.06)",
              }}
            >
              <div
                style={{
                  background: isVerified ? "rgba(16,185,129,0.07)" : "rgba(248,113,113,0.07)",
                  padding: "28px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  borderBottom: isVerified
                    ? "1px solid rgba(16,185,129,0.12)"
                    : "1px solid rgba(248,113,113,0.12)",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: isVerified ? "rgba(16,185,129,0.15)" : "rgba(248,113,113,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isVerified ? (
                    <ShieldCheck size={26} style={{ color: "#10b981" }} />
                  ) : (
                    <ShieldX size={26} style={{ color: "#f87171" }} />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isVerified ? "#10b981" : "#f87171",
                      marginBottom: 4,
                    }}
                  >
                    {isVerified ? "Verified" : "Revoked"}
                  </p>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#0B0B0B",
                      lineHeight: 1.1,
                    }}
                  >
                    {cert.name}
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginTop: 4, fontWeight: 500 }}>
                    {cert.role}
                  </p>
                </div>
              </div>

              <div style={{ padding: "32px 36px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px 40px",
                    marginBottom: 28,
                  }}
                >
                  {[
                    { label: "Issued By", value: "GrowitBuddy" },
                    { label: "Issue Date", value: cert.issueDate },
                    { label: "Certificate ID", value: cert.certificateId, mono: true },
                    {
                      label: "Status",
                      value: cert.status.charAt(0).toUpperCase() + cert.status.slice(1),
                      color: isVerified ? "#10b981" : "#f87171",
                    },
                  ].map(({ label, value, mono, color }) => (
                    <div key={label}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(11,11,11,0.35)",
                          marginBottom: 5,
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: color || "#0B0B0B",
                          fontFamily: mono ? "monospace" : undefined,
                          letterSpacing: mono ? "0.02em" : undefined,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(11,11,11,0.07)",
                    paddingTop: 20,
                    fontSize: 12,
                    color: "rgba(11,11,11,0.35)",
                    fontWeight: 500,
                  }}
                >
                  {isVerified
                    ? "This certificate is authentic and was issued by GrowitBuddy. The holder completed a recognized program, internship, or collaboration."
                    : "This certificate has been revoked. Please contact GrowitBuddy for further information."}
                </div>
              </div>
            </motion.div>
          )}

          {!loading && result === "not_found" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: "center",
                padding: "60px 24px",
                background: "#fff",
                borderRadius: 20,
                border: "1.5px solid rgba(11,11,11,0.08)",
              }}
            >
              <AlertCircle size={32} style={{ color: "rgba(11,11,11,0.2)", margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>
                Certificate not found
              </h2>
              <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 24, maxWidth: "36ch", margin: "0 auto 24px" }}>
                No certificate was found with ID <strong style={{ fontFamily: "monospace" }}>{id}</strong>. Please check the ID and try again.
              </p>
              <Link href="/verify">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 20px",
                    borderRadius: 100,
                    background: "#0B0B0B",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  Try another ID
                </span>
              </Link>
            </motion.div>
          )}

          {!loading && result === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#fff",
                borderRadius: 20,
                border: "1.5px solid rgba(11,11,11,0.08)",
              }}
            >
              <AlertCircle size={28} style={{ color: "rgba(248,113,113,0.7)", margin: "0 auto 12px" }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: "#0B0B0B" }}>Something went wrong</p>
              <p style={{ fontSize: 13, color: "rgba(11,11,11,0.45)", marginTop: 6 }}>
                Please try again or verify manually at{" "}
                <Link href="/verify">
                  <span style={{ color: "#0B0B0B", fontWeight: 700, cursor: "pointer" }}>/verify</span>
                </Link>
                .
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
