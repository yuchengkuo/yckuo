/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import matter from "gray-matter";
import { remarkSectionize } from "utlis/remark-sectionize";
import fs from "fs";
import path from "path";
import { getAllProjectsData } from "lib/projects";
import ProjectCard from "components/ProjectCard";

import Layout from "components/Layout";
import { Grid, Container, Themed, Flex } from "theme-ui";
import { motion } from "framer-motion";

import GoTop from "components/GoTop";
import Carousel from "components/Carousel";

const components = {
  Carousel,
};

const ProjectTemplate = ({ mdxSource, frontMatter, upNext }) => {
  return (
    <Layout>
      <Container as="section" variant="hero" sx={{ position: "relative" }}>
        <Themed.h1 sx={{ maxWidth: 640, mt: 12 }}>
          {frontMatter.title}
        </Themed.h1>
        <p sx={{ variant: "text.caps", color: "secondaryText" }}>
          {frontMatter.subtitle}
        </p>
        <HeroSvg />
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

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-slug"), remarkSectionize],
    },
    scope: data,
  });

  const allData = await getAllProjectsData();
  const current = allData.findIndex((data) => data.slug === params.slug);
  const next = allData[current === allData.length - 1 ? 0 : current + 1];
  const prev = allData[current === 1 ? allData.length - 1 : current - 1];

  // todo: og
  return {
    props: {
      mdxSource: mdxSource,
      frontMatter: data,
      upNext: {
        next,
        prev,
      },
    },
  };
}

export default ProjectTemplate;

const HeroSvg = () => {
  return (
    <>
      {/* <svg
        width="431"
        height="590"
        viewBox="0 0 431 590"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ position: "absolute", top: -106, left: `calc(50% + 390px)` }}
      >
        <motion.path
          d="M430 0L215.5 429H1L80.2381 589"
          stroke="#FCB33D"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: "0 320",
            strokeDashoffset: 0,
          }}
          animate={{
            strokeDasharray: "320 8",
            strokeDashoffset: -328,
          }}
          transition={{
            strokeDashoffset: {
              delay: 4,
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1,
              type: "tween",
              ease: "anticipate",
            },
            default: {
              duration: 4,
            },
          }}
        />
        <motion.path
          d="M430 0L215.5 429H1L80.2381 269"
          stroke="#FCB33D"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: "0 320",
            strokeDashoffset: 0,
          }}
          animate={{
            strokeDasharray: "320 8",
            strokeDashoffset: -328,
          }}
          transition={{
            strokeDashoffset: {
              delay: 4,
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1,
              type: "tween",
              ease: "anticipate",
            },
            default: {
              duration: 4,
            },
          }}
        />
      </svg> */}
      <svg
        width="242"
        height="361"
        viewBox="0 0 242 361"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ position: "absolute", left: `-25%`, top: 83 }}
      >
        <path d="M1 0L1 240H121H241L181 120" stroke="#D6E4DC" />
        <path d="M1 0L1 240H121H241L181 360" stroke="#D6E4DC" />
      </svg>
      <svg
        width="291"
        height="202"
        viewBox="0 0 291 202"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{ position: "absolute", right: 0, top: 223 }}
      >
        <motion.path
          d="M0.999999 1L49.5688 100.12C49.8408 100.675 49.8408 101.325 49.5688 101.88L0.999999 201"
          stroke="#FBCED3"
          initial={{ x: -61 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M0.999999 1L49.5688 100.12C49.8408 100.675 49.8408 101.325 49.5688 101.88L0.999999 201"
          stroke="#FBCED3"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 61, opacity: 0.8 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          opacity="0.8"
          d="M63 1L109.6 100.149C109.853 100.688 109.853 101.312 109.6 101.851L63 201"
          stroke="#FBCED3"
          initial={{ x: 0 }}
          animate={{ x: 61, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          opacity="0.6"
          d="M123 1L169.6 100.149C169.853 100.688 169.853 101.312 169.6 101.851L123 201"
          stroke="#FBCED3"
          initial={{ x: 0 }}
          animate={{ x: 61, opacity: 0.4 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          opacity="0.4"
          d="M183 1L229.6 100.149C229.853 100.688 229.853 101.312 229.6 101.851L183 201"
          stroke="#FBCED3"
          initial={{ x: 0 }}
          animate={{ x: 61, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          opacity="0.2"
          d="M243 1L289.6 100.149C289.853 100.688 289.853 101.312 289.6 101.851L243 201"
          stroke="#FBCED3"
          initial={{ x: 0 }}
          animate={{ x: 61, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </>
  );
};

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
