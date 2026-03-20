import { motion } from 'motion/react';
import { ShieldCheck, Scale, Compass } from 'lucide-react';

export function Philosophy() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Title & Methodology */}
        <div className="w-full lg:w-1/3 flex flex-col shrink-0 relative">
          
          {/* Subtle Ambient Graphic Anchor */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-96 h-96 text-stone/5 z-0 pointer-events-none"
          >
            <Compass className="w-full h-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center gap-4 mb-8"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              02 // The Insight Doctrine
            </span>
          </motion.div>
          
          <h2 className="relative z-10 text-fluid-h2 font-sans font-bold text-paper mb-6 tracking-tight leading-tight">
            The Insight<br/>Doctrine.
          </h2>
        </div>

        {/* Right Column: Editorial Manifesto */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl text-paper/90 font-medium leading-relaxed mb-10 tracking-tight"
          >
            We operate on a singular premise: significant wealth demands engineered defense. 
            A standard policy is a reactive document. At Insight, we build proactive, trusted structures designed to secure your legacy against unforeseen risk.
          </motion.p>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-t border-paper/10 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-stone/5 flex items-center justify-center mb-6 border border-stone/10">
                <Scale className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-bold text-paper mb-3 uppercase tracking-wide">Fiduciary Precision</h4>
              <p className="text-paper/70 leading-relaxed font-medium">
                Our independence is our greatest asset. Representing over 50 elite carriers allows us to bypass legacy constraints and construct a portfolio matrix that exactly matches your unique exposure footprint.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col relative"
            >
              {/* Desktop subtle vertical divider */}
              <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-[1px] bg-paper/10" />
              
              <div className="w-12 h-12 rounded-lg bg-stone/5 flex items-center justify-center mb-6 border border-stone/10">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-bold text-paper mb-3 uppercase tracking-wide">Claims Concierge</h4>
              <p className="text-paper/70 leading-relaxed font-medium">
                When unexpected events interrupt your life or business, our entire infrastructure pivots to provide immediate, trusted support. We handle the friction of claims so you retain absolute peace of mind.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
