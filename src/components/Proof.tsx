import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Phone, MapPin, ChevronDown } from 'lucide-react';

const offices = [
  { id: 'alexandria', name: 'Alexandria', phone: '(318) 561-8000', phoneRaw: '3185618000', description: 'Central Louisiana' },
  { id: 'ponchatoula', name: 'Ponchatoula', phone: '(985) 242-4300', phoneRaw: '9852424300', description: 'Tangipahoa Parish' },
  { id: 'slidell', name: 'Slidell', phone: '(985) 643-3304', phoneRaw: '9856433304', description: 'St. Tammany Parish' },
];

function AdvisorCallButton() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_25px_rgba(227,38,54,0.35)] group"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Talk to an Advisor
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Location Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 bg-ink/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50"
          >
            {/* Arrow pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-ink/95 border-r border-b border-white/15 rotate-45" />

            <div className="p-2">
              <p className="text-[10px] font-bold tracking-widest uppercase text-paper/30 px-3 py-2">
                Select your nearest office
              </p>
              {offices.map((office) => (
                <a
                  key={office.id}
                  href={`tel:${office.phoneRaw}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-3 py-3.5 rounded-lg hover:bg-accent/20 hover:border-accent/30 border border-transparent transition-all duration-200 group/item"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/30 transition-colors">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="font-bold text-sm text-paper group-hover/item:text-accent transition-colors">{office.name}</div>
                    <div className="text-paper/40 text-xs font-medium">{office.description}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-paper/50 text-xs font-bold flex-shrink-0 group-hover/item:text-accent transition-colors">
                    <Phone className="w-3 h-3" />
                    <span>{office.phone}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Proof() {
  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-ink text-paper relative overflow-hidden">
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

          {/* Single CTA — location picker call button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <AdvisorCallButton />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
