import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from '../components/sections/HeroSection';
import { CinematicLoader } from '../components/os/CinematicLoader';
import { LazySectionMount } from '../components/ui/LazySectionMount';

// Dynamically import heavy sections
const ProjectsPage = lazy(() => import('./ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ExperiencePage = lazy(() => import('./ExperiencePage').then(module => ({ default: module.ExperiencePage })));
const SkillsPage = lazy(() => import('./SkillsPage').then(module => ({ default: module.SkillsPage })));
const ResumeShowcase = lazy(() => import('../components/sections/ResumeShowcase').then(module => ({ default: module.ResumeShowcase })));
const ContactPage = lazy(() => import('./ContactPage').then(module => ({ default: module.ContactPage })));

export const HomePage: React.FC = () => {
  const [booting, setBooting] = useState(true);

  return (
    <div className="flex flex-col w-full relative">
      {/* Non-Blocking Cinematic Loader Overlay */}
      <AnimatePresence mode="wait">
        {booting && <CinematicLoader onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <div className="flex flex-col w-full relative z-10">
        {/* Eagerly load HeroSection so it's ready behind the loader */}
        <HeroSection />
        
        {/* Progressively load the rest based on viewport intersection */}
        <LazySectionMount id="projects">
          <ProjectsPage />
        </LazySectionMount>
        
        <LazySectionMount id="experience">
          <ExperiencePage />
        </LazySectionMount>
        
        <LazySectionMount id="skills">
          <SkillsPage />
        </LazySectionMount>
        
        <LazySectionMount id="resume">
          <ResumeShowcase />
        </LazySectionMount>
        
        <LazySectionMount id="contact">
          <ContactPage />
        </LazySectionMount>
      </div>
    </div>
  );
};

export default HomePage;
