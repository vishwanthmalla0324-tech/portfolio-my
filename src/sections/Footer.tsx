import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { personalInfo } from '../data/portfolioData';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-gray-200/50 dark:border-gray-800/20 bg-[#030712]/10 dark:bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Copyright info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Malla Vishwanth
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved. Built with premium precision.
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {['home', 'about', 'skills', 'projects', 'photography', 'contact'].map((sect) => (
            <button
              key={sect}
              onClick={() => scrollToSection(sect)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {sect}
            </button>
          ))}
        </div>

        {/* Social and Back to top */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-white">
              <Github size={16} />
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-white">
              <Linkedin size={16} />
            </a>
            <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-white">
              <Instagram size={16} />
            </a>
            <a href={personalInfo.socials.email} aria-label="Email" className="text-gray-500 hover:text-white">
              <Mail size={16} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/5 hover:bg-primary/10 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-all hover:-translate-y-1 cursor-pointer"
            aria-label="Scroll Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
