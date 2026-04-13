import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function WeatherBadge() {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);

  useEffect(() => {
    async function fetchThreats() {
      try {
        const response = await fetch('https://api.weather.gov/alerts/active/area/LA');
        if (!response.ok) throw new Error('NOAA Error');
        const data = await response.json();
        
        const uniqueEvents = Array.from(new Set(data.features.map((f: any) => f.properties.event)));
        setAlerts(uniqueEvents as string[]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchThreats();
  }, []);

  // Auto-expand after load, then collapse after 4 seconds
  useEffect(() => {
    if (!loading && !hasAutoExpanded) {
      const expandTimer = setTimeout(() => {
        setIsExpanded(true);
        setHasAutoExpanded(true);
      }, 2000); // Wait 2s after load to expand

      return () => clearTimeout(expandTimer);
    }
  }, [loading, hasAutoExpanded]);

  useEffect(() => {
    if (isExpanded && hasAutoExpanded) {
      const collapseTimer = setTimeout(() => {
        setIsExpanded(false);
      }, 4000); // Stay expanded for 4 seconds

      return () => clearTimeout(collapseTimer);
    }
  }, [isExpanded, hasAutoExpanded]);

  if (loading) return null;

  const hasThreat = alerts.length > 0;

  return (
    <div 
      className="fixed bottom-6 right-6 md:right-auto md:left-6 z-50 flex items-center cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => { if (hasAutoExpanded) setIsExpanded(false); }}
    >
      <motion.div 
        layout
        className={`flex items-center gap-3 backdrop-blur-xl border rounded-full px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-colors duration-300 ${
          hasThreat 
          ? 'bg-accent/95 hover:bg-accent border-accent/50 text-white' 
          : 'bg-ink/90 hover:bg-ink border-white/10 text-white'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {hasThreat ? (
            <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase ml-1 block pr-2">
                {hasThreat ? `NOAA Alert: ${alerts[0]}` : 'Gulf Coast: Clear skies'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
