import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const ServicesSection = () => {
  const services = [
    {
      title: "Service name",
      description:
        "Offers personalized spiritual remedies to harmonize planets and reduce life obstacles.",
      subtext: "This is the info of the service.",
      image: "/service/service.png",
    },
    {
      title: "Service name",
      description:
        "Offers personalized spiritual remedies to harmonize planets and reduce life obstacles.",
      subtext: "This is the info of the service.",
      image: "/service/service.png",
    },
    {
      title: "Service name",
      description:
        "Offers personalized spiritual remedies to harmonize planets and reduce life obstacles.",
      subtext: "This is the info of the service.",
      image: "/service/service.png",
    },
    {
      title: "Service name",
      description:
        "Offers personalized spiritual remedies to harmonize planets and reduce life obstacles.",
      subtext: "This is the info of the service.",
      image: "/service/service.png",
    },
    {
      title: "Service name",
      description:
        "Offers personalized spiritual remedies to harmonize planets and reduce life obstacles.",
      subtext: "This is the info of the service.",
      image: "/service/service.png",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center py-10">
      <Badge variant="secondary" className="mb-4">
        Get answers to your problems
      </Badge>
      <h2 className="font-bold text-4xl text-primary flex text-center">
        Discover effective solutions to the most <br />
        challenging problems in your life
      </h2>

      <div className="flex gap-2 my-5">
        <Button size="lg">Book a Session</Button>
        <Link href="/services">
          <Button size="lg" variant="outline">
            Our Services
          </Button>
        </Link>
      </div>
      <section className="px-4 py-12 w-full max-w-6xl">
        <div className="grid-container">
          {services.map((service, index) => (
            <div
              key={index}
              style={{ gridArea: `box-${index}` }}
              className="bg-[#f7f2ee] rounded-2xl overflow-hidden flex flex-col"
            >
              <img
                src="/home/service/service.png"
                alt={service.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6 flex flex-col flex-1 text-[#6a5c52]">
                <h3 className="font-serif text-lg mb-2 text-center">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed mb-2">
                  {service.description}
                </p>

                <p className="text-xs opacity-70">{service.subtext}</p>

                <a
                  href="#"
                  className="mt-auto text-xs lowercase text-[#9c8a7a] self-end hover:underline"
                >
                  learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ServicesSection;
