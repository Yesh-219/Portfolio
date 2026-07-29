import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExperienceCard } from '../ui/ExperienceCard';
import { useExperience } from '../../hooks/useExperience';
import { Experience } from '../../types';

interface ExperienceTimelineProps {
  onSelectExperience: (exp: Experience) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onSelectExperience }) => {
  const { experiences } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the container for the glowing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // The glowing timeline line grows dynamically
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-20" style={{ position: 'relative' }}>
      
      {/* Central Animated Timeline Spine */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
      <motion.div 
        className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-auroraBlue via-tealAccent to-transparent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        style={{ height: lineHeight }}
      />

      {/* Experience Nodes */}
      <div className="space-y-16 sm:space-y-24">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={exp.id} className="relative flex flex-col md:flex-row items-center justify-between w-full">
              
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 top-8 md:top-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-auroraBlue -translate-x-1/2 md:-translate-y-1/2 z-10">
                {exp.isCurrent && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-auroraBlue rounded-full blur-[4px]"
                  />
                )}
              </div>

              {/* Connecting Line (Mobile only) */}
              <div className="md:hidden absolute left-8 top-8 w-8 h-px bg-white/10" />

              {/* Card Container (Left or Right on Desktop) */}
              <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.05 }}
                  className={isLeft ? 'md:origin-right' : 'md:origin-left'}
                >
                  <ExperienceCard 
                    experience={exp} 
                    onClick={() => onSelectExperience(exp)}
                    layoutId={`exp-${exp.id}`}
                  />
                </motion.div>
              </div>

              {/* Empty Space for the alternate side (Desktop) */}
              <div className="hidden md:block w-5/12" />

            </div>
          );
        })}
      </div>
    </div>
  );
};
