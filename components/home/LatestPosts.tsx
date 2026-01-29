import BlogCard from "@/app/blog/BlogCard";
import { Button } from "../ui/button";
import { LATEST_POSTS } from "@/lib/constant";
import Link from "next/link";

const LatestPosts = () => {
  return (
    <section className="w-full py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-start mb-12">
        <div>
          <h2 className="text-4xl font-semibold">{LATEST_POSTS.title}</h2>
          <p className="mt-2 text-sm max-w-lg">{LATEST_POSTS.subtitle}</p>
        </div>
        <Link href="/blog">
          <Button size="lg">{LATEST_POSTS.cta}</Button>
        </Link>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {LATEST_POSTS.posts.map((post, idx) => (
          <BlogCard
            key={idx}
            category={post.category}
            title={post.title}
            description={post.description}
            image={post.image}
            author={post.author}
            date={post.date}
            compact
          />
        ))}
      </div>

      {/* Slider arrows (UI only for now) */}
      <div className="flex justify-end gap-4 max-w-7xl mx-auto px-6 mt-10">
        <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
          ←
        </button>
        <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
          →
        </button>
      </div>
    </section>
  );
};

export default LatestPosts;
