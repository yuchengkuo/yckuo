import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

import ProjectCard from "@components/ProjectCard";
import Layout from "@components/Layout";
import { MdxComponents } from "@components/MdxComponents";
import GoTop from "@components/GoTop";
import SideMenu from "@components/SideMenu";

import { getAllFrontmatter, getMdxBySlug } from "@utils/mdx";
import { box } from "@styles/box";
import { text } from "@styles/text";
import { layout } from "@styles/layout";

import type { Frontmatter } from "types/types";

export default function ProjectTemplate({
  upNext,
  frontmatter,
  code,
}: {
  upNext: Frontmatter;
  frontmatter: Frontmatter;
  code: string;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <NextSeo title={frontmatter.title} />

      <motion.div
        className={layout({ variant: "hero", css: { position: "relative" } })}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className={text({
            article: "h1",
            css: { maxWidth: 640, mt: "$12", mb: "$4" },
          })}
        >
          {frontmatter.title}
        </h1>
        <p
          className={text({
            size: 4,
            css: { textTransform: "uppercase", color: "$gray1" },
          })}
        >
          {frontmatter.subtitle}
        </p>
        <motion.svg
          className={box({
            position: "absolute",
            right: "$4",
            bottom: "$4",
            "@bp1": { right: "$6", bottom: "$6" },
          })}
          animate={{ y: -40 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38 18L24 32L10 18"
            stroke="#777980"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      <div
        className={layout({
          variant: "section",
          css: {
            display: "flex",
            flexWrap: "wrap",
            gap: "$4",
            "@bp1": { gap: "$5" },
            "@bp2": { gap: "$7" },
          },
        })}
      >
        {frontmatter.info?.map((item, i) => (
          <div
            className={box({
              display: "flex",
              flexDirection: "column",
              border: "1px solid $green",
              borderRadius: 15,
              p: "$3",
              flex: "1 1 220px",
              "@bp1": { p: "$4" },
            })}
            key={i}
          >
            <h2
              className={text({
                css: {
                  fontSize: "$6",
                  fontWeight: 400,
                  mt: 0,
                  mb: "$4",
                  color: "$gray1",
                },
              })}
            >
              {item.title}
            </h2>
            {item.content.map((content, i) => (
              <p
                key={i}
                className={text({
                  css: {
                    fontSize: "$4",
                    m: 0,
                    mb: "$3",
                    color: "$gray1",
                    "@bp1": { fontSize: "$5" },
                  },
                })}
              >
                {content}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div id="article" className={layout({ variant: "article" })}>
        <article
          className={box({ gridColumn: 2, p: "$4", "@bp1": { p: "$6" } })}
        >
          <Component components={{ ...MdxComponents }} />
        </article>
      </div>

      <aside
        className={box({
          width: 120,
          height: "100vh",
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          pl: "$7",
          "@bp2": { width: 160 },
          "@bp3": { width: 240 },
        })}
      >
        <SideMenu ids={frontmatter.ids} />
        <GoTop />
      </aside>

      <UpNext upNext={upNext} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = getAllFrontmatter("projects");

  return {
    paths: data.map((item) => ({
      params: { slug: item.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allData = await getAllFrontmatter("projects");
  const current = allData.findIndex((data) => data.slug === params.slug);
  const upNext = allData[current === allData.length - 1 ? 0 : current + 1];

  const { frontmatter, code } = await getMdxBySlug("projects", params.slug);

  // todo: og
  return {
    props: {
      upNext,
      frontmatter,
      code,
    },
  };
}

const UpNext = ({ upNext }: { upNext: Frontmatter }) => {
  return (
    <>
      <div className={box({ display: "flex", justifyContent: "center" })}>
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
      </div>
      <div className={layout({ variant: "section", css: { py: "$11" } })}>
        <div className={box({ display: "flex", flexDirection: "column" })}>
          <h2 className={text({ article: "h2" })}>Up Next</h2>
          <ProjectCard data={upNext} />
        </div>
      </div>
    </>
  );
};
