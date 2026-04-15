import { motion, animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function Proof() {
  return (
    <div className="flex flex-col">
      
      {/* When Things Go Wrong section — narrative only, no stats */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
        {/* Subtle background abstract element */}
        <div className="absolute inset-0 bg-accent/5 skew-y-12 scale-150 transform-gpu opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              04 // When It Matters Most
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-fluid-h3 font-sans font-bold tracking-tight text-paper"
            >
              When Things Go Wrong, We're Here.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-paper/70 font-medium leading-relaxed"
            >
              When you file a claim, you shouldn't have to deal with a 1-800 number and endless hold music. 
              Our team picks up the phone, walks you through it, and advocates on your behalf. 
              That's the whole point of having a local agent.
            </motion.p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
              className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_20px_rgba(227,38,54,0.3)] flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Talk to Our Team
            </button>
            <span className="text-paper/40 text-xs font-bold tracking-widest uppercase">or call (318) 561-8000</span>
          </div>
        </div>
      </section>

    </div>
  );
}
