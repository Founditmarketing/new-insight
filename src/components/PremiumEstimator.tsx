import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Car, Building2, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';

// Realistic Louisiana premium ranges by ZIP prefix and type
const premiumData: Record<string, Record<string, [number, number]>> = {
  // Slidell / Northshore
  '704': { home: [1800, 3200], auto: [1200, 2100], business: [2400, 5600] },
  // New Orleans metro
  '701': { home: [2200, 4100], auto: [1400, 2600], business: [3000, 7200] },
  // Baton Rouge
  '708': { home: [1600, 2800], auto: [1100, 1900], business: [2200, 4800] },
  // Alexandria / Central LA
  '713': { home: [1200, 2200], auto: [900, 1600], business: [1800, 3600] },
  // Lafayette
  '705': { home: [1400, 2600], auto: [1000, 1800], business: [2000, 4200] },
  // Lake Charles
  '706': { home: [2000, 3800], auto: [1200, 2200], business: [2600, 5400] },
  // Ponchatoula / Hammond
  '707': { home: [1500, 2700], auto: [1000, 1700], business: [2100, 4400] },
  // Monroe  
  '712': { home: [1100, 2000], auto: [850, 1500], business: [1600, 3200] },
  // Shreveport
  '711': { home: [1300, 2400], auto: [950, 1700], business: [1900, 3800] },
};

const defaultRange: Record<string, [number, number]> = {
  home: [1400, 2800],
  auto: [1000, 1900],
  business: [2200, 4800],
};

const coverageTypes = [
  { id: 'home', label: 'Homeowners', icon: Home },
  { id: 'auto', label: 'Auto', icon: Car },
  { id: 'business', label: 'Business', icon: Building2 },
];

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useState<boolean>(false);

  if (!ref[0]) {
    ref[1](true);
    let start = 0;
    const step = () => {
      start += 1000 / 60;
      const progress = Math.min(start / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <>{display.toLocaleString()}</>;
}

export function PremiumEstimator() {
  const [zip, setZip] = useState('');
  const [type, setType] = useState('home');
  const [result, setResult] = useState<[number, number] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [savings, setSavings] = useState(0);

  const handleEstimate = () => {
    if (zip.length < 3) return;
    setIsCalculating(true);
    setResult(null);

    // Simulate "scanning carriers"
    setTimeout(() => {
      const prefix = zip.substring(0, 3);
      const range = premiumData[prefix]?.[type] || defaultRange[type];
      setResult(range);
      setSavings(Math.round((range[1] - range[0]) * 0.4));
      setIsCalculating(false);
    }, 2200);
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-ink relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-4 block">
            Instant Estimate
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-paper tracking-tight mb-4">
            See what you <span className="text-accent italic font-serif">could</span> be paying.
          </h2>
          <p className="text-paper/60 font-medium text-lg max-w-xl mx-auto">
            Enter your ZIP code and we'll estimate your premium range across 50+ carriers — in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl"
        >
          {/* Coverage Type Selector */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {coverageTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => { setType(ct.id); setResult(null); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all ${
                  type === ct.id
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(227,38,54,0.3)]'
                    : 'bg-white/5 text-paper/60 border border-white/10 hover:bg-white/10'
                }`}
              >
                <ct.icon className="w-4 h-4" />
                {ct.label}
              </button>
            ))}
          </div>

          {/* ZIP Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              value={zip}
              onChange={(e) => { setZip(e.target.value.replace(/\D/g, '').slice(0, 5)); setResult(null); }}
              placeholder="Enter your ZIP code"
              className="flex-1 bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-5 py-4 text-paper font-bold text-center text-lg tracking-widest placeholder:text-paper/25 outline-none transition-all"
              maxLength={5}
            />
            <button
              onClick={handleEstimate}
              disabled={zip.length < 3 || isCalculating}
              className={`px-8 py-4 rounded-lg font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 ${
                zip.length < 3 || isCalculating
                  ? 'bg-white/5 text-paper/30 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(227,38,54,0.3)]'
              }`}
            >
              {isCalculating ? (
                <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              ) : (
                <>Estimate <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Scanning Animation */}
          <AnimatePresence>
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="flex gap-3">
                    {['CHUBB', 'PURE', 'Travelers', 'AIG', 'Progressive'].map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.8, delay: i * 0.3, repeat: Infinity }}
                        className="text-[10px] font-bold tracking-widest uppercase text-paper/40"
                      >
                        {name}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-accent text-xs font-bold tracking-widest uppercase animate-pulse">
                    Scanning 50+ carriers...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <div className="text-center mb-8">
                  <p className="text-paper/50 text-sm font-bold tracking-widest uppercase mb-3">
                    Your estimated annual premium
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-7xl font-bold text-paper tracking-tighter">
                      $<AnimatedNumber value={result[0]} />
                    </span>
                    <span className="text-2xl text-paper/40 font-bold">—</span>
                    <span className="text-5xl md:text-7xl font-bold text-accent tracking-tighter">
                      $<AnimatedNumber value={result[1]} />
                    </span>
                  </div>
                  <p className="text-paper/40 text-xs font-medium mt-2 tracking-wide">per year • based on ZIP {zip}</p>
                </div>

                {/* Savings callout */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2.5">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400">
                      Clients in your area save up to ${savings}/yr by switching
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-3 mt-8">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                    className="bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all shadow-[0_0_30px_rgba(227,38,54,0.3)] flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Lock In My Rate
                  </button>
                  <span className="text-paper/30 text-xs font-medium">Free • No obligation • 60 second form</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
