import { text } from '@styles/text';
import { box } from '@styles/box';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { fade } from '@utils/animation';

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer variants={fade} initial="0" animate="1">
        <div className={box({ p: 40, display: 'flex', gap: 40 })}>
          <p
            className={text({
              css: { fontSize: '$3', fontFamily: '$freak', color: '$foreground' },
            })}
          >
            &#169; 2021 YuCheng Kuo
          </p>
          <p
            className={text({
              css: { fontSize: '$3', fontFamily: '$freak', color: '$gray' },
            })}
          >
            Still WIP. Come back later! :&#41;
          </p>
        </div>
      </m.footer>
    </LazyMotion>
  );
}
