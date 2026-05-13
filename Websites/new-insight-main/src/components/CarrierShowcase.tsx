import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Umbrella, RotateCcw } from 'lucide-react';

const carriers = [
  { name: 'PROGRESSIVE', style: 'font-sans font-bold italic text-xs md:text-sm tracking-tight', color: '#008CC1' },
  { name: 'Safeco', style: 'font-sans font-bold text-base md:text-lg', color: '#1B365D' },
  { name: 'Hartford', style: 'font-serif font-bold text-base md:text-lg', color: '#8B0000' },
  { name: 'Liberty', style: 'font-sans font-bold text-base md:text-lg', color: '#003366' },
  { name: 'Berkshire', style: 'font-sans font-bold text-xs md:text-sm tracking-wide' },
  { name: 'Foremost', style: 'font-sans font-bold text-sm md:text-base', color: '#006699' },
  { name: 'Kemper', style: 'font-sans font-black text-sm md:text-base tracking-tight', color: '#CC0000' },
  { name: 'SageSure', style: 'font-sans font-bold text-xs md:text-sm tracking-wide', color: '#2D6A4F' },
  { name: 'Openly', style: 'font-sans font-bold text-sm md:text-base', color: '#1A1A2E' },
  { name: 'AmTrust', style: 'font-sans font-bold text-xs md:text-sm tracking-wider', color: '#003B6F' },
  { name: 'Bristol West', style: 'font-serif font-bold text-xs md:text-sm', color: '#2C5F8A' },
  { name: 'Lighthouse', style: 'font-sans font-bold text-xs md:text-sm tracking-wide', color: '#E8830A' },
  { name: 'Citizens', style: 'font-sans font-bold text-sm md:text-base', color: '#00609C' },
  { name: 'USAA', style: 'font-sans font-black text-sm md:text-base tracking-wide', color: '#003F72' },
];

export function CarrierShowcase() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scannedSet, setScannedSet] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const startScan = useCallback(() => {
    setPhase('scanning');
    setActiveIndex(-1);
    setScannedSet(new Set());

    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      setScannedSet(prev => new Set([...prev, i]));
      i++;
      if (i >= carriers.length) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveIndex(-1);
          setPhase('done');
        }, 300);
      }
    }, 180);
  }, []);

  // Auto-trigger on scroll into view
  useEffect(() => {
    if (!sectionRef.current || phase !== 'idle') return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startScan(); },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [phase, startScan]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-paper border-t border-slate/[0.06]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-4 block">
            The Independent Advantage
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1]">
              We scan <span className="text-accent italic font-serif">every</span> option.
            </h2>
            <p className="text-base md:text-lg text-ink/50 font-medium leading-relaxed">
              A captive agent offers one company's products. We compare rates across
              {' '}<span className="text-ink font-bold">{carriers.length}+ top-rated carriers</span> — finding 
              you the perfect match in minutes.
            </p>
          </div>
        </motion.div>

        {/* Carrier Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
          {carriers.map((carrier, i) => {
            const isActive = i === activeIndex;
            const isScanned = scannedSet.has(i);
            const isDone = phase === 'done';

            return (
              <motion.div
                key={carrier.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className={`relative flex items-center justify-center aspect-[3/2] rounded-xl border transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-accent/5 shadow-[0_0_25px_rgba(227,38,54,0.12)] scale-[1.04]'
                    : isDone
                    ? 'border-emerald-500/15 bg-emerald-500/[0.03]'
                    : isScanned
                    ? 'border-slate/10 bg-white'
                    : 'border-slate/[0.06] bg-white/80'
                }`}
              >
                {/* Scan pulse */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border-2 border-accent/40 rounded-xl"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}

                {/* Matched check */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute -top-1.5 -right-1.5 z-10"
                    >
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carrier name */}
                <div className="flex items-center gap-1.5 select-none px-2">
                  {carrier.hasIcon && <Umbrella className="w-3.5 h-3.5 text-[#E2231A] fill-current flex-shrink-0" />}
                  {carrier.badge ? (
                    <span className="bg-[#00A4E4] px-2 py-0.5 text-white rounded text-xs font-bold">{carrier.name}</span>
                  ) : (
                    <span className={`${carrier.style} ${isDone ? 'text-ink/80' : 'text-ink/40'} transition-colors duration-500`} style={carrier.color ? { color: isDone ? carrier.color : undefined } : undefined}>
                      {carrier.name}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status / CTA */}
        <div className="text-center min-h-[80px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 'scanning' ? (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                {/* Progress bar */}
                <div className="w-48 h-1 bg-slate/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    animate={{ width: `${((activeIndex + 1) / carriers.length) * 100}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-ink/30">
                  Scanning {activeIndex + 1} of {carriers.length}
                </span>
              </motion.div>
            ) : phase === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-5"
              >
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    {carriers.length} carriers compared · Best rates identified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                    className="bg-ink text-paper px-8 py-3.5 rounded-sm font-bold tracking-widest uppercase text-xs hover:bg-accent transition-all duration-300 inline-flex items-center gap-2"
                  >
                    See My Options →
                  </button>
                  <button
                    onClick={() => { setPhase('idle'); setTimeout(startScan, 100); }}
                    className="p-3 rounded-full bg-slate/5 text-ink/30 hover:text-accent hover:bg-accent/5 transition-all"
                    aria-label="Re-scan carriers"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-ink/20 text-xs font-bold tracking-widest uppercase"
              >
                Scroll down to see the comparison
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
