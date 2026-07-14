import { Badge } from "../ui/badge";
import AboutStats from "./AboutStats";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutSection = ({
  showbadge = true,
  showStats,
  showButton,
}: {
  showbadge?: boolean;
  showStats?: boolean;
  showButton?: boolean;
}) => {
  return (
    <section className="flex flex-col justify-center items-center p-2 py-10 md:p-10 ">
      {showbadge ? (
        <Badge variant="secondary" className="mb-4">
          About
        </Badge>
      ) : null}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 rounded-4xl mx-5 p-2">
        <img
          src="/katyani-photo.svg"
          alt="Katyani"
          className="w-full lg:w-auto lg:max-w-sm rounded-3xl shrink-0"
        />
        <div className="max-w-2xl flex flex-col">
          <h2 className="text-4xl font-bold text-heading mb-6 text-center leading-[1.1]">
            Meet Katyani
          </h2>
          <p className="text-base leading-7 text-subheading indent-4">
            My journey bridges two worlds — the intellectual and the mystical. I
            discovered the esoteric at 11 and trained in Vedic astrology at 21,
            eventually earning gold medals in astrology. Even as I completed my
            education at University of Warwick, London School of Economics and
            Political Science, and later my MBA in New York City, I never
            stepped away from the stars.
            <br />
            <br />
            With thousands of birth charts studied across continents, I founded
            Astrofortune to offer astrology that is intelligent, accurate, and
            practical. My work blends spiritual depth with clarity and timing—
            helping people align their lives with purpose and momentum.
            <br />
            <br />
            If you&apos;re ready to move with purpose and divine timing,
            you&apos;re exactly where you&apos;re meant to be.
          </p>
          {showButton ? (
            <Link href="/booking" className="mt-10 self-center">
              <Button
                size="lg"
                className="text-base flex flex-row items-center justify-center gap-2"
              >
                Book a Consultation
              </Button>
            </Link>
          ) : null}
          {showStats ? <AboutStats /> : null}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
