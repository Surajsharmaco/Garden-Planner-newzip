import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/framework", label: "Framework" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-300"
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-black" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              GrowitBuddy
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium transition-colors duration-150"
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  color: location === link.href ? "#000" : "rgba(0,0,0,0.5)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Book a call — blue pill */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <button
                data-testid="button-book-call-nav"
                className="omc-btn text-[13px]"
              >
                Book a call
                <span className="omc-arrow" style={{ width: 20, height: 20, borderColor: "rgba(255,255,255,0.6)" }}>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white border-b border-black/10 py-6 px-6 shadow-lg"
          >
            <nav className="flex flex-col gap-5">
              {[...NAV_LINKS, { href: "/contact", label: "Book a call" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[17px] font-medium"
                  style={{ color: location === link.href ? "#0072F5" : "#000" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
