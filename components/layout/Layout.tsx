import Head from '@components/Head'
import { fadeUp } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'

export default function Layout({
  children,
  title,
  subtitle,
  description,
  animateChildren = false,
}: {
  children: JSX.Element | JSX.Element[]
  title: string
  subtitle?: string
  description?: string
  animateChildren?: boolean
}) {
  return (
    <LazyMotion features={domAnimation}>
      <Head title={title === 'YuCheng Kuo' ? '' : title} description={description || subtitle} />
      <main className="min-h-[calc(100vh-104px-104px)]">
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
        >
          {title}
        </m.h1>
        {subtitle && (
          <m.p
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
            className="text-gray-11 dark:text-grayDark-11 text-xl font-medium body-font-settings"
          >
            {subtitle}
          </m.p>
        )}
        {animateChildren ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04 }}
            className="my-10"
          >
            {children}
          </m.div>
        ) : (
          <div className="my-10">{children}</div>
        )}
      </main>
    </LazyMotion>
  )
}
