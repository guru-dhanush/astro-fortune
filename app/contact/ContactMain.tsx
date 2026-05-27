"use client";

import ContactForm from "./ContactForm";

const ContactMain = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <iframe
          title="Delhi Map"
          className="w-full h-full min-h-130"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // src="https://www.google.com/maps?q=Delhi+NCR+Gurugram,India&output=embed"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3487994189486!2d77.053778484207!3d28.40873033179519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23002b8f7afd%3A0x677116464412e41a!2sDelhi%20NCR%20Gurugram!5e0!3m2!1sen!2sin!4v1779878939089!5m2!1sen!2sin"
        />
      </div>

      {/* Form */}
      <div className="bg-secondary rounded-2xl p-8">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactMain;