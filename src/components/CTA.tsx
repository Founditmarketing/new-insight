import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useRef, useMemo } from 'react';

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Cinematic Space Dust / Ember Particles (Mirrored from Hero)
  const particles = useMemo(() => 
    Array.from({ length: 80 }).map((_, i) => {
      const isOrange = Math.random() > 0.4;
      return {
        id: i,
        size: Math.random() * 4 + 1.5,
        xOrigin: Math.random() * 100,
        yOrigin: Math.random() * 100,
        xOffset: Math.random() * 30 - 15,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5 * -1, 
        opacity: Math.random() * 0.4 + 0.3,
        colorClass: isOrange ? 'bg-accent' : 'bg-paper',
        shadow: isOrange ? 'rgba(234,88,12,0.8)' : 'rgba(255,255,255,0.8)',
      };
    }), []
  );

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
      
      {/* Immersive Interactive Mesh Background (Mirrors Hero) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Absolute Black Base */}
        <div className="absolute inset-0 bg-ink z-0" />
      </div>

      {/* Atmospheric Particle Dust Layer */}
      <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none opacity-80">
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
            className={`absolute rounded-full mix-blend-screen ${p.colorClass}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 3}px ${p.shadow}`
            }}
          />
        ))}
      </div>

      {/* Dense Black Vignette Overlay to force contrast to the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] z-10 pointer-events-none opacity-90" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-[1px] bg-accent/50" />
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono drop-shadow-md">
            Next Steps
          </span>
          <div className="w-12 h-[1px] bg-accent/50" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-fluid-h2 font-sans font-bold text-paper mb-8 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mix-blend-plus-lighter relative z-20"
        >
          Ready to Architect Your Protection?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-paper/80 font-medium leading-relaxed max-w-3xl mb-12 drop-shadow-md"
        >
          Speak with a senior advisor today. We'll comprehensively audit your current liabilities and construct a resilient, high-performance portfolio.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto bg-accent text-white px-10 py-5 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-paper hover:text-ink transition-colors flex items-center justify-center group shadow-institutional">
            Schedule a Consultation <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto border-2 border-paper/20 bg-ink/40 backdrop-blur-md text-paper px-10 py-5 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-paper hover:text-ink hover:border-paper transition-colors flex items-center justify-center group shadow-institutional">
            <Phone className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" /> Call (318) 555-0123
          </button>
        </motion.div>
      </div>
    </section>
  );
}
