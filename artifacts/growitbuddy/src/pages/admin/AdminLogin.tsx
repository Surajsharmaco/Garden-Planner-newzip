import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [, nav] = useLocation();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(password);
      nav("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0B0B0B] px-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="text-[22px] font-black tracking-tight text-white">GrowitBuddy Admin</h1>
          <p className="text-[13px] text-white/40 mt-1">Enter your admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors pr-11"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-white text-[#0B0B0B] font-semibold text-[14px] py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
