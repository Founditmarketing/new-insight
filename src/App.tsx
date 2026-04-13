/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { QuoteModal } from './components/QuoteModal';
import { Concierge } from './components/Concierge';
import { WeatherBadge } from './components/WeatherBadge';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Locations } from './pages/Locations';
import { Contact } from './pages/Contact';
import { CityPage } from './pages/CityPage';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileCTA } from './components/MobileCTA';


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

  // Listen for custom quote event from MobileCTA
  useEffect(() => {
    const handler = () => setIsQuoteOpen(true);
    window.addEventListener('open-quote', handler);
    return () => window.removeEventListener('open-quote', handler);
  }, []);

  return (
    <HelmetProvider>
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
            <Route path="/about" element={<About />} />
            <Route path="/services" element={
              <Services 
                onOpenQuote={() => setIsQuoteOpen(true)} 
              />
            } />
            <Route path="/locations" element={
              <Locations onOpenQuote={() => setIsQuoteOpen(true)} />
            } />
            <Route path="/locations/:city" element={
              <CityPage onOpenQuote={() => setIsQuoteOpen(true)} />
            } />
            <Route path="/contact" element={<Contact />} />
            {/* Legacy city routes redirect */}
            <Route path="/:city" element={
              <CityPage onOpenQuote={() => setIsQuoteOpen(true)} />
            } />
          </Routes>

          <Footer />
          <WeatherBadge />
          <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
          <ClientPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
          <Concierge />
          <MobileCTA />
        </main>
      </BrowserRouter>
    </HelmetProvider>
  );
}
