import Layout from '@components/layout/Layout';
import { allPosts } from '.contentlayer/data';
import { InferGetStaticPropsType } from 'next';
import { PostCard } from '@components/card/word';
import { m } from 'framer-motion';

export default function PostsPage({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <h1>Posts</h1>
      <div className="w-1/2 mt-10 flex flex-col gap-3">
        {allPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  return { props: { allPosts } };
}
