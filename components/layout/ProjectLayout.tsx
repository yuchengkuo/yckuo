import { Project } from '.contentlayer/generated'
import Head from '@components/Head'
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
    <LazyMotion features={domAnimation}>
      <Head title={project.title} description={project.subtitle} />
      <main>
        <div className="mt-20 min-h-[40vh] grid grid-cols-3 items-baseline justify-between">
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
              <p key={item.title} className="font-freak text-sm freak-font-settings">
                {item.title + ' / ' + item.content}
              </p>
            ))}
          </m.div>
        </div>
        <m.article variants={fade} initial="0" animate="1" className="my-10 words two-col-layout">
          {children}
        </m.article>
      </main>
    </LazyMotion>
  )
}
