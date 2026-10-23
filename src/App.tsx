import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Components
import SilkBackground from './components/SilkBackground';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Custom404 from './components/Custom404';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import Photography from './sections/Photography';
import Statistics from './sections/Statistics';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [show404, setShow404] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync scrollbar progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading || show404) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading, show404]);

  // Handle Theme Switching
  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [isLight]);

  // Listen for hash changes to test the custom 404 page
  useEffect(() => {
    const checkHash = () => {
      setShow404(window.location.hash === '#404');
    };

    window.addEventListener('hashchange', checkHash);
    checkHash(); // Check on mount

    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const handle404Back = () => {
    window.location.hash = '';
    setShow404(false);
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative text-gray-900 dark:text-white transition-colors duration-300">
          {/* Custom WebGL background */}
          <SilkBackground isLight={isLight} />

          {/* Interactive cursor */}
          <CustomCursor />

          {/* Top page scroll progress bar */}
          <div 
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[99] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />

          {show404 ? (
            <Custom404 onGoBack={handle404Back} />
          ) : (
            <>
              {/* Floating Navbar */}
              <Navbar isLight={isLight} toggleTheme={toggleTheme} />

              {/* Main Content Layout */}
              <main className="relative">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Education />
                <Achievements />
                <Certifications />
                <Photography />
                <Statistics />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
