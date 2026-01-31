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
    <section>
      <div
        className={`max-w-5xl mx-auto px-6 py-10 border-b-2 
        grid grid-cols-1 lg:grid-cols-2 gap-12 
        place-items-center`}
      >
        {/* Image */}
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          <img
            src={image}
            alt={title}
            className="rounded-2xl w-full max-w-md object-cover"
          />
        </div>

        {/* Content */}
        <div
          className={`space-y-4 text-center lg:text-left ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <h2 className="text-2xl text-primary">{title}</h2>

          {description.map((text, idx) => (
            <p
              key={idx}
              className="text-sm text-muted-foreground max-w-md mx-auto lg:mx-0"
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
