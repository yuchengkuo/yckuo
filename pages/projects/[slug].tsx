import { allProjects } from '.contentlayer/data'
import { InferGetStaticPropsType } from 'next'
import { getMDXComponent } from 'mdx-bundler/client'
import ProjectLayout from '@components/layout/ProjectLayout'

export default function ProjectPage({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = getMDXComponent(project.body.code)
  return (
    <ProjectLayout key={project.slug} project={project}>
      <Content />
    </ProjectLayout>
  )
}

const CarouselImg = () => {
  return <></>
}

export async function getStaticProps({ params }) {
  const project = allProjects.find((p) => p.slug === params.slug)
  return { props: { project } }
}

export function getStaticPaths() {
  return { paths: allProjects.map((p) => ({ params: { slug: p.slug } })), fallback: false }
}
