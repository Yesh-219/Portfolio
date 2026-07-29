import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const STATS: Stat[] = [
  { label: 'Internships', value: 3, suffix: '+' },
  { label: 'Projects', value: 5, suffix: '+' },
  { label: 'DSA Problems', value: 500, suffix: '+' },
  { label: 'Backend APIs', value: 20, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
];

const AnimatedNumber = ({ value, inView }: { value: number; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const end = value;
    if (start === end) return;
    
    // Total animation time 2 seconds
    const duration = 2000;
    let startTime: number | null = null;
    
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(easeOutQuart(progress) * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, inView]);

  return <span>{count}</span>;
};

export const StatsCounter: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto py-12 px-4 border-t border-white/5 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center space-y-2 p-4 rounded-3xl glass-panel bg-slate-900/30 border border-white/5 hover:border-auroraBlue/30 hover:bg-slate-900/50 transition-colors"
          >
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-auroraBlue to-tealAccent flex items-baseline">
              <AnimatedNumber value={stat.value} inView={isInView} />
              <span>{stat.suffix}</span>
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
