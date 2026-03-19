import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-ink/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      } px-6 md:px-12 lg:px-24 text-paper`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-serif font-medium tracking-wide">
          INSIGHT
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-paper/70 transition-colors">Expertise</a>
          <a href="#" className="hover:text-paper/70 transition-colors">Carriers</a>
          <a href="#" className="hover:text-paper/70 transition-colors">Our Impact</a>
          <a href="#" className="hover:text-paper/70 transition-colors">Louisiana</a>
          <button className="bg-paper text-ink px-6 py-2.5 rounded-full hover:bg-paper/90 transition-colors">
            Client Portal
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-paper"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-ink border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
          <a href="#" className="text-lg hover:text-paper/70 transition-colors">Expertise</a>
          <a href="#" className="text-lg hover:text-paper/70 transition-colors">Carriers</a>
          <a href="#" className="text-lg hover:text-paper/70 transition-colors">Our Impact</a>
          <a href="#" className="text-lg hover:text-paper/70 transition-colors">Louisiana</a>
          <button className="bg-paper text-ink px-6 py-3 rounded-full mt-4 w-full font-medium">
            Client Portal
          </button>
        </div>
      )}
    </motion.nav>
  );
}
