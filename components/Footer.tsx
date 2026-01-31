import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FOOTER_DATA = {
  brand: {
    name: "astrofortune",
    tagline: "BY KATYAINI",
  },
  navigation: [
    "Home",
    "About",
    "Services",
    "Testimonials",
    "Blogs",
    "Press/media",
  ],
  newsletter: {
    title: "Stay up to date",
    placeholder: "Enter your email",
    cta: "Subscribe",
  },
  copyright: "© 2025 astrofortune. All rights reserved.",
  social: [
    { name: "Facebook", icon: "/icons/facebook.svg" },
    { name: "Twitter", icon: "/icons/twitter.svg" },
    { name: "Instagram", icon: "/icons/instagram.svg" },
    { name: "LinkedIn", icon: "/icons/linkedin.svg" },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 my-12">
        <div className="h-px w-full bg-border" />
      </div>
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-14 lg:gap-20">
        {/* Left */}
        <div className="flex-1 space-y-8">
          {/* Brand */}
          <div>
            <Image src="/astrologo.png" alt="Logo" width={180} height={100} />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col lg:flex-row  gap-x-8 gap-y-4 text-sm">
            {FOOTER_DATA.navigation.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline underline-offset-4"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex-1 max-w-md lg:max-w-sm space-y-4">
          <h4 className="font-medium">{FOOTER_DATA.newsletter.title}</h4>

          <div className="flex  gap-3">
            <Input
              type="email"
              placeholder={FOOTER_DATA.newsletter.placeholder}
              className="flex-1 h-10"
            />
            <Button size="lg" className="">
              {FOOTER_DATA.newsletter.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        <div className="h-px w-full bg-border" />
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
        <p className="text-sm text-center md:text-left">
          {FOOTER_DATA.copyright}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-sm">Follow us</span>

          <div className="flex gap-3">
            {FOOTER_DATA.social.map((item) => (
              <a
                key={item.name}
                href="#"
                aria-label={item.name}
                className="w-9 h-9 rounded-full border flex items-center justify-center"
              >
                <img src={item.icon} alt={item.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
