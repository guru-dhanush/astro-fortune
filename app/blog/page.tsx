import Header from "@/components/Header";
import BlogPageClient from "./BlogPageClient";
import Footer from "@/components/Footer";
import Testimonials from "@/components/testimonial";
import { getAllPosts, type PostMeta } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Astrofortune",
  description:
    "Read our latest articles on Vedic astrology, horoscopes, planetary movements, and cosmic guidance from the Katyani.",
};

export const revalidate = 60;

const BlogPage = async () => {
  const posts: PostMeta[] = await getAllPosts(1, 100);

  return (
    <main className="w-full">
      <Header />
      <BlogPageClient posts={posts} />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default BlogPage;
