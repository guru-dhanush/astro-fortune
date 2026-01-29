import { Badge } from "@/components/ui/badge";

const ContactHeader = () => {
  return (
    <section className="text-center py-20 px-6 max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-6">
        Contact Us
      </Badge>

      <h1 className="text-5xl font-serif text-primary mb-4">
        We’d love to hear from you
      </h1>

      <p className="text-muted-foreground">
        Our friendly team is always here to chat.
      </p>
    </section>
  );
};

export default ContactHeader;
