import { domAnimation, LazyMotion, m } from 'framer-motion'
import { fade, fadeUp, scale } from '@utils/animation'
import { routes } from '@utils/config/routes'
import Link from 'next/link'
import { RightArrowIcon, UpRightArrowIcon } from './Icons'

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
          <p className="font-spectral italic text-base">Explore</p>
        </div>
        <nav className="mt-10 border-t border-gray-5 dark:border-grayDark-5 flex gap-6 phone:flex-col phone:gap-2">
          {routes.map((route) => (
            <ul
              key={route.group}
              className="my-5 grow border-r border-gray-5 dark:border-grayDark-5 last:border-0 phone:border-none"
            >
              <p className="font-apfel text-gray-11 dark:text-grayDark-11">{route.group}</p>
              {route.links.map((link) => (
                <li key={link.label} className="body-font-settings text-base font-medium mt-4">
                  <Link href={link.url} passHref>
                    <m.a
                      rel={link.label === 'Github' ? 'me' : null}
                      variants={{ ...fadeUp, 1: { y: -4 } }}
                      initial="0"
                      whileInView="visible"
                      whileHover="1"
                      whileTap={{ scale: 0.99 }}
                      className="px-3 -mx-3 py-2 -my-2 inline-flex items-baseline justify-between w-full hover:bg-gray-4 dark:hover:bg-grayDark-4 active:bg-gray-5 dark:active:bg-grayDark-5 transition-colors duration-200 ease-out"
                    >
                      {link.label}
                      <m.div variants={scale} className="inline-block w-4 h-4">
                        {link.url.startsWith('http') ? <UpRightArrowIcon /> : <RightArrowIcon />}
                      </m.div>
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
