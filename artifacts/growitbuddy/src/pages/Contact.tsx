import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  message: z.string().min(10, "Tell us about your goals"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", message: "" }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSubmitting(false);
    toast({ title: "Message sent", description: "We'll be in touch within 24 hours." });
    form.reset();
  };

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-8 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-black/[0.03] blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-6">Contact</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] leading-[1.08] text-[#0A0A0A]"
          >
            Let's build your<br />authority system.
          </motion.h1>
        </div>
      </section>

      {/* Form + info */}
      <section className="pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24">
          <div>
            <p className="text-black/45 text-base leading-[1.85] mb-10">
              Ready to stop renting attention and start owning your category? We partner with ambitious founders and creators who are serious about authority.
            </p>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#0A0A0A] font-semibold text-sm mb-1">Email</p>
                <a href="mailto:hello@growitbuddy.com" className="text-black/40 hover:text-black text-sm transition-colors">hello@growitbuddy.com</a>
              </div>
              <div>
                <p className="text-[#0A0A0A] font-semibold text-sm mb-1">Location</p>
                <p className="text-black/40 text-sm">Global — async across 4 timezones</p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel className="text-[#0A0A0A] text-sm font-medium">Name</FormLabel><FormControl><Input className="h-12 rounded-xl border-black/10 bg-[#F9F9F9]" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel className="text-[#0A0A0A] text-sm font-medium">Email</FormLabel><FormControl><Input type="email" className="h-12 rounded-xl border-black/10 bg-[#F9F9F9]" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel className="text-[#0A0A0A] text-sm font-medium">Company / Brand</FormLabel><FormControl><Input className="h-12 rounded-xl border-black/10 bg-[#F9F9F9]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel className="text-[#0A0A0A] text-sm font-medium">What are you looking to achieve?</FormLabel><FormControl><Textarea className="min-h-[140px] rounded-xl border-black/10 bg-[#F9F9F9] resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 w-full h-14 rounded-full bg-[#0A0A0A] text-white font-semibold text-base hover:bg-black/85 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] group mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
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
