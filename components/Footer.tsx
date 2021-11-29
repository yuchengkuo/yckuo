import { domAnimation, LazyMotion, m } from 'framer-motion';
import { fade, fadeUp } from '@utils/animation';
import { MenuLinks } from 'data/MenuLinks';
import { NavLink } from './Link';

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer variants={fade} initial="0" animate="1" className="p-10">
        <div className="flex gap-10 mb-10">
          <p className="font-freak text-base text-gray9 dark:text-gray5">&#169; 2021 YuCheng Kuo</p>
          <p className="font-freak text-base text-gray7">Still WIP. Come back later! :&#41;</p>
        </div>
        <div className="flex pt-10 border-t border-gray7 border-opacity-20">
          {MenuLinks.map((menuLink) => (
            <div key={menuLink.group} className="w-1/4">
              <h4 className="text-gray7 font-apfel text-lg mb-3">{menuLink.group}</h4>
              <ul>
                {menuLink.links.map((link) => (
                  <m.li
                    variants={fadeUp}
                    initial="0"
                    whileInView="1"
                    viewport={{ once: false, margin: '-20px' }}
                    key={link.label}
                  >
                    <NavLink label={link.label} url={link.url} />
                  </m.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </m.footer>
    </LazyMotion>
  );
}
