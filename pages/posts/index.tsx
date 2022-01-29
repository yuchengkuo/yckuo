import Layout from '@components/layout/Layout'
import { allPosts } from '.contentlayer/data'
import { InferGetStaticPropsType } from 'next'
import { PostCard } from '@components/card/word'

export default function PostsPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Posts">
      <div className="flex flex-col gap-5 max-w-[640px]">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return { props: { posts } }
}
