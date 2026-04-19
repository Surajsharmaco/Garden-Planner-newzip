import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  linkedinUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  socialUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  niche: z.string().min(2, "Required"),
  followers: z.coerce.number().min(0, "Must be positive"),
  postingFrequency: z.string().min(1, "Required"),
  goal: z.string().min(1, "Required")
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthorityAudit() {
  const [result, setResult] = useState<{score: number, strengths: string[], weaknesses: string[]} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", email: "", linkedinUrl: "", socialUrl: "",
      niche: "", followers: 0, postingFrequency: "", goal: ""
    }
  });

  const calculateScore = (data: FormValues) => {
    setIsCalculating(true);
    setTimeout(() => {
      let baseScore = 30;
      if (data.followers > 10000) baseScore += 20;
      else if (data.followers > 1000) baseScore += 10;
      if (data.postingFrequency === "daily") baseScore += 20;
      else if (data.postingFrequency === "weekly") baseScore += 10;
      else if (data.postingFrequency === "rarely") baseScore -= 10;
      if (data.linkedinUrl && data.socialUrl) baseScore += 15;
      const finalScore = Math.min(Math.max(baseScore, 10), 98);

      const strengths = ["Clear niche definition"];
      if (data.followers > 5000) strengths.push("Existing audience base");
      if (data.postingFrequency === "daily") strengths.push("Strong content consistency");

      const weaknesses = [];
      if (data.followers < 1000) weaknesses.push("Low audience scale");
      if (data.postingFrequency === "rarely" || data.postingFrequency === "monthly") weaknesses.push("Inconsistent publishing");
      if (!data.linkedinUrl || !data.socialUrl) weaknesses.push("Single-platform dependency");
      if (weaknesses.length === 0) weaknesses.push("Requires cross-channel syndication strategy");

      setResult({ score: finalScore, strengths, weaknesses });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="w-full pt-10 pb-24 bg-[#F8F5EF]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {!result ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#0E0D0B]">Authority Audit.</h1>
              <p className="text-xl text-[#6B6760] max-w-2xl mx-auto">
                Discover your true market influence. Answer 8 questions to get your Authority Score and a breakdown of your current leverage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#EDE9DF] border border-[#0E0D0B]/8 shadow-sm rounded-3xl p-8 md:p-12"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateScore)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="linkedinUrl" render={({ field }) => (
                      <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="Optional" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="socialUrl" render={({ field }) => (
                      <FormItem><FormLabel>Primary Social URL (X, IG, YT)</FormLabel><FormControl><Input placeholder="Optional" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="niche" render={({ field }) => (
                      <FormItem><FormLabel>Your Niche / Industry</FormLabel><FormControl><Input placeholder="e.g. Fintech" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="followers" render={({ field }) => (
                      <FormItem><FormLabel>Total Followers (approx)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="postingFrequency" render={({ field }) => (
                      <FormItem>
                        <FormLabel>How often do you publish?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="rarely">Rarely</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="goal" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="leads">Inbound Leads</SelectItem>
                            <SelectItem value="brand">Brand Awareness</SelectItem>
                            <SelectItem value="monetization">Direct Monetization</SelectItem>
                            <SelectItem value="network">Network Building</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 text-lg bg-[#0E0D0B] text-white" disabled={isCalculating}>
                    {isCalculating ? "Calculating Score..." : "Calculate My Authority Score"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#EDE9DF] border border-[#0E0D0B]/8 shadow-sm rounded-3xl p-8 md:p-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-12 text-[#0E0D0B]">Your Authority Profile</h2>

            <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center rounded-full border-[16px] border-[#0E0D0B]/8 shadow-inner">
              <div
                className="absolute inset-[-16px] rounded-full border-[16px] border-[#0B0B0B] border-l-transparent border-b-transparent -rotate-45"
                style={{ transform: `rotate(${result.score * 3.6 - 135}deg)`, transition: "transform 1s ease-out" }}
              />
              <div className="text-center">
                <span className="text-6xl font-black text-[#0E0D0B]">{result.score}</span>
                <span className="text-[#8A8680] block text-lg font-medium">/ 100</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
              <div className="bg-green-50 p-6 rounded-2xl">
                <h4 className="font-bold text-green-800 mb-4 text-xl">Strengths</h4>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-green-700">
                      <div className="w-2 h-2 rounded-full bg-green-500" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl">
                <h4 className="font-bold text-red-800 mb-4 text-xl">Bottlenecks</h4>
                <ul className="space-y-3">
                  {result.weaknesses.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-red-700">
                      <div className="w-2 h-2 rounded-full bg-red-500" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#0E0D0B] text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to level up?</h3>
              <p className="text-white/40 mb-8 max-w-lg mx-auto">Your score indicates you have the baseline expertise, but lack the distribution engine. Let's fix that.</p>
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0E0D0B] text-black font-bold text-lg
                                   hover:shadow-[0_0_24px_rgba(245,230,99,0.4)] transition-all duration-300">
                  Get Full Authority Strategy
                </button>
              </Link>
            </div>

            <button onClick={() => setResult(null)} className="mt-8 text-[#706C64] hover:text-black font-medium underline underline-offset-4">
              Retake Audit
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
