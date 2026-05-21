/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { QuoteModal } from './components/QuoteModal';
import { Concierge } from './components/Concierge';
import { WeatherBadge } from './components/WeatherBadge';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileCTA } from './components/MobileCTA';

// Home loaded eagerly (critical path)
import { Home } from './pages/Home';

// All other pages lazy-loaded for faster initial bundle
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Locations = lazy(() => import('./pages/Locations').then(m => ({ default: m.Locations })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const CityPage = lazy(() => import('./pages/CityPage').then(m => ({ default: m.CityPage })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
// New pages
const MakePayment = lazy(() => import('./pages/MakePayment').then(m => ({ default: m.MakePayment })));
const FileAClaim = lazy(() => import('./pages/FileAClaim').then(m => ({ default: m.FileAClaim })));
const Careers = lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);


  useEffect(() => {
    // Disable Lenis on mobile and when user prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReduced) return; // Use native scroll on mobile

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
        <div className="min-h-screen bg-paper selection:bg-accent selection:text-white relative">
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <div className="noise-overlay" />
          {loading && <Preloader onComplete={() => setLoading(false)} />}
          <ScrollToTop />
          <header>
            <Navbar 
              onOpenQuote={() => setIsQuoteOpen(true)} 
              onOpenPortal={() => setIsPortalOpen(true)}
            />
          </header>
          
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={
                  <Home 
                    onOpenQuote={() => setIsQuoteOpen(true)} 
                    onOpenPortal={() => setIsPortalOpen(true)} 
                  />
                } />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={
                  <Services onOpenQuote={() => setIsQuoteOpen(true)} />
                } />
                <Route path="/locations" element={
                  <Locations onOpenQuote={() => setIsQuoteOpen(true)} />
                } />
                <Route path="/locations/:city" element={
                  <CityPage onOpenQuote={() => setIsQuoteOpen(true)} />
                } />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={
                  <FAQ onOpenQuote={() => setIsQuoteOpen(true)} />
                } />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* New pages */}
                <Route path="/payments" element={<MakePayment />} />
                <Route path="/file-a-claim" element={<FileAClaim />} />
                <Route path="/careers" element={<Careers />} />
                {/* Legacy city routes */}
                <Route path="/:city" element={
                  <CityPage onOpenQuote={() => setIsQuoteOpen(true)} />
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <WeatherBadge />
          <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
          <ClientPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
          <Concierge />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
