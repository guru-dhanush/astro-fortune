export type LatestPostType = {
  title: string;
  subtitle: string;
  cta: string;
  posts: {
    category: string;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
  }[];
};
