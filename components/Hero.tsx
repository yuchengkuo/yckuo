import Link from "next/link";
import Svg from "./Svg";
import { motion } from "framer-motion";
import { layout } from "@styles/layout";
import { box } from "@styles/box";
import { button } from "@styles/button";
import { text } from "@styles/text";

const Hero = () => {
  return (
    <div
      className={layout({
        variant: "hero",
        css: {
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "flex-end",
          pt: "$4",
          "@bp2": { pt: "$11" },
          "@bp3": {
            flexDirection: "row",
            justifyContent: "space-between",
            pt: "$12",
          },
        },
      })}
    >
      <motion.div
        className={box({
          maxWidth: 520,
          mx: "auto",
          "@bp3": { mx: "unset" },
        })}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1
          className={text({
            css: {
              fontSize: "$8",
              "@bp2": { fontSize: "$9" },
              "@bp3": { fontSize: "$10" },
              fontWeight: 400,
              backgroundImage:
                "linear-gradient(270deg, $pink 8%, $green 65%, $yellow 120%)",
              backgroundClip: "text",
              color: "transparent",
            },
          })}
        >
          Hi, I&apos;m YuCheng.
        </motion.h1>
        <p className={text({ article: "p" })}>
          A self-taught designer and engineer who enjoy building things and
          wandering in the intersection of design and engineering.
        </p>

        <div
          className={box({
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            "& svg": {
              verticalAlign: "-3px",
              ml: "$3",
            },
            "@bp1": { flexDirection: "row", alignItems: "unset" },
          })}
        >
          <button
            className={button({
              variant: "secondary",
              css: { color: "$gray2", textAlign: "initial" },
            })}
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
          </button>

          <Link href="/about" passHref>
            <a
              className={button({
                variant: "secondary",
                css: { color: "$gray2", textAlign: "initial" },
              })}
            >
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
            </a>
          </Link>
        </div>
      </motion.div>

      <div
        className={box({
          display: "grid",
          gridTemplate: "repeat(4, 82px) / repeat(4, 82px)",
          alignItems: "center",
          justifyContent: "center",
          mb: "$4",
          gap: "$3",
          "@bp1": { mb: "$11", gap: "$4" },
          "@bp2": { gap: "$3" },
        })}
      >
        {new Array(16).fill(0).map((i) => (
          <Svg key={i} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
