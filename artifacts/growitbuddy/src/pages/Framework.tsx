import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-accent/20 text-foreground font-semibold text-sm rounded-full tracking-wide">
            Our Methodology
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">The Authority Framework.</h1>
          <p className="text-xl text-gray-600">
            A battle-tested, 4-step systematic approach to engineering category dominance and building a compounding personal brand.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>

          <div className="flex flex-col gap-20 md:gap-32">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center relative ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Number circle in the middle */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white border-4 border-accent rounded-full items-center justify-center text-2xl font-black z-10">
                  {step.num}
                </div>

                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="text-6xl font-black text-gray-100 mb-4 md:hidden">{step.num}</div>
                  <h3 className="text-3xl font-bold mb-2">{step.title}</h3>
                  <p className="text-accent font-semibold text-lg mb-4">{step.subtitle}</p>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-8 rounded-3xl">
                  <p className="text-gray-700 text-lg leading-relaxed">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <Link href="/contact">
            <Button size="lg" className="h-16 px-10 text-xl bg-foreground text-background hover:bg-foreground/90 group">
              Implement The Framework
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
