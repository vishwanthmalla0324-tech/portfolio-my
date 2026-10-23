import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { projectsData } from '../data/portfolioData';

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract all unique technology tags across projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add('All');
    // We can also categorize projects broadly by domain for easy filtering
    tags.add('Web App');
    tags.add('AI / Intel');
    tags.add('Firebase');
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 1. Search Query Match
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Tag Match
      if (selectedTag === 'All') return matchesSearch;

      let matchesTag = false;
      if (selectedTag === 'Web App') {
        matchesTag = project.id !== 'cityverse-ai'; // Capture Aura, AI Resume, Portfolio
      } else if (selectedTag === 'AI / Intel') {
        matchesTag = project.id === 'cityverse-ai' || project.id === 'ai-resume-builder';
      } else if (selectedTag === 'Firebase') {
        matchesTag = project.techStack.some((tech) => tech.toLowerCase().includes('firebase'));
      }

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            03 / Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Projects
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Tags filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-semibold text-gray-500 mr-2 hidden sm:inline-flex items-center gap-1.5">
              <Filter size={16} /> Filters:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-white/5 border border-gray-200 dark:border-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white/5 dark:bg-black/10 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
            />
          </div>
        </div>

        {/* Grid Container */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card flex flex-col justify-between overflow-hidden group h-full"
              >
                {/* Image Wrap */}
                <div className="relative overflow-hidden aspect-video w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-primary font-bold uppercase tracking-widest">
                      {project.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-secondary mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges & Links */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800/40">
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-white/5 dark:bg-white/5 border border-gray-200/50 dark:border-gray-800/60 text-gray-600 dark:text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 text-center rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-white bg-white/5 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-gray-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Github size={14} /> GitHub
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 text-center rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Fallback */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No projects match your current search/filters.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
