import React from "react";

const features: Record<string, string>[] = [
  {
    icon: "/home/feature-highlights/feature-trusted.svg",
    title: "Trusted by thousands of Clients",
  },
  {
    icon: "/home/feature-highlights/feature-experience.svg",
    title: "Years of Experience",
  },
  {
    icon: "/home/feature-highlights/feature-gold-medalist.svg",
    title: "Gold Medalist in Astrology",
  },
  {
    icon: "/home/feature-highlights/feature-ethics.svg",
    title: "Ethical, Confidential & Non-Fear Based",
  },
  {
    icon: "/home/feature-highlights/feature-precision.svg",
    title: "Precision Meets Practical Guidance",
  },
];

const AboutStats = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-2 mt-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="w-55 flex flex-col items-center text-center my-5"
        >
          <div className="w-45">
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-full h-auto"
            />
          </div>

          <span className="mt-3 text-sm">{feature.title}</span>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
