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
            backgroundColor: "altText",
          },
        }}
      >
        <Flex sx={{ alignItems: "center", mt: 6 }}>
          <LogoSvg />
          <Text
            as="p"
            ml={2}
            sx={{ fontSize: 1, fontWeight: 600, color: "secondaryText" }}
          >
            made by yucheng kuo. &#169; 2021
          </Text>
          <Text
            as="p"
            ml="auto"
            sx={{ fontSize: 1, fontWeight: 600, color: "secondaryText" }}
          >
            TW, KHH
          </Text>
        </Flex>
        <NowPlaying />
      </Flex>
    </footer>
  );
}
