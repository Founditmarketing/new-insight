import { motion, animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function AnimatedStat({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-flex">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function Proof() {
  return (
    <div className="flex flex-col">
      
      {/* Stats Section */}
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
              04 // Our Track Record
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <h3 className="text-fluid-h3 font-sans font-bold tracking-tight text-paper">
              When Things Go Wrong, We’re Here.
            </h3>
            <p className="text-lg text-paper/70 font-medium leading-relaxed">
              When you file a claim, you shouldn’t have to deal with a 1-800 number and endless hold music. 
              We pick up the phone, walk you through it, and advocate on your behalf. 
              That’s the whole point of having a local agent.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-12 border-t border-paper/10">
            {[
              { num: 25, prefix: "", suffix: "+", label: "Years Serving Louisiana" },
              { num: 140, prefix: "$", suffix: "M", label: "In Coverage Written" },
              { num: 10, prefix: "", suffix: "k+", label: "Claims Handled" },
              { num: 98, prefix: "", suffix: "%", label: "Clients Who Stay" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col relative"
              >
                {/* 10% Accent Tab */}
                <div className="absolute -left-4 top-2 bottom-2 w-1 bg-accent/20 rounded-full" />
                <div className="text-6xl md:text-7xl font-bold mb-4 text-accent tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(227,38,54,0.3)] pl-4">
                  <AnimatedStat value={stat.num} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold tracking-widest uppercase text-paper/60 pl-4">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="tel:3185618000" className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_20px_rgba(227,38,54,0.3)] flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Talk to an Advisor
            </a>
            <span className="text-paper/40 text-xs font-bold tracking-widest uppercase">or call (318) 561-8000</span>
          </div>
        </div>
      </section>

    </div>
  );
}
