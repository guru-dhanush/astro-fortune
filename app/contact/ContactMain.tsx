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
          src="https://www.google.com/maps?q=New+Delhi,India&output=embed"
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