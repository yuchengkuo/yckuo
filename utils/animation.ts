import { Transition, Variants } from 'framer-motion';

export const scale: Variants = {
  0: { scale: 0 },
  1: { scale: 1 },
};

export const fade: Variants = {
  0: { opacity: 0 },
  1: { opacity: 1 },
};

export const fadeUp: Variants = {
  0: { y: '50%', opacity: 0 },
  1: { y: 0, opacity: 1 },
  2: { y: '-50%', opacity: 0 },
};

export const slideUp: Variants = {
  0: { y: '100%' },
  1: { y: 0 },
  2: { y: '-100%' },
};

export const slideDown: Variants = {
  0: { y: '-50%', opacity: 0 },
  1: { y: 0, opacity: 1 },
  2: { y: '50%', opacity: 0 },
};

export const headingTransition: Transition = {
  type: 'spring',
  damping: 20,
  mass: 1,
};
