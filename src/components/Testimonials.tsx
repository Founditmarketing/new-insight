import { motion } from 'motion/react';
import { Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Cory and the team in Alexandria completely overhauled our coverage. We were with a captive agent for years and didn't realize how much we were overpaying until Insight shopped our home and auto. Saved us over $2,000 a year with better coverage.",
    author: "Michael T.",
    entity: "Local Homeowner, Alexandria",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Robbie in the Ponchatoula office is phenomenal. After the storms, while everyone else was fighting 1-800 numbers, they were responsive and got our claim handled immediately. It’s rare to find an agency that genuinely cares about their clients like this.",
    author: "Sarah J.",
    entity: "Private Client, Ponchatoula",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "Allen and his entire team have been handling our commercial policies for our business. They made the complex world of liability completely painless. Highly recommend Insight if you want a true partner in Louisiana.",
    author: "David M.",
    entity: "Local Business Owner",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-paper text-ink relative overflow-hidden border-t border-slate/10">
      <div className="max-w-7xl mx-auto flex flex-col h-full justify-between">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono">
              05 // Client Relations
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold tracking-widest uppercase text-ink/70 hover:text-accent cursor-pointer transition-colors flex items-center group bg-stone px-6 py-3 rounded-full border border-slate/10"
          >
            Review Private Case Studies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          
          {/* Featured Pull Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex flex-col justify-between bg-gradient-to-br from-stone to-slate/5 p-8 md:p-12 lg:p-16 rounded-2xl border border-slate/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay rounded-2xl pointer-events-none"></div>
            <Quote className="absolute top-10 left-10 w-40 h-40 text-accent/10 -translate-x-6 -translate-y-8 z-0 rotate-180" />
            <div className="relative z-10 flex-grow mb-16 pt-8">
              <p className="text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight text-ink font-serif italic relative">
                <span className="text-5xl text-accent absolute -left-8 md:-left-12 -top-4 font-sans">"</span>
                {testimonials[0].quote}
                <span className="text-5xl text-accent absolute -bottom-8 font-sans">"</span>
              </p>
            </div>
            <div className="flex items-center gap-6 md:gap-8 mt-auto relative z-10">
              <img 
                src={testimonials[0].image} 
                alt={testimonials[0].author}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-[6px] border-paper shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              />
              <div className="flex flex-col border-l-2 border-accent pl-6">
                <span className="font-bold text-xl md:text-2xl text-ink uppercase tracking-wide">
                  {testimonials[0].author}
                </span>
                <span className="font-semibold text-sm md:text-base text-accent tracking-widest uppercase mt-1">
                  {testimonials[0].entity}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Stack - Staggered */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-center h-full relative">
            {/* Ambient connecting line */}
            <div className="hidden lg:block absolute left-[-3rem] top-1/4 bottom-1/4 w-[1px] bg-slate/10" />

            {[testimonials[1], testimonials[2]].map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.15), ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col justify-between p-8 md:p-10 bg-paper hover:bg-stone/30 rounded-xl border border-slate/10 transition-colors shadow-sm ${i === 1 ? 'lg:ml-12' : 'lg:-ml-6'} z-10`}
              >
                <div className="relative z-10 flex-grow mb-8">
                  <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight text-ink/80 font-serif italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-auto">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-[3px] border-slate/10 shadow-sm"
                  />
                  <div className="flex flex-col border-l border-slate/20 pl-4">
                    <span className="font-bold text-sm md:text-base text-ink uppercase tracking-wide">
                      {testimonial.author}
                    </span>
                    <span className="font-semibold text-xs py-1 text-slate tracking-widest uppercase mt-0.5">
                      {testimonial.entity}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
}
