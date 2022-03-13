import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftArrowIcon, LogoIcon } from './Icons'
import { fade } from '@utils/animation'
import useScrollProgress from '@utils/hooks/useScrollProgress'

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
  return (
    <header className="flex items-center gap-4 z-50 sticky -top-12 px-16 pb-3 pt-16 tablet:px-10 phone:px-5 bg-background/80 dark:bg-darkBackground/80 backdrop-blur-[4px]">
      <LazyMotion features={domAnimation}>
        <Link href={handleRouter(router.asPath).backHref} passHref>
          <a>
            <m.button
              className="box-border block w-7 h-7 text-primary dark:text-darkPrimary rounded hover:bg-gray7/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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
        <button
          className="font-apfel font-bold ml-auto text-secondary dark:text-darkSecondary hover:text-primary dark:hover:text-darkPrimary"
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
