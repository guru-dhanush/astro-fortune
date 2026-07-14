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
        Spiritual Wisdom & Guidance
      </Badge>

      <h2 className="text-4xl font-bold text-heading mb-6">
        Spiritual Insights for Personal Growth and <br />
        Self Discovery
      </h2>

      <p className="text-subheading max-w-xl mx-auto mb-10">
        Explore astrology, numerology, tarot, compatibility, and spiritual
        wisdom to gain clarity, confidence, and deeper understanding in every
        area of life. Spiritual Wisdom & Guidance
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
