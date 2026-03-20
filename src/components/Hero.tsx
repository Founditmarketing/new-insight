import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-paper flex flex-col justify-center pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Typography Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase text-ink/70">
              Insight Insurance
            </span>
          </motion.div>
          
          <h1 className="text-fluid-h1 text-ink mb-6 flex flex-col font-bold tracking-tight">
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
              className="block text-accent"
            >
              Asset Protection.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-ink/70 font-medium leading-relaxed max-w-lg mb-10"
          >
            We don't sell policies; we construct defensive architectures around your life's work. Precision coverage for high-value homes, premium auto, and commercial enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-ink text-stone rounded-lg px-8 py-4 font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2 group">
              Speak with an Advisor 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-stone text-ink border border-slate/30 rounded-lg px-8 py-4 font-semibold hover:border-ink transition-colors flex items-center justify-center gap-2">
              Explore Coverages
            </button>
          </motion.div>
        </div>

        {/* Right Visual Column */}
        <div className="w-full lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="w-full aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl shadow-ink/10"
          >
            <div className="absolute inset-0 bg-ink/5 mix-blend-multiply z-10" />
            <img 
              src="/images/bayou_prestige.png" 
              alt="Louisiana Bayou Corporate Identity" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Trust Metric Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -left-8 md:-left-16 bg-stone p-8 rounded-xl shadow-xl shadow-ink/5 border border-slate/10 max-w-[280px]"
          >
            <div className="text-4xl font-bold text-ink mb-2">$140M+</div>
            <div className="text-sm font-semibold tracking-wide text-slate uppercase">
              Client Assets Protected Successfully
            </div>
            <div className="mt-4 pt-4 border-t border-slate/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-ink/80">Active Defense</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
