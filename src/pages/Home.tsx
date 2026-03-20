import { Hero } from '../components/Hero';
import { LouisianaStory } from '../components/LouisianaStory';
import { ServicesGrid } from '../components/ServicesGrid';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';

interface HomeProps {
  onOpenQuote: () => void;
  onOpenPortal: () => void;
}

export function Home({ onOpenQuote, onOpenPortal }: HomeProps) {
  return (
    <>
      <Hero onOpenQuote={onOpenQuote} />
      <LouisianaStory />
      {/* We pass a new prop to ServicesGrid or handle the portal differently.
          To minimize prop drilling, we can just intercept the click inside ServicesGrid.
          Wait, ClientPortalModal is currently mounted *inside* ServicesGrid.
          If we lift it, we need to adjust ServicesGrid. Let's pass the prop. */}
      <ServicesGrid onOpenPortal={onOpenPortal} />
      <Testimonials />
      <CTA onOpenQuote={onOpenQuote} />
    </>
  );
}
