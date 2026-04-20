import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/framework", label: "Framework" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

const MORE_LINKS = [
  { href: "/creators", label: "Creators" },
  { href: "/freelancers", label: "Freelancers" },
  { href: "/resources", label: "Resources" },
  { href: "/authority-audit", label: "Audit" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Detect if the current page has a dark hero */
  const isDarkHero = location === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const lightText = isDarkHero && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-16 transition-all duration-400 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="z-[60]">
          <span className={`text-base font-bold tracking-tight transition-colors duration-300 ${lightText ? "text-white" : "text-[#0A0A0A]"}`}>
            GrowitBuddy
          </span>
        </Link>

        {/* Desktop nav — centered text links, no background */}
        <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {[...NAV_LINKS, ...MORE_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? lightText ? "text-white" : "text-[#0A0A0A]"
                  : lightText ? "text-white/55 hover:text-white" : "text-black/45 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA — circular arrow, bou.co style */}
        <div className="hidden lg:flex items-center gap-5 z-[60]">
          <Link href="/contact">
            <button
              data-testid="button-book-call-nav"
              className={`flex items-center gap-2.5 text-sm font-medium transition-all duration-200 group ${
                lightText ? "text-white/80 hover:text-white" : "text-black/60 hover:text-black"
              }`}
            >
              Book a call
              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                lightText ? "bg-white text-black" : "bg-[#0A0A0A] text-white"
              }`}>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden z-[60] transition-colors ${lightText ? "text-white" : "text-black"}`}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-between px-8 pt-24 pb-12"
          >
            <nav className="flex flex-col gap-6">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS, ...MORE_LINKS].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-4xl font-semibold tracking-tight transition-colors ${
                    location === link.href ? "text-white" : "text-white/30 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact">
              <button className="flex items-center gap-3 text-white/80 text-lg font-medium group">
                Book a call
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-black" />
                </span>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
