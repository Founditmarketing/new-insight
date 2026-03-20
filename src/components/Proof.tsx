import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

function AnimatedStat({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="inline-flex">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function Proof() {
  return (
    <div className="flex flex-col border-t border-slate/10">
      
      {/* SECTION 1: The Independent Advantage (Carriers) */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-paper">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              03 // The Independent Advantage
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <h3 className="text-fluid-h3 font-sans font-bold text-ink tracking-tight">
              The math of 50+ elite underwriting carriers.
            </h3>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              Captive agents are bound to a single provider, forcing your unique life into their rigid boxes. 
              As an independent firm, Insight Insurance leverages relationships with over 50 elite carriers. 
              We don't work for them; we work for you. We analyze the market, negotiate terms, and construct 
              a portfolio that offers maximum coverage with absolute efficiency.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center pt-12 border-t border-slate/10"
          >
            {[
              { id: 'chubb', url: 'https://logo.clearbit.com/chubb.com', name: 'Chubb' },
              { id: 'pure', url: 'https://logo.clearbit.com/pureinsurance.com', name: 'PURE' },
              { id: 'cincinnati', url: 'https://logo.clearbit.com/cinfin.com', name: 'Cincinnati' },
              { id: 'travelers', url: 'https://logo.clearbit.com/travelers.com', name: 'Travelers' },
              { id: 'aig', url: 'https://logo.clearbit.com/aig.com', name: 'AIG' },
              { id: 'progressive', url: 'https://logo.clearbit.com/progressive.com', name: 'Progressive' }
            ].map((carrier) => (
              <div key={carrier.id} className="w-full flex justify-center items-center">
                <img 
                  src={carrier.url} 
                  alt={carrier.name} 
                  className="max-h-12 max-w-[120px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.setAttribute('data-fallback', carrier.name);
                    e.currentTarget.parentElement?.classList.add('after:content-[attr(data-fallback)]', 'after:text-lg', 'after:font-bold', 'after:text-ink/40', 'after:tracking-wider');
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Our Impact (Stats) */}
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
              04 // Institutional Impact
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <h3 className="text-fluid-h3 font-sans font-bold tracking-tight">
              Human-Centric Claims Mitigation.
            </h3>
            <p className="text-lg text-paper/70 font-medium leading-relaxed">
              When the unthinkable happens, you don't need a 1-800 number; you need a partner. 
              Our 'friend in the business' promise means we stand between you and the bureaucracy. 
              We advocate, we expedite, and we ensure that the protection you purchased performs 
              exactly as engineered.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-12 border-t border-paper/10">
            {[
              { num: 25, prefix: "", suffix: "+", label: "Years of Excellence" },
              { num: 140, prefix: "$", suffix: "M", label: "Assets Protected" },
              { num: 10, prefix: "", suffix: "k+", label: "Claims Managed" },
              { num: 98, prefix: "", suffix: "%", label: "Client Retention" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="text-6xl md:text-7xl font-bold mb-4 text-accent tracking-tighter tabular-nums">
                  <AnimatedStat value={stat.num} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold tracking-widest uppercase text-paper/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
