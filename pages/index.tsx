import { fade, fadeUp } from '@utils/animation';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import Layout from '@components/layout/Layout';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <Layout>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="font-hagrid text-3xl phone:text-xl"
        >
          YuCheng Kuo
        </m.h1>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
          className="font-apfel mt-1 text-4xl phone:text-2xl"
        >
          Digital Designer, Engineer
        </m.h1>
        <m.p
          variants={fade}
          initial="0"
          animate="1"
          className="text-base font-freak mt-4 text-gray8 dark:text-gray6"
        >
          Currently @{' '}
          <a href="https://oen.tw" className="hover:bg-gray7 hover:bg-opacity-30">
            Oen.tw
          </a>
        </m.p>
      </Layout>
    </LazyMotion>
  );
}
