import { useState } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    title: "Content Strategy Template",
    desc: "The exact Notion template we use to map out 90 days of authority-building content for our clients.",
    type: "Notion Template"
  },
  {
    title: "Script Framework",
    desc: "Our proven 5-part script structure that keeps viewers watching until the end and drives inbound clicks.",
    type: "PDF Guide"
  },
  {
    title: "Distribution Playbook",
    desc: "How to take one piece of core content and syndicate it across 5 platforms without looking like a bot.",
    type: "Playbook"
  },
  {
    title: "Creator Growth Guide",
    desc: "The 0 to 10k follower roadmap for LinkedIn and Twitter specifically designed for B2B founders.",
    type: "PDF Guide"
  },
  {
    title: "Personal Brand Checklist",
    desc: "A 24-point checklist to audit your profiles and ensure they are optimized for conversion.",
    type: "Checklist"
  },
  {
    title: "Authority Positioning Guide",
    desc: "How to define your niche and find a category entry point that makes competition irrelevant.",
    type: "PDF Guide"
  }
];

export default function Resources() {
  const { toast } = useToast();
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    
    if (selectedResource) {
      setDownloaded(prev => ({ ...prev, [selectedResource]: true }));
      toast({ title: "Sent to your inbox!", description: "Check your email for the download link." });
      setSelectedResource(null);
      setEmail("");
    }
  };

  return (
    <div className="w-full pt-20 md:pt-24 pb-16 md:pb-24 lg:pb-32 px-5 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">Resource Library.</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Open-sourced frameworks, templates, and guides from our internal agency playbook.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {resources.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                {item.type}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 text-base mb-8 flex-1">{item.desc}</p>
              
              {downloaded[item.title] ? (
                <Button variant="outline" className="w-full h-12 text-green-700 bg-green-50 border-green-200 cursor-default">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Sent to Email
                </Button>
              ) : (
                <Button 
                  onClick={() => setSelectedResource(item.title)}
                  className="w-full h-12 bg-foreground text-white hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" /> Get Access
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <DialogContent className="sm:max-w-md p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl mb-2">Get the {selectedResource}</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Enter your email below and we'll send it straight to your inbox.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDownload} className="mt-6 space-y-4">
            <div>
              <Input 
                type="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base bg-accent text-foreground hover:bg-accent/90" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send it to me"}
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4">
              We respect your inbox. No spam, ever.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
