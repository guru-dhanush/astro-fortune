import Header from "@/components/Header";
import ContactHeader from "./ContactHeader";
import ContactInfoCards from "./ContactInfoCards";
import ContactMain from "./ContactMain";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <main className="w-full">
      <Header />
      <ContactHeader />
      <ContactInfoCards />
      <ContactMain />
      <Footer />
    </main>
  );
};

export default ContactPage;
