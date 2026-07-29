import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../../types';

interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Backend', 'AI', 'Full Stack', 'Other'];

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearch,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full mb-10 z-20 relative">
      
      {/* Category Pills */}
      <div className="relative flex flex-wrap items-center justify-center sm:justify-start gap-2 p-1.5 rounded-2xl glass-panel bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-lg">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`relative px-4 py-1.5 rounded-xl font-mono text-[11px] sm:text-xs font-medium transition-colors duration-300 outline-none ${
              activeCategory === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-white/15 border border-white/20 rounded-xl shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 uppercase tracking-wider">{cat}</span>
          </button>
        ))}
      </div>

      {/* Live Search Input */}
      <div className="relative w-full sm:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search projects..."
          className="block w-full pl-9 pr-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-2xl font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-auroraBlue/50 focus:border-transparent transition-all backdrop-blur-xl shadow-lg"
        />
      </div>

    </div>
  );
};
