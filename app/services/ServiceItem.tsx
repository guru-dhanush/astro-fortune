import { Button } from "@/components/ui/button";

type ServiceItemProps = {
  title: string;
  description: string[];
  image: string;
  reverse?: boolean;
};

const ServiceItem = ({
  title,
  description,
  image,
  reverse,
}: ServiceItemProps) => {
  return (
    <section className="my-3 p-3">
      <div
        className={`max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div className={reverse ? "lg:order-2" : ""}>
          <img src={image} alt={title} className="rounded-2xl w-full h-70" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-primary">{title}</h2>

          {description.map((text, idx) => (
            <p
              key={idx}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {text}
            </p>
          ))}

          <Button size="lg">Book Now</Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceItem;
