import Layout from '@components/layout/Layout'
import { allProjects } from '.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { ProjectCard } from '@components/card/word'

export default function ProjectsPage({
  allProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Projects" subtitle="Selected works">
      <div className="flex flex-col gap-10 max-w-[640px]">
        {allProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  return { props: { allProjects: allProjects.filter((p) => p.published) } }
}
