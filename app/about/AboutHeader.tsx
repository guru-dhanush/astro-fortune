import { Badge } from "@/components/ui/badge";

const AboutHeader = () => {
  return (
    <section className="text-center py-10 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-2">
        About
      </Badge>

      {/* <h1 className="text-5xl font-serif text-heading mb-6">
        Meet Katyani 
      </h1>

      <p className="mb-6 text-center text-subheading">
        Personalized guidance to help you decide better, act at the right time,
        and move forward with confidence.
      </p> */}
    </section>
  );
};

export default AboutHeader;
