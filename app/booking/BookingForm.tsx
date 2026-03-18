"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const SERVICES_WITH_PRICES = [
  { title: "Birth Chart Reading", price: "₹4,999", duration: "60 Minutes" },
  { title: "Relationships Analysis", price: "₹5,100", duration: "60 Minutes" },
  { title: "Career and Finance Guidance", price: "₹5,100", duration: "45 Minutes" },
  { title: "Birth Conception and Progeny", price: "₹6,500", duration: "60 Minutes" },
  { title: "Remedies for Peace and Balance", price: "₹4,500", duration: "30 Minutes" },
  { title: "Academic Guidance", price: "₹3,999", duration: "30 Minutes" },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WEEK_DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const TIME_SLOTS = [
  "9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "2:00 PM","3:00 PM","4:00 PM","5:00 PM",
];

function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function BookingForm() {
  const today = new Date();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const [consultName, setConsultName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [agreed, setAgreed] = useState(false);

  const service = SERVICES_WITH_PRICES[selectedService];
  const offset = getFirstDayOffset(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  const isPast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* ── Your Details ── */}
      <section>
        <h2 className="text-xl font-semibold text-primary mb-1 flex items-center gap-2">
          <span className="text-2xl">👤</span> Your Details
        </h2>
        <hr className="border-primary/20 mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-primary">Mobile Number (WhatsApp preferred) <span className="text-red-500">*</span></label>
          <input
            type="tel"
            placeholder="Mobile number with country code"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Select Consultation <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={e => setSelectedService(Number(e.target.value))}
                className="w-full appearance-none rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              >
                {SERVICES_WITH_PRICES.map((s, i) => (
                  <option key={i} value={i}>{s.title} — {s.price}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary">▾</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Duration <span className="text-red-500">*</span></label>
            <div className="rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm text-muted-foreground">
              {service.duration}
            </div>
          </div>
        </div>
      </section>

      {/* ── Select Date & Time ── */}
      <section className="rounded-2xl border border-primary/20 bg-surface p-5">
        <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span>📅</span> Select Date and Time
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors">‹</button>
              <span className="font-semibold text-primary">{MONTHS[calMonth]} {calYear}</span>
              <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors">›</button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {WEEK_DAYS.map(d => (
                <div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const past = isPast(day);
                const selected = selectedDate === day;
                return (
                  <button
                    key={day}
                    disabled={past}
                    onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                    className={`rounded-full w-8 h-8 mx-auto text-sm transition-colors
                      ${past ? "text-muted-foreground/40 cursor-not-allowed" : "hover:bg-primary/10 cursor-pointer"}
                      ${selected ? "bg-primary text-white font-semibold hover:bg-primary" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex-1">
            {selectedDate ? (
              <>
                <p className="text-sm font-medium text-primary mb-3">
                  Available slots for {MONTHS[calMonth]} {selectedDate}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-full border px-3 py-2 text-sm transition-colors
                        ${selectedTime === slot
                          ? "bg-primary text-white border-primary"
                          : "border-primary/30 hover:bg-primary/10 text-primary"}
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm px-4 py-8">
                Please select a date to view available time slots
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Consultation Booked For ── */}
      <section>
        <h2 className="text-xl font-semibold text-primary mb-1">
          Consultation Booked For <span className="text-red-500">*</span>
        </h2>
        <hr className="border-primary/20 mb-5" />

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={consultName}
            onChange={e => setConsultName(e.target.value)}
            className="flex-1 rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-6 pl-2">
            {["Male", "Female"].map(g => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-primary">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g as "Male" | "Female")}
                  className="accent-primary w-4 h-4"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Birth Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Birth Time <span className="text-red-500">*</span></label>
            <input
              type="time"
              value={birthTime}
              onChange={e => setBirthTime(e.target.value)}
              className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-primary">Birth Place <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Start typing a place..."
            value={birthPlace}
            onChange={e => setBirthPlace(e.target.value)}
            className="w-full rounded-full border border-primary/30 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
          />
        </div>
      </section>

      {/* ── Terms & Submit ── */}
      <div className="space-y-5">
        <label className="flex gap-3 items-start cursor-pointer text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 accent-primary w-4 h-4 shrink-0"
          />
          By proceeding with the booking you agree to our Terms of Service and Privacy Policy. We may create an account for first-time users.
        </label>

        <div className="flex justify-end">
          <Button
            size="lg"
            disabled={!agreed}
            className="rounded-full px-8 disabled:opacity-40"
          >
            Continue to Booking Details →
          </Button>
        </div>
      </div>
    </div>
  );
}
