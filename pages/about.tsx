import Layout from '@components/layout/Layout'
import { allOthers } from '.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function AboutPage({ about }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMDXComponent(about.body.code)
  return (
    <Layout title="About" animateChildren>
      <div className="words">
        <Content />
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const about = allOthers.find((page) => page.slug === 'about')
  return { props: { about } }
}
