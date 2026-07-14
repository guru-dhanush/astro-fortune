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
    <section className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-5xl font-bold font-serif text-heading">
              {stat.value}
            </p>
            <p className="text-sm m-3  mx-auto mb-6 max-w-[90vw] sm:max-w-xl md:max-w-2xl text-center text-subheading">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
