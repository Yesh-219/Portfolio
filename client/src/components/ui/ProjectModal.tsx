import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { Button } from './Button';
import { Badge } from './Badge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  layoutId?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, layoutId }) => {
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-slate-950/90 border border-white/20 shadow-2xl rounded-3xl pointer-events-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Hero Area */}
              <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden rounded-t-3xl border-b border-white/10 flex flex-col justify-end p-8">
                {/* Simulated Ambient Hero Graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-auroraBlue/20 via-royalPurple/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-auroraBlue/30 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-2xl">
                  <Badge variant="blue" icon={<Cpu className="w-3.5 h-3.5" />}>
                    {project.category} Architecture
                  </Badge>
                  <motion.h2 
                    className="font-display font-extrabold text-3xl sm:text-5xl text-white"
                  >
                    {project.title}
                  </motion.h2>
                  <p className="font-mono text-sm text-auroraBlue">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 space-y-10">
                
                {/* Tech Stack Matrix */}
                <div>
                  <h3 className="font-sans font-semibold text-white mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-400" /> Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture & Problem Solving */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-white">Project Overview</h3>
                    <p className="font-sans text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-white">Architecture & Solutions</h3>
                    <p className="font-sans text-slate-400 text-sm leading-relaxed">
                      {project.architectureDetails}
                    </p>
                  </div>
                </div>

                {/* Key Highlights / Metrics */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-sans font-semibold text-white mb-4">Implementation Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Optimised backend query performance',
                      'Secure JWT Authentication architecture',
                      'Responsive layout with Framer Motion',
                      'Comprehensive REST API design'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 font-sans">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  {project.githubUrl && (
                    <Button variant="primary" leftIcon={<Github className="w-4 h-4" />} onClick={() => window.open(project.githubUrl, '_blank')}>
                      View Source Code
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="outline" leftIcon={<ExternalLink className="w-4 h-4" />} onClick={() => window.open(project.demoUrl, '_blank')}>
                      Live Deployment
                    </Button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
