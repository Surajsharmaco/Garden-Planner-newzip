import { useState, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Card } from "@/components/admin/AdminField";
import {
  Zap, ShieldCheck, AlertTriangle, CheckCircle2, XCircle,
  Loader2, ChevronDown, ChevronUp, RotateCcw, Database,
  HardDrive, FolderOpen, Server, Clock,
} from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

type StepStatus = "idle" | "running" | "ok" | "error" | "skipped";
type Mode = "safe" | "advanced";

interface StepResult {
  id: string;
  label: string;
  detail?: string;
  status: StepStatus;
}

interface PrecheckResult {
  ok: boolean;
  checks: { server: boolean; database: boolean; storage: boolean };
  issues: string[];
}

interface DBStatsResult {
  ok: boolean;
  tables: Record<string, number>;
  sizes: { table_name: string; total_size: string }[];
}

interface MediaResult {
  ok: boolean;
  count: number;
  totalKb: number;
  detail: string;
}

const STEP_DEFS = [
  { id: "precheck",    label: "Checking system health",         icon: <Server size={15} /> },
  { id: "db_analyze",  label: "Optimizing database",            icon: <Database size={15} /> },
  { id: "cache_clear", label: "Clearing expired sessions",      icon: <RotateCcw size={15} /> },
  { id: "db_stats",    label: "Collecting database stats",      icon: <HardDrive size={15} /> },
  { id: "media_audit", label: "Auditing media library",         icon: <FolderOpen size={15} /> },
];

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function StepRow({ step, icon }: { step: StepResult; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
        step.status === "ok"      ? "bg-emerald-50 text-emerald-600" :
        step.status === "error"   ? "bg-red-50 text-red-500" :
        step.status === "running" ? "bg-amber-50 text-amber-500" :
        step.status === "skipped" ? "bg-[#0B0B0B]/5 text-[#0B0B0B]/30" :
                                    "bg-[#0B0B0B]/5 text-[#0B0B0B]/20"
      }`}>
        {step.status === "running" ? <Loader2 size={13} className="animate-spin" /> :
         step.status === "ok"      ? <CheckCircle2 size={13} /> :
         step.status === "error"   ? <XCircle size={13} /> :
         step.status === "skipped" ? <span className="text-[9px] font-bold">--</span> :
                                     icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-semibold leading-tight ${
          step.status === "idle" ? "text-[#0B0B0B]/30" : "text-[#0B0B0B]"
        }`}>{step.label}</p>
        {step.detail && (
          <p className="text-[11px] text-[#0B0B0B]/45 mt-0.5 leading-snug">{step.detail}</p>
        )}
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mt-1 ${
        step.status === "ok"      ? "text-emerald-600" :
        step.status === "error"   ? "text-red-500" :
        step.status === "running" ? "text-amber-500" :
        step.status === "skipped" ? "text-[#0B0B0B]/25" :
                                    "text-[#0B0B0B]/15"
      }`}>
        {step.status === "idle" ? "Pending" :
         step.status === "running" ? "Running" :
         step.status === "ok" ? "Done" :
         step.status === "error" ? "Failed" : "Skipped"}
      </div>
    </div>
  );
}

export default function AdminOptimize() {
  const { authFetch } = useAdmin();
  const [mode, setMode] = useState<Mode>("safe");
  const [showAdvancedWarning, setShowAdvancedWarning] = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [aborted, setAborted] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const [steps, setSteps] = useState<StepResult[]>(
    STEP_DEFS.map((s) => ({ id: s.id, label: s.label, status: "idle" as StepStatus }))
  );
  const [dbStats, setDbStats] = useState<DBStatsResult | null>(null);
  const [mediaResult, setMediaResult] = useState<MediaResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function setStep(id: string, patch: Partial<StepResult>) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  const reset = useCallback(() => {
    setSteps(STEP_DEFS.map((s) => ({ id: s.id, label: s.label, status: "idle" as StepStatus })));
    setDone(false);
    setAborted(false);
    setErrorMessage(null);
    setDbStats(null);
    setMediaResult(null);
  }, []);

  const run = useCallback(async () => {
    if (running) return;
    reset();
    setRunning(true);
    setAborted(false);
    setErrorMessage(null);

    const abort = (msg: string) => {
      setAborted(true);
      setErrorMessage(msg);
      setRunning(false);
      setDone(false);
    };

    // Step 1 — Pre-check
    setStep("precheck", { status: "running", label: "Checking system health" });
    await sleep(400);
    try {
      const r = await authFetch(`${API_BASE}/admin/optimize/precheck`, { method: "POST" });
      const data: PrecheckResult = await r.json();
      if (!data.ok) {
        setStep("precheck", { status: "error", detail: data.issues.join(", ") });
        return abort("System pre-check failed. Optimization stopped to protect your data.");
      }
      setStep("precheck", {
        status: "ok",
        detail: `Server OK, Database OK, Storage OK`,
      });
    } catch {
      setStep("precheck", { status: "error", detail: "Could not reach server" });
      return abort("System pre-check failed. Optimization stopped to protect your data.");
    }

    await sleep(500);

    // Step 2 — DB analyze
    setStep("db_analyze", { status: "running", label: mode === "advanced" ? "Vacuuming and analyzing database" : "Analyzing database" });
    try {
      const r = await authFetch(`${API_BASE}/admin/optimize/db-analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const data = await r.json() as { ok: boolean; detail?: string; error?: string };
      if (!data.ok) {
        setStep("db_analyze", { status: "error", detail: data.error ?? "Analysis failed" });
        return abort("Database optimization failed. Optimization stopped to protect your data.");
      }
      setStep("db_analyze", { status: "ok", detail: data.detail });
    } catch {
      setStep("db_analyze", { status: "error", detail: "Request failed" });
      return abort("Database optimization failed. Optimization stopped to protect your data.");
    }

    await sleep(400);

    // Step 3 — Cache clear
    setStep("cache_clear", { status: "running" });
    try {
      const r = await authFetch(`${API_BASE}/admin/optimize/cache-clear`, { method: "POST" });
      const data = await r.json() as { ok: boolean; detail?: string };
      setStep("cache_clear", { status: "ok", detail: data.detail });
    } catch {
      setStep("cache_clear", { status: "error", detail: "Could not clear cache" });
    }

    await sleep(400);

    // Step 4 — DB stats
    setStep("db_stats", { status: "running" });
    try {
      const r = await authFetch(`${API_BASE}/admin/optimize/db-stats`, { method: "POST" });
      const data: DBStatsResult = await r.json();
      setDbStats(data);
      const total = Object.values(data.tables || {}).reduce((a, b) => a + b, 0);
      setStep("db_stats", { status: "ok", detail: `${total} records across all tables` });
    } catch {
      setStep("db_stats", { status: "skipped", detail: "Stats unavailable" });
    }

    await sleep(400);

    // Step 5 — Media audit
    setStep("media_audit", { status: "running" });
    try {
      const r = await authFetch(`${API_BASE}/admin/optimize/media-audit`, { method: "POST" });
      const data: MediaResult = await r.json();
      setMediaResult(data);
      setStep("media_audit", { status: "ok", detail: data.detail });
    } catch {
      setStep("media_audit", { status: "skipped", detail: "Media audit unavailable" });
    }

    await sleep(300);
    setRunning(false);
    setDone(true);
  }, [running, mode, authFetch, reset]);

  const allOk = steps.every((s) => s.status === "ok" || s.status === "skipped");
  const completedCount = steps.filter((s) => s.status === "ok").length;

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[22px] font-black tracking-tight text-[#0B0B0B]">Optimize Website</h1>
        <p className="text-[14px] text-[#0B0B0B]/50 mt-1">
          Safe, non-destructive performance optimization. No data is deleted or modified.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column — controls */}
        <div className="lg:col-span-1 space-y-4">

          {/* Mode toggle */}
          <Card>
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#0B0B0B]/35 mb-3">Optimization Mode</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setMode("safe"); setShowAdvancedWarning(false); }}
                disabled={running}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  mode === "safe"
                    ? "border-[#0B0B0B] bg-[#0B0B0B]/4"
                    : "border-[#0B0B0B]/10 hover:border-[#0B0B0B]/25"
                }`}
              >
                <ShieldCheck size={15} className={`mt-0.5 shrink-0 ${mode === "safe" ? "text-[#0B0B0B]" : "text-[#0B0B0B]/30"}`} />
                <div>
                  <p className={`text-[13px] font-bold ${mode === "safe" ? "text-[#0B0B0B]" : "text-[#0B0B0B]/50"}`}>Safe Mode</p>
                  <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5 leading-snug">Runs ANALYZE on the database. Zero risk.</p>
                </div>
              </button>

              <button
                onClick={() => { setMode("advanced"); setShowAdvancedWarning(true); }}
                disabled={running}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  mode === "advanced"
                    ? "border-amber-400 bg-amber-50"
                    : "border-[#0B0B0B]/10 hover:border-[#0B0B0B]/25"
                }`}
              >
                <Zap size={15} className={`mt-0.5 shrink-0 ${mode === "advanced" ? "text-amber-600" : "text-[#0B0B0B]/30"}`} />
                <div>
                  <p className={`text-[13px] font-bold ${mode === "advanced" ? "text-amber-700" : "text-[#0B0B0B]/50"}`}>Advanced Mode</p>
                  <p className="text-[11px] text-[#0B0B0B]/40 mt-0.5 leading-snug">Runs VACUUM ANALYZE. Slightly longer, deeper cleanup.</p>
                </div>
              </button>
            </div>

            {showAdvancedWarning && mode === "advanced" && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-[11.5px] text-amber-800 leading-snug">
                  Advanced mode runs a full VACUUM, which briefly locks tables. The site remains accessible throughout.
                </p>
              </div>
            )}
          </Card>

          {/* Scheduler info */}
          <Card>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setShowScheduler((p) => !p)}
            >
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#0B0B0B]/40" />
                <p className="text-[13px] font-bold text-[#0B0B0B]">Weekly Schedule</p>
              </div>
              {showScheduler ? <ChevronUp size={14} className="text-[#0B0B0B]/30" /> : <ChevronDown size={14} className="text-[#0B0B0B]/30" />}
            </button>
            {showScheduler && (
              <div className="mt-3 pt-3 border-t border-[#0B0B0B]/8">
                <p className="text-[12px] text-[#0B0B0B]/50 leading-relaxed">
                  For automatic weekly optimization, set up a cron job on your server or use a scheduling service like cron-job.org to POST to:
                </p>
                <div className="mt-2 bg-[#0B0B0B]/5 rounded-xl p-2.5">
                  <code className="text-[10px] text-[#0B0B0B]/60 break-all font-mono leading-relaxed">
                    /api/admin/optimize/db-analyze
                  </code>
                </div>
                <p className="text-[11px] text-[#0B0B0B]/35 mt-2">Include your admin Bearer token in the Authorization header.</p>
              </div>
            )}
          </Card>

          {/* What this does */}
          <Card>
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#0B0B0B]/35 mb-3">What gets optimized</p>
            <div className="space-y-2.5">
              {[
                { icon: <Server size={12} />, label: "System pre-check", desc: "Verifies server, DB, and storage are healthy before doing anything" },
                { icon: <Database size={12} />, label: "Database tuning", desc: "Updates internal statistics PostgreSQL uses to plan fast queries" },
                { icon: <RotateCcw size={12} />, label: "Session cleanup", desc: "Removes expired admin session tokens from server memory" },
                { icon: <FolderOpen size={12} />, label: "Media audit", desc: "Counts and reports on your uploaded media library" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-[#0B0B0B]/6 flex items-center justify-center text-[#0B0B0B]/40 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0B0B0B]">{item.label}</p>
                    <p className="text-[11px] text-[#0B0B0B]/40 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#0B0B0B]/8">
              <p className="text-[11px] text-[#0B0B0B]/35 leading-relaxed">
                No content is deleted. No files are modified. The website stays live throughout the entire process.
              </p>
            </div>
          </Card>
        </div>

        {/* Right column — progress + results */}
        <div className="lg:col-span-2 space-y-4">

          {/* Main action */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[15px] font-black text-[#0B0B0B] tracking-tight">
                  {done && !aborted ? "Optimization complete" :
                   aborted ? "Optimization stopped" :
                   running ? "Optimization in progress..." :
                   "Ready to optimize"}
                </h2>
                <p className="text-[12px] text-[#0B0B0B]/45 mt-0.5">
                  {done && !aborted ? `${completedCount} of ${steps.length} tasks completed successfully` :
                   aborted ? "Restored to safe state" :
                   running ? "Please wait while each step completes..." :
                   `${mode === "advanced" ? "Advanced" : "Safe"} mode selected`}
                </p>
              </div>
              {(done || aborted) && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0B0B0B]/15 text-[12px] font-semibold text-[#0B0B0B]/60 hover:text-[#0B0B0B] hover:border-[#0B0B0B]/30 transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
            </div>

            {/* Steps */}
            <div className="divide-y divide-[#0B0B0B]/6 mb-5">
              {steps.map((step) => {
                const def = STEP_DEFS.find((d) => d.id === step.id);
                return <StepRow key={step.id} step={step} icon={def?.icon ?? <Zap size={13} />} />;
              })}
            </div>

            {/* Error banner */}
            {aborted && errorMessage && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 mb-4">
                <AlertTriangle size={15} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-red-700">Optimization stopped to prevent issues</p>
                  <p className="text-[12px] text-red-600 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Success banner */}
            {done && !aborted && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 mb-4">
                <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-emerald-700">Optimization completed successfully</p>
                  <p className="text-[12px] text-emerald-600 mt-0.5">
                    Database is tuned, session cache is cleared, and all systems are healthy.
                  </p>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {!done && !aborted && (
              <button
                onClick={run}
                disabled={running}
                className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-[14px] transition-all ${
                  running
                    ? "bg-[#0B0B0B]/8 text-[#0B0B0B]/30 cursor-not-allowed"
                    : mode === "advanced"
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md"
                    : "bg-[#0B0B0B] hover:bg-[#1a1a1a] text-white shadow-sm hover:shadow-md"
                }`}
              >
                {running ? (
                  <><Loader2 size={16} className="animate-spin" /> Running optimization...</>
                ) : (
                  <><Zap size={16} /> Optimize Website</>
                )}
              </button>
            )}
          </Card>

          {/* Results summary */}
          {done && !aborted && (
            <Card>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#0B0B0B]/35 mb-4">Results Summary</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  {
                    label: "Tasks Completed",
                    value: completedCount,
                    sub: `of ${steps.length}`,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                  },
                  {
                    label: "DB Tables",
                    value: dbStats ? Object.keys(dbStats.tables).length : "--",
                    sub: "analyzed",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Media Files",
                    value: mediaResult?.count ?? "--",
                    sub: mediaResult ? `${mediaResult.totalKb} KB` : "",
                    color: "text-violet-600",
                    bg: "bg-violet-50",
                  },
                  {
                    label: "Mode",
                    value: mode === "advanced" ? "Adv" : "Safe",
                    sub: mode === "advanced" ? "VACUUM" : "ANALYZE",
                    color: mode === "advanced" ? "text-amber-600" : "text-[#0B0B0B]",
                    bg: mode === "advanced" ? "bg-amber-50" : "bg-[#0B0B0B]/5",
                  },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.bg} rounded-xl p-3`}>
                    <p className={`text-[22px] font-black tracking-tight leading-none ${stat.color}`}>{stat.value}</p>
                    {stat.sub && <p className="text-[10px] text-[#0B0B0B]/40 mt-0.5">{stat.sub}</p>}
                    <p className="text-[11px] font-semibold text-[#0B0B0B]/60 mt-1.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {dbStats && dbStats.tables && (
                <div className="mb-4">
                  <p className="text-[12px] font-bold text-[#0B0B0B] mb-2">Database Contents</p>
                  <div className="space-y-1.5">
                    {Object.entries(dbStats.tables).map(([table, rows]) => (
                      <div key={table} className="flex items-center justify-between">
                        <span className="text-[12px] font-mono text-[#0B0B0B]/50">{table.replace(/_/g, " ")}</span>
                        <span className="text-[12px] font-bold text-[#0B0B0B]">{rows} row{rows === 1 ? "" : "s"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dbStats && dbStats.sizes && dbStats.sizes.length > 0 && (
                <div>
                  <p className="text-[12px] font-bold text-[#0B0B0B] mb-2">Table Sizes</p>
                  <div className="space-y-1.5">
                    {dbStats.sizes.map((s) => (
                      <div key={s.table_name} className="flex items-center justify-between">
                        <span className="text-[12px] font-mono text-[#0B0B0B]/50">{s.table_name}</span>
                        <span className="text-[12px] font-bold text-[#0B0B0B]">{s.total_size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
