import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/testimonial";
import LatestPosts from "@/components/home/LatestPosts";
import Link from "next/link";
import NewsLetterCard from "../NewsLetterCard";

// Import highlight.js theme — GitHub Dark is a great default
import "highlight.js/styles/github-dark.css";
import SectionFutureCTA from "@/components/home/SectionFutureCTA";

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
      <div className="max-w-7xl mx-auto px-6 py-12 text-center flex flex-col items-center">
        <span
          className="inline-block px-3 py-1 rounded-full mb-3"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
          }}
        >
          {post.category}
        </span>
        <h1
          className="mb-3"
          style={{
            fontFamily: "Times New Roman, serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "110%",
            letterSpacing: "0%",
          }}
        >
          {post.title}
        </h1>
        <h2
          className="mb-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: "0%",
          }}
        >
          {post.excerpt}
        </h2>
        <div className="relative w-full max-w-[1280px] h-[560px] overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Article */}
        <article className="lg:col-span-8">
          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
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

        {/* Sidebar */}
        <aside className="lg:col-span-4 top-24 self-start">
          <NewsLetterCard />
        </aside>
      </div>
      <LatestPosts />
      <Testimonials />
      <SectionFutureCTA />
      <Footer />
    </main>
  );
}
