import { getTopAlbums } from "utlis/lastfm";
import { getAlbumSearchResult } from "utlis/spotify";

export default async function handler(_, res) {
  const response = await getTopAlbums();

  const { topalbums } = await response.json();
  const items = topalbums.album;

  const albums = items.slice(0, 5).map((album) => ({
    title: album.name,
    artist: album.artist.name,
    playcount: album.playcount,
    image: album.image[2]["#text"],
    mbid: album.mbid,
    lastfmUrl: album.url,
  }));

  for (let album of albums) {
    const search = await (
      await getAlbumSearchResult(album.title, album.artist)
    ).json();
    album.spotifyUrl = search.albums.items[0].external_urls.spotify;
    album.imageUrl = search.albums.items[0].images[0].url;
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({
    albums,
  });
}