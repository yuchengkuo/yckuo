/** @jsxImportSource theme-ui */
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { Flex, Link } from "theme-ui";
import { transparentize } from "@theme-ui/color";
import { Tracks } from "types/types";

export default function TopTracks() {
  const { data } = useSWR<Tracks[]>("/api/top-tracks", fetcher);

  return data ? (
    <ul
      sx={{
        listStyleType: "none",
        p: 6,
        backgroundColor: transparentize("text", 0.9),
        borderRadius: 15,
        boxShadow: `inset -0.6px 0.6px 1px #ffffff26`,
        backdropFilter: `blur(30px)`,
        "li:last-child": { mb: 0 },
      }}
    >
      <h3
        sx={{
          fontSize: 2,
          fontWeight: "heading",
          color: "secondaryText",
          mb: 8,
        }}
      >
        Top tracks 📻
      </h3>
      {data.map((track, i) => (
        <li key={i} sx={{ mb: 6 }}>
          <Flex sx={{ flexDirection: "column" }}>
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
