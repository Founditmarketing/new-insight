import { motion } from 'motion/react';
import { CreditCard, ExternalLink, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';

const carriers = [
  {
    name: 'Progressive',
    description: 'Auto, Motorcycle & Home',
    url: 'https://www.progressive.com/payments/',
    color: '#008CC1',
    initial: 'P',
  },
  {
    name: 'Safeco',
    description: 'Home, Auto & Specialty',
    url: 'https://www.safeco.com/pay-bill',
    color: '#1B365D',
    initial: 'S',
  },
  {
    name: 'The Hartford',
    description: 'Business & Personal Lines',
    url: 'https://www.thehartford.com/policyholder-resources/billing-and-payments',
    color: '#8B0000',
    initial: 'H',
  },
  {
    name: 'Liberty Mutual',
    description: 'Auto, Home & Business',
    url: 'https://service.libertymutual.com/billing/makepayment',
    color: '#003366',
    initial: 'L',
  },
  {
    name: 'Kemper',
    description: 'Auto & Home',
    url: 'https://www.kemper.com/insurance/policyholder/billing/',
    color: '#CC0000',
    initial: 'K',
  },
  {
    name: 'Foremost',
    description: 'Home, Specialty & Auto',
    url: 'https://www.foremost.com/make-a-payment.aspx',
    color: '#006699',
    initial: 'F',
  },
  {
    name: 'SageSure',
    description: 'Home & Coastal Property',
    url: 'https://policyholders.sagesure.com/',
    color: '#2D6A4F',
    initial: 'SS',
  },
  {
    name: 'AmTrust',
    description: 'Business & Commercial',
    url: 'https://amtrustfinancial.com/policyholder',
    color: '#003B6F',
    initial: 'AT',
  },
  {
    name: 'Bristol West',
    description: 'Auto Insurance',
    url: 'https://www.bristolwest.com/app/billing/payment',
    color: '#2C5F8A',
    initial: 'BW',
  },
  {
    name: 'Lighthouse / LCI',
    description: 'Coastal Homeowners',
    url: 'https://policyholders.lhins.com/',
    color: '#E8830A',
    initial: 'LH',
  },
  {
    name: 'Citizens',
    description: 'Louisiana Home',
    url: 'https://www.citizensinsurance.com/policyholder-portal/',
    color: '#00609C',
    initial: 'CI',
  },
  {
    name: 'NFIP / Flood Smart',
    description: 'National Flood Insurance',
    url: 'https://www.floodsmart.gov/',
    color: '#1565C0',
    initial: 'NF',
  },
];

export function MakePayment() {
  return (
    <>
      <SEO
        title="Make a Payment — Insight Insurance"
        description="Make a payment directly to your insurance carrier. Find your company's payment portal here, or call our office for help."
        canonical="/payments"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              Policyholder Resources
            </span>
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-6">
              Make a <span className="text-accent italic font-serif">Payment.</span>
            </h1>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              Click on your insurance carrier below to be taken directly to their payment portal. 
              If you're unsure which company your policy is with, give us a call — we're happy to help.
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
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-white border border-slate/10 rounded-2xl p-6 hover:border-slate/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 cursor-pointer"
              >
                {/* Logo placeholder with initial */}
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
                  Pay Now <ExternalLink className="w-3.5 h-3.5" />
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
              <CreditCard className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl font-bold text-paper mb-2">Don't see your carrier?</h2>
              <p className="text-paper/60 font-medium">
                We work with many carriers. Call our office and we'll help you locate the right payment portal.
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
