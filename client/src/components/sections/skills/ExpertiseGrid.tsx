import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useSkills } from '../../../hooks/useSkills';

const DomainCard = ({ domain, index }: { domain: { category: string, skills: string[] }, index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="p-6 rounded-3xl glass-panel bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col"
    >
      <h4 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-auroraBlue" />
        {domain.category}
      </h4>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {domain.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.1 + (i * 0.05), duration: 0.3 }}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] hover:bg-auroraBlue/20 hover:text-white hover:border-auroraBlue/50 transition-all cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const ExpertiseGrid: React.FC = () => {
  const { domains } = useSkills();

  return (
    <div className="space-y-8">
      <h3 className="font-display font-bold text-2xl text-white">Domain <span className="text-tealAccent">Expertise</span></h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, idx) => (
          <DomainCard key={domain.category} domain={domain} index={idx} />
        ))}
      </div>
    </div>
  );
};
