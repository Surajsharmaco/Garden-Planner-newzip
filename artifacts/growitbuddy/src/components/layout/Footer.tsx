import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#0B0B0B]/[0.07] pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-black text-[#0B0B0B] tracking-tight">
                Growit<span className="text-[#FFD84D]">Buddy</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D]" />
            </Link>
            <p className="text-[#0B0B0B]/40 text-sm leading-relaxed max-w-xs mb-7">
              A premium content and distribution studio helping founders and creators build authority that compounds.
            </p>
            <div className="flex gap-3">
              {["X", "IN", "IG"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#0B0B0B]/10 flex items-center justify-center text-[#0B0B0B]/35 hover:text-[#0B0B0B] hover:border-[#0B0B0B]/25 hover:bg-[#FFD84D]/15 transition-all text-xs font-bold"
                  data-testid={["link-twitter","link-linkedin","link-instagram"][i]}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#0B0B0B] font-semibold text-sm tracking-widest uppercase mb-6">Company</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/framework", label: "Framework" },
                { href: "/insights", label: "Insights" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#0B0B0B]/40 hover:text-[#0B0B0B] text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#0B0B0B] font-semibold text-sm tracking-widest uppercase mb-6">Network</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "/creators", label: "Creators" },
                { href: "/freelancers", label: "Freelancers" },
                { href: "/resources", label: "Resources" },
                { href: "/authority-audit", label: "Authority Audit" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#0B0B0B]/40 hover:text-[#0B0B0B] text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#0B0B0B] font-semibold text-sm tracking-widest uppercase mb-6">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "mailto:hello@growitbuddy.com", label: "hello@growitbuddy.com", external: true },
                { href: "/about", label: "About Us", external: false },
                { href: "/contact", label: "Get in touch", external: false },
              ].map((l) => (
                <li key={l.href}>
                  {l.external
                    ? <a href={l.href} className="text-[#0B0B0B]/40 hover:text-[#0B0B0B] text-sm transition-colors">{l.label}</a>
                    : <Link href={l.href} className="text-[#0B0B0B]/40 hover:text-[#0B0B0B] text-sm transition-colors">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#0B0B0B]/[0.07] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#0B0B0B]/30">
          <p>&copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0B0B0B]/60 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#0B0B0B]/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
