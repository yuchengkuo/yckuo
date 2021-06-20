/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import matter from "gray-matter";
import { remarkSectionize } from "utlis/remark-sectionize";
import fs from "fs";
import path from "path";

import Layout from "components/Layout";
import { Grid, Container, Themed, Flex } from "theme-ui";

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
      <Container as="section" variant="hero" sx={{ position: "relative" }}>
        <Themed.h1 sx={{ maxWidth: 640, mt: 12 }}>
          {frontMatter.title}
        </Themed.h1>
        <p sx={{ variant: "text.caps", color: "secondaryText" }}>
          {frontMatter.subtitle}
        </p>
        <svg
          width="431"
          height="590"
          viewBox="0 0 431 590"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{ position: "absolute", top: -106, left: `calc(50% + 390px)` }}
        >
          <path d="M430 0L215.5 429H1" stroke="#FCB33D" />
          <path
            d="M80.2381 269L1.43957 428.112C1.16258 428.672 1.16258 429.328 1.43957 429.888L80.2381 589"
            stroke="#FCB33D"
          />
        </svg>
      </Container>
      <Container
        variant="section"
        sx={{ display: "flex", justifyContent: "space-between", gap: 7 }}
      >
        {frontMatter.info?.map((item, i) => (
          <Flex
            key={i}
            sx={{
              flexDirection: "column",
              border: "1px solid",
              borderRadius: 15,
              p: 4,
              width: `100%`,
            }}
          >
            <h4
              sx={{
                fontSize: 3,
                fontWeight: "heading",
                mt: 0,
                mb: 4,
                color: "secondaryText",
              }}
            >
              {item.title}
            </h4>
            {item.content.map((text, i) => (
              <p
                key={i}
                sx={{ fontSize: 2, m: 0, mb: 3, color: "secondaryText" }}
              >
                {text}
              </p>
            ))}
          </Flex>
        ))}
      </Container>
      <Grid as="section" variant="article">
        <Container
          as="article"
          variant="section"
          sx={{ gridColumn: 2, section: { my: 10 } }}
        >
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
