import { Button } from "../ui/button";

const PANCHANG_DATA = {
  title: "Panchang/Hindu calender",
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
};

const CalenderSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-4xl font-semibold mb-10">{PANCHANG_DATA.title}</h2>

      {/* Card */}
      <div className="w-full max-w-6xl border border-primary/60 rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-medium">{PANCHANG_DATA.header.label}</h3>

          <div className="flex flex-col justify-center items-center">
            <p className="text-sm">
              {PANCHANG_DATA.header.date}
            </p>
            <p className="text-xs">
              {PANCHANG_DATA.header.location}
            </p>
          </div>

          <Button size="lg" variant="outline">
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
                    <p key={i} className="flex justify-between text-end">
                      <span className="font-semibold">{item.label}:</span>
                      {item.value}
                    </p>
                  ))}
                </div>

                <div>
                  {section.right.map((item, i) => (
                    <p key={i} className="flex justify-between text-end">
                      <span className="font-semibold">{item.label}:</span>
                      {item.value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <img src="/home/panchang/sunrise.svg" />
            <img src="/home/panchang/sunset.svg" />
            <img src="/home/panchang/moonrise.svg" />
            <img src="/home/panchang/moonset.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalenderSection;
