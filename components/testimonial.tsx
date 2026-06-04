"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "It was a great and comforting session with Katyani @Astrofortune. I must say her predictions were so accurate for my past, present, and future. It was a healing session as well, and she guided me with some remedies for a smooth life ahead.",
    name: "Arti Ahuja",
  },
  {
    text: "Katyani listens with great patience and connects the dots in a way that feels both practical and comforting. Her guidance is rooted in real-life understanding. She does not believe in creating unnecessary drama and gives genuine insights. She explains things with such clarity that even complex issues start to feel manageable. Thank you for an insightful session.",
    name: "Surbhi Gupta",
  },
  {
    text: "I had such a lovely experience with Katyani. She has a very comforting presence and makes you feel at ease right away. What I really appreciate is how precise and logical she is. Unlike many astrologers, she does not just make vague statements—she explains everything clearly through the charts, and it all makes perfect sense. She is also very straightforward and honest, which I truly value. Everything she has said so far has been incredibly accurate, and I genuinely feel I can trust her guidance. I came away feeling lighter, clearer, and reassured after our consultation.",
    name: "Neha Singh",
  },
  {
    text: "Really liked my session with her! She's super easy to talk to, and her readings felt spot on. She gave me a lot of clarity and peace of mind. Totally recommend her if you're into astrology or just need some good guidance.",
    name: "Megha Ruia",
  },
  {
    text: "I'm generally cautious about astrologers since it's difficult to gauge their depth of knowledge, and inaccurate advice can be unsettling. However, Katyani was truly exceptional—her predictions were accurate, and her insights into the past were remarkably precise. I highly recommend her.",
    name: "Shweta Shah",
  },
];

const Testimonials = () => {
  const [api, setApi] = React.useState<any>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section className="mt-4 pb-20 text-center">
      <Badge variant="secondary" className="mb-4">
        Testimonials
      </Badge>

      <h1 className="text-5xl font-bold text-primary lg:text-4xl mb-6 lg:mb-8">
        Don't Take your Words for Us
      </h1>

      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent>
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <CarouselItem key={index} className="basis-2/3">
                <Card
                  className={cn(
                    "rounded-3xl transition-all duration-500 ease-out h-full",
                    isActive
                      ? "scale-100 bg-primary text-primary-foreground shadow-2xl"
                      : "scale-90 bg-primary/60 text-primary-foreground/70 opacity-70",
                  )}
                >
                  <CardContent className="flex flex-col text-center p-6 md:p-8">
                    <Image
                      src="/home/testimonials-icon.svg"
                      alt="quote"
                      width={32}
                      height={32}
                      className="opacity-80"
                    />

                    <p
                      className="mt-4 mb-6 leading-7 text-sm md:text-base lg:text-lg text-white"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 7,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.text}
                    </p>

                    <p className="mt-auto font-semibold">{item.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          size="icon-lg"
          variant="default"
          className="top-[calc(100%+2.5rem)] left-1/2 -translate-x-full border-0 w-10 h-10"
        />
        <CarouselNext
          size="icon-lg"
          variant="default"
          className="top-[calc(100%+2.5rem)] left-1/2 translate-x-4 border-0 w-10 h-10"
        />
      </Carousel>
    </section>
  );
};

export default Testimonials;