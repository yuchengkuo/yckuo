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
        <div className="mb-32 phone:mb-8">
          <div className="">
            <m.p
              className="text-gray-11 dark:text-grayDark-11 mb-1 text-sm font-medium body-font-settings"
              variants={fade}
              initial="0"
              animate="1"
            >
              {new Date(project.year).getFullYear()} ⋅ {project.readingTime.text}
            </m.p>
            <m.h1
              variants={fadeUp}
              initial="0"
              animate="1"
              transition={{ type: 'spring', damping: 20, mass: 1 }}
              className="tablet:mb-40 tablet:w-1/2 phone:mb-8 phone:w-auto"
            >
              {project.title}
            </m.h1>
          </div>
          <m.ul
            className="bg-gray-3 dark:bg-grayDark-3 border-gray-6 dark:border-grayDark-6  mt-8 flex w-[40ch] flex-col gap-2 rounded-md border p-4"
            initial="0"
            animate="1"
            variants={fade}
          >
            {project.info.map((item) => (
              <li
                key={item}
                className="text-gray-11 dark:text-grayDark-11 text-base font-medium body-font-settings phone:text-sm"
              >
                {item}
              </li>
            ))}
          </m.ul>
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
