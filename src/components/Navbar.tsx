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
          <div className="flex gap-1.5 items-baseline">
            {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
              <span key={i} className={`font-serif text-2xl tracking-widest block group-hover:text-accent transition-colors duration-300 transform group-hover:-translate-y-0.5 ${showSolid ? 'text-ink' : 'text-paper'}`} style={{ transitionDelay: `${i * 30}ms` }}>{letter}</span>
            ))}
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-semibold ml-2 transition-colors duration-300 ${showSolid ? 'text-accent/80' : 'text-accent'}`}>Insurance</span>
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
            onClick={onOpenQuote}
            className={`ml-4 px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all duration-300 shadow-institutional flex items-center justify-center ${
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

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-stone z-40 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col pt-24 px-8`}
      >
        <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-ink">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className={`hover:text-accent transition-colors border-b border-slate/10 pb-4 ${
                location.pathname === item.href ? 'text-accent' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenQuote?.();
            }}
            className="mt-8 bg-accent text-paper px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm flex items-center justify-center hover:bg-ink transition-colors w-full"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  );
}
