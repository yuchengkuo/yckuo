import Layout from '@components/layout/Layout'
import { allProjects } from '.contentlayer/data'
import { InferGetStaticPropsType } from 'next'
import { ProjectCard } from '@components/card/word'

export default function ProjectsPage({
  allProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Projects">
      <div className="max-w-[640px] flex flex-col gap-10">
        {allProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  return { props: { allProjects } }
}
