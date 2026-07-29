import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Code2, ExternalLink } from 'lucide-react';
import { Button } from '../../ui/Button';

export const DeveloperProfiles: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      
      {/* LeetCode Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-[2rem] glass-panel bg-slate-900/60 border border-white/10 hover:border-auroraBlue/30 transition-colors flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFA116]/10 flex items-center justify-center border border-[#FFA116]/20">
              <Code2 className="w-5 h-5 text-[#FFA116]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg">LeetCode</h4>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Problem Solving</p>
            </div>
          </div>
          <Button variant="icon" size="sm" onClick={() => window.open('#', '_blank')} title="View Profile">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="font-display font-black text-5xl text-white mb-2">500<span className="text-auroraBlue">+</span></div>
            <div className="font-sans text-sm text-slate-400">Total Problems Solved</div>
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <div className="text-xs text-emerald-400 font-mono">Easy</div>
              <div className="font-semibold text-white">200+</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-[#FFA116] font-mono">Medium</div>
              <div className="font-semibold text-white">250+</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-rose-400 font-mono">Hard</div>
              <div className="font-semibold text-white">50+</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* GitHub Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-8 rounded-[2rem] glass-panel bg-slate-900/60 border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg">GitHub</h4>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Open Source</p>
            </div>
          </div>
          <Button variant="icon" size="sm" onClick={() => window.open('https://github.com/yeswanth', '_blank')} title="View GitHub">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="font-display font-black text-4xl text-white mb-2">35<span className="text-slate-500">+</span></div>
              <div className="font-sans text-sm text-slate-400">Repositories</div>
            </div>
            <div className="text-right">
              <div className="font-display font-black text-2xl text-white mb-2">950<span className="text-emerald-400">+</span></div>
              <div className="font-sans text-sm text-slate-400">Contributions</div>
            </div>
          </div>
          
          {/* Simulated Contribution Graph */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex gap-1">
              {Array.from({ length: 14 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 3 }).map((_, rowIdx) => {
                    // Randomize intensity for visual effect
                    const intensities = ['bg-white/5', 'bg-emerald-900/40', 'bg-emerald-600/60', 'bg-emerald-400'];
                    const bg = intensities[Math.floor(Math.random() * intensities.length)];
                    return <div key={rowIdx} className={`w-3 h-3 rounded-sm ${bg}`} />;
                  })}
                </div>
              ))}
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: 14 }).map((_, colIdx) => (
                  <div key={`sm-${colIdx}`} className="flex flex-col gap-1">
                    {Array.from({ length: 3 }).map((_, rowIdx) => {
                      const intensities = ['bg-white/5', 'bg-emerald-900/40', 'bg-emerald-600/60', 'bg-emerald-400'];
                      const bg = intensities[Math.floor(Math.random() * intensities.length)];
                      return <div key={`sm-${rowIdx}`} className={`w-3 h-3 rounded-sm ${bg}`} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
