import React from 'react';

export const SectionSkeleton: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 opacity-50 animate-pulse">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-6 w-32 bg-slate-800 rounded-full" />
          <div className="h-12 w-64 bg-slate-800 rounded-lg" />
          <div className="h-4 w-96 bg-slate-800 rounded-md mt-4" />
        </div>
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 w-full bg-slate-800/50 rounded-3xl border border-white/5 glass-panel" />
          ))}
        </div>
      </div>
    </div>
  );
};
