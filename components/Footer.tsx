import { domAnimation, LazyMotion, m } from 'framer-motion'
import { fade, fadeUp } from '@utils/animation'
import { routes } from '@utils/config/routes'
import Link from 'next/link'

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
        <nav className="mt-10 border-t border-gray/20 dark:border-darkGray/20 flex flex-wrap">
          {routes.map((route) => (
            <ul className="p-5 grow">
              <p className="font-apfel text-secondary dark:text-darkSecondary">{route.group}</p>
              {route.links.map((link) => (
                <li className="body-font-settings text-base font-medium mt-4">
                  <Link href={link.url} passHref>
                    <m.a
                      variants={{ ...fadeUp, hover: { y: -4 } }}
                      initial="0"
                      whileInView="1"
                      whileHover="hover"
                      whileTap={{ scale: 0.99 }}
                      whileFocus="hover"
                      className=" px-3 -mx-3 py-2 -my-2 inline-block w-full hover:bg-gray/10 dark:hover:bg-darkGray/10 transition-colors duration-200 ease-out"
                    >
                      {link.label}
                    </m.a>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </m.footer>
    </LazyMotion>
  )
}
