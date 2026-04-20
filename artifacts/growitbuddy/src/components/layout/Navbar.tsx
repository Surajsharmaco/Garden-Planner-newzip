import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 pt-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-[60]">
          <span className="text-lg font-black tracking-tight text-[#0A0A0A]">GrowitBuddy</span>
          <span className="w-1 h-1 rounded-full bg-[#0A0A0A]/30 mt-0.5" />
        </Link>

        {/* Desktop pill nav */}
        <nav className={`hidden lg:flex items-center gap-0.5 px-3 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.07] border-black/[0.08]"
            : "bg-white/70 backdrop-blur-md border-black/[0.07]"
        }`}>
          {NAV_LINKS.slice(0, 5).map((link) => (
            <Link key={link.href} href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-[#0A0A0A] text-white"
                  : "text-black/50 hover:text-black hover:bg-black/5"
              }`}>
              {link.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-black/10 mx-1.5" />
          {NAV_LINKS.slice(5).map((link) => (
            <Link key={link.href} href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-[#0A0A0A] text-white"
                  : "text-black/50 hover:text-black hover:bg-black/5"
              }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2 z-[60]">
          <Link href="/contact">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/12 text-sm font-medium text-black/50 hover:text-black hover:border-black/20 hover:bg-black/4 transition-all duration-200">
              Get In Touch <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link href="/contact">
            <button
              data-testid="button-book-call-nav"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A0A0A] text-white text-sm font-bold hover:bg-black/80 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              Book a call <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-[60] text-[#0A0A0A] p-2 rounded-full border border-black/10 bg-white/80 backdrop-blur-sm"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col pt-24 px-8 pb-10"
          >
            <nav className="flex flex-col gap-5 flex-1">
              <Link href="/" className={`text-3xl font-black ${location === "/" ? "text-black" : "text-black/30"}`}>Home</Link>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`text-3xl font-black ${location === link.href ? "text-black" : "text-black/30 hover:text-black"}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact">
              <button className="w-full py-4 rounded-2xl bg-[#0A0A0A] text-white text-lg font-black mt-6">Book a call</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
