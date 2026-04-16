import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/framework", label: "Framework" },
  { href: "/insights", label: "Insights" },
  { href: "/creators", label: "Creators" },
  { href: "/freelancers", label: "Freelancers" },
  { href: "/resources", label: "Resources" },
  { href: "/authority-audit", label: "Audit" },
  { href: "/about", label: "About" },
];

const mobileNavVariants = {
  hidden: { opacity: 0, x: "-100%" },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", bounce: 0, duration: 0.4 }
  },
  exit: { 
    opacity: 0, 
    x: "-100%",
    transition: { type: "spring", bounce: 0, duration: 0.4 }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.05 + 0.2, duration: 0.3 }
  })
};

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className={`text-2xl font-bold tracking-tight z-[60] flex items-center gap-2 ${isOpen ? 'text-white' : ''}`}>
          GrowitBuddy<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location === link.href ? "text-accent" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link href="/contact">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium group">
              Book Strategy Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden z-[60] ${isOpen ? 'text-white' : 'text-foreground'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileNavVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/95 z-50 flex flex-col pt-28 px-8 pb-8 overflow-y-auto backdrop-blur-sm"
            >
              <nav className="flex flex-col gap-6 flex-1">
                <motion.div custom={0} variants={linkVariants} initial="hidden" animate="visible">
                  <Link
                    href="/"
                    className={`text-2xl font-bold flex items-center gap-3 ${location === "/" ? "text-accent" : "text-white"}`}
                  >
                    Home
                    {location === "/" && <span className="w-2 h-2 rounded-full bg-accent" />}
                  </Link>
                </motion.div>
                
                {NAV_LINKS.map((link, idx) => (
                  <motion.div key={link.href} custom={idx + 1} variants={linkVariants} initial="hidden" animate="visible">
                    <Link
                      href={link.href}
                      className={`text-2xl font-bold flex items-center gap-3 ${location === link.href ? "text-accent" : "text-gray-300 hover:text-white transition-colors"}`}
                    >
                      {link.label}
                      {location === link.href && <span className="w-2 h-2 rounded-full bg-accent" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div 
                custom={NAV_LINKS.length + 1} 
                variants={linkVariants} 
                initial="hidden" 
                animate="visible"
                className="mt-8 pt-8 border-t border-gray-800"
              >
                <Link href="/contact">
                  <Button className="w-full text-lg py-7 bg-accent text-foreground hover:bg-accent/90 font-bold">
                    Book Strategy Call
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
