import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Printer, Camera } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="text-primary" size={24} />,
  Smartphone: <Smartphone className="text-secondary" size={24} />,
  Printer: <Printer className="text-primary" size={24} />,
  Camera: <Camera className="text-secondary" size={24} />
};

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as any }
    }
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 bg-transparent relative">
      {/* Dynamic backglows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            02 / Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            My Skills
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-secondary to-primary mt-4" />
        </div>

        {/* Category Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillsData.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-card p-6 sm:p-8 flex flex-col justify-start backdrop-blur-md"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 rounded-xl bg-white/5 dark:bg-black/20 border border-gray-200 dark:border-gray-800 shadow-md">
                  {iconMap[category.icon]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {category.category}
                </h3>
              </div>

              {/* Skills list with animated progress bars */}
              <div className="flex flex-col gap-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <div className="flex justify-between items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      <span>{skill.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.percentage}%</span>
                    </div>
                    {/* Bar background */}
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      {/* Bar Fill */}
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          idx % 2 === 0 ? 'from-primary to-indigo-500' : 'from-secondary to-pink-500'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: sIdx * 0.05, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
