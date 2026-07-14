"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";

const CalenderSection = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    async function fetchPanchang() {
      const res = await fetch("/api/panchang");
      const data = await res.json();
      setApiData(data);
    }

    fetchPanchang();
  }, []);

  const p = useMemo(() => {
    if (!apiData) return null;

    return {
      dateStr: new Date().toDateString(),
      vara: apiData.day || "",
      paksha: apiData.paksha || "",
      tithi: apiData.tithi?.details?.tithi_name || "",
      nakshatra: apiData.nakshatra?.details?.nak_name || "",
      yog: apiData.yog?.details?.yog_name || "",
      karana: apiData.karan?.details?.karan_name || "",
      sunrise: apiData.sunrise,
      sunset: apiData.sunset,
      amantaMonth: apiData.hindu_maah?.amanta || "",
      purnimantaMonth: apiData.hindu_maah?.purnimanta || "",
      vikramYear: apiData.vikram_samvat || "",
      vikramCycle: apiData.vkram_samvat_name || "",
      shakaYear: apiData.shaka_samvat || "",
      shakaCycle: apiData.shaka_samvat_name || "",
    };
  }, [apiData]);

  if (!p) return <div className="py-10 text-center">Loading Panchang...</div>;

  const formatTime = (time: string) => {
    if (!time) return "";

    const [hour, minute, second] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hour, minute, second);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="flex flex-col items-center p-2 py-10 md:p-10">
      <Badge variant="secondary" className="mb-6">
        Calendar
      </Badge>
      <h2 className="text-4xl font-bold text-heading mb-6">Hindu Calendar</h2>

      <div className="w-full border border-primary/60 rounded-3xl p-5 md:p-5 lg:p-8 m-2 md:m-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-medium">Aaj Ka Panchang</h3>
            <div className="flex flex-col my-2 text-muted-foreground">
              <p className="text-xs">{p.dateStr}</p>
              <p className="text-xs">New Delhi, India</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-accent">{p.vara}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {p.paksha === "Shukla-Paksha" ? "🌕" : "🌑"} {p.paksha}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Panchang data columns */}
          <div className="md:col-span-2 space-y-6 text-sm">
            {/* Row 1 — Lunar month & year */}
            <div className="grid grid-cols-2 gap-6 border-b border-secondary/30 pb-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Amanta:</span>
                  <span>{p.amantaMonth}</span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Purnimanta:</span>
                  <span>{p.purnimantaMonth}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Vikram:</span>
                  <span>
                    {p.vikramYear} {p.vikramCycle}
                  </span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Shaka:</span>
                  <span>
                    {p.shakaYear} {p.shakaCycle}
                  </span>
                </p>
              </div>
            </div>

            {/* Row 2 — Tithi & Nakshatra */}
            <div className="grid grid-cols-2 gap-6 border-b border-secondary/30 pb-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Tithi:</span>
                  <span>
                    {p.paksha} {p.tithi}
                  </span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Nakshatra:</span>
                  <span>{p.nakshatra}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Yoga:</span>
                  <span>{p.yog}</span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Karana:</span>
                  <span>{p.karana}</span>
                </p>
              </div>
            </div>

            {/* Row 3 — Sunrise & Sunset */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Sunrise:</span>
                  <span>{formatTime(p.sunrise)}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Sunset:</span>
                  <span>{formatTime(p.sunset)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right column — sun/moon icons */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/sunrise.svg"
                alt="Sunrise"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Sunrise</span>
              <span className="text-xs text-muted-foreground">
                {formatTime(p.sunrise)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/sunset.svg"
                alt="Sunset"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Sunset</span>
              <span className="text-xs text-muted-foreground">
                {formatTime(p.sunset)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/moonrise.svg"
                alt="Moonrise"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Paksha</span>
              <span className="text-xs text-muted-foreground">{p.paksha}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/moonset.svg"
                alt="Nakshatra"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Nakshatra</span>
              <span className="text-xs text-muted-foreground">
                {p.nakshatra}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalenderSection;
