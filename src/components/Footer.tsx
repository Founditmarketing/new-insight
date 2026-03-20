import { ArrowUpRight } from 'lucide-react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone text-ink pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-slate/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* Brand & Mission */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 group cursor-none mb-2">
            <div className="flex gap-1.5 items-baseline">
              {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
                <span key={i} className="font-serif text-2xl tracking-widest text-ink block group-hover:text-accent transition-colors duration-300 transform group-hover:-translate-y-0.5" style={{ transitionDelay: `${i * 30}ms` }}>{letter}</span>
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-accent/80 ml-2">Insurance</span>
          </div>
          <p className="text-ink/70 text-sm font-medium leading-relaxed max-w-sm">
            Architecting protection for Louisiana's most significant private assets and commercial enterprises.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold tracking-wide uppercase text-accent">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-ink/70">
            <li className="flex items-start gap-3 hover:text-ink transition-colors">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <span>123 Security Blvd, Suite 400<br/>Alexandria, LA 71301</span>
            </li>
            <li className="flex items-center gap-3 hover:text-ink transition-colors">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span>(318) 555-0123</span>
            </li>
            <li className="flex items-center gap-3 hover:text-ink transition-colors">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <span>secure@insighthelps.com</span>
            </li>
            <li className="flex items-center gap-3 hover:text-ink transition-colors">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold tracking-wide uppercase text-accent">Excellence</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-ink/70">
            {['Private Client Group', 'Commercial Risk', 'Claims Concierge', 'About Our Firm', 'Strategic Partners'].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-accent transition-colors relative inline-block group">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold tracking-wide uppercase text-accent">Compliance</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-ink/70">
            {['Privacy Policy', 'Terms of Service', 'Licensing Information', 'Accessibility'].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-accent transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate uppercase tracking-widest relative z-10">
        <p>© {new Date().getFullYear()} Insight Insurance. All rights reserved.</p>
        <p>A licensed Louisiana brokerage.</p>
      </div>
    </footer>
  );
}
