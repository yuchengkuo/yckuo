import { domAnimation, LazyMotion, m } from 'framer-motion'
import { fade, fadeUp } from '@utils/animation'
import { routes } from '@utils/config/routes'
import { NavLink } from './Link'

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer variants={fade} initial="0" animate="1" className="p-16 tablet:px-10 phone:px-5">
        <div className="flex flex-wrap gap-10 mb-10 phone:gap-3">
          <p className="font-freak text-base text-gray9 dark:text-gray5">&#169; 2022 YuCheng Kuo</p>
          <p className="font-freak text-base text-gray7">Still WIP. Come back later! :&#41;</p>
        </div>
        <div className="flex flex-wrap pt-10 phone:gap-y-6 border-t border-gray7/20">
          {routes.map((route) => (
            <div key={route.group} className="w-1/4 phone:w-1/2">
              <h4 className="text-gray7 font-apfel text-lg mb-3">{route.group}</h4>
              <ul>
                {route.links.map((link) => (
                  <m.li
                    variants={fadeUp}
                    initial="0"
                    whileInView="1"
                    viewport={{ once: false, margin: '-20px' }}
                    key={link.label}
                    className="flex gap-2 items-baseline"
                  >
                    <NavLink wip={link.wip} label={link.label} url={link.url} />
                  </m.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </m.footer>
    </LazyMotion>
  )
}
