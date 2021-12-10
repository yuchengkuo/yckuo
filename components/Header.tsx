import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftArrowIcon, LogoIcon } from './Icons'
import { fade } from '@utils/animation'

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
  return (
    <header className="sticky -top-12 z-50 flex items-center gap-4 -mx-16 px-16 pt-16 pb-3 mb-6 bg-cheese1/50 dark:bg-marine9/50 backdrop-blur-[6px] phone:pt-6">
      <LazyMotion features={domAnimation}>
        <m.button
          className="box-border block w-8 h-8 text-gray9 dark:text-gray5 hover:text-marine6 dark:hover:text-cheese5 rounded hover:bg-gray7  hover:bg-opacity-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={handleRouter(router.asPath).backHref} passHref>
            <a>{router.asPath === '/' ? <LogoIcon /> : <LeftArrowIcon />}</a>
          </Link>
        </m.button>
        <AnimatePresence>
          <m.p className="body-font-settings" variants={fade} initial="0" animate="1" exit="0">
            {handleRouter(router.asPath).title}
          </m.p>
        </AnimatePresence>
      </LazyMotion>
    </header>
  )
}

export default Header
