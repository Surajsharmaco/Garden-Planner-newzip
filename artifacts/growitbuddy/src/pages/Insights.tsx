import { motion } from "framer-motion";
import { Link } from "wouter";

const posts = [
  {
    title: "Why Content Volume Is Killing Your Authority",
    category: "Strategy",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    desc: "Posting 3x a day on every platform isn't building a brand. It's building noise. Here's what to do instead."
  },
  {
    title: "The Architecture of a 7-Figure Personal Brand",
    category: "Branding",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    desc: "Deconstructing the exact funnel and content hierarchy used by top creators to generate inbound leads."
  },
  {
    title: "LinkedIn Algorithm Changes: What Actually Matters",
    category: "Distribution",
    date: "Sep 15, 2023",
    readTime: "4 min read",
    desc: "Stop trying to hack the feed. Focus on these three core signals that LinkedIn actually rewards."
  },
  {
    title: "From Founder to Category Leader: A Playbook",
    category: "Positioning",
    date: "Aug 30, 2023",
    readTime: "12 min read",
    desc: "How B2B SaaS founders can leverage their unique insights to own their niche."
  }
];

export default function Insights() {
  return (
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Insights.</h1>
          <p className="text-xl text-white/45">
            Thoughts, frameworks, and strategies on building unignorable authority in a noisy world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="bg-white/6 aspect-[16/9] rounded-2xl mb-6 overflow-hidden">
                <div className="w-full h-full bg-white/10 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{post.category}</span>
                <span className="text-white/35 text-sm">{post.date}</span>
                <span className="text-white/35 text-sm">• {post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-white/45 line-clamp-2">{post.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
