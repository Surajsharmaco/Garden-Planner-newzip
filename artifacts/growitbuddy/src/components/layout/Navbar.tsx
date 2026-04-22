import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/framework", label: "Framework" },
  { href: "/creators", label: "Creators" },
  { href: "/freelancers", label: "Freelancers" },
  { href: "/authority-audit", label: "Authority Audit" },
  { href: "/insights", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          height: 64,
          background: scrolled ? "rgba(11,11,11,0.97)" : "rgba(11,11,11,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div
          className="h-full w-full max-w-[1400px] mx-auto px-5 md:px-8"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 cursor-pointer group flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo-light.png`}
                alt="GrowitBuddy"
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "contain",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                  mixBlendMode: "screen",
                }}
                className="group-hover:scale-110"
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                GrowitBuddy
              </span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center"
            style={{
              border: "1.5px solid rgba(255,255,255,0.12)",
              borderRadius: 40,
              padding: "5px 6px",
              gap: 2,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-[13px] font-medium cursor-pointer transition-all duration-150 rounded-full px-3.5 py-1.5"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: location === link.href ? "#0B0B0B" : "rgba(255,255,255,0.5)",
                    background: location === link.href ? "#fff" : "transparent",
                    fontWeight: location === link.href ? 600 : 500,
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                }}
                data-testid="button-get-in-touch"
              >
                Get In Touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold cursor-pointer transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: "#fff",
                  color: "#0B0B0B",
                }}
                data-testid="button-book-call-nav"
              >
                Book a Call
              </span>
            </Link>
          </div>

          <button
            className="lg:hidden p-1"
            style={{ color: "#fff" }}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 40,
              background: "#0B0B0B",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "24px 20px 32px",
            }}
          >
            <nav className="flex flex-col gap-4">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: location === link.href ? "#fff" : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      display: "block",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span
                  className="inline-flex items-center justify-center mt-2"
                  style={{ width: "100%", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, background: "#fff", color: "#0B0B0B", fontFamily: "'Inter', sans-serif", cursor: "pointer" }}
                >
                  Book a Call
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
