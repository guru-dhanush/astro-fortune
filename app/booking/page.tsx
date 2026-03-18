import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "./BookingForm";

export default function BookingPage() {
  return (
    <main className="w-full min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-2">
        <h1 className="text-3xl font-serif text-primary text-center mb-1">Book a Consultation</h1>
        <p className="text-center text-muted-foreground text-sm">
          Fill in your details below and choose a convenient date and time.
        </p>
      </div>
      <BookingForm />
      <Footer />
    </main>
  );
}
