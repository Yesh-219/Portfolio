import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { EngineeringOverview } from '../components/sections/skills/EngineeringOverview';
import { TechWall } from '../components/sections/skills/TechWall';
import { LanguageSkills } from '../components/sections/skills/LanguageSkills';
import { ExpertiseGrid } from '../components/sections/skills/ExpertiseGrid';
import { DeveloperProfiles } from '../components/sections/skills/DeveloperProfiles';
import { Certifications } from '../components/sections/skills/Certifications';

export const SkillsPage: React.FC = () => {
  return (
    <SectionWrapper id="skills">
      <div className="w-full max-w-7xl mx-auto flex flex-col pt-12 pb-24 min-h-screen space-y-24">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-tealAccent font-mono text-xs uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-tealAccent animate-pulse" />
            Capabilities
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Engineering <span className="text-tealAccent">Dashboard</span>
          </h2>
          <p className="font-sans text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A comprehensive overview of my technical arsenal, specialized domains, and problem-solving metrics.
          </p>
        </motion.div>

        {/* 1. Hero Overview Stats */}
        <EngineeringOverview />

        {/* 2. Floating Tech Galaxy */}
        <TechWall />

        {/* 3. Programming Languages Circular Rings */}
        <LanguageSkills />

        {/* 4. Categorized Expertise Domains */}
        <ExpertiseGrid />


        {/* 6. Certifications Showcase */}
        <Certifications />

      </div>
    </SectionWrapper>
  );
};

export default SkillsPage;
