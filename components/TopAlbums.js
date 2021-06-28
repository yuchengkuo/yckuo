/** @jsxImportSource theme-ui */
import useSWR from "swr";
import fetcher from "utlis/fetcher";
import Image from "next/image";
import { Box, Flex, Link } from "theme-ui";
import { motion } from "framer-motion";

export default function TopAlbums() {
  const { data } = useSWR("/api/top-albums", fetcher);
  const variant = {
    hover: {
      x: 0,
      y: 0,
      opacity: 1,
      rotateZ: 0,
    },
  };

  return data ? (
    <ul sx={{ listStyle: "none", gridColumn: 2, p: 0, m: 0 }}>
      {data.albums.map((album, i) => (
        <motion.li key={i} sx={{ mb: 10 }} whileHover="hover">
          <Link
            href={album.spotifyUrl}
            sx={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Flex sx={{ height: 120, position: "relative" }}>
              <p
                sx={
                  i === 0
                    ? {
                        fontSize: 1,
                        fontWeight: 300,
                        color: "altText",
                        m: 0,
                        mt: "auto",
                        mr: 4,
                      }
                    : {
                        fontSize: 1,
                        fontWeight: 300,
                        color: "altText",
                        m: 0,
                        mt: "auto",
                        mr: 4,
                        "::before": {
                          content: "''",
                          position: "absolute",
                          top: -60,
                          width: 1,
                          height: 150,
                          backgroundColor: "#3B3C40",
                        },
                      }
                }
              >
                0{i + 1}
              </p>

              <Box sx={{ borderRadius: 5, overflow: "hidden", flexShrink: 0 }}>
                <Image src={album.imageUrl} width={120} height={120} />
              </Box>

              <Flex ml={4} sx={{ flexDirection: "column" }}>
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ x: -10, y: 10, opacity: 0, rotateZ: 30 }}
                  variants={variant}
                >
                  <path
                    d="M7 17L17 7"
                    stroke="#E3E3E3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7H17V17"
                    stroke="#E3E3E3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <h3
                  sx={{
                    fontSize: 2,
                    fontWeight: "body",
                    color: "text",
                    mt: "auto",
                  }}
                >
                  {album.title}
                </h3>
                <p
                  sx={{ fontSize: 1, fontWeight: 300, color: "altText", m: 0 }}
                >
                  {album.artist}
                </p>
              </Flex>
            </Flex>
          </Link>
        </motion.li>
      ))}
      <motion.li>
        <Link
          href="https://www.last.fm/user/EthanKuo"
          sx={{
            variant: "text.caps",
            color: "altText",
            textDecoration: "none",
          }}
        >
          check out my last.fm
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={{ verticalAlign: "middle", ml: 2 }}
          >
            <path
              d="M3.33325 8H12.6666"
              stroke="#777980"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 3.33325L12.6667 7.99992L8 12.6666"
              stroke="#777980"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </motion.li>
    </ul>
  ) : (
    <div sx={{ gridColumn: 2, p: 0 }}>
      {new Array(5).fill(0).map((_, i) => (
        <Flex key={i} sx={{ mb: 10, height: 120 }}>
          <Box sx={{ height: 120, width: 120, backgroundColor: "altText" }} />
          <Flex sx={{ ml: 4, flexDirection: "column" }}>
            <h3
              sx={{
                fontSize: 2,
                fontWeight: "body",
                color: "text",
                mt: "auto",
                mb: 0,
              }}
            >
              Loading...
            </h3>
          </Flex>
        </Flex>
      ))}
    </div>
  );
}
