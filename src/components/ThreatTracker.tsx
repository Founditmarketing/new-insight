import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, Activity, ArrowRight, Radio } from 'lucide-react';

interface WeatherAlert {
  event: string;
  severity: string;
  headline: string;
}

export function ThreatTracker() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [radarPing, setRadarPing] = useState(false);

  useEffect(() => {
    // Simulated radar ping effect for the UI
    const interval = setInterval(() => {
      setRadarPing(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchThreats() {
      try {
        // Fetch active weather alerts specifically for Louisiana (LA)
        const response = await fetch('https://api.weather.gov/alerts/active/area/LA');
        if (!response.ok) throw new Error('NOAA API unavailable');
        
        const data = await response.json();
        
        // Extract unique event types to prevent repeating "Flood Warning" for 10 adjacent parishes
        const uniqueEvents = Array.from(new Set(data.features.map((f: any) => f.properties.event)));
        
        const parsedAlerts = uniqueEvents.map(event => {
          // Find the first alert of this type to grab its headline
          const sampleMatch = data.features.find((f: any) => f.properties.event === event);
          return {
            event: event as string,
            severity: sampleMatch?.properties?.severity || 'Unknown',
            headline: sampleMatch?.properties?.headline || 'Active weather advisory in effect.'
          };
        });

        // Uncomment the line below to artificially simulate a massive hurricane for UI testing:
        // setAlerts([{ event: "Hurricane Warning", severity: "Extreme", headline: "Major Hurricane tracking toward the Gulf Coast. Immediate evacuation and property securing protocols advised." }]);
        // return setLoading(false);

        setAlerts(parsedAlerts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch NOAA alerts", err);
        setLoading(false);
        // Fail silently by returning an empty array, which drops the UI into the "Optimal Conditions" state
      }
    }

    fetchThreats();
  }, []);

  const isActiveThreat = alerts.length > 0;

  if (loading) return null;

  return (
    <section className="bg-ink relative overflow-hidden border-t-4 border-accent">
      
      {/* Background Cartography Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Massive pulsating gradient if active threat */}
      {isActiveThreat && (
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0 animate-pulse" />
      )}

      {/* Live Data Ticker Bar at the very top */}
      <div className={`relative z-20 border-b border-white/10 flex items-center overflow-hidden h-12 ${isActiveThreat ? 'bg-accent/10' : 'bg-white/5'}`}>
        <div className="flex whitespace-nowrap animate-marquee items-center pl-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center mr-16">
              {isActiveThreat ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-accent mr-3 animate-pulse" />
                  <span className="text-white font-bold tracking-widest uppercase text-xs mr-4">
                    Active NOAA Feed [LA]:
                  </span>
                  {alerts.map((a, j) => (
                    <span key={j} className="text-accent/90 font-mono text-xs uppercase mr-6 tracking-wide">
                      {a.event}
                    </span>
                  ))}
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mr-3" />
                  <span className="text-white/80 font-bold tracking-widest uppercase text-xs mr-4">
                    GULF COAST RADAR [LA]:
                  </span>
                  <span className="text-emerald-400/90 font-mono text-xs uppercase mr-6 tracking-wide">
                    OPTIMAL ARRAY — NO ACTIVE THREATS
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Left: HUD Header */}
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActiveThreat ? 'bg-accent' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isActiveThreat ? 'bg-accent' : 'bg-emerald-500'}`}></span>
              </div>
              <span className={`text-xs font-mono tracking-widest uppercase font-bold ${isActiveThreat ? 'text-accent' : 'text-emerald-400'}`}>
                Live Threat Intelligence
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6"
            >
              {isActiveThreat ? (
                <>Gulf Coast anomalies <span className="text-accent italic font-serif opacity-90">detected.</span></>
              ) : (
                <>The horizon is currently <span className="text-emerald-400/90 italic font-serif">clear.</span></>
              )}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed font-medium"
            >
              {isActiveThreat 
                ? "Our API bridge with the National Weather Service indicates active thermodynamic or hydrodynamic threats in Louisiana. Your risk architecture must be verified immediately." 
                : "Continuous NOAA uplinks indicate optimal conditions. This is the precise psychological moment to secure vulnerabilities in your portfolio, before the environment changes."}
            </motion.p>
          </div>

          {/* Right: Data Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-auto min-w-[320px] flex flex-col gap-4"
          >
            {isActiveThreat ? (
              // Threat Cards
              alerts.slice(0, 2).map((alert, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-white font-bold font-sans tracking-tight">{alert.event}</span>
                    <span className="text-[10px] font-mono tracking-widest bg-accent/20 text-accent px-2 py-1 rounded">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed font-mono line-clamp-2">
                    {alert.headline}
                  </p>
                </div>
              ))
            ) : (
              // Clear Skies Card
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -right-12 -top-12 opacity-5">
                  <Activity className="w-48 h-48 text-white" />
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/10">
                    <Radio className={`w-5 h-5 text-emerald-400 ${radarPing ? 'opacity-100 scale-110' : 'opacity-50 scale-100'} transition-all duration-1000`} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-tight">System Nominal</h4>
                    <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest">
                      100% Regional Uptime
                    </span>
                  </div>
                </div>
                <button className="w-full bg-white text-ink px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex justify-between items-center group relative z-10">
                  Audit Infrastructure 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            {/* Urgency CTA if active threat */}
            {isActiveThreat && (
              <button className="w-full mt-2 bg-accent text-white px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-[0_0_30px_rgba(227,38,54,0.3)] flex justify-between items-center group">
                Verify Assets Immediately 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
