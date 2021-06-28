/** @jsxImportSource theme-ui */
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Layout from "components/Layout";
import { Container, Grid, Themed, Button } from "theme-ui";
import { getLetterboxd } from "utlis/letterboxd";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import TopAlbums from "components/TopAlbums";

const AboutPage = ({ mdxSource }) => {
  return (
    <Layout>
      <Container
        as="section"
        variant="maxWidth"
        px={[4, 6]}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div
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
        as="section"
        variant="layout.section"
        my={[7, 9]}
        sx={{ gridTemplateColumns: `auto minmax(auto, 560px)`, gap: 0 }}
      >
        <Container
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

      <Container as="section" variant="text">
        <Themed.h3 sx={{ color: "text" }}>listening & watching.</Themed.h3>
        <Themed.p>lost in music and films.</Themed.p>
        <Grid variant="article">
          <TopAlbums />
        </Grid>
      </Container>

      <Container as="section" variant="section" py={[7, 10]}>
        <Themed.h3 sx={{ color: "text" }}>other me.</Themed.h3>
        <Themed.p>Find other digital me.</Themed.p>
        <Grid sx={{ gridTemplateColumns: `auto auto`, gap: 6 }}>
          <Button>Email</Button>
          <Button>Read.CV</Button>
          <Button>Letterboxd</Button>
          <Button>Spotify</Button>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AboutPage;

export async function getStaticProps() {
  const aboutData = `

  ### about me.

  Hey, my name is YuCheng Kuo, a self-taught designer and engineer from Taiwan. I study engineering in undergrad and self-taught design and web development in my spare time. 

  I like tech, startups, design, cars, music, films and many other things.
  
  Currently I’m working on some solo projects to improve my skills and seeking a full-time job. I’m always curious about how things (and people) work, and sometimes think about potential improvements.

  Constantly learning, keep improving, full curiosity.

  ### digital.

  I’m constantly facinated by how the technology reshape our daily life (and it’s going fast!) and how design plays such a significant part in.

  I'm always fascinated by how technology reshape our daily life and how diverse the digital world is.



  I found user experience & product design at late 2020 and constantly learning and reading ever since. (Also fighting the distraction and feeling the highs and lows...) I’m currently working on some projects to better sharpen my skills.

  ### about the site.

  Built from scratch with [Next.js](https://nextjs.org), style with [theme-ui](https://theme-ui.com), and help of [mdx](https://mdxjs.com), [framer-motion](https://www.framer.com/motion). Typeface [Sora](https://github.com/sora-xor/sora-font), more detail can be found in the [project section](/#project).

`;

  const aboutSource = await serialize(aboutData, {
    mdxOptions: { remarkPlugins: [require("remark-slug")] },
  });

  const films = await getLetterboxd();

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
    <motion.div sx={{ position: "absolute", top: 80, left: 0, zIndex: -5 }}>
      <motion.div
        style={{ y: y1 }}
        sx={{
          width: 660,
          height: 500,
          backgroundColor: "accent",
          borderRadius: 60,
          filter: `blur(10px)`,
          opacity: 0.08,
          mixBlendMode: `screen`,
          position: "absolute",
          top: 840,
          left: 60,
        }}
      ></motion.div>
      <motion.div
        style={{ y: y2 }}
        sx={{
          width: 640,
          height: 700,
          backgroundColor: "primary",
          borderRadius: 60,
          filter: `blur(10px)`,
          opacity: 0.08,
          mixBlendMode: `screen`,
          position: "absolute",
          top: 1200,
          left: 420,
        }}
      ></motion.div>
      <motion.div
        style={{ y: y3 }}
        sx={{
          width: 640,
          height: 300,
          backgroundColor: "secondary",
          borderRadius: 60,
          filter: `blur(10px)`,
          opacity: 0.08,
          mixBlendMode: `screen`,
          position: "absolute",
          top: 1700,
          left: 60,
        }}
      ></motion.div>
    </motion.div>
  );
};
