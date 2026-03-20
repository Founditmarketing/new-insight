import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';

export function Hero() {
  // Cinematic Space Dust / Ember Particles
  const particles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => {
      const isOrange = Math.random() > 0.4; // 60% orange, 40% white
      return {
        id: i,
        size: Math.random() * 4 + 2, // 2px to 6px
        xOrigin: Math.random() * 100, // 0 to 100vw
        yOrigin: Math.random() * 100, // 0 to 100vh
        xOffset: Math.random() * 30 - 15, // drift left or right more
        duration: Math.random() * 10 + 15, // 15s to 25s (faster)
        delay: Math.random() * 3 * -1, // Negative delay so they are instantly scattered on load
        opacity: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 extremely bright
        colorClass: isOrange ? 'bg-accent' : 'bg-paper',
        shadow: isOrange ? 'rgba(234,88,12,1)' : 'rgba(255,255,255,1)',
      };
    }), []
  );

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-ink">
      
      {/* Immersive Interactive Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Absolute Black Base */}
        <div className="absolute inset-0 bg-ink z-0" />
        
        {/* The Extraordinary Solar Orb */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] md:w-[60vw] md:h-[60vw] flex items-center justify-center pointer-events-none">
          
          {/* Deep Ambient Edge Glow */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#EA580C] mix-blend-screen blur-[120px]"
          />

          {/* Rotating Solar Flare Ring 1 (Horizontal) */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute w-[90%] h-[30%] rounded-[100%] bg-gradient-to-r from-[#FFB347]/0 via-[#EA580C]/40 to-[#FFB347]/0 mix-blend-screen blur-[50px]"
          />

          {/* Rotating Solar Flare Ring 2 (Vertical) */}
          <motion.div 
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute w-[30%] h-[90%] rounded-[100%] bg-gradient-to-b from-[#EA580C]/0 via-[#FF4500]/40 to-[#EA580C]/0 mix-blend-screen blur-[50px]"
          />

          {/* The Structural Corona Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[50%] h-[50%] rounded-full border border-[#EA580C]/20 border-t-[#FFB347]/60 border-b-[#FF4500]/60 mix-blend-screen blur-[2px]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[45%] h-[45%] rounded-full border border-[#EA580C]/10 border-r-[#FFFFFF]/40 mix-blend-screen blur-[1px]"
          />

          {/* The Superdense Sun Core */}
          <motion.div 
            animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-[#EA580C] via-[#FFB347] to-[#FFFFFF] mix-blend-screen blur-[40px] shadow-[0_0_120px_rgba(255,255,255,0.3)]"
          />
        </div>

        {/* Atmospheric Particle Dust Layer (Z-15 to render above the vignette) */}
        <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none opacity-90">
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
