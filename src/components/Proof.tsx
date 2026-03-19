import { motion } from 'motion/react';

export function Proof() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-paper border-t border-ink/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* The Independent Advantage */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-medium tracking-widest uppercase text-accent mb-8"
            >
              The Independent Advantage
            </motion.h2>
            
            <h3 className="text-fluid-h3 font-sans font-bold text-ink mb-8 overflow-hidden pb-4 tracking-tight">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block pt-2 -mt-2"
              >
                The math of 50+ elite carriers.
              </motion.span>
            </h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-ink/70 font-light leading-relaxed mb-12"
            >
              Captive agents are bound to a single provider, forcing your unique life into their rigid boxes. 
              As an independent firm, Insight Insurance leverages relationships with over 50 elite carriers. 
              We don't work for them; we work for you. We analyze the market, negotiate terms, and construct 
              a portfolio that offers maximum coverage with absolute efficiency.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-8 items-center"
            >
              {/* Carrier Logos */}
              {[
                { id: 'chubb', url: 'https://logo.clearbit.com/chubb.com', name: 'Chubb' },
                { id: 'pure', url: 'https://logo.clearbit.com/pureinsurance.com', name: 'PURE' },
                { id: 'cincinnati', url: 'https://logo.clearbit.com/cinfin.com', name: 'Cincinnati' },
                { id: 'travelers', url: 'https://logo.clearbit.com/travelers.com', name: 'Travelers' },
                { id: 'aig', url: 'https://logo.clearbit.com/aig.com', name: 'AIG' },
                { id: 'progressive', url: 'https://logo.clearbit.com/progressive.com', name: 'Progressive' }
              ].map((carrier) => (
                <div key={carrier.id} className="w-full h-12 flex justify-start items-center">
                  <img 
                    src={carrier.url} 
                    alt={carrier.name} 
                    className="max-h-8 max-w-[120px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.setAttribute('data-fallback', carrier.name);
                      e.currentTarget.parentElement?.classList.add('after:content-[attr(data-fallback)]', 'after:text-lg', 'after:font-bold', 'after:text-ink/50', 'after:tracking-wider');
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Our Impact */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-medium tracking-widest uppercase text-accent mb-8"
            >
              Our Impact
            </motion.h2>
            
            <h3 className="text-fluid-h3 font-sans font-bold text-ink mb-8 overflow-hidden pb-4 tracking-tight">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block pt-2 -mt-2"
              >
                Human-Centric Claims.
              </motion.span>
            </h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-ink/70 font-light leading-relaxed mb-12"
            >
              When the unthinkable happens, you don't need a 1-800 number; you need a partner. 
              Our 'friend in the business' promise means we stand between you and the bureaucracy. 
              We advocate, we expedite, and we ensure that the protection you purchased performs 
              exactly as engineered.
            </motion.p>

            <div className="grid grid-cols-2 gap-12 border-t border-ink/10 pt-12">
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "$140M", label: "Assets Protected" },
                { value: "10k+", label: "Claims Managed" },
                { value: "98%", label: "Client Retention" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-5xl font-bold mb-3 text-accent inline-block tracking-tight">{stat.value}</div>
                  <div className="text-sm font-semibold tracking-wide uppercase text-ink/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
