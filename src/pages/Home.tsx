import { Hero } from '../components/Hero';
import { LouisianaStory } from '../components/LouisianaStory';
import { ServicesGrid } from '../components/ServicesGrid';
import { Philosophy } from '../components/Philosophy';
import { Proof } from '../components/Proof';
import { Testimonials } from '../components/Testimonials';
import { RiskAnatomy } from '../components/RiskAnatomy';
import { CTA } from '../components/CTA';
import { SEO } from '../components/SEO';
import { getOrganizationSchema } from '../seo/structured-data';

interface HomeProps {
  onOpenQuote: () => void;
  onOpenPortal: () => void;
}

export function Home({ onOpenQuote, onOpenPortal }: HomeProps) {
  return (
    <>
      <SEO
        title="Insight Insurance | Ponchatoula, Slidell & Alexandria, LA"
        description="Independent insurance agency serving Ponchatoula, Slidell, and Alexandria, Louisiana. We shop 50+ carriers so you get the right coverage at a fair price."
        canonical="/"
        structuredData={getOrganizationSchema()}
      />
      <Hero onOpenQuote={onOpenQuote} />
      <LouisianaStory />
      <Philosophy />
      <ServicesGrid />
      <Proof />
      <RiskAnatomy />
      <Testimonials />
      <CTA onOpenQuote={onOpenQuote} />
    </>
  );
}
