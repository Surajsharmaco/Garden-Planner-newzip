import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { TiltCard } from "@/components/TiltCard";

const steps = [
  {
    num: "01",
    title: "Positioning & Strategy",
    subtitle: "Find your category entry point.",
    content: "Before creating a single piece of content, we define exactly what you stand for. We map your expertise against market gaps to find a category you can own, establishing a narrative that makes competition irrelevant."
  },
  {
    num: "02",
    title: "Content Systems",
    subtitle: "Turn expertise into assets.",
    content: "We extract your knowledge and systematize the production of high-signal content. From written thought leadership to short-form video and long-form essays, we build an engine that produces quality at scale without draining your time."
  },
  {
    num: "03",
    title: "Strategic Distribution",
    subtitle: "Syndicate for impact.",
    content: "Great content dies without distribution. We map out the exact channels where your audience lives and deploy platform-native strategies to ensure your narrative reaches the decision-makers that matter."
  },
  {
    num: "04",
    title: "Authority Compounding",
    subtitle: "Build the inbound machine.",
    content: "We transform initial traction into a compounding asset. By analyzing data, optimizing conversion paths, and building community flywheels, we turn your audience into a perpetual engine for inbound opportunity."
  }
];

export default function Framework() {
  return (
    <div className="w-full pt-20 md:pt-24 pb-16 md:pb-24 lg:pb-32 px-5 md:px-8 bg-[#F8F5EF]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-black/[0.05] text-[#58544C] font-semibold text-sm rounded-full tracking-wide">
            Our Methodology
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#0E0D0B]">The Authority Framework.</h1>
          <p className="text-lg md:text-xl text-[#6B6760]">
            A battle-tested, 4-step systematic approach to engineering category dominance and building a compounding personal brand.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-black/8 -translate-x-1/2 hidden md:block"></div>

          <div className="flex flex-col gap-12 md:gap-32">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row gap-6 md:gap-16 items-center relative ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#F8F5EF] border-4 border-[#0E0D0B]/15 rounded-full items-center justify-center text-2xl font-black z-10 text-[#0E0D0B]">
                  {step.num}
                </div>

                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="text-5xl font-black text-black/10 mb-4 md:hidden">{step.num}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#0E0D0B]">{step.title}</h3>
                  <p className="text-[#6B6760] font-semibold text-base md:text-lg mb-4">{step.subtitle}</p>
                </div>

                <div className="w-full md:w-1/2">
                  <TiltCard>
                    <div className="bg-[#EDE9DF] border border-[#0E0D0B]/8 p-6 md:p-8 rounded-3xl h-full">
                      <p className="text-[#58544C] text-base md:text-lg leading-relaxed">{step.content}</p>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32 text-center">
          <Link href="/contact">
            <button className="inline-flex items-center gap-3 h-16 px-10 text-xl rounded-full bg-[#0E0D0B] text-white font-bold
                               hover:bg-black/85 transition-all duration-200 group">
              Implement The Framework
              <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
