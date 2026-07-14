import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="w-full">
      <Header />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-7xl font-bold text-heading mb-4">404</p>
        <h2 className="text-2xl font-semibold text-heading mb-3">
          Blog Post Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
      <Footer />
    </main>
  );
}
