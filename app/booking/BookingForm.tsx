"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, CalendarDays, Loader2 } from "lucide-react";
import { getPanchang } from "@/lib/panchang";
import Script from "next/script";
import { createBookingAction, checkAvailabilityAction } from "@/app/actions/calendar";
import { format, parse } from "date-fns";

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
const errorCls = "border-red-500 focus:border-red-500 focus:ring-red-500/30";
const labelCls = "block text-sm font-medium text-gray-800 mb-1.5";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number is required"),
  serviceIndex: z.coerce.number(),
  date: z.coerce.number().min(1, "Date is required"),
  time: z.string().min(1, "Time slot is required"),
  consultName: z.string().min(2, "Consultation name is required"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthPlace: z.string().min(2, "Birth place is required"),
  agreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSlotAvailable, setIsSlotAvailable] = useState<boolean | null>(null);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
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
      gender: undefined,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  const selectedServiceIndex = watch("serviceIndex");
  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const agreed = watch("agreed");
  const gender = watch("gender");

  const service = SERVICES_WITH_PRICES[selectedServiceIndex] || SERVICES_WITH_PRICES[0];
  const offset = getFirstDayOffset(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);

  useEffect(() => {
    const savedService = localStorage.getItem("selectedService");
    if (savedService) {
      const idx = SERVICES_WITH_PRICES.findIndex(s => s.title === savedService);
      if (idx !== -1) {
        setValue("serviceIndex", idx);
      }
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

  // Check Google Calendar availability when time is selected
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
        const durationMatch = service.duration.match(/(\d+)/);
        const durationMins = durationMatch ? parseInt(durationMatch[1]) : 30;
        const endDateTime = new Date(parsedTime.getTime() + durationMins * 60000);
        const endTimeStr = formatWithOffset(endDateTime);

        const result = await checkAvailabilityAction(startTimeStr, endTimeStr);
        setIsSlotAvailable(result.success && result.available);
      } catch (error: any) {
        console.error("Error checking availability:", error);
        // If Google Calendar is not configured, allow booking without availability check
        if (error?.message?.includes("No access") || error?.message?.includes("credentials")) {
          console.log("Google Calendar not configured, skipping availability check");
          setIsSlotAvailable(true); // Assume available if credentials are missing
        } else {
          setIsSlotAvailable(false);
        }
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    checkAvailability();
  }, [selectedDate, selectedTime, calYear, calMonth, service.duration]);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setValue("date", 0 as any); setValue("time", "");
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setValue("date", 0 as any); setValue("time", "");
  }

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
    
    // Check if slot is available before proceeding
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
        // Prepare correct ISO dates with Asia/Kolkata timezone (+05:30)
        // Parse time slot
        const jsDate = new Date(calYear, calMonth, data.date);
        const parsedTime = parse(data.time, "h:mm a", jsDate);
        
        const formatWithOffset = (d: Date) => {
          const pad = (n: number) => n < 10 ? '0' + n : n;
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+05:30`;
        };
        
        const startTimeStr = formatWithOffset(parsedTime);
        
        const durationMatch = service.duration.match(/(\d+)/);
        const durationMins = durationMatch ? parseInt(durationMatch[1]) : 30;
        const endDateTime = new Date(parsedTime.getTime() + durationMins * 60000);
        const endTimeStr = formatWithOffset(endDateTime);

        // Proceed to Payment (calendar event will be created after successful payment)
        const priceStr = service.price.replace(/[₹,]/g, "");
        const amount = parseFloat(priceStr);

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
        if (!orderData.success) {
          throw new Error(orderData.error || "Failed to create payment order");
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: orderData.orderId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Astrofortune",
          description: service.title,
          customer_notify: true,
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
            ondismiss: () => {
              setToastMessage({ type: "error", text: "Payment cancelled." });
            },
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
      
      {/* Toast Notification (Simple Custom Implementation since Shadcn Sonner CLI failed) */}
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
              <input type="text" placeholder="Full Name" {...register("fullName")} 
                className={`${inputCls} ${errors.fullName ? errorCls : ""}`} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Email <span style={{ color: "#7d6352" }}>*</span></label>
              <input type="email" placeholder="Email" {...register("email")} 
                className={`${inputCls} ${errors.email ? errorCls : ""}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>
              Mobile Number (Preferably WhatsApp Number) <span style={{ color: "#7d6352" }}>*</span>
            </label>
            <input type="tel" placeholder="Mobile Number with country code" {...register("mobile")} 
              className={`${inputCls} ${errors.mobile ? errorCls : ""}`} />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Select Consultation <span style={{ color: "#7d6352" }}>*</span></label>
              <div className="relative">
                <select {...register("serviceIndex")} 
                  className={`w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#7d6352] focus:ring-1 focus:ring-[#7d6352]/30 cursor-pointer transition-colors ${errors.serviceIndex ? errorCls : ""}`}
                >
                  {SERVICES_WITH_PRICES.map((s, i) => (
                    <option key={i} value={i}>{s.title} - {s.price}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
              </div>
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
          {(errors.date || errors.time) && (
            <div className="mb-4 text-red-500 text-sm font-medium">Please select both date and time</div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <button type="button" onClick={prevMonth} className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-base transition-opacity hover:opacity-80" style={{ backgroundColor: "#7d6352" }}>&lt;</button>
                <span className="font-semibold text-gray-800">{MONTHS[calMonth]} {calYear}</span>
                <button type="button" onClick={nextMonth} className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-base transition-opacity hover:opacity-80" style={{ backgroundColor: "#7d6352" }}>&gt;</button>
              </div>

              <div className="border-t border-gray-100 pt-3 mb-1">
                <div className="grid grid-cols-7 text-center mb-2">
                  {WEEK_DAYS.map(d => <div key={d} className="text-xs font-medium text-gray-400 py-1">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 text-center">
                  {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const past = isPast(day);
                    const isSelected = selectedDate === day;
                    return (
                      <button
                        type="button"
                        key={day}
                        disabled={past}
                        onClick={() => { setValue("date", day, { shouldValidate: true }); setValue("time", "", { shouldValidate: true }); }}
                        className={`w-9 h-9 mx-auto my-0.5 rounded-full text-sm transition-colors flex items-center justify-center
                          ${past ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100 cursor-pointer"}
                          ${isSelected ? "text-white font-semibold" : ""}
                        `}
                        style={isSelected ? { backgroundColor: "#7d6352" } : {}}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden md:block w-px bg-gray-100" />

            <div className="flex-1 flex flex-col gap-4">
              {selectedDate ? (
                <>
                  <p className="text-sm font-medium text-gray-600">Available slots — {MONTHS[calMonth]} {selectedDate}</p>
                  {isCheckingAvailability && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 size={14} className="animate-spin" />
                      Checking availability...
                    </div>
                  )}
                  {isSlotAvailable === false && (
                    <div className="text-sm text-red-500 font-medium">
                      This time slot is already booked. Please select another time.
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const isPastSlot = isTimeSlotPast(slot);
                      return (
                        <button
                          type="button"
                          key={slot}
                          disabled={isPastSlot}
                          onClick={() => setValue("time", slot, { shouldValidate: true })}
                          className="rounded-2xl border px-3 py-2.5 text-sm transition-colors"
                          style={
                            selectedTime === slot
                              ? { backgroundColor: "#7d6352", color: "white", borderColor: "#7d6352" }
                              : isPastSlot
                              ? { backgroundColor: "#f3f4f6", color: "#9ca3af", borderColor: "#e5e7eb", cursor: "not-allowed" }
                              : { backgroundColor: "white", color: "#374151", borderColor: "#e5e7eb" }
                          }
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {panchang && (
                    <div className="rounded-xl border border-[#7d6352]/20 bg-[#f9f6f4] p-3 mt-1">
                      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7d6352" }}>Hindu Panchang</p>
                      <div className="space-y-1.5 text-xs text-gray-700">
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Tithi</span>
                          <span className="font-semibold">{panchang.paksha === "Shukla" ? "🌕" : "🌑"} {panchang.paksha} {panchang.tithi}</span>
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
            <div className="flex-1 w-full">
              <input type="text" placeholder="Full Name" {...register("consultName")} 
                className={`${inputCls} ${errors.consultName ? errorCls : ""}`} />
              {errors.consultName && <p className="text-red-500 text-xs mt-1">{errors.consultName.message}</p>}
            </div>
            <div className="flex items-center gap-6 sm:pl-2 shrink-0">
              {["Male", "Female"].map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="radio"
                    value={g}
                    {...register("gender")}
                    className="w-4 h-4 cursor-pointer"
                    style={{ accentColor: "#7d6352" }}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
          {errors.gender && <p className="text-red-500 text-xs -mt-2 mb-4">{errors.gender.message}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Birth Date <span style={{ color: "#7d6352" }}>*</span></label>
              <input type="date" {...register("birthDate")} className={`${inputCls} ${errors.birthDate ? errorCls : ""}`} />
              {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Birth Time <span style={{ color: "#7d6352" }}>*</span></label>
              <input type="time" {...register("birthTime")} className={`${inputCls} ${errors.birthTime ? errorCls : ""}`} />
              {errors.birthTime && <p className="text-red-500 text-xs mt-1">{errors.birthTime.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Birth Place <span style={{ color: "#7d6352" }}>*</span></label>
            <input type="text" placeholder="Start typing a place..." {...register("birthPlace")} 
              className={`${inputCls} ${errors.birthPlace ? errorCls : ""}`} />
            {errors.birthPlace && <p className="text-red-500 text-xs mt-1">{errors.birthPlace.message}</p>}
          </div>
        </section>

        {/* ── TERMS & SUBMIT ── */}
        <div className="space-y-5">
          <label className="flex gap-3 items-start cursor-pointer text-sm text-gray-600 leading-relaxed">
            <input type="checkbox" {...register("agreed")} className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer" style={{ accentColor: "#7d6352" }} />
            <div>
              By proceeding with the booking you agree to our Terms of Service and Privacy Policy. And you also agree for us to create an account for you with Astrofortune if you are a first-time user and do not have an existing account with us.
              {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed.message}</p>}
            </div>
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 rounded-full text-white text-sm font-semibold transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
              style={{ backgroundColor: "#7d6352" }}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : "Continue to Payment"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
