import { subtle } from "crypto";

const cards = [
  {
    icon: "/mail.svg",
    title: "Email",
    text: "For inquiries and consultations.",
    value: "katyani@astrofortuneonline.com",
  },
  // {
  //   icon: "/location.svg",
  //   title: "Office",
  //   text: "Come say hello at our office HQ.",
  //   value: "No: 58 A, East Madison Street, Baltimore, MD, USA 4508",
  // },
  {
    icon: "/phone.svg",
    title: "Phone",
    text: "For appointments and guidance.",
    subtext: "Mon-Sat",
    subsubtext: "10:00 AM -6:00 PM",
    value: "+91 - 8595822799",
  },
];

const ContactInfoCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 mb-20">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-brown-50 border border-brown-100 rounded-2xl p-8 text-center w-full sm:w-105"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
            <img src={card.icon} className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-lg font-semibold text-primary mb-6 text-center">{card.title}</h2>
          <p className="text-sm text-muted-foreground mb-2">{card.text}</p>
          {card.subtext && (
            <p className="text-sm text-muted-foreground mb-2">{card.subtext}</p>
          )}
          {card.subsubtext && (
            <p className="text-sm text-muted-foreground mb-2">{card.subsubtext}</p>
          )}
          <p className="text-sm font-medium text-primary">{card.value}</p>
        </div>
      ))}
    </section>
  );
};

export default ContactInfoCards;
