import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftArrowIcon, LogoIcon } from './Icons'
import { fade } from '@utils/animation'
import useScrollProgress from '@utils/hooks/useScrollProgress'
import { useIntersectionObserver } from 'usehooks-ts'
import { useRef } from 'react'
import classNames from 'classnames'

const Header = () => {
  const router = useRouter()
  function handleRouter(path: string) {
    const arr = path.split('/')
    const title = arr[arr.length - 1].replace(/#.+/, '')
    arr.splice(-1, 1)
    return {
      backHref: arr.length === 1 ? '/' : arr.join('/'),
      title: title.replace(/[a-z]/, (str) => str.toUpperCase()).replace(/-/g, ' '),
    }
  }
  const { distY, progress } = useScrollProgress()
  const isVisible = distY > 200
  const ref = useRef(null)
  const header = useIntersectionObserver(ref, { threshold: 1 })
  return (
    <header
      ref={ref}
      className={classNames(
        'bg-gray-2/90 dark:bg-grayDark-2/80 sticky -top-12 z-50 flex items-center gap-4 px-16 pb-3 pt-16 backdrop-blur-[4px] tablet:px-10 phone:px-5',
        header?.intersectionRatio < 1 && 'border-gray-5 dark:border-grayDark-5 border-b'
      )}
    >
      <LazyMotion features={domAnimation}>
        <Link href={handleRouter(router.asPath).backHref} passHref>
          <a>
            <m.button
              className="hover:bg-gray-5 dark:hover:bg-grayDark-5 box-border block h-7 w-7 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {router.asPath === '/' ? <LogoIcon /> : <LeftArrowIcon />}
            </m.button>
          </a>
        </Link>
        <AnimatePresence>
          {isVisible && (
            <m.p variants={fade} initial="0" animate="1" exit="0">
              <button
                className="font-medium body-font-settings"
                onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {handleRouter(router.asPath).title}
              </button>
            </m.p>
          )}
        </AnimatePresence>
        <button
          className="text-gray-11 dark:text-grayDark-11 ml-auto font-apfel font-bold transition-all hover:text-current"
          onClick={() => {
            progress > 0.95
              ? scrollTo({ top: 0, behavior: 'smooth' })
              : document.querySelector('footer').scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {progress > 0.95 ? 'Top ↑' : 'Nav ↓'}
        </button>
      </LazyMotion>
    </header>
  )
}

export default Header
