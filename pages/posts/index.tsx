import Layout from '@components/layout/Layout'
import { allPosts } from '.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { PostCard } from '@components/card/word'
import { compareDesc } from 'date-fns'

export default function PostsPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Posts" subtitle="Random thoughts">
      <div className="flex flex-col gap-5 max-w-[640px]">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return { props: { posts } }
}
