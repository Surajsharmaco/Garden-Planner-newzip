import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import SEOMeta from "@/components/SEOMeta";
import { API_BASE } from "../lib/config";

const ROLES = [
  "Content Editor",
  "Graphic Designer",
  "Video Editor",
  "Marketing & Growth",
  "Social Media",
  "Copywriter / Writer",
  "Research & Strategy",
  "Operations Support",
  "Other",
];

const EXPERIENCE_OPTIONS = ["Beginner", "Intermediate"];

const schema = z.object({
  name: z.string().min(2, "Enter your full name").max(80).regex(/^[a-zA-Z\s'-]+$/, "Name should only contain letters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number").or(z.literal("")).optional(),
  role: z.string().min(1, "Please select a role"),
  experience: z.string().min(1, "Please select your experience level"),
  portfolioUrl: z.string().url("Enter a valid URL (must start with https://)").or(z.literal("")).optional(),
  whyJoin: z.string().min(20, "Please write at least 20 characters").max(1000, "Max 1000 characters"),
});
type F = z.infer<typeof schema>;

export default function Internship() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<F>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "", role: "", experience: "", portfolioUrl: "", whyJoin: "" },
  });

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/forms/internship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection error", description: "Please check your connection.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid rgba(11,11,11,0.12)",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    color: "#0B0B0B",
    background: "#F7F7F5",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(11,11,11,0.5)",
    marginBottom: 8,
  };

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <SEOMeta
        title="Internship - GrowitBuddy"
        description="Work on real projects, gain hands-on experience, and become part of a high-performance content and authority studio."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>
            Internship
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "16ch", marginBottom: 24 }}
          >
            Start here. Grow fast.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Work on real projects, gain hands-on experience, and become part of a high-performance team. This is not busy work. You will contribute to things that actually ship.
          </motion.p>
        </div>
      </section>

      {/* Content + Form */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 28, lineHeight: 1.15 }}>
              What you will actually do.
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
              {[
                "Work on live client projects from day one",
                "Get structured feedback from senior team members",
                "Build a real portfolio of shipped work",
                "Access to GrowitBuddy's frameworks and internal training",
                "Performance-based path toward a full-time role or freelance contract",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={11} color="#fff" />
                  </span>
                  <span style={{ fontSize: 15, color: "rgba(11,11,11,0.65)", lineHeight: "1.6" }}>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ background: "#F7F7F5", borderRadius: 16, padding: "24px 28px", border: "1px solid rgba(11,11,11,0.07)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 10 }}>
                Who this is for
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Driven individuals at the start of their career",
                  "People who want to do, not just learn theory",
                  "Early-stage creators and marketers ready for real work",
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 14, color: "rgba(11,11,11,0.55)", lineHeight: 1.6, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(11,11,11,0.25)", marginTop: 2 }}>&#8212;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ borderRadius: 20, background: "#0B0B0B", padding: "52px 40px", textAlign: "center" }}
              >
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <Check size={24} color="#fff" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#fff", marginBottom: 12 }}>Application received.</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: "1.7", maxWidth: "32ch", margin: "0 auto" }}>
                  We will review and get back to you.
                </p>
              </motion.div>
            ) : (
              <div style={{ borderRadius: 20, background: "#0B0B0B", padding: "44px 40px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#fff", marginBottom: 6 }}>Apply for Internship</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32, lineHeight: "1.6" }}>
                  We read every application. If you are a fit, we will be in touch.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem style={{ display: "flex", flexDirection: "column" }}>
                          <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Full Name</FormLabel>
                          <FormControl>
                            <input {...field} placeholder="Jane Smith" style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                          </FormControl>
                          <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem style={{ display: "flex", flexDirection: "column" }}>
                          <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Email</FormLabel>
                          <FormControl>
                            <input {...field} type="email" placeholder="you@example.com" style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                          </FormControl>
                          <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem style={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Phone <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></FormLabel>
                        <FormControl>
                          <input {...field} type="tel" placeholder="+1 234 567 8900" style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                        </FormControl>
                        <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="role" render={({ field }) => (
                      <FormItem style={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Role Applying For</FormLabel>
                        <FormControl>
                          <select {...field} style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: field.value ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                            <option value="" disabled style={{ color: "#0B0B0B" }}>Select a role</option>
                            {ROLES.map((r) => <option key={r} value={r} style={{ color: "#0B0B0B", background: "#fff" }}>{r}</option>)}
                          </select>
                        </FormControl>
                        <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="experience" render={({ field }) => (
                      <FormItem style={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Experience Level</FormLabel>
                        <div style={{ display: "flex", gap: 10 }}>
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => field.onChange(opt)}
                              style={{
                                flex: 1,
                                padding: "12px 16px",
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "'Inter', sans-serif",
                                cursor: "pointer",
                                border: field.value === opt ? "1.5px solid rgba(255,255,255,0.4)" : "1.5px solid rgba(255,255,255,0.1)",
                                background: field.value === opt ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                                color: field.value === opt ? "#fff" : "rgba(255,255,255,0.4)",
                                transition: "all 0.15s",
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="portfolioUrl" render={({ field }) => (
                      <FormItem style={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Portfolio / Work Link <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></FormLabel>
                        <FormControl>
                          <input {...field} type="url" placeholder="https://yourwork.com" style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                        </FormControl>
                        <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="whyJoin" render={({ field }) => (
                      <FormItem style={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel style={{ ...labelStyle, color: "rgba(255,255,255,0.4)" }}>Why do you want to join?</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={4}
                            placeholder="Tell us what drives you and what you hope to build here..."
                            style={{ ...inputStyle, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff", resize: "vertical", minHeight: 100 }}
                          />
                        </FormControl>
                        <FormMessage style={{ fontSize: 12, color: "#f87171" }} />
                      </FormItem>
                    )} />

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: "16px 28px",
                        borderRadius: 100,
                        background: "#fff",
                        color: "#0B0B0B",
                        fontSize: 15,
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        border: "none",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.6 : 1,
                        transition: "opacity 0.15s",
                        width: "100%",
                        marginTop: 4,
                      }}
                    >
                      {submitting ? "Submitting..." : "Apply for Internship"}
                    </button>

                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
