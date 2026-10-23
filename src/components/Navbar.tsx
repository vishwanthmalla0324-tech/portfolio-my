import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isLight: boolean;
  toggleTheme: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' }
];

const Navbar: React.FC<NavbarProps> = ({ isLight, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Handling scrolling changes
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Active Section Detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-4 shadow-lg'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white focus:outline-none flex items-center gap-2 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300" />
            <span>MV</span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-primary dark:text-primary'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Utilities */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/5 dark:bg-black/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Utilities Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-45 bg-white/95 dark:bg-[#030712]/95 border-b border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-lg flex flex-col p-6 lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary pl-6'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 hover:pl-6'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="my-4 border-gray-200 dark:border-gray-800" />
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 text-center rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
