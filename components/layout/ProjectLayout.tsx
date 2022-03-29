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
            className="flex flex-col gap-4 col-start-3 bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 p-4 rounded-md"
            initial="0"
            animate="1"
            variants={fade}
          >
            {project.info.map((item) => (
              <p
                key={item}
                className="font-medium body-font-settings text-base text-gray-11 dark:text-grayDark-11"
              >
                {item}
              </p>
            ))}
          </m.div>
        </div>
        <m.article
          variants={fade}
          initial="0"
          animate="1"
          className={`my-10 prose ${project.layout}-layout`}
        >
          {children}
        </m.article>
      </main>
    </LazyMotion>
  )
}
