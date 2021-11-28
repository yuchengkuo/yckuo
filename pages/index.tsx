import { fade, fadeUp } from '@utils/animation';
import { domAnimation, LazyMotion, m } from 'framer-motion';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="p-10 h-auto" style={{ height: 'calc(100vh - 216px)' }}>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="text-4xl font-hagrid"
        >
          YuCheng Kuo
        </m.h1>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
          className="text-4xl font-apfel mt-2"
        >
          Digital Designer, Engineer
        </m.h1>
        <m.p
          variants={fade}
          initial="0"
          animate="1"
          className="text-base font-freak mt-4 text-gray7"
        >
          Currently @ <a href="https://oen.tw">Oen.tw</a>
        </m.p>
      </div>
    </LazyMotion>
  );
}
