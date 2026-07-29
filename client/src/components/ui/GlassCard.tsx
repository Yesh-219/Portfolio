import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: 'blue' | 'purple' | 'teal' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = true,
  glowColor = 'none',
  onClick
}) => {
  const glowClasses = {
    blue: 'shadow-auroraGlow border-blue-500/30',
    purple: 'shadow-purple-500/20 border-purple-500/30',
    teal: 'shadow-tealGlow border-teal-500/30',
    none: 'border-white/12 shadow-2xl'
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } : undefined}
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-slate-950/50 backdrop-blur-xl',
          hover ? 'glass-panel-hover cursor-pointer' : '',
          glowClasses[glowColor],
          className
        )
      )}
    >
      {/* Soft Ambient Light Corner Overlay */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlassCard;
