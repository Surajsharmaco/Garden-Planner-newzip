import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-8 md:px-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-16 pb-16 border-b border-white/8">
          <div className="max-w-xs">
            <span className="text-white text-xl font-bold tracking-tight block mb-4">GrowitBuddy</span>
            <p className="text-white/35 text-sm leading-relaxed">
              A premium content and distribution studio helping founders build authority that compounds.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h5 className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Company</h5>
              <ul className="flex flex-col gap-3">
                {[["Work","/work"],["Services","/services"],["Framework","/framework"],["Insights","/insights"]].map(([l,h]) => (
                  <li key={h}><Link href={h} className="text-white/40 hover:text-white text-sm transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">More</h5>
              <ul className="flex flex-col gap-3">
                {[["Creators","/creators"],["Freelancers","/freelancers"],["Resources","/resources"],["Audit","/authority-audit"],["About","/about"]].map(([l,h]) => (
                  <li key={h}><Link href={h} className="text-white/40 hover:text-white text-sm transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Contact</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="mailto:hello@growitbuddy.com" className="text-white/40 hover:text-white text-sm transition-colors">hello@growitbuddy.com</a></li>
                <li>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group">
                    Get in touch
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </li>
              </ul>
              <div className="flex gap-3 mt-6">
                {["X","IN","IG"].map((s,i) => (
                  <a key={i} href="#" className="text-white/25 hover:text-white text-xs font-bold border border-white/10 rounded-full w-8 h-8 flex items-center justify-center hover:border-white/25 transition-all"
                    data-testid={["link-twitter","link-linkedin","link-instagram"][i]}>{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/18">
          <p>&copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
