import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Simulate realistic loading speeds: starts fast, slows down at the end
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining * 0.15 * Math.random()));
      current += step;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800); // Allow exit animations to complete
        }, 300);
      }
      setProgress(current);
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-16 bg-[#030712]"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Top Label */}
          <div className="flex justify-between items-center text-xs tracking-[0.2em] text-gray-500 uppercase font-medium">
            <span>Portfolio v2.0</span>
            <span>Malla Vishwanth</span>
          </div>

          {/* Middle Text Reveal */}
          <div className="flex flex-col items-start overflow-hidden">
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              CREATIVE
            </motion.h1>
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-primary mt-2"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Bottom Progress details */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 text-gray-400">
            <div className="max-w-xs text-sm text-gray-500">
              Transforming innovative ideas into responsive, premium digital realities.
            </div>
            
            <div className="relative font-bold select-none text-right">
              {/* Giant floating number backdrop */}
              <div className="absolute right-0 bottom-0 text-[10vw] leading-[1] opacity-5 font-black text-white pointer-events-none select-none">
                {progress}%
              </div>
              <div className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight relative z-10">
                {progress}<span className="text-primary text-3xl sm:text-5xl">%</span>
              </div>
            </div>
          </div>

          {/* Core progress line bar at the very bottom edge */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-100" style={{ width: `${progress}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
