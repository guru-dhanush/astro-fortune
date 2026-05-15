"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, CalendarDays, Loader2 } from "lucide-react";
import { getPanchang } from "@/lib/panchang";
import Script from "next/script";
import { checkAvailabilityAction } from "@/app/actions/calendar";
import { parse } from "date-fns";

const SERVICES_WITH_PRICES = [
  { title: "Birth Chart Reading", price: "₹11,000", duration: "45 Minutes" },
  { title: "Relationships Analysis", price: "₹5,100", duration: "30 Minutes" },
  { title: "Career and Finance Guidance", price: "₹5,100", duration: "30 Minutes" },
  { title: "Birth Conception and Progeny", price: "₹5,100", duration: "30 Minutes" },
  { title: "Remedies for Peace and Balance", price: "₹5,100", duration: "30 Minutes" },
  { title: "Academic Guidance", price: "₹5,100", duration: "30 Minutes" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEK_DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const inputCls = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#7d6352] focus:ring-1 focus:ring-[#7d6352]/30 placeholder:text-gray-400 transition-colors";
const errorCls = "border-red-500 focus:border-red-500 focus:ring-red-500/30";
const labelCls = "block text-sm font-medium text-gray-800 mb-1.5";

// ==================== ZOD SCHEMA ====================
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number is required"),
  serviceIndex: z.coerce.number().min(0, "Please select a service"),
  date: z.coerce.number().min(1, "Date is required"),
  time: z.string().min(1, "Time slot is required"),
  consultName: z.string().min(2, "Consultation name is required"),
  gender: z.enum(["Male", "Female"], {
    error: () => ({ message: "Gender is required" }),
  }),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthPlace: z.string().min(2, "Birth place is required"),
  agreed: z.literal(true, {
    error: () => ({ message: "You must agree to the terms" }),
  }),
});

// Explicit type to fix resolver conflicts
type BookingFormValues = {
  fullName: string;
  email: string;
  mobile: string;
  serviceIndex: number;
  date: number;
  time: string;
  consultName: string;
  gender: "Male" | "Female";
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  agreed: true;
};

