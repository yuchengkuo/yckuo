import { getNowPlaying } from "../../utlis/spotify";

export default async function handler(_, res) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const playback = await response.json();
  if (playback.item === null) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = playback.is_playing;
  const title = playback.item.name;
  const url = playback.item.external_urls.spotify;

  const artist = playback.item.artists
    ?.map((_artist) => _artist.name)
    .join(", ");
  const album = playback.item.album?.name;
  const albumImageUrl = playback.item.album?.images[0].url;

  const show = playback.item.show?.name;
  const showImageUrl = playback.item.show?.images[0].url;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({
    isPlaying,
    title,
    url,
    artist,
    album,
    albumImageUrl,
    show,
    showImageUrl,
  });
}
