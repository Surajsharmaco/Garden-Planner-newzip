import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(1, "Company required"),
  message: z.string().min(10, "Tell us about your goals"),
});
type F = z.infer<typeof schema>;

const inputStyle = {
  background: "#F6F6F6",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "5px",
  fontFamily: "'Instrument Sans', sans-serif",
  fontSize: "16px",
  height: "48px",
};

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<F>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", company: "", message: "" } });

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    toast({ title: "Message sent", description: "We'll be in touch within 24 hours." });
    form.reset();
  };

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20" style={{ background: "#F6F6F6", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>Contact</p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="omc-heading leading-[1.05]"
              style={{ fontSize: "clamp(44px, 6.5vw, 80px)", color: "#000" }}
            >
              Let's build your <em>authority system</em>.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[17px] leading-[1.75] self-end"
            style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            We partner with ambitious founders and creators who are serious about authority. One strategy call is all it takes to get started.
          </motion.p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16">
          {/* Info */}
          <div>
            <div className="flex flex-col gap-px" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {[
                { label: "Email", value: "hello@growitbuddy.com", href: "mailto:hello@growitbuddy.com" },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Based", value: "Global — 4 timezones" },
              ].map((item) => (
                <div key={item.label} className="py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1.5" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-[16px] font-medium hover:opacity-60 transition-opacity" style={{ color: "#0072F5", fontFamily: "'Instrument Sans', sans-serif" }}>{item.value}</a>
                    : <p className="text-[16px]" style={{ color: "#000", fontFamily: "'Instrument Sans', sans-serif" }}>{item.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#000" }}>Name</FormLabel>
                      <FormControl><Input style={inputStyle} className="border-0" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#000" }}>Email</FormLabel>
                      <FormControl><Input type="email" style={inputStyle} className="border-0" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#000" }}>Company / Brand</FormLabel>
                    <FormControl><Input style={inputStyle} className="border-0" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#000" }}>What are you looking to achieve?</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{ ...inputStyle, height: "auto", minHeight: "140px", resize: "none" }}
                        className="border-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <button
                  type="submit"
                  disabled={submitting}
                  className="omc-btn h-12 text-[15px] justify-center mt-1"
                  data-testid="button-book-call-cta"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
