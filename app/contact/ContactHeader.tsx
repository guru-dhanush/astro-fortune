import { Badge } from "@/components/ui/badge";

const ContactHeader = () => {
  return (
    <section className="text-center py-20 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Get In Touch
      </Badge>

      <h2 className="text-4xl font-bold text-heading mb-6">
        Let&apos;s Begin Your Journey to Clarity
      </h2>

      <p className="text-subheading">
        Questions about consultations, astrology readings, or services?
        We&apos;d be happy to help.
      </p>
    </section>
  );
};

export default ContactHeader;
