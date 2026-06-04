"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type BlogHeaderProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const BlogHeader = ({ query, onQueryChange }: BlogHeaderProps) => {
  return (
    <section className="text-center py-20 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Get answers to your problems
      </Badge>

      <h1 className="text-5xl font-bold text-primary mb-6">
        Latest Cosmic Writings
      </h1>

      <p className="text-muted-foreground max-w-xl mx-auto mb-10">
        I share predictions, remedies, and deeper understandings of how
        planetary energies shape our lives.
      </p>

      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="max-w-md mx-auto h-10"
      />
    </section>
  );
};

export default BlogHeader;
