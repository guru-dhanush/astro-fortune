import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection from "@/components/home/AboutSection";
import AboutStats from "@/components/home/AboutStats";
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
      <section className="py-10 px-4 max-w-5xl mx-auto">
        <AboutStats />
      </section>
      <ServicesSection />
      <CalendarSection />
      <LatestPostsSection />
      <FutureCTASection />
      <Footer />
    </>
  );
}
