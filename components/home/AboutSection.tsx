import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

const features: Record<string, string>[] = [
  {
    icon: "/home/feature-highlights/feature-trusted.svg",
    title: "Trusted by thousands of Clients",
  },
  {
    icon: "/home/feature-highlights/feature-experience.svg",
    title: "Years of Experience",
  },
  {
    icon: "/home/feature-highlights/feature-gold-medalist.svg",
    title: "Gold Medalist in Astrology",
  },
  {
    icon: "/home/feature-highlights/feature-ethics.svg",
    title: "Ethical, Confidential & Non-Fear Based",
  },
  {
    icon: "/home/feature-highlights/feature-precision.svg",
    title: "Precision Meets Practical Guidance",
  },
];

const AboutSection = ({ showbadge = true }: { showbadge?: boolean }) => {
  return (
    <section className="flex flex-col justify-center items-center p-2 py-10 md:p-10 ">
      {showbadge ? (
        <Badge variant="secondary" className="mb-4">
          About
        </Badge>
      ) : null}
      <h2 className="font-bold text-2xl lg:text-4xl mb-6 lg:mb-8 text-primary">
        Meet Katyaini
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-center border border-primary  rounded-4xl mx-5 p-2">
        <img
          src="/katyaini-photo.svg"
          alt="katyaini"
          className="w-full border border-primary rounded-3xl"
        />
        <div className="max-w-80 my-2 lg:ml-5 lg:my-0">
          <p className="text-base leading-6 text-muted-foreground">
            My journey bridges two worlds — the intellectual and the mystical. I
            discovered the esoteric at 11 and trained in Vedic astrology at 21,
            eventually earning gold medals in astrology. Even as I completed my
            education at University of Warwick, LSE, and later my MBA in New
            York City, I never stepped away from the stars.
            <br />
            <br />
            With over 1,500 birth charts studied across continents, I founded
            Astrofortune to offer astrology that is intelligent, accurate, and
            practical. My work blends spiritual depth with clarity and timing—
            helping people align their lives with purpose and momentum.
            <br />
            <br />
            If you're ready to move with purpose and divine timing, you’re
            exactly where you’re meant to be.
          </p>
          {/* <div className="flex gap-2  justify-center lg:justify-start mt-5 ">
            <Button size="lg">Book a Session</Button>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Our Services
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 mt-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-55 flex flex-col items-center text-center my-5"
          >
            <div className="w-45">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-auto"
              />
            </div>

            <span className="mt-3 text-sm">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
