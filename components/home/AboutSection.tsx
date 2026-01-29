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
  // {
  //   icon: "/home/feature-highlights/feature-ethics.svg",
  //   title: "Ethical, Confidential & Non-Fear Based",
  // },
  // {
  //   icon: "/home/feature-highlights/feature-precision.svg",
  //   title: "Precision Meets Practical Guidance",
  // },
];

const AboutSection = ({ showbadge = true }: { showbadge?: boolean }) => {
  return (
    <section className="flex flex-col justify-center items-center py-10">
      {showbadge ? (
        <Badge variant="secondary" className="mb-4">
          About
        </Badge>
      ) : null}
      <h2 className="font-bold text-4xl text-primary">Meet Katyaini</h2>
      <div className="flex justify-between m-10">
        <Image
          src="/home/kyataini-photo.svg"
          alt="kataini"
          width={350}
          height={350}
        />
        <div className="w-100 mx-5">
          <p>
            My journey bridges two worlds — the intellectual and the mystical. I
            discovered the esoteric at 11 and trained in Vedic astrology at 21,
            eventually earning gold medals in astrology. Even as I completed my
            education at University of Warwick, LSE, and later my MBA in New
            York City, I never stepped away from the stars.
            <br />
            <br />
            With over 1,500 birth charts studied across continents, I founded
            Astrofortune to offer astrology that is intelligent, accurate, and
            practical. My work blends spiritual depth with clarity and
            timing—helping people align their lives with purpose and momentum.
            <br />
            <br />
            If you're ready to move with purpose and divine timing, you’re
            exactly where you’re meant to be.
          </p>
          <div className="flex gap-2 mt-5">
            <Button size="lg">Book a Session</Button>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-24 gap-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-[220px] flex flex-col items-center text-center"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={100}
              height={100}
            />
            <span className="mt-3">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
