import { motion } from 'motion/react';
import { Home, Car, Droplets, Wind, Briefcase, Anchor, Heart, ShieldAlert, Umbrella } from 'lucide-react';

const services = [
  { id: 'home', title: 'High-Value Home', icon: Home, statement: 'Safeguarding your most significant sanctuary with absolute precision.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
  { id: 'auto', title: 'Premium Auto', icon: Car, statement: 'Coverage that respects the engineering of your vehicles.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'flood', title: 'Flood & Water', icon: Droplets, statement: 'Essential defense against Louisiana\'s rising tides.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'hurricane', title: 'Named Storm', icon: Wind, statement: 'Resilience engineered for the Gulf Coast reality.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'commercial', title: 'Commercial Entity', icon: Briefcase, statement: 'Protecting the legacy of local business builders.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
  { id: 'marine', title: 'Marine Portfolio', icon: Anchor, statement: 'Navigating risk comprehensively on the open water.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'life', title: 'Life & Legacy', icon: Heart, statement: 'Securing the generational transfer of wealth safely.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'surety', title: 'Surety Bonds', icon: ShieldAlert, statement: 'Guaranteeing performance, compliance, and trust.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'umbrella', title: 'Excess Liability', icon: Umbrella, statement: 'The ultimate overarching net for complex portfolios.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
];

export function ServicesGrid() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-stone relative overflow-hidden border-t border-slate/10">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-sm font-bold tracking-wide uppercase text-accent">
              Core Competencies
            </span>
          </motion.div>

          <h2 className="text-fluid-h2 font-sans mb-6 text-ink tracking-tight overflow-hidden py-2">
            <motion.span 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`group trust-card p-8 flex flex-col justify-between ${service.colSpan} ${service.rowSpan}`}
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg bg-paper flex items-center justify-center border border-slate/10 group-hover:border-accent/20 group-hover:bg-accent/5 transition-colors">
                  <service.icon className="w-6 h-6 text-ink group-hover:text-accent transition-colors" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-ink tracking-tight">{service.title}</h3>
                <p className="text-sm text-ink/70 font-medium leading-relaxed">
                  {service.statement}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
