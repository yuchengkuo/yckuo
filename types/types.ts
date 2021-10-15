export type Frontmatter = {
  type: string;
  title: string;
  subtitle: string;
  published: boolean;
  info: {
    title: string;
    content: string[];
  }[];
  slug: string;
  readingTime?: { text: string; minutes: number; time: number; words: number };
  ids: { id: string; title: string }[];
};

export type NowPlaying = {
  isPlaying: boolean;
  title: string;
  url: string;
  artist: string;
  album: string;
  show: string;
};

export type Albums = {
  title: string;
  artist: string;
  playcount: number;
  image: string;
  spotifyUrl: string;
  imageUrl: string;
};

export type Tracks = {
  title: string;
  artists: string;
  songUrl: string;
};
