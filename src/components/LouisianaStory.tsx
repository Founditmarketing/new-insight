import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function LouisianaStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        <div className="lg:col-span-5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium tracking-widest uppercase text-paper/50 mb-8"
          >
            The Louisiana Reality
          </motion.h2>
          
          <h3 className="text-fluid-h2 font-serif mb-8 flex flex-col">
            <span className="overflow-hidden py-2">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Rooted in Alexandria.
              </motion.span>
            </span>
            <span className="overflow-hidden py-2">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-paper/80 italic"
              >
                Guarding Ponchatoula.
              </motion.span>
            </span>
            <span className="overflow-hidden py-2">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Securing Slidell.
              </motion.span>
            </span>
          </h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg text-paper/70 font-light leading-relaxed mb-8">
              Louisiana is not a standard risk profile. From the historic avenues of Alexandria to the 
              vibrant growth of Ponchatoula and the coastal resilience of Slidell, our state demands specialized protection. We understand the 
              nuance of Gulf Coast weather patterns, the specific requirements of local flood zones, and 
              the unique liabilities faced by Southern enterprises.
            </p>
            <p className="text-lg text-paper/70 font-light leading-relaxed">
              We don't just insure properties here; we protect our neighbors, our local economy, and the 
              legacy of the communities we call home.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[600px] rounded-2xl overflow-hidden glass-panel border-white/10">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <motion.img 
              style={{ y, scale: 1.2 }}
              src="https://images.unsplash.com/photo-1578307325514-699709794d21?q=80&w=2070&auto=format&fit=crop" 
              alt="Louisiana landscape" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent opacity-90" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
