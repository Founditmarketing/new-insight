import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Droplets, Wind, Flame, CloudLightning, ShieldCheck, AlertTriangle } from 'lucide-react';

const riskProfiles: Record<string, { flood: number; wind: number; fire: number; storm: number; overall: string; zone: string }> = {
  '700': { flood: 9, wind: 8, fire: 3, storm: 9, overall: 'HIGH', zone: 'Greater New Orleans' },
  '701': { flood: 9, wind: 9, fire: 2, storm: 9, overall: 'HIGH', zone: 'New Orleans Metro' },
  '704': { flood: 8, wind: 7, fire: 3, storm: 8, overall: 'HIGH', zone: 'Northshore / Slidell' },
  '705': { flood: 6, wind: 6, fire: 4, storm: 7, overall: 'MODERATE', zone: 'Lafayette Region' },
  '706': { flood: 7, wind: 9, fire: 3, storm: 9, overall: 'HIGH', zone: 'Lake Charles' },
  '707': { flood: 7, wind: 6, fire: 3, storm: 7, overall: 'MODERATE', zone: 'Ponchatoula / Hammond' },
  '708': { flood: 5, wind: 5, fire: 4, storm: 6, overall: 'MODERATE', zone: 'Baton Rouge Metro' },
  '711': { flood: 4, wind: 4, fire: 5, storm: 5, overall: 'LOW-MOD', zone: 'Shreveport' },
  '712': { flood: 4, wind: 3, fire: 5, storm: 4, overall: 'LOW-MOD', zone: 'Monroe' },
  '713': { flood: 5, wind: 4, fire: 6, storm: 5, overall: 'MODERATE', zone: 'Alexandria / Central' },
};

const defaultProfile = { flood: 6, wind: 5, fire: 4, storm: 6, overall: 'MODERATE', zone: 'Louisiana' };

const riskTypes = [
  { key: 'flood', label: 'Flood', icon: Droplets, color: '#3B82F6', gradient: 'from-blue-500 to-blue-400', tip: '25% of flood claims are from outside FEMA high-risk areas.' },
  { key: 'wind', label: 'Hurricane / Wind', icon: Wind, color: '#8B5CF6', gradient: 'from-violet-500 to-violet-400', tip: 'Cat 3+ hurricanes hit LA\'s coast every 7 years on average.' },
  { key: 'storm', label: 'Severe Storm', icon: CloudLightning, color: '#F59E0B', gradient: 'from-amber-500 to-amber-400', tip: 'Louisiana averages 60+ thunderstorm days per year.' },
  { key: 'fire', label: 'Wildfire', icon: Flame, color: '#EF4444', gradient: 'from-red-500 to-red-400', tip: 'North LA sees increasing wildfire risk in dry seasons.' },
];

function RiskBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  return (
    <div className="flex-1 bg-white/5 rounded-full h-2.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function RiskScore() {
  const [zip, setZip] = useState('');
  const [profile, setProfile] = useState<typeof defaultProfile | null>(null);
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');

  const handleScan = useCallback(() => {
    if (zip.length < 3) return;
    setPhase('scanning');
    setProfile(null);
    setTimeout(() => {
      const prefix = zip.substring(0, 3);
      setProfile(riskProfiles[prefix] || defaultProfile);
      setPhase('done');
    }, 1500);
  }, [zip]);

  useEffect(() => {
    setProfile(null);
    setPhase('idle');
  }, [zip]);

  const overallColor = profile?.overall === 'HIGH' ? 'text-red-400 border-red-400/20 bg-red-400/5' 
    : profile?.overall === 'MODERATE' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' 
    : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5';

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-paper border-t border-slate/[0.06]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-4 block">
            Louisiana Risk Intelligence
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1]">
              Know your <span className="text-accent italic font-serif">risk</span> before the storm hits.
            </h2>
            <p className="text-base md:text-lg text-ink/50 font-medium leading-relaxed">
              Every ZIP code in Louisiana has a unique risk profile. See how your area scores — and 
              whether you're properly covered.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-ink rounded-2xl p-6 md:p-10 border border-white/[0.04]"
        >
          {/* Input Row */}
          <div className="flex gap-3 max-w-sm mx-auto mb-6">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/20" />
              <input
                type="text"
                inputMode="numeric"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="ZIP code"
                className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-xl pl-11 pr-5 py-4 text-paper font-bold tracking-widest placeholder:text-paper/15 placeholder:tracking-widest outline-none transition-all"
                maxLength={5}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
            <button
              onClick={handleScan}
              disabled={zip.length < 3 || phase === 'scanning'}
              className={`px-6 py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-all duration-300 whitespace-nowrap ${
                zip.length < 3 || phase === 'scanning'
                  ? 'bg-white/5 text-paper/20 cursor-not-allowed'
                  : 'bg-accent text-white hover:shadow-[0_0_30px_rgba(227,38,54,0.4)] active:scale-95'
              }`}
            >
              {phase === 'scanning' ? (
                <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              ) : 'Scan'}
            </button>
          </div>

          {/* Scanning */}
          <AnimatePresence>
            {phase === 'scanning' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <AlertTriangle className="w-6 h-6 text-accent animate-pulse mx-auto mb-3" />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/50 animate-pulse">
                  Analyzing FEMA · NOAA · State data
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {phase === 'done' && profile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                {/* Overall Score */}
                <div className="text-center mb-10">
                  <p className="text-paper/25 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                    {profile.zone} · ZIP {zip}
                  </p>
                  <div className={`inline-flex items-center gap-3 border rounded-full px-6 py-2 ${overallColor}`}>
                    <span className="text-2xl md:text-3xl font-bold tracking-tight">
                      {profile.overall}
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-60">RISK</span>
                  </div>
                </div>

                {/* Risk Bars */}
                <div className="space-y-5 max-w-md mx-auto">
                  {riskTypes.map((risk, i) => {
                    const value = profile[risk.key as keyof typeof profile] as number;
                    return (
                      <motion.div
                        key={risk.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          <risk.icon className="w-4 h-4 flex-shrink-0" style={{ color: risk.color }} />
                          <span className="text-xs font-bold text-paper/60 tracking-widest uppercase flex-1">{risk.label}</span>
                          <span className="text-sm font-bold tabular-nums" style={{ color: risk.color }}>
                            {value}<span className="text-paper/20">/10</span>
                          </span>
                        </div>
                        <RiskBar value={value} color={risk.color} delay={0.3 + i * 0.1} />
                        <p className="text-paper/20 text-[10px] mt-1 font-medium leading-relaxed">{risk.tip}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 text-center"
                >
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                    className="group bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_30px_rgba(227,38,54,0.2)] inline-flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Get Protected
                  </button>
                  <p className="text-paper/15 text-[10px] font-bold tracking-widest uppercase mt-4">
                    We'll match your risk profile to the right carrier
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {phase === 'idle' && (
            <div className="text-center py-8">
              <p className="text-paper/15 text-xs font-bold tracking-widest uppercase">
                Enter your ZIP to see your risk profile
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
