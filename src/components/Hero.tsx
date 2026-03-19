import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 800], [0.4, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 text-white">
      {/* Cinematic Background with Parallax and Continuous Breathing */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          style={{ y, opacity }}
          animate={{ scale: [1.05, 1.15] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
          alt="Atmospheric architecture" 
          className="w-full h-full object-cover mix-blend-luminosity origin-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <Shield className="w-5 h-5 text-white/70" />
          <span className="text-sm font-medium tracking-widest uppercase text-white/70">Asset Protection Partner</span>
        </motion.div>
        
        <h1 className="text-fluid-h1 font-serif font-medium mb-8 flex flex-col">
          <span className="overflow-hidden py-2">
            <motion.span 
              initial={{ y: "100%", opacity: 0, rotate: 2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Quiet certainty in an
            </motion.span>
          </span>
          <span className="overflow-hidden py-2">
            <motion.span 
              initial={{ y: "100%", opacity: 0, rotate: 2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block italic text-white/80"
            >
              unpredictable world.
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl"
        >
          <div className="glass-panel rounded-full p-2 flex w-full items-center">
            <input 
              type="text" 
              placeholder="What are we protecting today?" 
              className="bg-transparent border-none outline-none text-white placeholder:text-white/50 px-6 w-full font-sans"
            />
            <MagneticButton className="bg-white text-ink rounded-full px-8 py-4 font-medium flex items-center gap-2 whitespace-nowrap hover:bg-stone transition-colors">
              Begin Quote <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
