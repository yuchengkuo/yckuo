import { allOthers } from '.contentlayer/data'
import Layout from '@components/layout/Layout'
import { InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function StyleGuidePage({
  styleguide,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(styleguide.body.code), [styleguide.body.code])
  return (
    <Layout title="Style Guide">
      <Content />
    </Layout>
  )
}

export function getStaticProps() {
  const styleguide = allOthers.find((page) => page.slug === 'styleguide')
  return { props: { styleguide } }
}
