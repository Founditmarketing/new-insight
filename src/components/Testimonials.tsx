import { motion } from 'motion/react';
import { Quote, ArrowRight } from 'lucide-react';

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
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-paper text-ink relative overflow-hidden border-t border-slate/10">
      <div className="max-w-7xl mx-auto flex flex-col h-full justify-between">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 border-b border-slate/10 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              06 // Client Relations
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold tracking-widest uppercase text-ink/50 hover:text-accent cursor-pointer transition-colors flex items-center group"
          >
            View Private Case Studies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mt-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col justify-between"
            >
              <Quote className="absolute top-0 left-0 w-16 h-16 text-slate/5 -translate-x-4 -translate-y-6 z-0" />
              
              <div className="relative z-10 flex-grow">
                <p className="text-xl md:text-2xl font-bold leading-relaxed tracking-tight text-ink mb-10">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-5 mt-auto pt-8 border-t border-slate/10">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate/10 grayscale opacity-80"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-base text-ink uppercase tracking-wide">
                    {testimonial.author}
                  </span>
                  <span className="font-semibold text-xs text-slate tracking-widest uppercase mt-1">
                    {testimonial.entity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
