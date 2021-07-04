/** @jsxImportSource theme-ui */
import Link from "next/link";
import { Container, Grid, Flex, Button } from "theme-ui";
import Svg from "./Svg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Container
      as="section"
      variant="hero"
      sx={{
        display: "flex",
        justifyContent: ["start", null, "space-between"],
        pt: [4, 11, 12],
        flexDirection: ["column-reverse", null, "row"],
      }}
    >
      <motion.div
        sx={{ maxWidth: 520, mx: [null, "auto", "unset"] }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1
          sx={{
            fontSize: [4, 7],
            fontWeight: "heading",
            backgroundImage:
              "linear-gradient(270deg, #FBCED3 6.44%, #D6E4DC 63.07%, #FCB33D 126.63%)",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hi, I&apos;m YuCheng.
        </motion.h1>
        <p
          sx={{
            fontSize: [1, 2],
            lineHeight: "body",
            color: "secondaryText",
            mb: 4,
          }}
        >
          A self-taught designer and engineer who&apos;s into UX, UI, react,
          Jamstack, music, films and more cool things.
        </p>

        <Flex
          sx={{
            flexDirection: ["column", "row"],
            alignItems: ["start", "unset"],
            svg: { verticalAlign: "-3px", ml: 3 },
          }}
        >
          <Button
            variant="hero"
            bg="background"
            p={0}
            py={1}
            mr={8}
            mb={[4, 0]}
            onClick={() => {
              const offsetY = document.getElementById("project").offsetTop - 20;
              window.scrollTo({ top: offsetY, left: 0, behavior: "smooth" });
            }}
          >
            See my projects
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66669 8.66667L3.6095 7.72386L7.33335 11.4477V2H8.66669V11.4477L12.3905 7.72386L13.3334 8.66667L8.00002 14L2.66669 8.66667Z"
                fill="#777980"
              />
            </svg>
          </Button>

          <Link href="/about" passHref>
            <Button as="a" variant="hero" bg="background" px={0} py={1}>
              More about me
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3333 4.66665C11.3333 6.5076 9.84095 7.99998 8 7.99998C6.15905 7.99998 4.66667 6.5076 4.66667 4.66665C4.66667 2.8257 6.15905 1.33331 8 1.33331C9.84095 1.33331 11.3333 2.8257 11.3333 4.66665ZM10 4.66665C10 5.77122 9.10457 6.66665 8 6.66665C6.89543 6.66665 6 5.77122 6 4.66665C6 3.56208 6.89543 2.66665 8 2.66665C9.10457 2.66665 10 3.56208 10 4.66665Z"
                  fill="#777980"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.3763 12C13.5846 12.419 13.7452 12.8658 13.8513 13.3333H2.14868C2.25477 12.8658 2.41546 12.419 2.62368 12C3.60549 10.0244 5.64419 8.66665 8 8.66665C10.3558 8.66665 12.3945 10.0244 13.3763 12ZM8 9.99998C9.58503 9.99998 10.987 10.7909 11.8306 12H4.16942C5.01305 10.7909 6.41498 9.99998 8 9.99998Z"
                  fill="#777980"
                />
              </svg>
            </Button>
          </Link>
        </Flex>
      </motion.div>

      <Grid
        sx={{
          gridTemplate: "repeat(4, 82px) / repeat(4, 82px)",
          alignItems: "center",
          justifyContent: "center",
          mb: [4, 11, 0],
          gap: [3, 4, 3],
        }}
      >
        {new Array(16).fill(0).map((i) => (
          <Svg key={i} />
        ))}
      </Grid>
    </Container>
  );
};

export default Hero;
