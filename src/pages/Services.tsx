import { SEO } from '../components/SEO';
import { ServicesGrid } from '../components/ServicesGrid';
import { RiskAnatomy } from '../components/RiskAnatomy';
import { CTA } from '../components/CTA';

interface ServicesPageProps {
  onOpenQuote: () => void;
}

export function Services({ onOpenQuote }: ServicesPageProps) {
  return (
    <>
      <SEO
        title="Insurance Services — Home, Auto, Business & More"
        description="Home, auto, business, flood, marine, life, surety bonds, and umbrella insurance. We shop 50+ carriers to find the right coverage for Louisiana families and businesses."
        canonical="/services"
      />

      <div className="bg-paper min-h-screen">
        <ServicesGrid />
        <RiskAnatomy />
        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
