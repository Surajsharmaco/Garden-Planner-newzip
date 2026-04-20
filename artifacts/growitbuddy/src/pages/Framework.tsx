import { motion } from "framer-motion";

export default function Framework() {
  const labels: Record<string, { sub: string; h1: string; body: string }> = {
    Insights: { sub: "Insights", h1: "Thoughts on building authority.", body: "Frameworks, strategies and opinions on building unignorable influence in a noisy world." },
    Framework: { sub: "Framework", h1: "The Authority Framework.", body: "A battle-tested 4-step system for engineering category dominance that compounds over time." },
    Creators: { sub: "Creators", h1: "Built for creators.", body: "Systems designed specifically for content creators turning their platform into a compounding business asset." },
    Freelancers: { sub: "Freelancers", h1: "Join our network.", body: "We work with talented freelance writers, editors, and strategists from around the world." },
    Resources: { sub: "Resources", h1: "Open-source frameworks.", body: "Free templates, guides and playbooks from our internal agency toolkit." },
    AuthorityAudit: { sub: "Audit", h1: "Authority Audit.", body: "Answer 8 questions and get your Authority Score with a breakdown of your current leverage." },
  };
  const l = labels["Framework"];
  return (
    <div className="w-full bg-white">
      <section className="relative pt-40 pb-24 px-8 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-black/[0.03] blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black/25 text-xs font-bold tracking-[0.22em] uppercase mb-6">{l.sub}</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] leading-[1.08] text-[#0A0A0A] mb-8"
          >
            {l.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-black/45 text-lg leading-[1.85] max-w-[48ch] mx-auto">{l.body}</motion.p>
        </div>
      </section>
      <section className="pb-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F4F4F4] rounded-3xl h-[400px] flex items-center justify-center">
            <span className="text-black/20 text-sm">Content coming soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
