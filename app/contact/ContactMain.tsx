"use client";

import ContactForm from "./ContactForm";

const ContactMain = () => {
  return (
    <section className="max-w-230 mx-auto px-6">
      {/* Form */}
      <div className="bg-surface rounded-2xl p-8">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactMain;