import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Smartphone, Globe, Award, Cpu, ShieldAlert, ExternalLink } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  FileCode: <FileCode className="text-primary" size={26} />,
  Smartphone: <Smartphone className="text-secondary" size={26} />,
  Globe: <Globe className="text-primary" size={26} />,
  Cpu: <Cpu className="text-secondary" size={26} />,
  ShieldAlert: <ShieldAlert className="text-primary" size={26} />
};

const Certifications: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <section id="certifications" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            05 / Credentials
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Certifications
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-secondary to-primary mt-4" />
        </div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass-card p-8 flex flex-col justify-between items-start backdrop-blur-md relative overflow-hidden group border border-white/5"
            >
              {/* Corner decorative light effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-full">
                {/* Header Icon */}
                <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-gray-200 dark:border-gray-800 shadow-sm w-fit mb-6">
                  {iconMap[cert.iconName] || <Award size={26} className="text-primary" />}
                </div>

                {/* Subtitle */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {cert.authority}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 text-xs font-semibold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 cursor-pointer relative z-10 hover:underline"
                  >
                    View Certificate <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Decorative line bar */}
              <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary mt-8 rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
