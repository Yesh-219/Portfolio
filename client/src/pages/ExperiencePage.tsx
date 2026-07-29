import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline';
import { StatsCounter } from '../components/sections/StatsCounter';
import { ExperienceModal } from '../components/ui/ExperienceModal';
import { useExperience } from '../hooks/useExperience';

export const ExperiencePage: React.FC = () => {
  const { selectedExperience, setSelectedExperience } = useExperience();

  return (
    <SectionWrapper id="experience">
      <div className="w-full max-w-7xl mx-auto flex flex-col pt-12 pb-24 min-h-screen">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-auroraBlue font-mono text-xs uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-auroraBlue animate-pulse" />
            Career Journey
          </div>
          
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Evolution of an <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-auroraBlue via-tealAccent to-emerald-400">
              Engineer
            </span>
          </h2>
          
          <p className="font-sans text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Building scalable software through intense internships, real-world engineering, and continuous learning.
          </p>
        </motion.div>

        {/* Scroll-linked Timeline Orchestra */}
        <ExperienceTimeline onSelectExperience={setSelectedExperience} />

        {/* Animated Numerical Stats Bar */}
        <StatsCounter />

      </div>

      {/* Case Study Deep Dive Modal */}
      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </SectionWrapper>
  );
};

export default ExperiencePage;
