import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Car, Droplets, Wind, Briefcase, Anchor, Heart, ShieldAlert, Umbrella, ArrowRight, Laptop } from 'lucide-react';
import { ClientPortalModal } from './ClientPortalModal';

const services = [
  // ROW 1 & 2
  { 
    id: 'home', 
    title: 'Home', 
    icon: Home, 
    statement: 'Your home is probably your biggest investment. We\'ll make sure it\'s covered the right way — not just the cheapest way. We look at replacement cost, storm exposure, and what actually matters to your family.',
    spanClass: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
    iconBg: 'bg-ink/5',
    iconColor: 'text-ink group-hover:text-accent transition-colors'
  },
  { 
    id: 'commercial', 
    title: 'Business', 
    icon: Briefcase, 
    statement: 'Whether you run a small business across Louisiana or manage operations along the Gulf Coast, we\'ll find the right liability and property coverage so you can focus on your work.',
    spanClass: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
    iconBg: 'bg-ink/5',
    iconColor: 'text-ink group-hover:text-accent transition-colors'
  },
  // ROW 3
  { 
    id: 'auto', 
    title: 'Auto', 
    icon: Car, 
    statement: 'We\'ll find you solid auto coverage and walk you through what you\'re actually paying for.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  { 
    id: 'marine', 
    title: 'Boats & Marine', 
    icon: Anchor, 
    statement: 'Pontoon, bass boat, or something bigger — we can write a policy for it.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  { 
    id: 'flood', 
    title: 'Flood & Water', 
    icon: Droplets, 
    statement: 'In Louisiana, flood insurance isn\'t optional. We\'ll help you sort through NFIP and private options.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  { 
    id: 'hurricane', 
    title: 'Named Storm', 
    icon: Wind, 
    statement: 'Hurricane season is part of life here. We make sure your policy is ready for it.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  // ROW 4
  { 
    id: 'life', 
    title: 'Life & Legacy', 
    icon: Heart, 
    statement: 'Nobody likes thinking about this stuff, but the people you love will be glad you did.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  // Marine occupies this slot in Row 4 natively due to grid-auto-flow: dense or explicit placement,
  // Actually CSS Grid `grid-auto-flow: dense` handles the packing perfectly!
  { 
    id: 'surety', 
    title: 'Surety Bonds', 
    icon: ShieldAlert, 
    statement: 'Need a Performance or Bid Bond? We work with contractors every day to get these done right.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
  { 
    id: 'umbrella', 
    title: 'Excess Liability', 
    icon: Umbrella, 
    statement: 'Extra protection that kicks in when your other policies max out. Worth a conversation.',
    spanClass: 'col-span-1 row-span-1',
    iconBg: 'bg-slate/10',
    iconColor: 'text-slate'
  },
];

function BentoCard({ service, index, onClick }: { service: typeof services[0]; index: number; onClick?: () => void; key?: string | number }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between border border-ink/[0.03] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(227,38,54,0.08)] hover:-translate-y-1 transition-all duration-[0.4s] ease-out ${service.spanClass} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Soft Gradient Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Dynamic Icon */}
      <div className={`p-4 rounded-2xl w-fit transition-transform duration-500 ease-out group-hover:-translate-y-1 ${service.iconBg}`}>
        <service.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${service.iconColor}`} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="mt-12 relative z-10">
        <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-ink mb-3 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className={`text-slate/80 font-medium leading-relaxed ${service.spanClass.includes('row-span-2') ? 'text-base lg:text-lg' : 'text-sm'}`}>
          {service.statement}
        </p>
      </div>

      {/* Aesthetic Tracking Line */}
      <div className="absolute top-0 right-0 w-16 h-[2px] bg-accent/20 opacity-0 group-hover:opacity-100 group-hover:w-32 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      
      {/* Accent Reveal Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </motion.div>
  );
}

export function ServicesGrid({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden border-t-[8px] border-accent">
      
      {/* Decorative architectural watermarks */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
                02 // What We Cover
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-fluid-h2 font-sans font-bold text-ink tracking-tight leading-[1.1]"
            >
              Coverage that fits <span className="text-accent italic font-serif opacity-90">your life.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <button onClick={onOpenQuote} className="bg-white border border-slate/10 text-ink px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:border-accent hover:text-accent transition-colors shadow-sm cursor-pointer group">
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* The Vanguard Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-4 md:gap-6 grid-flow-row-dense">
          {services.map((service, index) => (
            <BentoCard 
              key={service.id} 
              service={service} 
              index={index} 
              onClick={service.id === 'portal' ? () => setIsPortalOpen(true) : undefined} 
            />
          ))}
        </div>

      </div>

      <ClientPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </section>
  );
}
