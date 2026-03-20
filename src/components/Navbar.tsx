import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

export function Navbar({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-stone/95 backdrop-blur-md border-b border-slate/10 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group cursor-none">
          <div className="flex gap-1.5 items-baseline">
            {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
              <span key={i} className={`font-serif text-2xl tracking-widest block group-hover:text-accent transition-colors duration-300 transform group-hover:-translate-y-0.5 ${isScrolled ? 'text-ink' : 'text-paper'}`} style={{ transitionDelay: `${i * 30}ms` }}>{letter}</span>
            ))}
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-semibold ml-2 transition-colors duration-300 ${isScrolled ? 'text-accent/80' : 'text-accent'}`}>Insurance</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Expertise', 'Industries', 'About', 'Insights'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-semibold transition-colors uppercase tracking-wide cursor-none relative group ${isScrolled ? 'text-ink/80 hover:text-accent' : 'text-paper/90 hover:text-accent'}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className={`ml-4 px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all duration-300 cursor-none shadow-institutional flex items-center justify-center ${
            isScrolled 
              ? 'bg-ink text-paper hover:bg-accent' 
              : 'bg-paper text-ink hover:bg-accent hover:text-paper shadow-[0_0_20px_rgba(255,255,255,0.1)]'
          }`}>
            Client Portal
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors cursor-none hover:text-accent ${isScrolled ? 'text-ink' : 'text-paper'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-stone z-40 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col pt-24 px-8`}
      >
        <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-ink">
          {['Expertise', 'Industries', 'About', 'Insights'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-accent transition-colors border-b border-slate/10 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-8 bg-ink text-stone px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm flex items-center justify-center hover:bg-accent transition-colors w-full">
            Client Portal
          </button>
        </div>
      </div>
    </nav>
  );
}
