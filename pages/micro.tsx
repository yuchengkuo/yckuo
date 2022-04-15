import { MicroCard } from '@components/card/word'
import Layout from '@components/layout/Layout'
import { micro } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { InferGetStaticPropsType } from 'next'

export default function MicroPage({ micro }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Micro" subtitle="Actually random thoughts" animateChildren>
      <div className="flex flex-col gap-12 phone:gap-6">
        {micro.map((m) => (
          <MicroCard key={m.date} micro={m} />
        ))}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: { micro: micro.micro.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))) },
  }
}
