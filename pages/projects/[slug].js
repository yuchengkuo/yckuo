/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import matter from "gray-matter";
import { remarkSectionize } from "utlis/remark-sectionize";
import fs from "fs";
import path from "path";
import { getAllProjectsData } from "utlis/projects";
import ProjectCard from "components/ProjectCard";

import Layout from "components/Layout";
import { Grid, Container, Themed, Flex } from "theme-ui";
import { motion } from "framer-motion";

import GoTop from "components/GoTop";
import SideMenu from "components/SideMenu";
import Carousel from "components/Carousel";
import getHeadings from "utlis/getHeadings";
import { NextSeo } from "next-seo";

const components = {
  Carousel,
};

const ProjectTemplate = ({ mdxSource, frontMatter, upNext, ids }) => {
  return (
    <Layout>
      <NextSeo title={frontMatter.title} />

      <motion.section
        sx={{ variant: "layout.hero", position: "relative" }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Themed.h1 sx={{ maxWidth: 640, mt: 12 }}>
          {frontMatter.title}
        </Themed.h1>
        <p sx={{ variant: "text.caps", color: "secondaryText" }}>
          {frontMatter.subtitle}
        </p>
      </motion.section>

      <Container
        as="section"
        variant="section"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: [4, 5, 7],
        }}
      >
        {frontMatter.info?.map((item, i) => (
          <Flex
            key={i}
            sx={{
              flexDirection: "column",
              border: "1px solid",
              borderColor: "secondary",
              borderRadius: 15,
              p: [3, 4],
              flex: `1 1 220px`,
            }}
          >
            <h4
              sx={{
                fontSize: [2, 3],
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
                sx={{ fontSize: [1, 2], m: 0, mb: 3, color: "secondaryText" }}
              >
                {text}
              </p>
            ))}
          </Flex>
        ))}
      </Container>

      <Grid
        id="article"
        as="section"
        variant="article"
        sx={{ position: "relative" }}
      >
        <Container
          as="article"
          variant="section"
          sx={{ gridColumn: 2, section: { my: 10 } }}
        >
          <MDXRemote {...mdxSource} components={components} />
        </Container>
      </Grid>

      <Flex
        sx={{
          width: [120, null, 160, 240],
          height: `100vh`,
          position: "fixed",
          top: 0,
          right: 0,
          flexDirection: "column",
          pl: 6,
          zIndex: 10,
        }}
      >
        <SideMenu ids={ids} />
        <GoTop />
      </Flex>

      <UpNext upNext={upNext} />
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
  const { ids } = getHeadings(content);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-slug"), remarkSectionize],
    },
    scope: data,
  });

  const allData = await getAllProjectsData();
  const current = allData.findIndex((data) => data.slug === params.slug);
  const next = allData[current === allData.length - 1 ? 0 : current + 1];
  const prev = allData[current === 0 ? allData.length - 1 : current - 1];

  // todo: og
  return {
    props: {
      mdxSource: mdxSource,
      frontMatter: data,
      upNext: {
        next,
        prev,
      },
      ids,
    },
  };
}

export default ProjectTemplate;

const UpNext = ({ upNext }) => {
  return (
    <>
      <Flex sx={{ justifyContent: "center" }}>
        <svg
          width="146"
          height="80"
          viewBox="0 0 146 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.5938 45.84L35.4778 34.08H37.4238L34.5398 45.84H32.5938Z"
            fill="#FCB33D"
          />
          <path
            d="M70.5938 45.84L73.4778 34.08H75.4238L72.5398 45.84H70.5938Z"
            fill="#D6E4DC"
          />
          <path
            d="M108.594 45.84L111.478 34.08H113.424L110.54 45.84H108.594Z"
            fill="#FBCED3"
          />
        </svg>
      </Flex>
      <Container as="section" variant="section" py={11}>
        <Flex sx={{ flexDirection: "column" }}>
          <Themed.h2 sx={{ mb: 8 }}>Up Next</Themed.h2>
          <ProjectCard data={upNext.next} />
        </Flex>
      </Container>
    </>
  );
};
