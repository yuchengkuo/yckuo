import { m } from 'framer-motion';
import Layout from '@components/layout/Layout';
import { allOthers } from '.contentlayer/data';
import { InferGetStaticPropsType } from 'next';

export default function AboutPage({ about }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="">
        <m.h1 className="">About</m.h1>

        <article dangerouslySetInnerHTML={{ __html: allOthers[0].body.html }}></article>
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  console.log(allOthers);
  const about = allOthers.find((page) => page.slug === 'about');
  return { props: { about } };
}
