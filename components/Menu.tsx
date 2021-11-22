import { box } from '@styles/box';
import { button } from '@styles/button';
import { link } from '@styles/link';
import { text } from '@styles/text';
import { fade, slideUp } from '@utils/animation';
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
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      <div
        className={box({
          position: 'fixed',
          right: 60,
          top: 40,
          zIndex: 100,
        })}
      >
        <button
          className={button({ variant: 'menu', css: { p: 40, mr: -40, mt: -40 } })}
          onClick={() => setVisible(!isVisible)}
          onMouseEnter={() => setVisible(true)}
        >
          Menu
        </button>
      </div>
      <AnimatePresence>
        {isVisible && (
          <LazyMotion features={domAnimation}>
            <m.div
              className={box({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99,
                backgroundImage: 'linear-gradient(45deg, transparent 1.6px, $background 1.6px)',
                backgroundSize: '6px 6px',
              })}
              variants={fade}
              animate="1"
              initial="0"
              exit="0"
            />
            <div
              className={box({
                position: 'fixed',
                top: 112,
                right: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 99,
              })}
              onMouseLeave={() => setVisible(false)}
            >
              {MenuLinks.map((menuLink) => (
                <div key={menuLink.group} className={box({ p: 40, flex: '1 0 20vw' })}>
                  <m.h4
                    className={text({
                      size: 6,
                      css: { color: '$gray', mb: 40, fontFamily: '$apfel' },
                    })}
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
                      className={box({ listStyle: 'none', p: 0, m: 0 })}
                      transition={{ staggerChildren: 0.02 }}
                      initial="0"
                      animate="1"
                      exit="2"
                    >
                      {menuLink.links.map((linkItem, i) => (
                        <m.li
                          key={i}
                          className={box({ mb: 16 })}
                          variants={slideUp}
                          transition={{ duration: 0.3 }}
                        >
                          {linkItem.url.startsWith('http') ? (
                            <a className={link({ variant: 'navLink' })} href={linkItem.url}>
                              {linkItem.label}
                            </a>
                          ) : (
                            <Link href={linkItem.url} passHref>
                              <a
                                className={link({ variant: 'navLink' })}
                                onClick={() => setVisible(false)}
                              >
                                {linkItem.label}
                              </a>
                            </Link>
                          )}
                        </m.li>
                      ))}
                    </m.ul>
                  </nav>
                </div>
              ))}
            </div>
          </LazyMotion>
        )}
      </AnimatePresence>
      {!shouldReducedMotion && (
        <div
          className={box({
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            pointerEvents: 'none',
          })}
        >
          <LazyMotion features={domAnimation}>
            <m.div
              className={box({
                position: 'absolute',
                width: '160vw',
                height: '160vh',
                borderRadius: '50%',
                left: '98vw',
                top: '-30vh',
                backgroundColor: '$primary',
                filter: 'blur(160px) opacity(0.8)',
              })}
              style={{ x: posX, y: posY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
            />
          </LazyMotion>
        </div>
      )}
    </>
  );
};