export default function BookingForm() {
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSlotAvailable, setIsSlotAvailable] = useState<boolean | null>(null);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as any, // Critical fix for type conflict
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      serviceIndex: 0,
      consultName: "",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      time: "",
      gender: undefined as any,
      agreed: false as any,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  const selectedServiceIndex = watch("serviceIndex");
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const service = SERVICES_WITH_PRICES[selectedServiceIndex] || SERVICES_WITH_PRICES[0];
  const offset = getFirstDayOffset(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);

  useEffect(() => {
    const savedService = localStorage.getItem("selectedService");
    if (savedService) {
      const idx = SERVICES_WITH_PRICES.findIndex(s => s.title === savedService);
      if (idx !== -1) setValue("serviceIndex", idx);
      localStorage.removeItem("selectedService");
    }
  }, [setValue]);

  const panchang = useMemo(() => {
    if (!selectedDate) return null;
    try {
      return getPanchang(calYear, calMonth + 1, selectedDate);
    } catch {
      return null;
    }
  }, [selectedDate, calYear, calMonth]);

  // Check Availability
  useEffect(() => {
    const checkAvailability = async () => {
      if (!selectedDate || !selectedTime) {
        setIsSlotAvailable(null);
        return;
      }

      setIsCheckingAvailability(true);
      setIsSlotAvailable(null);

      try {
        const jsDate = new Date(calYear, calMonth, selectedDate);
        const parsedTime = parse(selectedTime, "h:mm a", jsDate);

        const formatWithOffset = (d: Date) => {
          const pad = (n: number) => n < 10 ? '0' + n : n;
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+05:30`;
        };

        const startTimeStr = formatWithOffset(parsedTime);
        const durationMins = parseInt(service.duration) || 30;
        const endDateTime = new Date(parsedTime.getTime() + durationMins * 60000);
        const endTimeStr = formatWithOffset(endDateTime);

        const result = await checkAvailabilityAction(startTimeStr, endTimeStr);
        setIsSlotAvailable(!!(result?.success && result?.available));
      } catch (error) {
        console.error("Availability check failed:", error);
        setIsSlotAvailable(true); // Allow booking if check fails
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    checkAvailability();
  }, [selectedDate, selectedTime, calYear, calMonth, service.duration]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setValue("date", 0);
    setValue("time", "");
  };

  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setValue("date", 0);
    setValue("time", "");
  };

  const isPast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const isTimeSlotPast = (slot: string) => {
    const selectedDay = new Date(calYear, calMonth, selectedDate);
    const isToday = selectedDay.toDateString() === today.toDateString();
    if (!isToday) return false;
    const slotDate = parse(slot, "h:mm a", selectedDay);
    return slotDate < today;
  };

  const onSubmit = async (data: BookingFormValues) => {
    setToastMessage(null);

    if (isSlotAvailable === false) {
      setToastMessage({ type: "error", text: "This time slot is already booked. Please select another time." });
      return;
    }
    if (isSlotAvailable === null || isCheckingAvailability) {
      setToastMessage({ type: "error", text: "Please wait while we check availability." });
      return;
    }

    startTransition(async () => {
      try {
        const jsDate = new Date(calYear, calMonth, data.date);
        const parsedTime = parse(data.time, "h:mm a", jsDate);

        const formatWithOffset = (d: Date) => {
          const pad = (n: number) => n < 10 ? '0' + n : n;
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+05:30`;
        };

        const startTimeStr = formatWithOffset(parsedTime);
        const durationMins = parseInt(service.duration) || 30;
        const endDateTime = new Date(parsedTime.getTime() + durationMins * 60000);
        const endTimeStr = formatWithOffset(endDateTime);

        const priceStr = service.price.replace(/[₹,]/g, "");
        const amount = parseFloat(priceStr);

        // Your Razorpay payment flow (unchanged)
        const createOrderRes = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            bookingDetails: {
              service: service.title,
              email: data.email,
              fullName: data.fullName,
            },
          }),
        });

        const orderData = await createOrderRes.json();
        if (!orderData.success) throw new Error(orderData.error || "Failed to create order");

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: orderData.orderId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Astrofortune",
          description: service.title,
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.mobile,
          },
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  ...data,
                  service: service.title,
                  date: `${MONTHS[calMonth]} ${data.date}`,
                  amount,
                  duration: service.duration,
                  startTime: startTimeStr,
                  endTime: endTimeStr,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setToastMessage({ type: "success", text: "Booking confirmed! Calendar event created and emails sent." });
            form.reset();
            } else {
              setToastMessage({ type: "error", text: verifyData.error || "Verification failed" });
            }
          },
          modal: {
            ondismiss: () => setToastMessage({ type: "error", text: "Payment cancelled." }),
          },
        };

        const Razorpay = (window as any).Razorpay;
        const rzp = new Razorpay(options);
        rzp.open();
      } catch (err: any) {
        console.error(err);
        setToastMessage({ type: "error", text: err.message || "An error occurred" });
      }
    });
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border max-w-sm w-full animate-in slide-in-from-top-2 fade-in transition-all ${
          toastMessage.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">{toastMessage.type === "success" ? "✓" : "⚠"}</span>
            <div className="flex-1 text-sm font-medium pt-1">{toastMessage.text}</div>
            <button onClick={() => setToastMessage(null)} className="text-gray-500 hover:text-gray-800">×</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* YOUR DETAILS */}
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2" style={{ color: "#7d6352" }}>
            <User size={20} /> Your Details
          </h2>
          <hr className="border-gray-200 mb-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Full Name <span style={{ color: "#7d6352" }}>*</span></label>
              <input type="text" {...register("fullName")} className={`${inputCls} ${errors.fullName ? errorCls : ""}`} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Email <span style={{ color: "#7d6352" }}>*</span></label>
              <input type="email" {...register("email")} className={`${inputCls} ${errors.email ? errorCls : ""}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>Mobile Number (Preferably WhatsApp) <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="tel" {...register("mobile")} className={`${inputCls} ${errors.mobile ? errorCls : ""}`} />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Select Consultation <span style={{ color: "#7d6352" }}>*</span></label>
              <div className="relative">
                <select {...register("serviceIndex")} className={`w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7d6352] cursor-pointer ${errors.serviceIndex ? errorCls : ""}`}>
                  {SERVICES_WITH_PRICES.map((s, i) => (
                    <option key={i} value={i}>{s.title} - {s.price}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">{service.duration}</div>
            </div>
          </div>
        </section>

        {/* DATE & TIME SECTION */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <CalendarDays size={20} className="text-[#7d6352]" /> Select Date and Time
            </h2>
            <span className="text-sm font-medium" style={{ color: "#7d6352" }}>Asia/Kolkata</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Calendar */}
            <div className="flex-1">
              <div className="flex justify-between mb-4">
                <button type="button" onClick={prevMonth} className="w-9 h-9 bg-[#7d6352] text-white rounded-md font-bold">&lt;</button>
                <span className="font-semibold">{MONTHS[calMonth]} {calYear}</span>
                <button type="button" onClick={nextMonth} className="w-9 h-9 bg-[#7d6352] text-white rounded-md font-bold">&gt;</button>
              </div>

              <div className="grid grid-cols-7 text-center mb-2">
                {WEEK_DAYS.map(d => <div key={d} className="text-xs font-medium text-gray-400">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 text-center gap-y-1">
                {Array.from({ length: offset }).map((_, i) => <div key={i} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPast(day);
                  const selected = selectedDate === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => { setValue("date", day); setValue("time", ""); }}
                      className={`w-9 h-9 rounded-full text-sm ${past ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"} ${selected ? "bg-[#7d6352] text-white font-semibold" : "text-gray-700"}`}
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
                  <p className="text-sm font-medium mb-3">Available slots — {MONTHS[calMonth]} {selectedDate}</p>
                  {isCheckingAvailability && <p className="text-sm text-gray-500 flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Checking...</p>}
                  {isSlotAvailable === false && <p className="text-red-500 text-sm mb-2">Slot not available. Choose another.</p>}

                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const pastSlot = isTimeSlotPast(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={pastSlot}
                          onClick={() => setValue("time", slot)}
                          className="rounded-2xl border py-2.5 text-sm transition-all"
                          style={{
                            backgroundColor: selectedTime === slot ? "#7d6352" : pastSlot ? "#f3f4f6" : "white",
                            color: selectedTime === slot ? "white" : pastSlot ? "#9ca3af" : "#374151",
                            borderColor: selectedTime === slot ? "#7d6352" : "#e5e7eb",
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {panchang && (
                    <div className="mt-4 rounded-xl bg-[#f9f6f4] border border-[#7d6352]/20 p-3 text-xs">
                      <p className="font-semibold text-[#7d6352] mb-2">Hindu Panchang</p>
                      <div className="space-y-1">
                        <div className="flex justify-between"><span className="text-gray-500">Tithi</span><span>{panchang.paksha} {panchang.tithi}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Nakshatra</span><span>{panchang.nakshatra}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Yoga</span><span>{panchang.yoga}</span></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">Select a date to see time slots</div>
              )}
            </div>
          </div>
        </section>

        {/* CONSULTATION FOR */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Consultation Booked For <span style={{ color: "#7d6352" }}>*</span></h2>
          <hr className="border-gray-200 mb-5" />

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input type="text" placeholder="Full Name" {...register("consultName")} className={`${inputCls} ${errors.consultName ? errorCls : ""}`} />
            <div className="flex items-center gap-6">
              {["Male", "Female"].map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={g} {...register("gender")} className="w-4 h-4" style={{ accentColor: "#7d6352" }} />
                  {g}
                </label>
              ))}
            </div>
          </div>
          {errors.gender && <p className="text-red-500 text-xs mb-4">{errors.gender.message}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Birth Date</label>
              <input type="date" {...register("birthDate")} className={`${inputCls} ${errors.birthDate ? errorCls : ""}`} />
            </div>
            <div>
              <label className={labelCls}>Birth Time</label>
              <input type="time" {...register("birthTime")} className={`${inputCls} ${errors.birthTime ? errorCls : ""}`} />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelCls}>Birth Place</label>
            <input type="text" placeholder="City, Country" {...register("birthPlace")} className={`${inputCls} ${errors.birthPlace ? errorCls : ""}`} />
          </div>
        </section>

        {/* TERMS */}
        <div className="space-y-5">
          <label className="flex gap-3 items-start cursor-pointer text-sm text-gray-600">
            <input type="checkbox" {...register("agreed")} className="mt-1 w-4 h-4" style={{ accentColor: "#7d6352" }} />
            <span>By proceeding, you agree to our Terms of Service and Privacy Policy.</span>
          </label>
          {errors.agreed && <p className="text-red-500 text-xs">{errors.agreed.message}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-10 py-3.5 rounded-full text-white font-semibold flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: "#7d6352" }}
            >
              {isPending ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : "Continue to Payment"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}