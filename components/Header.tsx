import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftArrowIcon, LogoIcon } from './Icons'
import { fade } from '@utils/animation'
import useScrollProgress from '@utils/hooks/useScrollProgress'
import { useIntersectionObserver } from 'usehooks-ts'
import { useRef } from 'react'

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
  const { distY } = useScrollProgress()
  const isVisible = distY > 200
  const ref = useRef(null)
  const header = useIntersectionObserver(ref, { threshold: 1 })
  return (
    <header
      ref={ref}
      className={`flex items-center gap-4 z-50 sticky -top-12 px-16 pb-3 pt-16 tablet:px-10 phone:px-5 bg-yellow-1/90 dark:bg-grayDark-2/80 backdrop-blur-[4px] ${
        header?.intersectionRatio < 1 && 'border-b border-gray-5 dark:border-grayDark-5'
      }`}
    >
      <LazyMotion features={domAnimation}>
        <Link href={handleRouter(router.asPath).backHref} passHref>
          <a>
            <m.button
              className="box-border block w-7 h-7 rounded hover:bg-gray-5 dark:hover:bg-grayDark-5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {router.asPath === '/' ? <LogoIcon /> : <LeftArrowIcon />}
            </m.button>
          </a>
        </Link>
        <AnimatePresence>
          {isVisible && (
            <m.p
              className="body-font-settings font-medium"
              variants={fade}
              initial="0"
              animate="1"
              exit="0"
            >
              {handleRouter(router.asPath).title}
            </m.p>
          )}
        </AnimatePresence>
        <button
          className="font-apfel font-bold ml-auto text-gray-11 dark:text-grayDark-11 hover:text-current transition-all"
          onClick={() => {
            document.querySelector('footer').scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Nav ↓
        </button>
      </LazyMotion>
    </header>
  )
}

export default Header
