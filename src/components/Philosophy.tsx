import { motion } from 'motion/react';
import { ShieldCheck, Scale, Compass } from 'lucide-react';

export function Philosophy() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-paper text-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Title & Methodology */}
        <div className="w-full lg:w-1/3 flex flex-col shrink-0 relative">
          
          {/* Massive 10% Accent Orange Graphic Anchor */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-16 -left-16 md:-top-24 md:-left-24 text-[15rem] md:text-[20rem] font-serif text-accent/10 leading-none select-none z-0 rotate-12"
          >
            "
          </motion.div>

          {/* Solid 10% Accent Line */}
          <div className="absolute top-0 -left-6 md:-left-12 w-2 h-32 bg-accent" />

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
          
          <h2 className="relative z-10 text-fluid-h2 font-sans font-bold text-ink mb-6 tracking-tight leading-tight">
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
            className="text-2xl md:text-3xl text-ink/80 font-medium leading-relaxed mb-10 tracking-tight"
          >
            We operate on a singular premise: significant wealth demands engineered defense. 
            A standard policy is a reactive document. At Insight, we build proactive, trusted structures designed to secure your legacy against unforeseen risk.
          </motion.p>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-t border-ink/10 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <Scale className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-bold text-ink mb-3 uppercase tracking-wide">Fiduciary Precision</h4>
              <p className="text-ink/70 leading-relaxed font-medium">
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
              <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-[1px] bg-ink/10" />
              
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-bold text-ink mb-3 uppercase tracking-wide">Claims Concierge</h4>
              <p className="text-ink/70 leading-relaxed font-medium">
                When unexpected events interrupt your life or business, our entire infrastructure pivots to provide immediate, trusted support. We handle the friction of claims so you retain absolute peace of mind.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
