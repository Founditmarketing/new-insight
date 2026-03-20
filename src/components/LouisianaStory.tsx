import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Car, Briefcase, ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: 'home',
    title: 'High-Value Home',
    icon: Home,
    description: 'Safeguarding your most significant sanctuary with absolute precision. Designed specifically for properties exceeding $2M in replacement cost, shielding you against Gulf Coast wind, water, and catastrophic loss.',
    stat: 'Unlimited',
    statLabel: 'Rebuilding Cost Guarantees'
  },
  {
    id: 'auto',
    title: 'Premium Auto',
    icon: Car,
    description: 'Coverage that respects the engineering of your vehicles. Securing your luxury fleets, secondary collections, and high-performance assets against liability and depreciative loss across all Louisiana parishes.',
    stat: 'Agreed Value',
    statLabel: 'Settlement protocols'
  },
  {
    id: 'commercial',
    title: 'Commercial Entity',
    icon: Briefcase,
    description: 'Protecting the legacy of local business builders. Comprehensive proactive liability, property, and operational continuity for complex enterprises from Alexandria to Slidell.',
    stat: '360°',
    statLabel: 'Risk Architecture'
  }
];

export function LouisianaStory() {
  // Default to the first pillar being open
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="story" className="py-24 md:py-32 bg-[#050505] text-paper relative overflow-hidden flex flex-col justify-center min-h-screen border-t-[1px] border-white/5">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 mb-16 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex items-center gap-4 mb-6"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
            01 // The Obsidian Pillars
          </span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-fluid-h2 font-sans font-bold tracking-tight max-w-2xl leading-[1.1]">
            Absolute <span className="text-accent italic font-serif opacity-90">Protection,</span> regardless of the altitude.
          </h2>
          <p className="text-paper/50 max-w-sm text-sm uppercase tracking-widest font-semibold pb-2">
            Hover to evaluate our three core structural defense mechanisms.
          </p>
        </div>
      </div>

      {/* Kinetic Accordion Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 h-[600px] flex flex-col md:flex-row gap-4 lg:gap-6 relative z-20">
        {pillars.map((pillar, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={pillar.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              initial={{ borderRadius: 24 }}
              animate={{ 
                flex: hoveredIndex === null ? 1 : (isHovered ? 3 : 1),
              }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className={`relative h-full overflow-hidden cursor-pointer group flex flex-col rounded-3xl border border-white/5 transition-all duration-500
                ${isHovered ? 'bg-[#0A0A0A] border-accent/30 shadow-[0_0_80px_rgba(227,38,54,0.08)]' : 'bg-white/[0.02]'}
              `}
            >
              {/* Internal glowing gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-accent/20 via-accent/5 to-transparent opacity-0 mix-blend-plus-lighter pointer-events-none"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              />

              <div className="flex flex-col justify-between h-full p-8 relative z-10">
                
                {/* Icon & Title Row */}
                <div className="flex items-center md:items-start gap-5 flex-row md:flex-col lg:flex-row">
                  <motion.div 
                    layout="position"
                    className={`shrink-0 p-5 rounded-full border transition-colors duration-500
                      ${isHovered ? 'bg-accent/10 border-accent/40 text-accent shadow-[0_0_30px_rgba(227,38,54,0.3)]' : 'bg-white/5 border-white/10 text-paper/40'}
                    `}
                  >
                    <pillar.icon className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1.5} />
                  </motion.div>
                  
                  <motion.h3 
                    layout="position"
                    className={`text-2xl lg:text-3xl font-bold font-sans tracking-tight mt-0 md:mt-4 lg:mt-0 transition-colors duration-500 whitespace-nowrap
                      ${isHovered ? 'text-paper' : 'text-paper/40'}
                    `}
                  >
                    {pillar.title}
                  </motion.h3>
                </div>

                {/* Content Reveal */}
                <AnimatePresence mode="popLayout">
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mt-8 flex flex-col gap-8 h-full justify-end"
                    >
                      <p className="text-paper/70 font-serif text-lg lg:text-xl leading-relaxed max-w-md">
                        {pillar.description}
                      </p>
                      
                      <div className="flex items-end justify-between border-t border-white/10 pt-8">
                        <div>
                          <div className="text-4xl font-bold font-sans text-accent tracking-tighter">{pillar.stat}</div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-paper/40 mt-2 font-bold">{pillar.statLabel}</div>
                        </div>
                        
                        <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors group/btn">
                          <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </section>
  );
}
