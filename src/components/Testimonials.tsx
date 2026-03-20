import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';

const reviewsRow1 = [
  { id: 1, author: "Michael T.", entity: "Alexandria, LA", text: "Saved us over $2,000 a year with significantly better coverage. The team is hyper-responsive.", stars: 5 },
  { id: 2, author: "Sarah J.", entity: "Ponchatoula, LA", text: "Handled our claim immediately after the storm while everyone else was stuck on 1-800 numbers.", stars: 5 },
  { id: 3, author: "David M.", entity: "Slidell, LA", text: "Insight transformed our commercial liability architecture. True partners in Louisiana.", stars: 5 },
  { id: 4, author: "Robert C.", entity: "Pineville, LA", text: "Unmatched expertise in high-value home insurance. They caught critical gaps my old captive agent completely missed.", stars: 5 },
];

const reviewsRow2 = [
  { id: 5, author: "Amanda L.", entity: "Mandeville, LA", text: "Their preventative risk audits for our coastal property were eye-opening. Exceptional, world-class service.", stars: 5 },
  { id: 6, author: "James W.", entity: "Baton Rouge, LA", text: "We moved our entire corporate fleet over. The premium savings and executive service level are night and day.", stars: 5 },
  { id: 7, author: "Elena R.", entity: "Hammond, LA", text: "A breath of fresh air. They actually answer the phone and know exactly who you are. Best agency on the Northshore.", stars: 5 },
  { id: 8, author: "Thomas K.", entity: "Covington, LA", text: "Secured our historic estate perfectly. The onboarding process was seamless, transparent, and incredibly professional.", stars: 5 },
];

const reviewsRow3 = [
  { id: 9, author: "William P.", entity: "Natchitoches, LA", text: "Insight engineered a massive umbrella policy for our portfolio. I finally sleep well during hurricane season.", stars: 5 },
  { id: 10, author: "Jessica H.", entity: "Alexandria, LA", text: "The team locally here in Alex is world-class. They treat your assets like their own.", stars: 5 },
  { id: 11, author: "Brian D.", entity: "Slidell, LA", text: "Incredible marine portfolio structuring. Absolutely dialed in to the reality of operating heavily in the Gulf.", stars: 5 },
  { id: 12, author: "Karen S.", entity: "Ponchatoula, LA", text: "Switched all our policies over last year. Unbeatable value and true white-glove concierge service from day one.", stars: 5 },
];

function ReviewCard({ review }: { review: any; key?: string | number }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[420px] whitespace-normal bg-white rounded-2xl p-6 md:p-8 border border-slate/10 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] mx-3 group hover:shadow-[0_30px_60px_-15px_rgba(227,38,54,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer relative z-10 hover:z-50 bg-opacity-90 backdrop-blur-xl flex flex-col justify-between min-h-[260px]">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="font-serif italic text-ink/80 text-lg md:text-xl leading-relaxed mb-6">
        "{review.text}"
      </p>
      <div className="mt-auto flex items-center gap-4 border-t border-slate/10 pt-4">
        <div className="w-10 h-10 rounded-full bg-slate/10 flex flex-shrink-0 items-center justify-center font-bold text-ink">
          {review.author.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-ink tracking-tight uppercase text-sm">
            {review.author}
          </span>
          <span className="font-semibold text-xs text-slate tracking-widest uppercase">
            {review.entity}
          </span>
        </div>
      </div>
    </div>
  );
}

// A single marquee row that duplicates its children for infinite scrolling
function MarqueeRow({ reviews, reverse = false }: { reviews: any[], reverse?: boolean }) {
  // Duplicate the array to ensure we have enough content to scroll infinitely (creates the illusion of an endless loop)
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];
  
  return (
    <div className="relative flex overflow-hidden group">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused] py-4`}>
        {duplicatedReviews.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#F8F9FA] text-ink relative overflow-hidden">
      
      {/* Background Architectural Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8">
          
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono bg-accent/5 px-3 py-1 rounded-full border border-accent/20">
                05 // Proof of Architecture
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-fluid-h2 font-sans font-bold text-ink tracking-tight leading-[1.1]"
            >
              Over 100 <span className="text-accent italic font-serif">5-Star</span> Verifications.
            </motion.h2>
          </div>

          <motion.a 
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold tracking-widest uppercase text-white hover:bg-ink/90 cursor-pointer transition-colors flex items-center group bg-ink px-6 py-4 rounded-full shadow-lg"
          >
            Read All Google Reviews <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* The Draggable Marquee Matrix! */}
      <div className="relative w-full overflow-hidden flex flex-col gap-2 z-10 py-4 pb-12">
        {/* Soft edge masks to fade out the scrolling cards at screen edges */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F8F9FA] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F8F9FA] to-transparent z-20 pointer-events-none" />
        
        <MarqueeRow reviews={reviewsRow1} />
        <MarqueeRow reviews={reviewsRow2} reverse={true} />
        <MarqueeRow reviews={reviewsRow3} />
      </div>

    </section>
  );
}
