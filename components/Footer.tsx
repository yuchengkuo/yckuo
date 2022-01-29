import { domAnimation, LazyMotion, m } from 'framer-motion'
import { fade, fadeUp } from '@utils/animation'
import { routes } from '@utils/config/routes'
import { NavLink } from './Link'

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        variants={fade}
        initial="0"
        animate="1"
        className="px-16 py-10 tablet:px-10 phone:px-5"
      >
        <div className="flex flex-wrap justify-between">
          <p className="font-apfel text-base">&#169; 2022 YuCheng Kuo, WIP...</p>
          <p className="font-spectral italic text-base">Experiment</p>
        </div>
      </m.footer>
    </LazyMotion>
  )
}
