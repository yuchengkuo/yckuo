import { allOthers } from '.contentlayer/data'
import Layout from '@components/layout/Layout'
import { InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function ArchivePage({ archive }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(archive.body.code), [archive.body.code])
  return (
    <Layout title="Archive">
      <Content />
    </Layout>
  )
}

export function getStaticProps() {
  const archive = allOthers.find((page) => page.slug === 'archive')
  return { props: { archive } }
}
