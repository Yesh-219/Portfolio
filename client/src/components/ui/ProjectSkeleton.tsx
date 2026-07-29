import React from 'react';
import { motion } from 'framer-motion';

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative h-[420px] rounded-3xl glass-panel bg-slate-900/40 border border-white/5 overflow-hidden shadow-xl"
        >
          {/* Shimmer Effect overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
          
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Badge Skeleton */}
              <div className="w-24 h-6 rounded-full bg-white/5" />
              
              {/* Title Skeleton */}
              <div className="w-3/4 h-8 rounded-lg bg-white/5" />
              
              {/* Description Lines Skeleton */}
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 rounded bg-white/5" />
                <div className="w-5/6 h-4 rounded bg-white/5" />
                <div className="w-4/6 h-4 rounded bg-white/5" />
              </div>
            </div>

            {/* Bottom Actions Skeleton */}
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <div className="flex gap-2">
                <div className="w-16 h-6 rounded-full bg-white/5" />
                <div className="w-16 h-6 rounded-full bg-white/5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
