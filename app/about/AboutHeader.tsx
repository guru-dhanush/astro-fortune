import { Badge } from "@/components/ui/badge";

const AboutHeader = () => {
  return (
    <section className="text-center pt-24 pb-10 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        About
      </Badge>

      <h2 className="text-5xl font-serif text-primary mb-6">
        Unlock clarity through astrological insight
      </h2>

      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Personalized guidance to help you decide better, act at the right time,
        and move forward with confidence.
      </p>
    </section>
  );
};

export default AboutHeader;
