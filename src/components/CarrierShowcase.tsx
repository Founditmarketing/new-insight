import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle2, Umbrella } from 'lucide-react';

const carriers = [
  { name: 'CHUBB', style: 'font-sans font-black text-xl tracking-tighter', color: '#000' },
  { name: 'PURE', style: 'font-serif font-light text-xl tracking-[0.25em]', color: '#000' },
  { name: 'Cincinnati', style: 'font-serif italic font-bold text-lg', color: '#003B71' },
  { name: 'TRAVELERS', style: 'font-sans font-black text-sm tracking-wide', color: '#000' },
  { name: 'AIG', style: 'font-sans font-bold text-xl', color: '#00A4E4' },
  { name: 'PROGRESSIVE', style: 'font-sans font-bold italic text-sm tracking-tighter', color: '#008CC1' },
  { name: 'Safeco', style: 'font-sans font-bold text-lg', color: '#1B365D' },
  { name: 'Hartford', style: 'font-serif font-bold text-lg', color: '#8B0000' },
  { name: 'Nationwide', style: 'font-sans font-bold text-sm tracking-wide', color: '#004B87' },
  { name: 'Liberty', style: 'font-sans font-bold text-lg', color: '#003366' },
  { name: 'Hanover', style: 'font-serif font-bold text-sm tracking-wider', color: '#1A1A1A' },
  { name: 'Berkshire', style: 'font-sans font-bold text-sm tracking-wide', color: '#2C2C2C' },
];

export function CarrierShowcase() {
  const [isScanning, setIsScanning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [matchedCount, setMatchedCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger animation when section scrolls into view
  useEffect(() => {
    if (!sectionRef.current || hasTriggered) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startScan();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  const startScan = () => {
    setIsScanning(true);
    setMatchedCount(0);
    setActiveIndex(0);

    // Sequentially scan through carriers
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= carriers.length) {
        clearInterval(interval);
        setActiveIndex(-1);
        setIsScanning(false);
        setMatchedCount(carriers.length);
      } else {
        setActiveIndex(i);
      }
    }, 200);
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-paper border-t border-slate/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-4 block">
            The Independent Advantage
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
              We scan <span className="text-accent italic font-serif">every</span> option.
            </h2>
            <p className="text-lg text-ink/60 font-medium leading-relaxed">
              While a captive agent can only offer one company's products, we compare rates and 
              coverage across {carriers.length}+ top-rated carriers — finding you the perfect match 
              in minutes.
            </p>
          </div>
        </motion.div>

        {/* Carrier Grid with scanning animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {carriers.map((carrier, i) => {
            const isActive = i === activeIndex;
            const isMatched = !isScanning && matchedCount > 0;

            return (
              <motion.div
                key={carrier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative flex items-center justify-center p-6 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'border-accent/50 bg-accent/5 shadow-[0_0_20px_rgba(227,38,54,0.15)] scale-105'
                    : isMatched
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-slate/10 bg-white hover:border-slate/20'
                }`}
              >
                {/* Scanning indicator */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border-2 border-accent rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Matched checkmark */}
                <AnimatePresence>
                  {isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05, type: 'spring', bounce: 0.5 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className={`${carrier.style} select-none`} style={{ color: carrier.color }}>
                  {carrier.name === 'TRAVELERS' ? (
                    <span className="flex items-center gap-1.5">
                      <Umbrella className="w-4 h-4 text-[#E2231A] fill-current" />
                      {carrier.name}
                    </span>
                  ) : carrier.name === 'AIG' ? (
                    <span className="bg-[#00A4E4] px-2 py-0.5 text-white rounded-sm text-sm font-bold">{carrier.name}</span>
                  ) : carrier.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <Search className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase text-accent animate-pulse">
                  Scanning carrier {activeIndex + 1} of {carriers.length}...
                </span>
              </motion.div>
            ) : matchedCount > 0 ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-bold tracking-widest uppercase text-ink/60">
                    {matchedCount} carriers scanned • Best rates found
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                  className="bg-ink text-paper px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-accent transition-all duration-300 inline-flex items-center gap-3"
                >
                  See My Options →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-ink/30 text-sm font-bold tracking-widest uppercase"
              >
                We compare {carriers.length}+ carriers for every client
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
