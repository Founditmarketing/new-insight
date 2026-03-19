import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Footer() {
  return (
    <footer className="bg-paper pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-ink/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-ink">Insight Insurance</h2>
            <p className="text-ink/60 max-w-sm mb-8">
              Premier Asset Protection Partner for Louisiana. Quiet certainty in an unpredictable world.
            </p>
            <MagneticButton className="bg-accent text-paper rounded-full px-8 py-4 font-medium flex items-center gap-2 w-fit hover:bg-ink transition-colors">
              Request a Consultation <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase text-accent mb-6">Offices</h4>
            <ul className="space-y-4 text-ink/80">
              <li>
                <strong>Alexandria</strong><br/>
                <span className="text-ink/60 text-sm">123 Main St, Suite 400<br/>Alexandria, LA 71301</span>
              </li>
              <li>
                <strong>Ponchatoula</strong><br/>
                <span className="text-ink/60 text-sm">456 Pine St<br/>Ponchatoula, LA 70454</span>
              </li>
              <li>
                <strong>Slidell</strong><br/>
                <span className="text-ink/60 text-sm">1352 7th Street<br/>Slidell, LA 70458</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase text-accent mb-6">Connect</h4>
            <ul className="space-y-4 text-ink/80">
              <li><a href="#" className="hover:text-accent transition-colors">Client Portal</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Report a Claim</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ink/10 text-sm text-ink/40">
          <p>&copy; {new Date().getFullYear()} Insight Insurance. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
