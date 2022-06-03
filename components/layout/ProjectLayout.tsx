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
        <div className="mt-20 grid min-h-[40vh] grid-cols-3 items-baseline justify-between tablet:block phone:mt-4 phone:min-h-0">
          <m.h1
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1 }}
            className="tablet:mb-40 tablet:w-1/2 phone:mb-8 phone:w-auto"
          >
            {project.title}
          </m.h1>
          <m.div
            className="bg-gray-3 dark:bg-grayDark-3 border-gray-6 dark:border-grayDark-6 col-start-3 flex flex-col gap-4 rounded-md border p-4 tablet:ml-auto tablet:w-1/2 phone:w-auto phone:gap-3"
            initial="0"
            animate="1"
            variants={fade}
          >
            {project.info.map((item) => (
              <p
                key={item}
                className="text-gray-11 dark:text-grayDark-11 text-base font-medium body-font-settings phone:text-sm"
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
          className={`prose my-10 ${project.layout}-layout`}
        >
          {children}
        </m.article>
      </main>
    </LazyMotion>
  )
}
