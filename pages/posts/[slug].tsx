import ArticleLayout from '@components/layout/ArticleLayout'
import { allPosts } from '.contentlayer/data'
import { InferGetStaticPropsType } from 'next'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(post.body.code), [post.body.code])
  return (
    <ArticleLayout
      key={post.slug}
      title={post.title}
      date={post.date}
      readTime={post.readingTime}
      img={post.img}
    >
      <Content />
    </ArticleLayout>
  )
}
export function getStaticProps({ params }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  return { props: { post } }
}

export function getStaticPaths() {
  return { paths: allPosts.map((p) => ({ params: { slug: p.slug } })), fallback: false }
}
