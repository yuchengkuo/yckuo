/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui";
import Img from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { transparentize } from "@theme-ui/color";
import { loader } from "utlis/image-loader";

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

  return data.published ? (
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
        whileFocus="hover"
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
            loader={loader}
            src={`/project/${data.slug}.jpg`}
            alt="project cover image"
            width={660}
            height={240}
            objectFit="cover"
            priority
          />
        </MotionFlex>
      </MotionFlex>
    </Link>
  ) : (
    <Flex
      sx={{
        flexDirection: ["column", "row"],
        justifyContent: "space-between",
        cursor: "not-allowed",
      }}
    >
      <Flex
        sx={{ width: 240, flexDirection: "column", overflow: "hidden", mr: 2 }}
      >
        <h2
          sx={{
            fontSize: 3,
            fontWeight: "heading",
            lineHeight: "heading4",
            color: "text",
            m: 0,
          }}
        >
          {data.title}
        </h2>
        <p sx={{ variant: "text.caps", color: "secondaryText" }}>
          {data.subtitle}
        </p>
      </Flex>

      <Flex
        sx={{
          height: 240,
          maxWidth: 640,
          borderRadius: 15,
          flexBasis: ["unset", 640],
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: transparentize("altText", 0.9),
        }}
      >
        <p sx={{ fontSize: 2, fontWeight: "body", color: "altText" }}>WIP...</p>
      </Flex>
    </Flex>
  );
};

export default ProjectCard;
