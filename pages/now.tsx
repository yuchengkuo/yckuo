import { allOthers } from '.contentlayer/data'
import Layout from '@components/layout/Layout'
import { InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function NowPage({ now }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(now.body.code), [now.body.code])
  return (
    <Layout title="Now">
      <Content />
    </Layout>
  )
}

export function getStaticProps() {
  const now = allOthers.find((page) => page.slug === 'now')
  return { props: { now } }
}
