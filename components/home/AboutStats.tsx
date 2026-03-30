import React from "react";

const features = [
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

const FeatureCard = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex flex-col items-center text-center py-6 px-4">
    <div className="w-36 h-36">
      <img src={icon} alt={title} className="w-full h-full object-contain" />
    </div>
    <span className="mt-3 text-sm font-medium max-w-[160px]">{title}</span>
  </div>
);

// const AboutStats = () => {
//   const row1 = features.slice(0, 3);
//   const row2 = features.slice(3);

//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {row1.map((f, i) => (
//           <FeatureCard key={i} icon={f.icon} title={f.title} />
//         ))}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:max-w-[66.67%] md:mx-auto">
//         {row2.map((f, i) => (
//           <FeatureCard key={i} icon={f.icon} title={f.title} />
//         ))}
//       </div>
//     </div>
//   );
// };

const AboutStats = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
  {features.map((f, i) => (
    <div
      key={i}
      className={`${
        i === features.length - 1
          ? "col-span-2 sm:col-span-1 md:col-span-1 flex justify-center"
          : ""
      }`}
    >
      <FeatureCard icon={f.icon} title={f.title} />
    </div>
  ))}
</div>
    </div>
  );
};

export default AboutStats;

