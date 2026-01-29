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
    <section className="w-full py-10">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold">
          {FUTURE_CTA.title}
        </h2>

        {/* Description */}
        <p className="text-base md:text-md max-w-2xl mx-auto">
          {FUTURE_CTA.description}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg">{FUTURE_CTA.primaryCta}</Button>
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
