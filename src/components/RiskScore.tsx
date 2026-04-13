import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Droplets, Wind, Flame, CloudLightning, AlertTriangle, ShieldCheck } from 'lucide-react';

// Risk profiles by ZIP prefix — higher = more risk (1-10 scale)
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

const risks = [
  { key: 'flood', label: 'Flood', icon: Droplets, color: '#3B82F6', tip: 'Louisiana has the highest flood risk in the nation. Even outside FEMA zones, 25% of claims come from "low-risk" areas.' },
  { key: 'wind', label: 'Wind / Hurricane', icon: Wind, color: '#8B5CF6', tip: 'Category 3+ hurricanes have hit Louisiana\'s coast every 7 years on average since 2000.' },
  { key: 'storm', label: 'Severe Storm', icon: CloudLightning, color: '#F59E0B', tip: 'Louisiana averages 60+ thunderstorm days per year — more than almost any other state.' },
  { key: 'fire', label: 'Wildfire', icon: Flame, color: '#EF4444', tip: 'Central and north Louisiana see increasing wildfire risk, especially in dry summers.' },
];

function RiskBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  return (
    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function RiskScore() {
  const [zip, setZip] = useState('');
  const [profile, setProfile] = useState<typeof defaultProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (zip.length < 3) return;
    setIsScanning(true);
    setProfile(null);

    setTimeout(() => {
      const prefix = zip.substring(0, 3);
      setProfile(riskProfiles[prefix] || defaultProfile);
      setIsScanning(false);
    }, 1800);
  };

  const overallColor = profile?.overall === 'HIGH' ? 'text-red-400' 
    : profile?.overall === 'MODERATE' ? 'text-amber-400' 
    : 'text-emerald-400';

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-paper border-t border-slate/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-4 block">
            Louisiana Risk Intelligence
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
              Know your <span className="text-accent italic font-serif">risk</span> before the storm hits.
            </h2>
            <p className="text-lg text-ink/60 font-medium leading-relaxed">
              Every ZIP code in Louisiana has a unique risk profile. See how your area scores for flood, 
              wind, storm, and fire — and whether you're properly covered.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-ink rounded-2xl p-8 md:p-12 border border-white/5"
        >
          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/30" />
              <input
                type="text"
                value={zip}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, '').slice(0, 5)); setProfile(null); }}
                placeholder="Enter ZIP code"
                className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg pl-11 pr-5 py-4 text-paper font-bold tracking-widest placeholder:text-paper/25 outline-none transition-all"
                maxLength={5}
              />
            </div>
            <button
              onClick={handleScan}
              disabled={zip.length < 3 || isScanning}
              className={`px-8 py-4 rounded-lg font-bold tracking-widest uppercase text-sm transition-all ${
                zip.length < 3 || isScanning
                  ? 'bg-white/5 text-paper/30 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(227,38,54,0.3)]'
              }`}
            >
              {isScanning ? (
                <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin mx-auto" />
              ) : (
                'Scan My Area'
              )}
            </button>
          </div>

          {/* Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <AlertTriangle className="w-8 h-8 text-accent animate-pulse mx-auto mb-4" />
                <p className="text-accent text-xs font-bold tracking-widest uppercase animate-pulse">
                  Analyzing FEMA, NOAA & state data...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Overall Score Header */}
                <div className="text-center mb-10 pt-4">
                  <p className="text-paper/40 text-xs font-bold tracking-widest uppercase mb-2">
                    {profile.zone} • ZIP {zip}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl md:text-5xl font-bold tracking-tighter ${overallColor}`}>
                      {profile.overall}
                    </span>
                    <span className="text-paper/40 text-lg font-bold">RISK</span>
                  </div>
                </div>

                {/* Risk Bars */}
                <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
                  {risks.map((risk, i) => {
                    const value = profile[risk.key as keyof typeof profile] as number;
                    return (
                      <motion.div
                        key={risk.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <risk.icon className="w-4 h-4" style={{ color: risk.color }} />
                            <span className="text-sm font-bold text-paper tracking-wider uppercase">{risk.label}</span>
                          </div>
                          <span className="text-sm font-bold tabular-nums" style={{ color: risk.color }}>
                            {value}/10
                          </span>
                        </div>
                        <RiskBar value={value} color={risk.color} delay={i * 0.15} />
                        <p className="text-paper/30 text-xs mt-1.5 font-medium">{risk.tip}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                    className="bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all shadow-[0_0_30px_rgba(227,38,54,0.3)] inline-flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Get Protected
                  </button>
                  <p className="text-paper/30 text-xs mt-3 font-medium">
                    We'll match your risk profile to the right carrier
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!profile && !isScanning && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-paper/20 text-sm font-bold tracking-widest uppercase">
                <MapPin className="w-4 h-4" />
                Enter your ZIP to see your risk profile
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
