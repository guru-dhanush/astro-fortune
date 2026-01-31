import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const BlogHeader = () => {
  return (
    <section className="text-center py-20 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Get answers to your problems
      </Badge>

      <h2 className="text-5xl font-serif text-primary mb-6">
        Latest Cosmic Writings
      </h2>

      <p className="text-muted-foreground max-w-xl mx-auto mb-10">
        I share predictions, remedies, and deeper understandings of how
        planetary energies shape our lives.
      </p>

      <Input
        type="text"
        placeholder="Search"
        className="max-w-md mx-auto h-10"
      />
    </section>
  );
};

export default BlogHeader;
