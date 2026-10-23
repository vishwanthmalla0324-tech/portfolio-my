import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Layers, Sliders, Eye } from 'lucide-react';
import { photographyData } from '../data/portfolioData';

const Photography: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Portrait' | 'Street' | 'Nature' | 'Events' | 'Night'>('All');

  const categories = ['All', 'Portrait', 'Street', 'Nature', 'Events', 'Night'] as const;

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return photographyData;
    return photographyData.filter((photo) => photo.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="photography" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            07 / Vision
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Photography
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-secondary to-primary mt-4" />
        </div>

        {/* Info Box: Adobe Photoshop & Lightroom expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card p-6 backdrop-blur-md flex gap-4 items-start border-l-4 border-l-primary">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Sliders className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                Adobe Lightroom Post-Processing
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Expert in RAW image adjustments, custom color grading/LUT curves, tone curve manipulations, selective exposure balancing, and high-quality lens profile corrections.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 backdrop-blur-md flex gap-4 items-start border-l-4 border-l-secondary">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <Layers className="text-secondary" size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                Adobe Photoshop Retouching
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Proficient in layer mask adjustments, advanced blending options, frequency separation skin retouching, object removals, and composite alignment configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Category Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-105'
                  : 'bg-white/5 border border-gray-200 dark:border-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photography Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden group relative flex flex-col justify-end aspect-[4/5] border border-white/5"
              >
                {/* Image */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                />
                
                {/* Ambient dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                {/* DSLR Camera Interface Overlay HUD (on hover) */}
                <div className="absolute inset-4 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 flex flex-col justify-between p-3 select-none">
                  {/* Top HUD bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/60">
                    <span className="flex items-center gap-1"><Camera size={10} /> AF-S</span>
                    <span>RAW</span>
                  </div>
                  {/* Center focus bracket crop marks */}
                  <div className="self-center flex items-center justify-center w-8 h-8 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/70" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/70" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/70" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/70" />
                  </div>
                  {/* Bottom HUD bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/60">
                    <span>MF</span>
                    <span>{photo.camera.split(',')[0]}</span>
                  </div>
                </div>

                {/* Image content label info */}
                <div className="relative z-25 p-6 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-secondary/85 text-white rounded-md">
                    {photo.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mt-3 tracking-tight flex items-center gap-2">
                    {photo.title}
                  </h3>

                  {/* Camera Settings Details (reveals on hover) */}
                  <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 flex flex-col gap-1 text-[11px] font-mono text-gray-300 border-t border-white/10 pt-3">
                    <span className="flex items-center gap-1.5">
                      <Camera size={11} className="text-primary" /> {photo.camera}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye size={11} className="text-secondary" /> {photo.settings}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Photography;
