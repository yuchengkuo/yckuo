import Layout from '@components/layout/Layout';
import { allOthers } from '.contentlayer/data';
import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export default function AboutPage({ about }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = useMemo(() => getMDXComponent(about.body.code), [about.body.code]);
  return (
    <Layout title="About" animateChildren>
      <Content />
    </Layout>
  );
}

export function getStaticProps() {
  const about = allOthers.find((page) => page.slug === 'about');
  return { props: { about } };
}
