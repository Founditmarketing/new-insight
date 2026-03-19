import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 translate-x-32" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-paper/5" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-[2px] bg-accent" />
          <span className="text-sm font-bold tracking-wide uppercase text-accent">
            Next Steps
          </span>
          <div className="w-8 h-[2px] bg-accent" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-fluid-h2 font-sans font-bold text-paper mb-8 tracking-tight"
        >
          Ready to Architect Your Protection?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl text-paper/70 font-medium leading-relaxed max-w-2xl mb-12"
        >
          Speak with a senior advisor today. We'll comprehensively audit your current liabilities and construct a resilient, high-performance portfolio.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <button className="bg-accent text-ink px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-3">
            Schedule a Consultation <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border border-paper/20 bg-transparent text-paper px-8 py-4 rounded-md font-bold text-lg hover:bg-paper/10 transition-colors flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" /> Call (318) 555-0123
          </button>
        </motion.div>
      </div>
    </section>
  );
}
