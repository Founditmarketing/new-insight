import { motion } from 'motion/react';
import { Home, Car, Droplets, Wind, Briefcase, Anchor, Heart, ShieldAlert, Umbrella, ArrowRight } from 'lucide-react';

const flagshipServices = [
  { 
    id: 'home', 
    title: 'High-Value Home', 
    icon: Home, 
    statement: 'Safeguarding your most significant sanctuary with absolute precision. Designed specifically for properties exceeding $2M in replacement cost.',
    theme: 'text-paper',
    iconTheme: 'bg-stone/10 text-paper backdrop-blur-md border border-stone/20 group-hover:bg-accent group-hover:border-accent group-hover:text-ink',
    accent: 'text-accent',
    image: '/images/home_flagship.png'
  },
  { 
    id: 'commercial', 
    title: 'Commercial Entity', 
    icon: Briefcase, 
    statement: 'Protecting the legacy of local business builders. Comprehensive liability, property, and operational continuity for complex enterprises.',
    theme: 'text-paper',
    iconTheme: 'bg-stone/10 text-paper backdrop-blur-md border border-stone/20 group-hover:bg-accent group-hover:border-accent group-hover:text-ink',
    accent: 'text-accent',
    image: '/images/commercial_flagship.png'
  }
];

const standardServices = [
  { id: 'auto', title: 'Premium Auto', icon: Car, statement: 'Coverage that respects the engineering of your vehicles.' },
  { id: 'flood', title: 'Flood & Water', icon: Droplets, statement: 'Essential defense against Louisiana\'s rising tides.' },
  { id: 'hurricane', title: 'Named Storm', icon: Wind, statement: 'Resilience engineered for the Gulf Coast reality.' },
  { id: 'marine', title: 'Marine Portfolio', icon: Anchor, statement: 'Navigating risk comprehensively on the open water.' },
  { id: 'life', title: 'Life & Legacy', icon: Heart, statement: 'Securing the generational transfer of wealth safely.' },
  { id: 'surety', title: 'Surety Bonds', icon: ShieldAlert, statement: 'Guaranteeing performance, compliance, and trust.' },
  { id: 'umbrella', title: 'Excess Liability', icon: Umbrella, statement: 'The ultimate overarching net for complex portfolios.' },
];

export function ServicesGrid() {
  return (
    <section id="services" className="py-16 px-6 md:px-12 lg:px-24 bg-stone relative overflow-hidden border-t-[8px] border-accent">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              02 // Core Competencies
            </span>
          </motion.div>

          <h2 className="text-fluid-h2 font-sans mb-6 text-ink tracking-tight overflow-hidden pb-4">
            <motion.span 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block pt-2 -mt-2"
            >
              Specialized Portfolios
            </motion.span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-ink/70 font-medium leading-relaxed max-w-2xl"
          >
            Our methodology is precise, bespoke, and uncompromising. We align world-class insurance instruments to match your exact risk profile.
          </motion.p>
        </div>

        {/* Flagship Services (Top Tier) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {flagshipServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden flex flex-col justify-between p-8 md:p-14 min-h-[400px] cursor-pointer rounded-xl border border-slate/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-institutional ${service.theme}`}
            >
              {/* Image Background with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/20 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10" />
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-10 transition-colors duration-500 ${service.iconTheme}`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 tracking-tight drop-shadow-md">{service.title}</h3>
                  <p className="text-lg opacity-90 font-medium leading-relaxed max-w-md drop-shadow-sm">
                    {service.statement}
                  </p>
                </div>

                <div className={`mt-12 flex items-center text-sm font-bold tracking-widest uppercase transition-all duration-300 opacity-80 group-hover:opacity-100 ${service.accent}`}>
                  Explore Strategy <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standard Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min md:auto-rows-[260px]">
          {standardServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.05), ease: [0.16, 1, 0.3, 1] }}
              className="group trust-card bg-gradient-to-br from-paper to-stone p-8 flex flex-col justify-between min-h-[260px] md:min-h-0 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden rounded-xl border border-slate/10 border-t-4 border-t-slate/5 hover:border-t-accent"
            >
              {/* Subtle top gradient texture and corner geometry */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate/5 rounded-bl-[100px] -z-10 group-hover:scale-150 group-hover:bg-accent/5 transition-all duration-700 ease-out" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/5 flex items-center justify-center border border-accent/20 group-hover:bg-accent/15 group-hover:border-accent/40 transition-colors duration-500">
                      <service.icon className="w-6 h-6 text-accent/80 group-hover:text-accent font-bold transition-colors duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-ink tracking-tight group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-ink/70 font-medium leading-relaxed">
                    {service.statement}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-xs font-bold tracking-widest text-accent uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
