import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#EDE9DF] border-t border-[#0E0D0B]/8 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-black text-[#0E0D0B] tracking-tight">
                GrowitBuddy
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B07D2A]/50" />
            </Link>
            <p className="text-[#706C64] text-sm leading-relaxed max-w-xs mb-7">
              A premium content and distribution studio helping founders and creators build authority that compounds.
            </p>
            <div className="flex gap-3">
              {["X", "IN", "IG"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#0E0D0B]/12 flex items-center justify-center text-[#9C9890] hover:text-[#0E0D0B] hover:border-[#0E0D0B]/25 transition-all text-xs font-bold"
                  data-testid={["link-twitter","link-linkedin","link-instagram"][i]}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#9C9890] font-semibold text-xs tracking-widest uppercase mb-6">Company</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/framework", label: "Framework" },
                { href: "/insights", label: "Insights" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#706C64] hover:text-[#0E0D0B] text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#9C9890] font-semibold text-xs tracking-widest uppercase mb-6">Network</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "/creators", label: "Creators" },
                { href: "/freelancers", label: "Freelancers" },
                { href: "/resources", label: "Resources" },
                { href: "/authority-audit", label: "Authority Audit" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#706C64] hover:text-[#0E0D0B] text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#9C9890] font-semibold text-xs tracking-widest uppercase mb-6">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { href: "mailto:hello@growitbuddy.com", label: "hello@growitbuddy.com", external: true },
                { href: "/about", label: "About Us", external: false },
                { href: "/contact", label: "Get in touch", external: false },
              ].map((l) => (
                <li key={l.href}>
                  {l.external
                    ? <a href={l.href} className="text-[#706C64] hover:text-[#0E0D0B] text-sm transition-colors">{l.label}</a>
                    : <Link href={l.href} className="text-[#706C64] hover:text-[#0E0D0B] text-sm transition-colors">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#0E0D0B]/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#ACA8A0]">
          <p>&copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#706C64] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#706C64] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
