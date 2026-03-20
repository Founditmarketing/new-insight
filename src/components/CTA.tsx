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
        <div className="absolute inset-0 bg-ink z-0" />
        
        {/* Animated Orange Orb */}
        <motion.div 
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "10%", "0%"], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#EA580C]/20 mix-blend-screen"
        />

        {/* Animated Peach Orb */}
        <motion.div 
          animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-10%", "10%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(130px)" }}
          className="absolute top-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FFB347]/15 mix-blend-screen"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111827_100%)] z-10 opacity-80" />
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
          className="text-fluid-h2 font-sans font-bold text-paper mb-8 tracking-tight drop-shadow-lg"
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
