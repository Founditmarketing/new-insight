import { useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
  {
    id: 'alexandria',
    city: 'Alexandria',
    tagline: 'Anchoring Alexandria.',
    image: '/images/alexandria.png',
    description: 'Providing generational wealth structuring and robust commercial continuity in the heart of Louisiana.'
  },
  {
    id: 'ponchatoula',
    city: 'Ponchatoula',
    tagline: 'Guarding Ponchatoula.',
    image: '/images/ponchatoula.png',
    description: 'Safeguarding historic properties and local enterprise with tailored, high-value asset protection.'
  },
  {
    id: 'slidell',
    city: 'Slidell',
    tagline: 'Securing Slidell.',
    image: '/images/slidell.png',
    description: 'Engineering resilient coastal defense protocols for waterfront estates, marine portfolios, and Gulf industry.'
  }
];

// Interactive Spotlight Card Component
function LocationCard({ loc, index }: { loc: typeof locations[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Glow Hover Engine - Creates a physical "flashlight" effect following the cursor */}
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
          alt={`${loc.city} Landmark`}
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

      {/* Default State: Bottom Typography */}
      <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end h-full pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
        <h3 className="font-serif italic text-4xl text-paper drop-shadow-lg">{loc.tagline}</h3>
      </div>

      {/* Hover Reveal: Frosted Glass Panel */}
      <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-ink/50 backdrop-blur-xl border-t border-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-[55%]">
        <h3 className="font-serif italic text-3xl text-paper mb-4">{loc.tagline}</h3>
        <p className="text-paper/80 text-sm leading-relaxed mb-8 font-medium">
          {loc.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-accent text-xs uppercase tracking-widest font-bold">Explore Jurisdiction</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-paper group-hover:-rotate-45 transition-transform duration-500">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Aesthetic Inner Border */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 pointer-events-none z-30 mix-blend-overlay" />
    </motion.div>
  );
}

export function LouisianaStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax the title slightly on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="story" ref={containerRef} className="py-24 md:py-32 bg-ink text-paper relative overflow-hidden">
      
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

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
          <motion.h2 style={{ y: titleY }} className="text-fluid-h2 font-sans font-bold tracking-tight max-w-2xl leading-[1.1] text-paper">
            A Tri-City <span className="text-accent italic font-serif">Fortress.</span>
          </motion.h2>
          <p className="text-paper/50 max-w-sm text-sm uppercase tracking-widest font-semibold pb-2 leading-relaxed">
            World-class absolute risk management, engineered specifically for the Gulf Coast reality.
          </p>
        </div>
      </div>

      {/* Symmetric Spotlight Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((loc, index) => (
            <LocationCard key={loc.id} loc={loc} index={index} />
          ))}
        </div>
      </div>
      
    </section>
  );
}
