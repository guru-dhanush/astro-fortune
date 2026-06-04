import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { SERVICES } from "@/app/services/services.data";

const ServicesSection = () => {
  return (
    <section className="flex flex-col justify-center items-center p-2 py-10 md:p-10">
      <Badge variant="secondary" className="mb-4">
        Get answers to your problems
      </Badge>
      <h2 className="text-4xl font-bold text-primary mb-6 text-center">
        Experience deeply personalized astrological consultations designed to
        bring clarity, confidence, and alignment to every area of your life.
      </h2>
      <h2 className="flex md:hidden text-3xl font-semibold mb-6 lg:mb-8  text-center">
        Explore Services
      </h2>
      <div className="hidden md:flex gap-2 my-5">
        <Link href="/booking">
          <Button size="lg">Book a Consultation</Button>
        </Link>
        <Link href="/services">
          <Button size="lg" variant="outline">
            Explore Services
          </Button>
        </Link>
      </div>
      <section className="px-4 md:p-0 w-full ">
        <div className="grid-container">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              style={{ gridArea: `box-${index}` }}
              className="bg-[#f7f2ee] rounded-2xl overflow-hidden flex flex-col"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-56 w-full object-cover p-2 rounded-3xl"
              />

              <div className="p-6 flex flex-col flex-1 text-[#6a5c52]">
                <h2 className="text-lg font-semibold text-primary mb-6 text-center">
                  {service.title}
                </h2>

                <p className="text-sm leading-relaxed mb-2">
                  {service.description}
                </p>

                {/* <p className="text-xs opacity-70">{service.subtext}</p> */}

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
