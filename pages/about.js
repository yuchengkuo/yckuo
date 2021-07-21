/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Layout from "components/Layout";
import { Container, Grid, Flex, Themed, Button } from "theme-ui";
import { getLetterboxd } from "utlis/letterboxd";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import TopAlbums from "components/TopAlbums";
import { getTopTracks } from "utlis/spotify";
import Link from "next/link";
import { NextSeo } from "next-seo";

const AboutPage = ({ mdxSource }) => {
  return (
    <Layout>
      <NextSeo title="YuCheng Kuo / About" />
      <Container
        variant="maxWidth"
        px={[4, 6]}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <motion.div
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          sx={{
            width: 540,
            height: 320,
            borderRadius: 15,
            backgroundColor: "altText",
            alignSelf: "flex-start",
            my: 6,
          }}
        />
        <svg
          width="562"
          height="82"
          viewBox="0 0 562 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 81L0.552786 80.7764L0.190983 81.5H1V81ZM41 81V81.5H41.309L41.4472 81.2236L41 81ZM1 1V0.5H0.190983L0.552786 1.22361L1 1ZM81 1L81.4472 1.22361L81.809 0.5H81V1ZM177 1L177.447 1.22361L177.809 0.5H177V1ZM97 1V0.5H96.5V1H97ZM157.447 40.1056L157 39.882L157.447 40.1056ZM157.447 41.8944L157 42.118L157.447 41.8944ZM177 81V81.5H177.809L177.447 80.7764L177 81ZM97 81H96.5V81.5H97V81ZM273 1L273.447 1.22361L273.809 0.5H273V1ZM233 1V0.5H232.691L232.553 0.776393L233 1ZM233 81V81.5H233.309L233.447 81.2236L233 81ZM193 81L192.553 80.7764L192.191 81.5H193V81ZM329 1V0.5H328.691L328.553 0.776393L329 1ZM369 1L369.447 1.22361L369.809 0.5H369V1ZM289 81L288.553 80.7764L288.191 81.5H289V81ZM329 81V81.5H329.309L329.447 81.2236L329 81ZM425 81V81.5H425.309L425.447 81.2236L425 81ZM385 81L384.553 80.7764L384.191 81.5H385V81ZM465 1L465.447 1.22361L465.809 0.5H465V1ZM385 1V0.5H384.191L384.553 1.22361L385 1ZM404.928 40.8569L404.481 41.0805L404.928 40.8569ZM404.928 41.1431L404.481 40.9195L404.928 41.1431ZM561 1L561.447 1.22361L561.809 0.5H561V1ZM481 1V0.5H480.5V1H481ZM541.447 40.1056L541 39.882V39.882L541.447 40.1056ZM541.447 41.8944L541 42.118V42.118L541.447 41.8944ZM561 81V81.5H561.809L561.447 80.7764L561 81ZM481 81H480.5V81.5H481V81ZM1 81.5H41V80.5H1V81.5ZM20.4812 40.9195L0.552786 80.7764L1.44721 81.2236L21.3757 41.3667L20.4812 40.9195ZM20.4812 41.0805C20.4559 41.0298 20.4559 40.9702 20.4812 40.9195L21.3757 41.3667C21.4911 41.1359 21.4911 40.8641 21.3757 40.6333L20.4812 41.0805ZM0.552786 1.22361L20.4812 41.0805L21.3757 40.6333L1.44721 0.776393L0.552786 1.22361ZM41 0.5H1V1.5H41V0.5ZM81 0.5H41V1.5H81V0.5ZM41.4472 81.2236L81.4472 1.22361L80.5528 0.776393L40.5528 80.7764L41.4472 81.2236ZM177 0.5H97V1.5H177V0.5ZM157.894 40.3292L177.447 1.22361L176.553 0.776393L157 39.882L157.894 40.3292ZM157.894 41.6708C157.683 41.2485 157.683 40.7515 157.894 40.3292L157 39.882C156.648 40.5858 156.648 41.4142 157 42.118L157.894 41.6708ZM177.447 80.7764L157.894 41.6708L157 42.118L176.553 81.2236L177.447 80.7764ZM137 81.5H177V80.5H137V81.5ZM97 81.5H137V80.5H97V81.5ZM96.5 1V81H97.5V1H96.5ZM273 0.5H233V1.5H273V0.5ZM233.447 81.2236L273.447 1.22361L272.553 0.776393L232.553 80.7764L233.447 81.2236ZM193 81.5H233V80.5H193V81.5ZM232.553 0.776393L192.553 80.7764L193.447 81.2236L233.447 1.22361L232.553 0.776393ZM329 1.5H369V0.5H329V1.5ZM289.447 81.2236L329.447 1.22361L328.553 0.776393L288.553 80.7764L289.447 81.2236ZM329 80.5H289V81.5H329V80.5ZM368.553 0.776393L328.553 80.7764L329.447 81.2236L369.447 1.22361L368.553 0.776393ZM425 80.5H385V81.5H425V80.5ZM464.553 0.776393L424.553 80.7764L425.447 81.2236L465.447 1.22361L464.553 0.776393ZM425 1.5H465V0.5H425V1.5ZM385 1.5H425V0.5H385V1.5ZM405.376 40.6333L385.447 0.776393L384.553 1.22361L404.481 41.0805L405.376 40.6333ZM405.376 41.3667C405.491 41.1359 405.491 40.8641 405.376 40.6333L404.481 41.0805C404.456 41.0298 404.456 40.9702 404.481 40.9195L405.376 41.3667ZM385.447 81.2236L405.376 41.3667L404.481 40.9195L384.553 80.7764L385.447 81.2236ZM561 0.5H481V1.5H561V0.5ZM541.894 40.3292L561.447 1.22361L560.553 0.776393L541 39.882L541.894 40.3292ZM541.894 41.6708C541.683 41.2485 541.683 40.7515 541.894 40.3292L541 39.882C540.648 40.5858 540.648 41.4142 541 42.118L541.894 41.6708ZM561.447 80.7764L541.894 41.6708L541 42.118L560.553 81.2236L561.447 80.7764ZM521 81.5H561V80.5H521V81.5ZM481 81.5H521V80.5H481V81.5ZM480.5 1V81H481.5V1H480.5Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-49.3491"
              y1="41.4939"
              x2="616.157"
              y2="41.4939"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB33D" />
              <stop offset="0.502367" stopColor="#D6E4DC" />
              <stop offset="1" stopColor="#FBCED3" />
            </linearGradient>
          </defs>
        </svg>
      </Container>

      <Grid
        variant="layout.section"
        sx={{ gridTemplateColumns: `auto minmax(auto, 560px)`, gap: 0 }}
      >
        <Container
          as="article"
          sx={{
            gridColumn: 2,
            "h3 > a": { color: "text" },
            "h3:not(:first-of-type)": { mt: 12 },
          }}
        >
          <MDXRemote {...mdxSource} />
        </Container>
      </Grid>
      <BG />

      <Container variant="text">
        <Themed.h3 sx={{ color: "text" }}>
          what i&apos;ve been listening to.
        </Themed.h3>
        <Themed.p>
          A list of weekly top albums pulled from Last.fm and linked them to
          Spotify.🎧
        </Themed.p>
        <Grid variant="article" pt={[7, 10]}>
          <TopAlbums />
        </Grid>
      </Container>

      <Container variant="text">
        <Themed.h3 sx={{ color: "text" }}>other me.</Themed.h3>
        <Themed.p>Meet other digital me.🗿</Themed.p>
        <Flex sx={{ flexDirection: ["column", "row"] }} mb={6}>
          <Link href="mailto:hey@yuchengkuo.com?subject=Hi!" passHref>
            <Button as="a" mr={[0, 11]} mb={[5, 0]} title="Send ✉ to yucheng">
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
            <Button as="a" title="Read yucheng's CV">
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
            <Button as="a" variant="secondary">
              linkedin
            </Button>
          </Link>
          <Link href="https://letterboxd.com/ethank" passHref>
            <Button as="a" variant="secondary">
              letterboxd
            </Button>
          </Link>
          <Link href="https://open.spotify.com/user/cheng-90" passHref>
            <Button as="a" variant="secondary">
              spotify
            </Button>
          </Link>
          <Link href="https://github.com/yuchengkuo" passHref>
            <Button as="a" variant="secondary">
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

  Hey, my name is YuCheng Kuo, a self-taught designer and engineer from Taiwan. I studied engineering in undergrad and self-taught design and web development in my spare time. Currently I'm working on projects, practicing skills and looking for potential work.
  
  ### digital.

  I'm always fascinated by how technology reshape our daily life and the diversity in the digital world. 
  I like tech, startups, design, cars, music, films and many other things.
  I like sharing and learning, 
  Constantly learning, keep improving, full curiosity.

  ### quick facts.

  A heavy listener, recent top track is [${items[0].name}](${
    items[0].external_urls.spotify
  }) by ${items[0].artists
    .map((artist) => artist.name)
    .join(", ")}. A film lover, recently watched [${films[0].film.title} (${
    films[0].film.year
  })](${films[0].uri}). And a independent thinker.💭

  ### about the site.

  Designed and developed by myself, it is built from scratch in [VS Code](https://code.visualstudio.com/), with [Next.js](https://nextjs.org), [theme-ui](https://theme-ui.com), [mdx](https://mdxjs.com), and [framer-motion](https://www.framer.com/motion), and the type is set in [Sora](https://github.com/sora-xor/sora-font).
  
  More detail can be found in [project section](/#project).

`;

  const aboutSource = await serialize(aboutData, {
    mdxOptions: { remarkPlugins: [require("remark-slug")] },
  });

  return {
    props: {
      mdxSource: aboutSource,
      films: films,
    },
  };
}

const BG = () => {
  const { scrollYProgress } = useViewportScroll();

  const y1 = useTransform(scrollYProgress, [0, 0.8], [-80, 400]);
  const y2 = useTransform(scrollYProgress, [0, 0.8], [0, 240]);
  const y3 = useTransform(scrollYProgress, [0, 0.8], [0, 480]);

  return (
    <motion.div
      sx={{
        position: "absolute",
        top: 48,
        left: 0,
        zIndex: -5,
        div: {
          borderRadius: 60,
          filter: `blur(10px)`,
          opacity: 0.06,
          mixBlendMode: `screen`,
          position: "absolute",
          width: [`85vw`, 560, 640],
        },
      }}
    >
      <motion.div
        style={{ y: y1 }}
        sx={{
          height: 500,
          backgroundColor: "accent",
          top: 840,
          left: [
            `calc(50vw - 220px)`,
            `calc(50vw - 400px)`,
            `calc(50vw - 480px)`,
            `calc(50vw - 800px)`,
          ],
        }}
      ></motion.div>
      <motion.div
        style={{ y: y2 }}
        sx={{
          height: 700,
          backgroundColor: "primary",
          top: 1200,
          left: [
            `calc(50vw - 160px)`,
            `calc(50vw - 240px)`,
            200,
            `calc(50vw - 400px)`,
          ],
        }}
      ></motion.div>
      <motion.div
        style={{ y: y3 }}
        sx={{
          height: 300,
          backgroundColor: "secondary",
          top: 1700,
          left: [
            `calc(50vw - 220px)`,
            `calc(50vw - 400px)`,
            `calc(50vw - 480px)`,
            `calc(50vw - 800px)`,
          ],
        }}
      ></motion.div>
    </motion.div>
  );
};
