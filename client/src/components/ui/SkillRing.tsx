import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillRingProps {
  percentage: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
}

export const SkillRing: React.FC<SkillRingProps> = ({ 
  percentage, 
  label, 
  sublabel,
  size = 120, 
  strokeWidth = 6 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    if (isInView) {
      // Small delay for staggered feel
      const timeout = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 group">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Ring */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Foreground Ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className="text-auroraBlue drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        
        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display font-bold text-xl text-white group-hover:scale-110 transition-transform duration-300">
            {animatedPercentage}%
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h4 className="font-sans font-semibold text-white text-sm tracking-wide group-hover:text-auroraBlue transition-colors">{label}</h4>
        {sublabel && (
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{sublabel}</p>
        )}
      </div>
    </div>
  );
};
