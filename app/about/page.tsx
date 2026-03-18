import AboutSection from "@/components/home/AboutSection";
import AboutHeader from "./AboutHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/testimonial";
import SectionFutureCTA from "@/components/home/SectionFutureCTA";

const AboutPage = () => {
  return (
    <main className="w-full">
      <Header />
      <AboutHeader />
      <AboutSection showbadge={false} />
      <Testimonials />
      <SectionFutureCTA />
      <Footer />
    </main>
  );
};

export default AboutPage;
