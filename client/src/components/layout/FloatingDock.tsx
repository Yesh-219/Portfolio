import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code, Briefcase, Award, Mail, FileText, User } from 'lucide-react';
import { getLenis } from '../../lib/lenis';

export const FloatingDock: React.FC = () => {
  const [activeHash, setActiveHash] = React.useState(window.location.hash || '#home');

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const dockItems = [
    { label: 'About', path: '#hero', icon: User },
    { label: 'Projects', path: '#projects', icon: Code },
    { label: 'Experience', path: '#experience', icon: Briefcase },
    { label: 'Skills', path: '#skills', icon: Award },
    { label: 'Contact', path: '#contact', icon: Mail },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(path, { offset: 0 });
      setActiveHash(path);
      return;
    }

    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHash(path);
    } else if (path === '#contact') {
      window.location.href = 'mailto:yeswanthkumarkaluva@gmail.com';
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-2xl glass-panel border border-white/20 shadow-2xl flex items-center gap-2 bg-slate-950/80 backdrop-blur-2xl">
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeHash === item.path;
        
        return (
          <a key={item.path} href={item.path} onClick={(e) => handleScrollTo(e, item.path)}>
            <motion.div
              whileHover={{ y: -6, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`relative group p-2.5 sm:p-3 rounded-xl transition-colors duration-200 flex flex-col items-center ${
                isActive
                  ? 'bg-auroraBlue/20 text-white border border-auroraBlue/40 shadow-auroraGlow'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-auroraBlue" />
              )}

              {/* Hover Label Tooltip */}
              <span className="absolute -top-10 px-2.5 py-1 rounded-md bg-slate-900/90 text-white font-mono text-[11px] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {item.label}
              </span>
            </motion.div>
          </a>
        );
      })}
    </nav>
  );
};
