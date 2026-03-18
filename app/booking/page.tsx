import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "./BookingForm";

export default function BookingPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Header />
      <BookingForm />
      <Footer />
    </main>
  );
}
