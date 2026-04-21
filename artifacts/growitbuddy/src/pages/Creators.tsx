import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEOMeta from "@/components/SEOMeta";

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Enter a valid email"),
  niche: z.string().min(1, "Select your niche"),
  handle: z.string().min(1, "Enter your primary social handle"),
  monthlyViews: z.string().min(1, "Select your monthly views range"),
});
type F = z.infer<typeof schema>;

const NICHES = [
  "Business & Entrepreneurship",
  "Personal Finance",
  "Health & Wellness",
  "Technology & AI",
  "Marketing & Growth",
  "Leadership & Management",
  "Real Estate",
  "Coaching & Education",
  "E-commerce",
  "Other",
];

const VIEWS_RANGES = [
  "Under 10K/month",
  "10K – 50K/month",
  "50K – 200K/month",
  "200K – 1M/month",
  "1M+/month",
];

const BENEFITS = [
  "Done-for-you content strategy tailored to your niche",
  "Professional editing team at your disposal",
  "Multi-platform distribution systems",
  "Monthly performance analytics & optimization",
  "Direct access to Suraj & the GrowitBuddy team",
];

export default function Creators() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", niche: "", handle: "", monthlyViews: "" },
  });

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/forms/creators`.replace(/\/\//g, "/"), {
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
      toast({ title: "Connection error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#F7F7F5", fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title="For Creators — GrowitBuddy"
        description="Turn your creator platform into a real business. Join the GrowitBuddy creator ecosystem and get done-for-you authority systems built for your niche."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Creators</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            Built for creators who mean business.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            Systems designed specifically for content creators turning their platform into predictable revenue and lasting authority.
          </motion.p>
        </div>
      </section>

      {/* Benefits + Form */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.15 }}>
              What you get when you join.
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {BENEFITS.map((benefit, i) => (
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
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B" }}>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ background: "#F7F7F5", borderRadius: 16, padding: "28px", border: "1px solid rgba(11,11,11,0.08)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 14 }}>Who is this for?</p>
              {[
                "Creators with 5K+ followers on any platform",
                "Founders building a personal brand alongside a business",
                "Coaches, consultants, and educators with expertise to share",
              ].map((item, i) => (
                <p key={i} style={{ fontSize: 14, color: "rgba(11,11,11,0.6)", lineHeight: "1.7", marginBottom: 8 }}>— {item}</p>
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
                  Welcome to the GrowitBuddy creator ecosystem. We'll review your application and be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <div style={{ background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>Apply to join</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 28 }}>Takes less than 2 minutes. We review every application personally.</p>

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

                    <FormField control={form.control} name="niche" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Your Niche</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="gb-input" style={{ height: 48 }}>
                              <SelectValue placeholder="Select your niche" />
                            </SelectTrigger>
                            <SelectContent>
                              {NICHES.map((n) => (
                                <SelectItem key={n} value={n}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="handle" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Primary Social Handle</FormLabel>
                        <FormControl>
                          <input className="gb-input" placeholder="@yourhandle or profile URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="monthlyViews" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Monthly Views / Reach</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="gb-input" style={{ height: 48 }}>
                              <SelectValue placeholder="Select your range" />
                            </SelectTrigger>
                            <SelectContent>
                              {VIEWS_RANGES.map((v) => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="gb-btn"
                      style={{ justifyContent: "center", marginTop: 8, padding: "14px 0", fontSize: 15 }}
                      data-testid="button-creator-submit"
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
