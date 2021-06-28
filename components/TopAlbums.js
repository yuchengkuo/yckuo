/** @jsxImportSource theme-ui */
import useSWR from "swr";
import fetcher from "utlis/fetcher";
import Image from "next/image";
import { Box, Flex, Link } from "theme-ui";

export default function TopAlbums() {
  const { data } = useSWR("/api/top-albums", fetcher);

  return data ? (
    <ul sx={{ listStyle: "none", gridColumn: 2, p: 0 }}>
      {data.albums.map((album, i) => (
        <li key={i} sx={{ mb: 10 }}>
          <Link
            href={album.spotifyUrl}
            sx={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Flex sx={{ height: 120 }}>
              <p
                sx={{
                  fontSize: 1,
                  fontWeight: 300,
                  color: "altText",
                  m: 0,
                  mt: "auto",
                  mr: 5,
                }}
              >
                0{i + 1}
              </p>
              <Box sx={{ borderRadius: 5, overflow: "hidden" }}>
                <Image src={album.imageUrl} width={120} height={120} />
              </Box>
              <Box mt="auto" ml={4}>
                <h3 sx={{ fontSize: 2, fontWeight: "body", color: "text" }}>
                  {album.title}
                </h3>
                <p
                  sx={{ fontSize: 1, fontWeight: 300, color: "altText", m: 0 }}
                >
                  {album.artist}
                </p>
              </Box>
            </Flex>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div />
  );
}
