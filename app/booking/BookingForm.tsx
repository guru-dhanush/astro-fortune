"use client";

import { useState, useMemo } from "react";
import { User, CalendarDays } from "lucide-react";
import { getPanchang } from "@/lib/panchang";

const SERVICES_WITH_PRICES = [
  { title: "Birth Chart Reading", price: "₹11,000", duration: "45 Minutes" },
  { title: "Relationships Analysis", price: "₹5,100", duration: "30 Minutes" },
  { title: "Career and Finance Guidance", price: "₹5,100", duration: "30 Minutes" },
  { title: "Birth Conception and Progeny", price: "₹5,100", duration: "30 Minutes" },
  { title: "Remedies for Peace and Balance", price: "₹5,100", duration: "30 Minutes" },
  { title: "Academic Guidance", price: "₹5,100", duration: "30 Minutes" },
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

const inputCls =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#7d6352] focus:ring-1 focus:ring-[#7d6352]/30 placeholder:text-gray-400 transition-colors";

const labelCls = "block text-sm font-medium text-gray-800 mb-1.5";

export default function BookingForm() {
  const today = new Date();

  const [fullName, setFullName]       = useState("");
  const [email, setEmail]             = useState("");
  const [mobile, setMobile]           = useState("");
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDate, setSelectedDate]       = useState<number | null>(null);
  const [selectedTime, setSelectedTime]       = useState<string | null>(null);
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [consultName, setConsultName] = useState("");
  const [gender, setGender]           = useState<"Male" | "Female" | "">("");
  const [birthDate, setBirthDate]     = useState("");
  const [birthTime, setBirthTime]     = useState("");
  const [birthPlace, setBirthPlace]   = useState("");
  const [agreed, setAgreed]           = useState(false);

  const service = SERVICES_WITH_PRICES[selectedService];
  const offset      = getFirstDayOffset(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);

  const panchang = useMemo(() => {
    if (!selectedDate) return null;
    try {
      return getPanchang(calYear, calMonth + 1, selectedDate);
    } catch {
      return null;
    }
  }, [selectedDate, calYear, calMonth]);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null); setSelectedTime(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null); setSelectedTime(null);
  }

  const isPast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* ── YOUR DETAILS ── */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-2" style={{ color: "#7d6352" }}>
          <User size={20} />
          Your Details
        </h2>
        <hr className="border-gray-200 mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Full Name <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="text" placeholder="Full Name" value={fullName}
              onChange={e => setFullName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="email" placeholder="Email" value={email}
              onChange={e => setEmail(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelCls}>
            Mobile Number (Preferably WhatsApp Number) <span style={{ color: "#7d6352" }}>*</span>
          </label>
          <input type="tel" placeholder="Mobile Number with country code" value={mobile}
            onChange={e => setMobile(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Select Consultation <span style={{ color: "#7d6352" }}>*</span></label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={e => setSelectedService(Number(e.target.value))}
                className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#7d6352] focus:ring-1 focus:ring-[#7d6352]/30 cursor-pointer transition-colors"
              >
                {SERVICES_WITH_PRICES.map((s, i) => (
                  <option key={i} value={i}>{s.title} - {s.price}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
            </div>
            <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#7d6352" }}>
              <span>✓</span> Pre-selected
            </p>
          </div>
          <div>
            <label className={labelCls}>Duration <span style={{ color: "#7d6352" }}>*</span></label>
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
              {service.duration}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECT DATE & TIME ── */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <CalendarDays size={20} className="text-[#7d6352]" /> Select Date and Time
          </h2>
          <span className="text-sm font-medium" style={{ color: "#7d6352" }}>
            Time Zone: Asia/Kolkata
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-base transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#7d6352" }}
              >
                &lt;
              </button>
              <span className="font-semibold text-gray-800">{MONTHS[calMonth]} {calYear}</span>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-base transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#7d6352" }}
              >
                &gt;
              </button>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-1">
              <div className="grid grid-cols-7 text-center mb-2">
                {WEEK_DAYS.map(d => (
                  <div key={d} className="text-xs font-medium text-gray-400 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 text-center">
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
                      className={`w-9 h-9 mx-auto my-0.5 rounded-full text-sm transition-colors flex items-center justify-center
                        ${past
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100 cursor-pointer"}
                        ${selected ? "text-white font-semibold" : ""}
                      `}
                      style={selected ? { backgroundColor: "#7d6352" } : {}}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider on md */}
          <div className="hidden md:block w-px bg-gray-100" />

          {/* Time Slots + Panchang */}
          <div className="flex-1 flex flex-col gap-4">
            {selectedDate ? (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Available slots — {MONTHS[calMonth]} {selectedDate}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className="rounded-2xl border px-3 py-2.5 text-sm transition-colors"
                      style={
                        selectedTime === slot
                          ? { backgroundColor: "#7d6352", color: "white", borderColor: "#7d6352" }
                          : { backgroundColor: "white", color: "#374151", borderColor: "#e5e7eb" }
                      }
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {panchang && (
                  <div className="rounded-xl border border-[#7d6352]/20 bg-[#f9f6f4] p-3 mt-1">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7d6352" }}>
                      Hindu Panchang
                    </p>
                    <div className="space-y-1.5 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Tithi</span>
                        <span className="font-semibold">
                          {panchang.paksha === "Shukla" ? "🌕" : "🌑"}{" "}
                          {panchang.paksha} {panchang.tithi}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Nakshatra</span>
                        <span className="font-semibold">⭐ {panchang.nakshatra}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Yoga</span>
                        <span className="font-semibold">✦ {panchang.yoga}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-gray-400 text-sm px-4 py-12">
                Please select a date to view available time slots
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION BOOKED FOR ── */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Consultation Booked For <span style={{ color: "#7d6352" }}>*</span>
        </h2>
        <hr className="border-gray-200 mb-5" />

        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Full Name"
            value={consultName}
            onChange={e => setConsultName(e.target.value)}
            className={`${inputCls} flex-1`}
          />
          <div className="flex items-center gap-6 sm:pl-2 shrink-0">
            {["Male", "Female"].map(g => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g as "Male" | "Female")}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "#7d6352" }}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Birth Date <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
              className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Birth Time <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)}
              className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>
            Birth Place <span style={{ color: "#7d6352" }}>*</span>
          </label>
          <input type="text" placeholder="Start typing a place..." value={birthPlace}
            onChange={e => setBirthPlace(e.target.value)} className={inputCls} />
        </div>
      </section>

      {/* ── TERMS & SUBMIT ── */}
      <div className="space-y-5">
        <label className="flex gap-3 items-start cursor-pointer text-sm text-gray-600 leading-relaxed">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
            style={{ accentColor: "#7d6352" }}
          />
          By proceeding with the booking you agree to our Terms of Service and Privacy Policy. And you
          also agree for us to create an account for you with Astrofortune if you are a first-time user
          and do not have an existing account with us.
        </label>

        <div className="flex justify-end">
          <button
            disabled={!agreed}
            className="px-8 py-3 rounded-full text-white text-sm font-semibold transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            style={{ backgroundColor: "#7d6352" }}
          >
            Continue to Booking Details
          </button>
        </div>
      </div>
    </div>
  );
}
