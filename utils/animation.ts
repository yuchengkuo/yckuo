import { Variants } from 'framer-motion';

export const scale: Variants = {
  0: { scale: 0 },
  1: { scale: 1 },
};

export const fade: Variants = {
  0: { opacity: 0 },
  1: { opacity: 1 },
};

export const slideUp: Variants = {
  0: { y: '50%', opacity: 0 },
  1: { y: 0, opacity: 1 },
};

export const slideDown: Variants = {
  0: { y: '-50%', opacity: 0 },
  1: { y: 0, opacity: 1 },
};
