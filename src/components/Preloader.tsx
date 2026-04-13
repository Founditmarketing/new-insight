import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Skip preloader if user prefers reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 600); // Reduced from 1200ms
          return 100;
        }
        return p + Math.floor(Math.random() * 25) + 5; // Faster increments
      });
    }, 80); // Faster interval (was 150ms)
    return () => clearInterval(timer);
  }, [onComplete]);

  // Allow tap/click to skip
  const handleSkip = () => {
    setIsComplete(true);
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center text-paper cursor-pointer"
          onClick={handleSkip}
          role="progressbar"
          aria-valuenow={Math.min(progress, 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading Insight Insurance"
        >
          <div className="overflow-hidden mb-4 flex gap-2">
            {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl md:text-6xl tracking-widest block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-sm font-mono text-paper/50 tracking-widest mt-8 flex items-center gap-4"
          >
            <div className="w-32 h-[1px] bg-paper/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-paper"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <span>{Math.min(progress, 100).toString().padStart(3, '0')}%</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-paper/30 mt-6 tracking-widest uppercase"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
