import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/framework", label: "Framework" },
  { href: "/creators", label: "Influencer Network" },
  {
    label: "Hiring",
    dropdown: [
      { href: "/freelancers", label: "Talent Network" },
      { href: "/full-time", label: "Full Time" },
    ],
  },
  { href: "/authority-audit", label: "Authority Audit" },
  { href: "/insights", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);
  const hiringRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsOpen(false); setHiringOpen(false); }, [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hiringRef.current && !hiringRef.current.contains(e.target as Node)) {
        setHiringOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          height: 64,
          background: scrolled ? "rgba(247,247,245,0.94)" : "rgba(247,247,245,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(11,11,11,0.08)" : "1px solid transparent",
        }}
      >
        <div
          className="h-full w-full max-w-[1400px] mx-auto px-5 md:px-8"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 cursor-pointer group flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo-circle.png`}
                alt="GrowitBuddy"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                }}
                className="group-hover:scale-110"
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0B0B0B",
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
              border: "1.5px solid rgba(11,11,11,0.1)",
              borderRadius: 40,
              padding: "5px 6px",
              gap: 2,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                const isActive = link.dropdown.some(d => location === d.href);
                return (
                  <div key={link.label} ref={hiringRef} style={{ position: "relative" }}>
                    <button
                      onClick={() => setHiringOpen(!hiringOpen)}
                      className="text-[13px] font-medium cursor-pointer transition-all duration-150 rounded-full px-3.5 py-1.5 inline-flex items-center gap-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: isActive ? "#fff" : "rgba(11,11,11,0.5)",
                        background: isActive ? "#0B0B0B" : "transparent",
                        fontWeight: isActive ? 600 : 500,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3" style={{ transition: "transform 0.15s", transform: hiringOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>
                    <AnimatePresence>
                      {hiringOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#fff",
                            border: "1.5px solid rgba(11,11,11,0.1)",
                            borderRadius: 14,
                            padding: "6px",
                            minWidth: 140,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                            zIndex: 100,
                          }}
                        >
                          {link.dropdown.map((item) => (
                            <Link key={item.href} href={item.href}>
                              <span
                                style={{
                                  display: "block",
                                  padding: "9px 14px",
                                  borderRadius: 9,
                                  fontSize: 13,
                                  fontWeight: location === item.href ? 700 : 500,
                                  color: location === item.href ? "#fff" : "#0B0B0B",
                                  background: location === item.href ? "#0B0B0B" : "transparent",
                                  fontFamily: "'Inter', sans-serif",
                                  cursor: "pointer",
                                  transition: "background 0.12s",
                                }}
                                className="hover:bg-black/5"
                              >
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href!}>
                  <span
                    className="text-[13px] font-medium cursor-pointer transition-all duration-150 rounded-full px-3.5 py-1.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: location === link.href ? "#fff" : "rgba(11,11,11,0.5)",
                      background: location === link.href ? "#0B0B0B" : "transparent",
                      fontWeight: location === link.href ? 600 : 500,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer transition-all hover:bg-black/5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#0B0B0B",
                  border: "1.5px solid rgba(11,11,11,0.2)",
                }}
                data-testid="button-get-in-touch"
              >
                Get In Touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link href="/contact">
              <span
                className="gb-btn text-[13px] px-5 py-2"
                style={{ borderRadius: 100 }}
                data-testid="button-book-call-nav"
              >
                Book a Call
              </span>
            </Link>
          </div>

          <button
            className="lg:hidden p-1"
            style={{ color: "#0B0B0B" }}
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
              background: "#F7F7F5",
              borderBottom: "1px solid rgba(11,11,11,0.1)",
              padding: "24px 20px 32px",
            }}
          >
            <nav className="flex flex-col gap-4">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(11,11,11,0.3)", marginBottom: 8 }}>
                        {link.label}
                      </p>
                      {link.dropdown.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: location === item.href ? "#0B0B0B" : "rgba(11,11,11,0.45)", cursor: "pointer", display: "block", letterSpacing: "-0.02em", paddingLeft: 8, marginBottom: 4 }}>
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link key={link.href} href={link.href!}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: location === link.href ? "#0B0B0B" : "rgba(11,11,11,0.45)", cursor: "pointer", display: "block", letterSpacing: "-0.02em" }}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <Link href="/contact">
                <span
                  className="gb-btn justify-center mt-2"
                  style={{ width: "100%", borderRadius: 12, padding: "14px 0", fontSize: 15 }}
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
