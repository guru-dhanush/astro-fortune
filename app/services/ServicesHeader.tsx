import { Badge } from "@/components/ui/badge";

const ServicesHeader = () => {
  return (
    <section className="text-center pt-24 pb-10 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Services
      </Badge>

      <h2 className="text-4xl font-bold text-heading mb-6">
        Personalized Vedic astrology readings to help you navigate life&apos;s
        most important decisions
      </h2>
    </section>
  );
};

export default ServicesHeader;
