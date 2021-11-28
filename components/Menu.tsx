import { fade, fadeUp } from '@utils/animation';
import { MenuLinks } from 'data/MenuLinks';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavLink } from './Link';

export const Menu = () => {
  const [isVisible, setVisible] = useState(false);
  const posX = useSpring(0, { damping: 50 });
  const Y = useSpring(0, { damping: 50 });
  const posY = useTransform(Y, [0, 1], [400, -400]);
  const shouldReducedMotion = useReducedMotion();
  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('mousemove', (e) => {
      posX.set((e.clientX / window.innerWidth) * -240);
      Y.set(e.clientY / window.innerHeight);
    });
    body.addEventListener('keydown', (e) => {
      if (isVisible && e.key === 'Escape') setVisible(false);
    });
  });
  return (
    <>
      <LazyMotion features={domAnimation}>
        <div className="fixed right-10 top-10 z-50">
          <m.button
            className="font-freak px-3 py-2 text-base hover:text-marine6 dark:hover:text-cheese5 bg-gray7 bg-opacity-10 rounded-md phone:text-sm"
            onClick={() => setVisible(!isVisible)}
            onMouseEnter={() => setVisible(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            Menu
          </m.button>
        </div>
        <AnimatePresence>
          {isVisible && (
            <>
              <m.div
                className="fixed top-0 left-0 w-screen h-screen z-40 nav-bg dark:nav-bg-dark"
                variants={fade}
                animate="1"
                initial="0"
                exit="0"
              />
              <div
                className="fixed top-20 right-10 flex z-50"
                onMouseLeave={() => setVisible(false)}
              >
                {MenuLinks.map((menuLink) => (
                  <div key={menuLink.group} className="p-6 w-28">
                    <m.h4
                      className="text-gray7 font-apfel text-lg mb-3"
                      variants={fade}
                      transition={{ duration: 0.4 }}
                      initial="0"
                      animate="1"
                      exit="0"
                    >
                      {menuLink.group}
                    </m.h4>
                    <nav>
                      <m.ul
                        initial="0"
                        animate="1"
                        exit="2"
                        className="list-none"
                        transition={{ staggerChildren: 0.02 }}
                      >
                        {menuLink.links.map((linkItem, i) => (
                          <m.li
                            key={i}
                            transition={{ duration: 0.3 }}
                            variants={fadeUp}
                            className="mb-1"
                            onClick={() => setVisible(false)}
                          >
                            <NavLink label={linkItem.label} url={linkItem.url} />
                          </m.li>
                        ))}
                      </m.ul>
                    </nav>
                  </div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
        {!shouldReducedMotion && (
          <div className="fixed h-screen w-screen overflow-hidden pointer-events-none">
            <m.div
              className="absolute rounded-full bg-marine6 dark:bg-cheese5"
              style={{
                x: posX,
                y: posY,
                width: '160vw',
                height: '160vh',
                left: '98vw',
                top: '-30vh',
                filter: 'blur(160px) opacity(0.8)',
                zIndex: -10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
            />
          </div>
        )}
      </LazyMotion>
    </>
  );
};
