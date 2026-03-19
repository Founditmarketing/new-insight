import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 1200); // Wait for exit animation
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center text-paper"
        >
          <div className="overflow-hidden mb-4 flex gap-2">
            {['I', 'N', 'S', 'I', 'G', 'H', 'T'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl md:text-6xl tracking-widest block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm font-mono text-paper/50 tracking-widest mt-8 flex items-center gap-4"
          >
            <div className="w-32 h-[1px] bg-paper/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-paper"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
            <span>{Math.min(progress, 100).toString().padStart(3, '0')}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
