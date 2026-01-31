import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import CalendarSection from "@/components/home/CalenderSection";
import LatestPostsSection from "@/components/home/LatestPosts";
import FutureCTASection from "@/components/home/SectionFutureCTA";

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <AboutSection />
      <ServicesSection />
      <CalendarSection />
      <LatestPostsSection />
      <FutureCTASection />
      <Footer />
    </>
  );
}
