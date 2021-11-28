import { fade } from '@utils/animation';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState } from 'react';

const Cursor = () => {
  const [isVisible, setVisible] = useState(false);
  const size = useSpring(1, { damping: 16 });
  const posX = useSpring(0, { damping: 24, mass: 2 });
  const posY = useSpring(0, { damping: 24, mass: 2 });
  const shouldReducedMotion = useReducedMotion();
  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('mouseover', (e) => {
      posX.set(e.clientX - 4);
      posY.set(e.clientY - 4);
      setVisible(true);
    });
    body.addEventListener('mousemove', (e) => {
      posX.set(e.clientX - 4);
      posY.set(e.clientY - 4);
    });
    body.addEventListener('mouseout', () => setVisible(false));
  });
  if (shouldReducedMotion) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <LazyMotion features={domAnimation}>
          <m.div
            initial="0"
            animate="1"
            exit="0"
            variants={fade}
            style={{ x: posX, y: posY, scale: size }}
            className="fixed w-2 h-2 bg-gray6 rounded-full z-50 pointer-events-none mix-blend-difference tablet:hidden"
          ></m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default Cursor;
