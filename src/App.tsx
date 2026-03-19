/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { Proof } from './components/Proof';
import { LouisianaStory } from './components/LouisianaStory';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen bg-paper selection:bg-accent selection:text-white relative cursor-none md:cursor-auto">
      <CustomCursor />
      <div className="noise-overlay" />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <ServicesGrid />
      <Proof />
      <LouisianaStory />
      <Footer />
    </main>
  );
}

