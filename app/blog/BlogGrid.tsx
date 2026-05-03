
import BlogCard from "./BlogCard";
import React from "react";
import type { PostMeta } from "@/lib/posts";
import NewsLetterCard from "./NewsLetterCard";

type BlogGridProps = {
  posts: PostMeta[];
};


const BlogGrid = ({ posts }: BlogGridProps) => {
  if (posts.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 text-center text-muted-foreground">
        <p className="text-lg font-medium">No posts match your search or filter criteria.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post, idx) => (
        <React.Fragment key={post.slug}>
          <BlogCard
            slug={post.slug}
            category={post.category}
            title={post.title}
            description={post.excerpt}
            image={post.image}
            author={post.author}
            date={post.date}
          />

          {/* Insert newsletter after 3rd post */}
          {idx === 2 && <NewsLetterCard />}
        </React.Fragment>
      ))}
    </section>
  );
};

export default BlogGrid;
