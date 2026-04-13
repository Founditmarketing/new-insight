import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Head back to our homepage for insurance quotes and information."
        canonical="/404"
      />

      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          <div className="text-[8rem] md:text-[12rem] font-bold text-accent/20 leading-none select-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-paper mb-4 -mt-8">
            Page Not Found
          </h1>
          <p className="text-paper/60 font-medium mb-10 leading-relaxed">
            Sorry about that — this page doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-accent text-paper px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-paper hover:text-ink transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              to="/contact"
              className="border-2 border-paper/20 text-paper px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:border-paper transition-colors flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
