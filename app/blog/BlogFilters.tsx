"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BlogFiltersProps = {
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
};

const CATEGORIES = [
  { label: "View all", value: "all" },
  { label: "Numerology", value: "numerology" },
  { label: "Astrology", value: "astrology" },
  { label: "Tarot", value: "tarot" },
  { label: "Compatibility", value: "compatibility" },
];

const SORT_OPTIONS = [
  { label: "Most recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
];

const BlogFilters = ({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: BlogFiltersProps) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Categories (Tabs) */}
      <Tabs
        value={category}
        onValueChange={onCategoryChange}
        orientation="horizontal"
        className="border-b w-full"
      >
        <TabsList variant="line">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Sort (Select) */}
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};

export default BlogFilters;
