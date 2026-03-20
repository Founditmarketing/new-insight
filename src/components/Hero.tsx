import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-ink">
      
      {/* Immersive Interactive Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Navy Base */}
        <div className="absolute inset-0 bg-ink z-0" />
        
        {/* Animated Gold Orb */}
        <motion.div 
          animate={{ 
            x: ["-10%", "20%", "-10%"],
            y: ["0%", "30%", "0%"],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/15 mix-blend-screen"
        />

        {/* Animated Accent Blue Orb */}
        <motion.div 
          animate={{ 
            x: ["10%", "-20%", "10%"],
            y: ["20%", "-10%", "20%"],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(130px)" }}
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0052FF]/15 mix-blend-screen"
        />

        {/* Ambient Center Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(100px)" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent/10"
        />

        {/* Vignette Overlay to keep edges sharp and contrast high */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1D3D_100%)] z-10 opacity-90" />
        
        {/* Top Navbar Protection Layer */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink to-transparent z-20 opacity-80" />
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
        
        <h1 className="text-[10vw] sm:text-[4rem] lg:text-[5.5rem] text-paper mb-6 flex flex-col font-bold tracking-tighter leading-[1]">
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
            className="block text-accent drop-shadow-[0_0_30px_rgba(191,161,95,0.4)]"
          >
            Protection.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-paper/70 font-medium leading-relaxed max-w-2xl mb-12"
        >
          Precision coverage and defensive architecture for your most significant assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <button className="w-full sm:w-auto bg-accent text-ink px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-stone transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(191,161,95,0.2)] hover:shadow-[0_0_50px_rgba(191,161,95,0.5)] hover:-translate-y-1">
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
