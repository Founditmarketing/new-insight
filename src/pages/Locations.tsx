import { SEO } from '../components/SEO';
import { LouisianaStory } from '../components/LouisianaStory';
import { CTA } from '../components/CTA';
import { getOrganizationSchema } from '../seo/structured-data';

interface LocationsPageProps {
  onOpenQuote: () => void;
}

export function Locations({ onOpenQuote }: LocationsPageProps) {
  return (
    <>
      <SEO
        title="Locations — Alexandria, Ponchatoula & Slidell, LA"
        description="Three offices across Louisiana. Visit us in Alexandria, Ponchatoula, or Slidell for honest insurance advice from people who live in your community."
        canonical="/locations"
        structuredData={getOrganizationSchema()}
      />

      <div className="bg-paper min-h-screen">
        <h1 className="sr-only">Insight Insurance Locations Across Louisiana</h1>
        <LouisianaStory />
        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
