import { useRef, MouseEvent, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, X, Navigation } from 'lucide-react';

const locations = [
  {
    id: 'alexandria',
    city: 'Alexandria',
    tagline: 'Rooted in Alexandria.',
    image: '/images/alexandria.png',
    description: 'Where it all started. Central Louisiana families, farms, and small businesses — we\'ve been here long enough to know what keeps people up at night.',
    phone: '(318) 561-8000',
    phoneRaw: '3185618000',
    email: 'support@insighthelps.com',
    address: '5215 B Jackson St, Alexandria, LA 71303',
    mapQuery: '5215+B+Jackson+St+Alexandria+LA+71303',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5215+B+Jackson+St+Alexandria+LA+71303',
  },
  {
    id: 'ponchatoula',
    city: 'Ponchatoula',
    tagline: 'Home in Ponchatoula.',
    image: '/images/ponchatoula.png',
    description: 'Small town, big storms. We protect the historic homes, the strawberry farms, and the neighbors we see at the grocery store.',
    phone: '(985) 242-4300',
    phoneRaw: '9852424300',
    email: 'support@insighthelps.com',
    address: '1133 Hwy 51, Suite 105, Ponchatoula, LA 70454',
    mapQuery: '1133+Hwy+51+Suite+105+Ponchatoula+LA+70454',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1133+Hwy+51+Suite+105+Ponchatoula+LA+70454',
  },
  {
    id: 'slidell',
    city: 'Slidell',
    tagline: 'Serving Slidell.',
    image: '/images/slidell.png',
    description: 'Lake Pontchartrain on one side, the Gulf on the other. We know coastal risk because we live in it — and we build policies around it.',
    phone: '(985) 643-3304',
    phoneRaw: '9856433304',
    email: 'support@insighthelps.com',
    address: '1352 7th St, Slidell, LA 70458',
    mapQuery: '1352+7th+St+Slidell+LA+70458',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1352+7th+St+Slidell+LA+70458',
  }
];

// Info panel shown when a location card is clicked
function LocationInfoPanel({ loc, onClose }: { loc: typeof locations[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-ink/90 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-paper/60 hover:text-paper hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="relative h-40 overflow-hidden">
          <img src={loc.image} alt={`${loc.city}, Louisiana`} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/40" />
          <div className="absolute bottom-5 left-6">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest font-bold text-accent">{loc.city}, LA</span>
            </div>
            <h3 className="text-2xl font-bold text-paper">{loc.city} Office</h3>
          </div>
        </div>

        {/* Contact details */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-paper font-medium text-sm">{loc.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-accent shrink-0" />
            <a href={`tel:${loc.phoneRaw}`} className="text-paper font-bold text-lg hover:text-accent transition-colors">
              {loc.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <a href={`mailto:${loc.email}`} className="text-paper/70 font-medium text-sm hover:text-accent transition-colors">
              {loc.email}
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-xl overflow-hidden border border-white/10 mt-2">
            <iframe
              title={`Map of ${loc.city} office`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${loc.mapQuery}&output=embed&z=15`}
            />
          </div>

          <a
            href={loc.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-accent text-white py-3.5 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_20px_rgba(227,38,54,0.3)] mt-2"
          >
            <Navigation className="w-4 h-4" /> Get Directions
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Interactive Spotlight Card Component
function LocationCard({ loc, index, onSelect }: { loc: typeof locations[0]; index: number; onSelect: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onClick={onSelect}
      className="group relative flex flex-col aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer text-left w-full"
      aria-label={`View ${loc.city} office details`}
    >
      {/* Glow Hover Engine */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl md:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Base Image Layer */}
      <div className="absolute inset-0 bg-ink z-0">
        <img 
          src={loc.image} 
          alt={`${loc.city}, Louisiana — Insight Insurance service area`}
          loading="lazy"
          decoding="async"
          width="600"
          height="800"
          className="w-full h-full object-cover opacity-80 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        {/* Permanent vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      </div>

      {/* Top Geolocation Pill */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-ink/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-xl">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-xs uppercase tracking-widest font-bold text-paper">{loc.city}, LA</span>
        </div>
      </div>

      {/* Click hint badge */}
      <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-accent/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent/30 shadow-xl">
          <span className="text-[10px] uppercase tracking-widest font-bold text-white">Tap for Info</span>
        </div>
      </div>

      {/* Default State: Bottom Typography */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10 hidden md:flex flex-col justify-end h-full pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
        <h3 className="font-serif italic text-4xl text-paper drop-shadow-lg">{loc.tagline}</h3>
      </div>

      {/* Reveal: Frosted Glass Panel */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 bg-ink/40 backdrop-blur-xl border-t border-white/10 translate-y-0 md:translate-y-[100%] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-auto md:h-[60%]">
        <h3 className="font-serif italic text-3xl text-paper mb-3">{loc.tagline}</h3>
        <p className="text-paper/80 text-sm font-medium leading-relaxed mb-4">
          {loc.description}
        </p>
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-paper/60 text-xs font-bold mb-1">
            <Phone className="w-3.5 h-3.5 text-accent" /> {loc.phone}
          </div>
          <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-bold">
            <span>Click to view map & details →</span>
          </div>
        </div>
      </div>

      {/* Aesthetic Inner Border */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 pointer-events-none z-30 mix-blend-overlay" />
    </motion.button>
  );
}

export function LouisianaStory() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cinematic Space Dust / Ember Particles
  const particles = useMemo(() => {
    const count = isMobile ? 40 : 180;
    return Array.from({ length: count }).map((_, i) => {
      const isOrange = Math.random() > 0.4;
      return {
        id: i,
        size: Math.random() * 8 + 4,
        xOrigin: Math.random() * 100,
        yOrigin: Math.random() * 100,
        xOffset: Math.random() * 40 - 20,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5 * -1, 
        opacity: Math.random() * 0.4 + 0.6,
        colorClass: isOrange ? 'bg-accent' : 'bg-paper',
        shadow: isOrange ? 'rgba(227,38,54,1)' : 'rgba(255,255,255,1)',
      };
    });
  }, [isMobile]);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
      <section id="story" ref={containerRef} className="py-24 md:py-32 bg-ink text-paper relative overflow-hidden">
        
        {/* Background Architectural Texture & Particles */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
        <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`gpu-particle ${p.colorClass}`}
              style={{
                '--size': `${p.size}px`,
                '--x-origin': `${p.xOrigin}vw`,
                '--y-origin': `${p.yOrigin + 20}vh`,
                '--offset-x': `${p.xOffset}vw`,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
                '--max-opacity': p.opacity,
                '--shadow-color': p.shadow
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 relative z-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-6"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              01 // Where We Are
            </span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2 style={{ y: titleY }} className="text-fluid-h2 font-sans font-bold tracking-tight max-w-2xl leading-[1.1] text-paper">
              Three Communities.<br/><span className="text-accent italic font-serif">One Team.</span>
            </motion.h2>
            <p className="text-paper/50 max-w-sm text-sm uppercase tracking-widest font-semibold pb-2 leading-relaxed">
              Click any location to see contact info, phone number, and directions.
            </p>
          </div>
        </div>

        {/* Symmetric Spotlight Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {locations.map((loc, index) => (
              <LocationCard
                key={loc.id}
                loc={loc}
                index={index}
                onSelect={() => setSelectedLocation(loc)}
              />
            ))}
          </div>
        </div>
        
      </section>

      {/* Location Info Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <LocationInfoPanel
            loc={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
