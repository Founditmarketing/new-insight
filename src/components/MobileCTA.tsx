import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export function MobileCTA() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show when scrolling up or at top, hide when scrolling down
      if (currentY < 100) {
        setVisible(true);
      } else if (currentY < lastScrollY) {
        setVisible(true); // scrolling up
      } else {
        setVisible(false); // scrolling down
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ink/95 backdrop-blur-md border-t border-white/10 safe-area-bottom transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-stretch">
        <a 
          href="tel:3185618000"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-paper font-bold text-sm tracking-widest uppercase hover:bg-accent transition-colors border-r border-white/10"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <button 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-quote'));
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-paper font-bold text-sm tracking-widest uppercase hover:bg-accent/80 transition-colors"
        >
          Compare Rates
        </button>
      </div>
    </div>
  );
}
