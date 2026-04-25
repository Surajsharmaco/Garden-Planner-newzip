import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#0B0B0B]/60 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-[#0B0B0B]/40">{hint}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, className = "", ...props }: InputProps) {
  const el = (
    <input
      {...props}
      className={`w-full border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[14px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/40 bg-white transition-colors ${className}`}
    />
  );
  if (!label) return el;
  return <Field label={label} hint={hint}>{el}</Field>;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function Textarea({ label, hint, className = "", ...props }: TextareaProps) {
  const el = (
    <textarea
      {...props}
      className={`w-full border border-[#0B0B0B]/12 rounded-xl px-3.5 py-2.5 text-[14px] text-[#0B0B0B] placeholder-[#0B0B0B]/30 outline-none focus:border-[#0B0B0B]/40 bg-white transition-colors resize-y min-h-[90px] ${className}`}
    />
  );
  if (!label) return el;
  return <Field label={label} hint={hint}>{el}</Field>;
}

export function SaveBar({
  onSave,
  saving,
  saved,
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-5 border-t border-[#0B0B0B]/8 mt-6">
      <span className="text-[12px] text-[#0B0B0B]/40">
        {saved ? "Saved successfully" : "Unsaved changes"}
      </span>
      <button
        onClick={onSave}
        disabled={saving}
        className="bg-[#0B0B0B] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0B0B0B]/85 transition-colors disabled:opacity-40"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-[22px] font-black tracking-tight text-[#0B0B0B]">{title}</h1>
      {description && <p className="text-[14px] text-[#0B0B0B]/50 mt-1">{description}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#0B0B0B]/8 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[14px] font-bold text-[#0B0B0B] mb-4 pb-3 border-b border-[#0B0B0B]/8">
      {children}
    </h2>
  );
}

export function StatusBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      {text}
    </span>
  );
}
