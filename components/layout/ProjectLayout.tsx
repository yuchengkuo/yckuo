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
        <div className="mt-20 phone:mt-4 min-h-[40vh] phone:min-h-0 grid grid-cols-3 items-baseline justify-between tablet:block">
          <m.h1
            variants={fadeUp}
            initial="0"
            animate="1"
            transition={{ type: 'spring', damping: 20, mass: 1 }}
            className="tablet:w-1/2 tablet:mb-40 phone:w-auto phone:mb-8"
          >
            {project.title}
          </m.h1>
          <m.div
            className="flex flex-col gap-4 phone:gap-3 col-start-3 bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 p-4 rounded-md tablet:w-1/2 tablet:ml-auto phone:w-auto"
            initial="0"
            animate="1"
            variants={fade}
          >
            {project.info.map((item) => (
              <p
                key={item}
                className="font-medium body-font-settings text-base text-gray-11 dark:text-grayDark-11 phone:text-sm"
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
