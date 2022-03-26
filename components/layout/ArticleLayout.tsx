import Head from '@components/Head'
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
    <LazyMotion features={domAnimation}>
      <Head title={title} date={date} />
      <main>
        {date && (
          <m.p
            className="font-medium body-font-settings text-sm mb-4 text-gray-11 dark:text-grayDark-11"
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
            <div className="w-80 h-64 bg-gray-4 dark:bg-grayDark-4"></div>
          </m.div>
        )}
        <m.article variants={fade} initial="0" animate="1" className="mt-10 words">
          {children}
        </m.article>
      </main>
    </LazyMotion>
  )
}
