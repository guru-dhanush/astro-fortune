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
    text: "Katyaini’s guidance brought clarity and peace during a difficult phase. Her readings were accurate, practical, and easy to understand.",
    name: "Siddharth Rao",
    role: "Business Analyst",
  },

  {
    text: "The reading was surprisingly precise and gave me a lot of emotional clarity. I left the session feeling lighter and more focused.",
    name: "Neha Kapoor",
    role: "Marketing Strategist",
  },

  {
    text: "I was unsure at first, but the session exceeded my expectations. It helped me make sense of a confusing situation.",
    name: "Pooja Nair",
    role: "HR Consultant",
  },
  {
    text: "Very intuitive and calming experience. The insights were relevant and easy to apply in daily life.",
    name: "Arjun Malhotra",
    role: "Startup Founder",
  },
  {
    text: "The session gave me a fresh perspective and renewed confidence. I appreciated the honesty and clarity.",
    name: "Kavita Iyer",
    role: "Content Writer",
  },
  {
    text: "Thoughtful guidance and accurate observations. It felt like a meaningful conversation rather than a generic reading.",
    name: "Amit Choudhary",
    role: "Operations Manager",
  },
];

const Testimonials = () => {
  const [api, setApi] = React.useState<any>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Track active (center) slide
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect(); // initial
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="mt-4 pb-20 text-center">
      <Badge variant="secondary" className="mb-4">
        Testimonials
      </Badge>

      <h2 className="font-bold text-2xl lg:text-4xl mb-6 lg:mb-8 text-primary">
        Don’t Take your Words for Us
      </h2>

      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className=""
      >
        <CarouselContent>
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <CarouselItem key={index} className="basis-2/3">
                <Card
                  className={cn(
                    "rounded-3xl transition-all duration-500 ease-out h-full ",
                    isActive
                      ? "scale-100 bg-primary text-primary-foreground shadow-2xl"
                      : "scale-90 bg-primary/60 text-primary-foreground/70 opacity-70",
                  )}
                >
                  <CardContent className="flex flex-col justify-between h-full text-center ">
                    <div>
                      {/* Quote icon */}
                      <Image
                        src="/home/testimonials-icon.svg"
                        alt="quote"
                        width={32}
                        height={32}
                        className="opacity-80"
                      />

                      {/* Testimonial text */}
                      <div className="flex justify-center">
                        <p className="leading-7 mb-8 max-w-120 text-md md:text-xl lg:text-2xl text-white">
                          {item.text}
                        </p>
                      </div>

                      {/* Author */}
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm opacity-70">{item.role}</p>
                      </div>
                    </div>
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
