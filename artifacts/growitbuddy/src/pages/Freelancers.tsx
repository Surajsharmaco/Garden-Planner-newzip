import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import SEOMeta from "@/components/SEOMeta";

const SKILLS_LIST = [
  "Ghostwriting",
  "Video Editing",
  "Graphic Design",
  "Content Strategy",
  "Podcast Editing",
  "SEO & Distribution",
  "LinkedIn Growth",
  "Newsletter Writing",
  "Social Media Management",
  "Copywriting",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5+ years",
];

const schema = z.object({
  name: z.string().min(2, "Enter your full name").max(80, "Name too long").regex(/^[a-zA-Z\s'-]+$/, "Name should only contain letters"),
  email: z.string().email("Enter a valid email address (e.g. you@example.com)"),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number (e.g. +1 234 567 8900)"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  portfolioUrl: z.string().url("Enter a valid URL (must start with https://)").or(z.literal("")),
  experience: z.string().min(1, "Please select your experience level"),
});
type F = z.infer<typeof schema>;

const PERKS = [
  "Real client projects, not random gigs",
  "Consistent work opportunities based on performance",
  "Performance-based growth within the network",
  "Access to tools and resources as you level up",
  "A structured system to sharpen your skills",
];

export default function Freelancers() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [otherSkill, setOtherSkill] = useState("");

  const form = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", skills: [], portfolioUrl: "", experience: "" },
  });

  const toggleSkill = (skill: string) => {
    const next = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(next);
    form.setValue("skills", next, { shouldValidate: true });
  };

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/forms/freelancers`.replace(/\/\//g, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, otherSkill: selectedSkills.includes("Other") ? otherSkill : undefined }),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setSelectedSkills([]);
        setOtherSkill("");
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="Talent Network - GrowitBuddy"
        description="Join the GrowitBuddy Talent Network. Work on real projects, get selected on performance, and build your career with a system, not random gigs."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Talent Network</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Join the Talent Network.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Work on real projects. Get selected based on performance. Build your career with a system, not random gigs.
          </motion.p>
        </div>
      </section>

      {/* Perks + Form */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Perks */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.15 }}>
              What You Get.
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {PERKS.map((perk, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(11,11,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check className="w-3.5 h-3.5" style={{ color: "#0B0B0B" }} />
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B" }}>{perk}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ background: "#0B0B0B", borderRadius: 16, padding: "28px 32px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Not for everyone</p>
              {["Video editors ready to work on real client projects", "Graphic and motion designers with a strong portfolio", "Content creators who execute, not just ideate", "If you want random gigs, this is not for you"].map((item, i) => (
                <p key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: "1.7", marginBottom: 8 }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {submitted ? (
              <div
                style={{
                  background: "#F7F7F5",
                  border: "1.5px solid rgba(11,11,11,0.15)",
                  borderRadius: 20,
                  padding: "48px 36px",
                  textAlign: "center",
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>✓</div>
                <h3 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>Application received.</h3>
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.55)", lineHeight: "1.75" }}>
                  We review applications based on performance. If you make the cut, we'll be in touch within 7 business days.
                </p>
              </div>
            ) : (
              <div style={{ background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>Apply for the Talent Network</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 28 }}>Selection is performance-based. Apply now and prove your work.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Full Name</FormLabel>
                        <FormControl>
                          <input className="gb-input" placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Email Address</FormLabel>
                        <FormControl>
                          <input type="email" className="gb-input" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Contact Number</FormLabel>
                        <FormControl>
                          <input type="tel" className="gb-input" placeholder="+1 234 567 8900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="skills" render={() => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Skills (select all that apply)</FormLabel>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                          {SKILLS_LIST.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              style={{
                                padding: "10px 14px",
                                borderRadius: 10,
                                fontSize: 13,
                                fontWeight: 600,
                                border: "1.5px solid",
                                borderColor: selectedSkills.includes(skill) ? "#0B0B0B" : "rgba(11,11,11,0.15)",
                                background: selectedSkills.includes(skill) ? "#0B0B0B" : "transparent",
                                color: selectedSkills.includes(skill) ? "#fff" : "#0B0B0B",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                textAlign: "left",
                              }}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                        {selectedSkills.includes("Other") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ marginTop: 10 }}
                          >
                            <input
                              className="gb-input"
                              placeholder="Please describe your skill..."
                              value={otherSkill}
                              onChange={(e) => setOtherSkill(e.target.value)}
                            />
                          </motion.div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="portfolioUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Portfolio / Work Samples URL <span style={{ color: "rgba(11,11,11,0.35)", fontWeight: 400 }}>(optional)</span></FormLabel>
                        <FormControl>
                          <input className="gb-input" placeholder="https://yourportfolio.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="experience" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Years of Experience</FormLabel>
                        <FormControl>
                          <select
                            className="gb-input"
                            style={{ height: 48, appearance: "none" }}
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <option value="">Select experience level</option>
                            {EXPERIENCE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="gb-btn"
                      style={{ justifyContent: "center", marginTop: 8, padding: "14px 0", fontSize: 15 }}
                      data-testid="button-freelancer-submit"
                    >
                      {submitting ? "Submitting…" : "Apply for the Talent Network"}
                      {!submitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
