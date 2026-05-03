"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import BlogFilters from "./BlogFilters";
import BlogGrid from "./BlogGrid";
import BlogHeader from "./BlogHeader";
import BlogPagination from "./BlogPagination";

type BlogPageClientProps = {
  posts: PostMeta[];
};

const BlogPageClient = ({ posts }: BlogPageClientProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...posts]
      .filter((post) => {
        const matchesCategory =
          category === "all" || post.category.toLowerCase() === category;

        const matchesSearch =
          normalizedQuery.length === 0 ||
          [post.title, post.excerpt, post.category, post.author]
            .some((field) => field.toLowerCase().includes(normalizedQuery));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();

        return sort === "oldest" ? aTime - bTime : bTime - aTime;
      });
  }, [posts, category, query, sort]);

  return (
    <>
      <BlogHeader query={query} onQueryChange={setQuery} />
      <BlogFilters
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />
      <BlogGrid posts={filteredPosts} />
      <BlogPagination />
    </>
  );
};

export default BlogPageClient;
