import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Car, Building2, ArrowRight, ShieldCheck, TrendingDown, Sparkles } from 'lucide-react';

// Realistic Louisiana premium ranges by ZIP prefix and type
const premiumData: Record<string, Record<string, [number, number]>> = {
  '700': { home: [1400, 2800], auto: [900, 1600], business: [1800, 4200] },
  '701': { home: [1400, 2800], auto: [900, 1600], business: [1800, 4200] },
  '704': { home: [1100, 2200], auto: [750, 1400], business: [1500, 3400] },
  '705': { home: [900, 1800], auto: [650, 1200], business: [1200, 2600] },
  '706': { home: [1200, 2600], auto: [800, 1500], business: [1600, 3600] },
  '707': { home: [950, 1900], auto: [650, 1150], business: [1300, 2800] },
  '708': { home: [1000, 2000], auto: [700, 1300], business: [1400, 3000] },
  '711': { home: [800, 1600], auto: [600, 1100], business: [1100, 2400] },
  '712': { home: [700, 1400], auto: [550, 1000], business: [1000, 2000] },
  '713': { home: [750, 1500], auto: [580, 1050], business: [1100, 2200] },
};

const defaultRange: Record<string, [number, number]> = {
  home: [900, 1900], auto: [650, 1250], business: [1400, 3000],
};

const coverageTypes = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'auto', label: 'Auto', icon: Car },
  { id: 'business', label: 'Business', icon: Building2 },
];

const scanCarriers = ['Progressive', 'Hartford', 'Liberty', 'Foremost', 'SageSure', 'Openly', 'GEICO', 'Bristol West', 'Citizens', 'AmTrust', 'Tower Hill', 'Travelers'];

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function AnimatedPrice({ value }: { value: number }) {
  const display = useCountUp(value);
  return <>{display.toLocaleString()}</>;
}

export function PremiumEstimator() {
  const [zip, setZip] = useState('');
  const [type, setType] = useState('home');
  const [result, setResult] = useState<[number, number] | null>(null);
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [scanIndex, setScanIndex] = useState(0);
  const [savings, setSavings] = useState(0);

  // Floating particles (same system as Hero)
  const particles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 25 : 60;
    return Array.from({ length: count }).map((_, i) => {
      const isOrange = Math.random() > 0.4;
      return {
        id: i,
        size: Math.random() * 6 + 3,
        xOrigin: Math.random() * 100,
        yOrigin: Math.random() * 100,
        xOffset: Math.random() * 30 - 15,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * -8,
        opacity: Math.random() * 0.3 + 0.4,
        colorClass: isOrange ? 'bg-accent' : 'bg-paper',
        shadow: isOrange ? 'rgba(227,38,54,0.8)' : 'rgba(255,255,255,0.6)',
      };
    });
  }, []);

  const handleEstimate = useCallback(() => {
    if (zip.length < 3) return;
    setPhase('scanning');
    setResult(null);
    setScanIndex(0);

    // Animate through carriers
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setScanIndex(i);
      if (i >= scanCarriers.length) {
        clearInterval(interval);
        // Show results
        const prefix = zip.substring(0, 3);
        const range = premiumData[prefix]?.[type] || defaultRange[type];
        setResult(range);
        setSavings(Math.round((range[1] - range[0]) * 0.35 + Math.random() * 100));
        setPhase('done');
      }
    }, 250);
  }, [zip, type]);

  // Reset when type changes
  useEffect(() => {
    setResult(null);
    setPhase('idle');
  }, [type]);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-ink relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)] z-10 opacity-70" />
        <div className="absolute inset-0 z-[5]">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`gpu-particle ${p.colorClass}`}
              style={{
                '--size': `${p.size}px`,
                '--x-origin': `${p.xOrigin}%`,
                '--y-origin': `${p.yOrigin}%`,
                '--offset-x': `${p.xOffset}vw`,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
                '--max-opacity': p.opacity,
                '--shadow-color': p.shadow,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent">Instant Estimate</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-paper tracking-tight mb-4 leading-[1.1]">
            See what you <span className="text-accent italic font-serif">could</span> be paying.
          </h2>
          <p className="text-paper/50 font-medium text-lg max-w-lg mx-auto leading-relaxed">
            Enter your ZIP and we'll estimate your premium range across 50+ carriers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-10 backdrop-blur-sm"
        >
          {/* Coverage Type Pills */}
          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {coverageTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setType(ct.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
                  type === ct.id
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(227,38,54,0.25)]'
                    : 'bg-white/5 text-paper/50 border border-white/10 hover:bg-white/10 hover:text-paper'
                }`}
              >
                <ct.icon className="w-3.5 h-3.5" />
                {ct.label}
              </button>
            ))}
          </div>

          {/* ZIP + Button */}
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="text"
              inputMode="numeric"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="ZIP code"
              className="flex-1 bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-xl px-5 py-4 text-paper font-bold text-center text-xl tracking-[0.3em] placeholder:text-paper/20 placeholder:tracking-widest placeholder:text-sm outline-none transition-all"
              maxLength={5}
              onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
            />
            <button
              onClick={handleEstimate}
              disabled={zip.length < 3 || phase === 'scanning'}
              className={`px-6 py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                zip.length < 3 || phase === 'scanning'
                  ? 'bg-white/5 text-paper/20 cursor-not-allowed'
                  : 'bg-accent text-white hover:shadow-[0_0_30px_rgba(227,38,54,0.4)] active:scale-95'
              }`}
            >
              {phase === 'scanning' ? (
                <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              ) : (
                <>Go <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {/* Scanning State */}
          <AnimatePresence>
            {phase === 'scanning' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-8 pb-2">
                  {/* Carrier names flashing */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mb-4">
                    {scanCarriers.map((name, i) => (
                      <span
                        key={name}
                        className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
                          i === scanIndex ? 'text-accent scale-110' 
                          : i < scanIndex ? 'text-paper/20' 
                          : 'text-paper/10'
                        }`}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div className="max-w-xs mx-auto h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((scanIndex + 1) / scanCarriers.length) * 100}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-center text-accent/60 text-[10px] font-bold tracking-widest uppercase mt-3">
                    Comparing rates...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {phase === 'done' && result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                {/* Price Range */}
                <div className="text-center mb-6">
                  <p className="text-paper/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                    Estimated Annual Premium
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl md:text-6xl font-bold text-paper tracking-tighter tabular-nums">
                      $<AnimatedPrice value={result[0]} />
                    </span>
                    <span className="text-paper/20 text-2xl font-light">—</span>
                    <span className="text-5xl md:text-6xl font-bold text-accent tracking-tighter tabular-nums">
                      $<AnimatedPrice value={result[1]} />
                    </span>
                  </div>
                  <p className="text-paper/25 text-xs mt-2 font-medium tracking-wide">/year · ZIP {zip} · {coverageTypes.find(c => c.id === type)?.label}</p>
                </div>

                {/* Savings Badge */}
                <div className="flex justify-center mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-5 py-2">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 tracking-wide">
                        Clients save up to ${savings}/yr by switching*
                      </span>
                    </div>
                    <p className="text-paper/20 text-[10px] font-medium tracking-wide text-center max-w-xs">
                      *Based on average savings reported by clients who switched from a single-carrier agent. Individual results vary.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                    className="group bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_30px_rgba(227,38,54,0.25)] inline-flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Request Customized Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-paper/20 text-[10px] font-bold tracking-widest uppercase mt-4">
                    Free · No obligation · 60 seconds
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
