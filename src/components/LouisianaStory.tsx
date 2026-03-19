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
    <section ref={containerRef} className="py-20 px-6 md:px-12 lg:px-24 bg-stone text-ink relative overflow-hidden border-t border-slate/10">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-sm font-bold tracking-wide uppercase text-accent">
              The Louisiana Reality
            </span>
          </motion.div>
          
          <h3 className="text-fluid-h2 font-sans font-bold text-ink mb-8 flex flex-col tracking-tight">
            <span className="overflow-hidden pb-4 pt-2 -mt-2 -mb-4">
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
            <span className="overflow-hidden pb-4 pt-2 -mt-2 -mb-4">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-accent"
              >
                Guarding Ponchatoula.
              </motion.span>
            </span>
            <span className="overflow-hidden pb-4 pt-2 -mt-2 -mb-4">
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
            <p className="text-lg text-ink/70 font-medium leading-relaxed mb-8">
              Louisiana is not a standard risk profile. From the historic avenues of Alexandria to the 
              vibrant growth of Ponchatoula and the coastal resilience of Slidell, our state demands specialized protection. We understand the 
              nuance of Gulf Coast weather patterns, the specific requirements of local flood zones, and 
              the unique liabilities faced by Southern enterprises.
            </p>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              We don't just insure properties here; we protect our neighbors, our local economy, and the 
              legacy of the communities we call home.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[600px] rounded-2xl overflow-hidden bg-paper shadow-2xl shadow-ink/5 border border-slate/10">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-full h-full"
          >
            <motion.img 
              style={{ y, scale: 1.1 }}
              src="/images/bayou_prestige.png" 
              alt="Louisiana landscape" 
              className="w-full h-full object-cover opacity-90 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-ink/5 mix-blend-multiply pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
