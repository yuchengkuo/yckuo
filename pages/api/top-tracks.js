import { getTopTracks } from "utils/spotify";

export default async function handler(_, res) {
  const response = await getTopTracks();

  const { items } = await response.json();

  const tracks = items.slice(0, 5).map((track) => ({
    artists: track.artists.map((artist) => artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    imageUrl: track.album.images[0].url,
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({
    tracks,
  });
}
