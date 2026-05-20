import React from "react";
import BlogCard from "@/app/blog/BlogCard";
import { LATEST_POSTS } from "@/lib/constant";
import { getAllPosts, type PostMeta } from "@/lib/wordpress";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LatestPosts = async () => {
  const posts: PostMeta[] = await getAllPosts(1, 6);

  return (
    <section className="w-full mt-10 mb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-start my-10">
        <div>
          <h2 className="text-3xl font-semibold">{LATEST_POSTS.title}</h2>
          <p className="mt-2 text-sm max-w-lg text-muted-foreground">
            {LATEST_POSTS.subtitle}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem
                key={post.slug}
                className="
                  basis-full
                  sm:basis-1/2
                  lg:basis-1/4
                "
              >
                <BlogCard
                  slug={post.slug}
                  category={post.category}
                  title={post.title}
                  description={post.excerpt}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                  compact
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <CarouselPrevious
            size="icon-lg"
            variant="default"
            className="top-[calc(100%+2.5rem)] right-10  lg:right-14 left-auto border-0 w-8 h-8 lg:w-10 lg:h-10  bg-gray-300"
          />

          <CarouselNext
            size="icon-lg"
            variant="default"
            className="top-[calc(100%+2.5rem)] right-0 left-auto border-0 w-8 h-8 lg:w-10 lg:h-10  bg-gray-300"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default LatestPosts;
