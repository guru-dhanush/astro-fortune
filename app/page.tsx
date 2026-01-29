import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Section1 from "@/components/home/HeroSection";
import Section2 from "@/components/home/TestimonialsSection";
import Section3 from "@/components/home/AboutSection";
import Section4 from "@/components/home/ServicesSection";
import Section5 from "@/components/home/CalenderSection";
import SectionLatestPosts from "@/components/home/LatestPosts";
import SectionFutureCTA from "@/components/home/SectionFutureCTA";

export default function Page() {
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <SectionLatestPosts />
      <SectionFutureCTA />
      <Footer />
    </>
  );
}
