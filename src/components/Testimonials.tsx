import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Insight didn't just review our policies; they audited our entire risk profile and rebuilt it. The level of institutional precision is simply unmatched in Louisiana.",
    author: "Jameson H.",
    entity: "Managing Partner, Commercial Real Estate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "After the hurricane, while everyone else was fighting call centers, our Insight concierge had an elite mitigation team on-site in hours. Absolute peace of mind.",
    author: "Eleanor S.",
    entity: "Private Wealth Client, Alexandria",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "The strategic depth at which they operate is extraordinary. They handle our corporate liability, marine assets, and personal estates with absolute structural continuity.",
    author: "Marcus T.",
    entity: "CEO, Gulf Coast Maritime",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-paper text-ink relative overflow-hidden border-t border-slate/10">
      <div className="max-w-7xl mx-auto flex flex-col h-full justify-between">
        
        <div className="flex justify-between items-end mb-16 border-b border-slate/10 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-sm font-bold tracking-wide uppercase text-accent">
              Client Relations
            </span>
          </motion.div>

          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-slate/20 flex items-center justify-center text-ink hover:bg-ink hover:text-stone hover:border-ink transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-slate/20 flex items-center justify-center text-ink hover:bg-ink hover:text-stone hover:border-ink transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[350px] md:min-h-[280px] w-full flex items-center mt-8">
          <Quote className="absolute top-0 left-0 w-32 h-32 text-slate/5 -translate-x-8 -translate-y-12 z-0" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-ink max-w-5xl mb-12">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center gap-6">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate/10 grayscale"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-ink uppercase tracking-wide">
                    {testimonials[currentIndex].author}
                  </span>
                  <span className="font-semibold text-sm text-slate tracking-widest uppercase mt-1">
                    {testimonials[currentIndex].entity}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}
