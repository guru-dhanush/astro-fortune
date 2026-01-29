"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContactForm from "./ContactForm";

const ContactMain = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <iframe
          title="map"
          className="w-full h-full min-h-[520px]"
          src="https://maps.google.com/maps?q=Melbourne&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>

      {/* Tabs */}
      <div className="bg-secondary rounded-2xl p-8">
        <Tabs defaultValue="form">
          <div className="w-full flex justify-center items-center">
            <TabsList className="mb-8 px-1 py-5">
              <TabsTrigger value="form" className="px-4 py-4">
                Form
              </TabsTrigger>
              <TabsTrigger value="meeting" className="px-4 py-4">
                Meeting
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="form">
            <ContactForm />
          </TabsContent>

          <TabsContent value="meeting">
            <p className="text-sm text-muted-foreground">
              Meeting scheduling coming soon.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContactMain;
