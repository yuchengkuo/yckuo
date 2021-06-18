/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import matter from "gray-matter";
import { remarkSectionize } from "utlis/remark-sectionize";
import fs from "fs";
import path from "path";

import Layout from "components/Layout";
import { Grid, Container, Themed } from "theme-ui";

import GoTop from "components/GoTop";
import Carousel from "components/Carousel";
import Image from "next/image";

const components = {
  Carousel,
  Image,
};

const ProjectTemplate = ({ mdxSource, frontMatter }) => {
  return (
    <Layout>
      <Container as="section" variant="hero">
        <Themed.h1 sx={{ maxWidth: 640, mt: 12 }}>
          {frontMatter.title}
        </Themed.h1>
      </Container>
      <Grid as="section" variant="article">
        <Container as="article" variant="section" sx={{ gridColumn: 2 }}>
          <MDXRemote {...mdxSource} components={components} />
        </Container>
        <GoTop />
      </Grid>
    </Layout>
  );
};

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(path.join(process.cwd(), "projects"));

  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(".mdx", ""),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fileContents = fs.readFileSync(
    path.join(process.cwd(), "projects", `${params.slug}.mdx`)
  );

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-slug"), remarkSectionize],
    },
    scope: data,
  });

  // todo: og
  return {
    props: {
      mdxSource: mdxSource,
      frontMatter: data,
    },
  };
}

export default ProjectTemplate;
