/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Layout from "components/Layout";
import { Container, Flex, Themed, Button } from "theme-ui";
import { getLetterboxd } from "utlis/letterboxd";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import TopAlbums from "components/TopAlbums";
import { getTopTracks } from "utlis/spotify";
import Link from "next/link";
import Img from "next/image";
import { NextSeo } from "next-seo";
import avatar from "../public/images/about-avatar.jpg";

const AboutPage = ({ mdxSource }) => {
  return (
    <Layout>
      <NextSeo title="YuCheng Kuo / About" />

      <BG />
      <Container
        variant="text"
        as="article"
        sx={{
          "h3 > a": { color: "text" },
          "h3:not(:first-of-type)": { mt: [11, 13] },
          ul: { mt: 6 },
        }}
      >
        <motion.div
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          sx={{ mb: [8, 11], pointerEvents: "none", width: [80, 96, 120] }}
        >
          <Img
            src={avatar}
            width={120}
            height={120}
            sx={{ borderRadius: 15 }}
            placeholder="blur"
          />
        </motion.div>

        <MDXRemote {...mdxSource} />

        <Themed.h3 sx={{ color: "text" }}>
          what i&apos;ve been listening to.
        </Themed.h3>
        <Themed.p>
          Weekly top albums pulled from Last.fm and linked to Spotify.🎧
        </Themed.p>

        <TopAlbums />

        <Themed.h3 sx={{ color: "text" }}>other me.</Themed.h3>
        <Themed.p>Meet other digital me.🗿</Themed.p>
        <Flex sx={{ flexDirection: ["column", "row"] }} mb={6}>
          <Link href="mailto:hey@yuchengkuo.com?subject=Hi!" passHref>
            <Button
              as="a"
              mr={[0, 11]}
              mb={[5, 0]}
              title="Send ✉ to yucheng"
              data-splitbee-event="External Link"
              data-splitbee-event-type="mail"
              className="umami--External-Link--send-mail"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.83335 3.33325H17.1667C18.0834 3.33325 18.8334 4.08325 18.8334 4.99992V14.9999C18.8334 15.9166 18.0834 16.6666 17.1667 16.6666H3.83335C2.91669 16.6666 2.16669 15.9166 2.16669 14.9999V4.99992C2.16669 4.08325 2.91669 3.33325 3.83335 3.33325Z"
                  stroke="#E3E3E3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.8334 5L10.5 10.8333L2.16669 5"
                  stroke="#E3E3E3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Mail
            </Button>
          </Link>
          <Link href="https://read.cv/yuchengkuo" passHref>
            <Button
              as="a"
              title="Read yucheng's CV"
              data-splitbee-event="External Link"
              data-splitbee-event-type="read.cv"
              className="umami--External-Link--read-cv"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.90707 0.602843C7.30668 0.174018 5.66167 1.12376 5.23284 2.72416L1.60284 16.2715C1.17402 17.8719 2.12376 19.5169 3.72416 19.9457L15.0555 22.982C16.6559 23.4108 18.301 22.4611 18.7298 20.8607L22.3598 7.31331C22.7886 5.71292 21.8389 4.06791 20.2385 3.63908L8.90707 0.602843ZM7.16469 3.2418C7.30763 2.70833 7.85597 2.39175 8.38944 2.5347L19.7208 5.57093C20.2543 5.71387 20.5709 6.26221 20.4279 6.79568L16.7979 20.343C16.655 20.8765 16.1067 21.1931 15.5732 21.0501L4.2418 18.0139C3.70834 17.8709 3.39175 17.3226 3.53469 16.7891L7.16469 3.2418ZM9.77392 4.96062C9.24152 4.81375 8.69086 5.12628 8.54399 5.65868C8.39713 6.19108 8.70966 6.74173 9.24206 6.8886L16.792 8.97134C17.3244 9.11821 17.8751 8.80568 18.0219 8.27328C18.1688 7.74088 17.8563 7.19023 17.3239 7.04336L9.77392 4.96062ZM7.56076 9.09989C7.70762 8.56749 8.25828 8.25496 8.79068 8.40183L16.3406 10.4846C16.873 10.6314 17.1856 11.1821 17.0387 11.7145C16.8918 12.2469 16.3412 12.5594 15.8088 12.4126L8.25882 10.3298C7.72642 10.1829 7.41389 9.63229 7.56076 9.09989ZM7.80753 11.843C7.27513 11.6962 6.72447 12.0087 6.5776 12.5411C6.43073 13.0735 6.74327 13.6242 7.27567 13.771L11.6663 14.9822C12.1987 15.1291 12.7494 14.8166 12.8962 14.2842C13.0431 13.7518 12.7306 13.2011 12.1982 13.0542L7.80753 11.843Z"
                  fill="#E3E3E3"
                />
              </svg>
              Read.CV
            </Button>
          </Link>
        </Flex>
        <Flex sx={{ flexWrap: "wrap", "> *": { flex: `1 1 150px` } }}>
          <Link href="https://linkedin.com/in/yucheng-kuo" passHref>
            <Button
              as="a"
              variant="secondary"
              data-splitbee-event="External Link"
              data-splitbee-event-type="linkedin"
              className="umami--External-Link--linkedin"
            >
              linkedin
            </Button>
          </Link>
          <Link href="https://letterboxd.com/ethank" passHref>
            <Button
              as="a"
              variant="secondary"
              data-splitbee-event="External Link"
              data-splitbee-event-type="letterboxd"
              className="umami--External-Link--letterboxd"
            >
              letterboxd
            </Button>
          </Link>
          <Link href="https://open.spotify.com/user/cheng-90" passHref>
            <Button
              as="a"
              variant="secondary"
              data-splitbee-event="External Link"
              data-splitbee-event-type="spotify"
              className="umami--External-Link--spotify"
            >
              spotify
            </Button>
          </Link>
          <Link href="https://github.com/yuchengkuo" passHref>
            <Button
              as="a"
              variant="secondary"
              data-splitbee-event="External Link"
              data-splitbee-event-type="github"
              className="umami--External-Link--github"
            >
              github
            </Button>
          </Link>
        </Flex>
      </Container>
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

  const aboutSource = await serialize(aboutData, {
    mdxOptions: { remarkPlugins: [require("remark-slug")] },
  });

  return {
    revalidate: 60 * 60 * 12,
    props: {
      mdxSource: aboutSource,
      films: films,
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
    <motion.div
      sx={{
        position: "absolute",
        display: ["none", "flex"],
        flexDirection: "column",
        maxWidth: 960,
        top: 720,
        left: "50vw",
        transform: "translateX(-50%)",
        zIndex: -5,
        div: {
          borderRadius: 60,
          filter: `blur(24px)`,
          opacity: 0.05,
          mixBlendMode: `screen`,
          width: [`85vw`, 560, 640],
        },
        "div:nth-of-type(even)": { ml: 13 },
        "div:nth-of-type(odd)": { ml: -11 },
        "div:nth-of-type(1)": { backgroundColor: "accent", height: 560 },
        "div:nth-of-type(2)": { backgroundColor: "primary", height: 360 },
        "div:nth-of-type(3)": { backgroundColor: "secondary", height: 1200 },
        "div:nth-of-type(4)": { backgroundColor: "accent", height: 400 },
      }}
    >
      <motion.div style={{ y: y1 }} />
      <motion.div style={{ y: y2 }} />
      <motion.div style={{ y: y3 }} />
      <motion.div style={{ y: y4 }} />
    </motion.div>
  );
};
