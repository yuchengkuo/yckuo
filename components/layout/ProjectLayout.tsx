import { Project } from '.contentlayer/types'
import { fade, fadeUp } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'

export default function ProjectLayout({
  children,
  project,
}: {
  children: JSX.Element | JSX.Element[]
  project: Project
}) {
  return (
    <main className="px-10 phone:px-5">
      <LazyMotion features={domAnimation}>
        <div className="mt-20 h-80 grid grid-cols-3 items-baseline justify-between">
          <m.h1
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1 }}
          >
            {project.title}
          </m.h1>
          <m.div
            className="flex flex-col gap-4 col-start-3"
            initial="0"
            animate="1"
            variants={fade}
          >
            {project.info.map((item) => (
              <p
                key={item.title}
                className="font-freak text-sm freak-font-settings text-gray9 dark:text-gray5"
              >
                {item.title + ' / ' + item.content}
              </p>
            ))}
          </m.div>
        </div>
        <m.article variants={fade} initial="0" animate="1" className="project body-font-settings">
          {children}
        </m.article>
      </LazyMotion>
    </main>
  )
}
