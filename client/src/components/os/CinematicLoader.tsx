import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Command } from 'lucide-react';

export interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Booting AI Core...');

  useEffect(() => {
    const steps = [
      { p: 15, t: 'Booting AI Core...' },
      { p: 30, t: 'Loading Experience...' },
      { p: 50, t: 'Connecting GitHub API...' },
      { p: 70, t: 'Loading Projects Matrix...' },
      { p: 85, t: 'Loading Skills Database...' },
      { p: 95, t: 'Optimising Interface...' },
      { p: 100, t: 'System Ready.' },
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgress(steps[stepIdx].p);
        setStatusText(steps[stepIdx].t);
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070E] text-slate-100 select-none overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
        
        {/* Apple Glass Icon Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center border border-white/20 shadow-auroraGlow bg-slate-900/80 backdrop-blur-2xl"
        >
          <Cpu className="w-10 h-10 text-auroraBlue animate-pulse" />
        </motion.div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-display font-bold text-2xl tracking-tight text-gradient">
            Yeswanth Kumar Kaluva
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Apple & AI OS Landing Experience • v1.0.0
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-white/10 p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-auroraBlue via-royalPurple to-tealAccent rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          {progress === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-tealAccent" />
          ) : (
            <Command className="w-3.5 h-3.5 text-auroraBlue animate-spin" />
          )}
          <span>{statusText}</span>
        </div>

      </div>
    </motion.div>
  );
};

export default CinematicLoader;
