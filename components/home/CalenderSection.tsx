import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const PANCHANG_DATA = {
  title: "Hindu calender",
  header: {
    label: "Aaj Ka Panchang",
    date: "Wednesday, 9 October 2024",
    location: "New Delhi, India",
  },

  sections: [
    {
      left: [
        { label: "Amanta", value: "Ashwin" },
        { label: "Purnimanta", value: "Ashwin" },
      ],
      right: [
        { label: "Vikram", value: "2081 Peengal" },
        { label: "Shaka", value: "1946 Krodhi" },
      ],
    },
    {
      left: [
        { label: "Tithi", value: "Shukla Shashthi" },
        { label: "Purnimanta", value: "Shukla Shashthi" },
      ],
      right: [
        { label: "Vikram", value: "2081 Peengal" },
        { label: "Shaka", value: "1946 Krodhi" },
      ],
    },
    {
      left: [
        { label: "Karan", value: "Tatil" },
        {
          label: "Purnimanta",
          value: (
            <>
              2024-10-09
              <br />
              12:12:25
            </>
          ),
        },
      ],
      right: [
        { label: "Vikram", value: "2081 Peengal" },
        { label: "Shaka", value: "1946 Krodhi" },
      ],
    },
  ],

  images: [
    {
      src: "/home/panchang/sunrise.svg",
      alt: "Sunrise",
      label: "Sunrise",
    },
    {
      src: "/home/panchang/sunset.svg",
      alt: "Sunset",
      label: "Sunset",
    },
    {
      src: "/home/panchang/moonrise.svg",
      alt: "Moonrise",
      label: "Moonrise",
    },
    {
      src: "/home/panchang/moonset.svg",
      alt: "Moonset",
      label: "Moonset",
    },
  ],
};

const CalenderSection = () => {
  return (
    <section className="flex flex-col items-center p-2 py-10 md:p-10">
      {/* Title */}
      <Badge variant="secondary" className="mb-6">
        Calender
      </Badge>
      <h2 className="text-3xl font-semibold mb-6 lg:mb-8">
        {PANCHANG_DATA.title}
      </h2>

      {/* Card */}
      <div className="w-full border border-primary/60 rounded-3xl p-5 md:p-5 lg:p-8 m-2 md:m-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="">
            <h3 className="text-xl font-medium">
              {PANCHANG_DATA.header.label}
            </h3>

            <div className="flex flex-col my-2 text-muted-foreground">
              <p className="text-xs">{PANCHANG_DATA.header.date}</p>
              {/* <p className="text-xs">{PANCHANG_DATA.header.location}</p> */}
            </div>
          </div>
          <Button size="lg" variant="outline" className="p-1 md:p-3">
            Detailed Panchang
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8 text-sm">
            {PANCHANG_DATA.sections.map((section, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-2 gap-6 ${
                  idx !== PANCHANG_DATA.sections.length - 1
                    ? "border-b border-[#c9a27d]/30 pb-6"
                    : ""
                }`}
              >
                <div>
                  {section.left.map((item, i) => (
                    <p
                      key={i}
                      className="flex justify-between text-end text-xs md:text-sm"
                    >
                      <span className="font-semibold">{item.label}:</span>
                      {item.value}
                    </p>
                  ))}
                </div>

                <div>
                  {section.right.map((item, i) => (
                    <p
                      key={i}
                      className="flex justify-between text-end text-xs md:text-sm"
                    >
                      <span className="font-semibold">{item.label}:</span>
                      {item.value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {PANCHANG_DATA.images.map((image, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full max-w-30"
                />
                <span className="text-xs font-medium">{image.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalenderSection;
