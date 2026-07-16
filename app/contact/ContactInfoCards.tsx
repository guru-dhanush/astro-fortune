const cards = [
  {
    icon: "/mail.svg",
    title: "Email",
    text: "For inquiries and consultations.",
    value: "contact@astrofortunebykatyaini.com",
    href: "mailto:contact@astrofortunebykatyaini.com",
  },
  {
    icon: "/phone.svg",
    title: "Phone",
    text: "For appointments and guidance.",
    subtext: "Mon-Sat",
    subsubtext: "10:00 AM -6:00 PM",
    value: "+91 - 8595822799",
    href: "tel:+918595822799",
  },
];

const ContactInfoCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 mb-20">
      {cards.map((card, idx) => (
        <a
          key={idx}
          href={card.href}
          className="bg-brown-50 border border-brown-100 rounded-2xl p-8 text-center w-full sm:w-105 transition-colors hover:bg-brown-100 cursor-pointer block"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-background border border-secondary/20 flex items-center justify-center text-accent">
            <img src={card.icon} className="w-5 h-5 text-accent" />
          </div>

          <h2 className="text-lg font-semibold text-heading mb-6 text-center">
            {card.title}
          </h2>
          <p className="text-sm text-subheading mb-2">{card.text}</p>
          {card.subtext && (
            <p className="text-sm text-subheading mb-2">{card.subtext}</p>
          )}
          {card.subsubtext && (
            <p className="text-sm text-subheading mb-2">{card.subsubtext}</p>
          )}
          <p className="text-sm font-medium text-accent">{card.value}</p>
        </a>
      ))}
    </section>
  );
};

export default ContactInfoCards;
