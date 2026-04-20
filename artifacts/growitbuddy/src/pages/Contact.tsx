import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(10, "Tell us about your goals"),
});

type F = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<F>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", company: "", message: "" } });

  const onSubmit = async (data: F) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    toast({ title: "Message sent", description: "We'll be in touch within 24 hours." });
    form.reset();
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-28 pb-16 px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#6E6E73" }}>Contact</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-bold"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: "1.07", letterSpacing: "-0.025em", color: "#1D1D1F" }}
          >
            Let's build your<br />authority system.
          </motion.h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-5 pb-24" style={{ background: "#fff" }}>
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16">
          {/* Left — info */}
          <div>
            <p className="text-[19px] leading-[1.65] mb-10" style={{ color: "#6E6E73" }}>
              We partner with ambitious founders and creators who are serious about building earned authority and inbound revenue.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { label: "Email", value: "hello@growitbuddy.com", href: "mailto:hello@growitbuddy.com" },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Location", value: "Global — async across 4 timezones" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-[14px]" style={{ background: "#F5F5F7" }}>
                  <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#6E6E73" }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-[17px] font-medium hover:underline" style={{ color: "#0071E3" }}>{item.value}</a>
                    : <p className="text-[17px]" style={{ color: "#1D1D1F" }}>{item.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] font-semibold" style={{ color: "#1D1D1F" }}>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-[12px] text-[17px]"
                          style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] font-semibold" style={{ color: "#1D1D1F" }}>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-12 rounded-[12px] text-[17px]"
                          style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-semibold" style={{ color: "#1D1D1F" }}>Company / Brand</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-[12px] text-[17px]"
                        style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)" }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px] font-semibold" style={{ color: "#1D1D1F" }}>What are you looking to achieve?</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[140px] rounded-[12px] text-[17px] resize-none"
                        style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)" }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full font-semibold text-[17px] mt-2 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
                  style={{ background: "#0071E3", color: "#fff" }}
                  data-testid="button-book-call-cta"
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
