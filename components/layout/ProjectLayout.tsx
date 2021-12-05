import { Project } from '.contentlayer/types'

export default function ProjectLayout({
  children,
  project,
}: {
  children: JSX.Element | JSX.Element[]
  project: Project
}) {
  return (
    <main className="px-10 phone:px-5">
      <div className="mt-20 h-80 grid grid-cols-3 items-baseline justify-between">
        <h1 className="">{project.title}</h1>
        <div className="flex flex-col gap-4 col-start-3">
          {project.info.map((item) => (
            <p
              key={item.title}
              className="font-freak text-sm freak-font-settings text-gray9 dark:text-gray5"
            >
              {item.title + ' / ' + item.content}
            </p>
          ))}
        </div>
      </div>
      <article className="project body-font-settings">{children}</article>
    </main>
  )
}
