/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui";
import Img from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProjectCard = ({ data }) => {
  const MotionFlex = motion(Flex);
  const SvgVaraint = {
    initial: {
      x: `-100%`,
      opacity: 0,
    },
    hover: {
      x: 0,
      opacity: 1,
    },
  };
  const ImgVariant = {
    initial: {
      opacity: 0.7,
      filter: `blur(3px)`,
      maxWidth: 640,
    },
    hover: {
      opacity: 1,
      filter: `blur(0px)`,
      maxWidth: 660,
    },
  };

  return (
    <Link href={`/projects/${data.slug}`} passHref>
      <MotionFlex
        as="a"
        sx={{
          textDecoration: "none",
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        initial="initial"
        whileHover="hover"
        whileTap={{ filter: `blur(3px)` }}
      >
        <MotionFlex
          sx={{
            width: 240,
            flexDirection: "column",
            overflow: "hidden",
            mr: 2,
          }}
        >
          <motion.h2
            sx={{
              fontSize: 3,
              fontWeight: "heading",
              lineHeight: "heading4",
              color: "text",
              m: 0,
            }}
          >
            {data.title}
          </motion.h2>
          <p sx={{ variant: "text.caps", color: "secondaryText" }}>
            {data.subtitle}
          </p>
          <motion.svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={{ mt: "auto", display: ["none", "unset"] }}
            variants={SvgVaraint}
          >
            <path
              d="M18.6667 28H37.3333"
              stroke="#E3E3E3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 18.6667L37.3333 28.0001L28 37.3334"
              stroke="#E3E3E3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </MotionFlex>

        <MotionFlex
          sx={{ borderRadius: 15, overflow: "hidden", height: 240 }}
          variants={ImgVariant}
        >
          <Img
            src={`/${data.slug}.jpg`}
            alt="project cover image"
            width={660}
            height={240}
            objectFit="cover"
          />
        </MotionFlex>
      </MotionFlex>
    </Link>
  );
};

export default ProjectCard;
