const stats = [
  {
    value: "20",
    label: "Years of Astrological Practice",
  },
  {
    value: "1200+",
    label: "Birth Charts Studied",
  },
  {
    value: "900+",
    label: "Happy Clients Worldwide",
  },
];

const AboutStats = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-6xl font-serif text-primary mb-4">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
