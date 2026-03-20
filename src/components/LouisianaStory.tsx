import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
  {
    id: 'alexandria',
    city: 'Alexandria',
    tagline: 'Anchoring Alexandria.',
    image: '/images/alexandria.png',
    description: 'Providing generational wealth structuring and robust commercial continuity in the heart of Louisiana.',
    marginTop: 'mt-0'
  },
  {
    id: 'ponchatoula',
    city: 'Ponchatoula',
    tagline: 'Guarding Ponchatoula.',
    image: '/images/ponchatoula.png',
    description: 'Safeguarding historic properties and local enterprise with tailored, high-value asset protection.',
    marginTop: 'md:mt-24'
  },
  {
    id: 'slidell',
    city: 'Slidell',
    tagline: 'Securing Slidell.',
    image: '/images/slidell.png',
    description: 'Engineering resilient coastal defense protocols for waterfront estates, marine portfolios, and Gulf industry.',
    marginTop: 'md:mt-48'
  }
];

export function LouisianaStory() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section id="story" ref={containerRef} className="py-24 md:py-32 bg-[#FAF9F6] text-ink relative overflow-hidden">
      
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex items-center gap-4 mb-6"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
            01 // Local Jurisdiction
          </span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-fluid-h2 font-sans font-bold tracking-tight max-w-2xl leading-[1.1] text-ink">
            A Tri-City <span className="text-accent italic font-serif opacity-90">Fortress.</span>
          </h2>
          <p className="text-ink/60 max-w-sm text-sm uppercase tracking-widest font-semibold pb-2 leading-relaxed">
            World-class risk management, anchored in three distinct Louisiana communities.
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col group cursor-pointer ${loc.marginTop}`}
            >
              {/* Image Window */}
              <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden mb-8 bg-slate/10 shadow-2xl">
                <img 
                  src={loc.image} 
                  alt={`${loc.city} Architecture`}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                
                {/* Subtle vignette / overlay */}
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />
                
                {/* Geolocation Tag inside image */}
                <div className="absolute top-4 right-4 bg-paper/90 backdrop-blur-md px-3 py-1.5 rounded-sm flex items-center gap-1.5 shadow-lg border border-white/50 transform transition-transform group-hover:scale-105">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-ink">{loc.city}, LA</span>
                </div>
              </div>

              {/* Text Card */}
              <div className="flex flex-col pr-4">
                <h3 className="font-serif italic text-3xl text-ink mb-4">{loc.tagline}</h3>
                <p className="text-ink/70 text-sm leading-relaxed mb-6 font-medium">
                  {loc.description}
                </p>
                <div className="mt-auto flex items-center gap-3 text-accent text-xs uppercase tracking-widest font-bold group-hover:translate-x-3 transition-transform duration-500 ease-out">
                  View Location <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
