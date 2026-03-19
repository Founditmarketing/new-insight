import { motion } from 'motion/react';
import { Home, Car, Droplets, Wind, Briefcase, Anchor, Heart, ShieldAlert, Umbrella } from 'lucide-react';

const services = [
  { id: 'home', title: 'High-Value Home', icon: Home, statement: 'Safeguarding your most significant sanctuary with precision.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' },
  { id: 'auto', title: 'Premium Auto', icon: Car, statement: 'Coverage that respects the engineering of your vehicles.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'flood', title: 'Flood & Water', icon: Droplets, statement: 'Essential defense against Louisiana\'s rising tides.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'hurricane', title: 'Named Storm', icon: Wind, statement: 'Resilience engineered for the Gulf Coast reality.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
  { id: 'commercial', title: 'Commercial Enterprise', icon: Briefcase, statement: 'Protecting the legacy of local business builders.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  { id: 'marine', title: 'Marine & Watercraft', icon: Anchor, statement: 'Navigating risk on the open water.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'life', title: 'Life & Legacy', icon: Heart, statement: 'Securing the generational transfer of wealth.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'surety', title: 'Surety Bonds', icon: ShieldAlert, statement: 'Guaranteeing performance and trust.', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { id: 'umbrella', title: 'Excess Liability', icon: Umbrella, statement: 'The ultimate safety net for complex portfolios.', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
];

export function ServicesGrid() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-stone relative overflow-hidden">
      {/* Subtle background gradient for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-paper to-stone opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-fluid-h2 font-serif mb-6 overflow-hidden py-2">
            <motion.span 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              The Architecture of Protection
            </motion.span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-ink/60 font-light leading-relaxed"
          >
            We do not sell policies; we engineer defensive structures around your assets. 
            Our methodology is precise, bespoke, and uncompromising.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px] bento-container">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between glass-bento ${service.colSpan} ${service.rowSpan}`}
            >
              {service.image && (
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-15 transition-opacity duration-700 mix-blend-luminosity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              
              <div className="relative z-10">
                <service.icon className="w-6 h-6 mb-6 text-accent group-hover:text-ink transition-colors duration-500" />
                <h3 className="text-2xl font-serif mb-3 text-ink">{service.title}</h3>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm text-ink/60 font-medium tracking-wide uppercase group-hover:text-ink/80 transition-colors duration-500">
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
