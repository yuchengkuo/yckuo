import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftArrowIcon, LogoIcon } from './Icons'
import { fade } from '@utils/animation'
import { useEffect, useState } from 'react'
import useIntersectionObserver from '@utils/hooks/useIntersectionObserver'

const Header = () => {
  const router = useRouter()
  function handleRouter(path: string) {
    const arr = path.split('/')
    const title = arr.slice(-1)[0]
    arr.splice(-1, 1)
    return {
      backHref: arr.length === 1 ? '/' : arr.join('/'),
      title: title.replace(/[a-z]/, (str) => str.toUpperCase()).replace(/-/g, ' '),
    }
  }
  const [h1, setH1] = useState(null)
  useEffect(() => {
    const el = document.querySelector('h1')
    setH1(el)
  })
  const [index] = useIntersectionObserver([h1])
  console.log(index)
  const isVisible = index === -1
  return (
    <header className="flex items-center gap-4 z-50 sticky -top-12 px-16 pb-3 pt-16 tablet:px-10 phone:px-5 bg-cheese1/50 dark:bg-marine9/50 backdrop-blur-[6px]">
      <LazyMotion features={domAnimation}>
        <Link href={handleRouter(router.asPath).backHref} passHref>
          <a>
            <m.button
              className="box-border block w-8 h-8 text-gray9 dark:text-gray5 hover:text-marine6 dark:hover:text-cheese5 rounded hover:bg-gray7/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {router.asPath === '/' ? <LogoIcon /> : <LeftArrowIcon />}
            </m.button>
          </a>
        </Link>
        <AnimatePresence>
          {isVisible && (
            <m.p className="body-font-settings" variants={fade} initial="0" animate="1" exit="0">
              {handleRouter(router.asPath).title}
            </m.p>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  )
}

export default Header
