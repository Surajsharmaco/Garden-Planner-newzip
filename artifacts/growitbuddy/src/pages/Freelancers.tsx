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
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5+ years",
];

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Enter a valid email"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  portfolioUrl: z.string().url("Enter a valid URL").or(z.string().min(0).max(0)),
  experience: z.string().min(1, "Select your experience level"),
});
type F = z.infer<typeof schema>;

const PERKS = [
  "Work with ambitious founders and fast-growing brands",
  "Flexible, remote-first project-based work",
  "Competitive, transparent compensation",
  "Grow within a world-class content operation",
  "Access to GrowitBuddy's frameworks and training",
];

export default function Freelancers() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const form = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", skills: [], portfolioUrl: "", experience: "" },
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
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setSelectedSkills([]);
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
        title="For Freelancers - GrowitBuddy"
        description="Join the GrowitBuddy freelancer network. We work with talented writers, editors, strategists, and designers who want to work with the world's most ambitious founders."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Freelancers</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Join our network of world-class talent.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            We work with talented writers, editors, strategists, and designers who want to make a real impact working with ambitious founders worldwide.
          </motion.p>
        </div>
      </section>

      {/* Perks + Form */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Perks */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.15 }}>
              Why work with GrowitBuddy?
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {PERKS.map((perk, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
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
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>We're looking for</p>
              {["Writers who've worked with founders or B2B brands", "Video editors with short-form expertise", "Designers with content & social media experience", "Strategists with a track record in growth"].map((item, i) => (
                <p key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: "1.7", marginBottom: 8 }}>— {item}</p>
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
                <h3 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>Application received!</h3>
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.55)", lineHeight: "1.75" }}>
                  We review applications weekly. If you're a fit, we'll reach out to schedule a conversation.
                </p>
              </div>
            ) : (
              <div style={{ background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>Apply to join</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 28 }}>We review every application. Expect a response within 7 business days.</p>

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

                    <FormField control={form.control} name="skills" render={() => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Skills (select all that apply)</FormLabel>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                          {SKILLS_LIST.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              style={{
                                padding: "8px 14px",
                                borderRadius: 100,
                                fontSize: 13,
                                fontWeight: 600,
                                border: "1.5px solid",
                                borderColor: selectedSkills.includes(skill) ? "#0B0B0B" : "rgba(11,11,11,0.15)",
                                background: selectedSkills.includes(skill) ? "#0B0B0B" : "transparent",
                                color: selectedSkills.includes(skill) ? "#fff" : "#0B0B0B",
                                cursor: "pointer",
                                transition: "all 0.15s",
                              }}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
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
                      {submitting ? "Submitting…" : "Submit Application"}
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
