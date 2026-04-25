import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEOMeta from "@/components/SEOMeta";

const schema = z.object({
  name: z.string().min(2, "Enter your full name").max(80, "Name too long").regex(/^[a-zA-Z\s'-]+$/, "Name should only contain letters"),
  email: z.string().email("Enter a valid email address (e.g. you@example.com)"),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number (e.g. +1 234 567 8900)"),
  niche: z.string().min(1, "Please select your niche"),
  handle: z.string().min(2, "Enter your handle or page URL").max(200, "Too long"),
  monthlyViews: z.string().min(1, "Please select your range"),
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

const CONFIG = {
  influencer: {
    seoTitle: "Influencer Network - GrowitBuddy",
    seoDesc: "Join the GrowitBuddy Influencer Network. Built for serious creators who want real authority, meaningful opportunities, and long-term growth.",
    eyebrow: "Influencer Network",
    hero: "Join the Influencer Network.",
    heroSubtext: "Connect, grow, and unlock opportunities. We work with creators who want to build real authority and long-term growth, not just chase views.",
    sectionTitle: "What You Get.",
    benefits: [
      "Growth-focused guidance built around your platform",
      "Collaboration opportunities with serious creators",
      "Access to brand and content opportunities",
      "Strategic support to build lasting authority",
      "A network of creators focused on long-term growth",
    ],
    calloutLabel: "Built for serious creators",
    calloutItems: [
      "Influencers focused on growth and long-term opportunities",
      "Personal brands building real authority in their space",
      "Content creators who want more than just views",
    ],
    formTitle: "Join the Network",
    formSubtitle: "Takes less than 2 minutes. Every application is reviewed personally.",
    handleLabel: "Primary Social Handle",
    handlePlaceholder: "@yourhandle or profile URL",
    submitLabel: "Join the Influencer Network",
    apiEndpoint: "creators",
    successMsg: "We review every application personally. If you're a fit for the Influencer Network, we'll be in touch within 48 hours.",
  },
  page: {
    seoTitle: "Join Distribution Network - GrowitBuddy",
    seoDesc: "Apply to join the GrowitBuddy Distribution Network as a meme or theme page owner and distribute premium content at scale.",
    eyebrow: "Distribution Network",
    hero: "Join the Distribution Network.",
    heroSubtext: "Partner with us to distribute premium content through your page. We work with serious meme and theme page owners who have real, engaged audiences.",
    sectionTitle: "What You Get.",
    benefits: [
      "Consistent high-quality content for your page",
      "Monetise your audience with premium campaigns",
      "Access to brand and content partnerships",
      "Support from a dedicated distribution team",
      "Part of a growing network of high-reach pages",
    ],
    calloutLabel: "Built for page owners",
    calloutItems: [
      "Meme and theme pages with real engagement",
      "Pages focused on consistent content and growth",
      "Page owners who want long-term partnerships",
    ],
    formTitle: "Apply as Page Owner",
    formSubtitle: "Takes less than 2 minutes. Every application is reviewed personally.",
    handleLabel: "Profile / Page Link",
    handlePlaceholder: "@yourpage or page URL",
    submitLabel: "Apply as Page Owner",
    apiEndpoint: "page-owner",
    successMsg: "Your application has been received. Our team will review and get back to you.",
  },
};

export type NetworkApplyType = keyof typeof CONFIG;

export default function NetworkApplyForm({ type }: { type: NetworkApplyType }) {
  const cfg = CONFIG[type];
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", niche: "", handle: "", monthlyViews: "" },
  });

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/forms/${cfg.apiEndpoint}`.replace(/\/\//g, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
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
      <SEOMeta title={cfg.seoTitle} description={cfg.seoDesc} />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>{cfg.eyebrow}</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B", maxWidth: "18ch", marginBottom: 24 }}
          >
            {cfg.hero}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, color: "rgba(11,11,11,0.5)", lineHeight: "1.75", maxWidth: "52ch" }}
          >
            {cfg.heroSubtext}
          </motion.p>
        </div>
      </section>

      {/* Benefits + Form */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Benefits */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 32, lineHeight: 1.15 }}>
              {cfg.sectionTitle}
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {cfg.benefits.map((benefit, i) => (
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
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#0B0B0B" }}>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ background: "#F7F7F5", borderRadius: 16, padding: "28px", border: "1px solid rgba(11,11,11,0.08)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 14 }}>{cfg.calloutLabel}</p>
              {cfg.calloutItems.map((item, i) => (
                <p key={i} style={{ fontSize: 14, color: "rgba(11,11,11,0.6)", lineHeight: "1.7", marginBottom: 8 }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            {submitted ? (
              <div style={{ background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.15)", borderRadius: 20, padding: "48px 36px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, color: "#fff" }}>
                  <Check className="w-7 h-7" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>Application received.</h3>
                <p style={{ fontSize: 15, color: "rgba(11,11,11,0.55)", lineHeight: "1.75" }}>{cfg.successMsg}</p>
              </div>
            ) : (
              <div style={{ background: "#F7F7F5", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>{cfg.formTitle}</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 28 }}>{cfg.formSubtitle}</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Full Name</FormLabel>
                        <FormControl><input className="gb-input" placeholder="Your full name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Email Address</FormLabel>
                        <FormControl><input type="email" className="gb-input" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Contact Number</FormLabel>
                        <FormControl><input type="tel" className="gb-input" placeholder="+1 234 567 8900" {...field} /></FormControl>
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
                              {NICHES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="handle" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>{cfg.handleLabel}</FormLabel>
                        <FormControl><input className="gb-input" placeholder={cfg.handlePlaceholder} {...field} /></FormControl>
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
                              {VIEWS_RANGES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
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
                    >
                      {submitting ? "Submitting..." : cfg.submitLabel}
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
