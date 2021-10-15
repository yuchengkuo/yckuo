import Img from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { loader } from "@utils/image-loader";
import { box } from "@styles/box";
import { link } from "@styles/link";
import { text } from "@styles/text";
import { Frontmatter } from "types/types";

const ProjectCard = ({ data }: { data: Frontmatter }) => {
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
      <motion.a
        className={link({
          css: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "@bp1": { flexDirection: "row" },
            gap: "$4",
            "&:focus": { outline: "none" },
          },
        })}
        initial="initial"
        whileHover="hover"
        whileFocus="hover"
        whileTap={{ filter: `blur(3px)` }}
      >
        <motion.div
          className={box({
            display: "flex",
            width: 240,
            flexDirection: "column",
            overflow: "hidden",
          })}
        >
          <h2
            className={text({
              css: {
                fontSize: "$6",
                fontWeight: 400,
                lineHeight: "36px",
                color: "$white",
                mb: "$2",
              },
            })}
          >
            {data.title}
          </h2>
          <p
            className={text({
              css: {
                fontSize: "$2",
                fontWeight: 400,
                lineHeight: "24px",
                color: "$gray600",
                textTransform: "uppercase",
              },
            })}
          >
            {data.subtitle}
          </p>
          <motion.svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={box({
              mt: "auto",
              display: "none",
              "@bp1": { display: "unset" },
            })}
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
        </motion.div>

        <motion.div
          className={box({
            display: "flex",
            borderRadius: 15,
            overflow: "hidden",
            height: 240,
          })}
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
        </motion.div>
      </motion.a>
    </Link>
  ) : (
    <div
      className={box({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "@bp1": { flexDirection: "row" },
      })}
    >
      <div
        className={box({
          display: "flex",
          flexDirection: "column",
          width: 240,
          mr: "$2",
        })}
      >
        <h2
          className={text({
            css: {
              fontSize: "$6",
              fontWeight: 400,
              lineHeight: "36px",
              color: "$white",
              mb: "$2",
            },
          })}
        >
          {data.title}
        </h2>
        <p
          className={text({
            css: {
              fontSize: "$2",
              fontWeight: 400,
              lineHeight: "24px",
              color: "$gray600",
              textTransform: "uppercase",
            },
          })}
        >
          {data.subtitle}
        </p>
      </div>

      <div
        className={box({
          height: 240,
          maxWidth: 640,
          borderRadius: 15,
          display: "flex",
          flexBasis: "unset",
          "@bp1": { flexBasis: 640 },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "$gray4",
        })}
      >
        <p
          className={text({
            css: {
              fontSize: "$3",
              fontWeight: 200,
              color: "$gray3",
            },
          })}
        >
          WIP...
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
