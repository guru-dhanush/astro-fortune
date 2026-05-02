import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Import highlight.js theme — GitHub Dark is a great default
import "highlight.js/styles/github-dark.css";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * generateStaticParams — tells Next.js which slugs to pre-render at build time.
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * generateMetadata — injects per-post SEO meta tags.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: "Post Not Found | Astrofortune" };
  }

  return {
    title: `${post.title} | Astrofortune Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

/**
 * The statically generated blog post page.
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="w-full bg-white">
      <Header />

      {/* Hero Banner */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Author & Date */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img src="/kyataini.svg" alt={post.author} className="w-full h-full" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{post.author}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>

        {/* Markdown Content */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7d6352] hover:text-[#5c4a3d] transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
