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
      <main className="px-10 phone:px-5" style={{ minHeight: 'calc(100vh - 216px)' }}>
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="font-hagrid text-3xl phone:text-xl"
        >
          {title}
        </m.h1>
        {subtitle && (
          <m.h1
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1, delay: 0.04 }}
            className="font-apfel mt-1 text-4xl phone:text-2xl"
          >
            {subtitle}
          </m.h1>
        )}
        {animateChildren ? (
          <m.div variants={fade} initial="0" animate="1" transition={{ delay: 0.04 }}>
            {children}
          </m.div>
        ) : (
          children
        )}
      </main>
    </LazyMotion>
  )
}
