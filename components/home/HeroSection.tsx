import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center pt-45">
      <div className="absolute top-10 z-0 animate-[spin_30s_linear_infinite]">
        <Image
          src="/chakra.svg"
          alt="chakra"
          width={500}
          height={500}
          priority
          className="opacity-50"
        />
      </div>
      <div className="relative bg-background text-center pb-20">
        <h1
          className="
    relative text-center font-bold text-[72px] leading-[110%]

    before:content-['']
    before:absolute
    before:-left-16
    before:top-10
    before:-translate-y-1/2
    before:w-10
    before:h-10
    before:bg-[url('/star.svg')]
    before:bg-no-repeat
    before:bg-contain
    before:opacity-70

    after:content-['']
    after:absolute
    after:-right-16
    after:top-10
    after:-translate-y-1/2
    after:w-10
    after:h-10
    after:bg-[url('/star.svg')]
    after:bg-no-repeat
    after:bg-contain
    after:opacity-70
  "
        >
          World&apos;s Most Accurate <br />
          Astrology Engine.
        </h1>

        <p className="ext-[16px] text-center mb-6 max-w-2xl">
          Unravel the mysteries of life-journeys. Receive personalized and
          real-time guidance for your life questions, detailed reports on
          complex situations, and much more.
        </p>

        <div className="flex gap-3 bg-background justify-center">
          <Button size="lg">Book a Session</Button>
          <Link href="/services">
            <Button size="lg" variant="outline">
              Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
