import { useRef, MouseEvent, useState, useEffect, useMemo } from 'react';
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
function LocationCard({ loc, index }: { loc: typeof locations[0]; index: number; key?: string | number }) {
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

      {/* Default State: Bottom Typography (Hidden on mobile where reveal is permanent) */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10 hidden md:flex flex-col justify-end h-full pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
        <h3 className="font-serif italic text-4xl text-paper drop-shadow-lg">{loc.tagline}</h3>
      </div>

      {/* Reveal: Frosted Glass Panel (Always visible on mobile, hover-only on desktop) */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 bg-ink/40 backdrop-blur-xl border-t border-white/10 translate-y-0 md:translate-y-[100%] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-auto md:h-[55%]">
        <h3 className="font-serif italic text-3xl md:text-3xl text-paper mb-3 md:mb-4">{loc.tagline}</h3>
        <p className="text-paper/80 text-sm font-medium leading-relaxed mb-6 md:mb-8">
          {loc.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-widest font-bold">Explore Jurisdiction</span>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-paper md:group-hover:-rotate-45 transition-transform duration-500">
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </div>
      </div>

      {/* Aesthetic Inner Border */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 pointer-events-none z-30 mix-blend-overlay" />
    </motion.div>
  );
}

export function LouisianaStory() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is less than md breakpoint (768px)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cinematic Space Dust / Ember Particles
  const particles = useMemo(() => {
    const count = isMobile ? 40 : 180; // Dramatically reduce particles on mobile to prevent lag
    return Array.from({ length: count }).map((_, i) => {
      const isOrange = Math.random() > 0.4; // 60% orange, 40% white
      return {
        id: i,
        size: Math.random() * 8 + 4, // 4px to 12px
        xOrigin: Math.random() * 100, // 0 to 100vw
        yOrigin: Math.random() * 100, // 0 to 100vh
        xOffset: Math.random() * 40 - 20, // sweeping drift
        duration: Math.random() * 15 + 10, // 15s to 25s
        delay: Math.random() * 5 * -1, 
        opacity: Math.random() * 0.4 + 0.6, // 0.6 to 1.0 peak brightness
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
  
  // Parallax the title slightly on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="story" ref={containerRef} className="py-24 md:py-32 bg-[#0A0A0A] text-paper relative overflow-hidden">
      
      {/* Background Architectural Texture & Particles */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.xOrigin}vw`, 
              y: `${p.yOrigin + 20}vh`, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: [`${p.xOrigin}vw`, `${p.xOrigin + p.xOffset}vw`],
              y: [`${p.yOrigin + 20}vh`, `${p.yOrigin - 50}vh`],
              opacity: [0, p.opacity, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            className={`absolute rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] mix-blend-screen ${p.colorClass}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 5}px ${p.shadow}`
            }}
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
