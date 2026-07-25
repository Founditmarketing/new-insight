import { SEO } from '../components/SEO';
import { ServicesGrid } from '../components/ServicesGrid';
import { RiskAnatomy } from '../components/RiskAnatomy';
import { CTA } from '../components/CTA';
import { getOrganizationSchema, getBreadcrumbSchema } from '../seo/structured-data';

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
        structuredData={[
          getOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
          ]),
        ]}
      />

      <div className="bg-paper min-h-screen">
        <h1 className="sr-only">Insurance Services for Louisiana Families &amp; Businesses</h1>
        <ServicesGrid />
        <RiskAnatomy />
        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
