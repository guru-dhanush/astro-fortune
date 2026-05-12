import Link from "next/link";
import { Button } from "../ui/button";

const FUTURE_CTA = {
  title: "Gaze into Your Future",
  description:
    "Consult the cards and unlock the secrets of your destiny. Our gifted psychics await.",
  primaryCta: "Book a session",
  secondaryCta: "our services",
};

const SectionFutureCTA = () => {
  return (
    <section className="w-full p-2 py-10 md:p-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-semibold">
          {FUTURE_CTA.title}
        </h1>

        {/* Description */}
        <p className="text-sm m-3  mx-auto mb-6 max-w-[90vw] sm:max-w-xl md:max-w-2xl text-center text-muted-foreground">
          {FUTURE_CTA.description}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/booking">
            <Button size="lg">{FUTURE_CTA.primaryCta}</Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline">
              {FUTURE_CTA.secondaryCta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionFutureCTA;
