import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/10">
          {/* Brand col */}
          <div>
            <p className="text-[22px] font-semibold mb-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>GrowitBuddy</p>
            <p className="text-[13px] leading-[1.75] mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              A premium content and distribution studio helping founders build authority that compounds.
            </p>
            <Link href="/contact">
              <button className="omc-btn text-[13px]">
                Get in touch
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </Link>
          </div>

          {[
            { title: "Services", links: [["Work", "/work"], ["Services", "/services"], ["Framework", "/framework"], ["Insights", "/insights"]] },
            { title: "Company", links: [["About", "/about"], ["Creators", "/creators"], ["Freelancers", "/freelancers"], ["Resources", "/resources"]] },
            { title: "Connect", links: [["Book a call", "/contact"], ["Twitter / X", "#"], ["LinkedIn", "#"], ["Instagram", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>{col.title}</h5>
              <ul className="flex flex-col gap-3">
                {col.links.map(([l, h]) => (
                  <li key={l}>
                    <Link href={h} className="text-[13px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            &copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[["Privacy", "#"], ["Terms", "#"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-[12px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.25)" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
