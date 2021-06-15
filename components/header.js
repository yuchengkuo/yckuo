/** @jsxImportSource theme-ui */
import { Flex, NavLink, Text } from "@theme-ui/components";
import Link from "next/link";

const navItems = [
  { label: "Projects", link: "#project" },
  { label: "About", link: "/about" },
  { label: "Send mail", link: "mailto:hey@yuchengkuo.com?subject=Hi!" },
];

const Header = () => {
  return (
    <header>
      <Flex
        as="nav"
        variant="layout.nav"
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["center", "unset"],
        }}
      >
        <Flex sx={{ flex: `1 1 auto`, mb: [5, 0] }}>
          <Link href="/">
            <NavLink
              sx={{ "> *": { mr: 2 }, display: "flex", alignItems: "center" }}
            >
              <LogoSvg />
              <Text>yucheng kuo.</Text>
            </NavLink>
          </Link>
        </Flex>
        <Flex sx={{ justifyContent: "space-between", gap: 4 }}>
          {navItems.map((item, i) => (
            <Link href={item.link} key={i}>
              <NavLink>{item.label}</NavLink>
            </Link>
          ))}
        </Flex>
      </Flex>
    </header>
  );
};

const LogoSvg = () => {
  return (
    <svg
      width="38"
      height="26"
      viewBox="0 0 38 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1V25M13 1H1L7 13L1 25H13M13 1H25M13 25H25M13 25L25 1M31 13.5L37 1H25M31 13.5L37 25H25M31 13.5L25 25"
        stroke="#BDBEC1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Header;
