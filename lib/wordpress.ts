const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL?.replace(/\/+$/, "") ?? "https://public-api.wordpress.com/wp/v2/sites/rajeev831.wordpress.com";
const WP_REVALIDATE = 60;

export type WordPressRendered = {
  rendered: string;
};

export type WordPressPost = {
  slug: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  date: string;
  categories: number[];
  jetpack_featured_media_url?: string;
  author?: { name?: string } | string | number;
};

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  categories: number[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

const fetchWP = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${WP_BASE_URL}${path}`, {
    next: { revalidate: WP_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(
      `WordPress API request failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
};

export async function getCategories(): Promise<WordPressCategory[]> {
  return fetchWP<WordPressCategory[]>("/categories?per_page=100");
}

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "").trim();

const normalizePost = (
  post: WordPressPost,
  categoryMap: Record<number, string>,
): Post => {
  const categories = post.categories ?? [];
  const categoryNames = categories
    .map((categoryId) => categoryMap[categoryId])
    .filter(Boolean);

  const author =
    typeof post.author === "object"
      ? (post.author?.name ?? "Katyani")
      : typeof post.author === "string"
        ? post.author
        : "Katyani";

  const featuredImage = post.jetpack_featured_media_url?.trim();

  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered ?? ""),
    date: post.date,
    excerpt: stripHtml(post.excerpt?.rendered ?? ""),
    category: categoryNames.length > 0 ? categoryNames.join(", ") : "General",
    author,
    image:
      featuredImage && featuredImage.length > 0
        ? featuredImage
        : "/astrologo.png",
    categories,
    contentHtml: post.content?.rendered ?? "",
  };
};

export async function getAllPosts(
  page = 1,
  perPage = 100,
): Promise<PostMeta[]> {
  const [posts, categories] = await Promise.all([
    fetchWP<WordPressPost[]>(`/posts?per_page=${perPage}&page=${page}`),
    getCategories(),
  ]);

  const categoryMap = Object.fromEntries(
    categories.map((category) => [category.id, category.name]),
  );

  return posts
    .map((post) => normalizePost(post, categoryMap))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const [posts, categories] = await Promise.all([
    fetchWP<WordPressPost[]>(`/posts?slug=${slug}`),
    getCategories(),
  ]);

  const post = posts?.[0] ?? null;
  if (!post) {
    return null;
  }

  const categoryMap = Object.fromEntries(
    categories.map((category) => [category.id, category.name]),
  );

  return normalizePost(post, categoryMap);
}
