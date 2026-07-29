import { Variants, Transition } from 'framer-motion';

// Apple Spring Physics Transition Preset
export const appleSpringTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1
};

export const smoothEaseTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1]
};

// Page Transition Variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 15,
    filter: 'blur(4px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: smoothEaseTransition
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Stagger Container Variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

// Fade & Scale Up Item Variant
export const fadeScaleItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: smoothEaseTransition
  }
};
