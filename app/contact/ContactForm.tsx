import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
    <div>
      <h2 className="font-serif text-3xl text-primary mb-2">Contact us</h2>
      <p className="text-muted-foreground mb-6">
        Our friendly team would love to hear from you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input placeholder="First name" className="bg-white"/>
        <Input placeholder="Last name" className="bg-white" />
      </div>

      <Input placeholder="Email" className="mb-4 bg-white" />
      <Input placeholder="Phone number" className="mb-4 bg-white"  />

      <Textarea
        placeholder="Share your problem to relieve from it."
        className="mb-6 min-h-[120px] bg-white"
      />

      <Button className="w-full" size="lg">
        Send message
      </Button>
    </div>
  );
};

export default ContactForm;
