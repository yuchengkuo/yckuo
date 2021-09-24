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
