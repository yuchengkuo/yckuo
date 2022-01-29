import { allOthers } from '.contentlayer/data'
import Layout from '@components/layout/Layout'
import { InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function Pages({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(page.body.code), [page.body.code])
  return (
    <Layout key={page.slug} title={page.title} animateChildren>
      <div className="words">
        <Content />
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
