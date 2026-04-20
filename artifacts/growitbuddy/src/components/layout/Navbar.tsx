import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/framework", label: "Framework" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/creators", label: "Creators" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDarkHero = location === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const darkMode = isDarkHero && !scrolled;

  return (
    <>
      {/* Apple-style nav — 44px tall, frosted glass */}
      <header
        style={{
          background: darkMode
            ? "rgba(0,0,0,0.8)"
            : "rgba(255,255,255,0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 h-[44px] flex items-center transition-all duration-300"
      >
        <div className="w-full max-w-[980px] mx-auto px-5 flex items-center justify-between">
          {/* Logo — Apple uses their logo as a minimal icon */}
          <Link href="/" className="flex items-center z-10">
            <span
              className="text-[17px] font-semibold tracking-[-0.022em] transition-colors duration-200"
              style={{ color: darkMode ? "rgba(255,255,255,0.85)" : "#1D1D1F" }}
            >
              GB
            </span>
          </Link>

          {/* Centered nav links — Apple style, very small */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-normal tracking-[-0.01em] transition-colors duration-150"
                style={{
                  color: darkMode
                    ? location === link.href ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"
                    : location === link.href ? "#1D1D1F" : "#6E6E73",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Book a call (Apple uses bag icon) */}
          <div className="hidden lg:flex items-center gap-5 z-10">
            <Link href="/contact">
              <span
                className="text-[12px] font-normal tracking-[-0.01em] transition-colors duration-150 cursor-pointer hover:opacity-75"
                style={{ color: darkMode ? "rgba(255,255,255,0.85)" : "#1D1D1F" }}
                data-testid="button-book-call-nav"
              >
                Book a call
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden z-10"
            style={{ color: darkMode ? "rgba(255,255,255,0.85)" : "#1D1D1F" }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col px-6 pt-16 pb-10"
            style={{
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "saturate(180%) blur(20px)",
            }}
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/contact", label: "Book a call" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-4 text-[19px] font-normal"
                  style={{ color: location === link.href ? "#fff" : "rgba(255,255,255,0.5)" }}
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
