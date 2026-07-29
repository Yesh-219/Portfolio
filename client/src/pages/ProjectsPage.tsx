import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { ProjectFilters } from '../components/sections/ProjectFilters';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectModal } from '../components/ui/ProjectModal';
import { ProjectSkeleton } from '../components/ui/ProjectSkeleton';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';
import { Terminal } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, activeCategory, searchQuery, isLoading, setCategory, handleSearch } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects">
      <div className="w-full max-w-7xl mx-auto flex flex-col min-h-screen pt-12 pb-24">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4 text-center sm:text-left"
        >
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Engineering <span className="text-auroraBlue">Showcase</span>
          </h1>
          <p className="font-sans text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            A curated selection of robust backend architectures, deep learning models, and full-stack web applications. Explore the case studies to view the technologies and problems solved.
          </p>
        </motion.div>

        {/* Live Search & Filters */}
        <ProjectFilters 
          activeCategory={activeCategory} 
          onSelectCategory={setCategory}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        {/* Projects Grid Container */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* Loading Skeleton */}
            {isLoading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full"
              >
                <ProjectSkeleton />
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && projects.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center bg-slate-900/50 border border-white/10 text-slate-500 mb-4">
                  <Terminal className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">No projects found</h3>
                <p className="font-sans text-slate-400 text-sm max-w-sm">
                  We couldn't find any projects matching your current filters or search query.
                </p>
                <button 
                  onClick={() => { handleSearch(''); setCategory('All'); }}
                  className="mt-4 font-mono text-xs text-auroraBlue hover:text-white transition-colors underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {/* Loaded Projects Grid */}
            {!isLoading && projects.length > 0 && (
              <motion.div
                key="grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
                    }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <ProjectCard 
                      project={project} 
                      onClick={() => setSelectedProject(project)} 
                      layoutId={`card-${project.id}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Shared Case Study Modal overlay */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </SectionWrapper>
  );
};

export default ProjectsPage;
