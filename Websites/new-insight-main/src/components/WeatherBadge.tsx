import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function WeatherBadge() {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchThreats() {
      try {
        const response = await fetch('https://api.weather.gov/alerts/active/area/LA');
        if (!response.ok) throw new Error('NOAA Error');
        const data = await response.json();
        const uniqueEvents = Array.from(new Set(data.features.map((f: any) => f.properties.event)));
        setAlerts(uniqueEvents as string[]);
      } catch {
        // silently fail
      }
      setLoading(false);
    }
    fetchThreats();
  }, []);

  // Auto-expand 2s after load, collapse after 4s
  useEffect(() => {
    if (loading) return;
    const expandTimer = setTimeout(() => setIsExpanded(true), 2000);
    return () => clearTimeout(expandTimer);
  }, [loading]);

  useEffect(() => {
    if (!isExpanded) return;
    const collapseTimer = setTimeout(() => setIsExpanded(false), 4000);
    return () => clearTimeout(collapseTimer);
  }, [isExpanded]);

  if (loading) return null;

  const hasThreat = alerts.length > 0;
  const label = hasThreat ? `NOAA: ${alerts[0]}` : 'Gulf Coast: Clear';

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 cursor-pointer"
      onClick={() => setIsExpanded(prev => !prev)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div 
        className={`flex items-center gap-2 backdrop-blur-xl border rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hasThreat 
            ? 'bg-accent/95 border-accent/50 text-white' 
            : 'bg-ink/90 border-white/10 text-white'
        } ${isExpanded ? 'px-4 py-3' : 'px-3 py-3'}`}
        style={{ 
          maxWidth: isExpanded ? '300px' : '32px',
          transition: 'max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease'
        }}
      >
        {/* Indicator dot/icon */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {hasThreat ? (
            <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
          )}
        </div>

        {/* Label text */}
        <span 
          className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-opacity duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
