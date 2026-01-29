import Header from "@/components/Header";
import BlogFilters from "./BlogFilters";
import BlogGrid from "./BlogGrid";
import BlogHeader from "./BlogHeader";
import BlogPagination from "./BlogPagination";
import Footer from "@/components/Footer";
import Testimonials from "@/components/testimonial";

const BlogPage = () => {
  return (
    <main className="w-full">
      <Header />
      <BlogHeader />
      <BlogFilters />
      <BlogGrid />
      <BlogPagination />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default BlogPage;
