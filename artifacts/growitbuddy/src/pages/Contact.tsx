import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import SEOMeta from "@/components/SEOMeta";

function CalEmbed() {
  useEffect(() => {
    const w = window as any;

    // Bootstrap Cal queue accumulator (mirrors the official IIFE)
    if (!w.Cal) {
      (function (C: any, A: string, L: string) {
        const p = (a: any, ar: any) => a.q.push(ar);
        const d = C.document;
        C.Cal = C.Cal || function (this: any) {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement("script");
            s.src = A;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments); };
            const ns = ar[1];
            api.q = api.q || [];
            if (typeof ns === "string") {
              cal.ns[ns] = cal.ns[ns] || api;
              p(cal.ns[ns], ar);
              p(cal, ["initNamespace", ns]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    }

    // Queue all Cal calls — embed.js will process them once loaded
    w.Cal("init", "growth-strategy-call", { origin: "https://app.cal.com" });
    w.Cal.ns["growth-strategy-call"]("inline", {
      elementOrSelector: "#my-cal-inline-growth-strategy-call",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "growitbuddy.com/growth-strategy-call",
    });
    w.Cal.ns["growth-strategy-call"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="my-cal-inline-growth-strategy-call"
      style={{ width: "100%", minHeight: 600, overflow: "scroll", borderRadius: 16 }}
    />
  );
}

const schema = z.object({
  name: z.string().min(2, "Enter your full name").max(80, "Name too long").regex(/^[a-zA-Z\s'-]+$/, "Name should only contain letters"),
  email: z.string().email("Enter a valid email address (e.g. you@example.com)"),
  company: z.string().min(1, "Enter your company or brand name").max(100, "Company name too long"),
  message: z.string().min(20, "Please write at least 20 characters about your goals"),
});
type F = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<F>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", company: "", message: "" } });

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/forms/contact`.replace(/\/\//g, "/"), {
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
        title="Contact - GrowitBuddy"
        description="Book a free strategy call with GrowitBuddy. We'll audit your presence, identify your authority gap, and map out your 90-day system."
      />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 16 }}>Contact</p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ fontWeight: 800, fontSize: "clamp(44px, 6.5vw, 80px)", letterSpacing: "-0.04em", lineHeight: "1.02", color: "#0B0B0B" }}
            >
              Let's build your authority system.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 18, lineHeight: "1.75", color: "rgba(11,11,11,0.5)", alignSelf: "flex-end" }}
          >
            We partner with ambitious founders and creators who are serious about authority. One strategy call is all it takes to get started.
          </motion.p>
        </div>
      </section>

      {/* Cal.com Booking */}
      <section style={{ padding: "80px 24px", background: "#fff", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
        <div className="max-w-[1100px] mx-auto">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,11,11,0.4)", marginBottom: 12 }}>Book a call</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.04em", color: "#0B0B0B", marginBottom: 40, lineHeight: 1.1 }}>
            Pick a time that works for you.
          </h2>
          <CalEmbed />
        </div>
      </section>

      {/* Form + info */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16">
          {/* Info */}
          <div>
            <div style={{ borderTop: "1px solid rgba(11,11,11,0.08)", display: "flex", flexDirection: "column" }}>
              {[
                { label: "Email", value: "hello@growitbuddy.com", href: "mailto:hello@growitbuddy.com" },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Based", value: "Global - 4 timezones" },
                { label: "Next step", value: "Free 30-min strategy call" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "20px 0", borderBottom: "1px solid rgba(11,11,11,0.08)" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(11,11,11,0.35)", marginBottom: 6 }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} style={{ fontSize: 16, fontWeight: 600, color: "#0B0B0B", textDecoration: "none" }} className="hover:opacity-60 transition-opacity">{item.value}</a>
                    : <p style={{ fontSize: 16, fontWeight: 500, color: "#0B0B0B" }}>{item.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {submitted ? (
              <div
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(11,11,11,0.15)",
                  borderRadius: 20,
                  padding: "60px 40px",
                  textAlign: "center",
                }}
              >
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 30, fontWeight: 800, color: "#fff" }}>✓</div>
                <h3 style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 12 }}>Message sent!</h3>
                <p style={{ fontSize: 16, color: "rgba(11,11,11,0.5)", lineHeight: "1.75" }}>
                  We'll be in touch within 24 hours to schedule your free strategy call.
                </p>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1.5px solid rgba(11,11,11,0.08)", borderRadius: 20, padding: "40px 36px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", color: "#0B0B0B", marginBottom: 8 }}>Send us a message</h3>
                <p style={{ fontSize: 14, color: "rgba(11,11,11,0.45)", marginBottom: 28 }}>We respond to every inquiry within 24 hours.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16 }}>
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Name</FormLabel>
                          <FormControl><input className="gb-input" placeholder="Your name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Email</FormLabel>
                          <FormControl><input type="email" className="gb-input" placeholder="you@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>Company / Brand</FormLabel>
                        <FormControl><input className="gb-input" placeholder="Your company" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0B0B0B" }}>What are you looking to achieve?</FormLabel>
                        <FormControl>
                          <textarea
                            className="gb-input"
                            style={{ minHeight: 140, resize: "none", lineHeight: "1.6" }}
                            placeholder="Tell us about your goals and challenges..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="gb-btn"
                      style={{ justifyContent: "center", marginTop: 8, padding: "14px 0", fontSize: 15 }}
                      data-testid="button-book-call-cta"
                    >
                      {submitting ? "Sending…" : "Send Message"}
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
