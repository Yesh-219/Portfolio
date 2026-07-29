import React from 'react';
import { motion } from 'framer-motion';

export const FloatingTechBadges: React.FC = () => {
  const badges = [
    { label: 'Node.js', color: 'text-emerald-400', pos: 'top-4 -left-8' },
    { label: 'Express', color: 'text-slate-300', pos: 'top-1/3 -right-6' },
    { label: 'MySQL', color: 'text-blue-400', pos: 'bottom-16 -left-6' },
    { label: 'Python', color: 'text-yellow-400', pos: '-bottom-4 right-10' },
    { label: 'React', color: 'text-sky-400', pos: '-top-4 right-16' },
    { label: 'Docker', color: 'text-cyan-400', pos: 'top-2/3 -left-10' },
  ];

  return (
    <>
      {badges.map((b, idx) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 4 + idx * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: { duration: 0.8, delay: 0.4 + idx * 0.1 },
          }}
          className={`absolute ${b.pos} hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-white/15 backdrop-blur-md shadow-lg font-mono text-xs ${b.color} z-20 pointer-events-none select-none`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          <span>{b.label}</span>
        </motion.div>
      ))}
    </>
  );
};

export default FloatingTechBadges;
