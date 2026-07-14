import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center lg:pt-45 md:pt-35 pt-25 pb-15">
      <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 z-0 w-[50vw] max-w-112.5 aspect-square animate-[spin_30s_linear_infinite] opacity-30">
        <Image
          src="/chakra.svg"
          alt="chakra"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative bg-background text-center pb-10">
        <h2
          className="
    relative mx-auto
    max-w-[90vw] sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl
    text-4xl font-bold text-heading mb-6
    text-[clamp(2.25rem,5vw,4.5rem)]
    leading-[110%] mt-5

    before:content-['']
    before:absolute
    before:hidden sm:before:block
    before:left-0 sm:before:-left-10 lg:before:-left-20

    before:top-1/2
    before:-translate-y-1/2
    before:w-8 lg:before:w-10
    before:h-8 lg:before:h-10
    before:bg-[url('/star.svg')]
    before:bg-no-repeat
    before:bg-contain
    before:opacity-70

    after:content-['']
    after:absolute
    after:hidden sm:after:block
    after:right-0 sm:after:-right-10 lg:after:-right-20    after:top-1/2
    after:-translate-y-1/2
    after:w-8 lg:after:w-10
    after:h-8 lg:after:h-10
    after:bg-[url('/star.svg')]
    after:bg-no-repeat
    after:bg-contain
    after:opacity-70
  "
        >
          Trusted Vedic Astrology Guidance for Life&apos;s Most Important
          Decisions
        </h2>

        <p className="text-sm m-3  mx-auto mb-6 max-w-[90vw] sm:max-w-xl md:max-w-2xl text-center text-subheading">
          Gain deep insights into your career, relationships, finances, marriage
          and life purpose through personalized Vedic astrology consultations
          and detailed birthchart analysis
        </p>

        <div className="flex gap-3 bg-background justify-center">
          <Link href="/booking">
            <Button size="lg">Book a Consultation</Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
      {/* <img src="hero-image.png" className="hidden md:block" /> */}
      <img src="hero-image.png" className="" alt="astro" />
      {/* Left icon */}
      <img
        src="/home/left-icon.svg"
        className="pointer-events-none absolute top-25  left-0 md:left-2 min-w-10 w-[8vw] max-w-15 opacity-80 sm:block"
      />

      {/* Right icon */}
      <img
        src="/home/right-icon.svg"
        className="pointer-events-none absolute top-25 right-0 md:right-2 min-w-10 w-[8vw] max-w-15 opacity-80 sm:block"
      />

      {/* Center icon */}
      <img
        src="/home/center-icon.svg"
        className="pointer-events-none absolute top-32.5 left-1/2 -translate-x-1/2 w-[6vw] max-w-12.5 opacity-80 hidden sm:block"
      />
    </section>
  );
};

export default HeroSection;
