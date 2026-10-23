import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { educationData } from '../data/portfolioData';

const Education: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as any }
    }
  };

  return (
    <section id="education" className="py-24 sm:py-32 px-6 bg-transparent relative">
      {/* Background glow */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            04 / Academy
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Education
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-0">
          {/* Vertical axis line */}
          <div className="absolute left-[9px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-indigo-500 to-secondary/30 -translate-x-1/2" />

          {/* Timeline Items */}
          <motion.div 
            className="flex flex-col gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {educationData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:justify-start' : 'sm:justify-end'
                  } w-full`}
                >
                  {/* Center Node Indicator */}
                  <div className="absolute left-[9px] sm:left-1/2 top-1.5 sm:top-auto w-[20px] h-[20px] rounded-full border-4 border-white dark:border-[#030712] bg-primary -translate-x-1/2 shadow-lg shadow-primary/40 z-10" />

                  {/* Card Container */}
                  <div className={`w-full sm:w-[45%] pl-8 sm:pl-0 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="glass-card p-6 backdrop-blur-md relative group hover:border-primary/40">
                      {/* Header details with flex to prevent overlap */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                          <GraduationCap size={16} className="text-secondary flex-shrink-0" />
                          <span>{item.boardOrUniversity}</span>
                        </div>
                        {/* Score Badge */}
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20 w-fit flex-shrink-0">
                          {item.score}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>

                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2 flex items-center gap-1.5">
                        <MapPin size={13} className="text-gray-400" /> {item.institution}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mt-4 bg-white/5 dark:bg-black/10 border border-gray-200/50 dark:border-gray-800/40 w-fit px-3 py-1.5 rounded-lg">
                        <Calendar size={12} className="text-primary" />
                        <span>{item.duration}</span>
                      </div>

                      {/* Details list */}
                      <ul className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-850 flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-secondary">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
