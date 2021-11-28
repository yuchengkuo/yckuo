import { domAnimation, LazyMotion, m } from 'framer-motion';
import { fade } from '@utils/animation';

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer variants={fade} initial="0" animate="1">
        <div className="flex gap-10 p-10">
          <p className="font-freak text-base">&#169; 2021 YuCheng Kuo</p>
          <p className="font-freak text-base text-gray7">Still WIP. Come back later! :&#41;</p>
        </div>
      </m.footer>
    </LazyMotion>
  );
}
