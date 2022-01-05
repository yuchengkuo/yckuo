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
      <main className="min-h-[calc(100vh-128px-108px)]">
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="font-hagrid"
        >
          {title}
        </m.h1>
        {subtitle && (
          <m.h3
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
            className="font-apfel text-gray8 dark:text-gray6"
          >
            {subtitle}
          </m.h3>
        )}
        {animateChildren ? (
          <m.div
            variants={fade}
            initial="0"
            animate="1"
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
