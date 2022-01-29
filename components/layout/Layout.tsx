import { fade, fadeUp } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'

export default function Layout({
  children,
  title,
  subtitle,
  animateChildren = false,
}: {
  children: JSX.Element | JSX.Element[]
  title: string
  subtitle?: string
  animateChildren?: boolean
}) {
  return (
    <LazyMotion features={domAnimation}>
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
            className="body-font-settings font-medium text-xl text-secondary dark:text-darkSecondary"
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
