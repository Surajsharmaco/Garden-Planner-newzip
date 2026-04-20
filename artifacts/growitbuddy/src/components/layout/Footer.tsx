import { Link } from "wouter";

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, #0A0A0A, #141414)",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
      className="pt-20 pb-10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-black text-white tracking-tight">GrowitBuddy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </Link>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-7">
              A premium content and distribution studio helping founders and creators build authority that compounds.
            </p>
            <div className="flex gap-3">
              {["X", "IN", "IG"].map((label, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 transition-all text-xs font-bold"
                  data-testid={["link-twitter","link-linkedin","link-instagram"][i]}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Company", links: [{ href: "/work", label: "Work" }, { href: "/services", label: "Services" }, { href: "/framework", label: "Framework" }, { href: "/insights", label: "Insights" }] },
            { title: "Network", links: [{ href: "/creators", label: "Creators" }, { href: "/freelancers", label: "Freelancers" }, { href: "/resources", label: "Resources" }, { href: "/authority-audit", label: "Authority Audit" }] },
            { title: "Contact", links: [{ href: "/about", label: "About Us" }, { href: "/contact", label: "Get in touch" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white/25 font-semibold text-xs tracking-widest uppercase mb-6">{col.title}</h4>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/35 hover:text-white text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/18">
          <p>&copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
