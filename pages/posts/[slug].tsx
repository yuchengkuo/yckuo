import ArticleLayout from '@components/layout/ArticleLayout'
import { allPosts } from '.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import MDXComponents from '@components/MDXComp'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMDXComponent(post.body.code)
  return (
    <ArticleLayout key={post.slug} post={post}>
      <Content components={MDXComponents} />
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
