import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/malla-vishwanth.jpg';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as any }
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section title header */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <motion.span 
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            01 / Introduction
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image Column */}
          <motion.div className="lg:col-span-5 flex justify-center" variants={itemVariants}>
            <div className="relative group">
              {/* Decorative backglow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg group-hover:opacity-55 transition duration-500" />
              
              {/* Image with custom glass frame border */}
              <div className="relative rounded-2xl p-2 bg-white/5 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden aspect-[4/5] w-[280px] sm:w-[320px] md:w-[360px] max-w-full">
                <img 
                  src={profileImg} 
                  alt="Malla Vishwanth profile portrait"
                  className="rounded-xl w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Biography details Column */}
          <motion.div className="lg:col-span-7 flex flex-col justify-center" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              A Passionate B.Tech CSE Student & Tech Explorer
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mt-6 text-base sm:text-lg leading-relaxed font-normal">
              I am currently pursuing my Bachelor of Technology in Computer Science Engineering at <span className="font-semibold text-gray-900 dark:text-white">Dadi Institute of Engineering and Technology (DIET)</span>, Visakhapatnam. My academic journey is fueled by a relentless drive to master modern software development and design clean, high-performance applications.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mt-4 text-base leading-relaxed">
              I specialize in full-stack web development, custom Android application development, and interactive user interface design. I focus on creating responsive, intuitive digital products using clean architectural patterns, robust code styling, and cutting-edge frontend technologies.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-base leading-relaxed">
              I am dedicated to expanding my software engineering skill set, seeking hands-on developer internships, and hunting for full-stack opportunities where I can design and build impactful production-ready systems.
            </p>

            {/* Quick specifications badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-10">
              {[
                { label: 'Role', value: 'Full Stack Web & Android Developer' },
                { label: 'Location', value: 'Visakhapatnam, AP, India' },
                { label: 'Current Studies', value: 'B.Tech CSE (Year 2024-2028)' },
                { label: 'Focus Areas', value: 'Web Dev, App Dev, UI/UX Design' }
              ].map((spec, i) => (
                <div key={i} className="flex flex-col p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800/40 backdrop-blur-sm">
                  <span className="text-xs text-primary dark:text-primary-dark font-semibold uppercase tracking-wider">{spec.label}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300 mt-1">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
