import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';

export function Hero() {
  // Cinematic Space Dust / Ember Particles
  const particles = useMemo(() => 
    Array.from({ length: 25 }).map((_, i) => {
      const isOrange = Math.random() > 0.5;
      return {
        id: i,
        size: Math.random() * 3 + 1, // 1px to 4px
        xOrigin: Math.random() * 100, // 0 to 100vw
        yOrigin: Math.random() * 100, // 0 to 100vh
        xOffset: Math.random() * 20 - 10, // gentle drift
        duration: Math.random() * 20 + 20, // 20s to 40s (slow, majestic)
        delay: Math.random() * 5 * -1, 
        opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 very subtle glow
        colorClass: isOrange ? 'bg-accent' : 'bg-paper',
        shadow: isOrange ? 'rgba(234,88,12,0.5)' : 'rgba(255,255,255,0.5)',
      };
    }), []
  );

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-ink">
      
      {/* Immersive Interactive Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Absolute Black Base */}
        <div className="absolute inset-0 bg-ink z-0" />
        
        {/* Elegant, Toned-Down Ambient Core */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] sm:w-[80vw] sm:h-[80vw] md:w-[50vw] md:h-[50vw] flex items-center justify-center pointer-events-none z-0">
          
          {/* Deep Outer Diffuse Glow */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-accent/20 blur-[120px] mix-blend-screen"
          />

          {/* Centered Soft Ember */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-accent to-[#FFB347] blur-[80px] mix-blend-screen opacity-50"
          />
        </div>

        {/* Atmospheric Particle Dust Layer (Z-15 to render above the vignette) */}
        <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none opacity-60">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] z-10 opacity-90" />
        
        {/* Top Navbar Protection Layer */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink to-transparent z-20 opacity-90" />
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-paper/90">
              Insight Insurance
            </span>
          </div>
        </motion.div>
        
        <h1 className="text-[10vw] sm:text-[4rem] lg:text-[5.5rem] text-paper mb-6 flex flex-col font-bold tracking-tighter leading-[1] mix-blend-plus-lighter relative z-20">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Uncompromising
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-paper drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Protection.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-paper/80 font-medium leading-relaxed max-w-2xl mb-12"
        >
          Precision coverage and defensive architecture for your most significant assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <button className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-stone hover:text-ink hover:shadow-[0_4px_30px_rgba(234,88,12,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group shadow-institutional hover:-translate-y-1">
            Speak with an Advisor 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-transparent text-paper px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm border-2 border-paper/20 hover:border-paper hover:bg-paper/10 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1">
            Explore Portfolios
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}
