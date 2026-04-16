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
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(5, "Please enter a valid phone number."),
  country: z.string().min(2, "Country is required."),
  city: z.string().min(2, "City is required."),
  instagramLink: z.string().url().optional().or(z.literal("")),
  youtubeLink: z.string().url().optional().or(z.literal("")),
  linkedinLink: z.string().url().optional().or(z.literal("")),
  followerCount: z.string().min(1, "Please select an option."),
  primaryNiche: z.string().min(2, "Primary niche is required."),
  secondaryNiche: z.string().optional(),
  audienceLocation: z.string().min(2, "Audience location is required."),
  contentType: z.string().min(1, "Please select an option."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Creators() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", country: "", city: "",
      instagramLink: "", youtubeLink: "", linkedinLink: "",
      followerCount: "", primaryNiche: "", secondaryNiche: "",
      audienceLocation: "", contentType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Application Received!",
      description: "We'll be in touch soon if there's a mutual fit.",
    });
    form.reset();
  };

  return (
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-accent/20 text-foreground font-semibold text-sm rounded-full tracking-wide">
            Creator Network
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Join the Ecosystem.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We partner with high-potential creators to build unignorable authority and multi-channel distribution. Tell us about yourself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 md:p-12"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold border-b pb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="jane@example.com" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="United States" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold border-b pb-2">Social Profiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="instagramLink" render={({ field }) => (
                    <FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="youtubeLink" render={({ field }) => (
                    <FormItem><FormLabel>YouTube URL</FormLabel><FormControl><Input placeholder="https://youtube.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="linkedinLink" render={({ field }) => (
                    <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold border-b pb-2">Content Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="primaryNiche" render={({ field }) => (
                    <FormItem><FormLabel>Primary Niche</FormLabel><FormControl><Input placeholder="e.g. B2B SaaS, Fitness" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="secondaryNiche" render={({ field }) => (
                    <FormItem><FormLabel>Secondary Niche (Optional)</FormLabel><FormControl><Input placeholder="..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  
                  <FormField control={form.control} name="followerCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Follower Count</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="under-10k">&lt; 10,000</SelectItem>
                          <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                          <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                          <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                          <SelectItem value="over-500k">500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="contentType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="video-short">Short-form Video</SelectItem>
                          <SelectItem value="video-long">Long-form Video</SelectItem>
                          <SelectItem value="written">Written / Text</SelectItem>
                          <SelectItem value="audio">Audio / Podcast</SelectItem>
                          <SelectItem value="visual">Visual / Design</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="audienceLocation" render={({ field }) => (
                  <FormItem><FormLabel>Primary Audience Location</FormLabel><FormControl><Input placeholder="e.g. US, Europe, Global" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
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
