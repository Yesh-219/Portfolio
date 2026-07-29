import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillRing } from '../../ui/SkillRing';
import { useSkills } from '../../../hooks/useSkills';

export const LanguageSkills: React.FC = () => {
  const { languages } = useSkills();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="space-y-8">
      <h3 className="font-display font-bold text-2xl text-white">Programming <span className="text-auroraBlue">Languages</span></h3>
      
      <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {languages.map((lang, idx) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
            className="flex justify-center"
          >
            <SkillRing 
              percentage={lang.proficiency} 
              label={lang.name} 
              sublabel={lang.primaryUse} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
