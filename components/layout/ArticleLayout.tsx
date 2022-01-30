import { fade, fadeUp } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'

export default function ArticleLayout({
  children,
  title,
  date,
  readTime,
  img,
}: {
  children: JSX.Element | JSX.Element[]
  title: string
  date?: string
  readTime?: any
  img?: string
}) {
  return (
    <main>
      <LazyMotion features={domAnimation}>
        {date && (
          <m.p
            className="font-medium body-font-settings text-sm mb-4 text-secondary dark:text-darkSecondary"
            variants={fade}
            initial="0"
            animate="1"
          >
            {new Date(date).toDateString().substring(4)} • {readTime.text}
          </m.p>
        )}
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="max-w-lg"
        >
          {title}
        </m.h1>
        {img && (
          <m.div variants={fade} initial="0" animate="1" className="mt-10">
            <div className="w-80 h-64 bg-gray/50 dark:bg-darkGray/50"></div>
          </m.div>
        )}
        <m.article variants={fade} initial="0" animate="1" className="mt-10 words">
          {children}
        </m.article>
      </LazyMotion>
    </main>
  )
}
