import { motion } from 'motion/react';
import { AlertCircle, ExternalLink, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';

const carriers = [
  {
    name: 'Progressive',
    description: 'Auto & Home',
    url: 'https://www.progressive.com/claims/faq/how-to-report-a-claim/#overlay',
    color: '#008CC1',
    initial: 'P',
  },
  {
    name: 'Safeco',
    description: 'Home, Auto & Specialty',
    url: 'https://fileaclaim.safeco.com',
    color: '#1B365D',
    initial: 'S',
  },
  {
    name: 'The Hartford',
    description: 'Business & Personal Lines',
    url: 'https://www.thehartford.com/claims',
    color: '#8B0000',
    initial: 'H',
  },
  {
    name: 'Allstate',
    description: 'Auto, Home & Business',
    url: 'https://www.allstate.com/claims/file-track',
    color: '#003366',
    initial: 'AL',
  },
  {
    name: 'National General',
    description: 'Auto & Home',
    url: 'https://nationalgeneral.com/policyholders/claims/',
    color: '#2C5F8A',
    initial: 'NG',
  },
  {
    name: 'SageSure',
    description: 'Home & Coastal Property',
    url: 'https://sagesure.com/claims/',
    color: '#2D6A4F',
    initial: 'SS',
  },
  {
    name: 'Gulf States / Lighthouse',
    description: 'Coastal Homeowners',
    url: 'https://gulfstatesinsure.com/claims/',
    color: '#E8830A',
    initial: 'GS',
  },
  {
    name: 'Louisiana Citizens',
    description: 'Louisiana Home',
    url: 'https://www.lacitizens.com/claims-center/report-a-loss',
    color: '#00609C',
    initial: 'LC',
  },
  {
    name: 'Tower Hill',
    description: 'Home & Property',
    url: 'https://www.thig.com/claims/#report',
    color: '#4A4A8A',
    initial: 'TH',
  },
  {
    name: 'American Modern',
    description: 'Specialty & Recreational',
    url: 'https://myclaim.amig.com/?ref=a',
    color: '#8B0000',
    initial: 'AM',
  },
  {
    name: 'Centauri',
    description: 'Home & Property',
    url: 'https://centauriinsurance.com/claims/',
    color: '#1565C0',
    initial: 'CE',
  },
  {
    name: 'Cajun Underwriters',
    description: 'Louisiana Property',
    url: 'http://cajunuw.com/',
    color: '#8B4513',
    initial: 'CU',
  },
  {
    name: 'Safeway',
    description: 'Auto Insurance',
    url: 'https://www.safewayinsurance.com/',
    color: '#1A6B3C',
    initial: 'SW',
  },
  {
    name: 'biBerk',
    description: 'Business Insurance',
    url: 'https://www.biberk.com/policyholders/claims',
    color: '#37474F',
    initial: 'BB',
  },
  {
    name: 'GEICO',
    description: 'Auto & Home',
    url: 'https://www.geico.com/claims/',
    color: '#003366',
    initial: 'GE',
  },
];

export function FileAClaim() {
  return (
    <>
      <SEO
        title="File a Claim — Insight Insurance"
        description="File a claim directly with your insurance carrier. Find your company's claims portal here, or call our team — we're here to guide you through the process."
        canonical="/file-a-claim"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-6"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              Claims Support
            </span>
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-6">
              File a <span className="text-accent italic font-serif">Claim.</span>
            </h1>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              Click on your insurance carrier below to go directly to their claim-filing portal.
              Not sure where to start? <strong>Call us first</strong> — we're here to walk you through the process and advocate on your behalf.
            </p>
          </motion.div>

          {/* Pro tip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start gap-4 bg-accent/5 border border-accent/20 rounded-xl px-6 py-5 mb-12"
          >
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-ink/70 leading-relaxed">
              <strong className="text-ink">Pro tip:</strong> Before you file, give us a call at <a href="tel:3185618000" className="text-accent font-bold hover:underline">(318) 561-8000</a>.
              Our team can guide you through what to expect, help document your loss correctly, and make sure your claim is handled the right way.
            </p>
          </motion.div>

          {/* Carrier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
            {carriers.map((carrier, i) => (
              <motion.a
                key={carrier.name}
                href={carrier.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group bg-white border border-slate/10 rounded-2xl p-6 hover:border-slate/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm"
                  style={{ backgroundColor: carrier.color }}
                >
                  {carrier.initial}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-ink text-base mb-1 group-hover:text-accent transition-colors">{carrier.name}</h3>
                  <p className="text-ink/50 text-sm font-medium">{carrier.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-accent text-xs font-bold tracking-widest uppercase">
                  File Claim <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Help block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-ink text-paper rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl font-bold text-paper mb-2">We're here to help you through it.</h2>
              <p className="text-paper/60 font-medium">
                Filing a claim can be stressful. Our team is on your side — we'll advocate for you and make sure your claim gets the attention it deserves.
              </p>
            </div>
            <a
              href="tel:3185618000"
              className="flex-shrink-0 flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_20px_rgba(227,38,54,0.3)]"
            >
              <Phone className="w-4 h-4" /> (318) 561-8000
            </a>
          </motion.div>

        </div>
      </div>
    </>
  );
}
