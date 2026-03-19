import { motion } from 'motion/react';

export function Philosophy() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Left Column: Title & Methodology */}
        <div className="w-full lg:w-1/3 flex flex-col shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-sm font-bold tracking-wide uppercase text-accent">
              Our Methodology
            </span>
          </motion.div>
          
          <h2 className="text-fluid-h2 font-sans font-bold text-paper mb-6 tracking-tight leading-tight">
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
            className="text-2xl md:text-3xl text-paper/90 font-medium leading-relaxed mb-12 tracking-tight"
          >
            We operate on a singular premise: complex wealth demands engineered defense. 
            A standard policy is a reactive document. At Insight, we build proactive architectural structures designed to immunize your legacy against absolute ruin.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-paper/10 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-lg font-bold text-accent mb-3 uppercase tracking-wide">Fiduciary Precision</h4>
              <p className="text-paper/70 leading-relaxed font-medium">
                Our independence is our greatest asset. Representing over 50 elite carriers allows us to bypass legacy constraints and construct a portfolio matrix that exactly matches your unique exposure footprint.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-lg font-bold text-accent mb-3 uppercase tracking-wide">Claims Concierge</h4>
              <p className="text-paper/70 leading-relaxed font-medium">
                When disaster violently interrupts your life or business, our entire infrastructure pivots to rapid stabilization. We handle the friction of claims so you don't break stride.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
