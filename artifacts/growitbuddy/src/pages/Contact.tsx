import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a bit about your goals"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", website: "", message: "" }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Inquiry Sent",
      description: "We'll be in touch within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="w-full pt-10 pb-24 bg-[#F8F5EF]">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid md:grid-cols-5 gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#0E0D0B]">Let's build<br/>your system.</h1>
            <p className="text-xl text-[#6B6760] mb-12">
              Ready to stop renting attention and start owning your category? We partner with ambitious founders and creators.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/[0.05] rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#6B6760]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-[#0E0D0B]">Email Us</h4>
                  <a href="mailto:hello@growitbuddy.com" className="text-[#6B6760] hover:text-black transition-colors">
                    hello@growitbuddy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/[0.05] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#706C64]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-[#0E0D0B]">Global Team</h4>
                  <p className="text-[#6B6760]">Operating asynchronously<br/>across 4 timezones.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3"
          >
            <div className="bg-[#EDE9DF] border border-[#0E0D0B]/8 shadow-sm rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8 text-[#0E0D0B]">Book a Strategy Call</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem><FormLabel>Company / Brand</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="website" render={({ field }) => (
                      <FormItem><FormLabel>Website / Social URL</FormLabel><FormControl><Input placeholder="Optional" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>What are you looking to achieve?</FormLabel><FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full h-14 text-lg bg-[#0E0D0B] text-white group" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
