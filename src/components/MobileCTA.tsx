import { Phone } from 'lucide-react';

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ink/95 backdrop-blur-md border-t border-white/10 safe-area-bottom">
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
            // Dispatch a custom event the App can listen for
            window.dispatchEvent(new CustomEvent('open-quote'));
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-paper font-bold text-sm tracking-widest uppercase hover:bg-accent/80 transition-colors"
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
}
