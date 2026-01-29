const cards = [
  {
    icon: "/mail.svg",
    title: "Email",
    text: "Our friendly team is here to help.",
    value: "astrokatyaini@gmail.com",
  },
  {
    icon: "/location.svg",
    title: "Office",
    text: "Come say hello at our office HQ.",
    value: "No: 58 A, East Madison Street, Baltimore, MD, USA 4508",
  },
  {
    icon: "/phone.svg",
    title: "Phone",
    text: "Mon–Fri from 8am to 5pm.",
    value: "+91 - 8595822799",
  },
];

const ContactInfoCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-brown-50 border border-brown-100 rounded-2xl p-8 text-center"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
            <img src={card.icon} className="w-5 h-5 text-primary" />
          </div>

          <h3 className="font-serif text-lg mb-2">{card.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{card.text}</p>
          <p className="text-sm font-medium text-primary">{card.value}</p>
        </div>
      ))}
    </section>
  );
};

export default ContactInfoCards;
