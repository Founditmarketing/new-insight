import { SEO } from '../components/SEO';
import { LouisianaStory } from '../components/LouisianaStory';
import { CTA } from '../components/CTA';

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
      />

      <div className="bg-paper min-h-screen">
        <LouisianaStory />
        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
