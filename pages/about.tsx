import {
  domAnimation,
  LazyMotion,
  m,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Img from "next/image";
import { NextSeo } from "next-seo";
import classNames from "classnames";
import { bundleMDX } from "mdx-bundler";
import { getLetterboxd } from "@utils/letterboxd";
import { useMemo } from "react";
import { getTopTracks } from "@utils/spotify";
import Layout from "@components/Layout";
import TopAlbums from "@components/TopAlbums";
import { MailIcon, ReadCVIcon } from "@components/Icons";
import { MdxComponents } from "@components/MdxComponents";
import { text } from "@styles/text";
import { button } from "@styles/button";
import { box } from "@styles/box";
import { layout } from "@styles/layout";
import avatar from "../public/images/about-avatar.jpg";
import { getMDXComponent } from "mdx-bundler/client";
import path from "path";

const AboutPage = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <NextSeo title="YuCheng Kuo / About" />

      <div
        className={layout({
          variant: "text",
          css: {
            "& h3 a": { color: "$white" },
            "& h3:not(:first-of-type)": { mt: "$11", "@bp1": { mt: "$13" } },
            zIndex: 10,
          },
        })}
      >
        <motion.div
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={box({
            width: 80,
            height: 80,
            mb: "$8",
            pointerEvents: "none",
            "@bp1": { width: 96, mb: "$11" },
            "@bp3": { width: 120 },
          })}
        >
          <Img
            src={avatar}
            width={120}
            height={120}
            placeholder="blur"
            className={box({ borderRadius: 15 })}
          />
        </motion.div>

        <Component components={MdxComponents as any} />

        <h3 className={text({ article: "h3" })}>
          what i&apos;ve been listening to.
        </h3>
        <p className={text({ article: "p" })}>
          Weekly top albums pulled from Last.fm and linked to Spotify.🎧
        </p>

        <TopAlbums />

        <h3 className={text({ article: "h3" })}>other me.</h3>
        <p className={text({ article: "p" })}>Meet other digital me.🗿</p>
        <div
          className={box({
            display: "flex",
            flexDirection: "column",
            mb: "$6",
            gap: "$11",
            "@bp1": { flexDirection: "row", gap: "$5" },
          })}
        >
          <a
            href="mailto:hey@yuchengkuo.com?subject=Hi!"
            title="Send ✉ to yucheng"
            data-splitbee-event="External Link"
            data-splitbee-event-type="mail"
            className={classNames(
              "umami--External-Link--send-mail",
              button({ variant: "primary" })
            )}
          >
            <MailIcon />
            Mail
          </a>
          <a
            href="https://read.cv/yuchengkuo"
            title="Read yucheng's CV"
            data-splitbee-event="External Link"
            data-splitbee-event-type="read.cv"
            className={classNames(
              "umami--External-Link--read-cv",
              button({ variant: "primary" })
            )}
          >
            <ReadCVIcon />
            Read.CV
          </a>
        </div>
        <div
          className={box({
            display: "flex",
            flexWrap: "wrap",
            "& a": { flex: "1 1 150px" },
          })}
        >
          <a
            href="https://linkedin.com/in/yucheng-kuo"
            data-splitbee-event="External Link"
            data-splitbee-event-type="linkedin"
            className={classNames(
              "umami--External-Link--linkedin",
              button({ variant: "secondary" })
            )}
          >
            linkedin
          </a>
          <a
            href="https://letterboxd.com/ethank"
            data-splitbee-event="External Link"
            data-splitbee-event-type="letterboxd"
            className={classNames(
              "umami--External-Link--letterboxd",
              button({ variant: "secondary" })
            )}
          >
            letterboxd
          </a>
          <a
            href="https://open.spotify.com/user/cheng-90"
            data-splitbee-event="External Link"
            data-splitbee-event-type="spotify"
            className={classNames(
              "umami--External-Link--spotify",
              button({ variant: "secondary" })
            )}
          >
            spotify
          </a>
          <a
            href="https://github.com/yuchengkuo"
            data-splitbee-event="External Link"
            data-splitbee-event-type="github"
            className={classNames(
              "umami--External-Link--github",
              button({ variant: "secondary" })
            )}
          >
            github
          </a>
        </div>
      </div>
      <BG />
    </Layout>
  );
};

export default AboutPage;

export async function getStaticProps() {
  const films = await getLetterboxd();

  const response = await getTopTracks();
  const { items } = await response.json();

  const aboutData = `

  ### about me.

  Hey,👋 my name is YuCheng Kuo, a self-taught designer and engineer from Taiwan. I studied engineering in undergrad and self-taught design and web development. Currently I'm working on projects, practicing skills and looking for potential work.

  I'm always fascinated by how technology reshape our daily life and the diversity in the digital world. I believe that design and technology could empower us in mnay ways. I'm energized to explore new possibilities to help building the future.

  I am, a heavy listener, recently listened the most to [${items[0].name}](${
    items[0].external_urls.spotify
  }) by ${items[0].artists
    .map((artist) => artist.name)
    .join(", ")}. A film lover, recently watched [${films[0].film.title} (${
    films[0].film.year
  })](${
    films[0].uri
  }). An independent thinker. A wanderer. A curiosity-driven learner.

  ### about the site.

  Built from scratch in [VS Code](https://code.visualstudio.com/), with [Next.js](https://nextjs.org), [theme-ui](https://theme-ui.com), [mdx](https://mdxjs.com), and [framer-motion](https://www.framer.com/motion), and the type is set in [Sora](https://github.com/sora-xor/sora-font).
  
  More detail can be found in [project section](/#project).

`;

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const { code } = await bundleMDX(aboutData, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        require("remark-slug"),
      ];
      return options;
    },
  });

  return {
    revalidate: 60 * 60 * 12,
    props: {
      code,
    },
  };
}

const BG = () => {
  const { scrollYProgress } = useViewportScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={box({
          position: "absolute",
          display: "none",
          flexDirection: "column",
          maxWidth: 960,
          top: 720,
          left: "50vw",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
          "@bp1": { display: "flex" },
          "& div": {
            borderRadius: 60,
            filter: `blur(24px)`,
            opacity: 0.05,
            mixBlendMode: `screen`,
            width: "85vw",
            "@bp1": { width: 560 },
            "@bp2": { width: 640 },
          },
          "& div:nth-of-type(even)": { ml: "$13" },
          "& div:nth-of-type(odd)": { ml: "-$11" },
          "& div:nth-of-type(1)": { backgroundColor: "$pink", height: 560 },
          "& div:nth-of-type(2)": { backgroundColor: "$yellow", height: 360 },
          "& div:nth-of-type(3)": { backgroundColor: "$green", height: 1200 },
          "& div:nth-of-type(4)": { backgroundColor: "$pink", height: 480 },
        })}
      >
        <m.div style={{ y: y1 }} />
        <m.div style={{ y: y2 }} />
        <m.div style={{ y: y3 }} />
        <m.div style={{ y: y4 }} />
      </m.div>
    </LazyMotion>
  );
};
