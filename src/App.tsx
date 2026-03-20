/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { QuoteModal } from './components/QuoteModal';
import { Concierge } from './components/Concierge';
import { WeatherBadge } from './components/WeatherBadge';
import { Home } from './pages/Home';
import { CityPage } from './pages/CityPage';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ScrollToTop } from './components/ScrollToTop';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

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
    <BrowserRouter>
      <main className="min-h-screen bg-paper selection:bg-accent selection:text-white relative">
        <div className="noise-overlay" />
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <ScrollToTop />
        <Navbar 
          onOpenQuote={() => setIsQuoteOpen(true)} 
          onOpenPortal={() => setIsPortalOpen(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <Home 
              onOpenQuote={() => setIsQuoteOpen(true)} 
              onOpenPortal={() => setIsPortalOpen(true)} 
            />
          } />
          <Route path="/:city" element={<CityPage onOpenQuote={() => setIsQuoteOpen(true)} />} />
        </Routes>

        <Footer />
        <WeatherBadge />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        <ClientPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
        <Concierge />
      </main>
    </BrowserRouter>
  );
}

