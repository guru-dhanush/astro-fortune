import AboutSection from "@/components/home/AboutSection";
import AboutStats from "@/components/home/AboutStats";
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
      <section className="py-10 px-4 max-w-5xl mx-auto">
        <AboutStats />
      </section>
      <Testimonials />
      <SectionFutureCTA />
      <Footer />
    </main>
  );
};

export default AboutPage;
