import { Link } from "wouter";

/* Apple-style footer — light grey, very minimal, small text */
export function Footer() {
  return (
    <footer style={{ background: "#F5F5F7", borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      <div className="max-w-[980px] mx-auto px-5 py-10">

        {/* Top row — columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-black/10 mb-8">
          {[
            {
              title: "GrowitBuddy",
              links: [["Work", "/work"], ["Services", "/services"], ["Framework", "/framework"], ["Insights", "/insights"]]
            },
            {
              title: "Creators",
              links: [["For Creators", "/creators"], ["For Freelancers", "/freelancers"], ["Resources", "/resources"], ["Authority Audit", "/authority-audit"]]
            },
            {
              title: "Company",
              links: [["About", "/about"], ["Contact", "/contact"], ["Book a Call", "/contact"]]
            },
            {
              title: "Follow",
              links: [["Twitter / X", "#"], ["LinkedIn", "#"], ["Instagram", "#"], ["YouTube", "#"]]
            }
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-[12px] font-semibold mb-4" style={{ color: "#1D1D1F" }}>{col.title}</h5>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-[12px] hover:underline" style={{ color: "#6E6E73" }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-3">
          <p className="text-[12px]" style={{ color: "#6E6E73" }}>
            Copyright &copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[["Privacy Policy", "#"], ["Terms of Use", "#"], ["Contact", "/contact"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-[12px] hover:underline" style={{ color: "#6E6E73" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
