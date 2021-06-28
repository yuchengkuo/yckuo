const api_key = process.env.LASTFM_API_KEY;
const username = process.env.LASTFM_USERNAME;

const TOP_ALBUMS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/`;

export const getTopAlbums = async () => {
  const method = `user.gettopalbums`;
  const period = `7day`; // overall | 7day | 1month | 3month | 6month | 12month

  const ENDPOINT = `${TOP_ALBUMS_ENDPOINT}?method=${method}&user=${username}&period=${period}&api_key=${api_key}&format=json`;

  return fetch(ENDPOINT);
};
