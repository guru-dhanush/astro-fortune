"use client";

import Image from "next/image";

// with no leading "+", spaces, or dashes. e.g. 91XXXXXXXXXX for India.
const WHATSAPP_NUMBER = "917428422799";

const WHATSAPP_MESSAGE =
  "Hi Katyani, I came across Astrofortune and would like some guidance. Could you please guide me on the next steps?";

export default function WhatsAppFloat() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
    >
      <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={30} height={30} />
    </a>
  );
}
