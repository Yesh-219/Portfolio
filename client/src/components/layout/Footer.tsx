import React from 'react';
import { Command, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 border-t border-white/10 bg-slate-950/80 backdrop-blur-md text-slate-400 font-mono text-xs select-none relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          <Command className="w-4 h-4 text-auroraBlue" />
          <span className="text-white font-bold">Yeswanth Kumar Kaluva</span>
          <span className="text-slate-500">• © {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>React 19 & Express Prisma Backend</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-tealAccent">v1.0.0 Enterprise Foundation</span>
        </div>

      </div>
    </footer>
  );
};
