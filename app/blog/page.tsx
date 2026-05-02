import Header from "@/components/Header";
import BlogFilters from "./BlogFilters";
import BlogGrid from "./BlogGrid";
import BlogHeader from "./BlogHeader";
import BlogPagination from "./BlogPagination";
import Footer from "@/components/Footer";
import Testimonials from "@/components/testimonial";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Astrofortune",
  description:
    "Read our latest articles on Vedic astrology, horoscopes, planetary movements, and cosmic guidance from the Katyaini.",
};

const BlogPage = () => {
  const posts = getSortedPostsData();

  return (
    <main className="w-full">
      <Header />
      <BlogHeader />
      <BlogFilters />
      <BlogGrid posts={posts} />
      <BlogPagination />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default BlogPage;
