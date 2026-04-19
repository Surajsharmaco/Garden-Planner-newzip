import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email."),
  phone: z.string().min(5, "Phone is required."),
  country: z.string().min(2, "Country is required."),
  city: z.string().min(2, "City is required."),
  primarySkill: z.string().min(1, "Skill is required."),
  yearsOfExperience: z.string().min(1, "Experience is required."),
  portfolioLink: z.string().url("Must be a valid URL."),
  workSamples: z.string().min(10, "Please provide some context or links."),
  toolsUsed: z.string().min(2, "Please list your tools."),
  expectedRate: z.string().min(2, "Expected rate is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Freelancers() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", country: "", city: "",
      primarySkill: "", yearsOfExperience: "", portfolioLink: "",
      workSamples: "", toolsUsed: "", expectedRate: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Application Received!",
      description: "Our talent team will review your portfolio.",
    });
    form.reset();
  };

  return (
    <div className="w-full pt-20 md:pt-24 pb-16 md:pb-24 lg:pb-32 px-5 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-black/[0.05] text-foreground font-semibold text-sm rounded-full tracking-wide">
            Talent Network
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Join the Roster.</h1>
          <p className="text-lg md:text-xl text-black/45 max-w-2xl mx-auto">
            We are always looking for world-class editors, writers, and designers to partner with on premium client projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#F7F7F7] border border-black/8 shadow-none rounded-3xl p-6 md:p-12"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold border-b pb-2">Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input className="h-12" placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input className="h-12" placeholder="john@example.com" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input className="h-12" placeholder="+1..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input className="h-12" placeholder="UK" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input className="h-12" placeholder="London" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-xl md:text-2xl font-bold border-b pb-2">Professional Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField control={form.control} name="primarySkill" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Skill</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Select skill" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="editor">Video Editor</SelectItem>
                          <SelectItem value="writer">Ghostwriter / Copywriter</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="strategist">Content Strategist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Select duration" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="portfolioLink" render={({ field }) => (
                  <FormItem><FormLabel>Portfolio URL</FormLabel><FormControl><Input className="h-12" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="workSamples" render={({ field }) => (
                  <FormItem><FormLabel>Additional Links / Work Context</FormLabel><FormControl><Textarea className="min-h-[100px] p-4" placeholder="Link to specific videos, articles, or campaigns you are most proud of..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField control={form.control} name="toolsUsed" render={({ field }) => (
                    <FormItem><FormLabel>Tools Used (e.g. Premiere, Figma)</FormLabel><FormControl><Input className="h-12" placeholder="Premiere Pro, After Effects..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="expectedRate" render={({ field }) => (
                    <FormItem><FormLabel>Expected Rate (Hourly/Project)</FormLabel><FormControl><Input className="h-12" placeholder="$50/hr or $500/video" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto h-14 px-10 text-lg bg-foreground text-background" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
