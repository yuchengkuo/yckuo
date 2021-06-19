/** @jsxImportSource theme-ui */
import { LogoSvg } from "./Header";
import { Flex, Text } from "theme-ui";
import NowPlaying from "./NowPlaying";

export default function Footer() {
  return (
    <footer>
      <Flex
        as="nav"
        variant="layout.nav"
        mb={8}
        sx={{
          justifyContent: "space-between",
          flexDirection: ["column", "row"],
          alignItems: ["center", "unset"],
        }}
      >
        <Flex sx={{ alignItems: "center", mb: [5, 0] }}>
          <LogoSvg />
          <Text
            as="p"
            ml={2}
            sx={{ fontSize: 1, fontWeight: 600, color: "secondaryText" }}
          >
            © yucheng kuo. 2021-
          </Text>
        </Flex>
        <NowPlaying />
      </Flex>
    </footer>
  );
}
