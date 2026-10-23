import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, Trophy, Zap, Building } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

// Map icon strings to components
const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="text-primary" size={20} />,
  Cpu: <Cpu className="text-secondary" size={20} />,
  Trophy: <Trophy className="text-primary" size={20} />,
  Zap: <Zap className="text-secondary" size={20} />,
  Building: <Building className="text-primary" size={20} />
};

const Achievements: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as any }
    }
  };

  return (
    <section id="achievements" className="py-24 sm:py-32 px-6 bg-transparent relative">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            06 / Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Achievements
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Vertical axis line */}
          <div className="absolute left-[9px] sm:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-secondary/50 to-transparent" />

          {/* Timeline Items */}
          <motion.div
            className="flex flex-col gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {achievementsData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative pl-8 sm:pl-12 flex flex-col group"
              >
                {/* Node icon circle */}
                <div className="absolute left-[-21px] sm:left-[-26px] top-1 w-[42px] h-[42px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c1020] flex items-center justify-center shadow-md group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 z-10">
                  {iconMap[item.iconName] || <Award size={20} />}
                </div>

                {/* Content Card */}
                <div className="glass-card p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
