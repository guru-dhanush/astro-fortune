import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary mb-6 text-center">
        Send Us a Message
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Tell us how we can help, and we&apos;ll get back to you shortly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input placeholder="First name" className="bg-white" />
        <Input placeholder="Last name" className="bg-white" />
      </div>

      <Input placeholder="Email" className="mb-4 bg-white" />
      <Input placeholder="Phone number" className="mb-4 bg-white" />

      <Textarea
        placeholder="What would you like guidance on today?"
        className="mb-6 min-h-30 bg-white"
      />

      <Button className="w-full" size="lg">
        Send message
      </Button>
    </div>
  );
};

export default ContactForm;
