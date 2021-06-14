/** @jsxImportSource theme-ui */
import { Flex, NavLink, Text } from "@theme-ui/components";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Flex as="nav" variant="layout.nav">
        <Flex sx={{ flex: `1 1 auto` }}>
          <Link href="/">
            <NavLink sx={{ "> *": { mr: 3 } }}>
              <LogoSvg />
              <Text>yucheng kuo.</Text>
            </NavLink>
          </Link>
        </Flex>
        <Flex sx={{ justifyContent: "space-between", gap: 4 }}>
          <Link href="">
            <NavLink>Projects</NavLink>
          </Link>
          <Link href="/about">
            <NavLink>About</NavLink>
          </Link>
          <Link href="mailto:hey@yuchengkuo.com?subject=Hi">
            <NavLink>Send mail</NavLink>
          </Link>
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
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Header;
