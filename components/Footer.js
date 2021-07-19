/** @jsxImportSource theme-ui */
import { LogoSvg } from "./Header";
import { Flex, Text, NavLink } from "theme-ui";
import Link from "next/link";
import NowPlaying from "./NowPlaying";
import { transparentize } from "@theme-ui/color";

export default function Footer() {
  return (
    <footer>
      <Flex
        as="nav"
        variant="layout.nav"
        mb={8}
        sx={{
          justifyContent: "space-between",
          flexDirection: ["column-reverse", null],
          alignItems: ["center", "unset"],
          position: "relative",
          ":before": {
            position: "absolute",
            content: "''",
            height: 1,
            width: `calc(100% - 80px)`,
            top: 0,
            left: 6,
            backgroundColor: transparentize("altText", 0.5),
          },
        }}
      >
        <Flex sx={{ alignItems: "center", mt: 6 }}>
          <Link href="/" passHref>
            <NavLink>
              <LogoSvg />
            </NavLink>
          </Link>
          <Text
            as="p"
            ml={2}
            sx={{ fontSize: 1, fontWeight: 600, color: "secondaryText" }}
          >
            &#169; 2021 yucheng kuo.
          </Text>
          <Text
            as="p"
            ml="auto"
            sx={{ fontSize: 1, fontWeight: 600, color: "secondaryText" }}
          >
            TW
          </Text>
        </Flex>
        <NowPlaying />
      </Flex>
    </footer>
  );
}
