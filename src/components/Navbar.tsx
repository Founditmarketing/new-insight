import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar({ onOpenQuote, onOpenPortal }: { onOpenQuote?: () => void, onOpenPortal?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ];

  // On non-home pages, always show scrolled (solid) style
  const showSolid = isScrolled || !isHome;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        showSolid 
          ? 'bg-stone/95 backdrop-blur-md border-b border-slate/10 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex gap-0.5 items-baseline">
            {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
              <span key={i} className={`font-serif text-2xl tracking-[0.15em] block group-hover:text-accent transition-colors duration-300 transform group-hover:-translate-y-0.5 ${showSolid ? 'text-ink' : 'text-paper'}`} style={{ transitionDelay: `${i * 30}ms` }}>{letter}</span>
            ))}
          </div>
          <span className={`text-[11px] uppercase tracking-[0.2em] font-bold ml-2 transition-colors duration-300 ${showSolid ? 'text-accent/80' : 'text-accent'}`}>Insurance</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className={`text-sm font-semibold transition-colors uppercase tracking-wide relative group ${
                location.pathname === item.href ? 'text-accent' : showSolid ? 'text-ink/80 hover:text-accent' : 'text-paper/90 hover:text-accent'
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
                location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <button 
            onClick={onOpenPortal}
            className={`ml-2 px-5 py-3 rounded-sm font-bold tracking-widest uppercase text-xs transition-all duration-300 border flex items-center justify-center gap-2 ${
            showSolid 
              ? 'border-ink/20 text-ink/70 hover:text-accent hover:border-accent' 
              : 'border-paper/20 text-paper/70 hover:text-accent hover:border-accent'
          }`}>
            Client Login
          </button>
          <button 
            onClick={onOpenQuote}
            className={`ml-2 px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all duration-300 shadow-institutional flex items-center justify-center ${
            showSolid 
              ? 'bg-accent text-paper hover:bg-ink' 
              : 'bg-paper text-ink hover:bg-accent hover:text-paper shadow-[0_0_20px_rgba(255,255,255,0.1)]'
          }`}>
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors hover:text-accent ${showSolid ? 'text-ink' : 'text-paper'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu — conditional render for touch reliability */}
      {isMobileMenuOpen && (
        <>
          {/* Layer 1: Full-screen backdrop scrim */}
          <div 
            className="fixed inset-0 z-[9998] bg-black/90 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Layer 2: Menu panel */}
          <div 
            className="fixed inset-0 z-[9999] md:hidden"
        style={{ 
          backgroundColor: '#050505',
          /* Triple-redundant background for GPU compositing edge cases */
          background: '#050505',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full" style={{ backgroundColor: '#050505' }}>
          {/* Close button header */}
          <div className="flex items-center justify-between px-8 pt-6 pb-8">
            <span className="text-sm font-bold text-white/30 uppercase tracking-widest">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1 px-8 flex-grow">
            {navLinks.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`text-3xl font-bold tracking-tight py-4 border-b border-white/10 transition-colors ${
                  location.pathname === item.href ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Phone link */}
            <a 
              href="tel:3185618000" 
              className="text-lg font-bold text-white/60 hover:text-accent transition-colors mt-8 flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (318) 561-8000
            </a>

            {/* Client Login */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPortal?.();
              }}
              className="mt-8 border border-white/20 text-white/70 px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-xs flex items-center justify-center hover:border-accent hover:text-accent transition-colors w-full"
            >
              Client Login / Pay Bill
            </button>

            {/* CTA Button */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote?.();
              }}
              className="mt-3 bg-accent text-white px-8 py-5 rounded-sm font-bold tracking-widest uppercase text-sm flex items-center justify-center hover:bg-white hover:text-ink transition-colors w-full shadow-[0_0_30px_rgba(227,38,54,0.3)]"
            >
              Compare Rates
            </button>
          </div>

          {/* Bottom branding */}
          <div className="px-8 py-6 text-center">
            <p className="text-white/20 text-xs font-bold tracking-widest uppercase">Insight Insurance · Louisiana</p>
          </div>
        </div>
      </div>
        </>
      )}
    </nav>
  );
}
