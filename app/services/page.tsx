import Header from "@/components/Header";
import ServicesHeader from "./ServicesHeader";
import ServicesList from "./ServicesList";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  return (
    <main className="w-full">
      <Header />
      <ServicesHeader />
      <ServicesList />
      <Footer />
    </main>
  );
};

export default ServicesPage;
