import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { CTA } from '../components/CTA';
import { Testimonials } from '../components/Testimonials';

const cityData: Record<string, any> = {
  alexandria: {
    name: 'Alexandria',
    headline: 'Generational Wealth Structuring in Alexandria, LA',
    subheadline: 'Providing robust commercial continuity and legacy asset protection in the heart of Louisiana.',
    image: '/images/alexandria.png',
    focus: 'Classic Estates & Commercial Enterprise'
  },
  ponchatoula: {
    name: 'Ponchatoula',
    headline: 'High-Value Asset Protection in Ponchatoula',
    subheadline: 'Safeguarding historic properties and local enterprise with tailored, uncompromising risk architecture.',
    image: '/images/ponchatoula.png',
    focus: 'Historic Properties & Local Industry'
  },
  slidell: {
    name: 'Slidell',
    headline: 'Coastal Risk & Marine Portfolios in Slidell',
    subheadline: 'Engineering resilient coastal defense protocols for waterfront estates, marine assets, and Gulf industry.',
    image: '/images/slidell.png',
    focus: 'Waterfront Estates & Marine Portfolios'
  }
};

export function CityPage({ onOpenQuote }: { onOpenQuote: () => void }) {
  const { city } = useParams();
  
  if (!city || !cityData[city]) {
    return <Navigate to="/" replace />;
  }

  const data = cityData[city];

  return (
    <div className="bg-paper min-h-screen pt-32">
      
      {/* Navigation Back */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-ink/60 hover:text-accent font-bold tracking-widest uppercase text-xs transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Headquarters
        </Link>
      </div>

      {/* SEO Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold tracking-widest uppercase text-accent">
                Local Expertise: {data.name}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-8">
              {data.headline.split(data.name)[0]}
              <span className="text-accent italic font-serif">
                {data.name}
              </span>
            </h1>
            
            <p className="text-lg text-ink/70 font-medium leading-relaxed mb-10 max-w-xl">
              {data.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onOpenQuote}
                className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-ink transition-colors shadow-institutional shadow-[0_0_30px_rgba(227,38,54,0.3)]"
              >
                Get a Local Quote
              </button>
              <button className="border-2 border-slate/20 bg-transparent text-ink px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:border-ink transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> (318) 555-0123
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] object-cover shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
          >
            <div className="absolute inset-0 bg-ink/10 mix-blend-overlay z-10" />
            <img 
              src={data.image} 
              alt={`Landmark in ${data.name}, Louisiana`}
              className="w-full h-full object-cover"
            />
            
            {/* Trust Badge overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl z-20 shadow-xl border border-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-ink uppercase tracking-wide text-sm mb-1">Regional Focus</h4>
                  <p className="text-xs font-mono text-slate/80">{data.focus}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Components to maintain trust */}
      <Testimonials />
      <CTA onOpenQuote={onOpenQuote} />

    </div>
  );
}
