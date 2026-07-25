import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/CTA';

// Paid-traffic landing pages live here. Each entry is a noindexed variant of
// existing site content tailored to a specific ad campaign — noindexed so
// these near-duplicate pages never compete with the canonical pages in search.
const campaignData: Record<string, {
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subheadline: string;
  phone: string;
}> = {
  'louisiana-auto-quote': {
    seoTitle: 'Free Louisiana Auto Insurance Quote',
    seoDescription: 'Get a free auto insurance quote from Insight Insurance. We shop 50+ carriers to find Louisiana drivers the right coverage at a fair price.',
    headline: 'A Free Auto Quote in Minutes.',
    subheadline: 'Independent insurance agency serving Ponchatoula, Slidell, and Alexandria, Louisiana. We shop 50+ carriers so you get the right coverage at a fair price.',
    phone: '(318) 561-8000',
  },
};

interface CampaignPageProps {
  onOpenQuote: () => void;
}

export function CampaignPage({ onOpenQuote }: CampaignPageProps) {
  const { slug } = useParams();

  if (!slug || !campaignData[slug]) {
    return <Navigate to="/" replace />;
  }

  const data = campaignData[slug];

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={`/campaigns/${slug}`}
        noIndex
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-6">
              {data.headline}
            </h1>
            <p className="text-lg text-ink/70 font-medium leading-relaxed mb-10">
              {data.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </motion.div>
        </div>

        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
