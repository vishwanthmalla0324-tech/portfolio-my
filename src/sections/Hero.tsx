import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { personalInfo } from '../data/portfolioData';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const currentFullText = personalInfo.roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        
        if (typedText.length === currentFullText.length) {
          // Pause when word is fully typed
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        
        if (typedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
          return;
        }
      }

      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 30 : 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-20"
    >
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[130px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Top welcome tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
        >
          Welcome to my universe
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tight leading-[0.95]"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Dynamic Typing Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 h-10 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
        >
          <span>{typedText}</span>
          <span className="w-1 h-6 sm:h-8 ml-1 bg-secondary animate-pulse inline-block" />
        </motion.div>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 mt-6 text-base sm:text-lg max-w-2xl leading-relaxed font-normal"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Call to actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-4 mt-10"
        >
          <a
            href="/malla-vishwanth-resume.pdf"
            download="Malla_Vishwanth_Resume.pdf"
            className="px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Download Resume
          </a>
          
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-white bg-white/5 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            View Projects
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center items-center gap-6 mt-12"
        >
          {[
            { icon: <Github size={20} />, url: personalInfo.socials.github, label: 'GitHub' },
            { icon: <Linkedin size={20} />, url: personalInfo.socials.linkedin, label: 'LinkedIn' },
            { icon: <Mail size={20} />, url: personalInfo.socials.email, label: 'Email' },
            { icon: <Instagram size={20} />, url: personalInfo.socials.instagram, label: 'Instagram' }
          ].map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              aria-label={soc.label}
              className="p-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white/5 hover:bg-primary/10 hover:border-primary/50 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              {soc.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Down arrow link indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white p-2 rounded-full cursor-pointer"
        aria-label="Scroll Down to About Section"
      >
        <ArrowDown size={22} />
      </motion.button>
    </section>
  );
};

export default Hero;
