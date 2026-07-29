import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Project } from '../../types';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  layoutId?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layoutId }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth Springs for Tilt
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  // Mouse Tracking Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Spotlight Coordinates
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Tilt Calculation (Max 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -5;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 5;
    
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(59, 130, 246, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: x,
        rotateY: y,
        transformPerspective: 1000,
        willChange: 'transform, opacity',
      }}
      className="group relative flex flex-col justify-between h-[420px] rounded-3xl p-6 sm:p-8 cursor-pointer select-none transition-shadow duration-300 shadow-xl hover:shadow-2xl bg-slate-900/60 backdrop-blur-md border border-white/10"
    >
      {/* 1. Dynamic Hover Spotlight Background */}
      <motion.div
        className="absolute inset-0 z-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBackground }}
      />
      
      {/* 2. Glass Reflection Overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      {/* 3. Top Content */}
      <div className="relative z-10 space-y-4">
        {/* Category & Featured Badge Row */}
        <div className="flex justify-between items-start">
          <div className="px-3 py-1 rounded-full bg-auroraBlue/10 border border-auroraBlue/20 text-auroraBlue font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
            <Code2 className="w-3 h-3" />
            {project.category}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <motion.h3 
            className="font-display font-bold text-2xl text-white group-hover:text-auroraBlue transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
          <p className="font-sans text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* 4. Bottom Content */}
      <div className="relative z-10 flex flex-col gap-5 border-t border-white/10 pt-5 mt-auto">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 font-mono text-[10px]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button 
                variant="icon" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
                title="View Repository"
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
            {project.demoUrl && (
              <Button 
                variant="icon" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); window.open(project.demoUrl, '_blank'); }}
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="text-auroraBlue font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
            View Case Study <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
