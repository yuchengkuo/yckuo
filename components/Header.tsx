import Link from "next/link";
import { motion } from "framer-motion";
import { layout } from "@styles/layout";
import { link } from "@styles/link";
import { box } from "@styles/box";

const navItems = [
  { label: "Projects", link: "/#project" },
  { label: "About", link: "/about" },
  { label: "Send mail", link: "mailto:hey@yuchengkuo.com?subject=Hi!" },
];

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <nav className={layout({ variant: "header" })}>
        <div
          className={box({
            display: "flex",
            alignItems: "center",
            flex: "1 1 auto",
            mb: "$5",
            "@bp1": { mb: 0 },
          })}
        >
          <Link href="/" passHref>
            <a
              className={box({
                css: {
                  display: "flex",
                  alignItems: "center",
                  "$ *": { mr: "$2" },
                },
              })}
            >
              <LogoSvg />
            </a>
          </Link>
        </div>
        <div
          className={box({
            display: "flex",
            justifyContent: "space-between",
            gap: "$4",
          })}
        >
          {navItems.map((item, i) => (
            <Link href={item.link} key={i} passHref>
              <a className={link({ variant: "navLink" })}>{item.label}</a>
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export const LogoSvg = () => {
  const varaint = {
    hover: {
      stroke: `#E3E3E3`,
    },
  };
  return (
    <motion.svg
      width="33"
      height="22"
      viewBox="0 0 38 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover="hover"
    >
      <motion.path
        d="M13 1V25M13 1H1L7 13L1 25H13M13 1H25M13 25H25M13 25L25 1M31 13.5L37 1H25M31 13.5L37 25H25M31 13.5L25 25"
        stroke="#BDBEC1"
        strokeWidth="2.4"
        strokeLinejoin="round"
        variants={varaint}
      />
    </motion.svg>
  );
};

export default Header;
