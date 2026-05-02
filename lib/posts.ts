import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

/**
 * Reads all markdown files and returns sorted post metadata (newest first).
 */
export function getSortedPostsData(): PostMeta[] {
  // Ensure the directory exists to avoid build errors
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "General",
      author: data.author ?? "Katyaini",
      image: data.image ?? "/blog/default.jpg",
    };
  });

  // Sort posts by date, descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns all slugs — used for generateStaticParams.
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Gets a single post's data including rendered HTML content.
 * Returns null if the post doesn't exist.
 */
export async function getPostData(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML with syntax highlighting
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)         // enables tables, strikethrough, task lists, etc.
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    author: data.author ?? "Katyaini",
    image: data.image ?? "/blog/default.jpg",
  };
}
