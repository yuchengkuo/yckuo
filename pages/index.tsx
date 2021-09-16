import Link from "next/link";
import { layout } from "@styles/layout";
import { box } from "@styles/box";
import { text } from "@styles/text";
import { button } from "@styles/button";
import { getAllFrontmatter } from "@utlis/mdx";
import Hero from "@components/Hero";
import Layout from "@components/Layout";
import ProjectCard from "@components/ProjectCard";
import { AboutIcon, MailIcon, ReadCVIcon } from "@components/Icons";
import { Frontmatter } from "types/frontmatter";

export default function Home({ data }: { data: Frontmatter[] }) {
  return (
    <Layout>
      <Hero />

      <div id="project" className={layout({ variant: "section" })}>
        <h3 className={text({ variant: "sectionTitle" })}>Projects</h3>
        <div
          className={box({
            display: "flex",
            flexDirection: "column",
            gap: "$11",
          })}
        >
          {data.map((data, i) => (
            <ProjectCard key={i} data={data} />
          ))}
        </div>
      </div>

      <div className={layout({ variant: "text" })}>
        <h3 className={text({ variant: "sectionTitle" })}>About</h3>
        <p className={text({ article: "p" })}>
          👋 I&apos;m YuCheng, a thinker and doer who is fascinated by tech,
          design, web, automobiles, music, films and many other things.🚶‍♂️
        </p>
        <div
          className={box({
            display: "flex",
            flexDirection: "column",
            gap: "$5",
            "@bp1": { flexDirection: "row", gap: "$11" },
          })}
        >
          <Link href="/about" passHref>
            <a className={button({ variant: "primary" })}>
              <AboutIcon />
              More info
            </a>
          </Link>

          <a
            href="https://read.cv/yuchengkuo"
            className={button({ variant: "primary" })}
            data-splitbee-event="External Link"
            data-splitbee-event-type="read.cv"
          >
            <ReadCVIcon />
            Read.CV
          </a>
        </div>
      </div>

      <div className={layout({ variant: "text" })}>
        <h3 className={text({ variant: "sectionTitle" })}>Contact</h3>
        <p className={text({ article: "p" })}>
          Open to ideas and feedback. Let&apos;s connect (the dots)!
        </p>
        <a
          href="mailto:hey@yuchengkuo.com?subject=Hi!"
          className={button({ variant: "primary" })}
          data-splitbee-event="External Link"
          data-splitbee-event-type="mail"
        >
          <MailIcon />
          Send mail
        </a>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllFrontmatter("projects");
  return {
    props: {
      data,
    },
  };
}
