import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Umbrella } from 'lucide-react';

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
              03 // Why Independent
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <h3 className="text-fluid-h3 font-sans font-bold text-ink tracking-tight">
              We shop 50+ carriers so you don’t have to.
            </h3>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              A captive agent can only sell you their company's policy — even if it's not the best fit. 
              Because we're independent, we work with over 50 carriers to compare rates, coverage options, 
              and terms. That means better choices for you — not a one-size-fits-all product.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center pt-12 border-t border-slate/10"
          >
            {/* Chubb */}
            <div className="w-full flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">
              <span className="font-sans font-black text-3xl tracking-tighter text-[#000000]">CHUBB</span>
            </div>
            
            {/* PURE */}
            <div className="w-full flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0 mt-1">
              <span className="font-serif font-light text-3xl tracking-[0.25em] text-[#000000]">PURE</span>
            </div>

            {/* Cincinnati */}
            <div className="w-full flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">
              <div className="flex flex-col items-center leading-none">
                <span className="font-serif italic font-bold text-2xl text-[#003B71]">Cincinnati</span>
                <span className="font-sans font-bold text-[0.45rem] tracking-[0.2em] text-[#000000] mt-1">INSURANCE COMPANIES</span>
              </div>
            </div>

            {/* Travelers */}
            <div className="w-full flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0 gap-2">
              <Umbrella className="w-8 h-8 text-[#E2231A] fill-current" />
              <span className="font-sans font-black text-xl tracking-wide text-[#000000] mt-1 pt-0.5">TRAVELERS</span>
            </div>

            {/* AIG */}
            <div className="w-full flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">
              <div className="bg-[#00A4E4] px-2 py-1 flex items-center justify-center">
                <span className="font-sans font-bold text-2xl text-white">AIG</span>
              </div>
            </div>

            {/* Progressive */}
            <div className="w-full flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0 mt-1">
              <span className="font-sans font-bold italic text-2xl tracking-tighter text-[#008CC1]">PROGRESSIVE</span>
            </div>
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
        </div>
      </section>

    </div>
  );
}
