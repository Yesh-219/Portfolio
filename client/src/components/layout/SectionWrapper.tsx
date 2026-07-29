import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '../../lib/motion';

export interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
  return (
    <motion.section
      variants={pageTransitionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.1 }}
      exit="exit"
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center relative ${className}`}
    >
      {children}
    </motion.section>
  );
};
