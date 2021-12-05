import { fade, fadeUp } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'

export default function ArticleLayout({
  children,
  title,
  date,
  readTime,
}: {
  children: JSX.Element | JSX.Element[]
  title: string
  date?: string
  readTime?: any
}) {
  return (
    <main className="px-10 phone:px-5">
      <LazyMotion features={domAnimation}>
        <m.p
          className="font-freak freak-font-settings text-sm text-gray9 dark:text-gray5"
          variants={fade}
          initial="0"
          animate="1"
        >
          {new Date(date).toDateString()} • {readTime.text}
        </m.p>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
        >
          {title}
        </m.h1>
        <div className="w-1/3 h-60 bg-gray7 rounded" />
        <m.article variants={fade} initial="0" animate="1" className="">
          {children}
        </m.article>
      </LazyMotion>
    </main>
  )
}
