import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { CTA } from '../components/CTA';
import { Testimonials } from '../components/Testimonials';
import { SEO } from '../components/SEO';
import { getLocalBusinessSchema } from '../seo/structured-data';

const cityData: Record<string, any> = {
  alexandria: {
    name: 'Alexandria',
    headline: 'Insurance for Alexandria, LA',
    subheadline: 'Where it all started. We help Central Louisiana families, farms, and small businesses find the right coverage — and we\'ve been doing it for over 25 years.',
    image: '/images/alexandria.png',
    focus: 'Home, Auto & Commercial Coverage',
    phone: '(318) 561-8000',
    address: '5215 B Jackson St, Alexandria, LA 71303',
    locationIndex: 0,
    seoTitle: 'Insurance in Alexandria, LA — Home, Auto & Business',
    seoDescription: 'Independent insurance agency in Alexandria, Louisiana. Home, auto, business, and flood coverage from 50+ carriers. Call (318) 561-8000 for a free quote.',
  },
  ponchatoula: {
    name: 'Ponchatoula',
    headline: 'Insurance for Ponchatoula, LA',
    subheadline: 'Small town, big storms. We protect the historic homes, the strawberry farms, and the neighbors we see at the grocery store.',
    image: '/images/ponchatoula.png',
    focus: 'Home, Flood & Storm Coverage',
    phone: '(985) 242-4300',
    address: '1133 Hwy 51, Suite 105, Ponchatoula, LA 70454',
    locationIndex: 1,
    seoTitle: 'Insurance in Ponchatoula, LA — Home, Flood & Storm',
    seoDescription: 'Independent insurance agency in Ponchatoula, Louisiana. Home, flood, auto, and business coverage. Call (985) 242-4300 for a free quote.',
  },
  slidell: {
    name: 'Slidell',
    headline: 'Insurance for Slidell, LA',
    subheadline: 'Lake Pontchartrain on one side, the Gulf on the other. We know coastal risk because we live in it — and we build policies around it.',
    image: '/images/slidell.png',
    focus: 'Coastal, Marine & Flood Coverage',
    phone: '(985) 643-3304',
    address: '1352 7th St, Slidell, LA 70458',
    locationIndex: 2,
    seoTitle: 'Insurance in Slidell, LA — Coastal, Marine & Flood',
    seoDescription: 'Independent insurance agency in Slidell, Louisiana. Coastal, marine, flood, home, and auto coverage. Call (985) 643-3304 for a free quote.',
  }
};

export function CityPage({ onOpenQuote }: { onOpenQuote: () => void }) {
  const { city } = useParams();
  
  if (!city || !cityData[city]) {
    return <Navigate to="/" replace />;
  }

  const data = cityData[city];

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={`/locations/${city}`}
        structuredData={getLocalBusinessSchema(data.locationIndex) || undefined}
      />

      <div className="bg-paper min-h-screen pt-32">
        
        {/* Navigation Back */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
          <Link to="/locations" className="inline-flex items-center gap-2 text-ink/60 hover:text-accent font-bold tracking-widest uppercase text-xs transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Locations
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
                  {data.name}, Louisiana
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-8">
                {data.headline.split(data.name)[0]}
                <span className="text-accent italic font-serif">
                  {data.name}
                </span>
                , LA
              </h1>
              
              <p className="text-lg text-ink/70 font-medium leading-relaxed mb-10 max-w-xl">
                {data.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onOpenQuote}
                  className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-ink transition-colors shadow-institutional shadow-[0_0_30px_rgba(227,38,54,0.3)]"
                >
                  Get a Free Quote
                </button>
                <a 
                  href={`tel:${data.phone.replace(/\D/g, '')}`}
                  className="border-2 border-slate/20 bg-transparent text-ink px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:border-ink transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {data.phone}
                </a>
              </div>

              {/* Address */}
              <p className="mt-6 text-sm text-ink/50 font-medium">
                <MapPin className="w-3 h-3 inline mr-1" />
                {data.address}
              </p>
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
                alt={`${data.name}, Louisiana — Insight Insurance office location`}
                className="w-full h-full object-cover"
              />
              
              {/* Trust Badge overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl z-20 shadow-xl border border-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink uppercase tracking-wide text-sm mb-1">Coverage Focus</h4>
                    <p className="text-xs font-mono text-slate/80">{data.focus}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials & CTA */}
        <Testimonials />
        <CTA onOpenQuote={onOpenQuote} />

      </div>
    </>
  );
}
