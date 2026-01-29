const BlogPagination = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 flex justify-between items-center text-sm">
      <p className="text-muted-foreground">Page 1 of 10</p>

      <div className="flex gap-4">
        <button className="border border-border rounded-lg px-4 py-2">
          Previous
        </button>
        <button className="border border-border rounded-lg px-4 py-2">
          Next
        </button>
      </div>
    </section>
  );
};

export default BlogPagination;
