import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-paper">
      
      {/* Immersive Interactive Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Crisp White Base */}
        <div className="absolute inset-0 bg-paper z-0" />
        
        {/* Animated Brand Orange Orb */}
        <motion.div 
          animate={{ x: ["-10%", "20%", "-10%"], y: ["0%", "30%", "0%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#EA580C]/15 mix-blend-multiply"
        />

        {/* Animated Peach/Warm Glow Orb */}
        <motion.div 
          animate={{ x: ["10%", "-20%", "10%"], y: ["20%", "-10%", "20%"], scale: [1, 1.5, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(130px)" }}
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#FFB347]/20 mix-blend-multiply"
        />

        {/* Ambient Center Glow */}
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(100px)" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[#EA580C]/10"
        />

        {/* Soft White Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F9FAFB_100%)] z-10 opacity-70" />
        
        {/* Top Navbar Protection Layer */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-paper to-transparent z-20 opacity-80" />
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-ink/10 bg-stone/50 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-ink">
              Insight Insurance
            </span>
          </div>
        </motion.div>
        
        <h1 className="text-[10vw] sm:text-[4rem] lg:text-[5.5rem] text-ink mb-6 flex flex-col font-bold tracking-tighter leading-[1]">
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
            className="block text-accent drop-shadow-[0_4px_20px_rgba(234,88,12,0.2)]"
          >
            Protection.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-ink/70 font-medium leading-relaxed max-w-2xl mb-12"
        >
          Precision coverage and defensive architecture for your most significant assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <button className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-ink transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-institutional hover:-translate-y-1">
            Speak with an Advisor 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-transparent text-ink px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm border-2 border-ink/10 hover:border-ink hover:bg-ink/5 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1">
            Explore Portfolios
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}
