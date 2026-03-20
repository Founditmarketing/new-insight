import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useRef } from 'react';

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
      
      {/* Immersive Interactive Mesh Background (Mirrors Hero) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Absolute Black Base */}
        <div className="absolute inset-0 bg-ink z-0" />
        
        {/* The Extraordinary Solar Orb */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] md:w-[60vw] md:h-[60vw] flex items-center justify-center pointer-events-none">
          
          {/* Deep Ambient Edge Glow */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-[#EA580C] via-[#FFB347] to-[#FFFFFF] mix-blend-screen blur-[40px] shadow-[0_0_120px_rgba(255,255,255,0.3)]"
          />
        </div>

        {/* Dense Black Vignette Overlay to force contrast to the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] z-10 opacity-90" />
      </div>

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
