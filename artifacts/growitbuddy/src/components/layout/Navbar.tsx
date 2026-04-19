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

        {/* Logo — black */}
        <Link href="/" className="flex items-center gap-1.5 z-[60]">
          <span className="text-lg font-black tracking-tight text-[#0B0B0B]">
            GrowitBuddy
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/30 mt-0.5" />
        </Link>

        {/* Desktop floating pill nav */}
        <nav
          className={`hidden lg:flex items-center gap-1 px-4 py-2 rounded-full border border-black/8 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/10"
              : "bg-white/75 backdrop-blur-md"
          }`}
        >
          {NAV_SHORT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-[#0B0B0B] text-white"
                  : "text-black/60 hover:text-black hover:bg-black/6"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-black/12 mx-1" />
          {NAV_LINKS.slice(5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "bg-[#0B0B0B] text-white"
                  : "text-black/60 hover:text-black hover:bg-black/6"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right CTA */}
        <div className="hidden lg:flex items-center gap-2 z-[60]">
          <Link href="/contact">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 text-sm font-medium text-black/60 hover:text-black hover:border-black/30 hover:bg-black/4 transition-all duration-200 backdrop-blur-sm">
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5E663] text-black text-sm font-bold hover:bg-[#F5E663]/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,230,99,0.35)]">
              Book a call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-[60] text-black p-2 rounded-full border border-black/12 bg-white/80 backdrop-blur-sm"
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
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col pt-24 px-8 pb-10 border-b border-black/8"
          >
            <nav className="flex flex-col gap-5 flex-1">
              <Link href="/" className={`text-3xl font-black ${location === "/" ? "text-black" : "text-black/50"}`}>
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-3xl font-black ${location === link.href ? "text-black" : "text-black/50 hover:text-black"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact">
              <button className="w-full py-4 rounded-2xl bg-[#F5E663] text-black text-lg font-black mt-6">
                Book a call
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
