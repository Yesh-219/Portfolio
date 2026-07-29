import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ENGINEERING_METRICS } from '../../../hooks/useSkills';
import { Terminal, Code2, Database, ShieldCheck } from 'lucide-react';

const AnimatedCounter = ({ value, inView }: { value: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const duration = 2000;
    let startTime: number | null = null;
    
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(easeOutExpo(progress) * (target - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [target, inView]);

  return <span>{count}{suffix}</span>;
};

export const EngineeringOverview: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { label: 'DSA Problems', value: ENGINEERING_METRICS.dsa, icon: <Terminal className="w-5 h-5 text-auroraBlue" /> },
    { label: 'Internships', value: ENGINEERING_METRICS.internships, icon: <Code2 className="w-5 h-5 text-emerald-400" /> },
    { label: 'Major Projects', value: ENGINEERING_METRICS.projects, icon: <Database className="w-5 h-5 text-tealAccent" /> },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full rounded-[2.5rem] p-8 sm:p-12 overflow-hidden glass-panel bg-slate-900/60 border border-white/10 shadow-2xl group"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-auroraBlue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-opacity duration-700 group-hover:opacity-70 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tealAccent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none transition-opacity duration-700 group-hover:opacity-60 opacity-20" />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
        
        {/* Left: Text & Tags */}
        <div className="space-y-6 md:w-1/2">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Engineering <span className="text-auroraBlue">Overview</span>
          </h2>
          <p className="font-sans text-slate-400 leading-relaxed text-sm sm:text-base">
            I specialize in architecting highly scalable backend systems and deeply integrated full-stack applications. My foundation is built on rigorous algorithmic problem solving and robust architectural design.
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {ENGINEERING_METRICS.keyTags.map((tag, idx) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1 + (idx * 0.05) }}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs flex items-center gap-1.5 backdrop-blur-md"
              >
                {tag === 'RBAC' && <ShieldCheck className="w-3 h-3 text-rose-400" />}
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right: Big Counters */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 md:w-1/2 justify-end">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.2 + (i * 0.15), duration: 0.6 }}
              className="flex-1 p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 backdrop-blur-md hover:bg-white/10 hover:border-auroraBlue/30 transition-all duration-300"
            >
              <div className="p-3 rounded-2xl bg-white/5 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <div className="font-display font-black text-4xl text-white mb-1">
                  <AnimatedCounter value={stat.value} inView={isInView} />
                </div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};
