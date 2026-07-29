import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, LayoutDashboard, Database, ShieldCheck } from 'lucide-react';
import { Experience } from '../../types';
import { Badge } from './Badge';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  layoutId?: string;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose, layoutId }) => {
  
  useEffect(() => {
    if (experience) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [experience]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md"
          />

          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 cursor-zoom-out overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel bg-slate-950/90 border border-white/20 shadow-2xl rounded-3xl cursor-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Header */}
              <div className="relative p-8 sm:p-10 border-b border-white/10 overflow-hidden bg-slate-900 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-auroraBlue/10 via-transparent to-tealAccent/10 pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-auroraBlue text-white flex items-center justify-center font-display font-bold text-2xl shadow-auroraGlow">
                      {experience.logoPlaceholder}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-3xl text-white">{experience.company}</h2>
                      <p className="font-mono text-sm text-auroraBlue">{experience.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 sm:p-10 space-y-10">
                
                {/* Tech Stack Matrix */}
                <div className="space-y-4">
                  <h3 className="font-sans font-semibold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-400" /> Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs hover:bg-white/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Split Layout: Responsibilities & Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" /> Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {experience.responsibilities.map((req, i) => (
                        <li key={i} className="text-sm text-slate-400 leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {experience.challenges && experience.solutions && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-sans font-semibold text-white flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-rose-400" /> Challenge
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                          {experience.challenges}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-sans font-semibold text-white flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4 text-tealAccent" /> Solution
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed bg-teal-500/5 p-4 rounded-xl border border-teal-500/10">
                          {experience.solutions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Learnings */}
                {experience.keyLearnings && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-sans font-semibold text-white mb-2">Key Learnings</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {experience.keyLearnings}
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
