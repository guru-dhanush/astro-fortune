import ServiceItem from "./ServiceItem";
import { SERVICES } from "./services.data";

const ServicesList = () => {
  return (
    <section>
      {SERVICES.map((service, idx) => (
        <ServiceItem key={idx} {...service} />
      ))}
    </section>
  );
};

export default ServicesList;
