import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Users } from "lucide-react";

type LoginMode = "super" | "team";

export default function AdminLogin() {
  const { login, teamLogin } = useAdmin();
  const [, nav] = useLocation();
  const [mode, setMode] = useState<LoginMode>("team");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "super") {
        await login(password);
      } else {
        await teamLogin(email, password);
      }
      nav("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m: LoginMode) {
    setMode(m);
    setEmail("");
    setPassword("");
    setError("");
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
          <p className="text-[13px] text-white/40 mt-1">Sign in to your admin panel</p>
        </div>

        <div className="flex rounded-xl bg-white/6 border border-white/10 p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode("team")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-medium transition-all ${
              mode === "team" ? "bg-white text-[#0B0B0B]" : "text-white/40 hover:text-white/60"
            }`}
          >
            <Users size={13} />
            Team Login
          </button>
          <button
            type="button"
            onClick={() => switchMode("super")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-medium transition-all ${
              mode === "super" ? "bg-white text-[#0B0B0B]" : "text-white/40 hover:text-white/60"
            }`}
          >
            <Lock size={13} />
            Super Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "team" && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
              autoFocus
            />
          )}

          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "super" ? "Admin password" : "Password"}
              required
              className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors pr-11"
              autoFocus={mode === "super"}
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
            disabled={loading || !password || (mode === "team" && !email)}
            className="w-full bg-white text-[#0B0B0B] font-semibold text-[14px] py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
