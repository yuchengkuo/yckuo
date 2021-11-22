import { box } from '@styles/box';
import { link } from '@styles/link';
import { text } from '@styles/text';
import { fade, slideUp } from '@utils/animation';
import { domAnimation, LazyMotion, m } from 'framer-motion';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className={box({ p: 40, height: 'calc(100vh - 208px)' })}>
        <m.h1
          variants={slideUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className={text({ size: 8, css: { fontFamily: '$hagrid' } })}
        >
          YuCheng Kuo
        </m.h1>
        <m.h1
          variants={slideUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
          className={text({ size: 9, css: { fontFamily: '$apfel', mt: 8 } })}
        >
          Digital Designer, Engineer
        </m.h1>
        <m.p
          variants={fade}
          initial="0"
          animate="1"
          className={text({ size: 3, css: { fontFamily: '$freak', mt: 16, color: '$gray' } })}
        >
          Currently @{' '}
          <a href="https://oen.tw" className={link({ css: { fontFamily: '$freak' } })}>
            Oen.tw
          </a>
        </m.p>
      </div>
    </LazyMotion>
  );
}
