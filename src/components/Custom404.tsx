import React from 'react';
import { motion } from 'framer-motion';

interface Custom404Props {
  onGoBack: () => void;
}

const Custom404: React.FC<Custom404Props> = ({ onGoBack }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkBg px-6">
      <div className="text-center max-w-lg">
        {/* Animated 404 text */}
        <motion.h1
          className="text-[12vw] sm:text-[8rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          404
        </motion.h1>

        {/* Headline */}
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Lost in Digital Space?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 mt-4 text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The page you are looking for has either vanished, been renamed, or was created by a malfunctioning drone. Let's get you back to safety.
        </motion.p>

        {/* Action button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={onGoBack}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Custom404;
