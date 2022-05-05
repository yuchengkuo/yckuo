import { domAnimation, LazyMotion, m } from 'framer-motion'
import { fade, fadeUp, scale } from '@utils/animation'
import { routes } from '@utils/config/routes'
import Link from 'next/link'
import { RightArrowIcon, UpRightArrowIcon } from './Icons'
import ThemeSelect from './ThemeSelect'

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
          <p className="font-spectral text-base italic">Explore</p>
        </div>
        <nav className="border-gray-5 dark:border-grayDark-5 mt-10 flex gap-6 border-t phone:flex-col phone:gap-2">
          {routes.map((route) => (
            <ul
              key={route.group}
              className="border-gray-5 dark:border-grayDark-5 my-5 grow border-r last:border-0 phone:border-none"
            >
              <p className="text-gray-11 dark:text-grayDark-11 font-apfel">{route.group}</p>
              {route.links.map((link) => (
                <li key={link.label} className="mt-4 text-base font-medium body-font-settings">
                  <Link href={link.url} passHref>
                    <m.a
                      rel={link.label === 'Github' ? 'me' : null}
                      variants={{ ...fadeUp, 1: { y: -4 } }}
                      initial="0"
                      whileInView="visible"
                      whileHover="1"
                      whileTap={{ scale: 0.99 }}
                      className="hover:bg-gray-4 dark:hover:bg-grayDark-4 active:bg-gray-5 dark:active:bg-grayDark-5 -mx-3 -my-2 inline-flex w-full select-none items-baseline justify-between px-3 py-2 transition-colors duration-200 ease-out"
                    >
                      {link.label}
                      <m.div variants={scale} className="inline-block h-4 w-4">
                        {link.url.startsWith('http') ? <UpRightArrowIcon /> : <RightArrowIcon />}
                      </m.div>
                    </m.a>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <div className="flex justify-end">
          <ThemeSelect />
        </div>
      </m.footer>
    </LazyMotion>
  )
}
