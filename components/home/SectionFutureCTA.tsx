import Link from "next/link";
import { Button } from "../ui/button";

const FUTURE_CTA = {
  title: "Trusted Vedic Astrology Guidance for Life’s Most Important Decisions",
  description:
    "Personalized birth chart analysis and Vedic astrology guidance for love, career, marriage, finances and life purpose.",
  primaryCta: "Book a Consultation",
  secondaryCta: "Explore Services",
};

const SectionFutureCTA = () => {
  return (
    <section className="w-full p-2 py-10 md:p-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-primary mb-6">
          {FUTURE_CTA.title}
        </h2>

        {/* Description */}
        <p className="text-sm m-3  mx-auto mb-6 max-w-[100vw] sm:max-w-xl md:max-w-2xl text-center text-muted-foreground">
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
