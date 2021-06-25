/** @jsxImportSource theme-ui */
import useSWR from "swr";
import fetcher from "../utlis/fetcher";
import { Flex, Link } from "theme-ui";
import { transparentize } from "@theme-ui/color";

export default function TopTracks() {
  const { data } = useSWR("/api/top-tracks", fetcher);

  return data ? (
    <ul
      sx={{
        listStyleType: "none",
        fontSize: 1,
        fontWeight: 200,
        color: "altText",
        px: 5,
        py: 2,
        ml: -5,
        backgroundColor: transparentize("text", 0.9),
        borderRadius: 15,
        backdropFilter: `blur(30px)`,
      }}
    >
      <h3
        sx={{
          fontSize: 2,
          fontWeight: "heading",
          color: "secondaryText",
          mb: 6,
        }}
      >
        top tracks 📻
      </h3>
      {data.tracks.map((track, i) => (
        <li key={i} sx={{}}>
          <Flex sx={{ flexDirection: "column", mb: 7 }}>
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: [1, 2],
                fontWeight: 200,
                mb: 3,
                textDecoration: "none",
                color: "text",
              }}
            >
              {track.title}
            </Link>
            <p sx={{ fontSize: 1, fontWeight: 300, m: 0, color: "altText" }}>
              {track.artists}
            </p>
          </Flex>
        </li>
      ))}
    </ul>
  ) : (
    <div sx={{ py: 4 }}>
      <h3
        sx={{
          fontSize: 2,
          fontWeight: "body",
          color: "secondaryText",
          mb: 6,
        }}
      >
        Loading...
      </h3>
    </div>
  );
}
