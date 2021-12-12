import Image from '@components/article/Image'
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
    <main>
      <LazyMotion features={domAnimation}>
        {date && (
          <m.p
            className="font-freak freak-font-settings text-sm mb-4 text-gray9 dark:text-gray5"
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
        <m.div variants={fade} initial="0" animate="1" className="mt-10">
          <Image src="/images/about-avatar.jpg" width={360} height={240} />
        </m.div>
        <m.article variants={fade} initial="0" animate="1" className="mt-32 words">
          {children}
        </m.article>
      </LazyMotion>
    </main>
  )
}
