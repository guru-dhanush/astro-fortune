import { Badge } from "@/components/ui/badge";

const ServicesHeader = () => {
  return (
    <section className="text-center pt-24 pb-10 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Services
      </Badge>

      <h1 className="text-5xl font-serif text-primary mb-6">
        Discover effective solutions to the most challenging problems in your
        life
      </h1>
    </section>
  );
};

export default ServicesHeader;
