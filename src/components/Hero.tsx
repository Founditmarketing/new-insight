import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax the background image down slightly as we scroll down
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Fade out text slightly
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-ink">
      
      {/* Immersive Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 origin-center"
      >
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink to-transparent z-20 pointer-events-none opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/images/hero_luxury.png" 
          alt="High-Value Estate Corporate Identity" 
          className="w-full h-[120%] -top-[10%] absolute object-cover"
        />
      </motion.div>
      
      <motion.div 
        style={{ opacity: textOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between"
      >
        {/* Left Typography Column */}
        <div className="w-full lg:w-3/5 flex flex-col pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-paper/90">
              Insight Insurance
            </span>
          </motion.div>
          
          <h1 className="text-fluid-h1 text-paper mb-6 flex flex-col font-bold tracking-tight leading-none">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Uncompromising
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-accent drop-shadow-2xl"
            >
              Asset Protection.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-paper/80 font-medium leading-relaxed max-w-lg mb-12"
          >
            We don't sell policies; we construct defensive architectures around your life's work. Precision coverage for high-value homes, premium auto, and commercial enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-accent text-ink px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-stone transition-colors flex items-center justify-center gap-2 group">
              Speak with an Advisor 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent text-paper px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm border border-paper/30 hover:border-paper hover:bg-paper/10 transition-colors flex items-center justify-center gap-2">
              Explore Coverages
            </button>
          </motion.div>
        </div>

        {/* Floating Trust Metric */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block bg-stone/5 backdrop-blur-md p-8 rounded-xl border border-stone/10 max-w-[300px] shadow-2xl relative overflow-hidden mt-24"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -z-10 rounded-full" />
            <div className="text-5xl font-bold text-paper mb-2">$140M+</div>
            <div className="text-sm font-semibold tracking-wide text-stone/70 uppercase">
              Client Assets Protected Successfully
            </div>
            <div className="mt-6 pt-6 border-t border-stone/10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(191,161,95,0.8)]" />
              <span className="text-xs font-bold tracking-widest uppercase text-stone/90">Active Defense</span>
            </div>
        </motion.div>
        
      </motion.div>
    </section>
  );
}
