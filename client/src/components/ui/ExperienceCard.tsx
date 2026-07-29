import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Briefcase, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Experience } from '../../types';
import { Button } from './Button';

interface ExperienceCardProps {
  experience: Experience;
  onClick: () => void;
  layoutId?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick, layoutId }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Springs
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  // Mouse Tracking Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(((e.clientY - rect.top - centerY) / centerY) * -3); // subtle tilt
    y.set(((e.clientX - rect.left - centerX) / centerX) * 3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ 
        rotateX: x, 
        rotateY: y, 
        transformPerspective: 1000,
        willChange: 'transform, opacity'
      }}
      className={`relative p-6 sm:p-8 rounded-3xl cursor-pointer select-none transition-shadow duration-300 backdrop-blur-md border ${
        experience.isCurrent 
          ? 'bg-slate-900/80 border-auroraBlue/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
          : 'bg-slate-900/50 border-white/10 hover:border-white/20'
      }`}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 z-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl ${
              experience.isCurrent ? 'bg-auroraBlue text-white shadow-auroraGlow' : 'bg-slate-800 text-slate-400 border border-white/5'
            }`}>
              {experience.logoPlaceholder}
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-auroraBlue transition-colors">
                {experience.company}
              </h3>
              <p className="font-mono text-xs text-auroraBlue">{experience.role}</p>
            </div>
          </div>
          {experience.isCurrent && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Current
            </div>
          )}
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap gap-4 mb-6 text-slate-400 font-mono text-xs">
          <div className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> {experience.period}
          </div>
          {experience.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {experience.location}
            </div>
          )}
        </div>

        {/* Highlights List */}
        <ul className="space-y-2 mb-6">
          {experience.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed font-sans">
              <Sparkles className="w-4 h-4 text-auroraBlue shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
          {experience.highlights.length > 3 && (
            <li className="text-xs font-mono text-slate-500 pl-6">
              + {experience.highlights.length - 3} more achievements...
            </li>
          )}
        </ul>

        {/* Tech Stack & Action */}
        <div className="flex items-end justify-between border-t border-white/5 pt-5">
          <div className="flex flex-wrap gap-2 max-w-[70%]">
            {experience.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]">
                {tech}
              </span>
            ))}
            {experience.technologies.length > 3 && (
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-500 font-mono text-[10px]">
                +{experience.technologies.length - 3}
              </span>
            )}
          </div>
          
          <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
