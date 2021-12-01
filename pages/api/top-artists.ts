import { getTopArtists } from '@utils/spotify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getTopArtists();
  const { items } = await response.json();
  const artists = items.slice(0, 5).map((item) => ({
    name: item.name,
    genres: item.genres.slice(0, 2).join(', '),
    external_urls: item.external_urls.spotify,
  }));
  return res.status(200).json(artists);
}
