import { Badge } from "../ui/badge";
import AboutStats from "./AboutStats";

const AboutSection = ({
  showbadge = true,
  showStats,
}: {
  showbadge?: boolean;
  showStats?: boolean;
}) => {
  return (
    <section className="flex flex-col justify-center items-center p-2 py-10 md:p-10 ">
      {showbadge ? (
        <Badge variant="secondary" className="mb-4">
          About
        </Badge>
      ) : null}
      <h1 className="text-5xl font-serif text-primary mb-6">
        {/* Unlock clarity through astrological insight */}
        Meet Katyani
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 rounded-4xl mx-5 p-2">
        <img
          src="/katyaini-photo.svg"
          alt="katyaini"
          className="w-full lg:w-auto lg:max-w-sm rounded-3xl shrink-0"
        />
        <div className="max-w-2xl">
          <p className="text-base leading-7 text-muted-foreground indent-4">
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
          {showStats ? <AboutStats /> : null}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
