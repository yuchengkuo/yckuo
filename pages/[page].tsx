import { allOthers } from '.contentlayer/generated'
import Layout from '@components/layout/Layout'
import MDXComponents from '@components/MDXComp'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function Pages({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMDXComponent(page.body.code)
  return (
    <Layout key={page.slug} title={page.title} animateChildren>
      <div className="words">
        <Content components={MDXComponents} />
      </div>
    </Layout>
  )
}

export function getStaticProps({ params }) {
  const page = allOthers.find((page) => page.slug === params.page)
  return { props: { page } }
}

export function getStaticPaths() {
  return {
    paths: allOthers
      .filter((page) => page.slug !== 'about')
      .map((page) => ({ params: { page: page.slug } })),
    fallback: false,
  }
}
