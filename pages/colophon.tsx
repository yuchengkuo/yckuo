import { allOthers } from '.contentlayer/data'
import Layout from '@components/layout/Layout'
import { InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function ColophonPage({ colophon }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(colophon.body.code), [colophon.body.code])
  return (
    <Layout title="Colophon">
      <Content />
    </Layout>
  )
}

export function getStaticProps() {
  const colophon = allOthers.find((page) => page.slug === 'colophon')
  return { props: { colophon } }
}
