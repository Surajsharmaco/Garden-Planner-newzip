import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* omc.com navbar:
   - Fixed, white, ~70px tall
   - Logo mark (circle) + brand name — LEFT
   - Nav links — CENTER  
   - Clean text "Contact" — RIGHT (no blue pill)
   - Thin bottom border only
*/

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/framework", label: "Framework" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: 70, background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div
          className="h-full max-w-[1440px] mx-auto px-8 md:px-12"
          style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}
        >
          {/* LEFT — Logo */}
          <Link href="/">
            <span className="inline-flex items-center gap-2.5 cursor-pointer group">
              {/* Circle mark */}
              <span
                style={{
                  width: 28, height: 28,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(0,0,0,0.2)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#000",
                  flexShrink: 0,
                }}
              >
                G
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
              >
                GrowitBuddy
              </span>
            </span>
          </Link>

          {/* CENTER — Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-[13px] font-medium cursor-pointer transition-colors duration-150 hover:text-black"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    color: location === link.href ? "#000" : "rgba(0,0,0,0.45)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* RIGHT — Contact text link (omc.com style — no blue pill) */}
          <div className="hidden lg:flex items-center justify-end">
            <Link href="/contact">
              <span
                data-testid="button-book-call-nav"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium cursor-pointer hover:opacity-60 transition-opacity group"
                style={{ fontFamily: "'Instrument Sans', sans-serif", color: "#000" }}
              >
                Contact
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full group-hover:scale-110 transition-transform"
                  style={{ border: "1.5px solid rgba(0,0,0,0.3)" }}
                >
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden justify-end">
            <button className="text-black p-1" onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
            className="fixed inset-x-0 z-40 bg-white border-b border-black/8 py-8 px-8 shadow-sm"
            style={{ top: 70 }}
          >
            <nav className="flex flex-col gap-6">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-[18px] font-medium cursor-pointer"
                    style={{ color: location === link.href ? "#000" : "rgba(0,0,0,0.45)", fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
