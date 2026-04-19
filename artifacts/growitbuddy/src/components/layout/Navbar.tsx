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

const NAV_SHORT = NAV_LINKS.slice(0, 5);

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
        <Link href="/" className="flex items-center gap-1.5 z-[60]">
          <span className="text-lg font-black tracking-tight text-white">
            Growit<span className="text-accent">Buddy</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5" />
        </Link>

        {/* Desktop floating pill nav */}
        <nav
          className={`hidden lg:flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 transition-all duration-300 ${
            scrolled
              ? "bg-white/6 backdrop-blur-xl shadow-lg shadow-black/30"
              : "bg-white/4 backdrop-blur-md"
          }`}
        >
          {NAV_SHORT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-accent text-black"
                  : "text-white/70 hover:text-white hover:bg-white/8"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-white/15 mx-1" />
          {NAV_LINKS.slice(5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-accent text-black"
                  : "text-white/70 hover:text-white hover:bg-white/8"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right CTA */}
        <div className="hidden lg:flex items-center gap-2 z-[60]">
          <Link href="/contact">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-sm font-medium text-white/80 hover:text-white hover:border-white/30 hover:bg-white/6 transition-all duration-200 backdrop-blur-sm">
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-black text-sm font-bold hover:bg-accent/85 transition-all duration-200 shadow-lg shadow-accent/20">
              Book a call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-[60] text-white p-2 rounded-full border border-white/15 backdrop-blur-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile fullscreen nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D]/97 backdrop-blur-xl flex flex-col pt-24 px-8 pb-10"
          >
            <nav className="flex flex-col gap-5 flex-1">
              <Link href="/" className={`text-3xl font-black ${location === "/" ? "text-accent" : "text-white/80"}`}>
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-3xl font-black ${location === link.href ? "text-accent" : "text-white/80 hover:text-white"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact">
              <button className="w-full py-4 rounded-2xl bg-accent text-black text-lg font-black mt-6">
                Book a call
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
