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
      <h2 className="hidden md:flex font-bold text-2xl lg:text-4xl text-primary  text-center">
        Discover effective solutions to the most <br />
        challenging problems in your life
      </h2>
      <h2 className="flex md:hidden text-3xl font-semibold mb-6 lg:mb-8  text-center">
        Our services
      </h2>
      <div className="hidden md:flex gap-2 my-5">
        <Button size="lg">Book a Session</Button>
        <Link href="/services">
          <Button size="lg" variant="outline">
            Our Services
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
                <h3 className="font-serif text-lg mb-2 text-center">
                  {service.title}
                </h3>

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
