import ProjectLayout from '@components/layout/ProjectLayout'
import MDXComponents from '@components/MDXComponents'
import { allProjects } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function ProjectPage({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMDXComponent(project.body.code)
  return (
    <ProjectLayout project={project}>
      <Content components={MDXComponents} />
    </ProjectLayout>
  )
}

export function getStaticProps({ params }) {
  const project = allProjects.filter((p) => p.published).find((p) => p.slug === params.slug)
  return { props: { project } }
}

export function getStaticPaths() {
  return {
    paths: allProjects.filter((p) => p.published).map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}
