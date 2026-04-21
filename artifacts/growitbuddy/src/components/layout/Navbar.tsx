import { Link, useLocation } from "wouter";
import { ArrowUpRight, MessageCircle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  vivafoxdigital.com navbar:
  - Dark/transparent background
  - Logo — LEFT
  - Pill container with nav links — CENTER
  - "Get In Touch ↗" + "Book a call" — RIGHT
*/

const NAV_LINKS = [
  { href: "/work", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Client success" },
  { href: "/insights", label: "About us" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 64,
          background: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="h-full w-full max-w-[1400px] mx-auto px-5 md:px-8"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* LEFT — Logo */}
          <Link href="/">
            <span className="inline-flex items-center gap-2 cursor-pointer group flex-shrink-0">
              <span
                style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                G
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                GrowitBuddy
              </span>
            </span>
          </Link>

          {/* CENTER — Pill nav container (desktop) — exact vivafox style */}
          <nav
            className="hidden lg:flex items-center"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 40,
              padding: "6px 8px",
              gap: 2,
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-[13px] font-medium cursor-pointer transition-colors duration-150 rounded-full px-4 py-1.5"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: location === link.href ? "#fff" : "rgba(255,255,255,0.55)",
                    background: location === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            {/* WhatsApp / contact icon — vivafox has this */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              style={{ width: 32, height: 32 }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: "rgba(255,255,255,0.55)" }} />
            </a>
          </nav>

          {/* RIGHT — CTA Buttons (desktop) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* "Get In Touch ↗" */}
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium cursor-pointer transition-all hover:bg-white/10"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
                data-testid="button-get-in-touch"
              >
                Get In Touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            {/* "Book a call" — dark filled */}
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold cursor-pointer transition-all"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#fff",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                data-testid="button-book-call-nav"
              >
                Book a call
              </span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-1"
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
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 40,
              background: "#0A0A0A",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "24px 20px",
            }}
          >
            <nav className="flex flex-col gap-5">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: location === link.href ? "#fff" : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span
                  className="inline-flex items-center justify-center rounded-full py-3 text-[15px] font-semibold cursor-pointer mt-2"
                  style={{
                    background: "linear-gradient(135deg, #FF9A3C 0%, #FF5500 100%)",
                    color: "#fff",
                    width: "100%",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Book a call
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
