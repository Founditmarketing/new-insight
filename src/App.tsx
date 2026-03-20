/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { LouisianaStory } from './components/LouisianaStory';
import { ServicesGrid } from './components/ServicesGrid';
import { Testimonials } from './components/Testimonials';
import { ThreatTracker } from './components/ThreatTracker';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { QuoteModal } from './components/QuoteModal';
import { Concierge } from './components/Concierge';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-paper selection:bg-accent selection:text-white relative">
      <div className="noise-overlay" />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />
      <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
      <LouisianaStory />
      <ThreatTracker />
      <ServicesGrid />
      <Testimonials />
      <CTA onOpenQuote={() => setIsQuoteOpen(true)} />
      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Concierge />
    </main>
  );
}

