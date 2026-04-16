import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight inline-block mb-6">
              GrowitBuddy<span className="text-accent">.</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              A premium content and distribution studio helping founders and creators build authority that compounds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors" data-testid="link-twitter">
                <span className="font-bold text-sm">X</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors" data-testid="link-linkedin">
                <span className="font-bold text-sm">IN</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors" data-testid="link-instagram">
                <span className="font-bold text-sm">IG</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/work" className="text-gray-400 hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/framework" className="text-gray-400 hover:text-white transition-colors">Framework</Link></li>
              <li><Link href="/insights" className="text-gray-400 hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">Network</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/creators" className="text-gray-400 hover:text-white transition-colors">Creators</Link></li>
              <li><Link href="/freelancers" className="text-gray-400 hover:text-white transition-colors">Freelancers</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/authority-audit" className="text-gray-400 hover:text-white transition-colors">Authority Audit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="mailto:hello@growitbuddy.com" className="text-gray-400 hover:text-white transition-colors">hello@growitbuddy.com</a></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Get in touch</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} GrowitBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
