import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

export function Navbar({ onOpenQuote, onOpenPortal }: { onOpenQuote?: () => void, onOpenPortal?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Body scroll lock — always release on cleanup
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsMobileMenuOpen(false); setIsMoreOpen(false); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const mainNavLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ];

  const moreLinks = [
    { name: 'Make a Payment', href: '/payments' },
    { name: 'File a Claim', href: '/file-a-claim' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ];

  const allMobileLinks = [...mainNavLinks, ...moreLinks];
  const showSolid = isScrolled || !isHome;

  // Mobile menu rendered via portal directly into document.body
  // This avoids ALL stacking context issues from parent elements
  const mobileMenu = isMobileMenuOpen ? createPortal(
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 99998, backgroundColor: 'rgba(0,0,0,0.85)' }}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      {/* Menu panel */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#050505',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 32px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', touchAction: 'manipulation',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, padding: '0 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {allMobileLinks.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: location.pathname === item.href ? '#E32636' : 'white',
                display: 'block',
                touchAction: 'manipulation',
              }}
            >
              {item.name}
            </Link>
          ))}

          {/* Phone */}
          <a
            href="tel:3185618000"
            style={{
              marginTop: 32, display: 'flex', alignItems: 'center', gap: 12,
              fontSize: '1.125rem', fontWeight: 700,
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              touchAction: 'manipulation',
            }}
          >
            <Phone size={18} />
            (318) 561-8000
          </a>

          {/* Client Login */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); onOpenPortal?.(); }}
            style={{
              marginTop: 32, padding: '16px 32px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', borderRadius: 2,
              fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              width: '100%', touchAction: 'manipulation',
            }}
          >
            Client Login / Pay Bill
          </button>

          {/* Get a Quote CTA */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); onOpenQuote?.(); }}
            style={{
              marginTop: 12, padding: '20px 32px',
              background: '#E32636', border: 'none', borderRadius: 2,
              fontWeight: 700, fontSize: '14px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'white', cursor: 'pointer',
              width: '100%', touchAction: 'manipulation',
              boxShadow: '0 0 30px rgba(227,38,54,0.3)',
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Bottom branding */}
        <div style={{ padding: '24px 32px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Insight Insurance · Louisiana · Est. 2016
          </p>
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[55] transition-all duration-500 ${
          showSolid
            ? 'bg-stone/95 backdrop-blur-md border-b border-slate/10 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex gap-0.5 items-baseline">
              {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
                <span
                  key={i}
                  className={`font-serif text-2xl tracking-[0.15em] block group-hover:text-accent transition-colors duration-300 transform group-hover:-translate-y-0.5 ${showSolid ? 'text-ink' : 'text-paper'}`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <span className={`text-[11px] uppercase tracking-[0.2em] font-bold ml-2 transition-colors duration-300 ${showSolid ? 'text-accent/80' : 'text-accent'}`}>
              Insurance
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavLinks.map((item) => (
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
                }`} />
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                className={`text-sm font-semibold transition-colors uppercase tracking-wide relative flex items-center gap-1 ${
                  showSolid ? 'text-ink/80 hover:text-accent' : 'text-paper/90 hover:text-accent'
                }`}
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMoreOpen && (
                <div className="absolute top-full right-0 mt-3 bg-stone/98 backdrop-blur-xl border border-slate/15 rounded-xl shadow-xl py-2 min-w-[180px] z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block px-5 py-3 text-sm font-semibold hover:text-accent hover:bg-slate/5 transition-colors ${
                        location.pathname === link.href ? 'text-accent' : 'text-ink/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenPortal}
              className={`ml-2 px-5 py-3 rounded-sm font-bold tracking-widest uppercase text-xs transition-all duration-300 border flex items-center justify-center gap-2 ${
                showSolid
                  ? 'border-ink/20 text-ink/70 hover:text-accent hover:border-accent'
                  : 'border-paper/20 text-paper/70 hover:text-accent hover:border-accent'
              }`}
            >
              Client Login
            </button>
            <button
              onClick={onOpenQuote}
              className={`ml-2 px-8 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all duration-300 shadow-institutional flex items-center justify-center ${
                showSolid
                  ? 'bg-accent text-paper hover:bg-ink'
                  : 'bg-paper text-ink hover:bg-accent hover:text-paper shadow-[0_0_20px_rgba(255,255,255,0.1)]'
              }`}
            >
              Get a Quote
            </button>
          </div>

          {/* Hamburger — always on top, touch-action for iOS */}
          <button
            className={`md:hidden p-2 transition-colors ${showSolid ? 'text-ink hover:text-accent' : 'text-paper hover:text-accent'}`}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu portal — renders at document.body, no stacking context issues */}
      {mobileMenu}
    </>
  );
}
